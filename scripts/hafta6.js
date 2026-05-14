// Toggles between tabs
function switchTab(tabId) {
    // Hide all apps
    document.getElementById('notApp').style.display = 'none';
    document.getElementById('birimApp').style.display = 'none';
    
    // Remove active class from buttons
    document.getElementById('btnNot').classList.remove('active');
    document.getElementById('btnBirim').classList.remove('active');
    
    // Show selected app
    document.getElementById(tabId).style.display = 'flex';
    
    // Set appropriate button as active
    if (tabId === 'notApp') {
        document.getElementById('btnNot').classList.add('active');
    } else {
        document.getElementById('btnBirim').classList.add('active');
    }
}

// ======================
// UYGULAMA 1: Not Hesaplama
// ======================
function formatAdSoyad(input) {
    var cursorPosition = input.selectionStart;
    
    var formatted = input.value.split(' ').map(function(kelime) {
        if (kelime.length === 0) return '';
        return kelime.charAt(0).toUpperCase() + kelime.slice(1).toLowerCase();
    }).join(' ');

    input.value = formatted;
    input.setSelectionRange(cursorPosition, cursorPosition);
}

function hesapla() {
    var adSoyadStr = document.getElementById('adSoyad').value.trim();
    var vizeStr = document.getElementById('vize').value.trim();
    var finalStr = document.getElementById('final').value.trim();

    if (!/^\d+$/.test(vizeStr) || !/^\d+$/.test(finalStr)) {
        alert("Lütfen notları ondalıklı girmeyin, sadece tam sayı olarak doldurunuz (örn: 60).");
        return;
    }

    var vize = parseInt(vizeStr, 10);
    var final = parseInt(finalStr, 10);

    if (!adSoyadStr || isNaN(vize) || isNaN(final)) {
        alert("Lütfen tüm alanları geçerli şekilde doldurunuz.");
        return;
    }

    if (vize < 0 || vize > 100 || final < 0 || final > 100) {
        alert("Lütfen notları 0 ile 100 arasında giriniz.");
        return;
    }

    var adSoyad = adSoyadStr.split(' ').map(function(kelime) {
        if (kelime.length === 0) return '';
        return kelime.charAt(0).toUpperCase() + kelime.slice(1).toLowerCase();
    }).join(' ');

    var ortalama = (vize * 0.4) + (final * 0.6);
    
    var harfNotu = "";
    if (ortalama >= 90) harfNotu = "AA";
    else if (ortalama >= 80) harfNotu = "BA";
    else if (ortalama >= 70) harfNotu = "BB";
    else if (ortalama >= 60) harfNotu = "CB"; 
    else if (ortalama >= 50) harfNotu = "CC";
    else harfNotu = "FF";

    var durum = (ortalama >= 50) ? "Geçti" : "Kaldı";

    document.getElementById('sonucAdSoyad').innerText = adSoyad;
    document.getElementById('sonucOrtalama').innerText = "Ortalama: " + ortalama.toFixed(2);
    document.getElementById('sonucHarf').innerText = "Harf Notu: " + harfNotu;
    document.getElementById('sonucDurum').innerText = "Durum: " + durum;

    var sonucAlani = document.getElementById('sonucAlani');
    if (sonucAlani) {
        sonucAlani.style.display = 'block';
    }
}

// ======================
// UYGULAMA 2: Birim Dönüştürücü
// ======================
if(document.getElementById('calculateBtn')) {
    document.getElementById('calculateBtn').addEventListener('click', function() {
        const inputValue = parseFloat(document.getElementById('inputValue').value);
        const conversionType = document.getElementById('conversionType').value;
        let result = 0;

        if (isNaN(inputValue)) {
            document.getElementById('resultText').textContent = 'Geçersiz değer';
            return;
        }

        switch (conversionType) {
            case 'm-km':
                result = inputValue / 1000;
                break;
            case 'c-f':
                result = (inputValue * 9/5) + 32;
                break;
            case 'kg-g':
                result = inputValue * 1000;
                break;
            default:
                result = 0;
                break;
        }

        document.getElementById('resultText').textContent = result.toLocaleString('tr-TR', { maximumFractionDigits: 3 });
    });
}