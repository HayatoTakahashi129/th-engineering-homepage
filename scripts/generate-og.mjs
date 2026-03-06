import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "og");

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------
const pages = [
  { slug: "index", tagline: "技術を理解するからこそ、最適解を導ける。" },
  { slug: "services", tagline: "技術戦略から実装まで。エンタープライズ品質で支援。" },
  { slug: "works", tagline: "決済領域のバックエンド開発を中心に支援。" },
  { slug: "company", tagline: "技術と調整力で、組織の最適解を導く。" },
  { slug: "pricing", tagline: "工数提供ではなく、技術判断に責任を持つ支援。" },
  { slug: "contact", tagline: "課題が固まっていない段階でもお気軽にご相談ください。" },
];

// ---------------------------------------------------------------------------
// Fonts – fetch from fontsource CDN and cache
// ---------------------------------------------------------------------------
async function loadFonts() {
  const [notoRegular, notoBold] = await Promise.all([
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-400-normal.woff"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-jp@latest/japanese-700-normal.woff"
    ).then((r) => r.arrayBuffer()),
  ]);
  return { notoRegular, notoBold };
}

// ---------------------------------------------------------------------------
// Build the satori element tree
// ---------------------------------------------------------------------------
function buildOgElement(tagline) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: "60px",
        fontFamily: "Noto Sans JP",
      },
      children: [
        // ── Header: logo icon + company name ──
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", gap: "20px" },
            children: [
              // Logo icon (navy rounded square with node dots)
              {
                type: "div",
                props: {
                  style: {
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#1E3A5F",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        },
                        children: [
                          {
                            type: "div",
                            props: {
                              style: { display: "flex", gap: "12px" },
                              children: [
                                dot(),
                                dot(),
                              ],
                            },
                          },
                          {
                            type: "div",
                            props: {
                              style: { display: "flex", gap: "12px" },
                              children: [
                                dot(),
                                dot(),
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              // Company name + subtitle
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "28px",
                          fontWeight: 700,
                          color: "#111827",
                        },
                        children: "TH Engineering",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "16px",
                          color: "#6B7280",
                          marginTop: "4px",
                        },
                        children: "Enterprise Architecture & Development",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // ── Tagline (centre) ──
        {
          type: "div",
          props: {
            style: {
              flex: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "48px",
                    fontWeight: 700,
                    color: "#1E3A5F",
                    textAlign: "center",
                    lineHeight: "1.4",
                  },
                  children: tagline,
                },
              },
            ],
          },
        },

        // ── Stack (bottom) ──
        {
          type: "div",
          props: {
            style: { display: "flex", justifyContent: "center" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "18px",
                    color: "#9CA3AF",
                    letterSpacing: "0.05em",
                  },
                  children: "AWS / Java / Flutter / React",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

/** White circle dot for the logo icon */
function dot() {
  return {
    type: "div",
    props: {
      style: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: "white",
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log("[OG] Loading fonts…");
  const { notoRegular, notoBold } = await loadFonts();

  const fonts = [
    { name: "Noto Sans JP", data: notoRegular, weight: 400, style: "normal" },
    { name: "Noto Sans JP", data: notoBold, weight: 700, style: "normal" },
  ];

  mkdirSync(OUT_DIR, { recursive: true });

  for (const page of pages) {
    const svg = await satori(buildOgElement(page.tagline), {
      width: 1200,
      height: 630,
      fonts,
    });

    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 1200 },
    });
    const png = resvg.render().asPng();

    const outPath = join(OUT_DIR, `${page.slug}.png`);
    writeFileSync(outPath, png);
    console.log(`[OK] generated ${outPath}`);
  }

  console.log("[OG] Done – all images generated.");
}

main().catch((err) => {
  console.error("[OG] Error:", err);
  process.exit(1);
});
