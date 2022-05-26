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

function updateTimer() {
  second = Number(second) - 1;
  timeDisplay.innerText = second;
  if (second === 0) {
    clearInterval(startIntervalId);
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

startTime.addEventListener(
  "click",
  () => {
    countDown();
    shuffleCards(shuffleArray, 12);
  },
  {
    once: true,
  }
);
resetTime.addEventListener("click", () => {
  resetTimer();
  shuffleCards(shuffleArray, 12);
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

function flipCard(event) {
  console.log(event.target);
  let clickedCard = event.target;
  if (clickedCard !== card1) {
    clickedCard.classList.add("flip");
    if (!card1) {
      return (card1 = clickedCard);
    }
    card2 = clickedCard;

    let card1Image = card1.querySelector("img"),
      card2Image = card2.querySelector("img");
    matchedCards(card1Image, card2Image);
  }
}
function matchedCards(image1, image2) {
  console.log(image1);
  console.log(image2);

  if (image1 === image2) {
    return console.log("Cards matched");
  }
  return console.log("Cards not matched");
}
cardFlipped.forEach((card) => {
  card.addEventListener("click", flipCard);
});
