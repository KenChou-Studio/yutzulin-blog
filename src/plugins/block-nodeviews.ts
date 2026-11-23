/**
 * WYSIWYG node views for the site's custom Portable Text blocks.
 *
 * The EmDash editor (TipTap) renders every plugin block as an opaque card that
 * is edited through a modal. This module swaps that rendering for the block as
 * the public site draws it — same class names, same CSS (see
 * blocks-admin.generated.css) — and makes its text editable in place, so a
 * block is edited the way body text is.
 *
 * How it hooks in (no EmDash internals are modified):
 *  - every ProseMirror element exposes its TipTap editor as `element.editor`;
 *  - `view.setProps({ nodeViews })` is ProseMirror's public way to supply a
 *    node view, and TipTap itself uses it;
 *  - block data is written back with a normal `setNodeMarkup` transaction, so
 *    undo/redo, autosave and serialisation to Portable Text keep working.
 *
 * If a block type isn't handled here, or anything looks unexpected, the
 * original EmDash node view is used instead, so the editor never breaks.
 */
import { BLOCKS, COMMON_I18N, getLocale, localizePluginBlocks, type CustomBlockType } from "./block-i18n.ts";

type Data = Record<string, any>;

interface FieldOpts {
	multiline?: boolean;
	placeholder?: string;
	tag?: string;
	cls?: string;
	attrs?: string;
}

interface BlockSpec {
	/** Class on the wrapper; mirrors what the Astro component renders. */
	cls: string;
	/** Fields edited through the small settings strip (links, numbers, …). */
	settings: Array<{ field: string; type?: "text" | "number" | "url" }>;
	render: (d: Data, f: (name: string, opts?: FieldOpts) => string, esc: (v: unknown) => string) => string;
}

const esc = (value: unknown): string =>
	String(value ?? "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");

