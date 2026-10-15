import { useState } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle2, CircleDollarSign, Info, ReceiptText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";

const SCAN_DATA = [
  { h: "10", v: 12 }, { h: "11", v: 18 }, { h: "12", v: 46 }, { h: "13", v: 72 },
  { h: "14", v: 58 }, { h: "15", v: 34 }, { h: "16", v: 28 }, { h: "17", v: 41 },
  { h: "18", v: 64 }, { h: "19", v: 96 }, { h: "20", v: 142 }, { h: "21", v: 118 }, { h: "22", v: 74 },
];
const ITEM_DATA = [
  { n: "Risotto", v: 86 }, { n: "Burger", v: 74 }, { n: "Steak", v: 61 }, { n: "Pasta", v: 47 }, { n: "Tatlı", v: 32 },
];

const DEMO_TOOLTIP = {
  backgroundColor: "#121216",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#fff",
};

export const DemoBadge = ({ label }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-300">
    {label}
  </span>
);

const PhoneMockup = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState("menu");
  const tabs = [
    { id: "menu", label: t.tech.tabs.menu },
    { id: "order", label: t.tech.tabs.order },
    { id: "split", label: t.tech.tabs.split },
  ];

  return (
    <div data-testid="phone-mockup" className="relative mx-auto w-[290px] rounded-[2.8rem] border border-white/15 bg-[#0d0d0f] p-2.5 shadow-[0_40px_120px_-30px_rgba(255,255,255,0.25)]">
      <div className="relative h-[580px] overflow-hidden rounded-[2.3rem] bg-[#08080a]">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

        <div className="flex h-full flex-col px-4 pb-4 pt-9">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">Lachen · NFC</p>
              <p className="mt-0.5 text-sm font-semibold text-white">{t.tech.table}</p>
            </div>
            <DemoBadge label={t.tech.demo} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {tabs.map((tb) => (
              <button
                key={tb.id}
                data-testid={`phone-tab-${tb.id}`}
                onClick={() => setTab(tb.id)}
                className={`rounded-full px-2 py-1.5 text-[11px] font-medium transition-colors ${
                  tab === tb.id ? "bg-white text-black" : "text-zinc-400"
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex-1 overflow-hidden">
            {tab === "menu" && (
              <div data-testid="phone-panel-menu" className="flex h-full flex-col gap-2">
                {t.tech.menuItems.map((m) => (
                  <div key={m.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-semibold text-white">{m.name}</p>
                      <p className="font-mono text-xs text-zinc-300">{m.price}</p>
                    </div>
                    <p className="mt-1 text-[11px] leading-snug text-zinc-500">{m.desc}</p>
                  </div>
                ))}
                <button data-testid="phone-send-order" className="mt-auto rounded-full bg-white py-2.5 text-xs font-semibold text-black">
                  {t.tech.sendOrder}
                </button>
              </div>
            )}

            {tab === "order" && (
              <div data-testid="phone-panel-order" className="flex h-full flex-col gap-2">
                {t.tech.orderItems.map((o) => (
                  <div key={o.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex items-center gap-2.5">
                      <ReceiptText size={15} className="text-zinc-400" />
                      <p className="text-[13px] font-medium text-white">{o.name}</p>
                    </div>
                    <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-zinc-300">{o.status}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "split" && (
              <div data-testid="phone-panel-split" className="flex h-full flex-col gap-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
                  <p className="text-[11px] text-zinc-500">{t.tech.total} · {t.tech.people}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">₺1.420</p>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      {i === 1 ? (
                        <CircleDollarSign size={15} className="text-zinc-500" />
                      ) : (
                        <CircleDollarSign size={15} className="text-white" />
                      )}
                      <p className="text-xs text-zinc-300">{t.tech.guest} {i} · ₺355</p>
                    </div>
                    <button
                      data-testid={`phone-pay-guest-${i}`}
                      className={`rounded-full px-3.5 py-1 text-[10px] font-semibold ${
                        i === 1 ? "border border-white/15 text-zinc-400" : "bg-white text-black"
                      }`}
                    >
                      {i === 1 ? t.tech.paid : t.tech.pay}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardMockup = () => {
  const { t } = useLanguage();
  return (
    <div data-testid="dashboard-mockup" className="rounded-3xl border border-white/10 bg-[#0a0a0c] p-6 sm:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <h4 className="font-display text-lg font-semibold text-white sm:text-xl">{t.tech.dashTitle}</h4>
        </div>
        <DemoBadge label={t.tech.demo} />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {t.tech.stats.map((s, i) => (
          <div key={s.label} data-testid={`dashboard-stat-${i}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{s.label}</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="font-display text-3xl font-bold text-white">{s.value}</p>
              <DemoBadge label={t.tech.demo} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div data-testid="dashboard-chart-scans" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-3">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{t.tech.scanChart}</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SCAN_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="scanFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="h" tick={{ fill: "#71717a", fontSize: 10 }} stroke="rgba(255,255,255,0.15)" />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} stroke="rgba(255,255,255,0.15)" />
                <Tooltip contentStyle={DEMO_TOOLTIP} cursor={{ stroke: "rgba(255,255,255,0.3)" }} />
                <Area type="monotone" dataKey="v" stroke="#ffffff" strokeWidth={2} fill="url(#scanFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div data-testid="dashboard-chart-items" className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:col-span-2">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{t.tech.itemChart}</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ITEM_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -22 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="n" tick={{ fill: "#71717a", fontSize: 10 }} stroke="rgba(255,255,255,0.15)" />
                <YAxis tick={{ fill: "#71717a", fontSize: 10 }} stroke="rgba(255,255,255,0.15)" />
                <Tooltip contentStyle={DEMO_TOOLTIP} cursor={{ fill: "rgba(255,255,255,0.06)" }} />
                <Bar dataKey="v" fill="#ffffff" radius={[6, 6, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Technology = () => {
  const { t } = useLanguage();
  return (
    <section id="teknoloji" data-testid="technology" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-10 max-w-3xl md:mb-16">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{t.tech.eyebrow}</p>
            <h2 data-testid="technology-title" className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t.tech.title}
            </h2>
            <p data-testid="technology-desc" className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t.tech.desc}
            </p>
            <p
              data-testid="technology-disclaimer"
              className="mt-6 flex items-start gap-2 rounded-2xl border border-amber-400/25 bg-amber-400/5 px-4 py-3 text-xs leading-relaxed text-amber-200/90 sm:text-sm"
            >
              <Info size={15} className="mt-0.5 shrink-0" />
              {t.tech.disclaimer}
            </p>
          </div>
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div
              data-testid="tech-photo-frame"
              className="absolute -inset-4 -z-0 overflow-hidden rounded-[2.5rem] sm:-inset-8"
            >
              <img
                src="https://images.unsplash.com/photo-1703793578040-07e1778b6b2c?crop=entropy&cs=srgb&fm=jpg&q=80"
                alt=""
                className="h-full w-full object-cover opacity-50"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/80" />
            </div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 py-8"
            >
              <PhoneMockup />
            </motion.div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <h3 data-testid="tech-feature-title" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {t.tech.featureTitle}
              </h3>
            </Reveal>
            <div className="mt-8 flex flex-col">
              {t.tech.features.map((f, i) => (
                <Reveal key={f} delay={0.1 + i * 0.08}>
                  <div
                    data-testid={`tech-feature-${i}`}
                    className="flex items-start gap-4 border-t border-white/10 py-5 last:border-b"
                  >
                    <span className="font-mono text-xs text-zinc-500">0{i + 1}</span>
                    <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">{f}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-20 md:mt-28">
          <DashboardMockup />
        </Reveal>
      </div>
    </section>
  );
};

export default Technology;
