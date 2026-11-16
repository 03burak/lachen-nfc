import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";

export const Logo = ({ className = "h-8 w-auto", testId = "logo" }) => {
  const ctx = useContext(LanguageContext);
  const custom = ctx?.content?.design?.images?.logo;
  const src = custom && custom.startsWith("/api/files/")
    ? `${process.env.REACT_APP_BACKEND_URL}${custom}`
    : "/logo-wide.png";
  return (
    <img
      src={src}
      alt="Lachen & Co."
      data-testid={testId}
      className={className}
      style={{ mixBlendMode: custom ? "normal" : "screen" }}
      draggable={false}
    />
  );
};

export default Logo;
