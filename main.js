'use strict';
const buttonsWrapper = document.querySelector('.buttons');
const wordList = document.querySelector('.word-list');
const winWrapper = document.querySelector('.win');
const loseWrapper = document.querySelector('.lose');
const livesDiv = document.querySelector('.lives-text');
const scoreDiv = document.querySelector('.score-text');
const endScore = document.querySelector('.lose-score');
const endWord = document.querySelector('.lose-word');
const restartBtn = document.querySelector('.lose-button');

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
  'foodstuff',
  'liziaard',
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
  'tendency',
  'visual',
  'protection',
  'swim',
  'structure',
  'sticky',
  'weed',
  'overall',
  'predator',
  'silver',
  'apple',
  'trail',
  'sell',
  'decorative',
  'river',
  'accessible',
  'relief',
  'choke',
  'compose',
  'stitch',
  'lonely',
  'pavement',
  'seed',
  'cook',
  'distinct',
  'shot',
  'pardon',
  'recognize',
  'compromise',
  'finger',
  'cabinet',
  'inject',
  'offend',
  'stunning',
  'plain',
  'cutting',
  'lean',
  'cane',
  'light',
  'talkative',
  'chin',
  'clarify',
];
//Variables
let generatedNumber = Math.floor(Math.random() * words.length);
let wordArray = [];
let lives = 10;
let score = 0;

//Remove button when click
const removeButton = function (value) {
  buttonsWrapper.removeChild(value);
};
//Display all buttons
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
//Remove all btns
const removeAllButtons = function () {
  while (buttonsWrapper.firstChild) {
    buttonsWrapper.removeChild(buttonsWrapper.firstChild);
  }
};
//Remove all li from ul
const removeLi = function () {
  while (wordList.firstChild) {
    wordList.removeChild(wordList.firstChild);
  }
};
//Push '_' to array
const pushSymbolToArray = function () {
  for (let i = 0; i < words[generatedNumber].length; i++) {
    wordArray.push('_');
  }
};
//More index finder
function indexOfAll(array, searchItem) {
  let i = array.indexOf(searchItem),
    indexes = [];
  while (i !== -1) {
    indexes.push(i);
    i = array.indexOf(searchItem, ++i);
  }
  return indexes;
}
//Check for win/lose
const checkWinner = function (word) {
  const array = wordArray.join('');
  const winnerArray = word;
  if (lives === 0) {
    loseWrapper.classList.remove('hidden');
    lives = 10;
    endScore.textContent = `score: ${score}`;
    score = 0;
    scoreDiv.textContent = `score: ${score}`;
    endWord.textContent = `the word was: ${word}`;
  }
  if (array === winnerArray) {
    // winWrapper.classList.remove('hidden');
    lives = 10;
    restartGame();
  }
};
//Display letter, create new li
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
  //Check if there is key letter in word
  if (word.indexOf(this.value) !== -1) {
    const indexes = indexOfAll(word, this.value);
    for (let i = 0; i < indexes.length; i++) {
      wordArray.splice(indexes[i], 1, this.value);
    }
    removeLi();
    displayLetters(word);
    removeButton(this);
    score++;
    scoreDiv.textContent = `score: ${score}`;
  }
  //If there is no key letter in word
  else {
    removeButton(this);
    lives--;
  }
  checkWinner(word);
  livesDiv.textContent = `lives: ${lives}`;
};

const restartGame = function () {
  loseWrapper.classList.add('hidden');
  wordArray = [];
  livesDiv.textContent = `lives: ${lives}`;
  generatedNumber = Math.floor(Math.random() * words.length);
  removeAllButtons();
  displayButtons();
  removeLi();
  pushSymbolToArray();
  displayLetters(words[generatedNumber]);
  document.querySelectorAll('.button-alphabet').forEach(item => {
    item.addEventListener('click', letterClick);
    item.addEventListener('.touch', letterClick);
  });
};

restartBtn.addEventListener('click', restartGame);
document.querySelectorAll('.button-alphabet').forEach(item => {
  item.addEventListener('click', letterClick);
  item.addEventListener('.touch', letterClick);
});
