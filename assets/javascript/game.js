
//These object contains the available characters for the game and their letters
var gameWords = {
  "Ralph": ["r", "a", "l", "p", "h"],
  "Woody": ["w", "o", "o", "d", "y"],
  "Stitch": ["s", "t", "i", "t", "c", "h"],
  "Merida": ["m", "e", "r", "i", "d", "a"],
  "Mufasa" : ["m", "u", "f", "a", "s", "a"],
  "Aladdin" : ["a", "l", "a", "d", "d", "i", "n"],
  "Bagheera" : ["b", "a", "g", "h", "e", "e", "r", "a"],
  "Flounder" : ["f", "l", "o", "u", "n", "d", "e", "r",],
  "Esmeralda" : ["e", "s", "m", "e", "r", "a", "l", "d", "a"],
  "Tinkerbell" : ["t", "i", "n", "k", "e", "r", "b", "e", "l", "l"],
}

var chosenWord = "none"

//These are variables to keep track of wins and losses and display them on the document
var wins = 0;
var winsText = document.getElementById("wins-text");

var losses = 0;
var lossesText = document.getElementById("losses-text");

var guessLines = document.getElementById("gameName");
var number = document.getElementById("letterNumber");
var guessSpace = []

//This variable keeps track of wrong guesses and displays them in the document
var wrong = document.getElementById("wrongGuess");
wrong.textContent = "";

//This variable will keep track of guesses left
var guessLeft = 10;
var guessText = document.getElementById("guess-text");
guessText.textContent = guessLeft;

gameStart = function () {

  var userGuess = "";
  var compare1 = "a";
  var compare2 = "b";

  gamePrepare = function (){
    //This will select a random property out of the gameWords object
    var keys = Object.keys(gameWords);
    chosenWord = (keys[keys.length * Math.random() << 0]);

    //This loop will push to an array as many underscores as the number of letters the chosen word has
    for (var i = 0 ; i < gameWords[chosenWord].length; i++) {
      guessSpace.push("_");
    }

    //This will display the number of letters the chosen character has as well as the correct number of spaces to input
    guessLines.textContent = guessSpace.join(" ");
    number.textContent = chosenWord.length;

    console.log (chosenWord);
    console.log (gameWords[chosenWord]);
  }

  gamePrepare();

  var a = function(event){
    // This transforms the key pressed to always lowercase and assigns it to a variable
    userGuess = event.key.toLowerCase();
    keyPress();
    if (compare1 === compare2) {
      wins++;
      winsText.textContent = wins;
      document.removeEventListener ("keypress", a);
    }
  
    if (guessLeft === 0){
      losses++;
      lossesText.textContent = losses;
      document.removeEventListener ("keypress", a);
    }
    /*Winning condition is met when the compare variables are identical, 
    Losing condition is met when no guesses are left
    Further key presses will not be heard*/
  }

  // This event will be triggered by the user pressing a key
  document.addEventListener ("keypress", a);

  keyPress = function (){
        
    // This function will filter any input that is not between a-z or has more than one character (alt, control, fn)
    function lettersOnly (){
      var regexMulti = /^.{2,}$/g;
      var regexSym = /^[^a-z]$/g;
      userGuess = userGuess.replace(regexMulti, "");
      userGuess = userGuess.replace(regexSym, "");
    }
    lettersOnly();

    // The rest of the function will only be triggered if the input has not been nulled by the above function
    if (userGuess !== ""){

      // This variable will be true if the key pressed is included within the values of chosenWord
      var find = gameWords[chosenWord].includes(userGuess);
      console.log(userGuess);
      console.log(find);
    
      // If find is true, a for loop will replace all matches found in chosenWord on the equivalent space in guessLines
      if (find){
        for (var i = 0; i < gameWords[chosenWord].length; i++) {
          if (gameWords[chosenWord][i] === userGuess) {
            guessSpace[i] = userGuess;
            guessLines.textContent = guessSpace.join(" ");
          }
        }
      }
    
      // If find is false, the userGuess will be appended in wrongGuess space to be displayed to the user
      else {
        var wrongLetter = document.createTextNode(""); 
        wrongLetter.textContent = userGuess;
        wrong.appendChild(wrongLetter);
        guessLeft--;
        guessText.textContent = guessLeft;
      }

      //This creates variables with string representations of chosenWord and guessSpace and log them
      compare1 = guessSpace.toString()
      compare2 = gameWords[chosenWord].toString()
      console.log(compare1)
      console.log(compare2)
    }
  }

  document.getElementById("restartBtn").onclick = function() {
    document.removeEventListener ("keypress", a);
    guessSpace.length = 0;
    chosenWord = "none"
    wrong.textContent = "";
    guessLeft = 10;
    guessText.textContent = guessLeft;
    gamePrepare();
    document.addEventListener ("keypress", a);
  };

}

gameStart();


