import { useLanguage } from "@/context/LanguageContext";

export const Marquee = () => {
  const { t } = useLanguage();
  const items = t.marquee;

  const Sequence = ({ hidden }) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-8 font-mono text-sm uppercase tracking-[0.3em] text-zinc-400 sm:text-base">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </span>
      ))}
    </div>
  );

  return (
    <div data-testid="marquee" className="overflow-hidden border-y border-white/10 bg-[#08080a] py-5">
      <div className="flex w-max animate-marquee">
        <Sequence />
        <Sequence hidden />
      </div>
    </div>
  );
};

export default Marquee;
