# Yu-Tzu Lin 林育慈 · EmDash CMS Blog & Academic Portfolio

這是專為 **林育慈（Yu-Tzu Lin）** 打造的現代化學術與專業個人網站與部落格系統，基於 Cloudflare 開源的 **EmDash CMS** 與 **Astro** 構建，前端與後台整合於 Cloudflare 現代無伺服器架構。

網站主題風格承襲自提供的網頁設計規格（包含 Georgia 襯線標題、Inter 正體字型、藍灰石色 `--ink: #13233a`、`--accent: #466f70`、藥草綠與紙白襯底色彩系統、流線型 Hero 漸層與圓角鈕樣式），並完整將 `https://yutzulin.com/` 的所有主要頁面、學術專案與城市觀察文章轉移至 EmDash 資料庫中。

---

## 🌟 特點與架構

1. **主題風格承襲**：
   - 品牌與標題字體：`Georgia, serif`，展現學術與人文刊物的高雅排版。
   - 正文字體：`Inter`，代碼與標籤採用 `JetBrains Mono`。
   - 色彩系統：保留 `--ink: #13233a`、`--wash: #f4f7f8`、`--accent: #466f70`、`--accent2: #c9d8d5`，全面支援明暗色彩（`light-dark()`）。
   - 保留首頁 Hero 雙欄佈局、肖像投影、卡片懸浮效果與精簡導覽列。

2. **完整遷移的頁面與內容**：
   - **首頁 (`/`)**：林育慈個人介紹、五大主軸卡片與精選城市觀察文章。
   - **關於林育慈 (`/about`)**：學術背景、荷蘭台夫特科大博士候選人、致理科大副教授經歷與中文簡介。
   - **五大研究主軸 (`/research`)**：都市再生、氣候調適、社會住宅、AI 社區規劃、台荷空間治理。
   - **實務專案 (`/projects`)**：新北社規師（AI 場所營造）、雙北都更 USR、北市社宅實踐指引等歷年重點計畫。
   - **學術著作 (`/publications`)**：2010–2026 年國內外研討會論文、期刊著作彙整。
   - **城市觀察庫 (`/insights`)**：烏特勒支、巴塞隆納、維也納、阿姆斯特丹、台夫特與臺灣深度觀察。
   - **部落格文章 (`/posts` & `/posts/[slug]`)**：完整內容收錄於 CMS，具備作者標籤、閱讀時間估算與即時搜尋。
   - **聯絡資訊 (`/contact`)**：學術與個人聯絡信箱、學術履歷認證說明。
   - **舊網址重定向**：內建所有 `*.html`（如 `/about.html` -> `/about`）之 308 自動跳轉。

3. **Cloudflare 最佳實踐**：
   - **本地端測試**：本地利用 Miniflare 自動模擬 D1（SQLite）與 R2（物件儲存），完全無需連網或創建遠端資源。
   - **遠端亞太區域要求**：日後部署至 Cloudflare 生產環境時，D1 資料庫與 R2 儲存桶均需指定至 **`apac`**（Asia Pacific）。

---

## 🌐 雙語功能（English / 繁體中文）

- 預設語系 `en` 不加前綴（`/posts`），繁體中文使用 `/zh-TW` 前綴（`/zh-TW/posts`）。語系清單只定義在 `src/i18n/config.ts`，`astro.config.mjs` 會讀取它。
- **內容**（頁面、文章、選單、分類／標籤）採 EmDash 的「一個語系一筆資料」模型：在後台開啟任一項目，於側欄 **Translations** 面板點 **Translate** 建立翻譯。每個語系各自有 slug 與發布狀態；找不到翻譯時，單筆內容會 fallback 到英文。
- **版型文字**（導覽、按鈕、空狀態等固定文案）：在後台 **UI Text**（`ui_strings` 集合）編輯，每個項目一個字串、每個語系一筆，標題是固定的 key，`{year}`、`{count}` 等大括號變數請保留。`src/i18n/ui.ts` 只是預設值；新增字串時需在 `ui.ts` 兩種語言補上，並更新 seed（或在後台手動新增對應 slug 的項目）。
- **小工具（Widgets）**：英文頁讀後台 Widgets 的內容；其他語言在 **UI Text** 新增項目翻譯，slug 規則是 `widget-<區域名稱>-<第幾個>-title`（標題）與 `widget-<區域名稱>-<第幾個>-text`（內容，空白行分段），例如 `widget-footer-1-title`。四個內建小工具標題和 footer 簡介已有現成項目。
- **網站標題與標語**：EmDash 的站台設定沒有語系，英文標語取自設定，其他語系取自 UI Text 的 `site.tagline`（僅 zh-TW）。
- 新增語系：改 `src/i18n/config.ts`、在 `ui.ts` 補字典，並複製 `src/pages/zh-TW/` 一份給新語系（讓 `/<locale>` 首頁可以被路由到）。
- 種子資料 `seed/seed.json` 已包含 zh-TW 翻譯；`emdash seed` 只會補上缺少的資料，不會覆蓋既有內容。

## 💻 本地端開發與測試 (Local Development)

本專案現已在本地端完成建置與測試，無需創建任何遠端資源即可完整運行：

```bash
# 1. 安裝依賴
npm install

# 2. 啟動本機開發伺服器
npm run dev
```

啟動後即可在瀏覽器開啟：
- 🌐 前台網站：`http://localhost:4321/`
- 🛠️ EmDash 管理後台：`http://localhost:4321/_emdash/admin`
- ⚡ 本地免密碼管理員捷徑：`http://localhost:4321/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin`

### 本地測試驗證指令

```bash
# 靜態代碼與類型檢查
npm run typecheck

# 生產環境打包測試
npm run build
```

---

## 🚀 未來遠端部署至 Cloudflare（待準備好時再執行）

當日後確定要正式部署上線時，請遵循以下步驟（確保 D1 與 R2 皆位於 **`apac`** 亞太區域）：

### 1. 建立亞太區 D1 資料庫
```bash
npx wrangler d1 create yutzulin-blog-db --location=apac
```
執行後終端會輸出 `database_id`，請將其貼入 `wrangler.jsonc` 的 `d1_databases[0].database_id`。

### 2. 建立亞太區 R2 儲存桶
```bash
npx wrangler r2 bucket create yutzulin-blog-media --location=apac
```

### 3. 正式發布 Worker
```bash
npm run deploy
```
