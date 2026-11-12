import { Toggle } from "@/admin/ReferencesEditor";
import { LangInput } from "@/admin/fields";

export const SECTION_TEMPLATES = [
  { type: "heading", label: "Başlık & Açıklama", data: { heading: { tr: "Yeni Başlık", en: "New Heading" }, subheading: { tr: "Açıklama metni", en: "Description text" }, buttonText: { tr: "", en: "" }, buttonTarget: "#iletisim", buttonHref: "", bgColor: "" } },
  { type: "banner", label: "Tam Genişlik Banner", data: { heading: { tr: "Banner Başlığı", en: "Banner Heading" }, subheading: { tr: "", en: "" }, image: "", buttonText: { tr: "", en: "" }, buttonHref: "", bgColor: "" } },
  { type: "imageText", label: "Görsel + Metin", data: { heading: { tr: "Bölüm Başlığı", en: "Section Heading" }, subheading: { tr: "Metin", en: "Text" }, image: "", imageSide: "left", buttonText: { tr: "", en: "" }, buttonTarget: "#iletisim", buttonHref: "", bgColor: "" } },
  { type: "cards", label: "Kartlar (2-4)", data: { heading: { tr: "Kartlar", en: "Cards" }, items: [{ title: { tr: "Kart 1", en: "Card 1" }, desc: { tr: "Açıklama", en: "Description" } }, { title: { tr: "Kart 2", en: "Card 2" }, desc: { tr: "Açıklama", en: "Description" } }, { title: { tr: "Kart 3", en: "Card 3" }, desc: { tr: "Açıklama", en: "Description" } }], bgColor: "" } },
  { type: "stats", label: "İstatistikler", data: { items: [{ value: "100+", label: { tr: "İstatistik 1", en: "Stat 1" } }, { value: "24/7", label: { tr: "İstatistik 2", en: "Stat 2" } }, { value: "%99", label: { tr: "İstatistik 3", en: "Stat 3" } }], bgColor: "" } },
  { type: "cta", label: "Çağrı (CTA)", data: { heading: { tr: "Harekete Geçin", en: "Take Action" }, subheading: { tr: "", en: "" }, buttonText: { tr: "Bize Ulaşın", en: "Contact Us" }, buttonTarget: "#iletisim", buttonHref: "", bgColor: "" } },
];

const BUILTIN_NAMES = {
  hero: "Ana Giriş (Hero)", marquee: "Kayan Şerit", about: "Hakkımızda", services: "Hizmetler",
  industries: "İşletmeler", technology: "Teknoloji", packages: "Paketler", references: "Referanslar",
  ads: "Reklamlar", contact: "İletişim Formu",
};

export const SectionsManager = ({ sections, onChange }) => {
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const addFrom = (tpl) => {
    onChange([
      ...sections,
      { id: `custom-${Date.now()}`, type: tpl.type, active: true, data: JSON.parse(JSON.stringify(tpl.data)) },
    ]);
  };

  return (
    <div data-testid="sections-manager" className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-sm font-semibold text-white">Mevcut Bölümler (sırala / aç-kapat / sil)</p>
        <div className="flex flex-col gap-2">
          {sections.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
              <span className="min-w-0 flex-1 truncate text-sm text-zinc-200">
                {s.type === "builtin" ? BUILTIN_NAMES[s.id] || s.id : `${(SECTION_TEMPLATES.find((t) => t.type === s.type) || {}).label || s.type} — ${s.data?.heading?.tr || s.id}`}
              </span>
              <button type="button" data-testid={`section-up-${i}`} onClick={() => move(i, -1)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5">↑</button>
              <button type="button" data-testid={`section-down-${i}`} onClick={() => move(i, 1)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5">↓</button>
              <Toggle on={s.active !== false} testId={`section-active-${i}`} onChange={(v) => onChange(sections.map((x, idx) => (idx === i ? { ...x, active: v } : x)))} />
              {s.type !== "builtin" && (
                <button type="button" data-testid={`section-remove-${i}`} onClick={() => onChange(sections.filter((_, idx) => idx !== i))} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-red-300/80 hover:border-red-400/40">Sil</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-white">Yeni Bölüm Ekle (şablon seç)</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SECTION_TEMPLATES.map((tpl) => (
            <button
              key={tpl.type}
              type="button"
              data-testid={`add-section-${tpl.type}`}
              onClick={() => addFrom(tpl)}
              className="rounded-xl border border-white/15 px-4 py-3 text-left text-sm text-zinc-200 transition-colors hover:border-white/40 hover:bg-white/5"
            >
              + {tpl.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-600">Eklenen bölümü düzenlemek için "Sayfalar & Özel Bölümler" sekmesini kullanın.</p>
      </div>
    </div>
  );
};

export const CustomSectionEditor = ({ section, onChange }) => {
  const d = section.data || {};
  const set = (patch) => onChange({ ...section, data: { ...d, ...patch } });
  const setItem = (i, patch) => set({ items: (d.items || []).map((x, idx) => (idx === i ? { ...x, ...patch } : x)) });

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-white/10 p-4" data-testid={`custom-editor-${section.id}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {(SECTION_TEMPLATES.find((t) => t.type === section.type) || {}).label} — {section.id}
      </p>
      {d.heading !== undefined && <LangInput label="Başlık" value={d.heading} testId={`cs-heading-${section.id}`} onChange={(v) => set({ heading: v })} />}
      {d.subheading !== undefined && <LangInput label="Alt Açıklama" value={d.subheading} textarea testId={`cs-sub-${section.id}`} onChange={(v) => set({ subheading: v })} />}
      {d.buttonText !== undefined && <LangInput label="Buton Metni (boş = buton yok)" value={d.buttonText} testId={`cs-btn-${section.id}`} onChange={(v) => set({ buttonText: v })} />}
      {d.buttonHref !== undefined && (
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Buton Bağlantısı (boş = iletişime kaydırır)</p>
          <input data-testid={`cs-href-${section.id}`} type="text" value={d.buttonHref || ""} onChange={(e) => set({ buttonHref: e.target.value })} placeholder="https://…" className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-white/40" />
        </div>
      )}
      {(d.items || []).map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 p-3">
          {item.title !== undefined && <LangInput label={`Kart ${i + 1} Başlık`} value={item.title} testId={`cs-item-title-${section.id}-${i}`} onChange={(v) => setItem(i, { title: v })} />}
          {item.desc !== undefined && <div className="mt-3"><LangInput label={`Kart ${i + 1} Açıklama`} value={item.desc} testId={`cs-item-desc-${section.id}-${i}`} onChange={(v) => setItem(i, { desc: v })} /></div>}
          {item.value !== undefined && (
            <div className="mt-2 flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Değer</p>
              <input data-testid={`cs-item-value-${section.id}-${i}`} type="text" value={item.value} onChange={(e) => setItem(i, { value: e.target.value })} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-white/40" />
            </div>
          )}
          {item.label !== undefined && <div className="mt-3"><LangInput label="Etiket" value={item.label} testId={`cs-item-label-${section.id}-${i}`} onChange={(v) => setItem(i, { label: v })} /></div>}
        </div>
      ))}
    </div>
  );
};

export default SectionsManager;
