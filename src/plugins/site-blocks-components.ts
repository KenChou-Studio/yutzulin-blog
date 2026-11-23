import Callout from "../components/ui/Callout.astro";
import CardGrid from "../components/ui/CardGrid.astro";
import ContactItem from "../components/ui/ContactItem.astro";
import ContactList from "../components/ui/ContactList.astro";
import FeatureCardsBlock from "../components/ui/FeatureCardsBlock.astro";
import HeroBlock from "../components/ui/HeroBlock.astro";
import InfoCard from "../components/ui/InfoCard.astro";
import NewsGrid from "../components/ui/NewsGrid.astro";
import NewsItem from "../components/ui/NewsItem.astro";
import RecentNewsBlock from "../components/ui/RecentNewsBlock.astro";
import RecentPostsBlock from "../components/ui/RecentPostsBlock.astro";
import RichTextBlock from "../components/ui/RichTextBlock.astro";
import StatsBlock from "../components/ui/StatsBlock.astro";

/**
 * Native Portable Text and Blocks field component mapping.
 * Used both by EmDash plugin system (componentsEntry) and frontend page renderers.
 */
export const blockComponents = {
	// Canonical block types (matching block-i18n.ts and BlocksField registration)
	info_card: InfoCard,
	news_item: NewsItem,
	news_grid: NewsGrid,
	card_grid: CardGrid,
	callout_box: Callout,
	contact_item: ContactItem,
	contact_list: ContactList,
	hero_block: HeroBlock,
	recent_posts: RecentPostsBlock,
	recent_news: RecentNewsBlock,
	stats_grid: StatsBlock,
	rich_text: RichTextBlock,
	feature_cards: FeatureCardsBlock,

	// Semantic & convenient aliases to prevent missing component warnings
	callout: Callout,
	stats_block: StatsBlock,
	stats: StatsBlock,
	hero: HeroBlock,
	recent_posts_block: RecentPostsBlock,
};
