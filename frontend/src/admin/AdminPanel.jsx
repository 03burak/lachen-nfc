import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogout, adminMe, fetchContent, fetchRevisions, restoreRevision, saveContent } from "@/admin/api";
import { LangInput, ListEditor, Section, SingleInput } from "@/admin/fields";
import SliderEditor from "@/admin/SliderEditor";
import ReferencesEditor from "@/admin/ReferencesEditor";
import Logo from "@/components/Logo";

const TABS = [
  { id: "hero", label: "Ana Sayfa" },
  { id: "about", label: "Hakkımızda & Slider" },
  { id: "services", label: "Hizmetler & İşletmeler" },
  { id: "tech", label: "Teknoloji" },
  { id: "packages", label: "Paketler" },
  { id: "references", label: "Referanslar" },
  { id: "contact", label: "İletişim" },
  { id: "footer", label: "Footer" },
  { id: "history", label: "Sürüm Geçmişi" },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await adminMe();
        const c = await fetchContent();
        setContent(c);
      } catch {
        navigate("/admin/login", { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const set = (path, value) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setNotice("");
    try {
      await saveContent(content);
      setNotice("Kaydedildi — siteye anında yansıdı.");
    } catch {
      setNotice("Kaydedilemedi. Tekrar deneyin.");
    } finally {
      setSaving(false);
      setTimeout(() => setNotice(""), 4000);
    }
  };

  const loadRevisions = async () => {
    try {
      const { revisions: r } = await fetchRevisions();
      setRevisions(r);
    } catch {}
  };

  const restore = async (revId) => {
    try {
      await restoreRevision(revId);
      const c = await fetchContent();
      setContent(c);
      setNotice("Önceki sürüm geri yüklendi.");
      setTimeout(() => setNotice(""), 4000);
    } catch {
      setNotice("Geri yükleme başarısız.");
    }
  };

  const logout = async () => {
    await adminLogout();
    navigate("/admin/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] font-mono text-sm text-zinc-400">
        Yükleniyor…
      </div>
    );
  }
  if (!content) return null;

  const c = content;

  return (
    <div data-testid="admin-panel" className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo className="h-8 w-auto" testId="admin-logo" />
          <div className="flex items-center gap-3">
            <button
              data-testid="admin-save-btn"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03] disabled:opacity-60"
            >
              {saving ? "Kaydediliyor…" : "Kaydet"}
            </button>
            <button
              data-testid="admin-logout-btn"
              onClick={logout}
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      {notice && (
        <div data-testid="admin-notice" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/20 bg-[#121216] px-6 py-3 text-sm shadow-2xl">
          {notice}
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2" data-testid="admin-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              data-testid={`admin-tab-${t.id}`}
              onClick={() => {
                setTab(t.id);
                if (t.id === "history") loadRevisions();
              }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? "bg-white text-black" : "border border-white/15 text-zinc-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "hero" && (
          <Section title="Ana Sayfa Başlık & Metinler" testId="admin-section-hero">
            <LangInput label="Üst Etiket (Eyebrow)" value={c.hero.eyebrow} testId="hero-eyebrow" onChange={(v) => set("hero.eyebrow", v)} />
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Büyük Başlık Satırları</p>
              {c.hero.lines.tr.map((_, i) => (
                <LangInput
                  key={i}
                  label={`Satır ${i + 1}`}
                  value={{ tr: c.hero.lines.tr[i], en: c.hero.lines.en[i] }}
                  testId={`hero-line-${i}`}
                  onChange={(v) =>
                    set("hero.lines", { tr: c.hero.lines.tr.map((x, idx) => (idx === i ? v.tr : x)), en: c.hero.lines.en.map((x, idx) => (idx === i ? v.en : x)) })
                  }
                />
              ))}
            </div>
            <LangInput label="Alt Açıklama" value={c.hero.sub} textarea testId="hero-sub" onChange={(v) => set("hero.sub", v)} />
            <LangInput label="Birincil Buton" value={c.hero.ctaPrimary} testId="hero-cta1" onChange={(v) => set("hero.ctaPrimary", v)} />
            <LangInput label="İkincil Buton" value={c.hero.ctaSecondary} testId="hero-cta2" onChange={(v) => set("hero.ctaSecondary", v)} />
            <ListEditor label="Kayan Şerit — Türkçe" items={c.marquee.tr} testId="marquee-tr" onChange={(v) => set("marquee.tr", v)} />
            <ListEditor label="Kayan Şerit — İngilizce" items={c.marquee.en} testId="marquee-en" onChange={(v) => set("marquee.en", v)} />
          </Section>
        )}

        {tab === "about" && (
          <>
            <Section title="Hakkımızda Metinleri" testId="admin-section-about">
              <LangInput label="Üst Etiket" value={c.about.eyebrow} testId="about-eyebrow" onChange={(v) => set("about.eyebrow", v)} />
              <LangInput label="Başlık" value={c.about.title} testId="about-title" onChange={(v) => set("about.title", v)} />
              <LangInput label="Paragraf 1" value={c.about.p1} textarea testId="about-p1" onChange={(v) => set("about.p1", v)} />
              <LangInput label="Paragraf 2" value={c.about.p2} textarea testId="about-p2" onChange={(v) => set("about.p2", v)} />
              {c.about.pillars.map((p, i) => (
                <div key={i} className="rounded-xl border border-white/10 p-4">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Sütun {i + 1}</p>
                  <div className="flex flex-col gap-4">
                    <LangInput label="Başlık" value={p.title} testId={`pillar-title-${i}`} onChange={(v) => set(`about.pillars.${i}.title`, v)} />
                    <LangInput label="Açıklama" value={p.desc} testId={`pillar-desc-${i}`} onChange={(v) => set(`about.pillars.${i}.desc`, v)} />
                  </div>
                </div>
              ))}
            </Section>
            <div className="mt-6">
              <Section title="Slider Görselleri (yükle / sil / sırala)" testId="admin-section-slider">
                <SliderEditor slides={c.about.slider} onChange={(v) => set("about.slider", v)} />
              </Section>
            </div>
          </>
        )}

        {tab === "services" && (
          <>
            <Section title="Hizmetler Bölümü" testId="admin-section-services">
              <LangInput label="Bölüm Etiketi" value={c.services.eyebrow} testId="services-eyebrow" onChange={(v) => set("services.eyebrow", v)} />
              <LangInput label="Bölüm Başlığı" value={c.services.title} testId="services-title" onChange={(v) => set("services.title", v)} />
              <LangInput label="Bölüm Açıklaması" value={c.services.desc} textarea testId="services-desc" onChange={(v) => set("services.desc", v)} />
              {c.services.items.map((s, i) => (
                <div key={s.id} className="rounded-xl border border-white/10 p-4">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Hizmet {s.tag}</p>
                  <div className="flex flex-col gap-4">
                    <LangInput label="Başlık" value={s.title} testId={`service-title-${i}`} onChange={(v) => set(`services.items.${i}.title`, v)} />
                    <LangInput label="Açıklama" value={s.desc} textarea testId={`service-desc-${i}`} onChange={(v) => set(`services.items.${i}.desc`, v)} />
                    <LangInput label="Etiket" value={s.label} testId={`service-label-${i}`} onChange={(v) => set(`services.items.${i}.label`, v)} />
                  </div>
                </div>
              ))}
            </Section>
            <div className="mt-6">
              <Section title="Hizmet Verdiğimiz İşletmeler" testId="admin-section-industries">
                <LangInput label="Bölüm Etiketi" value={c.industries.eyebrow} testId="industries-eyebrow" onChange={(v) => set("industries.eyebrow", v)} />
                <LangInput label="Bölüm Başlığı" value={c.industries.title} testId="industries-title" onChange={(v) => set("industries.title", v)} />
                <LangInput label="Bölüm Açıklaması" value={c.industries.desc} textarea testId="industries-desc" onChange={(v) => set("industries.desc", v)} />
                {c.industries.items.map((s, i) => (
                  <div key={s.id} className="rounded-xl border border-white/10 p-4">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Kart {i + 1}</p>
                    <div className="flex flex-col gap-4">
                      <LangInput label="Başlık" value={s.title} testId={`industry-title-${i}`} onChange={(v) => set(`industries.items.${i}.title`, v)} />
                      <LangInput label="Açıklama" value={s.desc} textarea testId={`industry-desc-${i}`} onChange={(v) => set(`industries.items.${i}.desc`, v)} />
                    </div>
                  </div>
                ))}
              </Section>
            </div>
          </>
        )}

        {tab === "tech" && (
          <Section title="Teknoloji Bölümü" testId="admin-section-tech">
            <LangInput label="Bölüm Etiketi" value={c.tech.eyebrow} testId="tech-eyebrow" onChange={(v) => set("tech.eyebrow", v)} />
            <LangInput label="Bölüm Başlığı" value={c.tech.title} testId="tech-title" onChange={(v) => set("tech.title", v)} />
            <LangInput label="Bölüm Açıklaması" value={c.tech.desc} textarea testId="tech-desc" onChange={(v) => set("tech.desc", v)} />
            <LangInput label="Demo Uyarı Metni" value={c.tech.disclaimer} textarea testId="tech-disclaimer" onChange={(v) => set("tech.disclaimer", v)} />
            <LangInput label="Özellik Başlığı" value={c.tech.featureTitle} testId="tech-feature-title" onChange={(v) => set("tech.featureTitle", v)} />
            <ListEditor label="Özellik Maddeleri — Türkçe" items={c.tech.features.tr} testId="tech-feature-tr" onChange={(v) => set("tech.features.tr", v)} />
            <ListEditor label="Özellik Maddeleri — İngilizce" items={c.tech.features.en} testId="tech-feature-en" onChange={(v) => set("tech.features.en", v)} />
          </Section>
        )}

        {tab === "packages" && (
          <Section title="Paketler" testId="admin-section-packages">
            <LangInput label="Bölüm Etiketi" value={c.packages.eyebrow} testId="packages-eyebrow" onChange={(v) => set("packages.eyebrow", v)} />
            <LangInput label="Bölüm Başlığı" value={c.packages.title} testId="packages-title" onChange={(v) => set("packages.title", v)} />
            <LangInput label="Bölüm Açıklaması" value={c.packages.desc} textarea testId="packages-desc" onChange={(v) => set("packages.desc", v)} />
            <LangInput label="Buton Metni" value={c.packages.cta} testId="packages-cta" onChange={(v) => set("packages.cta", v)} />
            {c.packages.items.map((p, i) => (
              <div key={p.key} className="rounded-xl border border-white/10 p-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Paket: {p.key.toUpperCase()}</p>
                <div className="flex flex-col gap-4">
                  <LangInput label="Üst Etiket" value={p.tier} testId={`pkg-tier-${i}`} onChange={(v) => set(`packages.items.${i}.tier`, v)} />
                  <LangInput label="Paket Adı" value={p.name} testId={`pkg-name-${i}`} onChange={(v) => set(`packages.items.${i}.name`, v)} />
                  <LangInput label="Açıklama" value={p.desc} testId={`pkg-desc-${i}`} onChange={(v) => set(`packages.items.${i}.desc`, v)} />
                  <LangInput label="Fiyat (boş bırakılırsa gösterilmez)" value={p.price} testId={`pkg-price-${i}`} onChange={(v) => set(`packages.items.${i}.price`, v)} />
                  <ListEditor label="Özellikler — Türkçe" items={p.features.tr} testId={`pkg-features-tr-${i}`} onChange={(v) => set(`packages.items.${i}.features.tr`, v)} />
                  <ListEditor label="Özellikler — İngilizce" items={p.features.en} testId={`pkg-features-en-${i}`} onChange={(v) => set(`packages.items.${i}.features.en`, v)} />
                </div>
              </div>
            ))}
          </Section>
        )}

        {tab === "references" && (
          <Section title="Referanslarımız Yönetimi" testId="admin-section-references">
            <ReferencesEditor value={c.references} onChange={(v) => set("references", v)} />
          </Section>
        )}

        {tab === "contact" && (
          <Section title="İletişim Bölümü & Bağlantılar" testId="admin-section-contact">
            <LangInput label="Bölüm Etiketi" value={c.contact.eyebrow} testId="contact-eyebrow" onChange={(v) => set("contact.eyebrow", v)} />
            <LangInput label="Başlık" value={c.contact.title} testId="contact-title" onChange={(v) => set("contact.title", v)} />
            <LangInput label="Açıklama" value={c.contact.desc} textarea testId="contact-desc" onChange={(v) => set("contact.desc", v)} />
            <LangInput label="Form Altı Not" value={c.contact.note} testId="contact-note" onChange={(v) => set("contact.note", v)} />
            <LangInput label="Başarı Mesajı Başlığı" value={c.contact.successTitle} testId="contact-success-title" onChange={(v) => set("contact.successTitle", v)} />
            <LangInput label="Başarı Mesajı Açıklaması" value={c.contact.successDesc} testId="contact-success-desc" onChange={(v) => set("contact.successDesc", v)} />
            {c.contact.links.map((l, i) => (
              <div key={l.id} className="rounded-xl border border-white/10 p-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{l.label.tr}</p>
                <div className="flex flex-col gap-4">
                  <SingleInput label="Görünen Değer" value={l.value} testId={`contact-link-value-${i}`} onChange={(v) => set(`contact.links.${i}.value`, v)} />
                  <SingleInput label="Bağlantı (href)" value={l.href} testId={`contact-link-href-${i}`} onChange={(v) => set(`contact.links.${i}.href`, v)} />
                </div>
              </div>
            ))}
          </Section>
        )}

        {tab === "footer" && (
          <Section title="Footer" testId="admin-section-footer">
            <LangInput label="Keşfet Başlığı" value={c.footer.explore} testId="footer-explore" onChange={(v) => set("footer.explore", v)} />
            <LangInput label="İletişim Başlığı" value={c.footer.contact} testId="footer-contact" onChange={(v) => set("footer.contact", v)} />
            <LangInput label="Telif Metni" value={c.footer.rights} testId="footer-rights" onChange={(v) => set("footer.rights", v)} />
            <LangInput label="Alt Etiket (Tagline)" value={c.footer.tagline} testId="footer-tagline" onChange={(v) => set("footer.tagline", v)} />
            <SingleInput label="Footer E-posta" value={c.footer.email} testId="footer-email" onChange={(v) => set("footer.email", v)} />
            <SingleInput label="Footer Instagram (görünen)" value={c.footer.instagram} testId="footer-instagram" onChange={(v) => set("footer.instagram", v)} />
            <SingleInput label="Footer Instagram Bağlantısı" value={c.footer.instagramHref} testId="footer-instagram-href" onChange={(v) => set("footer.instagramHref", v)} />
            <SingleInput label="Footer LinkedIn Bağlantısı" value={c.footer.linkedinHref} testId="footer-linkedin-href" onChange={(v) => set("footer.linkedinHref", v)} />
          </Section>
        )}

        {tab === "history" && (
          <Section title="Sürüm Geçmişi (son 20 kayıt)" testId="admin-section-history">
            {revisions.length === 0 && <p className="text-sm text-zinc-500">Henüz kayıtlı sürüm yok. İlk "Kaydet" işleminden sonra burada listelenecek.</p>}
            <div className="flex flex-col gap-3">
              {revisions.map((r, i) => (
                <div key={r.rev_id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <div>
                    <p className="text-sm text-white">{new Date(r.saved_at).toLocaleString("tr-TR")}</p>
                    <p className="text-xs text-zinc-500">{r.saved_by}</p>
                  </div>
                  <button
                    data-testid={`restore-btn-${i}`}
                    onClick={() => restore(r.rev_id)}
                    className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium text-zinc-200 hover:bg-white hover:text-black"
                  >
                    Bu Sürüme Dön
                  </button>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
