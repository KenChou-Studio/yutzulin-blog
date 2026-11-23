/**
 * Unified I18N and Block Definitions for Custom Blocks:
 *  - info_card (資訊卡)
 *  - callout_box (重點引言)
 *  - contact_item (聯絡項目)
 *  - hero_block (首頁英雄橫幅)
 *  - recent_posts (文章專欄展示)
 *  - stats_grid (關鍵數據與焦點)
 *
 * Single Source of Truth shared across:
 *  - Backend Native Plugin registration (site-blocks.ts)
 *  - In-place block editing in the admin editor and on-page visual editing (block-nodeviews.ts)
 */

import type { PortableTextBlockConfig } from "emdash";

export type SupportedLocale = "zh" | "en";

export type CustomBlockType =
	| "info_card"
	| "callout_box"
	| "contact_item"
	| "hero_block"
	| "recent_posts"
	| "stats_grid"
	| "news_item"
	| "recent_news";

export interface FieldI18n {
	label: string;
	placeholder: string;
}

export interface BlockI18nEntry {
	name: string;
	description: string;
	titleFallback: string;
	descFallback: string;
	editTooltip: string;
	dialogTitleEdit: string;
	dialogTitleInsert: string;
	fields: Record<string, FieldI18n>;
}

export interface BlockDefinition {
	type: CustomBlockType;
	icon: string;
	category?: string;
	zh: BlockI18nEntry;
	en: BlockI18nEntry;
}

