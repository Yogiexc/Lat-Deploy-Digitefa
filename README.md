# Digitefa Deploy App 🚀

Aplikasi web sederhana ini dibuat sebagai tugas mata kuliah **Pengembangan Infrastruktur TI**. Aplikasi ini memiliki dua versi (HTML Static & Node.js Express) dan dirancang untuk di-deploy ke tiga provider hosting berbeda menggunakan **satu repositori GitHub yang sama**.

## 📁 Struktur Proyek & Fungsi File

- `public/` : Folder yang berisi versi **HTML Static**.
  - `index.html` : Halaman utama antarmuka web.
  - `style.css` : File CSS untuk desain modern dan responsif (Glassmorphism).
  - `script.js` : Logika klien untuk memanggil API backend.
- `server.js` : Versi **Node.js Express** (Backend) yang memiliki endpoint `/health` dan menyajikan folder `public`.
- `package.json` : Konfigurasi dependensi Node.js.
- `vercel.json` : File konfigurasi agar Vercel mengeksekusi `server.js` sebagai fungsi Serverless.
- `netlify.toml` : Konfigurasi untuk memberitahu Netlify agar mendeploy isi folder `public` saja.

## 💻 Cara Menjalankan Secara Lokal

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/USERNAME/digitefa-deploy-app.git
   cd digitefa-deploy-app
   ```
2. **Install dependensi Node.js:**
   ```bash
   npm install
   ```
3. **Jalankan server lokal:**
   ```bash
   npm start
   ```
4. Buka browser dan akses: `http://localhost:3000`

---

## ☁️ Step-by-Step Deployment

Karena kita menggunakan 1 repository untuk melayani kebutuhan statis dan dinamis, pendekatan kita adalah:

### 1. Vercel (Deploy Versi Node.js Express)
Vercel sangat optimal untuk Node.js dengan konfigurasi minimal.
- Login ke [Vercel](https://vercel.com).
- Klik **Add New Project**, lalu import repository GitHub ini.
- Vercel akan otomatis membaca file `vercel.json` dan `package.json`.
- Tidak perlu mengubah "Framework Preset" (biarkan *Other*).
- Klik **Deploy**.
- *Hasil: Aplikasi Node.js Anda berjalan, dan tombol "Cek API Health" akan berfungsi normal.*

### 2. Netlify (Deploy Versi HTML Static)
Netlify sangat optimal untuk web statis. Kita atur agar Netlify hanya membaca folder `public`.
- Login ke [Netlify](https://app.netlify.com).
- Klik **Add new site** -> **Import an existing project**.
- Pilih GitHub dan import repository ini.
- Netlify akan otomatis membaca konfigurasi `netlify.toml` yang menargetkan direktori `public/`.
- Klik **Deploy site**.
- *Hasil: Web statis berjalan sangat cepat.*

### 3. Cloudflare Pages (Deploy Versi HTML Static)
Cloudflare Pages sangat cepat dan merupakan standar industri untuk website statis tanpa perlu konfigurasi di repository.
- Login ke [Cloudflare Dashboard](https://dash.cloudflare.com) dan pilih menu **Workers & Pages**.
- Klik **Create application** lalu pilih tab **Pages**.
- Klik **Connect to Git** dan hubungkan akun GitHub Anda.
- Pilih repository proyek ini.
- Pada bagian *Build settings*, ubah *Build output directory* menjadi `public`.
- Klik **Save and Deploy**.
- *Hasil: Web statis berjalan di atas jaringan global Cloudflare.*

---

## 🔄 Penjelasan CI/CD Sederhana

**CI/CD (Continuous Integration / Continuous Deployment)** adalah praktik agar setiap kali kita mengubah kode, sistem secara otomatis mengujinya dan menaruhnya ke server (deploy).
Pada proyek ini, setiap kali Anda melakukan `git push` ke GitHub, ketiga provider di atas (Vercel, Netlify, Cloudflare) akan menyadari adanya perubahan dan secara otomatis mem-build serta mem-publish ulang website Anda tanpa Anda harus memindahkan file secara manual (FTP).

---

## 🌐 Cara Setup Custom Domain

Custom Domain digunakan agar web bisa diakses dengan nama profesional (misal: `www.digitefa-tugas.com`).
1. Beli domain di Registrar (Ex: Niagahoster, Hostinger).
2. Di dashboard hosting (Vercel/Netlify/Cloudflare), masuk ke menu **Domain Management** atau **Custom Domains**.
3. Tambahkan domain baru.
4. Provider akan memberikan **DNS Records** (biasanya tipe `A` Record atau `CNAME`).
5. Buka dashboard Registrar Domain Anda, masuk ke **DNS Zone Editor**.
6. Masukkan Record yang diberikan. Tunggu propagasi DNS (sekitar 5 menit - 24 jam).

---

## 🛠️ Panduan Testing Infrastruktur

Berikut adalah *command terminal* untuk menguji infrastruktur web yang sudah di-deploy (contoh kita gunakan domain Vercel `your-app.vercel.app`):

### 1. DNS Resolution Testing
Melihat alamat IP di balik nama domain.
**Menggunakan `nslookup` (Windows/Linux/Mac):**
```bash
nslookup your-app.vercel.app
```
**Menggunakan `dig` (Linux/Mac):**
```bash
dig your-app.vercel.app +short
```

### 2. Endpoint Testing
Mengecek respon HTTP dari backend Node.js.
**Menggunakan `curl`:**
```bash
curl -i https://your-app.vercel.app/health
```
*(Akan menampilkan HTTP/2 200 OK dan response JSON dari backend).*

### 3. SSL/TLS Verification
Memastikan sertifikat HTTPS aman dan valid.
**Menggunakan `openssl`:**
```bash
openssl s_client -connect your-app.vercel.app:443
```
*(Perhatikan baris "Certificate chain" dan "Verify return code: 0 (ok)").*

### 4. Latency / Performance Test
Mengecek waktu respon ping server.
```bash
ping your-app.vercel.app
```

---

## 📊 Perbandingan Provider Hosting

| Fitur | Vercel | Netlify | Cloudflare Pages |
|-------|--------|---------|------------------|
| **Fokus Utama** | Next.js, Node.js, Frontend | Web Statis, JAMstack | Web Statis, Keamanan & CDN |
| **Dukungan Node.js** | Sangat Baik (Native Serverless) | Baik (via Netlify Functions) | Tidak Ada (Hanya Statis) |
| **Kecepatan Deploy** | Sangat Cepat | Sangat Cepat | Sangat Cepat (Jaringan Cloudflare) |
| **Custom Domain** | Gratis & Mudah | Gratis & Mudah | Gratis & Terintegrasi SSL Cloudflare |
| **Kecocokan Proyek Ini**| ⭐⭐⭐⭐⭐ (Backend) | ⭐⭐⭐⭐ (Frontend) | ⭐⭐⭐⭐ (Frontend) |

### 🎯 Kesimpulan Provider Terbaik
Untuk aplikasi statis yang menginginkan jaringan CDN tercepat, **Cloudflare Pages** sangat unggul. **Netlify** memberikan *user experience* terbaik untuk pemula. Namun, untuk aplikasi *hybrid* atau yang membutuhkan Node.js API (seperti pada proyek ini), **Vercel** adalah provider terbaik karena kemampuannya membaca `server.js` sebagai fungsi *serverless* secara instan.
