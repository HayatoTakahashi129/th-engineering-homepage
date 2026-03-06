# TH Engineering — Corporate Website

合同会社THエンジニアリングのコーポレートサイト。
Astro + Tailwind CSS で構築し、GitHub Pages で静的ホスティングしています。

**URL:** https://th-engineering.jp

## 技術スタック

- **フレームワーク:** [Astro](https://astro.build/) v5 (SSG)
- **スタイリング:** [Tailwind CSS](https://tailwindcss.com/) v4
- **OG画像生成:** [satori](https://github.com/vercel/satori) + [@resvg/resvg-js](https://github.com/nicolo-ribaudo/resvg-js)
- **ホスティング:** GitHub Pages
- **CI/CD:** GitHub Actions

## プロジェクト構成

```
├── .github/workflows/
│   └── deploy.yml            # GitHub Pages デプロイ
├── scripts/
│   └── generate-og.mjs       # ビルド時 OG 画像生成
├── public/
│   ├── og/                    # 生成された OG 画像 (1200x630 PNG)
│   ├── logo.svg
│   ├── favicon.svg
│   └── CNAME
├── src/
│   ├── components/
│   │   ├── SEO.astro          # OGP / Twitter Card / JSON-LD
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Container.astro
│   │   ├── CTA.astro
│   │   └── SectionTitle.astro
│   ├── data/
│   │   ├── site.ts            # サイト設定 (baseUrl, siteName 等)
│   │   ├── nav.ts
│   │   ├── services.ts
│   │   ├── strengths.ts
│   │   └── works.ts
│   ├── layouts/
│   │   └── BaseLayout.astro   # 共通レイアウト
│   ├── pages/
│   │   ├── index.astro        # トップ
│   │   ├── services.astro     # 提供サービス
│   │   ├── works.astro        # 実績
│   │   ├── company.astro      # 会社概要
│   │   ├── pricing.astro      # 費用
│   │   └── contact.astro      # お問い合わせ
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## コマンド

| コマンド | 内容 |
| :--- | :--- |
| `npm install` | 依存パッケージをインストール |
| `npm run dev` | 開発サーバーを起動 (`localhost:4321`) |
| `npm run build` | OG画像生成 → 本番ビルド (`dist/`) |
| `npm run preview` | ビルド結果をローカルでプレビュー |
| `npm run generate-og` | OG画像のみ再生成 |

## OG画像の自動生成

`npm run build` を実行すると、Astro ビルドの前に `scripts/generate-og.mjs` が動作し、
各ページ用の OG 画像 (1200x630 PNG) を `public/og/` に生成します。

生成される画像:

- `public/og/index.png`
- `public/og/services.png`
- `public/og/works.png`
- `public/og/company.png`
- `public/og/pricing.png`
- `public/og/contact.png`

各ページの `<meta property="og:image">` は `SEO.astro` で pathname から自動的に対応する画像を参照します。

## デプロイ

`main` ブランチへの push で GitHub Actions が自動デプロイします (`.github/workflows/deploy.yml`)。

### 環境変数

| 変数名 | 用途 | デフォルト |
| :--- | :--- | :--- |
| `PUBLIC_SITE_URL` | サイトの origin URL | `https://th-engineering.jp` |
| `PUBLIC_BASE_PATH` | ベースパス (GitHub Pages リポジトリ配下の場合) | `/` |
| `PUBLIC_GA_ID` | Google Analytics 測定 ID | (なし) |

GitHub Pages でリポジトリ名がパスに入る場合:

```bash
PUBLIC_SITE_URL=https://user.github.io PUBLIC_BASE_PATH=/repo-name npm run build
```
