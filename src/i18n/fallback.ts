import { getEmDashCollection, getEmDashEntry, getTaxonomyTerms } from "emdash";
import type { ContentEntry, TaxonomyTerm } from "emdash";
import { LOCALE_CODES, isLocale, type Locale } from "./config";

/**
 * EmDash lists (`getEmDashCollection`, `getTaxonomyTerms`) return one locale
 * only; just single-entry lookups follow the fallback chain. These helpers make
 * lists behave the same way: whatever has no translation in the requested
 * locale is filled in from the next locale of the chain (English <-> zh-TW), and
 * an entry is never listed twice (entries of one translation group are one item).
 */

/** The requested locale first, then every other locale (English <-> zh-TW). */
export function localeChain(locale: Locale): Locale[] {
	return [locale, ...LOCALE_CODES.filter((code) => code !== locale)];
}

/**
 * One entry by slug in `locale`; when it has no translation there, the same
 * slug in the other locale(s). EmDash only follows its configured chain
 * (zh-TW -> en), so this also covers English -> zh-TW.
 */
export async function getEntryWithFallback<T extends string>(collection: T, slug: string, locale: Locale) {
	const [first, ...others] = localeChain(locale);
	let result = await getEmDashEntry(collection, slug, { locale: first });
	let found: Locale = first!;
	for (const code of others) {
		if (result.entry) break;
		result = await getEmDashEntry(collection, slug, { locale: code });
		found = code;
	}
	// EmDash may already have fallen back inside the call (zh-TW -> en), so ask the entry itself.
	const entryLocale = (result.entry?.data as { locale?: string } | undefined)?.locale;
	const actual = isLocale(entryLocale) ? entryLocale : found;
	return { ...result, locale: result.entry ? actual : locale };
}

const entryGroup = (entry: ContentEntry<any>) =>
	(entry.data.translationGroup as string | undefined) || (entry.data.id as string) || entry.id;

const time = (entry: ContentEntry<any>) => {
	const date = entry.data.publishedAt ?? entry.data.createdAt;
	return date instanceof Date ? date.getTime() : 0;
};

interface Options {
	where?: Record<string, unknown>;
	orderBy?: Record<string, "asc" | "desc">;
	/** Per-locale cap while collecting (EmDash allows at most 100). */
	limit?: number;
}

/**
 * All entries of `collection` for `locale`, with untranslated ones taken from the
 * fallback locales. Sorted newest first unless `orderBy` says otherwise.
 */
export async function getEntriesWithFallback(
	collection: string,
	locale: Locale,
	{ where, orderBy = { published_at: "desc" }, limit = 100 }: Options = {},
): Promise<{ entries: ContentEntry<any>[]; cacheHints: unknown[] }> {
	const seen = new Set<string>();
	const entries: ContentEntry<any>[] = [];
	const cacheHints: unknown[] = [];
	for (const code of localeChain(locale)) {
		const result = await getEmDashCollection(collection as never, {
			locale: code,
			where,
			orderBy,
			limit,
		} as never);
		if (result.cacheHint) cacheHints.push(result.cacheHint);
		for (const entry of result.entries as ContentEntry<any>[]) {
			const group = entryGroup(entry);
			if (seen.has(group)) continue;
			seen.add(group);
			entries.push(entry);
		}
	}
	const [field, direction] = Object.entries(orderBy)[0] ?? ["published_at", "desc"];
	if (field === "published_at" || field === "created_at") {
		entries.sort((a, b) => (direction === "asc" ? time(a) - time(b) : time(b) - time(a)));
	}
	return { entries, cacheHints };
}

/** In-memory paging for merged lists; `cursor` is the numeric offset as a string. */
export function pageOf<T>(items: T[], cursor: string | undefined, size: number) {
	const offset = Math.max(0, Number.parseInt(cursor ?? "0", 10) || 0);
	const page = items.slice(offset, offset + size);
	const next = offset + size;
	return { page, nextCursor: next < items.length ? String(next) : undefined };
}

/** Taxonomy terms for `locale`, plus the terms that exist only in a fallback locale. */
export async function getTermsWithFallback(
	taxonomy: string,
	locale: Locale,
	options: { includeCounts?: boolean } = {},
): Promise<TaxonomyTerm[]> {
	const seen = new Set<string>();
	const terms: TaxonomyTerm[] = [];
	for (const code of localeChain(locale)) {
		for (const term of await getTaxonomyTerms(taxonomy, { locale: code, ...options })) {
			const group = term.translationGroup || term.id;
			if (seen.has(group)) continue;
			seen.add(group);
			terms.push(term);
		}
	}
	return terms;
}
