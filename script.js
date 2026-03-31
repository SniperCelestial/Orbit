const timerText = document.getElementById("focusCountdown");
const minuteText = document.getElementById("focusMinutes");
const startButton = document.getElementById("startTimer");
const resetButton = document.getElementById("resetTimer");
const ring = document.querySelector(".widget-ring");

const sessionLength = 12 * 60;
let remaining = sessionLength;
let timerId = null;

function renderTimer() {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress = (remaining / sessionLength) * 100;

  timerText.textContent = formatted;
  minuteText.textContent = minutes;
  ring.style.setProperty("--progress", progress);
}

function tick() {
  if (remaining === 0) {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = "Start again";
    return;
  }

  remaining -= 1;
  renderTimer();
}

startButton.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = "Resume sprint";
    return;
  }

  startButton.textContent = "Pause sprint";
  timerId = setInterval(tick, 1000);
});

resetButton.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  remaining = sessionLength;
  startButton.textContent = "Start sprint";
  renderTimer();
});

renderTimer();
