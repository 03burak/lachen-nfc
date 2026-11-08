export const DEFAULT_CONTENT = {
  hero: {
    eyebrow: { tr: "Yapay Zeka NFC Teknolojileri", en: "AI-Powered NFC Technologies" },
    lines: {
      tr: ["Restoranların", "Geleceğini", "Birlikte Tasarlıyoruz."],
      en: ["Architecting the", "Future of", "Restaurants."],
    },
    sub: {
      tr: "NFC ve yapay zekâ destekli temassız menü, akıllı sipariş, hesabı bölüşme ve anlık analiz çözümleriyle misafir deneyimini yeniden tanımlıyoruz.",
      en: "We redefine the guest experience with NFC & AI-powered contactless menus, smart ordering, bill splitting, and real-time analytics.",
    },
    ctaPrimary: { tr: "Hizmetlerimizi Keşfedin", en: "Discover Our Services" },
    ctaSecondary: { tr: "Bize Ulaşın", en: "Contact Us" },
    scroll: { tr: "Keşfet", en: "Scroll" },
  },
  marquee: {
    tr: ["NFC Menü", "Temassız Sipariş", "Bölünmüş Ödeme", "Google Yorumları", "Analiz Paneli", "Yapay Zekâ Asistanı"],
    en: ["NFC Menu", "Contactless Ordering", "Split Payment", "Google Reviews", "Analytics Panel", "AI Assistant"],
  },
  about: {
    eyebrow: { tr: "Hakkımızda", en: "About Us" },
    title: { tr: "Restoran dijitalleşmesinde teknoloji ortağınız", en: "Your technology partner in restaurant digitalization" },
    p1: {
      tr: "Lachen & Co., restoran ve kafe işletmeleri için temassız teknoloji çözümleri geliştiren kurumsal bir teknoloji şirketidir. NFC ve QR tabanlı menü, sipariş ve ödeme sistemlerimizle misafir deneyimini hızlandırmayı, operasyonel verimliliği artırmayı ve işletmelere veriye dayalı karar alma olanağı sunmayı amaçlıyoruz.",
      en: "Lachen & Co. is a corporate technology company developing contactless technology solutions for restaurants and cafés. With our NFC and QR-based menu, ordering, and payment systems, we aim to speed up the guest experience, increase operational efficiency, and give businesses the ability to make data-driven decisions.",
    },
    p2: {
      tr: "Masadaki ilk dokunuştan hesabın bölüşülmesine kadar tüm akışı tek bir ekosistemde topluyoruz. Analiz panellerimiz satış, sipariş ve kullanım verilerini anlık olarak görünür kılarken; yapay zekâ asistanımız misafirlerinize yemek önerileri sunar ve sorularını yanıtlar.",
      en: "We bring the entire flow — from the first tap at the table to splitting the bill — into a single ecosystem. While our analytics dashboards make sales, order, and usage data visible in real time, our AI assistant offers your guests dish recommendations and answers their questions.",
    },
    pillars: [
      { title: { tr: "Temassız Teknoloji", en: "Contactless Technology" }, desc: { tr: "NFC ve QR çözümleriyle uygulama indirmeden saniyeler içinde menüye erişim.", en: "Access the menu in seconds with NFC and QR solutions — no app download required." } },
      { title: { tr: "Sipariş & Ödeme", en: "Ordering & Payment" }, desc: { tr: "Masa başında sipariş, bölünmüş ödeme ve hızlı hesap kapatma akışı.", en: "Table-side ordering, split payment, and a fast bill-closing flow." } },
      { title: { tr: "Misafir Deneyimi", en: "Guest Experience" }, desc: { tr: "Google yorumlarına yönlendirme ve yapay zekâ destekli kişiselleştirilmiş servis.", en: "Google review redirection and AI-assisted personalized service." } },
    ],
    slider: [
      { src: "/images/slider-1.png", alt: "Lachen & Co. pleksi NFC masa standı — şık kafe sahnesi" },
      { src: "/images/slider-2.png", alt: "Lachen & Co. pleksi NFC masa standı — restoran masası" },
      { src: "/images/slider-3.png", alt: "Lachen & Co. pleksi NFC masa standı — yakın plan" },
      { src: "/images/nfc-tech.png", alt: "Lachen & Co. NFC restoran teknolojisi" },
    ],
  },
  services: {
    eyebrow: { tr: "Hizmetlerimiz", en: "Our Services" },
    title: { tr: "Restoranınız için uçtan uca dijital ekosistem", en: "An end-to-end digital ecosystem for your restaurant" },
    desc: {
      tr: "Masadan mutfağa, menüden analizlere kadar tüm operasyonunuzu tek platformda birleştiriyoruz.",
      en: "From table to kitchen, from menu to analytics — we bring your entire operation into one platform.",
    },
    items: [
      { id: "nfc-menu", tag: "01", label: { tr: "NFC + Web App", en: "NFC + Web App" }, title: { tr: "NFC Menü, Sipariş & Ödeme", en: "NFC Menu, Order & Payment" }, desc: { tr: "Her misafir telefonundan menüyü açar, kendi siparişini verir ve siparişinin ücretini ayrı ayrı ödeyebilir.", en: "Every guest opens the menu on their phone, places their own order, and pays for their own items separately." }, icon: "nfc" },
      { id: "nfc-review", tag: "02", label: { tr: "Büyüme", en: "Growth" }, title: { tr: "NFC Google Yorum Sistemi", en: "NFC Google Review System" }, desc: { tr: "Tek dokunuşla misafirleri Google yorumlarına yönlendirin; tüm okutma istatistiklerini panelinizden izleyin.", en: "One tap directs guests to your Google reviews, with every scan tracked in your stats panel." }, icon: "star" },
      { id: "analytics", tag: "03", label: { tr: "Zekâ", en: "Intelligence" }, title: { tr: "Analiz Paneli", en: "Analytics Dashboard" }, desc: { tr: "Ürün satışlarını, siparişleri ve NFC kullanımını gösteren tek ve anlık analiz paneli.", en: "One live panel showing product sales, orders, and NFC usage." }, icon: "chart" },
      { id: "ai-assistant", tag: "04", label: { tr: "AI", en: "AI" }, title: { tr: "Yapay Zekâ Asistanı", en: "AI Food Assistant" }, desc: { tr: "Yemek önerileri sunan ve misafirlerin yemekler hakkında soru sorabildiği yapay zekâ asistanı.", en: "An AI assistant that recommends dishes and answers guests' questions about the food." }, icon: "ai" },
    ],
  },
  industries: {
    eyebrow: { tr: "Hizmet Verdiğimiz İşletmeler", en: "Businesses We Serve" },
    title: { tr: "Her işletme tipine uygun çözümler", en: "Solutions for every type of business" },
    desc: {
      tr: "Fine dining'den hızlı servise, her işletmenin ritmine göre tasarlanmış dijital altyapı.",
      en: "Digital infrastructure tailored to the rhythm of every venue, from fine dining to quick service.",
    },
    items: [
      { id: "restaurant", title: { tr: "Restoran & Lokantalar", en: "Restaurants & Diners" }, desc: { tr: "Dijital menü, QR/NFC üzerinden masadan sipariş, mutfak yönetimi, hesap bölüşme ve hızlı ödeme çözümleriyle restoran operasyonlarını kolaylaştırıyoruz.", en: "We simplify restaurant operations with digital menus, table-side ordering via QR/NFC, kitchen management, bill splitting, and fast payment solutions." }, icon: "utensils" },
      { id: "cafe", title: { tr: "Kafe & Bistro İşletmeleri", en: "Cafés & Bistros" }, desc: { tr: "Garson çağırma, masadan sipariş, dijital menü ve hızlı ödeme sistemleriyle servis süreçlerini daha verimli hale getiriyoruz.", en: "We make service processes more efficient with waiter calling, table-side ordering, digital menus, and fast payment systems." }, icon: "cafe" },
      { id: "coffee", title: { tr: "Kahve & Hızlı Servis Noktaları", en: "Coffee & Quick-Service Spots" }, desc: { tr: "Gel-al sipariş, hızlı ödeme, dijital menü ve müşteri sadakat sistemleriyle hızlı servis işletmelerine dijital çözümler sunuyoruz.", en: "We offer digital solutions for quick-service businesses with grab-and-go ordering, fast payment, digital menus, and customer loyalty systems." }, icon: "coffee" },
    ],
  },
  tech: {
    eyebrow: { tr: "Teknoloji", en: "Technology" },
    title: { tr: "Ürünleri yakından inceleyin", en: "A closer look at our products" },
    desc: {
      tr: "NFC menü deneyiminden analiz paneline, ürünlerimizin nasıl göründüğünü ve nasıl çalıştığını keşfedin.",
      en: "From the NFC menu experience to the analytics panel, explore how our products look and work.",
    },
    disclaimer: {
      tr: "Bu arayüzler örnek verilerle hazırlanmış temsili tasarımlardır; gösterilen tüm değerler demo verisidir.",
      en: "These interfaces are representative designs prepared with sample data; all values shown are demo data.",
    },
    featureTitle: { tr: "Telefonda menüden ödemeye tek akış", en: "From menu to payment in a single flow" },
    features: {
      tr: [
        "Misafir masadaki NFC etiketini okutur, menü anında açılır.",
        "Masadan toplu sipariş, kolay hesap paylaşımı ve hızlı ödeme deneyimi.",
        "Ödeme sonrası tek dokunuşla Google yorumu ekranı gelir.",
      ],
      en: [
        "The guest taps the NFC tag on the table and the menu opens instantly.",
        "Group ordering from the table, easy bill sharing, and a fast payment experience.",
        "After payment, the Google review screen appears in one tap.",
      ],
    },
  },
  packages: {
    eyebrow: { tr: "Paketlerimiz", en: "Our Packages" },
    title: { tr: "İşletmenize uygun paketi seçin", en: "Choose the package that fits your business" },
    desc: {
      tr: "İşletmenizin ihtiyaçlarına uygun dijital çözümleri keşfedin. Size en uygun paketi seçerek restoranınızı geleceğe taşıyın.",
      en: "Discover digital solutions tailored to your business needs. Pick the package that suits you best and carry your restaurant into the future.",
    },
    includesTitle: { tr: "Paket İçeriği", en: "Package Contents" },
    cta: { tr: "Fiyat İçin Bize Ulaşın", en: "Contact Us for Pricing" },
    items: [
      {
        key: "bronz",
        tier: { tr: "Başlangıç", en: "Starter" },
        name: { tr: "Temel İşletme", en: "Basic Business" },
        desc: { tr: "QR / NFC Dijital Menü ve temel sipariş yönetimi.", en: "QR / NFC Digital Menu and essential order management." },
        features: {
          tr: ["Masadan Sipariş", "Garson Çağrı", "Sessiz Masa & Özel Not", "Mutfak Ekranı (KDS)", "Google Yorum"],
          en: ["Table Ordering", "Waiter Call", "Quiet Table & Special Notes", "Kitchen Display (KDS)", "Google Reviews"],
        },
        price: { tr: "", en: "" },
      },
      {
        key: "silver",
        tier: { tr: "En Çok Tercih Edilen", en: "Most Popular" },
        name: { tr: "Profesyonel İşletme", en: "Professional Business" },
        desc: { tr: "Daha hızlı servis ve gelişmiş ödeme deneyimi.", en: "Faster service and an advanced payment experience." },
        features: {
          tr: ["Masadan Sipariş", "Garson Çağrı", "Sessiz Masa & Özel Not", "Mutfak Ekranı (KDS)", "Google Yorum", "Akıllı Garson Çağrı", "Masada Ödeme", "Hesabı Bölüşme", "Dijital Bahşiş", "Çoklu Dil (TR / EN)", "Google Yorum Kalkanı"],
          en: ["Table Ordering", "Waiter Call", "Quiet Table & Special Notes", "Kitchen Display (KDS)", "Google Reviews", "Smart Waiter Call", "Pay at the Table", "Bill Splitting", "Digital Tipping", "Multi-Language (TR / EN)", "Google Review Shield"],
        },
        price: { tr: "", en: "" },
      },
      {
        key: "gold",
        tier: { tr: "Tam Donanım", en: "Fully Equipped" },
        name: { tr: "Premium İşletme", en: "Premium Business" },
        desc: { tr: "İşletmenin tüm dijital süreçlerini tek sistemde yönetin.", en: "Manage all your business's digital processes in one system." },
        features: {
          tr: ["Masadan Sipariş", "Garson Çağrı", "Sessiz Masa & Özel Not", "Mutfak Ekranı (KDS)", "Google Yorum", "Akıllı Garson Çağrı", "Masada Ödeme", "Hesabı Bölüşme", "Dijital Bahşiş", "Çoklu Dil (TR / EN)", "Google Yorum Kalkanı", "Kural Tabanlı AI", "Özel Tasarım (Arayüz Düzenleyici)", "Self-Service (Bip)"],
          en: ["Table Ordering", "Waiter Call", "Quiet Table & Special Notes", "Kitchen Display (KDS)", "Google Reviews", "Smart Waiter Call", "Pay at the Table", "Bill Splitting", "Digital Tipping", "Multi-Language (TR / EN)", "Google Review Shield", "Rule-Based AI", "Custom Design (UI Editor)", "Self-Service (Beep)"],
        },
        price: { tr: "", en: "" },
      },
    ],
  },
  contact: {
    eyebrow: { tr: "Bize Ulaşın", en: "Get in Touch" },
    title: { tr: "Birlikte tasarlayalım.", en: "Let's design it together." },
    desc: {
      tr: "Restoranınız için doğru çözümü birlikte seçelim. Formu doldurun, en kısa sürede size dönelim.",
      en: "Let's choose the right solution for your restaurant together. Fill in the form and we will get back to you shortly.",
    },
    note: {
      tr: "Mesajlarınız doğrudan e-posta kutumuza iletilir.",
      en: "Your messages are delivered directly to our inbox.",
    },
    successTitle: { tr: "Mesajınız alındı", en: "Your message has been received" },
    successDesc: { tr: "Teşekkürler! En kısa sürede size döneceğiz.", en: "Thank you! We will get back to you shortly." },
    links: [
      { id: "email", label: { tr: "E-posta", en: "Email" }, value: "lachen.co@outlook.com", href: "mailto:lachen.co@outlook.com", icon: "mail" },
      { id: "phone", label: { tr: "Telefon", en: "Phone" }, value: "+90 543 245 33 31", href: "tel:+905432453331", icon: "phone" },
      { id: "whatsapp", label: { tr: "WhatsApp", en: "WhatsApp" }, value: "+90 543 245 33 31", href: "https://wa.me/905432453331", icon: "whatsapp" },
      { id: "instagram", label: { tr: "Instagram", en: "Instagram" }, value: "@lachencompany", href: "https://www.instagram.com/lachencompany/", icon: "instagram" },
    ],
  },
  footer: {
    contact: { tr: "İletişim", en: "Contact" },
    explore: { tr: "Keşfet", en: "Explore" },
    rights: { tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
    tagline: { tr: "Yapay Zeka NFC Teknolojileri", en: "AI-Powered NFC Technologies" },
    email: "lachen.co@outlook.com",
    instagram: "@lachencompany",
    instagramHref: "https://www.instagram.com/lachencompany/",
  },
};
