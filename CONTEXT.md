# UI Reference Bank glossary

## Viewer shell

Cloudflare Pages'te yayınlanan, katalog verisini gösteren statik arayüz. Yalnızca arayüzün tasarımı veya çalışma mantığı değiştiğinde yeniden deploy edilir.

## Live catalog

`main` branch'indeki `catalog/catalog.json`, preview görselleri ve kaynak dosyalarından oluşan güncel component görünümü. Component eklenmesi live catalog'u günceller; viewer shell deployment'ı gerektirmez.

## Bundled preview

Viewer shell'in son deployment'ına derlenmiş interaktif component demosu. Yeni bir component, sonraki viewer shell deployment'ına kadar live catalog'da metadata, görsel ve kaynak kod olarak görünür; interaktif demo olarak görünmez.
