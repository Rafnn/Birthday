const letterText = "Hai Salfa Nadiyah,\n\nTerima kasih sudah hadir di hidupku dan bertahan sejauh ini. Kamu selalu jadi seseorang yang selalu bikin aku merasa dicintai.\n\nSelamat bertambah usia ya, sayang. Semoga tahun ini menjadi tahun terbaikmu!";
let typewriterTimeout;

// DAFTAR SLIDE VIDEO
const videoList = [
    {
        src: "video/video1.mp4",
        caption: "Video 1: Momen manis bareng Salfa ❤️"
    },
    {
        src: "video/video2.mp4",
        caption: "Video 2: Ucapan spesial buat kamu ✨"
    }
    // Kamu bisa menambah video3.mp4, video4.mp4, dst di sini
];

let currentVideoIndex = 0;

function openDashboard() {
    const music = document.getElementById('music');
    if (music) {
        music.play().catch(() => console.log("Autoplay diblokir browser"));
    }

    // Efek Konfeti Pesta
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    document.getElementById('screen-cover').classList.remove('active');
    document.getElementById('screen-dashboard').classList.add('active');
}

function showPage(pageId) {
    document.getElementById('screen-dashboard').classList.remove('active');
    document.getElementById('page-' + pageId).classList.add('active');

    if (pageId === 'letter') {
        startTypewriter();
    } else if (pageId === 'gift' && typeof confetti === 'function') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.5 }
        });
    } else if (pageId === 'video') {
        updateVideoSlide();
    }
}

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
        currentVideoIndex = 0; // Balik ke video pertama
    }
    updateVideoSlide();
}

function prevVideoSlide() {
    if (currentVideoIndex > 0) {
        currentVideoIndex--;
    } else {
        currentVideoIndex = videoList.length - 1; // Balik ke video terakhir
    }
    updateVideoSlide();
}

function backToDashboard() {
    const pages = document.querySelectorAll('.page-detail');
    pages.forEach(page => page.classList.remove('active'));

    // Pause video otomatis saat menutup halaman video
    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
        videoPlayer.pause();
    }

    document.getElementById('screen-dashboard').classList.add('active');
}