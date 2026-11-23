import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";
import { i18nConfig } from "./src/i18n/config.ts";
import { siteBlocksPlugin } from "./src/plugins/site-blocks.ts";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	// Default locale (en) is unprefixed; zh-TW lives under /zh-TW. EmDash reads
	// this block for its locale list and fallback chain.
	i18n: i18nConfig,
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	redirects: {
		"/about.html": "/about",
		"/research.html": "/research",
		"/projects.html": "/projects",
		"/publications.html": "/publications",
		"/insights.html": "/insights",
		"/contact.html": "/contact",
		"/index.html": "/",
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
			admin: {
				hiddenNavItems: ["import"],
			},
			plugins: [siteBlocksPlugin()],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
