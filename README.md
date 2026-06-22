# 💬 AskZone - Modern Soru-Cevap ve Topluluk Platformu

[![Next.js](https://img.shields.io/badge/Next.js-15%20%2F%20React%2019-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend%20as%20a%20Service-blueviolet?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

**AskZone**, kullanıcıların yazılım, teknoloji ve diledikleri herhangi bir konuda soru sorabildikleri, sorulan sorulara yanıt verebildikleri ve en yararlı içerikleri oylayabildikleri etkileşimli bir **Soru-Cevap (Q&A) Topluluk Platformudur**.

Modern web standartları ile geliştirilen platform; hızlı, güvenli ve esnek yapısıyla kullanıcıların bilgi paylaşımını en üst düzeye çıkarmayı hedefler.

---

## ✨ Öne Çıkan Özellikler

### 👤 1. Güvenli Oturum ve Kullanıcı Yönetimi
* **Supabase Auth Entegrasyonu:** Güvenli e-posta ve şifre tabanlı kayıt olma (Register) ve giriş yapma (Login) süreçleri.
* **Akıllı Oturum Durum Kontrolü:** Giriş yapmış kullanıcıların durumuna göre otomatik değişen Navbar/Header arayüzü ve oturum kapatma (Logout) özelliği.

### ❓ 2. Gelişmiş Soru Sorma ve Etiketleme Sistemi
* **Detaylı Soru Gönderimi:** Kullanıcıların başlık, detaylı açıklama ve etiketler ekleyerek soru sormalarını sağlayan gelişmiş form yapısı.
* **Formik & Yup Validasyonu:** Hatalı veya eksik girişleri engellemek adına başlıkta minimum 10, içerikte ise minimum 20 karakter sınırı gibi şema tabanlı doğrulama kontrolleri.
* **Akıllı Etiket Ayrıştırma:** Giriş yapılan etiketlerin (tags) boşluk veya virgül duyarlı olarak otomatik olarak temizlenmesi ve dizi (array) formatında veritabanına kaydedilmesi.

### 💬 3. Dinamik Cevap Sistemi
* **Detay Sayfasında Cevaplama:** Her sorunun kendi detay sayfasında kullanıcıların cevap yazabilmesini sağlayan interaktif alan.
* **Anlık Güncelleme:** Formik ve Yup destekli cevap girişlerinin ardından sayfayı yenilemeye gerek kalmadan cevapların listelenmesi.
* **Kronolojik Sıralama:** Gelen yanıtların en güncelden en eski bilgiye göre sıralı olarak sunulması.

### ⬆️ 4. Çift Yönlü Upvote (Oylama) Mekanizması
* **Esnek Oylama:** Kullanıcıların beğendikleri soruları veya en açıklayıcı buldukları cevapları yukarı yönlü oylayabilmesi.
* **Kullanıcı Başına Tek Oy:** Supabase veritabanı üzerindeki benzersiz anahtar kısıtlamaları (unique constraints) sayesinde, bir kullanıcının aynı soruya veya cevaba yalnızca bir kez oy verebilmesi (tekrar basıldığında oy geri alınır).

---

## 🛠️ Kullanılan Teknolojiler

Platform, en son modern web standartları ve performans odaklı kütüphaneler kullanılarak inşa edilmiştir:

* **Framework:** [Next.js](https://nextjs.org/) (v15) & [React](https://react.dev/) (v19) - *App Router yapısı ile optimize edilmiş sunucu ve istemci taraflı render işlemleri.*
* **Programlama Dili:** [TypeScript](https://www.typescriptlang.org/) - *Güvenli kod tabanı ve tip tanımlamaları.*
* **Veritabanı & Servisler:** [Supabase](https://supabase.com/) - *PostgreSQL veritabanı, Row Level Security (RLS) ve kimlik doğrulama.*
* **Stil:** [Tailwind CSS v4](https://tailwindcss.com/) - *Hızlı, hafif ve esnek arayüz tasarımı.*
* **Form Yönetimi:** [Formik](https://formik.org/) - *Form durumları ve gönderim işlemlerinin kolay yönetimi.*
* **Şema Validasyonu:** [Yup](https://github.com/jquense/yup) - *Form girişleri için güçlü ve esnek kurallar.*

---

## 📂 Proje Klasör Yapısı

```text
askzone/
├── app/                  # Next.js App Router sayfaları ve yönlendirmeleri
│   ├── ask/              # Yeni soru sorma sayfası
│   ├── favorites/        # Favori ilanlar/sorular sayfası (Geliştirilmeye açık şablon)
│   ├── login/            # Giriş yapma arayüzü
│   ├── profile/          # Kullanıcı profil sayfası (Geliştirilmeye açık şablon)
│   ├── questions/        # Dinamik soru detay sayfası ([id]/page.tsx)
│   ├── register/         # Kayıt olma arayüzü
│   ├── globals.css       # Global CSS stilleri ve Tailwind importları
│   └── page.tsx          # Soruların listelendiği ana akış (Homepage)
├── components/           # Yeniden kullanılabilir arayüz bileşenleri
│   ├── AnswersSection.tsx# Soruya yazılan cevaplar ve cevap gönderme formu
│   ├── AuthForm.tsx      # Giriş ve kayıt işlemlerini yürüten form bileşeni
│   ├── Header.tsx        # Navigasyon barı ve kullanıcı oturum kontrolü
│   ├── QuestionForm.tsx  # Yeni soru ekleme ve etiket yönetim formu
│   └── UpVoteButton.tsx  # Sorular ve cevaplar için oylama butonu
├── lib/                  # Veritabanı ve istemci bağlantı araçları
│   └── supabase.ts       # Supabase istemcisinin başlatıldığı dosya
