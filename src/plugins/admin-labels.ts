/**
 * Admin-language labels for the site's collections and fields.
 *
 * EmDash stores one label per collection/field in the database, so the admin
 * would show a single language. The admin entry rewrites these labels in the
 * manifest for the active admin language (see admin.ts), the same way it does
 * for the custom blocks. Slugs not listed here keep the stored label.
 */
import type { SupportedLocale } from "./block-i18n.ts";

type Labels = { label: string; labelSingular?: string; fields?: Record<string, string> };

export const ADMIN_LABELS: Record<SupportedLocale, Record<string, Labels>> = {
	en: {
		pages: {
			label: "Pages",
			labelSingular: "Page",
			fields: {
				title: "Title",
				hero_content: "Hero (legacy: used on the home page only when Content has no Hero block)",
				content: "Content (sections, stats, cards and feature blocks)",
				featured_image: "Featured image (not used on the home page when it has a Hero block)",
				excerpt: "Excerpt (subtitle and lead)",
			},
		},
		posts: {
			label: "Posts",
			labelSingular: "Post",
			fields: { title: "Title", featured_image: "Featured image", content: "Content", excerpt: "Excerpt" },
		},
		news: {
			label: "News",
			labelSingular: "News item",
			fields: { title: "Title", featured_image: "Image", excerpt: "Description", link: "Link URL" },
		},
		ui_strings: {
			label: "UI Text",
			labelSingular: "UI Text",
			fields: { title: "Key (do not change)", text: "Text" },
		},
	},
	zh: {
		pages: {
			label: "頁面",
			labelSingular: "頁面",
			fields: {
				title: "頁面標題",
				hero_content: "舊版橫幅（僅在首頁內文沒有 Hero 區塊時使用）",
				content: "頁面正文（章節標題、數據、卡片與功能區塊）",
				featured_image: "代表圖片（首頁有 Hero 區塊時不使用，請改在 Hero 區塊設定圖片）",
				excerpt: "副標題與引言",
			},
		},
		posts: {
			label: "文章",
			labelSingular: "文章",
			fields: { title: "標題", featured_image: "代表圖片", content: "內文", excerpt: "摘要" },
		},
		news: {
			label: "最新消息",
			labelSingular: "消息",
			fields: { title: "標題", featured_image: "圖片", excerpt: "敘述", link: "連結網址" },
		},
		ui_strings: {
			label: "介面文字",
			labelSingular: "介面文字",
			fields: { title: "鍵值（請勿修改）", text: "文字" },
		},
	},
};

/** Rewrites collection and field labels of a manifest's `collections` in place. */
export function localizeCollectionLabels(collections: any, locale: SupportedLocale): void {
	if (!collections || typeof collections !== "object") return;
	const dict = ADMIN_LABELS[locale] ?? ADMIN_LABELS.zh;
	for (const [slug, collection] of Object.entries<any>(collections)) {
		const labels = dict[slug];
		if (!labels || !collection) continue;
		collection.label = labels.label;
		if (labels.labelSingular) collection.labelSingular = labels.labelSingular;
		for (const [field, label] of Object.entries(labels.fields ?? {})) {
			if (collection.fields?.[field]) collection.fields[field].label = label;
		}
	}
}
