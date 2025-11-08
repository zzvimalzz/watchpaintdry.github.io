let startTime = Date.now();
let timerInterval;

function updateTimer() {
    const elapsed = Date.now() - startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    const display = document.getElementById('timerDisplay');
    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

timerInterval = setInterval(updateTimer, 100);

const audio = document.getElementById('ambienceAudio');
const audioToggle = document.getElementById('audioToggle');
let isPlaying = false; 
let audioInitialized = false;

audioToggle.classList.add('muted');

audio.addEventListener('play', () => {
    isPlaying = true;
    audioInitialized = true;
    audioToggle.classList.remove('muted');
    console.log('Audio started playing');
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    audioToggle.classList.add('muted');
    console.log('Audio paused');
});

audio.addEventListener('error', (e) => {
    isPlaying = false;
    audioToggle.classList.add('muted');
    console.error('Audio error:', e);
    console.error('Audio cannot load. Google Drive links often don\'t work for streaming.');
});

audio.addEventListener('loadeddata', () => {
    console.log('Audio loaded successfully');
});

function tryPlayAudio() {
    if (!audioInitialized) {
        audio.play().then(() => {
            console.log('Audio play successful');
        }).catch((error) => {
            isPlaying = false;
            audioToggle.classList.add('muted');
            console.error('Audio play failed:', error);
        });
    }
}

document.addEventListener('click', tryPlayAudio, { once: true });
document.addEventListener('touchstart', tryPlayAudio, { once: true });

audioToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        audioToggle.classList.add('muted');
    } else {
        audio.play().then(() => {
            isPlaying = true;
            audioToggle.classList.remove('muted');
        }).catch(() => {
            isPlaying = false;
            audioToggle.classList.add('muted');
        });
    }
});

const paintWall = document.getElementById('paintWall');
const message = document.getElementById('message');
let messageTimeout;

function showMessage() {
    if (messageTimeout) {
        clearTimeout(messageTimeout);
    }
    
    message.classList.add('show');
    
    messageTimeout = setTimeout(() => {
        message.classList.remove('show');
    }, 2000);
}

paintWall.addEventListener('click', showMessage);

paintWall.addEventListener('touchstart', (e) => {
    e.preventDefault();
    showMessage();
});

paintWall.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showMessage();
});

updateTimer();
