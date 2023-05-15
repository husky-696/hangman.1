// Define the list of words
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'orange', 'papaya', 'pineapple', 'peach', 'pear', 'plum', 'raspberry', 'strawberry', 'watermelon'];

// Select a random word from the list
let word = words[Math.floor(Math.random() * words.length)];

// Define variables to keep track of the game state
let remainingChances = 6;
let guessedLetters = new Set();

// Define functions to update the game state and the UI
function updateWord() {
  let wordElement = document.getElementById('word');
  let displayedWord = '';
  for (let letter of word) {
    if (guessedLetters.has(letter)) {
      displayedWord += letter;
    } else {
      displayedWord += '_';
    }
    displayedWord += ' ';
  }
  wordElement.textContent = displayedWord;
}

function updateLetters() {
  let lettersElement = document.getElementById('letters');
  lettersElement.innerHTML = '';
  for (let letter of 'abcdefghijklmnopqrstuvwxyz') {
    let button = document.createElement('button');
    button.textContent = letter;
    button.disabled = guessedLetters.has(letter);
    button.addEventListener('click', function() {
      guessedLetters.add(letter);
      if (word.includes(letter)) {
        updateWord();
        if (!word.split('').some(letter => !guessedLetters.has(letter))) {
          gameOver(true);
        }
      } else {
        remainingChances--;
        document.getElementById('remaining-chances').textContent = remainingChances;
        if (remainingChances === 0) {
          gameOver(false);
        }
      }
    });
    lettersElement.appendChild(button);
  }
}

function gameOver(isWin) {
  let message = '';
  if (isWin) {
    message = '<img src="winner.gif">';
    message += '<p>Congratulations! You won!</p>';
  } else {
    message = '<img src="loser.gif">';
    message += '<p>Sorry, you lost. The correct word was ' + word + '.</p>';
  }
  document.getElementById('message').innerHTML = message;
  document.getElementById('letters').innerHTML = '';
  document.getElementById('remaining-chances').textContent = remainingChances;
  document.getElementById('restart').style.display = 'block';
}



// Set up the initial state of the game
updateWord();
updateLetters();

// Set up the restart button
let restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', function() {
  word = words[Math.floor(Math.random() * words.length)];
  remainingChances = 6;
  guessedLetters = new Set();
  updateWord();
  updateLetters();
  document.getElementById('remaining-chances').textContent = remainingChances;
  document.getElementById('message').textContent = '';
  document.getElementById('winner-image').style.display = 'none';
  document.getElementById('loser-image').style.display = 'none';
  document.getElementById('restart').style.display = 'none';
});