const SPECS: Record<CustomBlockType, BlockSpec> = {
	info_card: {
		cls: "sb-wrap--card",
		settings: [{ field: "link", type: "url" }],
		render: (d, f) => `
			<article class="info-card">
				${f("badge", { cls: "card-badge", placeholder: "BADGE" })}
				<h3 class="card-title">${f("title", { tag: "span", placeholder: "Title" })}</h3>
				${f("description", { tag: "p", cls: "card-desc", multiline: true, placeholder: "Description" })}
				<div class="card-action">${f("linkText", { tag: "span", cls: "card-link", placeholder: "Explore →" })}</div>
			</article>`,
	},
	callout_box: {
		cls: "sb-wrap--callout",
		settings: [],
		render: (d, f) => `
			<div class="callout-box">
				${f("title", { tag: "h4", cls: "callout-title", placeholder: "Title" })}
				${f("text", { tag: "p", cls: "callout-text", multiline: true, placeholder: "Text" })}
			</div>`,
	},
	contact_item: {
		cls: "sb-wrap--contact",
		settings: [{ field: "link", type: "url" }],
		render: (d, f) => `
			<div class="editorial-contact-item">
				${f("label", { cls: "contact-item__label", placeholder: "Label" })}
				<div class="contact-item__content">
					<div class="contact-item__value"><u class="sb-link">${f("value", { tag: "span", placeholder: "Value" })}</u></div>
					${f("detail", { tag: "p", cls: "contact-item__detail", multiline: true, placeholder: "Detail" })}
				</div>
			</div>`,
	},
	stats_grid: {
		cls: "sb-wrap--stats",
		settings: [],
		render: (d, f) => `
			<div class="modular-stats-bar cols-4">
				${[1, 2, 3, 4]
					.map(
						(n) => `<div class="stat-cell">
					${f(`item${n}_num`, { cls: "stat-num", placeholder: "00" })}
					${f(`item${n}_label`, { cls: "stat-label", placeholder: "Label" })}
				</div>`,
					)
					.join("")}
			</div>`,
	},
	hero_block: {
		cls: "sb-wrap--hero",
		settings: [
			{ field: "primaryUrl", type: "url" },
			{ field: "secondaryUrl", type: "url" },
			{ field: "imageUrl", type: "url" },
			{ field: "imageAlt" },
		],
		render: (d, f, e) => `
			<section class="modular-hero-section">
				<div class="hero-grid ${d.imageUrl ? "has-media" : "no-media"}">
					<div class="hero-content">
						${f("eyebrow", { cls: "eyebrow", placeholder: "Eyebrow" })}
						${f("title", { tag: "h1", cls: "hero__title", multiline: true, placeholder: "Title" })}
						${f("lead", { tag: "p", cls: "lead", multiline: true, placeholder: "Lead" })}
						${f("focusline", { tag: "p", cls: "focusline", placeholder: "Focus line" })}
						<div class="actions">
							<span class="btn primary">${f("primaryText", { tag: "span", placeholder: "Button" })}</span>
							<span class="btn btn--ghost">${f("secondaryText", { tag: "span", placeholder: "Button" })}</span>
						</div>
					</div>
					${d.imageUrl ? `<div class="hero-media"><img class="portrait" src="${e(d.imageUrl)}" alt="${e(d.imageAlt)}" /></div>` : ""}
				</div>
			</section>`,
	},
	news_item: {
		cls: "sb-wrap--card",
		settings: [{ field: "imageUrl", type: "url" }, { field: "imageAlt" }, { field: "link", type: "url" }],
		render: (d, f, e) => `
			<div class="news-card">
				<div class="news-card__media">${d.imageUrl ? `<img src="${e(d.imageUrl)}" alt="${e(d.imageAlt)}" />` : `<div class="news-card__placeholder"></div>`}</div>
				<div class="news-card__body">
					<h3 class="news-card__title">${f("title", { tag: "span", placeholder: "Title" })}</h3>
					${f("description", { tag: "p", cls: "news-card__desc", multiline: true, placeholder: "Description" })}
				</div>
			</div>`,
	},
	recent_news: {
		cls: "sb-wrap--posts",
		settings: [{ field: "actionUrl", type: "url" }, { field: "limit", type: "number" }],
		render: (d, f) => `
			<section class="modular-recent-news">
				<div class="section-head">
					<div>
						${f("eyebrow", { cls: "eyebrow", placeholder: "Eyebrow" })}
						${f("title", { tag: "h2", placeholder: "Title" })}
					</div>
					<div class="section-head__action">
						${f("lead", { tag: "p", multiline: true, placeholder: "Lead" })}
						<div style="margin-top:14px"><span class="btn btn--sm">${f("actionText", { tag: "span", placeholder: "View all news" })}</span></div>
					</div>
				</div>
				<div class="news-grid sb-posts-placeholder" aria-hidden="true">
					<div class="sb-ghost-post"></div><div class="sb-ghost-post"></div><div class="sb-ghost-post"></div>
				</div>
			</section>`,
	},
	recent_posts: {
		cls: "sb-wrap--posts",
		settings: [{ field: "actionUrl", type: "url" }, { field: "limit", type: "number" }, { field: "tag" }],
		render: (d, f) => `
			<section class="modular-recent-posts">
				<div class="section-head">
					<div>
						${f("eyebrow", { cls: "eyebrow", placeholder: "Eyebrow" })}
						${f("title", { tag: "h2", placeholder: "Title" })}
					</div>
					<div class="section-head__action">
						${f("lead", { tag: "p", multiline: true, placeholder: "Lead" })}
						<div style="margin-top:14px"><span class="btn btn--sm">${f("actionText", { tag: "span", placeholder: "View all" })}</span></div>
					</div>
				</div>
				<div class="post-grid sb-posts-placeholder" aria-hidden="true">
					<div class="sb-ghost-post"></div><div class="sb-ghost-post"></div><div class="sb-ghost-post"></div>
				</div>
			</section>`,
	},
};

const isOurBlock = (type: unknown): type is CustomBlockType => typeof type === "string" && type in SPECS;

function blockLabel(type: CustomBlockType): string {
	const locale = getLocale();
	return (BLOCKS[type][locale] ?? BLOCKS[type].zh).name;
}

function fieldLabel(type: CustomBlockType, field: string): string {
	const locale = getLocale();
	const dict = BLOCKS[type][locale] ?? BLOCKS[type].zh;
	return dict.fields[field]?.label ?? field;
}

class CustomBlockView {
	dom: HTMLElement;
	private node: any;
	private readonly view: any;
	private readonly getPos: () => number | undefined;
	private readonly editor: any;
	private readonly type: CustomBlockType;
	private readonly spec: BlockSpec;
	private pending: Data = {};
	private timer: ReturnType<typeof setTimeout> | undefined;
	/** JSON of the data this view last wrote, to tell its own updates from external ones. */
	private written = "";
	private body!: HTMLElement;

