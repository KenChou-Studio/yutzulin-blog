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
				hero_content: "Hero (headline, subtitle, lead and focus line)",
				content: "Content (sections, stats, cards and feature blocks)",
				featured_image: "Featured image / portrait",
				excerpt: "Excerpt (subtitle and lead)",
			},
		},
		posts: {
			label: "Posts",
			labelSingular: "Post",
			fields: { title: "Title", featured_image: "Featured image", content: "Content", excerpt: "Excerpt" },
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
				hero_content: "橫幅區段（大標題、副標題、引言與焦點）",
				content: "頁面正文（章節標題、數據、卡片與功能區塊）",
				featured_image: "代表照片／肖像",
				excerpt: "副標題與引言",
			},
		},
		posts: {
			label: "文章",
			labelSingular: "文章",
			fields: { title: "標題", featured_image: "代表圖片", content: "內文", excerpt: "摘要" },
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
