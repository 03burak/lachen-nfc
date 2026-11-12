import { useLanguage } from "@/context/LanguageContext";
import { scrollToId } from "@/lib/lenis";
import Reveal from "@/components/Reveal";

const API = process.env.REACT_APP_BACKEND_URL;
const imgSrc = (src) => (src && src.startsWith("/api/files/") ? `${API}${src}` : src);

export const CustomSection = ({ section }) => {
  const { lang } = useLanguage();
  const l = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.tr ?? "" : obj ?? "");
  const d = section.data || {};
  const bg = d.bgColor || "transparent";
  const base = "relative py-20 sm:py-24";
  const wrap = "mx-auto max-w-7xl px-5 sm:px-8";

  const Button = d.buttonText && (d.buttonHref || d.buttonTarget) ? (
    <a
      data-testid={`custom-btn-${section.id}`}
      href={d.buttonHref || undefined}
      onClick={d.buttonHref ? undefined : (e) => { e.preventDefault(); scrollToId(d.buttonTarget || "#iletisim"); }}
      target={d.buttonHref ? "_blank" : undefined}
      rel={d.buttonHref ? "noopener noreferrer" : undefined}
      className="dm-btn mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
    >
      {l(d.buttonText)}
    </a>
  ) : null;

  if (section.type === "heading") {
    return (
      <section id={section.id} data-testid={`custom-${section.id}`} className={base} style={{ backgroundColor: bg }}>
        <div className={`${wrap} text-center`}>
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{l(d.heading)}</h2>
            {l(d.subheading) && <p className="mt-5 mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{l(d.subheading)}</p>}
            {Button}
          </Reveal>
        </div>
      </section>
    );
  }

  if (section.type === "banner") {
    return (
      <section id={section.id} data-testid={`custom-${section.id}`} className={base} style={{ backgroundColor: bg }}>
        <div className={wrap}>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              {d.image && <img src={imgSrc(d.image)} alt={l(d.heading)} className="h-64 w-full object-cover sm:h-96" loading="lazy" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <h2 className="font-display text-2xl font-bold sm:text-4xl">{l(d.heading)}</h2>
                {l(d.subheading) && <p className="mt-3 max-w-xl text-sm text-zinc-300 sm:text-base">{l(d.subheading)}</p>}
                {Button}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  if (section.type === "imageText") {
    return (
      <section id={section.id} data-testid={`custom-${section.id}`} className={base} style={{ backgroundColor: bg }}>
        <div className={`${wrap} grid items-center gap-10 lg:grid-cols-2`}>
          <Reveal className={d.imageSide === "left" ? "lg:order-1" : "lg:order-2"}>
            {d.image && <img src={imgSrc(d.image)} alt={l(d.heading)} className="w-full rounded-3xl border border-white/10 object-cover" loading="lazy" />}
          </Reveal>
          <Reveal className={d.imageSide === "left" ? "lg:order-2" : "lg:order-1"}>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{l(d.heading)}</h2>
            {l(d.subheading) && <p className="mt-5 text-sm leading-relaxed text-zinc-400 sm:text-base">{l(d.subheading)}</p>}
            {Button}
          </Reveal>
        </div>
      </section>
    );
  }

  if (section.type === "cards") {
    const items = d.items || [];
    return (
      <section id={section.id} data-testid={`custom-${section.id}`} className={base} style={{ backgroundColor: bg }}>
        <div className={wrap}>
          <Reveal>
            {l(d.heading) && <h2 className="mb-10 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">{l(d.heading)}</h2>}
            <div className={`grid gap-6 ${items.length >= 4 ? "md:grid-cols-4" : items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {items.map((item, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-[#0a0a0c] p-7">
                  <p className="font-display text-lg font-semibold">{l(item.title)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{l(item.desc)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  if (section.type === "stats") {
    const items = d.items || [];
    return (
      <section id={section.id} data-testid={`custom-${section.id}`} className={base} style={{ backgroundColor: bg }}>
        <div className={wrap}>
          <Reveal>
            <div className="grid gap-8 text-center sm:grid-cols-3">
              {items.map((item, i) => (
                <div key={i}>
                  <p className="font-display text-4xl font-bold sm:text-5xl">{item.value}</p>
                  <p className="mt-2 text-sm text-zinc-400">{l(item.label)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  if (section.type === "cta") {
    return (
      <section id={section.id} data-testid={`custom-${section.id}`} className={base} style={{ backgroundColor: bg }}>
        <div className={`${wrap} text-center`}>
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-[#0a0a0c] px-8 py-14">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{l(d.heading)}</h2>
              {l(d.subheading) && <p className="mt-4 mx-auto max-w-xl text-sm text-zinc-400 sm:text-base">{l(d.subheading)}</p>}
              {Button}
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return null;
};

export const AdsSection = ({ ads }) => {
  const { lang } = useLanguage();
  const l = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.tr ?? "" : obj ?? "");
  const today = new Date().toISOString().slice(0, 10);
  const active = (ads || []).filter(
    (a) => a.active && (a.pages?.includes("home") ?? true) && (!a.startDate || a.startDate <= today) && (!a.endDate || a.endDate >= today)
  );
  if (active.length === 0) return null;

  return (
    <section id="reklamlar" data-testid="ads-section" className="relative py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {active.map((ad) => {
            const card = (
              <div key={ad.id} data-testid={`ad-card-${ad.id}`} className="group relative overflow-hidden rounded-3xl border border-white/10">
                {ad.image && <img src={imgSrc(ad.image)} alt={l(ad.title)} className="h-52 w-full object-cover sm:h-64" loading="lazy" />}
                <div className="p-6">
                  {l(ad.title) && <p className="font-display text-lg font-semibold">{l(ad.title)}</p>}
                  {l(ad.desc) && <p className="mt-2 text-sm text-zinc-400">{l(ad.desc)}</p>}
                </div>
              </div>
            );
            return ad.href ? (
              <a key={ad.id} data-testid={`ad-link-${ad.id}`} href={ad.href} target="_blank" rel="noopener noreferrer" className="block transition-transform duration-300 hover:scale-[1.01]">
                {card}
              </a>
            ) : (
              <div key={ad.id}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomSection;
