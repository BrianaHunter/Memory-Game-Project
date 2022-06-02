//the timer, per research is a dom function. it will be activated whent the start button is pushed.
//im still playing with research to get the function right, but it should be in js not html.
//I got it started for reference. :-)

const startTime = document.getElementById("StartButton");
const restart = document.querySelectorAll(".ResetButton");
const timeDisplay = document.getElementById("timeDisplay");
let second = timeDisplay.innerText;
let startIntervalId;
let shuffleArray = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
let imgTag = document.querySelectorAll(".fish-img");
let matchCount = 0;
let pairCount = 0;
const underTheSea = document.getElementById("underTheSea");
const victoryText = document.getElementById("victory-text");
const winMessage = document.getElementById("custom-win");
const winSeconds = document.getElementById("win-seconds");
const loseMessage = document.getElementById("custom-lose");
const cardFlipped = document.querySelectorAll(".card");

let card1, card2;

function playBubbles() {
  var audio = new Audio("mp3/Bubbles.mp3");
  audio.loop = true;
  audio.play();
}

function updateTimer() {
  second = Number(second) - 1;
  timeDisplay.innerText = second;
  if (second === 0) {
    clearInterval(startIntervalId);
    gameOver();
  }
}

function countDown() {
  clearInterval(startIntervalId);
  startIntervalId = setInterval(updateTimer, 1200);
}

function resetTimer() {
  timeDisplay.innerText = 20;
  second = 20;
  pairCount = 0;
  countDown();
}

startTime.addEventListener(
  "click",
  () => {
    countDown();
    playBubbles();
    shuffleCards(shuffleArray, 12);
    cardFlipped.forEach((card) => {
      card.addEventListener("click", flipCard);
    });
  },
  {
    once: true,
  }
);

restart.forEach((btn) => {
  btn.addEventListener("click", () => {
    resetTimer();
    shuffleCards(shuffleArray, 12);
    matchCount = 0;
    card1 = "";
    underTheSea.classList.remove("visible");
    victoryText.classList.remove("visible");
    cardFlipped.forEach((card) => {
      card.addEventListener("click", flipCard);
      card.classList.remove("flip");
      card.classList.remove("hidden");
    });
    underTheSea.classList.add("no-display");
    victoryText.classList.add("no-display");
  });
});

//Working on SHUFFLE functions

function shuffleCards(array, items) {
  const clonedArray = [...array];
  let randomArray = [];
  for (let i = 0; i <= items; i++) {
    let randomIndex = Math.floor(Math.random() * clonedArray.length);
    randomArray.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  for (let i = 0; i < randomArray.length - 1; i++) {
    imgTag[i].src = `images/img-${randomArray[i]}.png`;
  }
}

// trying to add images, an if statement,

function removePair() {
  card1.classList.add("hidden");
  card2.classList.add("hidden");
}

function flipCard(event) {
  let clickedCard = event.target;
  if (clickedCard !== card1) {
    clickedCard.classList.add("flip");
    if (!card1) {
      return (card1 = clickedCard);
    }
    card2 = clickedCard;
    let card1Image = card1.querySelector(".back-side img").src,
      card2Image = card2.querySelector(".back-side img").src;
    matchedCards(card1Image, card2Image);
    pairCount++;
  }
}
function matchedCards(image1, image2) {
  disableCardFlip();
  if (image1 === image2) {
    const cardA = card1;
    const cardB = card2;

    setTimeout(() => {
      cardA.classList.remove("flip");
      cardB.classList.remove("flip");
      cardA.classList.add("hidden");
      cardB.classList.add("hidden");
      enableCardFlip();
    }, 500);
    card1 = "";
    card2 = "";
    matchCount++;
    if (matchCount === 6) {
      winGame();
    }
  } else {
    const cardA = card1;
    const cardB = card2;
    setTimeout(() => {
      cardA.classList.remove("flip");
      cardB.classList.remove("flip");
      enableCardFlip();
    }, 500);
    card1 = "";
    card2 = "";
  }
}
// cardFlipped.forEach((card) => {
//   card.addEventListener("click", flipCard);
// });

function gameOver() {
  clearInterval(startIntervalId);
  // this.audioController.gameOver();
  cardFlipped.forEach((card) => {
    card.classList.remove("flip");
  });
  disableCardFlip();
  underTheSea.classList.remove("no-display");
  loseMessage.innerText = `Moves: ${pairCount}`;
}

function winGame() {
  clearInterval(startIntervalId);
  victoryText.classList.remove("no-display");
  winMessage.innerText = `Moves: ${pairCount}`;
  winSeconds.innerText = `Seconds remaining: ${second}`;
}

function enableCardFlip() {
  cardFlipped.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function disableCardFlip() {
  cardFlipped.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });
}
