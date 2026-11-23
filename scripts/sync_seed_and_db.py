#!/usr/bin/env python3
# LEGACY — do not run. It rewrites the home page in seed/seed.json and in a
# local SQLite file, which would overwrite the bilingual (en / zh-TW) seed.
# Edit content in the EmDash admin, or change seed/seed.json and run `emdash seed`.
import sys

sys.exit("scripts/sync_seed_and_db.py is retired; see the comment at the top of the file.")
import json
import sqlite3
import glob
import os
import sys
from datetime import datetime

# 1. Define the complete, canonical 8-block modular content for Homepage
HOME_MODULAR_BLOCKS = [
    {
        "_type": "hero_block",
        "_key": "h_hero_showcase_01",
        "eyebrow": "Urban Planner · Educator · Researcher",
        "title": "Yu-Tzu Lin 林育慈",
        "lead": "Connecting urban planning research, professional practice and education across Taiwan, the Netherlands and European cities.",
        "focusline": "Urban Regeneration · Climate Resilience · Social Housing · AI-assisted Community Planning",
        "primaryText": "Explore My Work",
        "primaryUrl": "/research",
        "secondaryText": "About Yu-Tzu",
        "secondaryUrl": "/about",
        "imageUrl": "/images/yu-tzu-lin.jpg",
        "imageAlt": "Portrait of Yu-Tzu Lin 林育慈"
    },
    {
        "_type": "stats_grid",
        "_key": "h_stats_grid_01",
        "item1_num": "15+",
        "item1_label": "Years of Urban Research & Practice",
        "item2_num": "3",
        "item2_label": "Global Regions (Taiwan, NL, UK)",
        "item3_num": "20+",
        "item3_label": "Publications & Studio Courses",
        "item4_num": "10+",
        "item4_label": "Community & Municipal Initiatives"
    },
    {
        "_type": "block",
        "_key": "h_exp_head",
        "style": "h2",
        "children": [
            {
                "_type": "span",
                "_key": "h_exp_head_s",
                "text": "Explore Research, practice and urban knowledge."
            }
        ]
    },
    {
        "_type": "block",
        "_key": "h_exp_desc",
        "style": "normal",
        "children": [
            {
                "_type": "span",
                "_key": "h_exp_desc_s",
                "text": "This site brings together Yu-Tzu Lin’s research themes, applied projects, publications and international urban observations in a structure designed for both readers and search systems."
            }
        ]
    },
    {
        "_type": "info_card",
        "_key": "h_c1",
        "badge": "RESEARCH",
        "title": "Five Research Themes",
        "description": "Urban regeneration, resilience, housing, AI-assisted community planning and comparative planning.",
        "link": "/research",
        "linkText": "Explore Research →"
    },
    {
        "_type": "info_card",
        "_key": "h_c2",
        "badge": "PROJECTS",
        "title": "Selected Practice",
        "description": "Community planning, social housing, urban renewal, circular economy and spatial planning.",
        "link": "/projects",
        "linkText": "View Projects →"
    },
    {
        "_type": "info_card",
        "_key": "h_c3",
        "badge": "URBAN INSIGHTS",
        "title": "Cities as a Planning Library",
        "description": "Utrecht, Amsterdam, Delft, Vienna, Barcelona, Taiwan and more.",
        "link": "/insights",
        "linkText": "Read Insights →"
    },
    {
        "_type": "recent_posts",
        "_key": "h_recent_posts_01",
        "eyebrow": "Urban Insights & Case Studies",
        "title": "Articles & Publications",
        "lead": "In-depth observations on transit hubs, public housing models, green infrastructure, and community co-creation.",
        "actionText": "View all articles",
        "actionUrl": "/posts",
        "limit": "6",
        "tag": ""
    }
]

