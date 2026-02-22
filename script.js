const questions = [
  {
    question: "Which Language has automatic Garbage Collector?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 0
  },{ 
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Styling Syntax"
    ],
    answer: 1
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High-level Text Management Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Logic"
    ],
    answer: 0
  },
  {
    question: "What year was Java Created?",
    options: ["1996", "1995", "1994", "None of the above"],
    answer: 1
  },
  {
    question: "Which company developed c earlier?",
    options: ["Oracle", "Google", "Sun Microsystems", "IBM"],
    answer: 0
  },
  {
    question: "Which tag is used for JavaScript?",
    options: ["<java>", "<js>", "<script>", "<src>"],
    answer: 2
  }
];
const startBox = document.getElementById("start-box");
const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const timerEl = document.getElementById("timer");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");
let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timer;
function startQuiz() {
  score = 0;
  currentQuestion = 0;
  startBox.classList.add("hidden");
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
  alert("Let we Start the Quiz....⌚");
}
function loadQuestion() {
  clearInterval(timer);
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.addEventListener("click", () => selectOption(i));
    optionsEl.append(btn);
  });
  progressText.textContent = `Question ${currentQuestion + 1} / ${questions.length}`;
  progressFill.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;
  timeLeft = 20;
  timerEl.textContent = `⏰ ${timeLeft}s`;
  timer = setInterval(updateTimer, 1000);
}
function updateTimer() {
  timeLeft--;
  timerEl.textContent = `⏰ ${timeLeft}s`;
    if(timeLeft==4){
        alert("only 5 sec Try to answer...⚠️");
    }
  if (timeLeft <= 0) {
    clearInterval(timer);
    timerEl.textContent = "⏰ Time's Up!";
    setTimeout(goToNextQuestion, 1500);
  }
}
function selectOption(selected) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestion].answer;
  const allOptions = document.querySelectorAll(".option");
  if (selected === correctIndex) {
    score++;
  }
  allOptions[selected].classList.add("selected");
  allOptions.forEach(btn => btn.style.pointerEvents = "none");
  setTimeout(goToNextQuestion, 1500);
}
function goToNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}
function endQuiz() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent =
    `You scored ${score} / ${questions.length}`;
    alert("Quiz Ended... Thank you...!🙏");
}
restartBtn.addEventListener("click", startQuiz);
startBtn.addEventListener("click", startQuiz);
