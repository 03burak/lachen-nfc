export const LangInput = ({ label, value = {}, onChange, textarea = false, testId }) => (
  <div className="flex flex-col gap-2">
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    <div className="grid gap-3 sm:grid-cols-2">
      {["tr", "en"].map((lang) => (
        <div key={lang}>
          <p className="mb-1 font-mono text-[9px] uppercase text-zinc-600">{lang === "tr" ? "Türkçe" : "İngilizce"}</p>
          {textarea ? (
            <textarea
              data-testid={`${testId}-${lang}`}
              rows={3}
              value={value[lang] || ""}
              onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
            />
          ) : (
            <input
              data-testid={`${testId}-${lang}`}
              type="text"
              value={value[lang] || ""}
              onChange={(e) => onChange({ ...value, [lang]: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export const SingleInput = ({ label, value, onChange, testId, placeholder }) => (
  <div className="flex flex-col gap-2">
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    <input
      data-testid={testId}
      type="text"
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
    />
  </div>
);

export const ListEditor = ({ label, items = [], onChange, testId }) => {
  const set = (i, v) => onChange(items.map((x, idx) => (idx === i ? v : x)));
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              data-testid={`${testId}-${i}`}
              type="text"
              value={item}
              onChange={(e) => set(i, e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-white/40"
            />
            <button
              type="button"
              data-testid={`${testId}-remove-${i}`}
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="rounded-xl border border-white/15 px-3 text-sm text-zinc-400 hover:border-red-400/40 hover:text-red-300"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid={`${testId}-add`}
        onClick={() => onChange([...items, ""])}
        className="mt-1 w-fit rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:bg-white/5"
      >
        + Ekle
      </button>
    </div>
  );
};

export const Section = ({ title, children, testId }) => (
  <section data-testid={testId} className="rounded-2xl border border-white/10 bg-[#0a0a0c] p-6 sm:p-8">
    <h3 className="mb-6 font-display text-lg font-bold text-white">{title}</h3>
    <div className="flex flex-col gap-6">{children}</div>
  </section>
);
