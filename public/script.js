document.addEventListener('DOMContentLoaded', () => {
    const btnCheckHealth = document.getElementById('btnCheckHealth');
    const healthResult = document.getElementById('healthResult');

    btnCheckHealth.addEventListener('click', async () => {
        try {
            // Memberikan efek loading
            btnCheckHealth.textContent = 'Mengecek API...';
            btnCheckHealth.disabled = true;
            healthResult.classList.add('hidden');

            // Memanggil endpoint /health backend
            const response = await fetch('/health');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Menampilkan hasil
            healthResult.classList.remove('hidden');
            healthResult.innerHTML = `
                <strong>Status:</strong> ${data.status} <br>
                <strong>Pesan:</strong> ${data.message} <br>
                <strong>Environment:</strong> ${data.environment} <br>
                <strong>Waktu:</strong> ${new Date(data.timestamp).toLocaleString('id-ID')}
            `;
            healthResult.style.color = '#a7f3d0'; // Hijau jika berhasil
            
        } catch (error) {
            console.error('Error fetching health check:', error);
            
            healthResult.classList.remove('hidden');
            healthResult.innerHTML = `
                <strong>Error:</strong> Gagal terhubung ke backend.<br>
                <small>Catatan: Jika pesan ini muncul, aplikasi saat ini sedang berjalan sebagai "Static HTML" murni (misalnya di Netlify atau GitHub Pages) yang tidak menjalankan server Node.js.</small>
            `;
            healthResult.style.color = '#fca5a5'; // Merah jika error
        } finally {
            // Mengembalikan tombol ke semula
            btnCheckHealth.textContent = 'Cek API Health';
            btnCheckHealth.disabled = false;
        }
    });
});
