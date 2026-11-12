import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToId } from "@/lib/lenis";
import Logo from "@/components/Logo";

const go = (id) => scrollToId(id);

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLangToggle = (l) => {
    setLang(l);
    setOpen(false);
  };

  const defaultLinks = [
    { id: "#hakkimizda", label: t.nav.about, testId: "nav-link-about" },
    { id: "#hizmetler", label: t.nav.services, testId: "nav-link-services" },
    { id: "#teknoloji", label: t.nav.technology, testId: "nav-link-technology" },
    { id: "#paketler", label: t.nav.packages, testId: "nav-link-packages" },
    { id: "#iletisim", label: t.nav.contact, testId: "nav-link-contact" },
  ];
  const links = (t.menu && t.menu.length
    ? t.menu.filter((m) => m.active !== false).map((m) => ({
        id: m.target,
        label: m.label,
        testId: `nav-link-${m.id.replace(/[^a-z0-9]/gi, "-")}`,
        href: m.type === "link" ? m.target : undefined,
      }))
    : defaultLinks
  );

  const handleNav = (id) => {
    setOpen(false);
    go(id);
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#050505]/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
        <button data-testid="navbar-logo" onClick={() => handleNav("#top")} className="flex items-center" aria-label="Lachen & Co.">
          <Logo className="h-8 w-auto md:h-9" testId="navbar-logo-img" />
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) =>
            l.href ? (
              <a
                key={l.id}
                data-testid={l.testId}
                href={l.href}
                className="group relative text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <button
                key={l.id}
                data-testid={l.testId}
                onClick={() => handleNav(l.id)}
                className="group relative text-sm font-medium text-zinc-300 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div data-testid="language-toggle" className="flex items-center rounded-full border border-white/15 p-0.5">
            {["tr", "en"].map((l) => (
              <button
                key={l}
                data-testid={`language-toggle-${l}`}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  lang === l ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            data-testid="nav-cta"
            onClick={() => handleNav("#iletisim")}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            {t.nav.cta}
          </button>
        </div>

        <button
          data-testid="mobile-menu-button"
          className="rounded-full border border-white/15 p-2 text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) =>
                l.href ? (
                  <a
                    key={l.id}
                    data-testid={`${l.testId}-mobile`}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-zinc-200 hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                ) : (
                  <button
                    key={l.id}
                    data-testid={`${l.testId}-mobile`}
                    onClick={() => handleNav(l.id)}
                    className="rounded-lg px-3 py-3 text-left text-base font-medium text-zinc-200 hover:bg-white/5"
                  >
                    {l.label}
                  </button>
                )
              )}
              <div className="mt-2 flex items-center justify-between px-3 pb-2">
                <div className="flex items-center rounded-full border border-white/15 p-0.5">
                  {["tr", "en"].map((l) => (
                    <button
                      key={l}
                      data-testid={`language-toggle-${l}-mobile`}
                      onClick={() => handleLangToggle(l)}
                      className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
                        lang === l ? "bg-white text-black" : "text-zinc-400"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <button
                  data-testid="nav-cta-mobile"
                  onClick={() => handleNav("#iletisim")}
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black"
                >
                  {t.nav.cta}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
