// ===============================
// Global state
// ===============================

// Remaining time in seconds (default: 25 minutes)
let timeLeft = 25 * 60;

// Indicates whether the timer is currently running
let isRunning = false;

// true = work mode, false = break mode
let isWorkMode = true;

// Number of completed work sessions
let sessions = 0;

// Stores the interval ID for control (start/stop)
let timerInterval;


// ===============================
// Timer controls
// ===============================

// Starts the timer (prevents multiple intervals)
function startTimer() {
    if (isRunning) return;

    isRunning = true;

    document.querySelector("#start-btn").disabled = true;
    document.querySelector("#pause-btn").disabled = false;

    timerInterval = setInterval(tick, 1000);
}

// Pauses the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;

    document.querySelector("#start-btn").disabled = false;
    document.querySelector("#pause-btn").disabled = true;
}

// Resets timer, mode, and session count
function resetTimer() {
    clearInterval(timerInterval);

    isRunning = false;
    isWorkMode = true;
    timeLeft = 25 * 60;
    sessions = 0;

    document.querySelector("#sessions").textContent = sessions;
    document.querySelector("#start-btn").disabled = false;
    document.querySelector("#pause-btn").disabled = true;

    updateDisplay();
}


// ===============================
// Core logic
// ===============================

// Called every second to update the countdown
function tick() {
    timeLeft--;
    updateDisplay();

    // When time is up, switch mode and restart automatically
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        isRunning = false;

        playSound();
        switchMode();
        startTimer();
    }
}

// Switch between work and break modes
function switchMode() {
    isWorkMode = !isWorkMode;

    if (isWorkMode) {
        // Completed a full work cycle
        sessions++;
        document.querySelector("#sessions").textContent = sessions;
        timeLeft = 25 * 60;
    } else {
        timeLeft = 5 * 60;
    }

    updateDisplay();
}


// ===============================
// UI updates
// ===============================

// Updates the timer display and mode label
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const display = `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;

    document.querySelector("#timer").textContent = display;
    document.querySelector("#mode-label").textContent = isWorkMode ? "WORK" : "PAUSE";
}


// ===============================
// Utilities
// ===============================

// Plays a sound when a session ends (placeholder)
function playSound() {
    // Example: new Audio("ding.mp3").play();
}


// ===============================
// Initialization
// ===============================

// Initialize UI on page load
updateDisplay();