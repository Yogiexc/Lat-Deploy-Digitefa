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
- `.github/workflows/deploy.yml` : Konfigurasi **CI/CD** (GitHub Actions) untuk otomatis mendeploy folder `public` ke GitHub Pages.

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

### 3. GitHub Pages (Deploy Versi HTML Static via CI/CD)
Menggunakan fitur otomatisasi GitHub Actions.
- Buka repository di GitHub.
- Masuk ke tab **Settings** -> **Pages**.
- Pada bagian *Build and deployment*, ubah *Source* menjadi **GitHub Actions**.
- Konfigurasi `deploy.yml` sudah disiapkan di `.github/workflows/`. Setiap perubahan yang di-push ke branch `main` akan otomatis memicu deployment.
- Buka tab **Actions** untuk melihat proses *build* berjalan.
- *Hasil: Web statis bisa diakses di `https://USERNAME.github.io/digitefa-deploy-app/`.*

---

## 🔄 Penjelasan CI/CD Sederhana

**CI/CD (Continuous Integration / Continuous Deployment)** adalah praktik agar setiap kali kita mengubah kode, sistem secara otomatis mengujinya dan menaruhnya ke server (deploy).
Pada proyek ini, file `.github/workflows/deploy.yml` adalah contoh **CD (Continuous Deployment)** sederhana. Saat Anda melakukan `git push`, robot GitHub Actions akan menyalin folder `public/` dan mempublikasikannya ke GitHub Pages secara otomatis tanpa campur tangan manual.

---

## 🌐 Cara Setup Custom Domain

Custom Domain digunakan agar web bisa diakses dengan nama profesional (misal: `www.digitefa-tugas.com`).
1. Beli domain di Registrar (Ex: Niagahoster, Hostinger).
2. Di dashboard hosting (Vercel/Netlify), masuk ke menu **Domain Management**.
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

| Fitur | Vercel | Netlify | GitHub Pages |
|-------|--------|---------|--------------|
| **Fokus Utama** | Next.js, Node.js, Frontend | Web Statis, JAMstack | Web Statis, Dokumentasi |
| **Dukungan Node.js** | Sangat Baik (Native Serverless) | Baik (via Netlify Functions) | Tidak Ada (Hanya Statis) |
| **Kecepatan Deploy** | Sangat Cepat | Sangat Cepat | Sedang (Tergantung Actions) |
| **Custom Domain** | Gratis & Mudah | Gratis & Mudah | Gratis & Mudah |
| **SSL Otomatis** | Ya (Let's Encrypt) | Ya (Let's Encrypt) | Ya |
| **Kecocokan Proyek Ini**| ⭐⭐⭐⭐⭐ (Backend) | ⭐⭐⭐⭐ (Frontend) | ⭐⭐⭐ (Frontend) |

### 🎯 Kesimpulan Provider Terbaik
Untuk aplikasi yang hanya berupa HTML/CSS Statis, **Netlify** memberikan pengalaman paling mulus. Namun, untuk aplikasi hybrid atau yang membutuhkan Node.js API (seperti pada proyek ini), **Vercel** adalah provider terbaik karena kemampuannya membaca `server.js` sebagai fungsi *serverless* secara instan.
