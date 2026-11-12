import { useRef, useState } from "react";
import { uploadImage } from "@/admin/api";

const FONTS = ["Space Grotesk", "Plus Jakarta Sans", "Sora", "Outfit", "Inter", "Poppins", "Montserrat"];

const Select = ({ label, value, options, onChange, testId }) => (
  <div className="flex flex-col gap-2">
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    <select
      data-testid={testId}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-white/40 [&>option]:bg-[#121216]"
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  </div>
);

const ColorField = ({ label, value, onChange, testId }) => (
  <div className="flex flex-col gap-2">
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    <div className="flex items-center gap-3">
      <input
        data-testid={`${testId}-picker`}
        type="color"
        value={value || "#050505"}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-14 cursor-pointer rounded-lg border border-white/10 bg-transparent"
      />
      <input
        data-testid={testId}
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-28 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono text-xs text-white outline-none focus:border-white/40"
      />
    </div>
  </div>
);

const ImagePicker = ({ label, value, onChange, testId }) => {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch {
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value.startsWith("/api/files/") ? `${process.env.REACT_APP_BACKEND_URL}${value}` : value} alt="" className="h-10 w-auto rounded-lg border border-white/10 object-contain" />
        ) : (
          <span className="text-xs text-zinc-600">Varsayılan</span>
        )}
        <input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden" data-testid={`${testId}-input`} />
        <button type="button" data-testid={testId} disabled={busy} onClick={() => ref.current?.click()} className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/5 disabled:opacity-50">
          {busy ? "Yükleniyor…" : "Değiştir"}
        </button>
        {value && value.startsWith("/api/") && (
          <button type="button" data-testid={`${testId}-clear`} onClick={() => onChange("")} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-400 hover:text-white">
            Varsayılana Dön
          </button>
        )}
      </div>
    </div>
  );
};

export const DesignSettings = ({ value, onChange }) => {
  const d = value || {};
  const f = d.fonts || {};
  const c = d.colors || {};
  const img = d.images || {};
  const set = (patch) => onChange({ ...d, ...patch });
  const setF = (patch) => set({ fonts: { ...f, ...patch } });
  const setC = (patch) => set({ colors: { ...c, ...patch } });
  const setI = (patch) => set({ images: { ...img, ...patch } });

  return (
    <div data-testid="design-settings" className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-sm font-semibold text-white">Yazı Ayarları</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Select label="Başlık Fontu" value={f.heading || "Space Grotesk"} options={FONTS} testId="font-heading" onChange={(v) => setF({ heading: v })} />
          <Select label="Metin Fontu" value={f.body || "Plus Jakarta Sans"} options={FONTS} testId="font-body" onChange={(v) => setF({ body: v })} />
          <Select label="Başlık Kalınlığı" value={f.headingWeight || "700"} options={[{ value: "500", label: "Orta (500)" }, { value: "600", label: "Yarı Kalın (600)" }, { value: "700", label: "Kalın (700)" }, { value: "800", label: "Ekstra Kalın (800)" }]} testId="font-weight" onChange={(v) => setF({ headingWeight: v })} />
          <Select label="Başlık Boyutu" value={f.headingSize || "default"} options={[{ value: "compact", label: "Kompakt" }, { value: "default", label: "Varsayılan" }, { value: "large", label: "Büyük" }]} testId="font-size" onChange={(v) => setF({ headingSize: v })} />
          <Select label="Satır Aralığı" value={f.lineHeight || "normal"} options={[{ value: "tight", label: "Dar" }, { value: "normal", label: "Normal" }, { value: "relaxed", label: "Geniş" }]} testId="font-lh" onChange={(v) => setF({ lineHeight: v })} />
          <Select label="Harf Aralığı" value={f.letterSpacing || "normal"} options={[{ value: "tight", label: "Dar" }, { value: "normal", label: "Normal" }, { value: "wide", label: "Geniş" }]} testId="font-ls" onChange={(v) => setF({ letterSpacing: v })} />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold text-white">Renk Ayarları</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ColorField label="Sayfa Arkaplanı" value={c.background} testId="color-bg" onChange={(v) => setC({ background: v })} />
          <ColorField label="Ana Yazı Rengi" value={c.textPrimary} testId="color-text" onChange={(v) => setC({ textPrimary: v })} />
          <ColorField label="İkincil Yazı Rengi" value={c.textSecondary} testId="color-text2" onChange={(v) => setC({ textSecondary: v })} />
          <ColorField label="Bölüm Arkaplanı" value={c.sectionAltBg} testId="color-alt" onChange={(v) => setC({ sectionAltBg: v })} />
          <ColorField label="Buton Arkaplanı" value={c.buttonBg} testId="color-btnbg" onChange={(v) => setC({ buttonBg: v })} />
          <ColorField label="Buton Yazısı" value={c.buttonText} testId="color-btntext" onChange={(v) => setC({ buttonText: v })} />
          <Select label="Buton Köşe Yuvarlaklığı" value={String(c.buttonRadius ?? "999")} options={[{ value: "999", label: "Tam Yuvarlak" }, { value: "12", label: "Hafif Yuvarlak" }, { value: "0", label: "Keskin" }]} testId="btn-radius" onChange={(v) => setC({ buttonRadius: v })} />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold text-white">Görsel Ayarlar</p>
        <div className="flex flex-col gap-5">
          <ImagePicker label="Site Logosu" value={img.logo && img.logo.startsWith("/api/") ? img.logo : ""} testId="img-logo" onChange={(v) => setI({ logo: v || "/logo-wide.png" })} />
          <ImagePicker label="Favicon (tarayıcı sekmesi)" value={img.favicon} testId="img-favicon" onChange={(v) => setI({ favicon: v })} />
          <ImagePicker label="Sosyal Medya Paylaşım Görseli (OG)" value={img.ogImage} testId="img-og" onChange={(v) => setI({ ogImage: v })} />
        </div>
      </div>
    </div>
  );
};

export default DesignSettings;
