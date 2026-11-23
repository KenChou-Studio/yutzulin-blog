/**
 * Default UI strings for the theme chrome (navigation, labels, empty states).
 *
 * These are only the *defaults*. Every key is also seeded as an entry in the
 * `ui_strings` collection, so editors change the live text in the EmDash admin
 * (Content → UI Text); `load.ts` layers those entries over this dictionary. A
 * key missing from the CMS (or a CMS outage) falls back to the value here.
 */
import { DEFAULT_LOCALE, type Locale } from "./config";

const en = {
	"site.title": "Yu-Tzu Lin 林育慈",
	"site.tagline": "Urban Planner · Educator · Researcher",

	"a11y.skip": "Skip to content",
	"nav.main": "Main",
	"nav.mobile": "Mobile navigation",
	"nav.home": "Home",
	"nav.openMenu": "Open navigation menu",
	"nav.closeMenu": "Close navigation menu",
	"nav.admin": "Admin",
	"nav.adminDashboard": "Admin Dashboard",

	"search.title": "Search",
	"search.placeholder": "Search",
	"search.mobile": "Search articles & pages...",
	"search.mobileLabel": "Search posts and pages",
	"search.heading": "What are you looking for?",
	"search.formLabel": "Posts",
	"search.inputLabel": "Search posts",
	"search.inputPlaceholder": "Search posts",
	"search.submit": "Search",
	"search.description": "Search blog posts",
	"search.titleWithQuery": "Search: {query}",
	"search.hint": "Searches post titles and full text. Not sure where to start?",
	"search.browseAll": "Browse all posts",
	"search.summaryTop": "Top {count} results",
	"search.summaryOne": "{count} result",
	"search.summaryMany": "{count} results",
	"search.for": "for “{query}”",
	"search.noResults": "No results for “{query}”",
	"search.noResultsText":
		"Check the spelling, try fewer or different words, or browse every post instead.",
	"search.orSearch": "Or search posts",
	"search.loading": "Searching...",
	"search.noResultsLive": "No results found",

	"theme.appearance": "Appearance",
	"theme.group": "Color theme",
	"theme.light": "Light",
	"theme.dark": "Dark",
	"theme.system": "System",

	"footer.navigate": "Navigate",
	"footer.connect": "Connect",
	"footer.rss": "RSS feed",
	"footer.rights": "© {year} {title}. All rights reserved.",

	"lang.switch": "Language",

	"posts.all": "All posts",
	"posts.allTitle": "All Posts",
	"posts.description": "Browse all blog posts",
	"posts.archive": "Archive",
	"posts.archiveLead": "Every post, newest first.",
	"posts.none": "No posts yet",
	"posts.noneText": "Published posts will show up here.",
	"posts.noMore": "No more posts",
	"posts.noMoreText": "You have reached the end of the archive.",
	"posts.firstPage": "First page",
	"posts.untitled": "Untitled",
	"posts.readArticle": "Read article",
	"posts.continue": "Continue reading",
	"posts.tags": "Tags",
	"posts.author": "Author",
	"posts.authors": "Authors",
	"posts.published": "Published",
	"posts.readingTime": "Reading time",
	"posts.readingTimeValue": "{minutes} min",
	"posts.readMinutes": "{minutes} min read",
	"posts.discussion": "Discussion",
	"posts.toc": "On this page",
	"posts.moreFromBlog": "More from the blog",
	"posts.noneRelated": "No articles found.",

	"byline.and": " and ",
	"byline.sep": ", ",
	"byline.andSr": "and {names}",

	"pager.label": "Pagination",
	"pager.first": "First page",
	"pager.next": "Next page",
	"pager.firstBack": "Back to the first page",
	"pager.pastLast": "This page is past the last post.",

	"category.eyebrow": "Category",
	"category.title": "{label} posts",
	"category.description": "All posts in {label}",
	"category.lead": "Posts filed under {label}, newest first.",
	"category.empty": "No posts have been filed under {label} so far.",
	"tag.eyebrow": "Tag",
	"tag.title": "Posts tagged “{label}”",
	"tag.description": "All posts tagged with {label}",
	"tag.lead": "Posts tagged {label}, newest first.",
	"tag.empty": "No posts have been tagged {label} so far.",
	"archive.nothingYet": "Nothing here yet",

	"notFound.title": "Page not found",
	"notFound.code": "Error 404",
	"notFound.text": "The page you’re looking for doesn’t exist or may have moved.",
	"notFound.home": "Go home",
	"notFound.browse": "Browse posts",

	"page.home": "Home",
	"rss.description": "Latest posts",
	"blocks.recentEyebrow": "Urban Insights & Case Studies",
	"blocks.recentTitle": "Articles & Publications",
	"blocks.recentLead":
		"In-depth observations on transit hubs, public housing models, green infrastructure, and community co-creation.",
	"blocks.recentAction": "View all articles",
	"blocks.cardLink": "Explore →",

	"widgets.search": "Search",
	"widgets.categories": "Categories",
	"widgets.tags": "Tags",
	"widgets.recentPosts": "Recent Posts",
	"widgets.noCategories": "No categories yet",
	"widgets.noTags": "No tags yet",
	"widgets.searchPlaceholder": "Search...",
	"widgets.aboutTitle": "About Yu-Tzu Lin",
	"widgets.aboutText1":
		"Connecting urban planning research, professional practice and education across Taiwan, the Netherlands and European cities.",
	"widgets.aboutText2":
		"Urban Regeneration · Climate Resilience · Social Housing · AI-assisted Community Planning",

	"comments.none": "No comments yet",
	"comments.one": "1 Comment",
	"comments.many": "{count} Comments",
	"comments.member": "Site member",
	"comments.like": "Like",
	"comments.name": "Name",
	"comments.email": "Email",
	"comments.comment": "Comment",
	"comments.submit": "Post Comment",
	"comments.submitting": "Submitting...",
	"comments.published": "Comment published",
	"comments.pending": "Comment submitted for review",
	"comments.networkError": "Network error. Please try again.",
} as const;

