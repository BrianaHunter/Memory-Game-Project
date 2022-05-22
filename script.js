//the timer, per research is a dom function. it will be activated whent the start button is pushed.
//im still playing with research to get the function right, but it should be in js not html.
//I got it started for reference. :-)

const startTime = document.getElementById("StartButton");
const resetTime = document.getElementById("ResetButton");
const timeDisplay = document.getElementById("timeDisplay");
let second = timeDisplay.innerText;
let startIntervalId;

function updateTimer() {
  timeDisplay.innerText = 20;
  second = Number(second) - 1;
  timeDisplay.innerText = second;
}

function countDown() {
  setInterval(updateTimer, 1000);
}

startTime.addEventListener("click", countDown);
resetTime.addEventListener("click", countDown);
