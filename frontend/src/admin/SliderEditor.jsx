import { useRef, useState } from "react";
import { uploadImage } from "@/admin/api";
import { SingleInput } from "@/admin/fields";

const thumb = (src) => (src.startsWith("/api/files/") ? `${process.env.REACT_APP_BACKEND_URL}${src}` : src);

export const SliderEditor = ({ slides, onChange }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= slides.length) return;
    const next = [...slides];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { url } = await uploadImage(file);
      onChange([...slides, { src: url, alt: file.name }]);
    } catch (err) {
      setError(err.message || "Yükleme başarısız");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div data-testid="slider-editor" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {slides.map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
            <img src={thumb(s.src)} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <SingleInput label={`Alt Metin #${i + 1}`} value={s.alt} testId={`slider-alt-${i}`} onChange={(v) => onChange(slides.map((x, idx) => (idx === i ? { ...x, alt: v } : x)))} />
            </div>
            <div className="flex shrink-0 flex-col gap-1">
              <button type="button" data-testid={`slider-up-${i}`} onClick={() => move(i, -1)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5">↑</button>
              <button type="button" data-testid={`slider-down-${i}`} onClick={() => move(i, 1)} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:bg-white/5">↓</button>
              <button type="button" data-testid={`slider-remove-${i}`} onClick={() => onChange(slides.filter((_, idx) => idx !== i))} className="rounded-lg border border-white/15 px-2 py-1 text-xs text-red-300/80 hover:border-red-400/40">Sil</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" data-testid="slider-upload-input" />
        <button
          type="button"
          data-testid="slider-upload-btn"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="w-fit rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5 disabled:opacity-50"
        >
          {uploading ? "Yükleniyor…" : "+ Görsel Yükle"}
        </button>
        {error && <p data-testid="slider-upload-error" className="mt-2 text-xs text-red-300">{error}</p>}
      </div>
    </div>
  );
};

export default SliderEditor;