export type UiKey = keyof typeof en;

const zhTW: Record<UiKey, string> = {
	"site.title": "林育慈",
	"site.tagline": "都市規劃師 · 教育者 · 研究者",

	"a11y.skip": "跳至主要內容",
	"nav.main": "主選單",
	"nav.mobile": "行動版選單",
	"nav.home": "首頁",
	"nav.openMenu": "開啟選單",
	"nav.closeMenu": "關閉選單",
	"nav.admin": "管理後台",
	"nav.adminDashboard": "管理後台",

	"search.title": "搜尋",
	"search.placeholder": "搜尋",
	"search.mobile": "搜尋文章與頁面⋯",
	"search.mobileLabel": "搜尋文章與頁面",
	"search.heading": "想找什麼內容？",
	"search.formLabel": "文章",
	"search.inputLabel": "搜尋文章",
	"search.inputPlaceholder": "搜尋文章",
	"search.submit": "搜尋",
	"search.description": "搜尋部落格文章",
	"search.titleWithQuery": "搜尋：{query}",
	"search.hint": "可搜尋文章標題與全文。不知從何開始？",
	"search.browseAll": "瀏覽所有文章",
	"search.summaryTop": "前 {count} 筆結果",
	"search.summaryOne": "{count} 筆結果",
	"search.summaryMany": "{count} 筆結果",
	"search.for": "關鍵字「{query}」",
	"search.noResults": "找不到「{query}」的相關結果",
	"search.noResultsText": "請檢查拼字、改用較少或不同的關鍵字，或直接瀏覽所有文章。",
	"search.orSearch": "或搜尋文章",
	"search.loading": "搜尋中⋯",
	"search.noResultsLive": "找不到結果",

	"theme.appearance": "外觀",
	"theme.group": "色彩主題",
	"theme.light": "淺色",
	"theme.dark": "深色",
	"theme.system": "跟隨系統",

	"footer.navigate": "網站導覽",
	"footer.connect": "關注",
	"footer.rss": "RSS 訂閱",
	"footer.rights": "© {year} {title}。版權所有。",

	"lang.switch": "語言",

	"posts.all": "所有文章",
	"posts.allTitle": "所有文章",
	"posts.description": "瀏覽所有部落格文章",
	"posts.archive": "文章列表",
	"posts.archiveLead": "所有文章，由新到舊。",
	"posts.none": "尚無文章",
	"posts.noneText": "發布後的文章會顯示在這裡。",
	"posts.noMore": "沒有更多文章",
	"posts.noMoreText": "已經到達文章列表的盡頭。",
	"posts.firstPage": "第一頁",
	"posts.untitled": "未命名",
	"posts.readArticle": "閱讀全文",
	"posts.continue": "繼續閱讀",
	"posts.tags": "標籤",
	"posts.author": "作者",
	"posts.authors": "作者",
	"posts.published": "發布日期",
	"posts.readingTime": "閱讀時間",
	"posts.readingTimeValue": "{minutes} 分鐘",
	"posts.readMinutes": "閱讀約 {minutes} 分鐘",
	"posts.discussion": "討論",
	"posts.toc": "本頁內容",
	"posts.moreFromBlog": "更多內容",
	"posts.noneRelated": "目前尚無相關文章。",

	"byline.and": "與",
	"byline.sep": "、",
	"byline.andSr": "與 {names}",

	"pager.label": "分頁",
	"pager.first": "第一頁",
	"pager.next": "下一頁",
	"pager.firstBack": "回到第一頁",
	"pager.pastLast": "此頁已超出最後一篇文章。",

	"category.eyebrow": "分類",
	"category.title": "{label} 文章",
	"category.description": "「{label}」分類下的所有文章",
	"category.lead": "歸類於「{label}」的文章，由新到舊。",
	"category.empty": "「{label}」分類下目前尚無文章。",
	"tag.eyebrow": "標籤",
	"tag.title": "標籤「{label}」的文章",
	"tag.description": "所有標記「{label}」的文章",
	"tag.lead": "標記「{label}」的文章，由新到舊。",
	"tag.empty": "目前尚無標記「{label}」的文章。",
	"archive.nothingYet": "目前還沒有內容",

	"notFound.title": "找不到頁面",
	"notFound.code": "錯誤 404",
	"notFound.text": "您要找的頁面不存在，或已經移動。",
	"notFound.home": "回到首頁",
	"notFound.browse": "瀏覽文章",

	"page.home": "首頁",
	"rss.description": "最新文章",
	"blocks.recentEyebrow": "城市觀察與案例研究",
	"blocks.recentTitle": "文章與出版",
	"blocks.recentLead": "深入觀察交通樞紐、公共住宅模式、綠色基盤設施與社區共創。",
	"blocks.recentAction": "查看所有文章",
	"blocks.cardLink": "了解更多 →",

	"widgets.search": "搜尋",
	"widgets.categories": "分類",
	"widgets.tags": "標籤",
	"widgets.recentPosts": "近期文章",
	"widgets.noCategories": "尚無分類",
	"widgets.noTags": "尚無標籤",
	"widgets.searchPlaceholder": "搜尋⋯",
	"widgets.aboutTitle": "關於林育慈",
	"widgets.aboutText1": "串連臺灣、荷蘭與歐洲城市，結合都市規劃研究、專業實務與教育。",
	"widgets.aboutText2": "都市再生 · 氣候韌性 · 社會住宅 · 生成式 AI 輔助社區規劃",

	"comments.none": "目前尚無留言",
	"comments.one": "1 則留言",
	"comments.many": "{count} 則留言",
	"comments.member": "站內會員",
	"comments.like": "讚",
	"comments.name": "姓名",
	"comments.email": "電子郵件",
	"comments.comment": "留言內容",
	"comments.submit": "送出留言",
	"comments.submitting": "送出中⋯",
	"comments.published": "留言已發布",
	"comments.pending": "留言已送出，等待審核",
	"comments.networkError": "網路錯誤，請稍後再試。",
};

