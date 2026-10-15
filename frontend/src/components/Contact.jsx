import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

export const Contact = () => {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const fields = [
    { id: "first-name", name: "firstName", label: t.contact.firstName, type: "text", autoComplete: "given-name" },
    { id: "last-name", name: "lastName", label: t.contact.lastName, type: "text", autoComplete: "family-name" },
    { id: "phone", name: "phone", label: t.contact.phone, type: "tel", autoComplete: "tel" },
    { id: "email", name: "email", label: t.contact.email, type: "email", autoComplete: "email" },
  ];

  return (
    <section id="iletisim" data-testid="contact" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{t.contact.eyebrow}</p>
          <h2 data-testid="contact-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t.contact.title}
          </h2>
          <p data-testid="contact-desc" className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t.contact.desc}
          </p>
          <a
            data-testid="contact-email-link"
            href="mailto:info@lachen.co"
            className="group mt-10 inline-flex items-center gap-3 text-base font-medium text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
              <Mail size={17} />
            </span>
            info@lachen.co
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <motion.div
              data-testid="contact-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#0a0a0c] p-10 text-center"
            >
              <CheckCircle2 size={48} strokeWidth={1.4} className="mb-6 text-white" />
              <h3 className="font-display text-2xl font-bold text-white">{t.contact.successTitle}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">{t.contact.successDesc}</p>
              <button
                data-testid="contact-success-reset"
                onClick={() => setSent(false)}
                className="mt-8 rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                {t.contact.successReset}
              </button>
            </motion.div>
          ) : (
            <form
              data-testid="contact-form"
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-[#0a0a0c] p-7 sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id} className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      data-testid={`contact-input-${f.name}`}
                      type={f.type}
                      required
                      autoComplete={f.autoComplete}
                      placeholder={t.contact.placeholders[f.name]}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/40"
                    />
                  </div>
                ))}
              </div>

              <button
                data-testid="contact-submit-btn"
                type="submit"
                className="mt-7 w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99]"
              >
                {t.contact.submit}
              </button>
              <p data-testid="contact-note" className="mt-4 text-center font-mono text-[10px] leading-relaxed text-zinc-600">
                {t.contact.note}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
