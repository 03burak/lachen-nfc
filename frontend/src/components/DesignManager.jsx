import { useEffect } from "react";

const FONT_MAP = {
  "Space Grotesk": '"Space Grotesk", sans-serif',
  "Plus Jakarta Sans": '"Plus Jakarta Sans", sans-serif',
  Sora: "Sora, sans-serif",
  Outfit: "Outfit, sans-serif",
  Inter: "Inter, sans-serif",
  Poppins: "Poppins, sans-serif",
  Montserrat: "Montserrat, sans-serif",
};

const FONT_STACKS = {
  "Space Grotesk": "Space+Grotesk:wght@400;500;600;700",
  "Plus Jakarta Sans": "Plus+Jakarta+Sans:wght@400;500;600;700",
  Sora: "Sora:wght@400;500;600;700",
  Outfit: "Outfit:wght@400;500;600;700",
  Inter: "Inter:wght@400;500;600;700",
  Poppins: "Poppins:wght@400;500;600;700",
  Montserrat: "Montserrat:wght@400;500;600;700",
};

const SIZE_SCALE = { compact: 0.92, default: 1, large: 1.08 };
const LH_MAP = { tight: 1.25, normal: 1.6, relaxed: 1.8 };
const LS_MAP = { tight: "-0.02em", normal: "0em", wide: "0.04em" };

export const DesignManager = ({ design, seo }) => {
  useEffect(() => {
    if (!design) return undefined;
    const f = design.fonts || {};
    const c = design.colors || {};
    const id = "design-manager-style";
    let styleEl = document.getElementById(id);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = id;
      document.head.appendChild(styleEl);
    }

    const scale = SIZE_SCALE[f.headingSize] || 1;
    const lh = LH_MAP[f.lineHeight] || 1.6;
    const ls = LS_MAP[f.letterSpacing] || "0em";
    const radius = c.buttonRadius === "0" ? "0px" : c.buttonRadius === "12" ? "12px" : "9999px";

    const families = [...new Set([f.heading, f.body].filter(Boolean))]
      .map((name) => FONT_STACKS[name])
      .filter(Boolean);
    const fontLink = families.length
      ? `@import url('https://fonts.googleapis.com/css2?${families.map((s) => "family=" + s).join("&")}&display=swap');`
      : "";

    styleEl.textContent = `
${fontLink}
:root {
  --dm-bg: ${c.background || "#050505"};
  --dm-text: ${c.textPrimary || "#FFFFFF"};
  --dm-text2: ${c.textSecondary || "#A1A1AA"};
  --dm-btn-bg: ${c.buttonBg || "#FFFFFF"};
  --dm-btn-text: ${c.buttonText || "#050505"};
  --dm-btn-radius: ${radius};
  --dm-alt-bg: ${c.sectionAltBg || "#0a0a0c"};
}
body { background-color: var(--dm-bg) !important; color: var(--dm-text) !important; }
.font-display, h1, h2, h3, h4 { font-family: ${FONT_MAP[f.heading] || FONT_MAP["Space Grotesk"]} !important; font-weight: ${f.headingWeight || "700"} !important; letter-spacing: ${ls} !important; }
body, p, li, span, input, textarea, button, a { font-family: ${FONT_MAP[f.body] || FONT_MAP["Plus Jakarta Sans"]}; }
p, li { line-height: ${lh} !important; }
.text-zinc-400, .text-zinc-500 { color: var(--dm-text2) !important; }
.bg-\\[\\#0a0a0c\\], .bg-\\[\\#0a0a0c\\] { background-color: var(--dm-alt-bg) !important; }
[data-testid="hero-cta-discover"], [data-testid="nav-cta"], [data-testid="contact-submit-btn"], [data-testid^="package-cta-"], [data-testid="admin-save-btn"], .dm-btn { background-color: var(--dm-btn-bg) !important; color: var(--dm-btn-text) !important; border-radius: var(--dm-btn-radius) !important; }
[data-testid="hero-headline"] { font-size: calc(clamp(2.6rem, 8vw, 6.2rem) * ${scale}) !important; }
[data-testid$="-title"] { }
h2 { font-size: calc(1em * ${scale}) !important; }
`;

    if (seo) {
      const link = document.querySelector('link[rel="icon"]');
      const fav = design.images?.favicon;
      if (fav && link) link.href = fav.startsWith("/api/files/") ? `${process.env.REACT_APP_BACKEND_URL}${fav}` : fav;
    }
    return undefined;
  }, [design, seo]);

  return null;
};

export default DesignManager;
