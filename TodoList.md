# Becca Giyim / TeeVogue Yeniden Yapılandırma TODO Listesi

## 1. Planlama ve Altyapı
- [ ] TeeVogue proje planındaki gereksinimleri Becca Giyim marka diline göre güncelle
- [ ] React Router yapılandırmasını Kadın/Erkek üst rotaları ve alt kategori parametreleriyle genişlet (`/kadin/:kategori`, `/erkek/:kategori`)
- [ ] Global kategori sözlüğü (`categoryMeta`) oluşturarak navigasyon, breadcrumb ve filtre bileşenlerinde yeniden kullan

## 2. Tasarım Sistemi ve Marka Kimliği
- [ ] Renk paleti: nötr arka plan, gece mavisi (#0F172A), vurgu bakır (#C4733C) – ThemeProvider'a ekle
- [ ] Tipografi: Başlıklar `Playfair Display`, gövde `Inter` – Google Fonts entegre et
- [ ] Logo/branding güncellemesi ve header'da kullanım
- [ ] Temel UI kit: buton varyantları, form elemanları, ürün kartı, badge/pill bileşenleri
- [ ] Global mikro animasyon kuralları (150ms ease) ve skeleton loader'lar

## 3. Sayfa ve Bileşen Geliştirme
### 3.1 Layout & Navigasyon
- [ ] Mega menü / üst navigasyon: Kadın, Erkek, kampanyalar, blog
- [ ] Mobil menü ve kategori pill kaydırma
- [ ] Sticky header + duyarlı footer

### 3.2 Ana Sayfa
- [ ] Hero: tam genişlik görsel/video, CTA butonları (Kadın/Erkek)
- [ ] Öne çıkan kategoriler (Kadın Takım, Kadın Dış Giyim, Erkek Dış Giyim vb.)
- [ ] Kampanya alanı + zaman sayacı
- [ ] Trend ürünler grid'i
- [ ] Müşteri yorumu slider'ı ve bülten aboneliği formu

### 3.3 Kategori & Ürün Listesi
- [ ] `/kadin` ve `/erkek` giriş sayfaları için kategori hero bileşeni
- [ ] Alt kategori sekmeleri/pill bileşeni
- [ ] Filtre paneli: beden, renk, fiyat aralığı, materyal
- [ ] Sıralama kontrolleri ve grid/list toggle
- [ ] Sonsuz kaydırma veya sayfalama

### 3.4 Ürün Detay
- [ ] Görsel galerisi (thumbnail + zoom)
- [ ] Beden/renk seçimi, stok bilgisi
- [ ] Ürün özellikleri sekmeleri (Açıklama, Bakım, İade)
- [ ] Benzer ürünler + tamamlayıcı kombin önerileri
- [ ] Yorumlar, puanlama, soru-cevap

### 3.5 Sepet & Ödeme Akışı
- [ ] Sepet sayfası: ürün listesi, miktar güncelleme, kupon alanı
- [ ] Ödeme adımları: teslimat, ödeme, doğrulama (çok adımlı form)
- [ ] Güvenli ödeme göstergeleri ve canlı destek CTA'sı

### 3.6 Kullanıcı Hesap Alanı
- [ ] Auth akışı (giriş/kayıt/şifre reset)
- [ ] Profil bilgileri, adres yönetimi, sipariş geçmişi, favoriler

## 4. Veri ve İş Mantığı
- [ ] Mock veri / JSON API kurarak ürünleri cinsiyet + kategori filtresiyle sun
- [ ] Axios servis katmanı ve hook'lar (`useProducts`, `useCart`)
- [ ] Sepet durumunu Context/Redux ile yönetin, localStorage senkronizasyonu
- [ ] Form doğrulamaları için React Hook Form şemaları (teslimat, ödeme, üyelik)

## 5. Backend Hazırlıkları (ileriki aşama)
- [ ] Node/Express API taslağı: ürün, kategori, kullanıcı, sipariş endpoint'leri
- [ ] Veritabanı şeması tasarımı ve ORM seçimi
- [ ] Admin paneli için temel route ve component planı

## 6. Test, Performans ve SEO
- [ ] Component ve page testleri (Testing Library)
- [ ] Entegrasyon testleri: ana kullanıcı akışları
- [ ] Performans optimizasyonu: lazy loading, code splitting, görsel optimizasyonu
- [ ] Lighthouse denetimi ve düzeltmeler
- [ ] SEO: meta etiketleri, yapılandırılmış veri, sitemap & robots.txt

## 7. Dağıtım
- [ ] Build pipeline (Vercel/Netlify)
- [ ] Ortam değişkenleri ve API anahtarları için .env stratejisi
- [ ] Alan adı yönlendirmesi, SSL, analytics ve hata izleme (Sentry vb.)

---
Bu liste tamamlandığında Becca Giyim için modern, tam fonksiyonel e-ticaret deneyimi elde edilecek. her başlık tamamlandığında checkbox işaretlenmelidir.
