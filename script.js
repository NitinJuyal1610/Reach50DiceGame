"use strict";

const hold = document.querySelector(".hold");
const roll = document.querySelector(".roll");
const newgame = document.querySelector(".new_game");
const diceimg = document.querySelector(".dice");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const scores = document.querySelector(".score");
let currscr = 0;
let score = [0, 0];
let active = 0;
let progress = true;

const switchplayer = function () {
  if (progress) {
    currscr = 0;
    document.querySelector(`.current-score${active}`).textContent = currscr;
    active = active == 0 ? 1 : 0;
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
  }
};
//roling and changing state
roll.addEventListener("click", function () {
  if (progress) {
    const num = Math.trunc(Math.random() * 6 + 1);
    diceimg.classList.remove("hidden");
    diceimg.src = `dice images/dice${num}.png`;
    if (num != 1) {
      currscr += num;
      document.querySelector(`.current-score${active}`).textContent = currscr;
    } else {
      switchplayer();
    }
  }
});

//hold

hold.addEventListener("click", function () {
  if (progress) {
    //displaying score
    score[active] += currscr;
    currscr = 0;
    document.querySelector(`.score${active}`).textContent = score[active];
    //checking winner
    if (score[active] >= 50) {
      progress = false;
      document
        .querySelector(`.player${active + 1}`)
        .classList.toggle("playerwin");
      document.querySelector(`.winner${active}`).classList.toggle("hidden");
      diceimg.classList.add("hidden");
    } else {
      switchplayer();
    }
  }
});

newgame.addEventListener("click", function () {
  progress = true;
  scores.textContent = 0;
  document.querySelector(`.winner${active}`).classList.add("hidden");
  document.querySelector(".current-score0").textContent = 0;
  document.querySelector(".current-score1").textContent = 0;
  document.querySelector(`.player${active + 1}`).classList.remove("playerwin");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
});
