import { Instagram, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToId } from "@/lib/lenis";
import Logo from "@/components/Logo";

export const Footer = () => {
  const { t } = useLanguage();
  const links = [
    { id: "#hakkimizda", label: t.nav.about, testId: "footer-link-about" },
    { id: "#hizmetler", label: t.nav.services, testId: "footer-link-services" },
    { id: "#teknoloji", label: t.nav.technology, testId: "footer-link-technology" },
    { id: "#paketler", label: t.nav.packages, testId: "footer-link-packages" },
    { id: "#iletisim", label: t.nav.contact, testId: "footer-link-contact" },
  ];

  return (
    <footer data-testid="footer" className="border-t border-white/10 bg-[#030303]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Logo className="h-10 w-auto sm:h-12" testId="footer-logo" />
            <div className="mt-10">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">{t.footer.explore}</p>
              <nav className="flex flex-col gap-3">
                {links.map((l) => (
                  <button
                    key={l.id}
                    data-testid={l.testId}
                    onClick={() => scrollToId(l.id)}
                    className="w-fit text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:items-end md:text-right">
            <p className="mb-0 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">{t.footer.contact}</p>
            <a
              data-testid="footer-email-link"
              href={`mailto:${t.footer.email}`}
              className="group inline-flex items-center gap-3 text-sm font-medium text-white md:flex-row-reverse"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                <Mail size={15} />
              </span>
              {t.footer.email}
            </a>
            <a
              data-testid="footer-instagram-link"
              href={t.footer.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-medium text-white md:flex-row-reverse"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                <Instagram size={15} />
              </span>
              {t.footer.instagram}
            </a>
            {t.footer.linkedinHref && (
              <a
                data-testid="footer-linkedin-link"
                href={t.footer.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm font-medium text-white md:flex-row-reverse"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <Linkedin size={15} />
                </span>
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p data-testid="footer-copyright" className="text-xs text-zinc-600">
            © 2026 Lachen & Co. {t.footer.rights}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
