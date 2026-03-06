export const site = {
  siteName: "TH ENGINEERING",
  legalName: "合同会社THエンジニアリング",
  baseUrl: (import.meta.env.SITE || "https://th-engineering.jp").replace(
    /\/$/,
    ""
  ),
  email: "contact@th-engineering.jp",
  description:
    "エンタープライズ品質のシステム開発支援を提供する合同会社THエンジニアリングの公式サイト。AWS / Java / Flutter / React による技術支援。",
  colors: {
    primary: "#1E3A5F",
    accent: "#3B82F6",
    text: "#111827",
    subtext: "#6B7280",
    bg: "#FFFFFF",
  },
  gaId: import.meta.env.PUBLIC_GA_ID || "",
} as const;
