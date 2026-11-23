import { fileURLToPath } from "node:url";
import { definePlugin } from "emdash";
import type { PluginDescriptor } from "emdash";
import { getPortableTextBlocks } from "./block-i18n.ts";

export function siteBlocksPlugin(): PluginDescriptor {
	return {
		id: "site-blocks",
		version: "1.0.0",
		entrypoint: fileURLToPath(new URL("./site-blocks.ts", import.meta.url)),
		adminEntry: fileURLToPath(new URL("./admin.ts", import.meta.url)),
		componentsEntry: fileURLToPath(new URL("./site-blocks-components.ts", import.meta.url)),
		portableTextBlocks: getPortableTextBlocks("zh"),
	};
}

export function createPlugin() {
	return definePlugin({
		id: "site-blocks",
		version: "1.0.0",
		admin: {
			portableTextBlocks: getPortableTextBlocks("zh"),
		},
	});
}

export default createPlugin;
