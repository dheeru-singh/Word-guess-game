// selectable word array 
var selectableWords =  ["CSHARP", "CPLUSPLUS", "RUBYONRAILS", "PYTHON"];
    
// Global variable
const maxTries = 10;            
var guessedLetters = [];       
var currentWordIndex;           
var guessingWord = [];        
var remainingGuesses = 0;    
var hasFinished = false;         
var wins = 0;                  
var keySound = new Audio('./assets/sounds/typewriter-key.wav');
var winSound = new Audio('./assets/sounds/you-win.wav');
var loseSound = new Audio('./assets/sounds/you-lose.wav');


function resetGame() {
    remainingGuesses = maxTries;

    //Word guess
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    guessedLetters = [];
    guessingWord = [];

    document.getElementById("hangmanImage").src = "";

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   

    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    updateDisplay();
};

//  Updates display on Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};


// Updates image 
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
};

// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
      
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        winSound.play();
        hasFinished = true;
    }
};


function checkLoss()
{
    if(remainingGuesses <= 0) {
        loseSound.play();
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
}

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};

document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
