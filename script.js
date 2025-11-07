// Timer functionality
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

// Start the timer
timerInterval = setInterval(updateTimer, 100);

// Message display functionality
const paintWall = document.getElementById('paintWall');
const message = document.getElementById('message');
let messageTimeout;

function showMessage() {
    // Clear any existing timeout
    if (messageTimeout) {
        clearTimeout(messageTimeout);
    }
    
    // Show the message
    message.classList.add('show');
    
    // Hide after 2 seconds
    messageTimeout = setTimeout(() => {
        message.classList.remove('show');
    }, 2000);
}

// Add click event listener
paintWall.addEventListener('click', showMessage);

// Add touch event for mobile devices
paintWall.addEventListener('touchstart', (e) => {
    e.preventDefault();
    showMessage();
});

// Prevent context menu on right-click
paintWall.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showMessage();
});

// Initial timer update
updateTimer();