	constructor(node: any, view: any, getPos: () => number | undefined, editor: any) {
		this.node = node;
		this.view = view;
		this.getPos = getPos;
		this.editor = editor;
		this.type = node.attrs.blockType;
		this.spec = SPECS[this.type];

		this.dom = document.createElement("div");
		this.dom.className = `sb-wrap ${this.spec.cls}`;
		this.dom.dataset.blockType = this.type;
		this.dom.setAttribute("contenteditable", "false");
		this.build();
	}

	private get data(): Data {
		return (this.node.attrs.data ?? {}) as Data;
	}

	/** Builds the whole block: chrome, rendered markup, settings strip. */
	private build() {
		const c = COMMON_I18N[getLocale()] ?? COMMON_I18N.zh;
		const d = this.data;
		const field = (name: string, o: FieldOpts = {}): string => {
			const tag = o.tag ?? "div";
			const kind = o.multiline ? "multiline" : "text";
			return `<${tag} class="${o.cls ?? ""} sb-field" contenteditable="plaintext-only" spellcheck="false" data-sb-field="${name}" data-sb-kind="${kind}" data-placeholder="${esc(o.placeholder ?? "")}">${esc(d[name])}</${tag}>`;
		};

		this.dom.innerHTML = `
			<div class="sb-chrome">
				<span class="sb-chrome__name">${esc(blockLabel(this.type))}</span>
				<button type="button" class="sb-chrome__btn" data-sb-action="details" title="${esc(c.edit)}">⚙</button>
				<button type="button" class="sb-chrome__btn" data-sb-action="delete" title="${esc(c.delete)}">✕</button>
			</div>
			<div class="sb-node sb-body">${this.spec.render(d, field, esc)}</div>
			${this.settingsHtml()}`;
		this.body = this.dom.querySelector(".sb-body") as HTMLElement;
		this.bind();
	}

	private settingsHtml(): string {
		if (this.spec.settings.length === 0) return "";
		const rows = this.spec.settings
			.map(({ field, type = "text" }) => {
				const dict = (BLOCKS[this.type][getLocale()] ?? BLOCKS[this.type].zh).fields[field];
				const input = `<input type="${type === "number" ? "number" : "text"}" data-sb-setting="${field}" placeholder="${esc(dict?.placeholder ?? "")}" value="${esc(this.data[field])}" />`;
				// Image fields get a button that opens EmDash's media library (pick or upload).
				const pick =
					field === "imageUrl"
						? `<button type="button" class="sb-setting__pick" data-sb-action="details">${esc((COMMON_I18N[getLocale()] ?? COMMON_I18N.zh).chooseImage)}</button>`
						: "";
				return `<label class="sb-setting"><span>${esc(fieldLabel(this.type, field))}</span><span class="sb-setting__row">${input}${pick}</span></label>`;
			})
			.join("");
		return `<div class="sb-settings">${rows}</div>`;
	}

	private bind() {
		this.dom.querySelectorAll<HTMLElement>("[data-sb-field]").forEach((el) => {
			el.addEventListener("input", () => {
				this.pending[el.dataset.sbField!] = el.textContent ?? "";
				this.schedule();
			});
			el.addEventListener("blur", () => this.flush());
			el.addEventListener("keydown", (event) => {
				if (event.key === "Enter" && el.dataset.sbKind === "text") {
					event.preventDefault();
					el.blur();
				}
				if (event.key === "Escape") el.blur();
			});
			el.addEventListener("paste", (event) => {
				event.preventDefault();
				const text = event.clipboardData?.getData("text/plain") ?? "";
				document.execCommand("insertText", false, el.dataset.sbKind === "text" ? text.replace(/\s*\n\s*/g, " ") : text);
			});
		});

		this.dom.querySelectorAll<HTMLInputElement>("[data-sb-setting]").forEach((input) => {
			input.addEventListener("input", () => {
				const name = input.dataset.sbSetting!;
				this.pending[name] = input.type === "number" && input.value !== "" ? Number(input.value) : input.value;
				this.schedule();
			});
			input.addEventListener("blur", () => {
				this.flush();
				this.refreshDependentMarkup();
			});
		});

		this.dom.querySelector('[data-sb-action="delete"]')?.addEventListener("click", () => this.remove());
		this.dom
			.querySelectorAll('[data-sb-action="details"]')
			.forEach((button) => button.addEventListener("click", () => this.openDetails()));
	}

	private schedule() {
		clearTimeout(this.timer);
		this.timer = setTimeout(() => this.flush(), 400);
	}