export const BLOCKS: Record<CustomBlockType, BlockDefinition> = {
	recent_news: {
		type: "recent_news",
		icon: "newspaper",
		category: "Sections",
		zh: {
			name: "最新消息列表",
			description: "顯示最新幾則消息（來自「最新消息」集合），可放在首頁。",
			titleFallback: "最新消息",
			descFallback: "設定專欄標題、篇數...",
			editTooltip: "編輯最新消息列表",
			dialogTitleEdit: "編輯 最新消息列表",
			dialogTitleInsert: "插入 最新消息列表",
			fields: {
				eyebrow: { label: "專欄眉標", placeholder: "例：最新消息" },
				title: { label: "專欄標題", placeholder: "例：最新動態" },
				lead: { label: "導言說明", placeholder: "例：計畫、著作與新文章的最新消息。" },
				actionText: { label: "按鈕文字", placeholder: "預設: 查看所有消息" },
				actionUrl: { label: "按鈕連結", placeholder: "預設: /news" },
				limit: { label: "顯示篇數", placeholder: "預設: 3" },
			},
		},
		en: {
			name: "Recent News",
			description: "Shows the latest entries of the News collection; use it on the home page.",
			titleFallback: "Latest News",
			descFallback: "Set the title, number of items...",
			editTooltip: "Edit recent news",
			dialogTitleEdit: "Edit Recent News",
			dialogTitleInsert: "Insert Recent News",
			fields: {
				eyebrow: { label: "Eyebrow", placeholder: "e.g. Latest News" },
				title: { label: "Title", placeholder: "e.g. News & Updates" },
				lead: { label: "Lead Text", placeholder: "e.g. Updates on projects and publications." },
				actionText: { label: "Action Label", placeholder: "Default: View all news" },
				actionUrl: { label: "Action URL", placeholder: "Default: /news" },
				limit: { label: "Limit", placeholder: "Default: 3" },
			},
		},
	},
	news_item: {
		type: "news_item",
		icon: "newspaper",
		category: "Cards",
		zh: {
			name: "最新消息",
			description: "圖片、標題與敘述，整張卡片可點擊前往連結。",
			titleFallback: "消息標題",
			descFallback: "點擊「編輯」設定圖片、標題、敘述與連結...",
			editTooltip: "編輯此消息",
			dialogTitleEdit: "編輯 最新消息",
			dialogTitleInsert: "插入 最新消息",
			fields: {
				imageUrl: { label: "圖片", placeholder: "從媒體庫選擇，或貼上圖片網址" },
				imageAlt: { label: "圖片替代文字", placeholder: "描述圖片內容（無障礙用）" },
				title: { label: "標題", placeholder: "輸入消息標題" },
				description: { label: "敘述", placeholder: "輸入消息敘述" },
				link: { label: "連結網址", placeholder: "https://... 或 /posts/..." },
			},
		},
		en: {
			name: "News Item",
			description: "Image, title and description; the whole card links to a URL.",
			titleFallback: "News title",
			descFallback: "Click 'Edit' to set the image, title, description and link...",
			editTooltip: "Edit news item",
			dialogTitleEdit: "Edit News Item",
			dialogTitleInsert: "Insert News Item",
			fields: {
				imageUrl: { label: "Image", placeholder: "Pick from the media library or paste an image URL" },
				imageAlt: { label: "Image alt text", placeholder: "Describe the image (accessibility)" },
				title: { label: "Title", placeholder: "Enter the news title" },
				description: { label: "Description", placeholder: "Enter the news description" },
				link: { label: "Link URL", placeholder: "https://... or /posts/..." },
			},
		},
	},
	info_card: {
		type: "info_card",
		icon: "link",
		category: "Cards",
		zh: {
			name: "資訊卡",
			description: "填寫此區塊顯示的內容。",
			titleFallback: "卡片標題",
			descFallback: "點擊「編輯」設定卡片說明內容...",
			editTooltip: "編輯此卡片內容",
			dialogTitleEdit: "編輯 資訊卡",
			dialogTitleInsert: "插入 資訊卡",
			fields: {
				badge: {
					label: "角標",
					placeholder: "例：AI + COMMUNITY PLANNING / RESEARCH",
				},
				title: {
					label: "卡片標題",
					placeholder: "輸入卡片標題",
				},
				description: {
					label: "卡片內容",
					placeholder: "輸入卡片內容或專案摘要",
				},
				link: {
					label: "連結網址",
					placeholder: "https://... 或 /projects",
				},
				linkText: {
					label: "按鈕文字",
					placeholder: "預設: Explore →",
				},
			},
		},
		en: {
			name: "Info Card",
			description: "Fill in what this block shows.",
			titleFallback: "Card Title",
			descFallback: "Click 'Edit' to configure card description...",
			editTooltip: "Edit card content",
			dialogTitleEdit: "Edit Info Card",
			dialogTitleInsert: "Insert Info Card",
			fields: {
				badge: {
					label: "Badge",
					placeholder: "e.g. AI + COMMUNITY PLANNING / RESEARCH",
				},
				title: {
					label: "Title",
					placeholder: "Enter card title",
				},
				description: {
					label: "Description",
					placeholder: "Enter description or project summary",
				},
				link: {
					label: "Link URL",
					placeholder: "https://... or /projects",
				},
				linkText: {
					label: "Button Text",
					placeholder: "Default: Explore →",
				},
			},
		},
	},
	callout_box: {
		type: "callout_box",
		icon: "code",
		category: "Editorial",
		zh: {
			name: "重點引言",
			description: "填寫此區塊顯示的內容。",
			titleFallback: "引言標題",
			descFallback: "點擊「編輯」設定引言內容...",
			editTooltip: "編輯此引言內容",
			dialogTitleEdit: "編輯 重點引言",
			dialogTitleInsert: "插入 重點引言",
			fields: {
				title: {
					label: "引言標題",
					placeholder: "例：Focus Areas",
				},
				text: {
					label: "引言內容",
					placeholder: "輸入引言重點內文",
				},
			},
		},
		en: {
			name: "Callout",
			description: "Fill in what this block shows.",
			titleFallback: "Title",
			descFallback: "Click 'Edit' to configure callout...",
			editTooltip: "Edit callout content",
			dialogTitleEdit: "Edit Callout",
			dialogTitleInsert: "Insert Callout",
			fields: {
				title: {
					label: "Title",
					placeholder: "e.g. Focus Areas",
				},
				text: {
					label: "Content",
					placeholder: "Enter callout content",
				},
			},
		},
	},
	contact_item: {
		type: "contact_item",
		icon: "address-book",
		category: "Contact",
		zh: {
			name: "聯絡項目",
			description: "填寫此區塊顯示的內容。",
			titleFallback: "項目標籤",
			descFallback: "點擊「編輯」設定聯絡資訊...",
			editTooltip: "編輯此聯絡項目內容",
			dialogTitleEdit: "編輯 聯絡項目",
			dialogTitleInsert: "插入 聯絡項目",
			fields: {
				label: {
					label: "項目標籤",
					placeholder: "例：Academic Email 學術信箱",
				},
				value: {
					label: "主要資訊",
					placeholder: "例：keats0704@mail.chihlee.edu.tw",
				},
				detail: {
					label: "補充說明",
					placeholder: "例：致理科技大學 商務管理學院 財務金融系",
				},
				link: {
					label: "連結網址",
					placeholder: "例：mailto:keats0704@mail.chihlee.edu.tw",
				},
			},
		},
		en: {
			name: "Contact Item",
			description: "Fill in what this block shows.",
			titleFallback: "Label",
			descFallback: "Click 'Edit' to configure contact info...",
			editTooltip: "Edit contact content",
			dialogTitleEdit: "Edit Contact Item",
			dialogTitleInsert: "Insert Contact Item",
			fields: {
				label: {
					label: "Label",
					placeholder: "e.g. Academic Email",
				},
				value: {
					label: "Value / Email",
					placeholder: "e.g. keats0704@mail.chihlee.edu.tw",
				},
				detail: {
					label: "Detail / Subtext",
					placeholder: "e.g. Department of Finance, Chihlee University",
				},
				link: {
					label: "Link URL",
					placeholder: "e.g. mailto:keats0704@mail.chihlee.edu.tw",
				},
			},
		},
	},
	hero_block: {
		type: "hero_block",
		icon: "sparkles",
		category: "Sections",
		zh: {
			name: "首頁英雄橫幅",
			description: "自訂首頁或專題頁頂部之視覺大看板，包含主次按鈕與個人/專題肖像圖。",
			titleFallback: "首頁英雄橫幅",
			descFallback: "點擊「編輯」設定橫幅標題、引言與按鈕...",
			editTooltip: "編輯此英雄橫幅內容",
			dialogTitleEdit: "編輯 首頁英雄橫幅",
			dialogTitleInsert: "插入 首頁英雄橫幅",
			fields: {
				eyebrow: {
					label: "眉標",
					placeholder: "例：Urban Planner · Educator · Researcher",
				},
				title: {
					label: "主標題",
					placeholder: "例：Yu-Tzu Lin 林育慈",
				},
				lead: {
					label: "引言描述",
					placeholder: "例：Connecting urban planning research, practice and education...",
				},
				focusline: {
					label: "專長焦點列",
					placeholder: "例：Urban Regeneration · Climate Resilience · Social Housing",
				},
				primaryText: {
					label: "主按鈕文字",
					placeholder: "預設: Explore My Work",
				},
				primaryUrl: {
					label: "主按鈕連結",
					placeholder: "預設: /research",
				},
				secondaryText: {
					label: "次按鈕文字",
					placeholder: "預設: About Yu-Tzu",
				},
				secondaryUrl: {
					label: "次按鈕連結",
					placeholder: "預設: /about",
				},
				imageUrl: {
					label: "圖片網址",
					placeholder: "預設: /images/yu-tzu-lin.jpg",
				},
				imageAlt: {
					label: "圖片替代文字",
					placeholder: "例：Portrait of Yu-Tzu Lin 林育慈",
				},
			},
		},
		en: {
			name: "Hero Showcase",
			description: "Featured hero banner showcase with dual action buttons and portrait image.",
			titleFallback: "Hero Showcase",
			descFallback: "Click 'Edit' to configure hero title, lead, and action buttons...",
			editTooltip: "Edit hero showcase",
			dialogTitleEdit: "Edit Hero Showcase",
			dialogTitleInsert: "Insert Hero Showcase",
			fields: {
				eyebrow: {
					label: "Eyebrow",
					placeholder: "e.g. Urban Planner · Educator · Researcher",
				},
				title: {
					label: "Title",
					placeholder: "e.g. Yu-Tzu Lin 林育慈",
				},
				lead: {
					label: "Lead Text",
					placeholder: "e.g. Connecting urban planning research, practice and education...",
				},
				focusline: {
					label: "Focusline",
					placeholder: "e.g. Urban Regeneration · Climate Resilience · Social Housing",
				},
				primaryText: {
					label: "Primary Button Text",
					placeholder: "Default: Explore My Work",
				},
				primaryUrl: {
					label: "Primary Button URL",
					placeholder: "Default: /research",
				},
				secondaryText: {
					label: "Secondary Button Text",
					placeholder: "Default: About Yu-Tzu",
				},
				secondaryUrl: {
					label: "Secondary Button URL",
					placeholder: "Default: /about",
				},
				imageUrl: {
					label: "Image URL",
					placeholder: "Default: /images/yu-tzu-lin.jpg",
				},
				imageAlt: {
					label: "Image Alt Text",
					placeholder: "e.g. Portrait of Yu-Tzu Lin 林育慈",
				},
			},
		},
	},
	recent_posts: {
		type: "recent_posts",
		icon: "newspaper",
		category: "Sections",
		zh: {
			name: "文章專欄展示",
			description: "動態嵌入精選或最新文章列表，支援數量與標籤篩選。",
			titleFallback: "精選文章專欄",
			descFallback: "點擊「編輯」設定專欄標題、篇數與標籤篩選...",
			editTooltip: "編輯此文章專欄展示",
			dialogTitleEdit: "編輯 文章專欄展示",
			dialogTitleInsert: "插入 文章專欄展示",
			fields: {
				eyebrow: {
					label: "專欄眉標",
					placeholder: "例：Urban Insights & Case Studies",
				},
				title: {
					label: "專欄標題",
					placeholder: "例：Articles & Publications",
				},
				lead: {
					label: "導言說明",
					placeholder: "例：In-depth observations on transit hubs, public housing...",
				},
				actionText: {
					label: "按鈕文字",
					placeholder: "預設: View all articles",
				},
				actionUrl: {
					label: "按鈕連結",
					placeholder: "預設: /posts",
				},
				limit: {
					label: "顯示篇數",
					placeholder: "預設: 6 (可填 3, 6, 9 等數字)",
				},
				tag: {
					label: "標籤篩選",
					placeholder: "留空為所有最新文章，或填寫標籤 slug",
				},
			},
		},
		en: {
			name: "Articles Showcase",
			description: "Dynamically embeds recent or curated articles with limit and tag filters.",
			titleFallback: "Articles & Publications",
			descFallback: "Click 'Edit' to configure articles title, limit, and tag filter...",
			editTooltip: "Edit articles showcase",
			dialogTitleEdit: "Edit Articles Showcase",
			dialogTitleInsert: "Insert Articles Showcase",
			fields: {
				eyebrow: {
					label: "Eyebrow",
					placeholder: "e.g. Urban Insights & Case Studies",
				},
				title: {
					label: "Title",
					placeholder: "e.g. Articles & Publications",
				},
				lead: {
					label: "Lead Text",
					placeholder: "e.g. In-depth observations on transit hubs...",
				},
				actionText: {
					label: "Action Label",
					placeholder: "Default: View all articles",
				},
				actionUrl: {
					label: "Action URL",
					placeholder: "Default: /posts",
				},
				limit: {
					label: "Limit",
					placeholder: "Default: 6 (e.g. 3, 6, 9)",
				},
				tag: {
					label: "Tag Filter",
					placeholder: "Leave empty for all, or enter tag slug",
				},
			},
		},
	},
	stats_grid: {
		type: "stats_grid",
		icon: "bar-chart-2",
		category: "Sections",
		zh: {
			name: "關鍵數據與焦點",
			description: "呈現 2-4 項關鍵學術、研究或專案亮點數據（沉穩報紙字體與精緻標籤）。",
			titleFallback: "關鍵數據與焦點亮點",
			descFallback: "點擊「編輯」設定亮點數值與說明標籤...",
			editTooltip: "編輯關鍵數據亮點",
			dialogTitleEdit: "編輯 關鍵數據與焦點",
			dialogTitleInsert: "插入 關鍵數據與焦點",
			fields: {
				item1_num: {
					label: "數據 1 數值",
					placeholder: "例：15+",
				},
				item1_label: {
					label: "數據 1 說明",
					placeholder: "例：Years of Urban Research & Practice",
				},
				item2_num: {
					label: "數據 2 數值",
					placeholder: "例：3",
				},
				item2_label: {
					label: "數據 2 說明",
					placeholder: "例：Global Regions (Taiwan, NL, UK)",
				},
				item3_num: {
					label: "數據 3 數值",
					placeholder: "例：20+",
				},
				item3_label: {
					label: "數據 3 說明",
					placeholder: "例：Publications & Studio Courses",
				},
				item4_num: {
					label: "數據 4 數值",
					placeholder: "例：10+",
				},
				item4_label: {
					label: "數據 4 說明",
					placeholder: "例：Community & Municipal Projects",
				},
			},
		},
		en: {
			name: "Key Metrics",
			description: "Showcase 2-4 key research, academic, or project highlights with refined metrics.",
			titleFallback: "Key Metrics & Focus",
			descFallback: "Click 'Edit' to configure key numbers and descriptive labels...",
			editTooltip: "Edit key metrics",
			dialogTitleEdit: "Edit Key Metrics",
			dialogTitleInsert: "Insert Key Metrics",
			fields: {
				item1_num: {
					label: "Metric 1 Value",
					placeholder: "e.g. 15+",
				},
				item1_label: {
					label: "Metric 1 Label",
					placeholder: "e.g. Years of Urban Research & Practice",
				},
				item2_num: {
					label: "Metric 2 Value",
					placeholder: "e.g. 3",
				},
				item2_label: {
					label: "Metric 2 Label",
					placeholder: "e.g. Global Regions (Taiwan, NL, UK)",
				},
				item3_num: {
					label: "Metric 3 Value",
					placeholder: "e.g. 20+",
				},
				item3_label: {
					label: "Metric 3 Label",
					placeholder: "e.g. Publications & Studio Courses",
				},
				item4_num: {
					label: "Metric 4 Value",
					placeholder: "e.g. 10+",
				},
				item4_label: {
					label: "Metric 4 Label",
					placeholder: "e.g. Community & Municipal Projects",
				},
			},
		},
	},
};

