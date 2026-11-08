import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

const ICONS = { mail: Mail, phone: Phone, whatsapp: MessageCircle, instagram: Instagram };

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          email: form.email,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
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

          <div data-testid="contact-links" className="mt-10 flex max-w-md flex-col">
            {t.contact.links.map((l) => {
              const Icon = ICONS[l.icon] || Mail;
              const external = l.href.startsWith("http");
              return (
                <a
                  key={l.id}
                  data-testid={`contact-${l.id}-link`}
                  href={l.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between border-t border-white/10 py-4 last:border-b"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{l.label}</p>
                      <p className="text-sm font-medium text-white">{l.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {status === "sent" ? (
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
                onClick={() => {
                  setStatus("idle");
                  setForm({ firstName: "", lastName: "", phone: "", email: "", message: "" });
                }}
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
                      value={form[f.name]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.name]: e.target.value }))}
                      placeholder={t.contact.placeholders[f.name]}
                      className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/40"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {t.contact.message} · {t.contact.messageOptional}
                </label>
                <textarea
                  id="message"
                  data-testid="contact-input-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder={t.contact.placeholders.message}
                  className="resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/40"
                />
              </div>

              <button
                data-testid="contact-submit-btn"
                type="submit"
                disabled={status === "sending"}
                className="mt-7 w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? t.contact.sending : t.contact.submit}
              </button>
              {status === "error" && (
                <p data-testid="contact-form-error" className="mt-4 text-center text-xs leading-relaxed text-red-300">
                  {t.contact.error}
                </p>
              )}
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