	/** Writes pending edits into the document as one undoable transaction. */
	private flush() {
		clearTimeout(this.timer);
		if (Object.keys(this.pending).length === 0) return;
		const pos = this.getPos();
		if (typeof pos !== "number") return;
		const next = { ...this.data, ...this.pending };
		this.pending = {};
		this.written = JSON.stringify(next);
		const tr = this.view.state.tr.setNodeMarkup(pos, undefined, { ...this.node.attrs, data: next });
		this.view.dispatch(tr);
	}

	/** Parts of the markup that depend on settings (hero image) are redrawn after a settings edit. */
	private refreshDependentMarkup() {
		if (this.type === "hero_block" || this.type === "news_item") this.rerender();
	}

	private rerender() {
		this.flush();
		const active = this.dom.contains(document.activeElement) ? (document.activeElement as HTMLElement) : null;
		const key = active?.dataset.sbField ?? active?.dataset.sbSetting;
		this.build();
		if (key) (this.dom.querySelector(`[data-sb-field="${key}"], [data-sb-setting="${key}"]`) as HTMLElement | null)?.focus();
	}

	private remove() {
		const locale = getLocale();
		const message = locale === "zh" ? "確定要刪除此區塊嗎？" : "Delete this block?";
		if (!window.confirm(message)) return;
		const pos = this.getPos();
		if (typeof pos !== "number") return;
		this.view.dispatch(this.view.state.tr.delete(pos, pos + this.node.nodeSize));
		this.view.focus();
	}

	/** Opens EmDash's own form for every field of the block. */
	private openDetails() {
		this.flush();
		const pos = this.getPos();
		const open = this.editor.storage.pluginBlock?.onEditBlock;
		if (typeof pos === "number" && typeof open === "function") {
			open({ blockType: this.type, id: this.node.attrs.id ?? "", data: this.data, pos });
		}
	}

	update(node: any): boolean {
		if (node.type !== this.node.type || node.attrs.blockType !== this.type) return false;
		const external = JSON.stringify(node.attrs.data ?? {}) !== this.written;
		this.node = node;
		if (external) {
			// Undo/redo, the details form, or collaboration changed the data.
			this.written = JSON.stringify(node.attrs.data ?? {});
			this.pending = {};
			this.rerender();
		}
		return true;
	}

	stopEvent(event: Event): boolean {
		const target = event.target as HTMLElement | null;
		return !!target?.closest("[data-sb-field], [data-sb-setting], .sb-chrome__btn, .sb-setting__pick");
	}

	ignoreMutation(): boolean {
		return true;
	}

	selectNode() {
		this.dom.classList.add("is-selected");
	}

	deselectNode() {
		this.dom.classList.remove("is-selected");
	}

	destroy() {
		clearTimeout(this.timer);
	}
}

const PATCHED = Symbol.for("yutzulin.sb.patched");

/** Replaces the plugin-block node view of one editor, keeping EmDash's for unknown types. */
function patchEditor(editor: any) {
	const view = editor?.view;
	if (!view || editor[PATCHED]) return;
	editor[PATCHED] = true;

	// Block forms read these definitions when they open; follow the UI language.
	const registry = editor.storage?.pluginBlock?.registry;
	if (registry) localizePluginBlocks([...registry.values()], getLocale());

	const original = view.props.nodeViews?.pluginBlock;
	const ours = (node: any, v: any, getPos: any, decorations: any, inner: any) => {
		if (isOurBlock(node.attrs.blockType)) {
			try {
				return new CustomBlockView(node, v, getPos, editor);
			} catch (error) {
				console.warn("[site-blocks] falling back to the default block view", error);
			}
		}
		return original?.(node, v, getPos, decorations, inner);
	};

	const install = () => {
		const current = view.props.nodeViews ?? {};
		if (current.pluginBlock === ours) return;
		view.setProps({ nodeViews: { ...current, pluginBlock: ours } });
	};
	install();
	// TipTap re-applies its own node views when extensions change; take them back.
	editor.on("transaction", install);
}

let started = false;

/** Patches every rich-text editor on the page, now and as new ones mount. */
export function installBlockNodeViews() {
	if (started || typeof document === "undefined") return;
	started = true;
	const scan = () => {
		document.querySelectorAll<HTMLElement>(".ProseMirror").forEach((el) => {
			const editor = (el as any).editor;
			if (editor) patchEditor(editor);
		});
	};
	scan();
	new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
}
