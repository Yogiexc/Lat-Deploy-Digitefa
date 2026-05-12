const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint /health untuk versi Node.js
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'Node.js Express Server is running smoothly!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Route fallback untuk mengembalikan file index.html jika route tidak ditemukan
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Menjalankan server
app.listen(port, () => {
    console.log(`=============================================`);
    console.log(`🚀 Digitefa Deploy App berjalan!`);
    console.log(`👉 Akses web lokal: http://localhost:${port}`);
    console.log(`🩺 Health check   : http://localhost:${port}/health`);
    console.log(`=============================================`);
});
