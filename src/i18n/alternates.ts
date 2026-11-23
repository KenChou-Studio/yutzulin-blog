import { getTranslations } from "emdash";
import { isLocale, localePath, type Locale } from "./index";

/**
 * Published translations of one content entry as site paths, e.g.
 * `{ en: "/posts/my-post", "zh-TW": "/zh-TW/posts/wo-de-wen-zhang" }`.
 *
 * `getTranslations()` also returns drafts and scheduled entries, so those are
 * filtered out — a public language switcher must never link to them.
 * `pathFor` maps a locale's slug to the unprefixed route (`/posts/${slug}`).
 */
export async function getContentAlternates(
	collection: string,
	entryId: string,
	pathFor: (slug: string) => string,
): Promise<Partial<Record<Locale, string>>> {
	const { translations } = await getTranslations(collection, entryId);
	const alternates: Partial<Record<Locale, string>> = {};
	for (const translation of translations) {
		if (translation.status !== "published" || !translation.slug) continue;
		if (!isLocale(translation.locale)) continue;
		alternates[translation.locale] = localePath(translation.locale, pathFor(translation.slug));
	}
	return alternates;
}
