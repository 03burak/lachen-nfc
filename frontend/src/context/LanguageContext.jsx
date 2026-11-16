import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_CONTENT } from "@/data/defaults";

const UI = {
  tr: {
    meta: { title: "Lachen & Co. | Restoranların Geleceğini Birlikte Tasarlıyoruz" },
    nav: {
      about: "Hakkımızda", services: "Hizmetler", technology: "Teknoloji", packages: "Paketler",
      contact: "İletişim", cta: "Bize Ulaşın", menuOpen: "Menüyü Aç", menuClose: "Menüyü Kapat",
    },
    form: {
      firstName: "Ad", lastName: "Soyad", phone: "Telefon", email: "E-posta",
      message: "Mesajınız", messageOptional: "Opsiyonel",
      placeholders: {
        firstName: "Adınız", lastName: "Soyadınız", phone: "+90 5__ ___ __ __", email: "ornek@restoran.com",
        message: "Kendinizi, işletmenizi veya talebinizi kısaca anlatabilirsiniz…",
      },
      submit: "Mesaj Gönder", sending: "Gönderiliyor…",
      error: "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin veya lachen.co@outlook.com adresine yazın.",
      successReset: "Yeni Mesaj Gönder",
    },
    tech: {
      demo: "Demo Veri", live: "Canlı Panel", phoneTitle: "NFC Menü & Bölünmüş Ödeme",
      tabs: { menu: "Menü", order: "Sipariş", split: "Hesap Böl" }, table: "Masa 07",
      menuItems: [
        { name: "Trüf Risotto", desc: "Örgü pirinç, parmesan, trüf yağı", price: "₺480" },
        { name: "Wagyu Burger", desc: "Karamelize soğan, cheddar, özel sos", price: "₺620" },
        { name: "San Sebastian", desc: "Yanık cheesecake, frambuaz sos", price: "₺320" },
      ],
      sendOrder: "Siparişi Gönder",
      orderItems: [
        { name: "Trüf Risotto", status: "Hazırlanıyor" },
        { name: "Wagyu Burger", status: "Serviste" },
        { name: "San Sebastian", status: "Teslim Edildi" },
      ],
      total: "Toplam", people: "4 kişi", guest: "Misafir", paid: "Ödendi", pay: "Öde",
      dashTitle: "Restoran Analiz Paneli",
      stats: [
        { label: "Saatlik NFC Okutma", value: "142" },
        { label: "Ortalama Masa Süresi", value: "38 dk" },
        { label: "Yorum Dönüşümü", value: "%34,8" },
      ],
      scanChart: "Saatlik NFC Okutma", itemChart: "En Çok Satan Ürünler",
    },
  },
  en: {
    meta: { title: "Lachen & Co. | Architecting the Future of Restaurants" },
    nav: {
      about: "About Us", services: "Services", technology: "Technology", packages: "Packages",
      contact: "Contact", cta: "Contact Us", menuOpen: "Open Menu", menuClose: "Close Menu",
    },
    form: {
      firstName: "First Name", lastName: "Last Name", phone: "Phone", email: "Email",
      message: "Your Message", messageOptional: "Optional",
      placeholders: {
        firstName: "Your first name", lastName: "Your last name", phone: "+90 5__ ___ __ __", email: "you@restaurant.com",
        message: "Briefly tell us about yourself, your business, or your request…",
      },
      submit: "Send Message", sending: "Sending…",
      error: "Your message could not be sent. Please try again later or write to lachen.co@outlook.com.",
      successReset: "Send Another Message",
    },
    tech: {
      demo: "Demo Data", live: "Live Panel", phoneTitle: "NFC Menu & Split Payment",
      tabs: { menu: "Menu", order: "Order", split: "Split Bill" }, table: "Table 07",
      menuItems: [
        { name: "Truffle Risotto", desc: "Carnaroli rice, parmesan, truffle oil", price: "₺480" },
        { name: "Wagyu Burger", desc: "Caramelized onion, cheddar, house sauce", price: "₺620" },
        { name: "San Sebastian", desc: "Burnt cheesecake, raspberry sauce", price: "₺320" },
      ],
      sendOrder: "Send Order",
      orderItems: [
        { name: "Truffle Risotto", status: "Preparing" },
        { name: "Wagyu Burger", status: "Serving" },
        { name: "San Sebastian", status: "Delivered" },
      ],
      total: "Total", people: "4 guests", guest: "Guest", paid: "Paid", pay: "Pay",
      dashTitle: "Restaurant Analytics Panel",
      stats: [
        { label: "Hourly NFC Scans", value: "142" },
        { label: "Avg. Table Time", value: "38 min" },
        { label: "Review Conversion", value: "34.8%" },
      ],
      scanChart: "Hourly NFC Scans", itemChart: "Best-Selling Products",
    },
  },
};

