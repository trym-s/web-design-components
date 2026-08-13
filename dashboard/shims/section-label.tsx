/* Shim — the vault page's small caption above each playground section. */
export function SectionLabel({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity: 0.55,
        padding: "2px 0",
      }}
    >
      {children}
    </div>
  );
}
export default SectionLabel;
