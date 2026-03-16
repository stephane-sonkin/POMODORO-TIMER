let timeleft = 25 * 60; 25 // 25 minutes in seconds
let isRunning = false;
let isWorking = true;
let session = 0;
let timerInterval;

function startTimer() {
    isRunning = true;
    document.querySelector("#start-btn").disabled = true;
    document.querySelector("#pause-btn").disabled = false;
    timerInterval = setInterval(tick, 1000);
}
