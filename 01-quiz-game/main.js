// DOM element
const startScreen = document.getElementById("start-screen");
const mainScreen = document.getElementById("main-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestionsData = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];
let isPlayQuiz = false;
let numQues = 0;
let score = 0;
let quizQuestions = [...quizQuestionsData];

function setupQuiz() {
  numQues = 0;
  score = 0;
  quizQuestions.sort(() => Math.random() - 0.5);
}

// Start Screen
function startButtonHandler(event) {
  startScreen.classList.toggle("active");
  mainScreen.classList.toggle("active");
  setupQuiz();
  isPlayQuiz = true;
  updateScore();
  renderQuestion(numQues);
}
startButton.addEventListener("click", startButtonHandler);

// Main Screen
function renderQuestion(numQues) {
  questionText.textContent = quizQuestions[numQues].question;
  answersContainer.innerHTML = "";

  quizQuestions[numQues].answers.forEach((answer) => {
    console.log(answer);
    let answerBtn = document.createElement("button");
    answerBtn.classList.add("answers-btn", answer.correct);
    answerBtn.addEventListener("click", answersClickHandle);
    answerBtn.textContent = answer.text;
    answersContainer.appendChild(answerBtn);
  });
  updateQuizInfo();
  progressHandle(numQues, quizQuestions.length);
}
totalQuestionSpan.textContent = quizQuestions.length;

function answersClickHandle(event) {
  const buttonList = Array.from(document.querySelectorAll(".answers-btn"));
  if (event.target.classList.contains("true")) {
    event.target.classList.add("correct");
    buttonList.forEach((element) => {
      element.removeEventListener("click", answersClickHandle);
    });
    score += 1;
    updateScore();
    setTimeout(() => {
      isEnd(numQues);
      numQues += 1;
      renderQuestion(numQues);
    }, 1000);
  } else {
    event.target.classList.add("incorrect");
    buttonList.forEach((element) => {
      element.removeEventListener("click", answersClickHandle);
    });
    setTimeout(() => {
      isEnd(numQues);
      numQues += 1;
      renderQuestion(numQues);
    }, 1000);
  }
}

function isEnd(numQues) {
  if (numQues + 1 == quizQuestions.length) {
    mainScreen.classList.toggle("active");
    resultScreen.classList.toggle("active");
    endScreen();
  }
}

function updateQuizInfo() {
  currentQuestionSpan.textContent = numQues + 1;
}

function updateScore() {
  scoreSpan.textContent = score;
}
function progressHandle(num = 0, total) {
  currentProgress = Math.round(((num + 1) / total) * 100);
  progressBar.style.width = currentProgress + "%";
}
renderQuestion(numQues);
// Result Screen
function restartButtonHandle() {
  resultScreen.classList.toggle("active");
  startScreen.classList.toggle("active");
  isPlayQuiz = false;
}

restartButton.addEventListener("click", restartButtonHandle);

function endScreen() {
  let percentScore = score / quizQuestions.length;
  let message;
  if (percentScore >= 0.8) {
    message = "You are a winner";
  } else if (percentScore >= 0.5) {
    message = "Good job, man!";
  } else {
    message = "You need to learn more";
  }
  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;
  resultMessage.textContent = message;
}

// while (isPlayQuiz) {
//   ;
// }
