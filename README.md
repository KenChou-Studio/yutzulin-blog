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

## 🚀 部署至 Cloudflare（D1 + R2）

正式站使用 Cloudflare Workers、D1（資料庫）與 R2（媒體）。請依序操作。

### 1. 建立資源（只需一次）

D1 與 R2 皆建在 **`apac`** 亞太區域：

```bash
npx wrangler login
npx wrangler d1 create yutzulin-blog-db --location=apac
npx wrangler r2 bucket create yutzulin-blog-media --location=apac
```

`d1 create` 會輸出 `database_id`，貼進 `wrangler.jsonc` 的 `d1_databases[0].database_id`。名稱需與 `wrangler.jsonc` 一致。

### 2. 建置與發布

```bash
npm run deploy      # = astro build && wrangler deploy
```

### 3. 套用資料庫遷移（EmDash 核心資料表）

EmDash 預設在第一個請求由 Worker 自己遷移，但免費方案每個請求只能對外呼叫 50 次，跑不完，網站會回 `503 Database migrations are required`，並且可能留下一把卡住的「遷移鎖」。所以改從本機對 D1 套用（走 Cloudflare API，不受 Worker 限制）。

已經包成 npm script，直接使用 `wrangler login` 的登入憑證，**不需要另外建立 API Token**，也不會把憑證印出或存檔：

```bash
npx wrangler login          # 已登入可略過

npm run db:status           # 只看狀態：目標資料庫、遷移鎖、已套用／待套用的遷移
npm run db:migrate          # 套用待處理的遷移（會顯示目標並要求確認）
npm run db:check            # 檢查是否還有未套用的遷移（有的話離開碼非 0）
```

`db:*` 會先 `astro build` 產生 `.emdash/migrations.json`（要與部署的程式碼同一版），帳號 ID 會自動取得；如果帳號底下有多個 Cloudflare 帳號，需自行指定 `CLOUDFLARE_ACCOUNT_ID`。完成後最多等 30 秒，網站就會恢復。

#### 網站仍回 503：先看真正的錯誤

503 的訊息是通用的，真正原因要看 Worker 日誌：

```bash
npx wrangler tail yutzulin-blog --format pretty    # 開著，再重新整理網站
```

找 `[emdash] database migrations are required:` 後面那一行。

**遷移鎖卡住**（`The migration lock has been held since …`）：Worker 在免費方案跑到一半被中止，沒有釋放鎖，之後所有遷移都被擋住。先用 `npm run db:status` 看第一行 `Migration lock: held since … (id 數字)`，確認沒有其他遷移正在執行後：

```bash
npm run db:migrate -- --take-over-lock <id>
```

它會接手那把鎖並套用剩下的遷移（會要求確認）。如果只想釋放鎖、不套用，改用 `--release-lock <id>`，但網站在 `auto` 模式下可能又搶先開始遷移，所以通常建議用 `--take-over-lock`。

其他注意：

- 憑證約一小時過期，過期就 `npx wrangler login` 重新登入。
- 出現 `Authentication error` / `403` 代表 wrangler 憑證權限不足，改到 Cloudflare 儀表板建立「D1 → Edit」權限的 API Token，執行時設成環境變數 `CLOUDFLARE_API_TOKEN`（不要寫進專案檔案）。
- 做完請執行 `npx wrangler logout`，之後要部署再 `npx wrangler login`。
- 每次升級 EmDash 後重新部署，都要再跑一次 `npm run db:status` 與 `npm run db:migrate`。

### 4. 完成設定精靈（立刻做）

開啟 `https://你的網域/_emdash/admin/setup` 建立管理員。**精靈完成前，第一個到訪的人會成為管理員**，所以部署完要馬上做。

- 免費方案：精靈裡**不要勾選「匯入範例內容」**（單次請求寫入大量資料會超過呼叫次數上限）。網站結構（集合、欄位、分類、選單）會自動由 `seed/seed.json` 建立。
- 付費方案（Workers Paid）：可以勾選匯入範例內容，內含英文與繁中的頁面、文章、消息、UI Text。

### 5. 匯入內容

**方案 A：在本機開發站匯出，再匯入正式站（保留圖片、草稿與編輯紀錄）**

```bash
# 本機開發伺服器要在執行中（npm run dev）
npx emdash site export --output site.emdash

npx emdash login --url https://你的網域
npx emdash site import site.emdash --analyze --url https://你的網域
npx emdash site import site.emdash --plan sha256:（上一步印出的值） --confirm --url https://你的網域
```

匯入目標必須是內容為空的新站，不含使用者與密碼。匯出前先到本機後台清空垃圾桶（避免測試資料被帶上去）。匯出檔含作者與留言者的電子郵件，請當作資料庫備份保管。

**方案 B：不匯入，直接在正式站後台建立內容。**

### 6. 補一個手動步驟

到後台 **Bylines**，對作者按 **Translate** 建立繁中版（seed 無法建立分語系的作者）。

### 之後改版的原則

| 變更 | 做法 |
|---|---|
| 版型、元件、新增區塊類型 | 改程式後 `npm run deploy`，不需要動資料庫 |
| 新增／修改集合或欄位 | 後台 **Content Types**，或 `npx emdash schema ...`（登入後對正式站執行）；**部署 seed 不會改動既有資料庫** |
| 新增 UI 文字 | 後台 **UI Text** 新增項目（沒有項目時使用程式預設文字） |
| 升級 EmDash | 見上方第 3 步，重新 build 後執行 `migrate` |
| 結構改動後同步 seed | 把 D1 備份載入本機 SQLite，再 `npx emdash export-seed --database prod.db > seed/seed.json`，供日後重建環境使用 |

重大變更前請先備份：D1 有 Time Travel（時間點還原），也可用 `npx wrangler d1 export yutzulin-blog-db --remote --output backup.sql`。

### 已部署的站台：移除舊的「Hero」欄位

首頁橫幅現在只由內文裡的 Hero 區塊決定，頁面的 `hero_content` 欄位已從程式與 seed 移除。**已經建立好的正式資料庫還留著這個欄位**（seed 不會改動既有資料庫），要在正式站清掉：

```bash
npx emdash login --url https://你的網域
npx emdash schema remove-field pages hero_content --url https://你的網域
```

移除欄位會刪除該欄的值；本站這個欄位早已清空。重大結構變更前請先備份（見上方「備份」）。

### 已部署的站台：移除舊的「Hero」欄位

首頁橫幅現在只由內文裡的 Hero 區塊決定，頁面的 `hero_content` 欄位已從程式與 seed 移除。**已經建立好的正式資料庫還留著這個欄位**（seed 不會改動既有資料庫），要在正式站清掉：

```bash
npx emdash login --url https://你的網域
npx emdash schema remove-field pages hero_content --url https://你的網域
```

移除欄位會刪除該欄的值；本站這個欄位早已清空。重大結構變更前請先備份。

網站預設為「暫存」狀態，搜尋引擎看不到；準備上線時在後台 SEO 設定關閉。
