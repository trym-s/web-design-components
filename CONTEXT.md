# UI Reference Bank glossary

## Reference model

**Reference pool**:
İnsan tarafından küratörlüğü yapılan UI referanslarının ortak kaynağı. Showcase ve UI Bank skill
aynı havuzu farklı amaçlarla tüketir.
_Avoid_: Component library, package

**Reference**:
Belirli bir UI parçasının görünümünü, davranışını ve uygun kullanım bağlamını belgeleyen uyarlama
kanıtı. Hedef projeye doğrudan kurulan bir ürün bileşeni değildir.
_Avoid_: Production component, dependency

**Showcase**:
Reference pool'u insanların görsel olarak keşfetmesi ve incelemesi için sunan web deneyimi.
_Avoid_: Component library

**UI Bank skill**:
Hedef projenin arayüz ihtiyaçlarını çıkaran, bu ihtiyaçlara uygun referansları seçen ve seçilen
referansları hedef projeye uyarlayan agent iş akışı.
_Avoid_: Component installer

**Use when**:
Bir referansın çözdüğü kullanıcı ihtiyacını ve uygun olduğu ürün bağlamını açıklayan, insan
tarafından küratörlüğü yapılmış seçim ölçütü.
_Avoid_: Tagline, visual description

**Avoid when**:
Bir referansın benzer görünmesine rağmen seçilmemesi gereken ürün bağlamlarını açıklayan seçim
ölçütü.

**Choose over**:
Bir referansın yakın alternatiflerine hangi koşulda tercih edilmesi gerektiğini açıklayan ayrım.

**Provides**:
Bir referansın sunduğu gözlemlenebilir arayüz davranışları ve kabiliyetleri.

**Requires**:
Bir referansın uyarlanabilmesi için hedef projede karşılanması gereken teknik koşullar.

**Category**:
Bir referansın ne tür UI parçası olduğunu belirten birincil sınıf. Çözdüğü problem veya kullandığı
görsel teknik kategori değildir.

**Pending reference**:
Metadata'sı agent tarafından hazırlanmış fakat henüz insan kürasyonundan geçmemiş referans.
Showcase'te görülebilir ancak UI Bank skill tarafından seçilemez.

**Curated reference**:
Kategori ve seçim ölçütleri insan tarafından gözden geçirilmiş, UI Bank skill'in seçim havuzuna
dahil referans.

**UI requirement**:
Hedef projede karşılanacak tek bir arayüz ihtiyacı; kullanıcı amacı, bağlam, gerekli davranış,
kısıtlar ve sayfadaki rolüyle tanımlanır. Seçilen her referans en az bir UI requirement'a dayanır.

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