const API_URL = process.env.REACT_APP_BACKEND_URL;
export const LanguageContext = createContext(null);

function buildT(content, lang) {
  const ui = UI[lang];
  const c = content || DEFAULT_CONTENT;
  const l = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.tr ?? "" : obj ?? "");
  return {
    meta: ui.meta,
    nav: ui.nav,
    form: ui.form,
    hero: {
      eyebrow: l(c.hero.eyebrow),
      lines: c.hero.lines[lang] || c.hero.lines.tr,
      sub: l(c.hero.sub),
      ctaPrimary: l(c.hero.ctaPrimary),
      ctaSecondary: l(c.hero.ctaSecondary),
      scroll: l(c.hero.scroll),
    },
    marquee: c.marquee[lang] || c.marquee.tr,
    menu: (c.menu || []).map((m) => ({ ...m, label: l(m.label) })),
    about: {
      eyebrow: l(c.about.eyebrow),
      title: l(c.about.title),
      p1: l(c.about.p1),
      p2: l(c.about.p2),
      pillars: c.about.pillars.map((p) => ({ title: l(p.title), desc: l(p.desc) })),
      slider: c.about.slider || [],
    },
    services: {
      eyebrow: l(c.services.eyebrow),
      title: l(c.services.title),
      desc: l(c.services.desc),
      items: c.services.items.map((s) => ({ id: s.id, tag: s.tag, label: l(s.label), title: l(s.title), desc: l(s.desc), icon: s.icon })),
    },
    industries: {
      eyebrow: l(c.industries.eyebrow),
      title: l(c.industries.title),
      desc: l(c.industries.desc),
      items: c.industries.items.map((s) => ({ id: s.id, title: l(s.title), desc: l(s.desc), icon: s.icon })),
    },
    tech: {
      ...ui.tech,
      eyebrow: l(c.tech.eyebrow),
      title: l(c.tech.title),
      desc: l(c.tech.desc),
      disclaimer: l(c.tech.disclaimer),
      featureTitle: l(c.tech.featureTitle),
      features: c.tech.features[lang] || c.tech.features.tr,
    },
    references: {
      enabled: c.references ? !!c.references.enabled : false,
      eyebrow: c.references ? l(c.references.eyebrow) : "",
      title: c.references ? l(c.references.title) : "",
      items: c.references ? c.references.items || [] : [],
    },
    packages: {
      eyebrow: l(c.packages.eyebrow),
      title: l(c.packages.title),
      desc: l(c.packages.desc),
      includesTitle: l(c.packages.includesTitle),
      cta: l(c.packages.cta),
      items: c.packages.items.map((p) => ({
        key: p.key,
        tier: l(p.tier),
        name: l(p.name),
        desc: l(p.desc),
        features: p.features[lang] || p.features.tr,
        price: l(p.price),
      })),
    },
    contact: {
      eyebrow: l(c.contact.eyebrow),
      title: l(c.contact.title),
      desc: l(c.contact.desc),
      note: l(c.contact.note),
      successTitle: l(c.contact.successTitle),
      successDesc: l(c.contact.successDesc),
      successReset: ui.form.successReset,
      firstName: ui.form.firstName,
      lastName: ui.form.lastName,
      phone: ui.form.phone,
      email: ui.form.email,
      message: ui.form.message,
      messageOptional: ui.form.messageOptional,
      placeholders: ui.form.placeholders,
      submit: ui.form.submit,
      sending: ui.form.sending,
      error: ui.form.error,
      links: c.contact.links.map((x) => ({ id: x.id, label: l(x.label), value: x.value, href: x.href, icon: x.icon })),
    },
    footer: {
      contact: l(c.footer.contact),
      explore: l(c.footer.explore),
      rights: l(c.footer.rights),
      tagline: l(c.footer.tagline),
      email: c.footer.email,
      instagram: c.footer.instagram,
      instagramHref: c.footer.instagramHref,
      linkedinHref: c.footer.linkedinHref || "",
    },
  };
}

export const LanguageProvider = ({ children, initialContent = null }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lachen-lang") === "en" ? "en" : "tr";
    } catch {
      return "tr";
    }
  });
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (initialContent) return undefined;
    let alive = true;
    fetch(`${API_URL}/api/content`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && data) setContent(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [initialContent]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = UI[lang].meta.title;
    try {
      localStorage.setItem("lachen-lang", lang);
    } catch {}
  }, [lang]);

  const t = buildT(content, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
