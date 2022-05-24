//the timer, per research is a dom function. it will be activated whent the start button is pushed.
//im still playing with research to get the function right, but it should be in js not html.
//I got it started for reference. :-)

const startTime = document.getElementById("StartButton");
const resetTime = document.getElementById("ResetButton");
const timeDisplay = document.getElementById("timeDisplay");
let second = timeDisplay.innerText;
let startIntervalId;

function updateTimer() {
  second = Number(second) - 1;
  timeDisplay.innerText = second;
  if (second === 0) {
    clearInterval(startIntervalId);
    startTime.removeEventListener("click", countDown);
  }
}

function countDown() {
  clearInterval(startIntervalId);
  startIntervalId = setInterval(updateTimer, 1000);
}

function resetTimer() {
  timeDisplay.innerText = 20;
  second = 20;
  countDown();
}

startTime.addEventListener("click", countDown);
resetTime.addEventListener("click", resetTimer);

// trying to add images, an if statement,

const cardFlipElement = document.querySelector(".card");

function flipCard(event) {
  let clickedCard = event.target;
  clickedCard.classList.add("flip");
}

cardFlipElement.forEach((card) => {
  card.addEventListener("click", flipCard);
});
