/** next/image for bank previews: an img that honors `fill`, width and height. */
import { forwardRef, type ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string | { src: string }; fill?: boolean; priority?: boolean; quality?: number; placeholder?: string; blurDataURL?: string; unoptimized?: boolean };

export default forwardRef<HTMLImageElement, Props>(function Image({ src, fill, priority, quality, placeholder, blurDataURL, unoptimized, style, ...rest }, ref) {
  const fillStyle = fill ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%" } : undefined;
  return <img ref={ref} src={typeof src === "string" ? src : src.src} style={{ ...fillStyle, ...style }} {...rest} />;
});
