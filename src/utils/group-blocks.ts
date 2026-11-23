const EMDASH_EDIT = Symbol.for("__emdash");

/**
 * Automatically groups consecutive `info_card` blocks into a `card_grid` container
 * so they render side-by-side in responsive columns on the frontend.
 *
 * Preserves the non-enumerable `Symbol.for("__emdash")` edit metadata property
 * so EmDash visual editing / InlinePortableTextEditor continues to work properly.
 */
export function groupContentBlocks(blocks?: any[]): any[] {
	if (!Array.isArray(blocks) || blocks.length === 0) return [];

	const editMeta = (blocks as any)[EMDASH_EDIT];

	// If in edit mode (editMeta is present), keep original flat blocks so TipTap
	// and autosave don't serialize virtual wrapper blocks into the database.
	if (editMeta) {
		const result = [...blocks];
		Object.defineProperty(result, EMDASH_EDIT, {
			value: editMeta,
			enumerable: false,
			configurable: true,
		});
		return result;
	}

	const result: any[] = [];
	let currentCards: any[] = [];
	let currentContactItems: any[] = [];
	let currentNews: any[] = [];

	const flushCards = () => {
		if (currentCards.length > 0) {
			result.push({
				_type: "card_grid",
				_key: `grid_${currentCards[0]._key || Math.random().toString(36).slice(2)}`,
				cards: [...currentCards],
			});
			currentCards = [];
		}
	};

	const flushNews = () => {
		if (currentNews.length > 0) {
			result.push({
				_type: "news_grid",
				_key: `news_${currentNews[0]._key || Math.random().toString(36).slice(2)}`,
				items: [...currentNews],
			});
			currentNews = [];
		}
	};

	const flushContactItems = () => {
		if (currentContactItems.length > 0) {
			result.push({
				_type: "contact_list",
				_key: `contact_list_${currentContactItems[0]._key || Math.random().toString(36).slice(2)}`,
				items: [...currentContactItems],
			});
			currentContactItems = [];
		}
	};

	for (const block of blocks) {
		if (block && block._type === "info_card") {
			flushContactItems();
			flushNews();
			currentCards.push(block);
		} else if (block && block._type === "contact_item") {
			flushCards();
			flushNews();
			currentContactItems.push(block);
		} else if (block && block._type === "news_item") {
			flushCards();
			flushContactItems();
			currentNews.push(block);
		} else {
			flushCards();
			flushContactItems();
			flushNews();
			result.push(block);
		}
	}
	flushCards();
	flushContactItems();
	flushNews();

	return result;
}
