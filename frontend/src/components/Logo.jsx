export const Logo = ({ className = "h-8 w-auto", testId = "logo" }) => (
  <img
    src="/logo-wide.png"
    alt="Lachen & Co."
    data-testid={testId}
    className={className}
    style={{ mixBlendMode: "screen" }}
    draggable={false}
  />
);

export default Logo;
