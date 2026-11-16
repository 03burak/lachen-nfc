import { useState } from "react";
import { changePassword } from "@/admin/api";

export const ChangePasswordForm = ({ forced = false, onDone, testPrefix = "pw" }) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [next2, setNext2] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (next !== next2) { setError("Yeni şifreler eşleşmiyor."); return; }
    if (next.length < 8) { setError("Yeni şifre en az 8 karakter olmalı."); return; }
    setLoading(true);
    setError("");
    setOk("");
    try {
      await changePassword(current, next);
      setOk("Şifreniz başarıyla değiştirildi.");
      setCurrent(""); setNext(""); setNext2("");
      if (onDone) onDone();
    } catch (err) {
      setError(err.message || "Değiştirilemedi.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40";
  const labelCls = "font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500";

  return (
    <form onSubmit={submit} data-testid={`${testPrefix}-form`} className="flex flex-col gap-4">
      {forced && <p className="text-sm text-amber-300">Güvenliğiniz için ilk girişte şifrenizi değiştirmeniz gerekiyor.</p>}
      <div className="flex flex-col gap-2"><p className={labelCls}>Mevcut Şifre</p><input data-testid={`${testPrefix}-current`} type="password" required value={current} onChange={(e) => setCurrent(e.target.value)} className={inputCls} /></div>
      <div className="flex flex-col gap-2"><p className={labelCls}>Yeni Şifre</p><input data-testid={`${testPrefix}-new`} type="password" required value={next} onChange={(e) => setNext(e.target.value)} className={inputCls} /></div>
      <div className="flex flex-col gap-2"><p className={labelCls}>Yeni Şifre (Tekrar)</p><input data-testid={`${testPrefix}-new2`} type="password" required value={next2} onChange={(e) => setNext2(e.target.value)} className={inputCls} /></div>
      {error && <p data-testid={`${testPrefix}-error`} className="text-xs text-red-300">{error}</p>}
      {ok && <p data-testid={`${testPrefix}-ok`} className="text-xs text-emerald-300">{ok}</p>}
      <button data-testid={`${testPrefix}-submit`} type="submit" disabled={loading} className="rounded-full bg-white py-3 text-sm font-semibold text-black disabled:opacity-60">{loading ? "Kaydediliyor…" : "Şifremi Değiştir"}</button>
    </form>
  );
};

export default ChangePasswordForm;
