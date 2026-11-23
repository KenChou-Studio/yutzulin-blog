import { DEFAULT_LOCALE, type Locale } from "../i18n/config";
import type { Translator } from "../i18n/ui";

/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
	mediaId: string;
	alt?: string;
	url?: string;
}

export interface BlogSiteIdentitySettings {
	title?: string;
	tagline?: string;
	logo?: MediaReference;
	favicon?: MediaReference;
}

const DEFAULT_SITE_TITLE = "My Blog";
const DEFAULT_SITE_TAGLINE = "Thoughts, stories, and ideas.";

/**
 * Site settings are not per-locale in EmDash, so the title and tagline stored
 * in settings are used as-is for the default locale. Other locales take the
 * tagline from the UI text (`site.tagline`, editable in the admin).
 */
export function resolveBlogSiteIdentity(
	settings?: BlogSiteIdentitySettings,
	locale: Locale = DEFAULT_LOCALE,
	t?: Translator,
) {
	const tagline =
		locale === DEFAULT_LOCALE || !t
			? (settings?.tagline ?? DEFAULT_SITE_TAGLINE)
			: t("site.tagline");
	return {
		// Settings hold the default-locale title; other locales use UI Text `site.title`.
		siteTitle: locale === DEFAULT_LOCALE || !t ? (settings?.title ?? DEFAULT_SITE_TITLE) : t("site.title"),
		siteTagline: tagline,
		siteLogo: settings?.logo?.url ? settings.logo : null,
	};
}
