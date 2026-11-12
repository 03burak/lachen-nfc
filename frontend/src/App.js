import { Component, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { setLenis } from "@/lib/lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Technology from "@/components/Technology";
import Packages from "@/components/Packages";
import References from "@/components/References";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DesignManager from "@/components/DesignManager";
import SeoManager from "@/components/SeoManager";
import CustomSection, { AdsSection } from "@/components/CustomSection";
import AdminLogin from "@/admin/AdminLogin";
import AdminPanel from "@/admin/AdminPanel";
import CustomPage from "@/pages/CustomPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#050505] font-mono text-sm text-white">
          Bir hata oluştu — sayfayı yenileyin.
        </div>
      );
    }
    return this.props.children;
  }
}

const BUILTIN = {
  hero: Hero,
  marquee: Marquee,
  about: About,
  services: Services,
  industries: Industries,
  technology: Technology,
  packages: Packages,
  references: References,
  contact: Contact,
};

function SiteContent() {
  const { content } = useLanguage();
  const sections = (content?.sections || []).filter((s) => s.active !== false);
  return (
    <main>
      {sections.map((s) => {
        if (s.type === "builtin") {
          if (s.id === "ads") return <AdsSection key="ads" ads={content?.ads || []} />;
          const C = BUILTIN[s.id];
          return C ? <C key={s.id} /> : null;
        }
        return <CustomSection key={s.id} section={s} />;
      })}
    </main>
  );
}

function Site() {
  const { content } = useLanguage();
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="grain min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <DesignManager design={content?.design} seo={content?.seo} />
      <SeoManager seo={content?.seo} lang={document.documentElement.lang || "tr"} />
      <Navbar />
      <SiteContent />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LanguageProvider><Site /></LanguageProvider>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/sayfa/:slug" element={<CustomPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