CUSTOM_BLOCK_TYPES = [
    {
        "slug": "hero_block",
        "label": "Hero Showcase 首頁英雄橫幅",
        "currentVersion": 1,
        "versions": [
            {
                "version": 1,
                "fields": [
                    { "slug": "eyebrow", "label": "眉標 (Eyebrow)", "type": "string" },
                    { "slug": "title", "label": "主標題 (Title)", "type": "string", "required": True },
                    { "slug": "lead", "label": "引言描述 (Lead Text)", "type": "text" },
                    { "slug": "focusline", "label": "專長焦點列 (Focusline)", "type": "string" },
                    { "slug": "primaryText", "label": "主按鈕文字", "type": "string" },
                    { "slug": "primaryUrl", "label": "主按鈕連結", "type": "string" },
                    { "slug": "secondaryText", "label": "次按鈕文字", "type": "string" },
                    { "slug": "secondaryUrl", "label": "次按鈕連結", "type": "string" },
                    { "slug": "imageUrl", "label": "圖片網址", "type": "string" },
                    { "slug": "imageAlt", "label": "圖片替代文字", "type": "string" }
                ]
            }
        ]
    },
    {
        "slug": "stats_grid",
        "label": "Stats Grid 關鍵數據與焦點",
        "currentVersion": 1,
        "versions": [
            {
                "version": 1,
                "fields": [
                    { "slug": "item1_num", "label": "數據 1 數值", "type": "string" },
                    { "slug": "item1_label", "label": "數據 1 說明", "type": "string" },
                    { "slug": "item2_num", "label": "數據 2 數值", "type": "string" },
                    { "slug": "item2_label", "label": "數據 2 說明", "type": "string" },
                    { "slug": "item3_num", "label": "數據 3 數值", "type": "string" },
                    { "slug": "item3_label", "label": "數據 3 說明", "type": "string" },
                    { "slug": "item4_num", "label": "數據 4 數值", "type": "string" },
                    { "slug": "item4_label", "label": "數據 4 說明", "type": "string" }
                ]
            }
        ]
    },
    {
        "slug": "recent_posts",
        "label": "Recent Posts 文章專欄展示",
        "currentVersion": 1,
        "versions": [
            {
                "version": 1,
                "fields": [
                    { "slug": "eyebrow", "label": "專欄眉標", "type": "string" },
                    { "slug": "title", "label": "專欄標題", "type": "string", "required": True },
                    { "slug": "lead", "label": "導言說明", "type": "text" },
                    { "slug": "actionText", "label": "按鈕文字", "type": "string" },
                    { "slug": "actionUrl", "label": "按鈕連結", "type": "string" },
                    { "slug": "limit", "label": "顯示篇數", "type": "string" },
                    { "slug": "tag", "label": "標籤篩選", "type": "string" }
                ]
            }
        ]
    },
    {
        "slug": "info_card",
        "label": "Info Card 資訊卡",
        "currentVersion": 1,
        "versions": [
            {
                "version": 1,
                "fields": [
                    { "slug": "badge", "label": "角標", "type": "string" },
                    { "slug": "title", "label": "卡片標題", "type": "string", "required": True },
                    { "slug": "description", "label": "卡片內容", "type": "text" },
                    { "slug": "link", "label": "連結網址", "type": "string" },
                    { "slug": "linkText", "label": "按鈕文字", "type": "string" }
                ]
            }
        ]
    },
    {
        "slug": "callout_box",
        "label": "Callout Box 重點引言框",
        "currentVersion": 1,
        "versions": [
            {
                "version": 1,
                "fields": [
                    { "slug": "title", "label": "引言標題", "type": "string" },
                    { "slug": "text", "label": "引言內容", "type": "text", "required": True }
                ]
            }
        ]
    },
    {
        "slug": "contact_item",
        "label": "Contact Item 聯絡項目",
        "currentVersion": 1,
        "versions": [
            {
                "version": 1,
                "fields": [
                    { "slug": "label", "label": "項目標籤", "type": "string", "required": True },
                    { "slug": "value", "label": "主要資訊", "type": "string", "required": True },
                    { "slug": "detail", "label": "補充說明", "type": "string" },
                    { "slug": "link", "label": "連結網址", "type": "string" }
                ]
            }
        ]
    }
]

