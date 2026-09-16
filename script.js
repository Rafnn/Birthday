// =========================================================
// CONFIGURABLE VARIABLES & TARGET TANGGAL
// =========================================================

// Terkunci otomatis sampai 21 September jam 00:00:00
const TARGET_DATE = new Date(new Date().getFullYear(), 8, 21, 0, 0, 0);

const myPhoneNumber = "62895338170753";

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


// =========================================================
// 0. LOGIKA HITUNG MUNDUR & UNLOCK TANGGAL
// =========================================================
function updateCountdown() {
    const now = new Date();
    const diff = TARGET_DATE - now;

    const dElem = document.getElementById("cd-days");
    const hElem = document.getElementById("cd-hours");
    const mElem = document.getElementById("cd-minutes");
    const sElem = document.getElementById("cd-seconds");
    const msgElem = document.getElementById("date-lock-msg");

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        if (dElem) dElem.innerText = days;
        if (hElem) hElem.innerText = hours;
        if (mElem) mElem.innerText = minutes;
        if (sElem) sElem.innerText = seconds;
    } else {
        if (dElem) dElem.innerText = 0;
        if (hElem) hElem.innerText = 0;
        if (mElem) mElem.innerText = 0;
        if (sElem) sElem.innerText = 0;
        if (msgElem) {
            msgElem.style.color = "#2e7d32";
            msgElem.innerText = "Masii di kuncii sabarr yyah cintaku";
        }
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

function tryOpenPinScreen() {
    const now = new Date();
    if (now < TARGET_DATE) {
        const msgElem = document.getElementById("date-lock-msg");
        if (msgElem) msgElem.innerText = "🔒 Masiii di kunci sabar yyahh cintaaku ❤️";
    } else {
        document.getElementById('screen-date-lock').classList.remove('active');
        document.getElementById('screen-lock').classList.add('active');
        shufflePuzzle(); // Mengacak puzzle saat layar puzzle terbuka
    }
}


// =========================================================
// 1. LOGIKA SLIDING PUZZLE (LOCK SCREEN)
// =========================================================
let puzzleTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function renderPuzzleBoard() {
    const board = document.getElementById('puzzle-board');
    if (!board) return;
    board.innerHTML = '';
    
    puzzleTiles.forEach((val, idx) => {
        const el = document.createElement('div');
        if (val === 8) {
            el.className = 'tile empty-tile';
        } else {
            el.className = 'tile';
            const row = Math.floor(val / 3);
            const col = val % 3;
            el.style.backgroundPosition = `-${col * 88}px -${row * 88}px`;
            
            // Angka pembantu urutan puzzle
            el.innerText = val + 1;
            el.style.color = '#fff';
            el.style.fontWeight = 'bold';
            el.style.fontSize = '18px';
            el.style.textShadow = '1px 1px 4px #000';
            el.style.display = 'flex';
            el.style.alignItems = 'flex-start';
            el.style.padding = '4px 8px';

            el.onclick = () => swapPuzzleTile(idx);
        }
        board.appendChild(el);
    });
}

function getValidPuzzleMoves(emptyIdx) {
    const moves = [];
    const row = Math.floor(emptyIdx / 3);
    const col = emptyIdx % 3;

    if (row > 0) moves.push(emptyIdx - 3);
    if (row < 2) moves.push(emptyIdx + 3);
    if (col > 0) moves.push(emptyIdx - 1);
    if (col < 2) moves.push(emptyIdx + 1);

    return moves;
}

function swapPuzzleTile(idx) {
    const emptyIdx = puzzleTiles.indexOf(8);
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;

    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;

    if (isAdjacent) {
        [puzzleTiles[idx], puzzleTiles[emptyIdx]] = [puzzleTiles[emptyIdx], puzzleTiles[idx]];
        renderPuzzleBoard();
        checkPuzzleWin();
    }
}

function checkPuzzleWin() {
    const isSolved = puzzleTiles.every((val, idx) => val === idx);
    if (isSolved) {
        setTimeout(() => {
            alert('Hore! Puzzle berhasil disusun! 🥳');
            forceOpen();
        }, 200);
    }
}

function shufflePuzzle() {
    for (let i = 0; i < 60; i++) {
        const emptyIdx = puzzleTiles.indexOf(8);
        const validMoves = getValidPuzzleMoves(emptyIdx);
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        [puzzleTiles[emptyIdx], puzzleTiles[randomMove]] = [puzzleTiles[randomMove], puzzleTiles[emptyIdx]];
    }
    renderPuzzleBoard();
}

// Fungsi skip jika puzzle dirasa terlalu sulit
function forceOpen() {
    const lockScr = document.getElementById('screen-lock');
    const coverScr = document.getElementById('screen-cover');
    if (lockScr) lockScr.classList.remove('active');
    if (coverScr) coverScr.classList.add('active');
}


// =========================================================
// 2. RELATIONSHIP COUNTER REALTIME
// =========================================================
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


// =========================================================
// 3. FUNGSI TIUP LILIN INTERAKTIF
// =========================================================
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


// =========================================================
// 4. LIGHTBOX ZOOM FOTO
// =========================================================
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


// =========================================================
// 5. ANIMASI HATI MELAYANG
// =========================================================
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


// =========================================================
// 6. TOGGLE MUSIK MANUAL
// =========================================================
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


// =========================================================
// 7. BUKA DASHBOARD
// =========================================================
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


// =========================================================
// 8. PINDAH HALAMAN DETAIL
// =========================================================
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


// =========================================================
// 9. TYPEWRITER EFFECT
// =========================================================
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


// =========================================================
// 10. BALASAN WHATSAPP
// =========================================================
function sendToWA() {
    const userText = document.getElementById("wa-message").value;

    if (!userText.trim()) {
        alert("Tulis pesannya dulu yaa!");
        return;
    }

    const encodedText = encodeURIComponent(`Hai! Aku udah baca websitenya:\n\n"${userText}"`);
    window.open(`https://wa.me/${myPhoneNumber}?text=${encodedText}`, '_blank');
}


// =========================================================
// 11. SLIDER VIDEO
// =========================================================
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


// =========================================================
// 12. KEMBALI KE DASHBOARD
// =========================================================
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


// =========================================================
// 13. PESAN RAHASIA ANNIVERSARY
// =========================================================
const anniversaryMsgText = "Selamat anniversary ya, sayang. Nggak kerasa perjalanan yang kita mulai dari 21 September 2019 udah melangkah sejauh ini. Terima kasih udah selalu jadi tempat pulang paling nyaman, tempat aku bisa jadi diri sendiri tanpa rasa takut. Terima kasih buat semua sabar, tawa, dan perjuangan yang udah kita lewati bareng. Semoga langkah kita ke depannya makin terarah, makin kuat, dan selalu dipenuhi kebahagiaan. I love you, always.";

function showAnniversaryMessage() {
    showPage('anniversary-msg');
    
    const today = new Date();
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

// Inisialisasi awal puzzle saat file dimuat
document.addEventListener('DOMContentLoaded', () => {
    shufflePuzzle();
});