const dictionaries: Record<Locale, Record<UiKey, string>> = { en, "zh-TW": zhTW };

export interface Translator {
	(key: UiKey, vars?: Record<string, string | number>): string;
	/**
	 * Text of any `ui_strings` entry by slug, including ones editors add in the
	 * admin that have no key in this file (e.g. `widget-footer-2-title`).
	 */
	extra(slug: string): string | undefined;
}

export const UI_DEFAULTS = dictionaries;

/**
 * Keys that only apply outside the default locale. In English these values are
 * edited elsewhere in the admin (site tagline in Settings; widget titles and
 * the footer blurb in Widgets), so no English `ui_strings` entry is seeded.
 */
export const UI_NON_DEFAULT_ONLY: readonly UiKey[] = [
	"site.title",
	"site.tagline",
	"widgets.search",
	"widgets.categories",
	"widgets.tags",
	"widgets.recentPosts",
	"widgets.aboutTitle",
	"widgets.aboutText1",
	"widgets.aboutText2",
];
export const UI_KEYS = Object.keys(en) as UiKey[];

/** Entry slug for a key: `posts.readingTime` → `posts-reading-time`. */
export function uiSlug(key: string): string {
	return key.replace(/([A-Z])/g, "-$1").replace(/\./g, "-").toLowerCase();
}

const SLUG_TO_KEY = new Map<string, UiKey>(UI_KEYS.map((key) => [uiSlug(key), key]));

export function uiKeyFromSlug(slug: string): UiKey | undefined {
	return SLUG_TO_KEY.get(slug);
}

/**
 * Returns a translator bound to `locale`. `overrides` (CMS-edited text) win
 * over the built-in dictionary, which falls back to the default locale.
 */
export function createTranslator(
	locale: Locale,
	overrides: Partial<Record<UiKey, string>> = {},
	extras: Record<string, string> = {},
): Translator {
	const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
	const translate = (key: UiKey, vars?: Record<string, string | number>) => {
		let text: string = overrides[key] || dict[key] || dictionaries[DEFAULT_LOCALE][key] || key;
		if (vars) {
			for (const [name, value] of Object.entries(vars)) {
				text = text.replaceAll(`{${name}}`, String(value));
			}
		}
		return text;
	};
	return Object.assign(translate, { extra: (slug: string) => extras[slug] });
}
