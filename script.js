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
