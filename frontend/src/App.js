import { Component, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import { LanguageProvider } from "@/context/LanguageContext";
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
import AdminLogin from "@/admin/AdminLogin";
import AdminPanel from "@/admin/AdminPanel";

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

function Site() {
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
    <LanguageProvider>
      <div className="grain min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Industries />
          <Technology />
          <Packages />
          <References />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Site />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
