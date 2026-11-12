import { useEffect } from "react";

const setMeta = (selector, attr, value) => {
  if (!value) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = selector.replace("meta[", "").replace("]", "").split("=");
    el.setAttribute(key, val.replace(/"/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

export const SeoManager = ({ seo, lang }) => {
  useEffect(() => {
    if (!seo) return;
    const title = seo.title?.[lang] || seo.title?.tr;
    const desc = seo.description?.[lang] || seo.description?.tr;
    if (title) document.title = title;
    if (desc) setMeta('meta[name="description"]', "content", desc);
    if (seo.ogImage) {
      const og = seo.ogImage.startsWith("/api/files/") ? `${process.env.REACT_APP_BACKEND_URL}${seo.ogImage}` : seo.ogImage;
      setMeta('meta[property="og:image"]', "content", og);
    }
    if (seo.gscVerification) setMeta('meta[name="google-site-verification"]', "content", seo.gscVerification);
    if (seo.gaId && !document.getElementById("ga-script")) {
      const s = document.createElement("script");
      s.id = "ga-script";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${seo.gaId}`;
      document.head.appendChild(s);
      const inline = document.createElement("script");
      inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${seo.gaId}');`;
      document.head.appendChild(inline);
    }
  }, [seo, lang]);
  return null;
};

export default SeoManager;
