/** next/font/google for bank previews: every family resolves to its CSS family name, system fallback. */
const font = (family: string) => () => ({ className: "", style: { fontFamily: `"${family}", sans-serif` }, variable: "" });

export default new Proxy({}, { get: (_, name) => font(String(name).replace(/_/g, " ")) });
export const Vazirmatn = font("Vazirmatn");
export const Outfit = font("Outfit");
export const Inter = font("Inter");
