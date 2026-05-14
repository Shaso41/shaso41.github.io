document.addEventListener('DOMContentLoaded', function() {
    // 1. TEMA DEĞİŞTİRME İŞLEMİ
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', function() {
        if (htmlElement.getAttribute('data-bs-theme') === 'light') {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            themeToggleBtn.textContent = 'Açık Temaya Geç';
            themeToggleBtn.classList.replace('btn-outline-secondary', 'btn-outline-light');
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            themeToggleBtn.textContent = 'Koyu Temaya Geç';
            themeToggleBtn.classList.replace('btn-outline-light', 'btn-outline-secondary');
        }
    });

    // 2. FORM DOĞRULAMA VE ÖZET OLUŞTURMA İŞLEMLERİ
    const kayitFormu = document.getElementById('kayitFormu');
    const alertArea = document.getElementById('alertArea');
    const defaultResultBox = document.getElementById('defaultResultBox');
    const summaryCardArea = document.getElementById('summaryCardArea');
    const summaryContent = document.getElementById('summaryContent');
    const temizleBtn = document.getElementById('temizleBtn');

    kayitFormu.addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfanın yenilenmesini engelle

        // Verileri çek
        const adSoyad = document.getElementById('adSoyad').value.trim();
        const email = document.getElementById('email').value.trim();
        const bolum = document.getElementById('bolum').value.trim();
        const sinif = document.getElementById('sinif').value;
        const mesaj = document.getElementById('mesaj').value.trim();
        const onay = document.getElementById('onay').checked;

        // Eksik alanları kontrol et
        if (!adSoyad || !email || !bolum || !sinif || !mesaj) {
            showAlert('Lütfen tüm alanları doldurunuz.', 'danger');
            return;
        }

        if (!onay) {
            showAlert('Lütfen bilgilerin kaydedilmesini onaylayın.', 'warning');
            return;
        }

        // Hata yoksa uyarıları temizle
        alertArea.innerHTML = '';

        // Özet Kartını Doldur
        summaryContent.innerHTML = `
            <h5 class="fw-bold text-success mb-3">Sayın ${adSoyad}, kaydınız alınmıştır.</h5>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Bölüm:</strong> ${bolum}</p>
            <p><strong>Sınıf:</strong> ${sinif}</p>
            <hr>
            <p><strong>Mesaj:</strong> <i>"${mesaj}"</i></p>
        `;

        // Görünümleri ayarla
        defaultResultBox.style.display = 'none';
        summaryCardArea.style.display = 'block';

        // Sayfayı aşağı kaydır
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
    });

    // Temizle butonuna basılınca eski haline döndür
    temizleBtn.addEventListener('click', function() {
        alertArea.innerHTML = '';
        defaultResultBox.style.display = 'block';
        summaryCardArea.style.display = 'none';
    });

    // Uyarı gösterme fonksiyonu
    function showAlert(message, type) {
        alertArea.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show rounded-3" role="alert">
                <strong>Hata!</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
});