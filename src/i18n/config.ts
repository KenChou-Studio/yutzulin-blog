/**
 * Single source of truth for the site's locales.
 *
 * Imported by `astro.config.mjs` (Astro i18n routing, which EmDash also reads
 * for its locale list and fallback chain) and by the runtime helpers.
 *
 * The default locale is served WITHOUT a URL prefix (`/posts`), every other
 * locale gets one (`/zh-TW/posts`). EmDash requires this routing strategy:
 * prefixing the default locale breaks `/_emdash/admin`.
 */
export const DEFAULT_LOCALE = "en" as const;

export const LOCALE_CODES = ["en", "zh-TW"] as const;

export type Locale = (typeof LOCALE_CODES)[number];

/** Passed straight to Astro's `i18n` option. */
export const i18nConfig = {
	defaultLocale: DEFAULT_LOCALE,
	locales: [...LOCALE_CODES],
	// A missing zh-TW entry falls back to English on single-entry lookups.
	fallback: { "zh-TW": "en" },
} as const;

export interface LocaleInfo {
	/** Name shown in the language switcher, written in its own language. */
	label: string;
	/** Compact label for tight spaces. */
	short: string;
	/** Value for `<html lang>`, `hreflang`, RSS `<language>` and Intl. */
	htmlLang: string;
	/** Open Graph locale. */
	ogLocale: string;
}

export const LOCALES: Record<Locale, LocaleInfo> = {
	en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
	"zh-TW": { label: "繁體中文", short: "中", htmlLang: "zh-Hant-TW", ogLocale: "zh_TW" },
};

export function isLocale(value: unknown): value is Locale {
	return typeof value === "string" && (LOCALE_CODES as readonly string[]).includes(value);
}
