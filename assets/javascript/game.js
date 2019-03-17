
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

//These are variables to keep track of wins and losses and display them on the document
var wins = 0;
var winsText = document.getElementById("wins-text");

var losses = 0;
var lossesText = document.getElementById("losses-text");


gamePrepare = function (){

  var guessSpace = {
    "Five" : ["_", "_", "_", "_", "_"],
    "Six" : ["_", "_", "_", "_", "_", "_"],
    "Seven" : ["_", "_", "_", "_", "_", "_", "_"],
    "Eight" : ["_", "_", "_", "_", "_", "_", "_", "_"],
    "Nine" : ["_", "_", "_", "_", "_", "_", "_", "_", "_"],
    "Ten" : ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_"]
  }

  //This will select a random property out of the gameWords object
  var keys = Object.keys(gameWords);
  var chosenWord = (keys[keys.length * Math.random() << 0]);

  /* These if's will select a property from the guessSpace object and assign it to chosenProp
  depending on the length of the property chosen from the gameWords object */

  if (chosenWord.length === 5){
    var chosenProp = "Five"
  }
  if (chosenWord.length === 6){
  var chosenProp = "Six"
  }
  if (chosenWord.length === 7){
    var chosenProp = "Seven" 
  }
  if (chosenWord.length === 8){
    var chosenProp = "Eight" 
  }
  if (chosenWord.length === 9){
    var chosenProp = "Nine" 
  }
  if (chosenWord.length === 10){
    var chosenProp = "Ten" 
  }

  //This will display the number of letters the chosen character has as well as the correct number of spaces to input
  var guessLines = document.getElementById("gameName");
  guessLines.textContent = guessSpace[chosenProp].join(" ");
  var number = document.getElementById("letterNumber");
  number.textContent = chosenWord.length;

  //This variable keeps track of wrong guesses and displays them in the document
  var wrong = document.getElementById("wrongGuess");
  wrong.textContent = "";

  //This variable will keep track of guesses left
  var guessLeft = 10;
  var guessText = document.getElementById("guess-text");
  guessText.textContent = guessLeft;

  console.log (chosenWord);
  console.log (gameWords[chosenWord]);


  //This fuction will run after the initial setup has been completed
  gameStart = function () {

    // This event will be triggered by the user pressing a key
    document.addEventListener ("keypress", function a(event) {
  
      // This transforms the key pressed to always lowercase and assigns it to a variable
      var userGuess = event.key.toLowerCase();
  
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
              console.log("yay!");
              guessSpace[chosenProp][i] = userGuess;
              guessLines.textContent = guessSpace[chosenProp].join(" ");
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
        var compare1 = guessSpace[chosenProp].toString()
        var compare2 = gameWords[chosenWord].toString()
        console.log(compare1)
        console.log(compare2)
        
        /*Winning condition is met when the compare variables are identical, 
        Losing condition is met when no guesses are left
        Further key presses will not be heard*/
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
      }
    });
  }

  gameStart();

}

gamePrepare();

document.getElementById("restartBtn").onclick = function() {gamePrepare()};

