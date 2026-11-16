import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { adminLogin, forgotPassword, resetPassword, changePassword } from "@/admin/api";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("login"); // login | forgot
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const resetToken = params.get("token");

  // --- reset password view ---
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");
  const [resetDone, setResetDone] = useState(false);

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminLogin(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message === "Invalid email or password" ? "E-posta veya şifre hatalı." : "Giriş yapılamadı. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const submitForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await forgotPassword(forgotEmail);
      setForgotSent(true);
    } catch (err) {
      setError("Gönderilemedi. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const submitReset = async (e) => {
    e.preventDefault();
    if (newPw !== newPw2) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    if (newPw.length < 8) {
      setError("Şifre en az 8 karakter olmalı.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await resetPassword(resetToken, newPw);
      setResetDone(true);
    } catch (err) {
      setError(err.message || "Sıfırlanamadı. Bağlantı süresi dolmuş olabilir.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/40";
  const labelCls = "font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500";

  if (resetToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0a0a0c] p-8">
          <div className="mb-8 flex justify-center"><Logo className="h-9 w-auto" testId="reset-logo" /></div>
          <h1 data-testid="reset-title" className="text-center font-display text-xl font-bold text-white">Yeni Şifre Belirle</h1>
          {resetDone ? (
            <div className="mt-6 text-center">
              <p data-testid="reset-success" className="text-sm text-zinc-300">Şifreniz başarıyla güncellendi.</p>
              <Link data-testid="reset-login-link" to="/admin/login" className="mt-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black">Girişe Dön</Link>
            </div>
          ) : (
            <form onSubmit={submitReset} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2"><p className={labelCls}>Yeni Şifre</p><input data-testid="reset-new-pw" type="password" required value={newPw} onChange={(e) => setNewPw(e.target.value)} className={inputCls} /></div>
              <div className="flex flex-col gap-2"><p className={labelCls}>Yeni Şifre (Tekrar)</p><input data-testid="reset-new-pw2" type="password" required value={newPw2} onChange={(e) => setNewPw2(e.target.value)} className={inputCls} /></div>
              {error && <p data-testid="reset-error" className="text-center text-xs text-red-300">{error}</p>}
              <button data-testid="reset-submit" type="submit" disabled={loading} className="mt-2 rounded-full bg-white py-3 text-sm font-semibold text-black disabled:opacity-60">{loading ? "Kaydediliyor…" : "Şifremi Kaydet"}</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0a0a0c] p-8">
        <div className="mb-8 flex justify-center"><Logo className="h-9 w-auto" testId="admin-login-logo" /></div>
        <h1 data-testid="admin-login-title" className="text-center font-display text-xl font-bold text-white">Yönetim Paneli</h1>

        {view === "forgot" ? (
          <form onSubmit={submitForgot} className="mt-8 flex flex-col gap-4">
            <p className="text-center text-sm text-zinc-500">Şifre sıfırlama bağlantısı e-postanıza gönderilecek.</p>
            <div className="flex flex-col gap-2"><p className={labelCls}>E-posta</p><input data-testid="forgot-email" type="email" required value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} className={inputCls} /></div>
            {forgotSent && <p data-testid="forgot-success" className="text-center text-xs text-emerald-300">Bağlantı gönderildi. E-postanızı kontrol edin (gelen kutusu + spam).</p>}
            {error && <p data-testid="forgot-error" className="text-center text-xs text-red-300">{error}</p>}
            <button data-testid="forgot-submit" type="submit" disabled={loading} className="mt-2 rounded-full bg-white py-3 text-sm font-semibold text-black disabled:opacity-60">{loading ? "Gönderiliyor…" : "Sıfırlama Bağlantısı Gönder"}</button>
            <button type="button" data-testid="forgot-back" onClick={() => setView("login")} className="text-center text-xs text-zinc-500 hover:text-white">← Girişe dön</button>
          </form>
        ) : (
          <form onSubmit={submitLogin} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2"><p className={labelCls}>E-posta</p><input id="admin-email" data-testid="admin-login-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></div>
            <div className="flex flex-col gap-2"><p className={labelCls}>Şifre</p><input id="admin-password" data-testid="admin-login-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} /></div>
            {error && <p data-testid="admin-login-error" className="text-center text-xs text-red-300">{error}</p>}
            <button data-testid="admin-login-submit" type="submit" disabled={loading} className="mt-2 rounded-full bg-white py-3 text-sm font-semibold text-black disabled:opacity-60">{loading ? "Giriş yapılıyor…" : "Giriş Yap"}</button>
            <button type="button" data-testid="forgot-open" onClick={() => setView("forgot")} className="text-center text-xs text-zinc-500 hover:text-white">Şifremi Unuttum</button>
          </form>
        )}
      </div>
    </div>
  );
}
