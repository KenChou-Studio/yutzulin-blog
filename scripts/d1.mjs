#!/usr/bin/env node
/**
 * Runs `emdash migrate` against the production D1 database using the
 * credentials of `wrangler login` — no API token needs to be created.
 *
 *   npm run db:status                                  # inspect only
 *   npm run db:migrate                                 # apply pending migrations (asks to confirm)
 *   npm run db:check                                   # exit non-zero if migrations are pending
 *   npm run db:migrate -- --take-over-lock <id>        # recover from a stuck migration lock
 *
 * Environment (optional): CLOUDFLARE_ACCOUNT_ID (needed only with several
 * Cloudflare accounts), D1_DATABASE (default: database_name in wrangler.jsonc).
 * The credential is read from `wrangler auth token --json` and is never printed
 * or written to disk.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const run = (command, args, options = {}) =>
	spawnSync(command, args, { encoding: "utf8", ...options });

const args = process.argv.slice(2);
const skipBuild = args.includes("--no-build");
const emdashArgs = args.filter((arg) => arg !== "--no-build");

// 1. Database name
let database = process.env.D1_DATABASE;
if (!database) {
	const wrangler = readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8");
	database = wrangler.match(/"database_name"\s*:\s*"([^"]+)"/)?.[1];
}
if (!database) {
	console.error("Could not find database_name in wrangler.jsonc (or set D1_DATABASE).");
	process.exit(1);
}

// 2. Token from the wrangler login (JSON output has no banner)
const tokenResult = run("npx", ["wrangler", "auth", "token", "--json"]);
let token;
try {
	token = JSON.parse(tokenResult.stdout).token;
} catch {
	/* handled below */
}
if (!token) {
	console.error("Not logged in to Cloudflare. Run `npx wrangler login` and try again.");
	process.exit(1);
}

// 3. Account id
let accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
if (!accountId) {
	const whoami = run("npx", ["wrangler", "whoami"], { env: { ...process.env, CLOUDFLARE_API_TOKEN: token } });
	const ids = [...new Set((whoami.stdout.match(/\b[0-9a-f]{32}\b/g) ?? []))];
	if (ids.length !== 1) {
		console.error(
			ids.length === 0
				? "Could not determine the Cloudflare account id. Set CLOUDFLARE_ACCOUNT_ID."
				: `Several Cloudflare accounts found. Set CLOUDFLARE_ACCOUNT_ID to one of: ${ids.join(", ")}`,
		);
		process.exit(1);
	}
	accountId = ids[0];
}

// 4. The migration manifest comes from a build of the same code that is deployed
if (!skipBuild || !existsSync(new URL("../.emdash/migrations.json", import.meta.url))) {
	console.error("Building to refresh .emdash/migrations.json …");
	const build = run("npx", ["astro", "build"], { stdio: ["ignore", "ignore", "inherit"] });
	if (build.status !== 0) process.exit(build.status ?? 1);
}

console.error(`Target: D1 "${database}" (account ${accountId.slice(0, 6)}…)`);
const result = spawnSync("npx", ["emdash", "migrate", "--d1", database, "--account-id", accountId, ...emdashArgs], {
	stdio: "inherit",
	env: { ...process.env, CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: accountId },
});
process.exit(result.status ?? 1);
