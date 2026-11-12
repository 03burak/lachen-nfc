import { Toggle, LogoUploadBtn } from "@/admin/ReferencesEditor";
import { LangInput, SingleInput } from "@/admin/fields";

export const AdsEditor = ({ ads, onChange }) => {
  const set = (items) => onChange(items);
  const setItem = (i, patch) => set(ads.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= ads.length) return;
    const next = [...ads];
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
  };

  return (
    <div data-testid="ads-editor" className="flex flex-col gap-4">
      {ads.length === 0 && <p className="text-sm text-zinc-500">Henüz reklam yok. Aşağıdan ilk reklamı ekleyin.</p>}
      {ads.map((ad, i) => (
        <div key={ad.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4" data-testid={`ad-editor-${i}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white">Reklam #{i + 1}</p>
            <div className="flex items-center gap-2">
              <button type="button" data-testid={`ad-up-${i}`} onClick={() => move(i, -1)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5">↑</button>
              <button type="button" data-testid={`ad-down-${i}`} onClick={() => move(i, 1)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5">↓</button>
              <Toggle on={!!ad.active} testId={`ad-active-${i}`} onChange={(v) => setItem(i, { active: v })} />
              <button type="button" data-testid={`ad-remove-${i}`} onClick={() => set(ads.filter((_, idx) => idx !== i))} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-red-300/80 hover:border-red-400/40">Sil</button>
            </div>
          </div>
          <LangInput label="Başlık" value={ad.title} testId={`ad-title-${i}`} onChange={(v) => setItem(i, { title: v })} />
          <LangInput label="Açıklama" value={ad.desc} testId={`ad-desc-${i}`} onChange={(v) => setItem(i, { desc: v })} />
          <div className="flex flex-wrap items-center gap-4">
            <LogoUploadBtn testId={`ad-upload-${i}`} onUploaded={(url) => setItem(i, { image: url })} />
            {ad.image && <span className="text-xs text-zinc-500">Görsel yüklü</span>}
          </div>
          <SingleInput label="Bağlantı (tıklanınca açılır)" value={ad.href} testId={`ad-href-${i}`} placeholder="https://…" onChange={(v) => setItem(i, { href: v })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Başlangıç Tarihi</p>
              <input data-testid={`ad-start-${i}`} type="date" value={ad.startDate || ""} onChange={(e) => setItem(i, { startDate: e.target.value })} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-white/40" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Bitiş Tarihi</p>
              <input data-testid={`ad-end-${i}`} type="date" value={ad.endDate || ""} onChange={(e) => setItem(i, { endDate: e.target.value })} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-white/40" />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        data-testid="ad-add-btn"
        onClick={() => set([...ads, { id: `ad-${Date.now()}`, title: { tr: "", en: "" }, desc: { tr: "", en: "" }, image: "", href: "", pages: ["home"], active: true, startDate: "", endDate: "" }])}
        className="w-fit rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5"
      >
        + Yeni Reklam Ekle
      </button>
    </div>
  );
};

export const MenuEditor = ({ menu, onChange }) => {
  const set = (items) => onChange(items);
  const setItem = (i, patch) => set(menu.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= menu.length) return;
    const next = [...menu];
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
  };

  return (
    <div data-testid="menu-editor" className="flex flex-col gap-3">
      {menu.map((m, i) => (
        <div key={m.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3" data-testid={`menu-item-${i}`}>
          <input data-testid={`menu-label-tr-${i}`} type="text" value={m.label?.tr || ""} placeholder="Menü adı (TR)" onChange={(e) => setItem(i, { label: { ...m.label, tr: e.target.value } })} className="min-w-32 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-white/40" />
          <input data-testid={`menu-label-en-${i}`} type="text" value={m.label?.en || ""} placeholder="Menü adı (EN)" onChange={(e) => setItem(i, { label: { ...m.label, en: e.target.value } })} className="min-w-32 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-white/40" />
          <input data-testid={`menu-target-${i}`} type="text" value={m.target || ""} placeholder="#bolum veya https://…" onChange={(e) => setItem(i, { target: e.target.value, type: e.target.value.startsWith("http") || e.target.value.startsWith("/sayfa/") ? "link" : "scroll" })} className="min-w-40 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-white outline-none focus:border-white/40" />
          <button type="button" data-testid={`menu-up-${i}`} onClick={() => move(i, -1)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5">↑</button>
          <button type="button" data-testid={`menu-down-${i}`} onClick={() => move(i, 1)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5">↓</button>
          <Toggle on={m.active !== false} testId={`menu-active-${i}`} onChange={(v) => setItem(i, { active: v })} />
          <button type="button" data-testid={`menu-remove-${i}`} onClick={() => set(menu.filter((_, idx) => idx !== i))} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-red-300/80 hover:border-red-400/40">Sil</button>
        </div>
      ))}
      <button
        type="button"
        data-testid="menu-add-btn"
        onClick={() => set([...menu, { id: `m-${Date.now()}`, label: { tr: "Yeni Bağlantı", en: "New Link" }, target: "#iletisim", active: true, type: "scroll" }])}
        className="w-fit rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5"
      >
        + Menü Bağlantısı Ekle
      </button>
    </div>
  );
};

export const PagesManager = ({ pages, onChange }) => {
  const set = (items) => onChange(items);
  const setItem = (i, patch) => set(pages.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));

  return (
    <div data-testid="pages-manager" className="flex flex-col gap-4">
      {pages.length === 0 && <p className="text-sm text-zinc-500">Henüz özel sayfa yok. Aşağıdan ilk sayfayı oluşturun.</p>}
      {pages.map((p, i) => (
        <div key={p.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4" data-testid={`page-editor-${i}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white">/sayfa/{p.slug}</p>
            <div className="flex items-center gap-2">
              <Toggle on={p.active !== false} testId={`page-active-${i}`} onChange={(v) => setItem(i, { active: v })} />
              <button type="button" data-testid={`page-remove-${i}`} onClick={() => set(pages.filter((_, idx) => idx !== i))} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-red-300/80 hover:border-red-400/40">Sil</button>
            </div>
          </div>
          <LangInput label="Sayfa Başlığı" value={p.title} testId={`page-title-${i}`} onChange={(v) => setItem(i, { title: v })} />
          <SingleInput label="URL (slug)" value={p.slug} testId={`page-slug-${i}`} placeholder="ornek-sayfa" onChange={(v) => setItem(i, { slug: v.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} />
        </div>
      ))}
      <button
        type="button"
        data-testid="page-add-btn"
        onClick={() => set([...pages, { id: `page-${Date.now()}`, title: { tr: "Yeni Sayfa", en: "New Page" }, slug: `sayfa-${pages.length + 1}`, active: true, sections: [], seoTitle: null, seoDesc: null }])}
        className="w-fit rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5"
      >
        + Yeni Sayfa Oluştur
      </button>
      <p className="text-xs text-zinc-600">Not: Yeni sayfalar /sayfa/slug adresinde yayınlanır. Sayfa içerik bölümleri "Bölümler" sekmesindeki şablonlarla ana sayfaya eklenebilir.</p>
    </div>
  );
};

export default AdsEditor;
