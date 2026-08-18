# UI Reference Bank glossary

## Viewer shell

Cloudflare Pages'te yayınlanan, katalog verisini gösteren statik arayüz. Production deploy'u
GitHub Actions'taki `deploy-viewer.yml` workflow'u yapar; Aletheia'daki `dist/` yalnızca eski bir
yerel build kopyasıdır. Viewer yalnızca arayüzün tasarımı, çalışma mantığı, build yapılandırması
veya bağımlılıkları değiştiğinde yeniden deploy edilir.

## Live catalog

`main` branch'indeki `catalog/catalog.json`, preview görselleri ve kaynak dosyalarından oluşan güncel
component görünümü. Viewer açılışta bunları GitHub Raw'dan çeker. Component eklenmesi live catalog'u
günceller; viewer shell deployment'ı gerektirmez.

## Bundled preview

Viewer shell'in son deployment'ına derlenmiş interaktif component demosu. Yeni bir component,
sonraki viewer shell deployment'ına kadar live catalog'da metadata, kaynak kod ve varsayılan olarak
statik preview ile görünür; interaktif demo olarak görünmez.
