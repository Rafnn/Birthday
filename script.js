// CONFIGURABLE VARIABLES
const CORRECT_PIN = "2109"; // PIN Passcode (Tanggal & Bulan Jadian: 21 Sept)
const myPhoneNumber = "62895338170753"; // Format 628...

const letterText = "Hallow Cintahh,\n\nMaacii yeahh udah hadir di hidupku dan bertahan sejauh ini. maacii jugaa udahh sabar sama aku seluas samudera, Kamu selalu jadi seseorang yang selalu bikin aku merasa dicintai.\n\nSelamat bertambah usia ya, sayang. Semoga doa doa kamu dikabulkan!";
let typewriterTimeout;

// DAFTAR SLIDE VIDEO
const videoList = [
    {
        src: "video/video1.mp4",
        caption: "MY BINI GUWEEHH"
    },
    {
        src: "video/video2.mp4",
        caption: "HAPPY ANNIVERSARY YYA SAYANGG"
    }
];

let currentVideoIndex = 0;
let wasMusicPlayingBeforeVideo = false;
let candleBlown = false;

// 1. PIN PASSCODE LOCK
let currentPin = "";

function pressKey(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        document.getElementById("pin-input").value = currentPin;
    }
}

function clearPin() {
    currentPin = "";
    document.getElementById("pin-input").value = "";
    document.getElementById("pin-error").innerText = "";
}

function checkPin() {
    if (currentPin === CORRECT_PIN) {
        document.getElementById('screen-lock').classList.remove('active');
        document.getElementById('screen-cover').classList.add('active');
    } else {
        document.getElementById("pin-error").innerText = "PIN salah, coba tanggal jadian!";
        clearPin();
    }
}

// 2. RELATIONSHIP COUNTER REALTIME
const startDate = new Date("2019-09-21T00:00:00");

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    if (diff < 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const dElem = document.getElementById("counter-days");
    const hElem = document.getElementById("counter-hours");
    const mElem = document.getElementById("counter-minutes");
    const sElem = document.getElementById("counter-seconds");

    if (dElem) dElem.innerText = days;
    if (hElem) hElem.innerText = hours;
    if (mElem) mElem.innerText = minutes;
    if (sElem) sElem.innerText = seconds;
}
setInterval(updateCounter, 1000);

// 3. FUNGSI TIUP LILIN INTERAKTIF
function blowCandle() {
    if (candleBlown) return;
    const flame = document.getElementById('flame');
    const hint = document.getElementById('candle-hint');
    
    if (flame) flame.classList.add('out');
    if (hint) hint.innerText = "YAYYYY LILINNYA MATII ";
    
    candleBlown = true;

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 }
        });
    }
}

// 4. LIGHTBOX ZOOM FOTO
function openLightbox(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    if (modal && modalImg) {
        modalImg.src = src;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 5. ANIMASI HATI MELAYANG
function createFallingHeart() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    
    const icons = ['❤️', '💖', '✨', '🌸', '💕'];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 8 + 12) + 'px';

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}
setInterval(createFallingHeart, 450);

// 6. TOGGLE MUSIK MANUAL
function toggleMusic() {
    const music = document.getElementById('music');
    const btn = document.getElementById('music-toggle-btn');
    if (!music) return;

    if (music.paused) {
        music.play().then(() => {
            if (btn) btn.textContent = '🎵';
        }).catch((err) => console.log("Error play music:", err));
    } else {
        music.pause();
        if (btn) btn.textContent = '🔇';
    }
}

// 7. BUKA DASHBOARD
function openDashboard() {
    const music = document.getElementById('music');
    const btn = document.getElementById('music-toggle-btn');
    
    if (music) {
        music.play().then(() => {
            if (btn) btn.textContent = '🎵';
        }).catch(() => console.log("Autoplay diblokir browser"));
    }

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    document.getElementById('screen-cover').classList.remove('active');
    document.getElementById('screen-dashboard').classList.add('active');
    updateCounter();
}

