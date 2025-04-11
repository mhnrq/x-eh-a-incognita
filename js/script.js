let correctCount = 0;
let incorrectCount = 0;
let currentX = null;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEquation() {
  const x = getRandomInt(1, 20);
  const a = getRandomInt(1, 10);
  const b = getRandomInt(0, 20);
  const y = a * x + b;

  currentX = x;

  const equation = `${a}x + ${b} = ${y}`;
  document.getElementById("equation").innerText = `Resolva: ${equation}`;

  generateOptions(x);
  clearFeedback();
}

function generateOptions(correctX) {
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  const options = new Set();
  options.add(correctX);
  while (options.size < 4) {
    options.add(getRandomInt(correctX - 3, correctX + 3));
  }

  const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

  shuffled.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selected) {
  if (selected === currentX) {
    correctCount++;
    showFeedback("✔️ Correto!", "success");
  } else {
    incorrectCount++;
    showFeedback(`❌ Errado! O valor correto era ${currentX}.`, "error");
  }

  updateStats();
}

function updateStats() {
  document.getElementById("correct-count").innerText = correctCount;
  document.getElementById("incorrect-count").innerText = incorrectCount;
}

function resetSession() {
  correctCount = 0;
  incorrectCount = 0;
  updateStats();
  clearFeedback();
  document.getElementById("equation").innerText = "";
  document.getElementById("options-container").innerHTML = "";
}

function showFeedback(message, type) {
  const feedback = document.getElementById("feedback");
  feedback.innerText = message;
  feedback.className = type;
}

function clearFeedback() {
  const feedback = document.getElementById("feedback");
  feedback.innerText = "";
  feedback.className = "";
}

