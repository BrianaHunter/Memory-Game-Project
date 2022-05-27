//the timer, per research is a dom function. it will be activated whent the start button is pushed.
//im still playing with research to get the function right, but it should be in js not html.
//I got it started for reference. :-)

const startTime = document.getElementById("StartButton");
const resetTime = document.getElementById("ResetButton");
const timeDisplay = document.getElementById("timeDisplay");
let second = timeDisplay.innerText;
let startIntervalId;
let shuffleArray = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
let imgTag = document.querySelectorAll(".fish-img");
let matchCount = 0;
const underTheSea = document.getElementById("underTheSea");
const victoryText = document.getElementById("victory-text");

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
  countDown();
}

startTime.addEventListener(
  "click",
  () => {
    countDown();
    shuffleCards(shuffleArray, 12);
    cardFlipped.forEach((card) => {
      card.addEventListener("click", flipCard);
    });
  },
  {
    once: true,
  }
);
resetTime.addEventListener("click", () => {
  resetTimer();
  shuffleCards(shuffleArray, 12);
  matchCount = 0;
  underTheSea.classList.remove("visible");
  victoryText.classList.remove("visible");
  cardFlipped.forEach((card) => {
    card.addEventListener("click", flipCard);
    card.classList.remove("flip");
    card.classList.remove("hidden");
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

const cardFlipped = document.querySelectorAll(".card");

let card1, card2;

function removePair() {
  card1.classList.add("hidden");
  card2.classList.add("hidden");
}

function flipCard(event) {
  console.log(event.target);
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
  }
}
function matchedCards(image1, image2) {
  console.log(image1);
  console.log(image2);
  console.log("card1", card1);
  if (image1 === image2) {
    const cardA = card1;
    const cardB = card2;

    setTimeout(() => {
      cardA.classList.remove("flip");
      cardB.classList.remove("flip");
      cardA.classList.add("hidden");
      cardB.classList.add("hidden");
    }, 1000);
    card1 = "";
    card2 = "";
    matchCount++;
    console.log(matchCount);
    if (matchCount === 6) {
      winGame();
    }
    return console.log("Cards matched");
  } else {
    const cardA = card1;
    const cardB = card2;

    setTimeout(() => {
      cardA.classList.remove("flip");
      cardB.classList.remove("flip");
    }, 1000);
    card1 = "";
    card2 = "";
    return console.log("Cards not matched");
  }
}
// cardFlipped.forEach((card) => {
//   card.addEventListener("click", flipCard);
// });

function gameOver() {
  clearInterval(startIntervalId);
  // this.audioController.gameOver();
  document.getElementById("underTheSea").classList.remove("hidden");
}

function winGame() {
  clearInterval(startIntervalId);
  victoryText.classList.remove("hidden");
}
