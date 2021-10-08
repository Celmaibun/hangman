const buttonsWrapper = document.querySelector('.buttons');
const wordList = document.querySelector('.word-list');
const winWrapper = document.querySelector('.win');
const loseWrapper = document.querySelector('.lose');
const livesDiv = document.querySelector('.fa-heart');

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const words = [
  'pest',
  'fly',
  'threshold',
  'house',
  'straight',
  'majority',
  'particle',
  'friendly',
  'romantic',
  'software',
  'creation',
  'gradient',
];
//Variables
const generatedNumber = Math.floor(Math.random() * words.length);
let wordArray = [];
let lives = 10;
let scores = 0;

const displayButtons = function () {
  alphabet.forEach(function (letter) {
    const button = document.createElement('button');
    button.classList.add('button-alphabet');
    button.textContent = letter.toUpperCase();
    button.value = letter;
    buttonsWrapper.append(button);
  });
};
displayButtons();
//REMOVE BUTTON WITH VALUE THIS FROM LETTER CLICK FUNCTION
const removeButton = function (value) {
  buttonsWrapper.removeChild(value);
};
const removeLi = function () {
  while (wordList.firstChild) {
    wordList.removeChild(wordList.firstChild);
  }
};
const pushSymbolToArray = function () {
  for (let i = 0; i < words[generatedNumber].length; i++) {
    wordArray.push('_');
  }
};
///////////////
const checkWinner = function (word) {
  const array = wordArray.join('');
  const winnerArray = word;
  if (lives === 0) {
    loseWrapper.classList.remove('hidden');
  }
  if (array === winnerArray) {
    winWrapper.classList.remove('hidden');
  }
};
const displayLetters = function (word) {
  for (let i = 0; i < word.length; i++) {
    const li = document.createElement('li');
    li.classList.add('guess');
    li.textContent = `${wordArray[i].toUpperCase()}`;
    wordList.append(li);
  }
};
pushSymbolToArray();
displayLetters(words[generatedNumber]);

const letterClick = function () {
  const word = words[generatedNumber];
  if (word.indexOf(this.value) !== -1) {
    wordArray.splice(word.indexOf(this.value), 1, this.value);
    removeLi();
    displayLetters(words[generatedNumber]);
    removeButton(this);
  } else {
    removeButton(this);
    lives--;
  }
  console.log(wordArray);
  livesDiv.textContent = ` ${lives} lives`;
  checkWinner(word);
};

document.querySelectorAll('.button-alphabet').forEach(item => {
  item.addEventListener('click', letterClick);
});
