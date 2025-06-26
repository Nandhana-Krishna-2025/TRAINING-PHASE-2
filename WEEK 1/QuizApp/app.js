let questions = [];

fetch('app.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    setupApp();
  });

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedAnswers = [];

function setupApp() {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const quizContainer = document.getElementById("quizContainer");
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");
  const timerEl = document.getElementById("timer");
  const questionCount = document.getElementById("questionCount");
  const resultOverlay = document.getElementById("resultOverlay");
  const summaryOverlay = document.getElementById("summaryOverlay");
  const summaryContent = document.getElementById("summaryContent");
  const scoreText = document.getElementById("scoreText");

  document.getElementById("startBtn").onclick = () => {
    welcomeScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
  };

  nextBtn.onclick = () => moveToNext();

  document.getElementById("restartBtn").onclick = restartQuiz;
  document.getElementById("restartFromSummaryBtn").onclick = restartQuiz;

  document.getElementById("summaryBtn").onclick = () => {
    resultOverlay.classList.add("hidden");
    summaryOverlay.classList.remove("hidden");
    renderSummary();
  };

  document.getElementById("closeSummaryBtn").onclick = () => {
    summaryOverlay.classList.add("hidden");
    resultOverlay.classList.remove("hidden");
  };

  function loadQuestion() {
    const q = questions[currentQuestion];
    questionCount.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
      const div = document.createElement("div");
      div.textContent = option;
      div.className = "bg-blue-100 hover:shadow-md cursor-pointer p-3 rounded text-center transition-all";
      div.onclick = () => selectOption(div, option);
      optionsEl.appendChild(div);
    });

    startTimer();
  }

  function selectOption(div, option) {
    selectedAnswers[currentQuestion] = option;
    [...optionsEl.children].forEach(child => {
      child.classList.remove("ring", "ring-blue-400");
    });
    div.classList.add("ring", "ring-blue-400");
  }

  function moveToNext() {
    clearInterval(timer);
    const correct = questions[currentQuestion].answer;
    if (selectedAnswers[currentQuestion] === correct) score++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function startTimer() {
    timeLeft = 15;
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        moveToNext();
      }
    }, 1000);
  }

  function showResult() {
  quizContainer.classList.add("hidden");
  resultOverlay.classList.remove("hidden");

  const total = questions.length;

  if (score === total) {
    scoreText.innerHTML = `<strong>Perfect ${score}/${total}!</strong><br>Well done, you're a quiz master!`;
  } else if (score > total / 2) {
    scoreText.innerHTML = ` You scored ${score}/${total}. Good job! Keep it up! `;
  } else {
    scoreText.innerHTML = `You scored only ${score}/${total}. Needs improvement try again!`;
  }
}



  function restartQuiz() {
    resultOverlay.classList.add("hidden");
    summaryOverlay.classList.add("hidden");
    quizContainer.classList.add("hidden");
    currentQuestion = 0;
    score = 0;
    selectedAnswers = [];
    welcomeScreen.classList.remove("hidden");
  }

  function renderSummary() {
    summaryContent.innerHTML = "";
    questions.forEach((q, index) => {
      const div = document.createElement("div");
      const isCorrect = q.answer === selectedAnswers[index];
      div.className = `p-3 rounded mb-2 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`;
      div.innerHTML = `
        <strong>Q${index + 1}:</strong> ${q.question}<br>
        <strong>Your Answer:</strong> ${selectedAnswers[index] || 'No answer'}<br>
        <strong>Correct Answer:</strong> ${q.answer}
      `;
      summaryContent.appendChild(div);
    });
  }
}
