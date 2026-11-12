import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchContent } from "@/admin/api";
import DesignManager from "@/components/DesignManager";
import SeoManager from "@/components/SeoManager";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomSection from "@/components/CustomSection";
import { LanguageProvider } from "@/context/LanguageContext";

export default function CustomPage() {
  const { slug } = useParams();
  const [content, setContent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchContent()
      .then((c) => setContent(c))
      .catch(() => setNotFound(true));
  }, []);

  if (notFound) return <div className="flex min-h-screen items-center justify-center bg-[#050505] font-mono text-sm text-white">Sayfa bulunamadı.</div>;
  if (!content) return <div className="flex min-h-screen items-center justify-center bg-[#050505] font-mono text-sm text-zinc-400">Yükleniyor…</div>;

  const page = (content.pages || []).find((p) => p.slug === slug && p.active);
  if (!page) return <div className="flex min-h-screen items-center justify-center bg-[#050505] font-mono text-sm text-white">Sayfa bulunamadı.</div>;

  return (
    <LanguageProvider>
      <div className="grain min-h-screen bg-[#050505] text-white">
        <DesignManager design={content.design} seo={content.seo} />
        <SeoManager seo={{ ...content.seo, title: page.seoTitle || content.seo?.title, description: page.seoDesc || content.seo?.description }} lang="tr" />
        <Navbar />
        <main className="pt-20">
          {(page.sections || []).filter((s) => s.active !== false).map((s) => (
            <CustomSection key={s.id} section={s} />
          ))}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
