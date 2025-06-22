const userScore = document.querySelector(".userScore");
const computerScore = document.querySelector(".computerScore");

let userScoreCount = Number(localStorage.getItem("userScore")) || 0;
let computerScoreCount = Number(localStorage.getItem("computerScore")) || 0;

localStorage.setItem("userScore", userScoreCount);
localStorage.setItem("computerScore", computerScoreCount);

userScore.textContent = userScoreCount;
computerScore.textContent = computerScoreCount;

// Showing and hiding rules
const ruleBtn = document.querySelector(".ruleBtn");
const nextBtn = document.querySelector(".nextBtn");
const closeRulesBtn = document.querySelector(".closeRulesBtn");
const rulesBox = document.querySelector(".rulesBox");
ruleBtn.addEventListener("click", () => {
  rulesBox.classList.remove("hide");
});
closeRulesBtn.addEventListener("click", () => {
  rulesBox.classList.add("hide");
});

let userSelection = "";
let computerSelection = "";
let winner = "";
const choices = ["rock", "paper", "scissors"];
let onHurrayPage = false;

const rockBtn = document.querySelector(".rockButton");
const paperBtn = document.querySelector(".paperButton");
const scissorBtn = document.querySelector(".scissorButton");
const hurrayPage = document.querySelector(".hurrayPage");
const playAgainBtn = document.querySelector(".playAgainBtn");

const animateComputerSelection = document.querySelector(
  ".animateComputerSelection"
);
const animateUserSelection = document.querySelector(".animateUserSelection");

const choicesContainer = document.querySelector(".choicesContainer");
const resultsContainer = document.querySelector(".resultsContainer");
const resultMessage1 = document.querySelector(".resultMessage1");
const resultMessage2 = document.querySelector(".resultMessage2");
const userSelectedChoice = document.querySelector(".userSelectedChoice");
const computerSelectedChoice = document.querySelector(
  ".computerSelectedChoice"
);

function selectForComputer() {
  const randomIdx = Math.floor(Math.random() * 3);
  computerSelection = choices[randomIdx];
}

function decideWinner() {
  if (userSelection === computerSelection) {
    winner = "draw";
    return;
  }

  if (userSelection === "rock") {
    winner = computerSelection === "scissors" ? "user" : "computer";
  } else if (userSelection === "paper") {
    winner = computerSelection === "rock" ? "user" : "computer";
  } else if (userSelection === "scissors") {
    winner = computerSelection === "paper" ? "user" : "computer";
  }
}

function goToHurrayPage() {
  onHurrayPage = true;
  hurrayPage.classList.remove("remove");
  playAgainBtn.style.transform = "translateY(190px)";
  animateUserSelection.classList.add("hide");
  animateComputerSelection.classList.add("hide");
}

function handlePlayAgain() {
  if (onHurrayPage === true) {
    hurrayPage.classList.add("remove");
    playAgainBtn.style.transform = "";
    onHurrayPage = false;
  }
  userSelection = "";
  computerSelection = "";
  winner = "";
  userSelectedChoice.style.transform = "";
  computerSelectedChoice.style.transform = "";
  choicesContainer.classList.remove("remove");
  resultsContainer.classList.add("remove");
  resultMessage2.classList.remove("hide");
  playAgainBtn.textContent = "PLAY AGAIN";
  animateUserSelection.classList.add("hide");
  animateComputerSelection.classList.add("hide");
}

function showResults() {
  console.log(userSelection, computerSelection);
  choicesContainer.classList.add("remove");
  resultsContainer.classList.remove("remove");
  userSelectedChoice.innerHTML = `<i class="fas fa-hand-${userSelection}"></i>`;
  computerSelectedChoice.innerHTML = `<i class="fas fa-hand-${computerSelection}"></i>`;

  if (userSelection === "scissors") {
    userSelectedChoice.style.transform = "rotate(90deg)";
  }

  if (computerSelection === "scissors") {
    computerSelectedChoice.style.transform = "rotate(90deg)";
  }

  const userBorderColor =
    userSelection === "rock"
      ? "#0074b6"
      : userSelection === "paper"
      ? "#bd00ff"
      : "#ffa943";

  const computerBorderColor =
    computerSelection === "rock"
      ? "#0074b6"
      : computerSelection === "paper"
      ? "#bd00ff"
      : "#ffa943";

  userSelectedChoice.style.border = `10px solid ${userBorderColor}`;
  computerSelectedChoice.style.border = `10px solid ${computerBorderColor}`;

  if (winner === "user") {
    resultMessage1.textContent = "YOU WON";
    userScoreCount = Number(localStorage.getItem("userScore")) + 1;
    localStorage.setItem("userScore", userScoreCount);
    userScore.textContent = userScoreCount;
    nextBtn.classList.remove("hide-next");
    animateUserSelection.classList.remove("hide");
  } else if (winner === "computer") {
    resultMessage1.textContent = "YOU LOST";
    computerScoreCount = Number(localStorage.getItem("computerScore")) + 1;
    localStorage.setItem("computerScore", computerScoreCount);
    computerScore.textContent = computerScoreCount;
    animateComputerSelection.classList.remove("hide");
  } else {
    resultMessage2.classList.add("hide");
    resultMessage1.textContent = "TIE UP";
    playAgainBtn.textContent = "REPLAY";
  }
}

function proceedAfterUserSelection() {
  selectForComputer();
  decideWinner();
  showResults();
}

rockBtn.addEventListener("click", () => {
  userSelection = "rock";
  proceedAfterUserSelection();
});

paperBtn.addEventListener("click", () => {
  userSelection = "paper";
  proceedAfterUserSelection();
});

scissorBtn.addEventListener("click", () => {
  userSelection = "scissors";
  proceedAfterUserSelection();
});

playAgainBtn.addEventListener("click", () => {
  handlePlayAgain();
});

nextBtn.addEventListener("click", () => {
  goToHurrayPage();
});
