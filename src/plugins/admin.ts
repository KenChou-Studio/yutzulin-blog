/**
 * Admin entry of the site-blocks plugin: renders the custom blocks in the
 * EmDash editor exactly as the site draws them, editable in place, and makes
 * the block UI follow the admin language. See block-nodeviews.ts.
 */
import "./blocks-admin.generated.css";
import "./blocks-admin.css";
import { getLocale, localizePluginBlocks } from "./block-i18n.ts";
import { localizeCollectionLabels } from "./admin-labels.ts";
import { installBlockNodeViews } from "./block-nodeviews.ts";

/**
 * Localises collection/field labels and our block definitions in the manifest the admin downloads, before
 * the editor builds its "/" menu and block forms from it.
 */
function localizeManifestRequests() {
	const nativeFetch = window.fetch.bind(window);
	window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
		const response = await nativeFetch(input, init);
		const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
		if (!/\/_emdash\/api\/manifest(\?|$)/.test(url) || !response.ok) return response;
		try {
			const body: any = await response.clone().json();
			const manifest = body?.data ?? body;
			const locale = getLocale();
			localizeCollectionLabels(manifest?.collections, locale);
			for (const plugin of Object.values<any>(manifest?.plugins ?? {})) {
				localizePluginBlocks(plugin?.portableTextBlocks, locale);
			}
			return new Response(JSON.stringify(body), {
				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
			});
		} catch {
			return response;
		}
	};
}

if (typeof window !== "undefined") {
	localizeManifestRequests();
	installBlockNodeViews();
}
