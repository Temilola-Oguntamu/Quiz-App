const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language",
    ],
    correct: 0,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Counter Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
      "Cascading Style Sheets",
    ],
    correct: 3,
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["String", "Boolean", "Float", "All of the above"],
    correct: 3,
  },
  {
    question: "What is the purpose of the 'let' keyword in JavaScript?",
    options: [
      "To declare a constant variable",
      "To declare a block-scoped variable",
      "To declare a global variable",
      "To declare a function",
    ],
    correct: 1,
  },
  {
    question:
      "What is the correct way to comment out multiple lines in JavaScript?",
    options: [
      "// This is a comment",
      "/* This is a comment */",
      "<!-- This is a comment -->",
      "# This is a comment",
    ],
    correct: 1,
  },
  {
    question:
      "Which method is used to add a new element at the end of an array in JavaScript?",
    options: ["append()", "push()", "add()", "insert()"],
    correct: 1,
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Interface",
      "Automated Programming Interface",
      "Application Process Integration",
    ],
    correct: 0,
  },
  {
    question: "Which event is triggered when a user clicks on an HTML element?",
    options: ["onchange", "onmouseclick", "onclick", "onselect"],
    correct: 2,
  },
  {
    question: "What does CSS Box Model consist of?",
    options: [
      "Margin, Border, Padding, Content",
      "Header, Body, Footer",
      "Div, Span, Paragraph",
      "HTML, CSS, JavaScript",
    ],
    correct: 0,
  },
  {
    question: "Which function is used to parse a JSON string in JavaScript?",
    options: ["parseJSON()", "stringify()", "JSON.parse()", "JSON.stringify()"],
    correct: 2,
  },
];

let currentQuestion = 0;
let score = 0;
const quizContainer = document.getElementById("quiz");
const introContainer = document.getElementById("intro-container");
const quizControlsContainer = document.querySelector(
  ".quiz-controls-container"
);

const quizTimeInSeconds = 300; // 5 minutes
let timer;

function startQuiz() {
  introContainer.style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  quizContainer.innerHTML = `
      <div class="question-number">Question ${currentQuestion + 1}</div>
        <h2>${currentQuizData.question}</h2>
        <div>
            ${currentQuizData.options
              .map(
                (option, index) => `
                <div>
                    <input type="radio" name="question${currentQuestion}" value="${index}">
                    <label>${option}</label>
                </div>`
              )
              .join("")}
        </div>
    `;
  document.getElementById("prevBtn").disabled = currentQuestion === 0;
}

function startTimer() {
  let timeRemaining = quizTimeInSeconds;

  function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    document.getElementById(
      "timer"
    ).innerText = `Time remaining: ${formattedTime}`;

    if (timeRemaining === 0) {
      clearInterval(timer);
      showResults();
    } else {
      timeRemaining--;
    }
  }
  timer = setInterval(updateTimer, 1000);
}

function showPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function submitQuiz() {
  const selectedOption = document.querySelector(
    `input[name="question${currentQuestion}"]:checked`
  );
  if (selectedOption) {
    const answer = Number(selectedOption.value);
    const correctAnswer = quizData[currentQuestion].correct;

    const feedbackContainer = document.createElement("div");
    feedbackContainer.classList.add("feedback-container");

    if (answer === correctAnswer) {
      feedbackContainer.innerHTML = '<p class="feedback correct">Correct!</p>';
      score++;
    } else {
      feedbackContainer.innerHTML = `<p class="feedback incorrect">Incorrect. The correct answer is: ${quizData[currentQuestion].options[correctAnswer]}</p>`;
    }
    quizContainer.appendChild(feedbackContainer);

    setTimeout(() => {
      quizContainer.innerHTML = "";
      currentQuestion++;

      if (currentQuestion < quizData.length) {
        loadQuestion();
        document.getElementById("prevBtn").disabled = false;
      } else {
        showResults();
      }
    }, 1000);
  }
}

function showResults() {
  quizContainer.innerHTML = `<h2 class="result-text">Your Score: ${score}/${quizData.length}</h2>`;
  document.getElementById("submitBtn").style.display = "none";
  clearInterval(timer);
  document.getElementById("prevBtn").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
}

loadQuestion();
