const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
stopButton.disabled = true;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const onBodyChangeColor = () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
};

const onBodyStopChangeColor = () => {
  clearInterval(timerId);
  stopButton.disabled = true;
  startButton.disabled = false;
};

startButton.addEventListener('click', onBodyChangeColor);
stopButton.addEventListener('click', onBodyStopChangeColor);
