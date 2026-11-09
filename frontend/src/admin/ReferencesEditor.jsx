import { useRef, useState } from "react";
import { uploadImage } from "@/admin/api";

const API = process.env.REACT_APP_BACKEND_URL;
const logoSrc = (src) => (src && src.startsWith("/api/files/") ? `${API}${src}` : src);

export const Toggle = ({ on, onChange, testId }) => (
  <button
    type="button"
    data-testid={testId}
    onClick={() => onChange(!on)}
    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-white" : "bg-white/15"}`}
    aria-label={on ? "Açık" : "Kapalı"}
  >
    <span
      className={`absolute top-0.5 h-5 w-5 rounded-full transition-all ${on ? "left-[22px] bg-black" : "left-0.5 bg-zinc-400"}`}
    />
  </button>
);

const LogoUploadBtn = ({ onUploaded, testId }) => {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const { url } = await uploadImage(file);
      onUploaded(url);
    } catch (err) {
      setError(err.message || "Yükleme başarısız");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };
  return (
    <span>
      <input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden" data-testid={`${testId}-input`} />
      <button
        type="button"
        data-testid={testId}
        disabled={busy}
        onClick={() => ref.current?.click()}
        className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white/5 disabled:opacity-50"
      >
        {busy ? "Yükleniyor…" : "Logo Yükle"}
      </button>
      {error && <span className="ml-2 text-xs text-red-300">{error}</span>}
    </span>
  );
};

export const ReferencesEditor = ({ value, onChange }) => {
  const refs = value;
  const set = (patch) => onChange({ ...refs, ...patch });
  const setItem = (i, patch) => set({ items: refs.items.map((x, idx) => (idx === i ? { ...x, ...patch } : x)) });

  return (
    <div data-testid="references-editor" className="flex flex-col gap-6">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white">Referanslarımız Bölümü</p>
          <p className="text-xs text-zinc-500">Kapalıysa bölüm web sitesinde hiç görünmez.</p>
        </div>
        <Toggle on={!!refs.enabled} testId="references-enabled-toggle" onChange={(v) => set({ enabled: v })} />
      </div>

      <div className="flex flex-col gap-3">
        {refs.items.map((item, i) => (
          <div key={item.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#0d0d0f]">
              {item.logo ? (
                <img src={logoSrc(item.logo)} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-zinc-600">Yok</span>
              )}
            </div>
            <input
              data-testid={`reference-name-${i}`}
              type="text"
              value={item.name}
              placeholder="Firma adı"
              onChange={(e) => setItem(i, { name: e.target.value })}
              className="min-w-40 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-white/40"
            />
            <LogoUploadBtn testId={`reference-upload-${i}`} onUploaded={(url) => setItem(i, { logo: url })} />
            <button
              type="button"
              data-testid={`reference-remove-${i}`}
              onClick={() => set({ items: refs.items.filter((_, idx) => idx !== i) })}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-red-300/80 hover:border-red-400/40"
            >
              Sil
            </button>
            <Toggle on={!!item.active} testId={`reference-active-${i}`} onChange={(v) => setItem(i, { active: v })} />
          </div>
        ))}
      </div>

      <button
        type="button"
        data-testid="reference-add-btn"
        onClick={() =>
          set({
            items: [
              ...refs.items,
              { id: `ref-${Date.now()}`, name: "", logo: "", active: true },
            ],
          })
        }
        className="w-fit rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5"
      >
        + Yeni Firma Ekle
      </button>
      <p className="text-xs text-zinc-600">Not: Başlangıçtaki firmalar temsilî örneklerdir — kendi firmalarınızla değiştirin.</p>
    </div>
  );
};

export default ReferencesEditor;
