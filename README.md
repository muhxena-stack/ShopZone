# Link Pengumpulan Tugas 
## 🎞️ Presentasi Proyek

> Lihat ringkasan visual interaktif dari proyek ini di **Gamma** — lengkap dengan tampilan modern, animasi, dan penjelasan langkah demi langkah.

<p align="center">
  <a href="https://gamma.app/docs/Presentasi-Proyek-Akhir-Reactjs-f96ilptrmirpsc5?mode=present#card-0pckpvbv9821utk" target="_blank">
    <img src="https://img.shields.io/badge/🎥%20Lihat%20Presentasi%20di%20Gamma-00BFA6?style=for-the-badge&logo=slideshare&logoColor=white" alt="Lihat Presentasi di Gamma"/>
  </a>
</p>

---

## 🎬 Video Penjelasan

> Tonton video penjelasan proyek ini di YouTube untuk memahami alur kerja, fitur utama, dan implementasi teknis secara menyeluruh.

<p align="center">
  <a href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" target="_blank">
    <img src="https://img.shields.io/badge/▶️%20Tonton%20Video%20Penjelasan-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Tonton di YouTube"/>
  </a>
</p>

---

# 🛍️ ShopZone

**ShopZone** adalah aplikasi web e-commerce modern yang memungkinkan pengguna untuk menjelajahi, mencari, dan membeli berbagai produk.  
Aplikasi ini dibangun dengan fokus pada **pengalaman pengguna** yang bersih, responsif, dan intuitif.  
Dengan fitur-fitur seperti autentikasi pengguna dan manajemen produk untuk admin, ShopZone dirancang untuk menjadi platform belanja online yang efisien dan menyenangkan.

---

## ✨ Fitur Utama

### 👤 Autentikasi Pengguna
- Sistem login dan logout untuk mengelola akun pengguna serta memastikan sesi yang aman.

### 🛒 Galeri Produk
- Menampilkan daftar produk dengan gambar, nama, dan informasi singkat.  
- Mendukung pencarian dan filter untuk kemudahan eksplorasi produk.

### 📄 Detail Produk
- Halaman khusus setiap produk dengan deskripsi lengkap, harga, dan opsi pembelian.

### 🧑‍💼 Manajemen Produk (Admin)
- Admin dapat menambah, mengedit, dan menghapus produk melalui dashboard khusus.

### 📱 Desain Responsif
- Tampilan optimal di berbagai perangkat (desktop, tablet, mobile) menggunakan pendekatan **mobile-first**.

### 🌗 Peralihan Tema
- Mode **terang (light)** dan **gelap (dark)** untuk kenyamanan visual pengguna.

---

## 🧩 Teknologi yang Digunakan

### 🖥️ Frontend
- **React** — Library JavaScript untuk membangun antarmuka pengguna berbasis komponen.  
- **Vite** — Build tool modern dengan Hot Module Replacement (HMR) super cepat.  
- **TypeScript** — Superset JavaScript dengan dukungan tipe statis.  
- **Tailwind CSS** — Framework CSS utility-first untuk desain cepat dan konsisten.

### ⚙️ State Management
- **React Context API** — Untuk manajemen state global seperti autentikasi dan data produk.

---
## 📂 Struktur Folder

```bash
/src
│
├── /assets           # File statis seperti gambar dan ikon
│
├── /components       # Komponen React yang dapat digunakan kembali
│   ├── ErrorBoundary.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── ThemeSwitcher.tsx
│
├── /context          # Context API untuk manajemen state global
│   ├── AuthContext.tsx
│   └── ProductContext.tsx
│
├── /hooks            # Custom hooks untuk logika bersama
│   ├── useAuth.ts
│   └── useProducts.ts
│
├── /lib              # Utilitas, konfigurasi, dan fungsi pembantu
│   └── utils.ts
│
├── /pages            # Komponen halaman utama aplikasi (routing)
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── ProductDetail.tsx
│   └── Products.tsx
│
├── /types            # Definisi tipe TypeScript global dan interface
│   └── index.ts
│
├── App.css           # Styling global
├── App.tsx           # Komponen root aplikasi (router, provider)
├── index.css         # File CSS utama + konfigurasi Tailwind
└── main.tsx          # Entry point aplikasi + Context dan router
