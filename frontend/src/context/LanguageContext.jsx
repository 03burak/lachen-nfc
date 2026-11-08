import { createContext, useContext, useEffect, useState } from "react";

const translations = {
  tr: {
    meta: { title: "Lachen & Co. | Restoranların Geleceğini Birlikte Tasarlıyoruz" },
    nav: {
      about: "Hakkımızda", services: "Hizmetler", technology: "Teknoloji", packages: "Paketler",
      contact: "İletişim", cta: "Bize Ulaşın", menuOpen: "Menüyü Aç", menuClose: "Menüyü Kapat",
    },
    hero: {
      eyebrow: "Yapay Zeka NFC Teknolojileri",
      lines: ["Restoranların", "Geleceğini", "Birlikte Tasarlıyoruz."],
      sub: "NFC ve yapay zekâ destekli temassız menü, akıllı sipariş, hesabı bölüşme ve anlık analiz çözümleriyle misafir deneyimini yeniden tanımlıyoruz.",
      ctaPrimary: "Hizmetlerimizi Keşfedin",
      ctaSecondary: "Bize Ulaşın",
      scroll: "Keşfet",
    },
    marquee: ["NFC Menü", "Temassız Sipariş", "Bölünmüş Ödeme", "Google Yorumları", "Analiz Paneli", "Yapay Zekâ Asistanı"],
    about: {
      eyebrow: "Hakkımızda",
      title: "Restoran dijitalleşmesinde teknoloji ortağınız",
      p1: "Lachen & Co., restoran ve kafe işletmeleri için temassız teknoloji çözümleri geliştiren kurumsal bir teknoloji şirketidir. NFC ve QR tabanlı menü, sipariş ve ödeme sistemlerimizle misafir deneyimini hızlandırmayı, operasyonel verimliliği artırmayı ve işletmelere veriye dayalı karar alma olanağı sunmayı amaçlıyoruz.",
      p2: "Masadaki ilk dokunuştan hesabın bölüşülmesine kadar tüm akışı tek bir ekosistemde topluyoruz. Analiz panellerimiz satış, sipariş ve kullanım verilerini anlık olarak görünür kılarken; yapay zekâ asistanımız misafirlerinize yemek önerileri sunar ve sorularını yanıtlar.",
      pillars: [
        { title: "Temassız Teknoloji", desc: "NFC ve QR çözümleriyle uygulama indirmeden saniyeler içinde menüye erişim." },
        { title: "Sipariş & Ödeme", desc: "Masa başında sipariş, bölünmüş ödeme ve hızlı hesap kapatma akışı." },
        { title: "Misafir Deneyimi", desc: "Google yorumlarına yönlendirme ve yapay zekâ destekli kişiselleştirilmiş servis." },
      ],
      imageTag: "Lachen & Co. — Restoran Teknolojileri",
    },
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
    industries: {
      eyebrow: "Hizmet Verdiğimiz İşletmeler",
      title: "Her işletme tipine uygun çözümler",
      desc: "Fine dining'den hızlı servise, her işletmenin ritmine göre tasarlanmış dijital altyapı.",
      items: [
        { id: "restaurant", title: "Restoran & Lokantalar", desc: "Dijital menü, QR/NFC üzerinden masadan sipariş, mutfak yönetimi, hesap bölüşme ve hızlı ödeme çözümleriyle restoran operasyonlarını kolaylaştırıyoruz.", icon: "utensils" },
        { id: "cafe", title: "Kafe & Bistro İşletmeleri", desc: "Garson çağırma, masadan sipariş, dijital menü ve hızlı ödeme sistemleriyle servis süreçlerini daha verimli hale getiriyoruz.", icon: "cafe" },
        { id: "coffee", title: "Kahve & Hızlı Servis Noktaları", desc: "Gel-al sipariş, hızlı ödeme, dijital menü ve müşteri sadakat sistemleriyle hızlı servis işletmelerine dijital çözümler sunuyoruz.", icon: "coffee" },
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
        "Masadan toplu sipariş, kolay hesap paylaşımı ve hızlı ödeme deneyimi.",
        "Ödeme sonrası tek dokunuşla Google yorumu ekranı gelir.",
      ],
    },
    packages: {
      eyebrow: "Paketlerimiz",
      title: "İşletmenize uygun paketi seçin",
      desc: "İşletmenizin ihtiyaçlarına uygun dijital çözümleri keşfedin. Size en uygun paketi seçerek restoranınızı geleceğe taşıyın.",
      includesTitle: "Paket İçeriği",
      cta: "Fiyat İçin Bize Ulaşın",
      items: [
        {
          key: "bronz",
          tier: "Başlangıç",
          name: "Temel İşletme",
          desc: "QR / NFC Dijital Menü ve temel sipariş yönetimi.",
          features: ["Masadan Sipariş", "Garson Çağrı", "Sessiz Masa & Özel Not", "Mutfak Ekranı (KDS)", "Google Yorum"],
        },
        {
          key: "silver",
          tier: "En Çok Tercih Edilen",
          name: "Profesyonel İşletme",
          desc: "Daha hızlı servis ve gelişmiş ödeme deneyimi.",
          features: [
            "Masadan Sipariş", "Garson Çağrı", "Sessiz Masa & Özel Not", "Mutfak Ekranı (KDS)",
            "Google Yorum", "Akıllı Garson Çağrı", "Masada Ödeme", "Hesabı Bölüşme",
            "Dijital Bahşiş", "Çoklu Dil (TR / EN)", "Google Yorum Kalkanı",
          ],
        },
        {
          key: "gold",
          tier: "Tam Donanım",
          name: "Premium İşletme",
          desc: "İşletmenin tüm dijital süreçlerini tek sistemde yönetin.",
          features: [
            "Masadan Sipariş", "Garson Çağrı", "Sessiz Masa & Özel Not", "Mutfak Ekranı (KDS)",
            "Google Yorum", "Akıllı Garson Çağrı", "Masada Ödeme", "Hesabı Bölüşme",
            "Dijital Bahşiş", "Çoklu Dil (TR / EN)", "Google Yorum Kalkanı", "Kural Tabanlı AI",
            "Özel Tasarım (Arayüz Düzenleyici)", "Self-Service (Bip)",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Bize Ulaşın",
      title: "Birlikte tasarlayalım.",
      desc: "Restoranınız için doğru çözümü birlikte seçelim. Formu doldurun, en kısa sürede size dönelim.",
      firstName: "Ad", lastName: "Soyad", phone: "Telefon", email: "E-posta",
      message: "Mesajınız", messageOptional: "Opsiyonel",
      placeholders: {
        firstName: "Adınız", lastName: "Soyadınız", phone: "+90 5__ ___ __ __", email: "ornek@restoran.com",
        message: "Kendinizi, işletmenizi veya talebinizi kısaca anlatabilirsiniz…",
      },
      submit: "Mesaj Gönder",
      sending: "Gönderiliyor…",
      error: "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin veya lachen.co@outlook.com adresine yazın.",
      note: "Mesajlarınız doğrudan e-posta kutumuza iletilir.",
      successTitle: "Mesajınız alındı",
      successDesc: "Teşekkürler! En kısa sürede size döneceğiz.",
      successReset: "Yeni Mesaj Gönder",
      links: [
        { id: "email", label: "E-posta", value: "lachen.co@outlook.com", href: "mailto:lachen.co@outlook.com", icon: "mail" },
        { id: "phone", label: "Telefon", value: "+90 543 245 33 31", href: "tel:+905432453331", icon: "phone" },
        { id: "whatsapp", label: "WhatsApp", value: "+90 543 245 33 31", href: "https://wa.me/905432453331", icon: "whatsapp" },
        { id: "instagram", label: "Instagram", value: "@lachencompany", href: "https://www.instagram.com/lachencompany/", icon: "instagram" },
      ],
    },
    footer: {
      contact: "İletişim",
      explore: "Keşfet",
      rights: "Tüm hakları saklıdır.",
      tagline: "Yapay Zeka NFC Teknolojileri",
    },
  },
  en: {
    meta: { title: "Lachen & Co. | Architecting the Future of Restaurants" },
    nav: {
      about: "About Us", services: "Services", technology: "Technology", packages: "Packages",
      contact: "Contact", cta: "Contact Us", menuOpen: "Open Menu", menuClose: "Close Menu",
    },
    hero: {
      eyebrow: "AI-Powered NFC Technologies",
      lines: ["Architecting the", "Future of", "Restaurants."],
      sub: "We redefine the guest experience with NFC & AI-powered contactless menus, smart ordering, bill splitting, and real-time analytics.",
      ctaPrimary: "Discover Our Services",
      ctaSecondary: "Contact Us",
      scroll: "Scroll",
    },
    marquee: ["NFC Menu", "Contactless Ordering", "Split Payment", "Google Reviews", "Analytics Panel", "AI Assistant"],
    about: {
      eyebrow: "About Us",
      title: "Your technology partner in restaurant digitalization",
      p1: "Lachen & Co. is a corporate technology company developing contactless technology solutions for restaurants and cafés. With our NFC and QR-based menu, ordering, and payment systems, we aim to speed up the guest experience, increase operational efficiency, and give businesses the ability to make data-driven decisions.",
      p2: "We bring the entire flow — from the first tap at the table to splitting the bill — into a single ecosystem. While our analytics dashboards make sales, order, and usage data visible in real time, our AI assistant offers your guests dish recommendations and answers their questions.",
      pillars: [
        { title: "Contactless Technology", desc: "Access the menu in seconds with NFC and QR solutions — no app download required." },
        { title: "Ordering & Payment", desc: "Table-side ordering, split payment, and a fast bill-closing flow." },
        { title: "Guest Experience", desc: "Google review redirection and AI-assisted personalized service." },
      ],
      imageTag: "Lachen & Co. — Restaurant Technologies",
    },
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
    industries: {
      eyebrow: "Businesses We Serve",
      title: "Solutions for every type of business",
      desc: "Digital infrastructure tailored to the rhythm of every venue, from fine dining to quick service.",
      items: [
        { id: "restaurant", title: "Restaurants & Diners", desc: "We simplify restaurant operations with digital menus, table-side ordering via QR/NFC, kitchen management, bill splitting, and fast payment solutions.", icon: "utensils" },
        { id: "cafe", title: "Cafés & Bistros", desc: "We make service processes more efficient with waiter calling, table-side ordering, digital menus, and fast payment systems.", icon: "cafe" },
        { id: "coffee", title: "Coffee & Quick-Service Spots", desc: "We offer digital solutions for quick-service businesses with grab-and-go ordering, fast payment, digital menus, and customer loyalty systems.", icon: "coffee" },
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
        "Group ordering from the table, easy bill sharing, and a fast payment experience.",
        "After payment, the Google review screen appears in one tap.",
      ],
    },
    packages: {
      eyebrow: "Our Packages",
      title: "Choose the package that fits your business",
      desc: "Discover digital solutions tailored to your business needs. Pick the package that suits you best and carry your restaurant into the future.",
      includesTitle: "Package Contents",
      cta: "Contact Us for Pricing",
      items: [
        {
          key: "bronz",
          tier: "Starter",
          name: "Basic Business",
          desc: "QR / NFC Digital Menu and essential order management.",
          features: ["Table Ordering", "Waiter Call", "Quiet Table & Special Notes", "Kitchen Display (KDS)", "Google Reviews"],
        },
        {
          key: "silver",
          tier: "Most Popular",
          name: "Professional Business",
          desc: "Faster service and an advanced payment experience.",
          features: [
            "Table Ordering", "Waiter Call", "Quiet Table & Special Notes", "Kitchen Display (KDS)",
            "Google Reviews", "Smart Waiter Call", "Pay at the Table", "Bill Splitting",
            "Digital Tipping", "Multi-Language (TR / EN)", "Google Review Shield",
          ],
        },
        {
          key: "gold",
          tier: "Fully Equipped",
          name: "Premium Business",
          desc: "Manage all your business's digital processes in one system.",
          features: [
            "Table Ordering", "Waiter Call", "Quiet Table & Special Notes", "Kitchen Display (KDS)",
            "Google Reviews", "Smart Waiter Call", "Pay at the Table", "Bill Splitting",
            "Digital Tipping", "Multi-Language (TR / EN)", "Google Review Shield", "Rule-Based AI",
            "Custom Design (UI Editor)", "Self-Service (Beep)",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Let's design it together.",
      desc: "Let's choose the right solution for your restaurant together. Fill in the form and we will get back to you shortly.",
      firstName: "First Name", lastName: "Last Name", phone: "Phone", email: "Email",
      message: "Your Message", messageOptional: "Optional",
      placeholders: {
        firstName: "Your first name", lastName: "Your last name", phone: "+90 5__ ___ __ __", email: "you@restaurant.com",
        message: "Briefly tell us about yourself, your business, or your request…",
      },
      submit: "Send Message",
      sending: "Sending…",
      error: "Your message could not be sent. Please try again later or write to lachen.co@outlook.com.",
      note: "Your messages are delivered directly to our inbox.",
      successTitle: "Your message has been received",
      successDesc: "Thank you! We will get back to you shortly.",
      successReset: "Send Another Message",
      links: [
        { id: "email", label: "Email", value: "lachen.co@outlook.com", href: "mailto:lachen.co@outlook.com", icon: "mail" },
        { id: "phone", label: "Phone", value: "+90 543 245 33 31", href: "tel:+905432453331", icon: "phone" },
        { id: "whatsapp", label: "WhatsApp", value: "+90 543 245 33 31", href: "https://wa.me/905432453331", icon: "whatsapp" },
        { id: "instagram", label: "Instagram", value: "@lachencompany", href: "https://www.instagram.com/lachencompany/", icon: "instagram" },
      ],
    },
    footer: {
      contact: "Contact",
      explore: "Explore",
      rights: "All rights reserved.",
      tagline: "AI-Powered NFC Technologies",
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