export const COMMON_I18N = {
	zh: {
		edit: "編輯全部欄位",
		delete: "刪除區塊",
		chooseImage: "選擇／上傳圖片",
		cancel: "取消",
		save: "儲存",
		close: "關閉",
		dialogDesc: "填寫此區塊顯示的內容。",
	},
	en: {
		edit: "Edit all fields",
		delete: "Delete block",
		chooseImage: "Choose / upload image",
		cancel: "Cancel",
		save: "Save",
		close: "Close",
		dialogDesc: "Fill in what this block shows.",
	},
};

/**
 * Language of the editing UI.
 *
 * In the EmDash admin this is the admin's own language (cookie `emdash-locale`,
 * scoped to /_emdash). On the site, in on-page edit mode, it is the language of
 * the page. Deliberately NOT the `?locale=` URL parameter: that selects which
 * translation of the *content* is being edited, not the interface language.
 */
export function getLocale(): SupportedLocale {
	if (typeof window === "undefined") return "zh";
	const pick = (value: string | null | undefined): SupportedLocale | null => {
		const v = (value ?? "").toLowerCase();
		if (v.startsWith("zh")) return "zh";
		if (v.startsWith("en")) return "en";
		return null;
	};
	try {
		const cookie = document.cookie.match(/(?:^|;\s*)emdash-locale=([^;]+)/);
		const fromCookie = pick(cookie && decodeURIComponent(cookie[1]));
		if (fromCookie) return fromCookie;
	} catch {}
	return pick(document.documentElement.lang) ?? pick(navigator.language) ?? "zh";
}

