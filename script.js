'use strict';

const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");

let player = 0;
let currentScore = 0;
let playerScore = [0, 0];
let playing = true;

let switchPlayer = function () {
  document.getElementById(`current--${player}`).textContent = 0;
  document.querySelector(`.player--${player}`).classList.remove("player--active");
  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.add("player--active");
  currentScore = 0;
};

let reset = function () {
  playing = true;
  diceEl.classList.add("hidden");
  document.querySelector(`.player--${player}`).classList.remove("player--winner");
  player = 0;
  currentScore = 0;
  playerScore = [0, 0];
  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--1`).classList.remove("player--active");
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

};

reset();

btnRoll.addEventListener('click', function () {

  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    if (dice === 1) {
      switchPlayer();
    }
    else {
      currentScore += dice;
      document.getElementById(`current--${player}`).textContent = currentScore;
    }
  }

});

btnHold.addEventListener('click', function () {

  if (playing) {
    playerScore[player] += currentScore;

    document.getElementById(`score--${player}`).textContent = playerScore[player];

    if (playerScore[player] >= 100) { // game is finished
      playing = false; // to stop the game
      document.querySelector(`.player--${player}`).classList.add("player--winner");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
