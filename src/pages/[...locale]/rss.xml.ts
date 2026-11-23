import type { APIRoute } from "astro";
import { getSiteSettings } from "emdash";
import { getEntriesWithFallback } from "../../i18n/fallback";

import { LOCALES, getTranslator, localePath, localizeUrl, resolveRouteLocale } from "../../i18n";
import { resolveBlogSiteIdentity } from "../../utils/site-identity";

export const GET: APIRoute = async ({ site, url, params, request }) => {
	const locale = resolveRouteLocale(params.locale);
	if (!locale) return new Response(null, { status: 404 });
	const t = await getTranslator({ request }, locale);
	const siteUrl = site ?? new URL(url.origin);
	const { siteTitle, siteTagline } = resolveBlogSiteIdentity(
		await getSiteSettings(),
		locale,
		t,
	);

	// Entries without a translation in this language are taken from the other one.
	const { entries: posts } = await getEntriesWithFallback("posts", locale);
	const { entries: news } = await getEntriesWithFallback("news", locale);

	// Posts and news in one feed, newest first. A news item links to its own URL when it has
	// one (resolved against the locale for site paths), otherwise to the news archive.
	const feed = [
		...posts.map((post) => ({
			date: post.data.publishedAt,
			title: post.data.title || t("posts.untitled"),
			description: post.data.excerpt || "",
			url: new URL(localePath(locale, `/posts/${post.data.slug ?? post.id}`), siteUrl).href,
			guid: undefined as string | undefined,
		})),
		...news.map((item) => ({
			date: item.data.publishedAt,
			title: item.data.title || t("posts.untitled"),
			description: item.data.excerpt || "",
			url: new URL(localizeUrl(locale, item.data.link || "/news"), siteUrl).href,
			// A news item often points at a post; keep its identity separate from the post's.
			guid: `news:${locale}:${item.data.slug ?? item.id}`,
		})),
	]
		.filter((entry): entry is typeof entry & { date: Date } => entry.date instanceof Date)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, 20);

	const items = feed
		.map(
			(entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entry.url}</link>
      <guid isPermaLink="${entry.guid ? "false" : "true"}">${entry.guid ?? entry.url}</guid>
      <pubDate>${entry.date.toUTCString()}</pubDate>
      <description>${escapeXml(entry.description)}</description>
    </item>`,
		)
		.join("\n");

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteTagline)}</description>
	<link>${new URL(localePath(locale, "/"), siteUrl).href}</link>
	<atom:link href="${new URL(localePath(locale, "/rss.xml"), siteUrl).href}" rel="self" type="application/rss+xml"/>
    <language>${LOCALES[locale].htmlLang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};

const XML_ESCAPE_PATTERNS = [
	[/&/g, "&amp;"],
	[/</g, "&lt;"],
	[/>/g, "&gt;"],
	[/"/g, "&quot;"],
	[/'/g, "&apos;"],
] as const;

function escapeXml(str: string): string {
	let result = str;
	for (const [pattern, replacement] of XML_ESCAPE_PATTERNS) {
		result = result.replace(pattern, replacement);
	}
	return result;
}
