import { getEmDashCollection } from "emdash";
import type { Locale } from "./config";
import { createTranslator, uiKeyFromSlug, type Translator, type UiKey } from "./ui";

interface Loaded {
	overrides: Partial<Record<UiKey, string>>;
	extras: Record<string, string>;
}

interface UiStringData {
	slug?: string | null;
	text?: string | null;
}

// One lookup per request and locale, shared by the layout, pages and components.
const perRequest = new WeakMap<object, Map<Locale, Promise<Translator>>>();

async function loadOverrides(locale: Locale): Promise<Loaded> {
	const overrides: Partial<Record<UiKey, string>> = {};
	const extras: Record<string, string> = {};
	try {
		let cursor: string | undefined;
		do {
			const page = await getEmDashCollection<"ui_strings", UiStringData>("ui_strings", {
				locale,
				limit: 100,
				cursor,
			});
			for (const entry of page.entries) {
				const slug = entry.data.slug ?? entry.id;
				const key = uiKeyFromSlug(slug);
				const text = entry.data.text?.trim();
				if (!text) continue;
				if (key) overrides[key] = text;
				extras[slug] = text;
			}
			cursor = page.nextCursor;
		} while (cursor);
	} catch (error) {
		// Collection not created yet, or the query failed: use the built-in text.
		console.warn("[i18n] Could not load ui_strings, using defaults:", error);
	}
	return { overrides, extras };
}

/**
 * Translator for `locale` using the text editors maintain in the admin
 * (`ui_strings` collection), falling back to the defaults in `ui.ts`.
 * Pass `Astro` (or anything with the request) so the lookup is shared per request.
 */
export function getTranslator(source: { request: Request }, locale: Locale): Promise<Translator> {
	let byLocale = perRequest.get(source.request);
	if (!byLocale) {
		byLocale = new Map();
		perRequest.set(source.request, byLocale);
	}
	let translator = byLocale.get(locale);
	if (!translator) {
		translator = loadOverrides(locale).then(({ overrides, extras }) => createTranslator(locale, overrides, extras));
		byLocale.set(locale, translator);
	}
	return translator;
}
