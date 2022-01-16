var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//Need to find a way to know if the game has been started
var started = false;

//Start with Level 0
var level = 0;

//Detect keyboard event to start the game
$(document).keydown(function(){
  if (!started){

//Need to change the text from "Press A to start" to "Levels"
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Check Answert
function checkAnswer(currentLevel){

  //Need to check if the game pattern and user input is of the same level
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }

      } else {
        console.log("wrong");
      // Play the file "wrong"
        playSound("wrong");

      //Add in the css component
        $("body").addClass("game-over");
        setTimeout (function(){
          $("body").removeClass("game-over");
        },200);

    //Change title of h1 when game is over.
        $("#level-title").text("Game Over, Press Any Key to Restart");

      //Sequence to start over
        startOver();
      }

  }

function nextSequence(){

//Once the nextSequence() is clicked, reset the pattern.
  userClickedPattern = [];

//Inside nextSequence function, increases by level everytime
  level++;

// Change the name of the title as the level progresses
  $("level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);

  //Random number to randomise the whole process
  var randomChosenColor = buttonColors[randomNumber];

  // Add to the gamePattern Array
  gamePattern.push(randomChosenColor);

  //To create the animation in the game
  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Make sound play in the game
  playSound(randomChosenColor);

  $("h1").text("Level " + level);
}


  //Check the click on the buttons
  $(".btn").click(function(){

  //Obtain the ID of the colour of the button
    var userChosenColor = $(this).attr("id");

  //Add to the array
    userClickedPattern.push(userChosenColor);

  //Use the userchosencolor as the Name to play sound
    playSound(userChosenColor);
    animatePress(userChosenColor);

//Call CheckAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
    checkAnswer(userClickedPattern.length-1);
  });

//Create a new function for playsound
  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  //Create a function for animation
  function animatePress(currentColor){
  //Choose the right class to add
    $("#" + currentColor).addClass(".pressed");

  //Add a delay
    setTimeout(100);

  //Choose the right class to remove
    $("#" + currentColor).removeClass(".pressed");
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }
