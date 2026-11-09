import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

const API = process.env.REACT_APP_BACKEND_URL;
const logoSrc = (src) => (src && src.startsWith("/api/files/") ? `${API}${src}` : src);

export const References = () => {
  const { t } = useLanguage();
  const refs = t.references;
  const items = (refs.items || []).filter((i) => i.active && i.name);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const stepRef = useRef(0);
  const [, force] = useState(0);

  useEffect(() => {
    force((v) => v + 1);
  }, [items.length]);

  useEffect(() => {
    let raf;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const track = trackRef.current;
      if (track && track.scrollWidth > 0) {
        const seg = track.scrollWidth / 3;
        offsetRef.current -= 0.04 * dt;
        if (stepRef.current !== 0) {
          offsetRef.current += stepRef.current * 0.16;
          stepRef.current *= 0.84;
          if (Math.abs(stepRef.current) < 0.5) stepRef.current = 0;
        }
        let off = offsetRef.current;
        while (off <= -seg) off += seg;
        while (off > 0) off -= seg;
        offsetRef.current = off;
        track.style.transform = `translate3d(${off}px, 0, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [items.length]);

  if (!refs.enabled || items.length === 0) return null;

  const copies = [...items, ...items, ...items];

  return (
    <section id="referanslar" data-testid="references" className="relative border-t border-white/10 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{refs.eyebrow}</p>
              <h2 data-testid="references-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {refs.title}
              </h2>
            </div>
            <div className="hidden gap-3 sm:flex">
              <button
                data-testid="references-prev"
                onClick={() => { stepRef.current += 240; }}
                aria-label="Önceki"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-black"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                data-testid="references-next"
                onClick={() => { stepRef.current -= 240; }}
                aria-label="Sonraki"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-black"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div data-testid="references-track-wrap" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050505] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050505] to-transparent sm:w-28" />
          <div ref={trackRef} className="flex w-max will-change-transform">
            {copies.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                data-testid={idx < items.length ? `reference-item-${item.id}` : undefined}
                className="flex w-36 shrink-0 flex-col items-center gap-4 px-4 sm:w-44"
              >
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#0d0d0f] sm:h-28 sm:w-28">
                  {item.logo ? (
                    <img src={logoSrc(item.logo)} alt={item.name} className="h-full w-full object-cover" draggable={false} />
                  ) : (
                    <span className="font-display text-xl font-bold text-zinc-500">
                      {item.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-center text-xs font-medium text-zinc-400 sm:text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-10 flex justify-center gap-3 sm:hidden">
        <button
          data-testid="references-prev-mobile"
          onClick={() => { stepRef.current += 200; }}
          aria-label="Önceki"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          data-testid="references-next-mobile"
          onClick={() => { stepRef.current -= 200; }}
          aria-label="Sonraki"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default References;
