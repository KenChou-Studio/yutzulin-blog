/** Extracts the YouTube video id from the usual URL shapes, or null. */
export function getYouTubeId(url: string | undefined | null): string | null {
	if (!url) return null;
	let parsed: URL;
	try {
		parsed = new URL(url.trim());
	} catch {
		return null;
	}
	const host = parsed.hostname.replace(/^www\.|^m\./, "");
	let id: string | null = null;
	if (host === "youtu.be") id = parsed.pathname.slice(1).split("/")[0] ?? null;
	else if (host === "youtube.com" || host === "youtube-nocookie.com") {
		if (parsed.pathname === "/watch") id = parsed.searchParams.get("v");
		else {
			const match = parsed.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
			id = match?.[1] ?? null;
		}
	}
	return id && /^[\w-]{6,20}$/.test(id) ? id : null;
}

export const youTubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
