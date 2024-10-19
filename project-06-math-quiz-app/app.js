// Create a Math question
// Math question will have a random generated
// Question Type Multiplicatin question  with random number range 1-10
// Answer will be the product of the random number range and the random number range
// User will have to answer question
// On submit  answer answer will be compared with random generated answer
// If answer will be correct than score will be incremented
// If answer will be wrong than score will be decremented

// Generate 4 Types of question
// For Subtract first number should be greater than second number also for Divide
// Store the score in local storage and display the score on the screen
// Give Feedback to user using toast

const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");
let storedAnswer;

// Initialize score from localStorage or start at 0 if no score is found
let score = localStorage.getItem("score")
  ? parseInt(localStorage.getItem("score"))
  : 0;

// Function to generate random numbers within a range
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Function to generate the question and its correct answer
const generateQuestion = () => {
  const randomNumber1 = randomNumber(1, 10);
  const randomNumber2 = randomNumber(1, 10);

  const questionType = randomNumber(1, 4);

  let firstNumber;
  let secondNumber;

  if (randomNumber1 > randomNumber2 && questionType > 2) {
    firstNumber = randomNumber1;
    secondNumber = randomNumber2;
  } else {
    firstNumber = randomNumber2;
    secondNumber = randomNumber1;
  }

  let question;
  let answer;

  switch (questionType) {
    case 1:
      question = `Q. What is ${firstNumber} multiply by ${secondNumber}?`;
      answer = firstNumber * secondNumber;
      break;
    case 2:
      question = `Q. What is ${firstNumber} add to ${secondNumber}?`;
      answer = firstNumber + secondNumber;
      break;
    case 3:
      question = `Q. What is ${firstNumber} divided by ${secondNumber}?`;
      answer = firstNumber / secondNumber;
      break;
    case 4:
      question = `Q. What is ${firstNumber} subtract from ${secondNumber}?`;
      answer = firstNumber - secondNumber;
      break;
    default:
      question = `Q. What is ${firstNumber} subtract from ${secondNumber}?`;
      answer = firstNumber - secondNumber;
      break;
  }

  return { question, answer };
};

// Function to display a new question and update the score on the screen
const showQuestion = () => {
  const { question, answer } = generateQuestion();
  questionEl.innerText = question;
  scoreEl.innerText = score;
  storedAnswer = answer;
};

showQuestion();

// Function to check if the user's answer is correct
const checkAnswer = (event) => {
  event.preventDefault();

  const formData = new FormData(questionFormEl);
  const userAnswer = +formData.get("answer");

  if (userAnswer === storedAnswer) {
    score += 1; // Increment score for correct answer
    Toastify({
      text: `You're right! Your score is now ${score}`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    score -= 1; // Decrement score for wrong answer
    Toastify({
      text: `You're wrong! Your score is now ${score}`,
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #e33217, #ff001e)",
      },
    }).showToast();
  }

  scoreEl.innerText = score;
  localStorage.setItem("score", score); // Store the updated score in localStorage
  event.target.reset(); // Clear the input field after each submission
  showQuestion(); // Show a new question
};

const resetGame = () => {
    score = 0;
    scoreEl.innerText = score;
    localStorage.setItem("score", score);
    Toastify({
      text: "Game reset! Your score is 0.",
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #ff4747, #ff7575)",
      },
    }).showToast();
    showQuestion(); // To generate a new question after reset
  };
  
