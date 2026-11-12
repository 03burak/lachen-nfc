import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToId } from "@/lib/lenis";

const EASE = [0.16, 1, 0.3, 1];

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
    <motion.span
      className="block will-change-transform"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const NfcWaves = () => (
  <svg viewBox="0 0 640 640" fill="none" className="h-full w-full">
    <circle cx="140" cy="320" r="16" fill="white" />
    <path className="nfc-arc" d="M210 240 A110 110 0 0 1 210 400" stroke="white" strokeWidth="10" strokeLinecap="round" />
    <path className="nfc-arc nfc-arc-2" d="M255 190 A170 170 0 0 1 255 450" stroke="white" strokeWidth="10" strokeLinecap="round" />
    <path className="nfc-arc nfc-arc-3" d="M300 140 A230 230 0 0 1 300 500" stroke="white" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

export const Hero = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 55, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 55, damping: 16 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yArcs = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacityArcs = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      data-testid="hero"
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute -right-[12%] top-1/2 hidden -translate-y-1/2 md:block lg:right-[-6%]" style={{ width: "min(52vw, 660px)", height: "min(52vw, 660px)" }}>
        <motion.div
          style={{ y: yArcs, opacity: opacityArcs, rotateX, rotateY, transformPerspective: 1000 }}
          className="h-full w-full opacity-90"
        >
          <NfcWaves />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -right-[45%] top-1/2 -translate-y-1/2 md:hidden" style={{ width: "150vw", height: "150vw", opacity: 0.35 }}>
        <NfcWaves />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 75% 40%, rgba(255,255,255,0.07), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 md:pt-36">
        <motion.p
          data-testid="hero-eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          {t.hero.eyebrow}
        </motion.p>

        <h1
          data-testid="hero-headline"
          className="max-w-5xl font-display text-[clamp(2.6rem,8vw,6.2rem)] font-extrabold leading-[1.02] tracking-tight"
        >
          <MaskedLine delay={0.25}>{t.hero.lines[0]}</MaskedLine>
          <MaskedLine delay={0.38}>{t.hero.lines[1]}</MaskedLine>
          <MaskedLine delay={0.51}>
            <span className="outline-text">{t.hero.lines[2]}</span>
          </MaskedLine>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: EASE }}
          className="mt-10 h-px w-full max-w-3xl origin-left bg-white/20"
        />

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            data-testid="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: EASE }}
            className="max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            data-testid="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-discover"
              onClick={() => scrollToId("#hizmetler")}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] sm:py-3.5"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              data-testid="hero-cta-contact"
              onClick={() => scrollToId("#iletisim")}
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/5 sm:py-3.5"
            >
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        data-testid="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-zinc-500"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