def update_seed_file():
    seed_path = "seed/seed.json"
    print(f"[Seed] Reading {seed_path}...")
    with open(seed_path, "r", encoding="utf-8") as f:
        seed = json.load(f)

    # 1. Update Home page content
    home_page = None
    for p in seed.get("content", {}).get("pages", []):
        if p.get("slug") == "home":
            home_page = p
            break

    if home_page:
        home_page["data"]["content"] = HOME_MODULAR_BLOCKS
        print(f"[Seed] Updated home page content with {len(HOME_MODULAR_BLOCKS)} modular blocks.")
    else:
        print("[Seed] Warning: home page not found in seed!")

    # 2. Sync blockTypes in seed
    existing_block_slugs = {b["slug"] for b in seed.get("blockTypes", [])}
    for custom_block in CUSTOM_BLOCK_TYPES:
        if custom_block["slug"] not in existing_block_slugs:
            seed.setdefault("blockTypes", []).append(custom_block)
            print(f"[Seed] Added blockType '{custom_block['slug']}' to seed.")

    # 3. Write back with formatting
    with open(seed_path, "w", encoding="utf-8") as f:
        json.dump(seed, f, ensure_ascii=False, indent=2)
    print(f"[Seed] Successfully saved updated {seed_path}")

def update_database():
    db_files = [f for f in glob.glob(".wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite") if "metadata" not in f]
    if not db_files:
        print("[DB] No SQLite database found in .wrangler!")
        return
    db_path = db_files[0]
    print(f"[DB] Connecting to {db_path}...")
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 1. Update ec_pages for 'home'
    home_row = c.execute("SELECT id, live_revision_id, draft_revision_id FROM ec_pages WHERE slug='home'").fetchone()
    if not home_row:
        print("[DB] Error: 'home' page not found in ec_pages!")
        return

    home_id, live_rev_id, draft_rev_id = home_row
    home_content_json = json.dumps(HOME_MODULAR_BLOCKS, ensure_ascii=False)

    c.execute(
        "UPDATE ec_pages SET content=?, updated_at=? WHERE slug='home'",
        (home_content_json, now_str)
    )
    print(f"[DB] Updated ec_pages for home (ID: {home_id}) with {len(HOME_MODULAR_BLOCKS)} blocks.")

    # 2. Update revisions for 'home'
    revisions_to_update = set()
    if live_rev_id:
        revisions_to_update.add(live_rev_id)
    if draft_rev_id:
        revisions_to_update.add(draft_rev_id)

    # Also find all revisions for home entry
    all_home_revs = [r[0] for r in c.execute("SELECT id FROM revisions WHERE entry_id=?", (home_id,)).fetchall()]
    revisions_to_update.update(all_home_revs)

    for rev_id in revisions_to_update:
        r = c.execute("SELECT data FROM revisions WHERE id=?", (rev_id,)).fetchone()
        if r and r[0]:
            try:
                data = json.loads(r[0])
                data["content"] = HOME_MODULAR_BLOCKS
                updated_data_json = json.dumps(data, ensure_ascii=False)
                c.execute(
                    "UPDATE revisions SET data=? WHERE id=?",
                    (updated_data_json, rev_id)
                )
                print(f"[DB] Updated revision {rev_id} data.content.")
            except Exception as e:
                print(f"[DB] Error parsing revision {rev_id}: {e}")

    # 3. Clean up trailing empty block in other pages if present
    other_pages = c.execute("SELECT id, slug, content FROM ec_pages WHERE slug != 'home'").fetchall()
    for pid, pslug, pcontent in other_pages:
        if not pcontent:
            continue
        try:
            blocks = json.loads(pcontent)
            # if last block is an empty block with no text
            if len(blocks) > 1 and blocks[-1].get("_type") == "block":
                children = blocks[-1].get("children", [])
                text = "".join([ch.get("text", "") for ch in children]).strip()
                if not text:
                    cleaned_blocks = blocks[:-1]
                    c.execute(
                        "UPDATE ec_pages SET content=?, updated_at=? WHERE id=?",
                        (json.dumps(cleaned_blocks, ensure_ascii=False), now_str, pid)
                    )
                    print(f"[DB] Cleaned trailing empty block on page '{pslug}'.")
        except Exception as e:
            print(f"[DB] Error checking page {pslug}: {e}")

    conn.commit()
    conn.close()
    print("[DB] Transaction successfully committed.")

if __name__ == "__main__":
    update_seed_file()
    update_database()
