import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "@/admin/api";
import Logo from "@/components/Logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-5">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0a0a0c] p-8">
        <div className="mb-8 flex justify-center">
          <Logo className="h-9 w-auto" testId="admin-login-logo" />
        </div>
        <h1 data-testid="admin-login-title" className="text-center font-display text-xl font-bold text-white">
          Yönetim Paneli
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">Devam etmek için giriş yapın</p>
        <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">E-posta</label>
            <input
              id="admin-email"
              data-testid="admin-login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/40"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-password" className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Şifre</label>
            <input
              id="admin-password"
              data-testid="admin-login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/40"
            />
          </div>
          {error && <p data-testid="admin-login-error" className="text-center text-xs text-red-300">{error}</p>}
          <button
            data-testid="admin-login-submit"
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-white py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
