/** geist/font/pixel for bank previews: the package wraps next/font/local, so load the same woff2 files with @font-face. */
import square from "/node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2?url";
import grid from "/node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Grid.woff2?url";
import circle from "/node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Circle.woff2?url";
import triangle from "/node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Triangle.woff2?url";
import line from "/node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Line.woff2?url";

const fallback = '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

function font(name: string, url: string) {
  const family = `Geist Pixel ${name}`;
  const slug = `geist-pixel-${name.toLowerCase()}`;
  const style = document.createElement("style");
  style.textContent = `@font-face{font-family:"${family}";src:url("${url}") format("woff2");font-weight:500;font-display:swap}
.font-${slug}{font-family:"${family}",${fallback}}
.var-${slug}{--font-${slug}:"${family}",${fallback}}`;
  document.head.append(style);
  return { className: `font-${slug}`, variable: `var-${slug}`, style: { fontFamily: `"${family}", ${fallback}` } };
}

export const GeistPixelSquare = font("Square", square);
export const GeistPixelGrid = font("Grid", grid);
export const GeistPixelCircle = font("Circle", circle);
export const GeistPixelTriangle = font("Triangle", triangle);
export const GeistPixelLine = font("Line", line);
