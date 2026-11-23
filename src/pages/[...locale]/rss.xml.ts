import type { APIRoute } from "astro";
import { getEmDashCollection, getSiteSettings } from "emdash";

import { LOCALES, getTranslator, localePath, resolveRouteLocale } from "../../i18n";
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

	const { entries: posts } = await getEmDashCollection("posts", {
		locale,
		orderBy: { published_at: "desc" },
		limit: 20,
	});

	const items = posts
		.map((post) => {
			if (!post.data.publishedAt) return null;
			const pubDate = post.data.publishedAt.toUTCString();

			const postUrl = new URL(localePath(locale, `/posts/${post.data.slug ?? post.id}`), siteUrl).href;
			const title = escapeXml(post.data.title || t("posts.untitled"));
			const description = escapeXml(post.data.excerpt || "");

			return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
		})
		.filter(Boolean)
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
