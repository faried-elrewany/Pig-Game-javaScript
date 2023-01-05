"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// let currentScore = 0;
// let activePlayer = 0;
// let scores = [0, 0];
// let playing = true;
let scores, currentScore, activePlayer, playing;

const init = () => {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
const winnerPlayer = () => {
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  diceEl.classList.add("hidden");
};

//  rolling the dice
btnRoll.addEventListener("click", function () {
  // generating and display random roll
  if (playing) {
    const randomRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `imgs/dice-${randomRoll}.png`;
    diceEl.classList.remove("hidden");
    if (randomRoll !== 1) {
      currentScore += randomRoll;
      // console.log(activePlayer);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
// holding state
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] < 100) switchPlayer();
    else winnerPlayer();
  }
});
// reseting the game
btnNew.addEventListener("click", function () {
  init();
});
