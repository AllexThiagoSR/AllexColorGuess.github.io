const circlesParent = document.getElementById('circles');
const colorToGuess = document.getElementById('rgb-color');
const answer = document.getElementById('answer');
const reset = document.getElementById('reset-game');
const score = document.querySelector('#score span');
const select = document.getElementById('difficulty');

const generateColor = () => {
  const r = Math.ceil(Math.random() * 255);
  const g = Math.ceil(Math.random() * 255);
  const b = Math.ceil(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
};

const checkAnswer = (event) => {
  const clicked = event.target;
  if (clicked.style.backgroundColor === colorToGuess.innerText) {
    answer.innerText = 'Acertou!';
    score.innerText = `${Number(score.innerText) + 3}`;
    newGame(Number(select.value));
  } else if (Number(score.innerText) !== 0) {
    answer.innerText = 'Errou! Tente novamente!';
    score.innerText = `${Number(score.innerText - 1)}`;
  } else {
    answer.innerText = 'Errou! Tente novamente!';
  }
};

const addCircles = (quanty, rightCircle) => {
  circlesParent.innerHTML = '';
  circlesParent.style.width = `${(62 * (quanty / 3)) + 26}px`;
  for (let count = 1; count <= quanty; count += 1) {
    const circle = document.createElement('div');
    circle.className = 'ball';
    if (count === rightCircle) {
      circle.style.backgroundColor = colorToGuess.innerText;
    } else {
      circle.style.backgroundColor = generateColor();
    }
    circle.addEventListener('click', checkAnswer);
    circlesParent.appendChild(circle);
  }
};

const newGame = (quanty) => {
  colorToGuess.innerText = generateColor();
  const rightCircle = Math.ceil(Math.random() * quanty);
  addCircles(quanty, rightCircle);
};

colorToGuess.innerText = generateColor();
newGame(Number(select.value));
reset.addEventListener('click', () => {
  newGame(Number(select.value));
  answer.innerText = 'Escolha uma cor';
});
select.addEventListener('change', () => {
  newGame(select.value);
});
