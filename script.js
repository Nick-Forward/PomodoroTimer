// Get the HTML elements we need to interact with
const breakLengthEl = document.querySelector('#break-length');
const breakIncrementBtn = document.querySelector('#break-increment');
const breakDecrementBtn = document.querySelector('#break-decrement');

const sessionLengthEl = document.querySelector('#session-length');
const sessionIncrementBtn = document.querySelector('#session-increment');
const sessionDecrementBtn = document.querySelector('#session-decrement');

// Set the initial break and session times
let breakTime = 5;
let sessionTime = 25;
let timerInterval;
let timeLeft = 1500 // set timeLeft to sessionTime

// Update the UI with the initial times
breakLengthEl.textContent = breakTime;
sessionLengthEl.textContent = sessionTime;

// Add an event listener to the break increment button
breakIncrementBtn.addEventListener('click', () => {
  // Increment the break time by 1 minute (but not above 60 or below 1)
  if (breakTime < 60) {
    breakTime++;
    // Update the UI with the new break time
    breakLengthEl.textContent = breakTime;
  }
});

// Add an event listener to the break decrement button
breakDecrementBtn.addEventListener('click', () => {
  // Decrement the break time by 1 minute (but not below 1 or above 60)
  if (breakTime > 1) {
    breakTime--;
    // Update the UI with the new break time
    breakLengthEl.textContent = breakTime;
  }
});

// Add an event listener to the session increment button
sessionIncrementBtn.addEventListener('click', () => {
  // Increment the session time by 1 minute (but not above 60 or below 1)
  if (sessionTime < 60) {
    sessionTime++;
    // Update the UI with the new session time
    sessionLengthEl.textContent = sessionTime;
    // Reset the time left to the new session time
    timeLeft = sessionTime * 60;
    updateTimeLeft();
  }
});

// Add an event listener to the session decrement button
sessionDecrementBtn.addEventListener('click', () => {
  // Decrement the session time by 1 minute (but not below 1 or above 60)
  if (sessionTime > 1) {
    sessionTime--;
    // Update the UI with the new session time
    sessionLengthEl.textContent = sessionTime;
    // Reset the time left to the new session time
    timeLeft = sessionTime * 60;
    updateTimeLeft();
  }
  console.log(timeLeft);
});


// Format time in mm:ss format
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

function playBeep() {
  const beepSound = document.getElementById("beep");
  beepSound.play();
}


function handleCountdownEnd() {
  playBeep();
  if (document.getElementById("timer-label").textContent === "Session") {
    document.getElementById("timer-label").textContent = "Break";
    timeLeft = breakTime * 60;
  } else {
    document.getElementById("timer-label").textContent = "Session";
    timeLeft = sessionTime * 60;
  }
  updateTimeLeft();
}

  // Update time left in the HTML element
  function updateTimeLeft() {
    document.getElementById("time-left").textContent = formatTime(timeLeft);
    if (timeLeft < 0) {
      handleCountdownEnd();
    }
  }
  
  function startPauseTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    } else {
      timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < -1) {
          clearInterval(timerInterval);
          timerInterval = null;
          timeLeft = 0;
          handleCountdownEnd();
        }
        updateTimeLeft();
      }, 1000);
    }
  }

  // Add an event listener to the reset button
document.getElementById("reset").addEventListener("click", () => {
    // Stop any running timer
    clearInterval(timerInterval);
    timerInterval = null;
  
    // Reset break and session times to their initial values
    breakTime = 5;
    sessionTime = 25;
  
    // Update the UI with the initial times
    breakLengthEl.textContent = breakTime;
    sessionLengthEl.textContent = sessionTime;
  
    // Reset time left to its default state
    timeLeft = sessionTime * 60;
    updateTimeLeft();

    document.getElementById("timer-label").textContent = "Session";

    // Stop and rewind the audio element with id="beep"
    const beepSound = document.getElementById("beep");
    beepSound.pause();
    beepSound.currentTime = 0;

  });
  
  // Event listener for start/pause button click
  document.getElementById("start_stop").addEventListener("click", startPauseTimer);
  
  // Initialize time left display
  updateTimeLeft();