import { createContext, useContext, useEffect, useState } from "react";

const translations = {
  tr: {
    meta: { title: "Lachen & Co. | Restoranların Geleceğini Birlikte Tasarlıyoruz" },
    nav: { services: "Hizmetler", technology: "Teknoloji", contact: "İletişim", cta: "Bize Ulaşın", menuOpen: "Menüyü Aç", menuClose: "Menüyü Kapat" },
    hero: {
      eyebrow: "NFC & Yapay Zekâ Restoran Teknolojileri",
      lines: ["Restoranların", "Geleceğini", "Birlikte Tasarlıyoruz."],
      sub: "NFC ve yapay zekâ destekli temassız menü, akıllı sipariş, hesabı bölüşme ve anlık analiz çözümleriyle misafir deneyimini yeniden tanımlıyoruz.",
      ctaPrimary: "Hizmetlerimizi Keşfedin",
      ctaSecondary: "Bize Ulaşın",
      scroll: "Keşfet",
    },
    marquee: ["NFC Menü", "Temassız Sipariş", "Bölünmüş Ödeme", "Google Yorumları", "Analiz Paneli", "Yapay Zekâ Asistanı"],
    services: {
      eyebrow: "Hizmetlerimiz",
      title: "Restoranınız için uçtan uca dijital ekosistem",
      desc: "Masadan mutfağa, menüden analizlere kadar tüm operasyonunuzu tek platformda birleştiriyoruz.",
      items: [
        { id: "nfc-menu", tag: "01", label: "NFC + Web App", title: "NFC Menü, Sipariş & Ödeme", desc: "Her misafir telefonundan menüyü açar, kendi siparişini verir ve siparişinin ücretini ayrı ayrı ödeyebilir.", icon: "nfc" },
        { id: "nfc-review", tag: "02", label: "Büyüme", title: "NFC Google Yorum Sistemi", desc: "Tek dokunuşla misafirleri Google yorumlarına yönlendirin; tüm okutma istatistiklerini panelinizden izleyin.", icon: "star" },
        { id: "analytics", tag: "03", label: "Zekâ", title: "Analiz Paneli", desc: "Ürün satışlarını, siparişleri ve NFC kullanımını gösteren tek ve anlık analiz paneli.", icon: "chart" },
        { id: "ai-assistant", tag: "04", label: "AI", title: "Yapay Zekâ Asistanı", desc: "Yemek önerileri sunan ve misafirlerin yemekler hakkında soru sorabildiği yapay zekâ asistanı.", icon: "ai" },
      ],
    },
    tech: {
      eyebrow: "Teknoloji",
      title: "Ürünleri yakından inceleyin",
      desc: "NFC menü deneyiminden analiz paneline, ürünlerimizin nasıl göründüğünü ve nasıl çalıştığını keşfedin.",
      disclaimer: "Bu arayüzler örnek verilerle hazırlanmış temsili tasarımlardır; gösterilen tüm değerler demo verisidir.",
      demo: "Demo Veri",
      live: "Canlı Panel",
      phoneTitle: "NFC Menü & Bölünmüş Ödeme",
      tabs: { menu: "Menü", order: "Sipariş", split: "Hesap Böl" },
      table: "Masa 07",
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
      scanChart: "Saatlik NFC Okutma",
      itemChart: "En Çok Satan Ürünler",
      featureTitle: "Telefonda menüden ödemeye tek akış",
      features: [
        "Misafir masadaki NFC etiketini okutur, menü anında açılır.",
        "Her misafir kendi siparişinin ücretini ayrı öder.",
        "Ödeme sonrası tek dokunuşla Google yorumu ekranı gelir.",
      ],
    },
    contact: {
      eyebrow: "Bize Ulaşın",
      title: "Birlikte tasarlayalım.",
      desc: "Restoranınız için doğru çözümü birlikte seçelim. Formu doldurun, en kısa sürede size dönelim.",
      firstName: "Ad", lastName: "Soyad", phone: "Telefon", email: "E-posta",
      placeholders: { firstName: "Adınız", lastName: "Soyadınız", phone: "+90 5__ ___ __ __", email: "ornek@restoran.com" },
      submit: "Mesaj Gönder",
      note: "Bu form şu anda tanıtım amaçlıdır; gönderimler e-posta olarak iletilmez.",
      successTitle: "Mesajınız alındı",
      successDesc: "Teşekkürler! En kısa sürede size döneceğiz.",
      successReset: "Yeni Mesaj Gönder",
    },
    footer: {
      desc: "Lachen & Co., restoranlar için NFC menü ve ödeme, Google yorum sistemleri, analiz panelleri ve yapay zekâ çözümleri geliştiren teknoloji şirketidir.",
      contact: "İletişim",
      explore: "Keşfet",
      rights: "Tüm hakları saklıdır.",
      tagline: "NFC & AI — Restoran Teknolojileri",
    },
  },
  en: {
    meta: { title: "Lachen & Co. | Architecting the Future of Restaurants" },
    nav: { services: "Services", technology: "Technology", contact: "Contact", cta: "Contact Us", menuOpen: "Open Menu", menuClose: "Close Menu" },
    hero: {
      eyebrow: "NFC & AI Restaurant Technologies",
      lines: ["Architecting the", "Future of", "Restaurants."],
      sub: "We redefine the guest experience with NFC & AI-powered contactless menus, smart ordering, bill splitting, and real-time analytics.",
      ctaPrimary: "Discover Our Services",
      ctaSecondary: "Contact Us",
      scroll: "Scroll",
    },
    marquee: ["NFC Menu", "Contactless Ordering", "Split Payment", "Google Reviews", "Analytics Panel", "AI Assistant"],
    services: {
      eyebrow: "Our Services",
      title: "An end-to-end digital ecosystem for your restaurant",
      desc: "From table to kitchen, from menu to analytics — we bring your entire operation into one platform.",
      items: [
        { id: "nfc-menu", tag: "01", label: "NFC + Web App", title: "NFC Menu, Order & Payment", desc: "Every guest opens the menu on their phone, places their own order, and pays for their own items separately.", icon: "nfc" },
        { id: "nfc-review", tag: "02", label: "Growth", title: "NFC Google Review System", desc: "One tap directs guests to your Google reviews, with every scan tracked in your stats panel.", icon: "star" },
        { id: "analytics", tag: "03", label: "Intelligence", title: "Analytics Dashboard", desc: "One live panel showing product sales, orders, and NFC usage.", icon: "chart" },
        { id: "ai-assistant", tag: "04", label: "AI", title: "AI Food Assistant", desc: "An AI assistant that recommends dishes and answers guests' questions about the food.", icon: "ai" },
      ],
    },
    tech: {
      eyebrow: "Technology",
      title: "A closer look at our products",
      desc: "From the NFC menu experience to the analytics panel, explore how our products look and work.",
      disclaimer: "These interfaces are representative designs prepared with sample data; all values shown are demo data.",
      demo: "Demo Data",
      live: "Live Panel",
      phoneTitle: "NFC Menu & Split Payment",
      tabs: { menu: "Menu", order: "Order", split: "Split Bill" },
      table: "Table 07",
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
      scanChart: "Hourly NFC Scans",
      itemChart: "Best-Selling Products",
      featureTitle: "From menu to payment in a single flow",
      features: [
        "The guest taps the NFC tag on the table and the menu opens instantly.",
        "Each guest pays for their own order separately.",
        "After payment, the Google review screen appears in one tap.",
      ],
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Let's design it together.",
      desc: "Let's choose the right solution for your restaurant together. Fill in the form and we will get back to you shortly.",
      firstName: "First Name", lastName: "Last Name", phone: "Phone", email: "Email",
      placeholders: { firstName: "Your first name", lastName: "Your last name", phone: "+90 5__ ___ __ __", email: "you@restaurant.com" },
      submit: "Send Message",
      note: "This form is for presentation purposes only; submissions are not emailed.",
      successTitle: "Your message has been received",
      successDesc: "Thank you! We will get back to you shortly.",
      successReset: "Send Another Message",
    },
    footer: {
      desc: "Lachen & Co. is a technology company building NFC menu & payment, Google review, analytics, and AI solutions for restaurants.",
      contact: "Contact",
      explore: "Explore",
      rights: "All rights reserved.",
      tagline: "NFC & AI — Restaurant Technologies",
    },
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lachen-lang") === "en" ? "en" : "tr";
    } catch {
      return "tr";
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].meta.title;
    try {
      localStorage.setItem("lachen-lang", lang);
    } catch {}
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
