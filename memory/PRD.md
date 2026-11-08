# Lachen & Co. — Kurumsal Tanıtım Sitesi

## Problem Statement
Lachen & Co. için modern, premium ve kurumsal şirket tanıtım sitesi. Tasarım octopuseffect.com'dan ilham alacak ancak özgün olacak: siyah-beyaz, şık, minimalist, teknolojik. Ana sayfada: (1) Giriş hero, (2) 4 hizmet kartı, (3) teknoloji tanıtımı (telefon menüsü + analiz paneli, demo veriler gerçekmiş gibi gösterilmeyecek), (4) iletişim formu (sadece tasarım), (5) footer. Uydurma müşteri yorumu/şirket bilgisi/başarı rakamı yok. Yüklenen logo resmi logo olarak üst menü + footer'da, orijinal tasarımı korunarak.

## User Choices (ask_human)
- Koyu tema (siyah zemin, beyaz tipografi)
- İletişim formu: sadece tasarım + başarı mesajı (e-posta/DB yok)
- Türkçe + İngilizce dil seçeneği
- Footer e-posta: info@lachen.co

## Architecture
- Frontend: React (CRA) + Tailwind + framer-motion + lenis + recharts, tek sayfa (routing yok), TR/EN LanguageContext (localStorage persist)
- Backend: template server.py dokunulmadan bırakıldı (sağlık kontrolü /api/ çalışıyor); form client-side only
- Logo: yüklenen webp'ten otomatik kırpılan /public/logo-wide.png (mix-blend-screen), favicon.svg NFC yay motifi

## Personas
- Restoran işletmecisi: hizmetleri ve ürün arayüzlerini inceleyip iletişime geçen karar verici
- Lachen & Co. sahibi: TR/EN geçiş yapabilen, kurumsal ve premium sunum bekleyen site sahibi

## Core Requirements (static)
1. Hero: "Restoranların Geleceğini Birlikte Tasarlıyoruz." + 2 CTA
2. 4 hizmet kartı: NFC menü/sipariş/ayrı ödeme, NFC Google yorum + okutma istatistikleri, analiz paneli, yapay zekâ asistanı
3. Teknoloji: telefon menü mockup'ı (Menü/Sipariş/Hesap Böl sekmeleri) + analiz paneli (recharts), tüm metrikler DEMO etiketli
4. İletişim formu: ad, soyad, telefon, e-posta + gönder → başarı mesajı
5. Footer: logo, kısa açıklama, info@lachen.co
6. Yasak: uydurma yorum, şirket bilgisi, başarı rakamı

## Implemented (2026-10-15)
- Tüm bölümler; kinetic maskeli satır satır hero reveal, NFC dalga SVG + mouse parallax + scroll parallax, lenis smooth scroll, mono marquee, hover-invert hizmet kartları, interaktif telefon mockup'ı, recharts dashboard, çalışan TR/EN toggle, form success state, favicon, grain overlay
- Doğrulama: masaüstü (1440) + mobil (390) ekran görüntüleri, form submit + EN toggle testi, /api/ health, unsplash görsel 200, overflow-x yok

## İterasyon 2 (2026-10-24)
- İletişim: e-posta lachenebay@gmail.com olarak güncellendi; Telefon (+90 543 245 33 31), WhatsApp (wa.me/905432453331) ve Instagram (@lachencompany) bağlantıları eklendi; footer e-postası güncellendi
- Form artık gerçek: POST /api/contact → Emergent yönetimli Resend proxy'si → lachenebay@gmail.com (EMERGENT_EMAIL_KEY + EMAIL_FROM_NAME + EMAIL_REPLY_TO + CONTACT_EMAIL backend/.env'de); loading/success/error durumları eklendi
- Hakkımızda bölümü eklendi (#hakkimizda): kurumsal TR/EN metin + 3 sütun + kırpılmış atmosfer görseli
- Paketlerimiz bölümü eklendi (#paketler): Gold Paket + Bronz Paket kartları, taslak "Paket İçeriği" listeleri, fiyat yok, CTA iletişime kaydırıyor; içerik LanguageContext'te kolay düzenlenebilir
- Hero/display fontu Outfit → Sora (Turkish latin-ext tam destek), outline satır stroke'u 2px'e çıkarıldı
- Nav + footer linklerine Hakkımızda ve Paketler eklendi
- Doğrulama: curl /api/contact {"status":"ok"}, mobil form e2e başarı ekranı, masaüstü+mobil ekran görüntüleri, overflow yok

## İterasyon 3 (2026-11-08)
- Hero eyebrow + footer tagline "Yapay Zeka NFC Teknolojileri" olarak güncellendi; display fontu Space Grotesk'e çevrildi (Türkçe karakter uyumlu)
- Hakkımızda sol alanı 4 görsellik otomatik + manuel (ok/nokta) slider oldu: Gemini Nano Banana ile üretilen pleksi kafe sahnesi (ürün birebir korunarak), kullanıcının 2 pleksi fotoğrafı (orijinal, /public/images/plexi-1,2.webp), Gemini ile üretilen NFC teknoloji görseli
- Yeni bölüm "Hizmet Verdiğimiz İşletmeler" (#isletmeler): Restoran & Lokantalar, Kafe & Bistro, Kahve & Hızlı Servis — 3 eşit kart, siyah-beyaz, lucide ikonlar
- Teknoloji bölümü 2. maddesi: "Masadan toplu sipariş, kolay hesap paylaşımı ve hızlı ödeme deneyimi."
- Paketler: Bronz/Temel İşletme, Silver/Profesyonel İşletme (En Çok Tercih Edilen, vurgulu), Gold/Premium İşletme — tam özellik listeleri, sabit 560px kart + özellik alanında dikey scroll, yeni açıklama metni
- İletişim: tüm e-postalar lachen.co@outlook.com (contact links, footer, backend CONTACT_EMAIL/REPLY_TO); forma opsiyonel "Mesajınız" textarea alanı eklendi, backend modeli güncellendi
- Footer: açıklama kaldırıldı; sol: logo + Keşfet linkleri, sağ: e-posta (mailto) + Instagram (@lachencompany)
- Bilinen durum: e-posta gönderimi teknik olarak hazır ve uç çalışıyor; ancak Universal Key bakiyesi yetersiz (402 insufficient_credits) — form ziyaretçiye nazik hata mesajı gösteriyor, kredi eklenince otomatik çalışır

## Backlog / P0-P2
- P1: Formun MongoDB'ye kaydı + admin paneli (kullanıcı istediğinde)
- P1: Gerçek e-posta gönderimi (Resend playbook)
- P2: Blog/referans sayfaları, canlı demo talebi akışı

## Next Tasks
- Form verilerinin kaydı (kullanıcı onayı ile)
- Gerçek iletişim bilgileri geldiğinde footer/meta güncellemesi
