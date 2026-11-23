import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, isLocale, type Locale } from "./config";
import { createTranslator, type Translator } from "./ui";
import { getTranslator } from "./load";

export { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, isLocale, createTranslator, getTranslator };
export type { Locale, Translator };

/** The active locale for a request. Unprefixed URLs resolve to the default. */
export function getLocale(astro: { currentLocale?: string }): Locale {
	return isLocale(astro.currentLocale) ? astro.currentLocale : DEFAULT_LOCALE;
}

/**
 * Locale of the URL the visitor requested. Unlike `Astro.currentLocale` this
 * survives `Astro.rewrite("/404")`, where the route no longer carries a locale.
 */
export function getRequestLocale(pathname: string): Locale {
	const first = pathname.split("/")[1];
	return isLocale(first) ? first : DEFAULT_LOCALE;
}

/**
 * Validates the `[...locale]` route segment shared by every public page.
 *
 * Returns the locale, or `null` when the segment is not a *prefixed* locale
 * (`/foo/posts`, or `/en/posts` — the default locale is never prefixed).
 */
export function resolveRouteLocale(param: string | undefined): Locale | null {
	if (!param) return DEFAULT_LOCALE;
	// Astro matches locale segments case-insensitively (`/zh-tw/` works too).
	const match = LOCALE_CODES.find((code) => code.toLowerCase() === param.toLowerCase());
	return match && match !== DEFAULT_LOCALE ? match : null;
}

const SKIP_LOCALIZE = /^\/(_emdash|_astro|images|api)(\/|$)|\.[a-z0-9]{2,5}$/i;

/**
 * Prefixes a root-relative site path with the locale (`/posts` → `/zh-TW/posts`).
 * The default locale is never prefixed. Built by hand rather than with
 * `getRelativeLocaleUrl()`, which lowercases the code (`/zh-tw/`) and appends
 * a trailing slash — neither matches the casing EmDash stores for locales.
 */
export function localePath(locale: Locale, path = "/"): string {
	const [pathname, rest = ""] = splitUrl(path);
	if (locale === DEFAULT_LOCALE) return (pathname || "/") + rest;
	return `/${locale}${pathname === "/" ? "" : pathname}${rest}`;
}

/**
 * Localizes a link coming from CMS data (menu items, block fields).
 * External links, anchors, assets, admin routes and already-prefixed paths pass through.
 */
export function localizeUrl(locale: Locale, url: string | undefined | null): string {
	if (!url) return localePath(locale, "/");
	if (!url.startsWith("/") || url.startsWith("//")) return url;
	const [pathname] = splitUrl(url);
	if (SKIP_LOCALIZE.test(pathname)) return url;
	if (LOCALE_CODES.some((code) => pathname === `/${code}` || pathname.startsWith(`/${code}/`))) {
		return url;
	}
	return localePath(locale, url);
}

function splitUrl(url: string): [string, string] {
	const index = url.search(/[?#]/);
	return index === -1 ? [url, ""] : [url.slice(0, index), url.slice(index)];
}

/** Formats a date for the given locale. */
export function formatDate(date: Date, locale: Locale, month: "long" | "short" = "long"): string {
	return date.toLocaleDateString(LOCALES[locale].htmlLang, {
		year: "numeric",
		month,
		day: "numeric",
	});
}