/**
 * Generate portableTextBlocks schema definition for site-blocks plugin.
 */
export function getPortableTextBlocks(locale: SupportedLocale = "zh"): PortableTextBlockConfig[] {
	return [
		{
			type: BLOCKS.info_card.type,
			label: BLOCKS.info_card[locale].name,
			icon: BLOCKS.info_card.icon,
			description: BLOCKS.info_card[locale].description,
			category: BLOCKS.info_card.category,
			fields: [
				{
					type: "text_input" as const,
					action_id: "badge",
					label: BLOCKS.info_card[locale].fields.badge.label,
					placeholder: BLOCKS.info_card[locale].fields.badge.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "title",
					label: BLOCKS.info_card[locale].fields.title.label,
					placeholder: BLOCKS.info_card[locale].fields.title.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "description",
					label: BLOCKS.info_card[locale].fields.description.label,
					placeholder: BLOCKS.info_card[locale].fields.description.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "link",
					label: BLOCKS.info_card[locale].fields.link.label,
					placeholder: BLOCKS.info_card[locale].fields.link.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "linkText",
					label: BLOCKS.info_card[locale].fields.linkText.label,
					placeholder: BLOCKS.info_card[locale].fields.linkText.placeholder,
				},
			],
		},
		{
			type: BLOCKS.callout_box.type,
			label: BLOCKS.callout_box[locale].name,
			icon: BLOCKS.callout_box.icon,
			description: BLOCKS.callout_box[locale].description,
			category: BLOCKS.callout_box.category,
			fields: [
				{
					type: "text_input" as const,
					action_id: "title",
					label: BLOCKS.callout_box[locale].fields.title.label,
					placeholder: BLOCKS.callout_box[locale].fields.title.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "text",
					label: BLOCKS.callout_box[locale].fields.text.label,
					placeholder: BLOCKS.callout_box[locale].fields.text.placeholder,
				},
			],
		},
		{
			type: BLOCKS.contact_item.type,
			label: BLOCKS.contact_item[locale].name,
			icon: BLOCKS.contact_item.icon,
			description: BLOCKS.contact_item[locale].description,
			category: BLOCKS.contact_item.category,
			fields: [
				{
					type: "text_input" as const,
					action_id: "label",
					label: BLOCKS.contact_item[locale].fields.label.label,
					placeholder: BLOCKS.contact_item[locale].fields.label.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "value",
					label: BLOCKS.contact_item[locale].fields.value.label,
					placeholder: BLOCKS.contact_item[locale].fields.value.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "detail",
					label: BLOCKS.contact_item[locale].fields.detail.label,
					placeholder: BLOCKS.contact_item[locale].fields.detail.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "link",
					label: BLOCKS.contact_item[locale].fields.link.label,
					placeholder: BLOCKS.contact_item[locale].fields.link.placeholder,
				},
			],
		},
		{
			type: BLOCKS.hero_block.type,
			label: BLOCKS.hero_block[locale].name,
			icon: BLOCKS.hero_block.icon,
			description: BLOCKS.hero_block[locale].description,
			category: BLOCKS.hero_block.category,
			fields: [
				{
					type: "text_input" as const,
					action_id: "eyebrow",
					label: BLOCKS.hero_block[locale].fields.eyebrow.label,
					placeholder: BLOCKS.hero_block[locale].fields.eyebrow.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "title",
					label: BLOCKS.hero_block[locale].fields.title.label,
					placeholder: BLOCKS.hero_block[locale].fields.title.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "lead",
					label: BLOCKS.hero_block[locale].fields.lead.label,
					placeholder: BLOCKS.hero_block[locale].fields.lead.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "focusline",
					label: BLOCKS.hero_block[locale].fields.focusline.label,
					placeholder: BLOCKS.hero_block[locale].fields.focusline.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "primaryText",
					label: BLOCKS.hero_block[locale].fields.primaryText.label,
					placeholder: BLOCKS.hero_block[locale].fields.primaryText.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "primaryUrl",
					label: BLOCKS.hero_block[locale].fields.primaryUrl.label,
					placeholder: BLOCKS.hero_block[locale].fields.primaryUrl.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "secondaryText",
					label: BLOCKS.hero_block[locale].fields.secondaryText.label,
					placeholder: BLOCKS.hero_block[locale].fields.secondaryText.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "secondaryUrl",
					label: BLOCKS.hero_block[locale].fields.secondaryUrl.label,
					placeholder: BLOCKS.hero_block[locale].fields.secondaryUrl.placeholder,
				},
				{
					type: "media_picker" as const,
					action_id: "imageUrl",
					label: BLOCKS.hero_block[locale].fields.imageUrl.label,
					mime_type_filter: "image/",
				},
				{
					type: "text_input" as const,
					action_id: "imageAlt",
					label: BLOCKS.hero_block[locale].fields.imageAlt.label,
					placeholder: BLOCKS.hero_block[locale].fields.imageAlt.placeholder,
				},
			],
		},
		{
			type: BLOCKS.recent_posts.type,
			label: BLOCKS.recent_posts[locale].name,
			icon: BLOCKS.recent_posts.icon,
			description: BLOCKS.recent_posts[locale].description,
			category: BLOCKS.recent_posts.category,
			fields: [
				{
					type: "text_input" as const,
					action_id: "eyebrow",
					label: BLOCKS.recent_posts[locale].fields.eyebrow.label,
					placeholder: BLOCKS.recent_posts[locale].fields.eyebrow.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "title",
					label: BLOCKS.recent_posts[locale].fields.title.label,
					placeholder: BLOCKS.recent_posts[locale].fields.title.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "lead",
					label: BLOCKS.recent_posts[locale].fields.lead.label,
					placeholder: BLOCKS.recent_posts[locale].fields.lead.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "actionText",
					label: BLOCKS.recent_posts[locale].fields.actionText.label,
					placeholder: BLOCKS.recent_posts[locale].fields.actionText.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "actionUrl",
					label: BLOCKS.recent_posts[locale].fields.actionUrl.label,
					placeholder: BLOCKS.recent_posts[locale].fields.actionUrl.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "limit",
					label: BLOCKS.recent_posts[locale].fields.limit.label,
					placeholder: BLOCKS.recent_posts[locale].fields.limit.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "tag",
					label: BLOCKS.recent_posts[locale].fields.tag.label,
					placeholder: BLOCKS.recent_posts[locale].fields.tag.placeholder,
				},
			],
		},
		{
			type: BLOCKS.stats_grid.type,
			label: BLOCKS.stats_grid[locale].name,
			icon: BLOCKS.stats_grid.icon,
			description: BLOCKS.stats_grid[locale].description,
			category: BLOCKS.stats_grid.category,
			fields: [
				{
					type: "text_input" as const,
					action_id: "item1_num",
					label: BLOCKS.stats_grid[locale].fields.item1_num.label,
					placeholder: BLOCKS.stats_grid[locale].fields.item1_num.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "item1_label",
					label: BLOCKS.stats_grid[locale].fields.item1_label.label,
					placeholder: BLOCKS.stats_grid[locale].fields.item1_label.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "item2_num",
					label: BLOCKS.stats_grid[locale].fields.item2_num.label,
					placeholder: BLOCKS.stats_grid[locale].fields.item2_num.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "item2_label",
					label: BLOCKS.stats_grid[locale].fields.item2_label.label,
					placeholder: BLOCKS.stats_grid[locale].fields.item2_label.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "item3_num",
					label: BLOCKS.stats_grid[locale].fields.item3_num.label,
					placeholder: BLOCKS.stats_grid[locale].fields.item3_num.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "item3_label",
					label: BLOCKS.stats_grid[locale].fields.item3_label.label,
					placeholder: BLOCKS.stats_grid[locale].fields.item3_label.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "item4_num",
					label: BLOCKS.stats_grid[locale].fields.item4_num.label,
					placeholder: BLOCKS.stats_grid[locale].fields.item4_num.placeholder,
				},
				{
					type: "text_input" as const,
					action_id: "item4_label",
					label: BLOCKS.stats_grid[locale].fields.item4_label.label,
					placeholder: BLOCKS.stats_grid[locale].fields.item4_label.placeholder,
				},
			],
		},
		{
			type: BLOCKS.news_item.type,
			label: BLOCKS.news_item[locale].name,
			icon: BLOCKS.news_item.icon,
			description: BLOCKS.news_item[locale].description,
			category: BLOCKS.news_item.category,
			fields: [
				{
					type: "media_picker",
					action_id: "imageUrl",
					label: BLOCKS.news_item[locale].fields.imageUrl.label,
					mime_type_filter: "image/",
				},
				...(["imageAlt", "title", "description", "link"] as const).map((field) => ({
					type: "text_input" as const,
					action_id: field,
					label: BLOCKS.news_item[locale].fields[field].label,
					placeholder: BLOCKS.news_item[locale].fields[field].placeholder,
				})),
			],
		},
		{
			type: BLOCKS.recent_news.type,
			label: BLOCKS.recent_news[locale].name,
			icon: BLOCKS.recent_news.icon,
			description: BLOCKS.recent_news[locale].description,
			category: BLOCKS.recent_news.category,
			fields: (["eyebrow", "title", "lead", "actionText", "actionUrl", "limit"] as const).map((field) => ({
				type: "text_input" as const,
				action_id: field,
				label: BLOCKS.recent_news[locale].fields[field].label,
				placeholder: BLOCKS.recent_news[locale].fields[field].placeholder,
			})),
		},
	] as PortableTextBlockConfig[];
}

/**
 * Rewrites the labels of our block definitions in place for `locale`.
 *
 * The plugin descriptor is built once on the server with a single language, so
 * the admin would always show that language. The editor reads these objects
 * when it renders the "/" menu and the block form, so localising them on the
 * client makes the block UI follow the admin language.
 */
export function localizePluginBlocks(blocks: any[] | undefined, locale: SupportedLocale): void {
	if (!Array.isArray(blocks)) return;
	const source = new Map(getPortableTextBlocks(locale).map((block) => [block.type, block]));
	for (const block of blocks) {
		const next = source.get(block?.type) as any;
		if (!next) continue;
		block.label = next.label;
		block.description = next.description;
		const byId = new Map<string, any>((next.fields ?? []).map((f: any) => [f.action_id, f]));
		for (const field of block.fields ?? []) {
			const match = byId.get(field.action_id);
			if (!match) continue;
			field.label = match.label;
			if (match.placeholder !== undefined) field.placeholder = match.placeholder;
		}
	}
}
