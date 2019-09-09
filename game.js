var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
$("img").hide();

function newSequence() {
  // Random Number Generator
  var randomNumber = (Math.floor(Math.random() * 4));
  // Randomize the colors in the array
  var randomChoosenColor = buttonColors[randomNumber];
  // append the colors to the gamepattern array
  gamePattern.push(randomChoosenColor);

  // choose the random color and play audio of that chosen color
  switch (randomChoosenColor) {

    case "red":
      $("#red").fadeOut(100).fadeIn(90);
      var sounds1 = new Audio ("sounds/redtom-1.mp3");
      sounds1.play();
      break;

    case "blue":
      $("#blue").fadeOut(100).fadeIn(90);
      var tom2 = new Audio("sounds/bluetom-2.mp3");
      tom2.play();
      break;

    case "yellow":
      $("#yellow").fadeOut(100).fadeIn(90);
      var snare = new Audio("sounds/yellowsnare.mp3");
      snare.play();
      break;

    case "green":
      $("#green").fadeOut(100).fadeIn(90);
      var crash = new Audio("sounds/greencrash.mp3");
      crash.play();
      break;

    default: alert("something is not working in the switch!");

  }

  level++;
  $("#level-title").text("Level = " + level);

}

$(".btn-starter").click(function() {
  var toggle = true;

  while (toggle == true) {

    if (level < 1) {

      newSequence();
      $(".btn-starter").hide();
      $(".game-over-text").remove();
      $("img").hide();

  } else {

    toggle = false;
  }

  }


});




// click event listener to all buttons inside their container
$(".btn-box").click(function() {
  // get the attribute id of an element
  var userChosenColor = $(this).attr("id");
  // push the element tag to an array
  userClickedPattern.push(userChosenColor);


  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {

  var audio1 = new Audio ("sounds/" + name + ".mp3");
  audio1.play();

}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
  }, 100);

}

$(document).keydown(function(evt) {

console.log(evt.key);

var toggle = true;

while (toggle == true) {

  if (level < 1) {

    newSequence();
    $(".btn-starter").hide();
    $(".game-over-text").remove();
    $("img").hide();

} else {

  toggle = false;
}

}

});

function checkAnswer(currentLevel) {

  // verify if the last index of gamePattern array if equal to userClickedPattern array
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // verifies the length for both gamePattern and userClickedPattern are in the same length
    if (gamePattern.length == userClickedPattern.length) {
      // set delay for the nextSequence() to run
      setTimeout(function() {
        newSequence();
      }, 1000);
      // resets the userClickedPattern to the finally the game.
      userClickedPattern = [];
    }
    // else if the first if statements failed.
  } else {

    var gameOverAudio = new Audio ("sounds/wrong.mp3");
    startOver();
    gameOverAudio.play();

    $("img").show();
    $("#level-title").text(":( Press Any Key ⌨️ To Restart. :p");
    $(".btn-starter").show();

    $("body").addClass("game-over");

    console.log("Failed");

    setTimeout (function () {

      $("body").removeClass("game-over");



    }, 200) ;

  }

}

function startOver () {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];

}