// 8. PINDAH HALAMAN DETAIL
function showPage(pageId) {
    document.getElementById('screen-dashboard').classList.remove('active');
    document.getElementById('page-' + pageId).classList.add('active');

    const music = document.getElementById('music');
    const btn = document.getElementById('music-toggle-btn');

    if (pageId === 'letter') {
        startTypewriter();
    } else if ((pageId === 'gift' || pageId === 'anniversary') && typeof confetti === 'function') {
        confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.5 }
        });
    } else if (pageId === 'video') {
        if (music && !music.paused) {
            wasMusicPlayingBeforeVideo = true;
            music.pause();
            if (btn) btn.textContent = '🔇';
        } else {
            wasMusicPlayingBeforeVideo = false;
        }
        updateVideoSlide();
    }
}

// 9. TYPEWRITER EFFECT
function startTypewriter() {
    const target = document.getElementById('typewriter-text');
    if (!target) return;

    target.textContent = "";
    clearTimeout(typewriterTimeout);

    let i = 0;
    function type() {
        if (i < letterText.length) {
            target.textContent += letterText.charAt(i);
            i++;
            typewriterTimeout = setTimeout(type, 40);
        }
    }
    type();
}

// 10. BALASAN WHATSAPP
function sendToWA() {
    const userText = document.getElementById("wa-message").value;

    if (!userText.trim()) {
        alert("Tulis pesannya dulu yaa!");
        return;
    }

    const encodedText = encodeURIComponent(`Hai! Aku udah baca websitenya:\n\n"${userText}"`);
    window.open(`https://wa.me/${myPhoneNumber}?text=${encodedText}`, '_blank');
}

// 11. SLIDER VIDEO
function updateVideoSlide() {
    const videoPlayer = document.getElementById('video-player');
    const videoCaption = document.getElementById('video-caption');
    const slideIndicator = document.getElementById('slide-indicator');

    if (!videoPlayer) return;

    videoPlayer.src = videoList[currentVideoIndex].src;
    videoCaption.innerText = videoList[currentVideoIndex].caption;
    slideIndicator.innerText = `${currentVideoIndex + 1} / ${videoList.length}`;
    videoPlayer.load();
}

function nextVideoSlide() {
    if (currentVideoIndex < videoList.length - 1) {
        currentVideoIndex++;
    } else {
        currentVideoIndex = 0;
    }
    updateVideoSlide();
}

function prevVideoSlide() {
    if (currentVideoIndex > 0) {
        currentVideoIndex--;
    } else {
        currentVideoIndex = videoList.length - 1;
    }
    updateVideoSlide();
}

// 12. KEMBALI KE DASHBOARD
function backToDashboard() {
    const pages = document.querySelectorAll('.page-detail');
    pages.forEach(page => page.classList.remove('active'));

    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
        videoPlayer.pause();
    }

    const music = document.getElementById('music');
    const btn = document.getElementById('music-toggle-btn');
    if (music && wasMusicPlayingBeforeVideo) {
        music.play().then(() => {
            if (btn) btn.textContent = '🎵';
        }).catch(() => {});
    }

    document.getElementById('screen-dashboard').classList.add('active');
}

// 13. PESAN RAHASIA ANNIVERSARY
const anniversaryMsgText = "Selamat anniversary ya, sayang. Nggak kerasa perjalanan yang kita mulai dari 21 September 2019 udah melangkah sejauh ini. Terima kasih udah selalu jadi tempat pulang paling nyaman, tempat aku bisa jadi diri sendiri tanpa rasa takut. Terima kasih buat semua sabar, tawa, dan perjuangan yang udah kita lewati bareng. Semoga langkah kita ke depannya makin terarah, makin kuat, dan selalu dipenuhi kebahagiaan. I love you, always.";

function showAnniversaryMessage() {
    showPage('anniversary-msg');
    
    const today = new Date();
    // Bulan 8 di JavaScript melambangkan September (0 = Jan, 8 = Sept)
    const is21Sept = (today.getDate() === 21 && today.getMonth() === 8);
    
    const statusElem = document.getElementById('anniv-lock-status');
    const textElem = document.getElementById('anniv-letter-text');

    if (is21Sept) {
        statusElem.innerText = "✨ Happy Anniversary Day! Surat ini terbuka sempurna hari ini! ✨";
    } else {
        statusElem.innerText = "🔒 Surat ini ditulis khusus untuk momen anniversary 21 September kita.";
    }

    textElem.innerText = anniversaryMsgText;

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 }
        });
    }
}