# Script Presentasi: Digitefa Deploy App 🎤

**Durasi Estimasi:** 5-10 Menit  
**Target Audiens:** Dosen dan Mahasiswa Kelas Pengembangan Infrastruktur TI

---

## 1. Pembukaan (1 Menit)
**"Selamat [pagi/siang], Bapak/Ibu Dosen dan teman-teman semua."**
"Pada kesempatan kali ini, saya akan mempresentasikan hasil proyek untuk mata kuliah Pengembangan Infrastruktur TI."
"Proyek yang saya buat bernama **Digitefa Deploy App**. Tantangan utama dalam tugas ini adalah: Bagaimana kita bisa mengelola dua versi aplikasi—yaitu HTML Statis dan Node.js—menggunakan **hanya satu repositori GitHub**, lalu mendeploy-nya ke tiga platform cloud yang berbeda."

## 2. Struktur Arsitektur & Repositori (2 Menit)
"Untuk menjawab tantangan tersebut, saya menerapkan arsitektur folder yang efisien."
*(Tampilkan slide berisi struktur folder / Buka GitHub repo di layar)*
"Di *root directory*, terdapat file `server.js` yang bertindak sebagai backend Node.js Express. Di dalamnya ada endpoint API `/health` untuk keperluan testing infrastruktur."
"Kemudian, saya membuat folder khusus bernama `public/`. Folder ini memuat versi HTML Statis (Frontend) secara utuh, lengkap dengan gaya desain modern *Glassmorphism*."
"Pendekatan ini membuat proyek sangat *modular*. Saat dijalankan di lingkungan Node.js, server Express akan menyajikan folder `public`. Namun saat dilempar ke server penyedia web statis murni, folder `public` bisa diekstrak dan dibaca secara mandiri."

## 3. Strategi Multi-Deployment (2 Menit)
"Dengan satu arsitektur itu, saya telah berhasil mendistribusikan aplikasi ini ke 3 platform: Vercel, Netlify, dan GitHub Pages. Mari kita lihat teknis strateginya:"
1. **Vercel:** "Karena Vercel handal untuk Node.js, saya mendeploy versi *Fullstack* ke Vercel. Saya menggunakan konfigurasi `vercel.json` agar Vercel otomatis menjalankan `server.js` saya sebagai *serverless function*."
2. **Netlify:** "Platform Netlify saya optimalkan untuk menjalankan versi web statis. Dengan file `netlify.toml`, Netlify diinstruksikan untuk tidak menjalankan backend, melainkan langsung mem-publish isi folder `public/`."
3. **GitHub Pages:** "Untuk GitHub pages, saya menggunakan konsep otomatisasi modern yang disebut CI/CD."

## 4. Konsep CI/CD Sederhana (1 Menit)
"Berbicara tentang CI/CD (*Continuous Integration / Continuous Deployment*), saya telah menulis konfigurasi *GitHub Actions* di dalam folder `.github/workflows/deploy.yml`."
"Berkat otomatisasi ini, setiap kali saya menekan `git push` dari laptop saya, robot di server GitHub secara otomatis akan bekerja: mengekstrak folder `public/` saya dan mempublikasikannya langsung ke internet. Semua ini berjalan di belakang layar tanpa saya harus mengupload file secara manual lewat FTP layaknya infrastruktur tradisional."

## 5. Demonstrasi Testing Infrastruktur (2 Menit)
"Sebagai praktisi infrastruktur TI, kita harus bisa memastikan server berjalan dengan baik melalui command line. Saya akan mendemonstrasikan beberapa *command* fundamental terminal."
*(Jika live, buka terminal. Jika tidak, bacakan hasil di slide)*

- **Pertama, Endpoint Test dengan `curl`:** "Dengan perintah `curl -i [URL_VERCEL]/health`, kita bisa mem-ping backend. Jika sukses, server mengembalikan kode HTTP 200 OK beserta respons JSON."
- **Kedua, DNS Testing dengan `nslookup` & `dig`:** "Perintah `nslookup [URL_DOMAIN]` saya gunakan untuk memastikan bahwa DNS (Domain Name System) telah berhasil mentranslasi domain web kita menjadi alamat IP server secara global."
- **Ketiga, SSL Testing dengan `openssl`:** "Untuk keamanan komunikasi, perintah `openssl s_client -connect [URL]:443` memastikan bahwa platform cloud telah memasangkan sertifikat SSL dari Let's Encrypt dengan benar, menjamin situs kita dienkripsi dengan koneksi HTTPS yang valid."

## 6. Kesimpulan & Penutup (1 Menit)
"Kesimpulan dari analisis ketiga provider ini adalah: **Netlify** memberikan *user experience* terbaik dan tercepat untuk arsitektur web statis konvensional. Namun, untuk aplikasi dengan fungsionalitas kompleks yang membutuhkan API Node.js seperti pada web dinamis, **Vercel** adalah platform yang paling direkomendasikan."
"Demikian presentasi infrastruktur TI dari saya. Arsitektur yang baik bukan hanya tentang kode aplikasi yang jalan, tetapi juga kemudahan *deployment*, modularitas, dan otomatisasi. Terima kasih, apakah ada pertanyaan dari Bapak/Ibu Dosen atau teman-teman?"
