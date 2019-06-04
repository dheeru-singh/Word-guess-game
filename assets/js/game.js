// selectable word array 
var selectableWords =  ["MADONNA", "PRINCE", "MICHAEL","GEORGE", "QUEEN"];
    
// Global variable
const maxTries = 10;            
var guessedLetters = [];       
var currentWordIndex;           
var guessingWord = [];        
var remainingGuesses = 0;    
var hasFinished = false;         
var wins = 0;                  

var keySound= new Audio('./assets/sounds/typewriter-key.wav');


var madonnaSong= new Audio('./assets/sounds/Madonna-American-Pie.mp3');
var princeSong= new Audio('./assets/sounds/Ice-Prince-Thank-God-feat-Ice-Prince-amp-Boy-Wonda.mp3');
var michaelSong= new Audio('./assets/sounds/Michael-Jackson-Money.mp3')
var georgeSong= new Audio('./assets/sounds/George-Michael-Careless-Whisper.mp3')
var queenSong= new Audio('./assets/sounds/Queen-Donot-Stop-Me-Now.mp3')

function resetGame() {
    remainingGuesses = maxTries;

    //Word guess
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    guessedLetters = [];
    guessingWord = [];
    
    document.getElementById("hangmanImage").src = "assets/images/default.jpg";
    madonnaSong.pause();
    princeSong.pause();
    michaelSong.pause();
    georgeSong.pause();
    queenSong.pause();
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
   
    if( currentWordIndex===0 ){
        console.log("this is current world index 0",currentWordIndex);
        document.getElementById("hangmanImage").src = "assets/images/" +"madonna"+ ".jpg";
        madonnaSong.play();
    }else if( currentWordIndex===1){
        console.log("this is current world index 1",currentWordIndex);
        document.getElementById("hangmanImage").src = "assets/images/" +"prince"+ ".jpg";
        princeSong.play();
    }else if(  currentWordIndex===2){
        console.log("this is current world index 2",currentWordIndex);
        document.getElementById("hangmanImage").src = "assets/images/" +"michael"+ ".jpg";
        michaelSong.play();
    }else if( currentWordIndex===3){
        console.log("this is current world index 3",currentWordIndex);
        document.getElementById("hangmanImage").src = "assets/images/" +"george"+ ".jpg";
        georgeSong.play();
    }else if(  currentWordIndex===4){
        console.log("this is current world index 4",currentWordIndex);
        document.getElementById("hangmanImage").src = "assets/images/" +"queen"+ ".jpg";
        queenSong.play();
    }

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
        
        updateHangmanImage();
        
       
        // winSound.play();
        hasFinished = true;
    }
};


function checkLoss()
{
    if(remainingGuesses <= 0) {
        // loseSound.play();
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
