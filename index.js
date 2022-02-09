
var input = [];
var comp = [];
var colors = ["green", "red", "blue", "yellow"];
var computerClicked = false;
var wrongInput = false;
var gameStart = false;
var currentIndex = 0;
var currentLevel = 1;

function reset(loss) {
  input = [];
  currentIndex = 0;

  if (loss) {
    gameStart = false;
    wrongInput = false;
    currentLevel = 1;
    comp = [];
  }
}

function nextSection() {
  $("#level-title").text("Level " + currentLevel++);
  computerClicked = true;
  var randomIndex = Math.floor(Math.random()*4);
  setTimeout(function() {
    $("#" + colors[randomIndex]).click();
  }, 750);
}

function makeSound(color) {
  switch (color) {
    case "green": (new Audio("sounds/" + color + ".mp3")).play(); break;
    case "blue": (new Audio("sounds/" + color + ".mp3")).play(); break;
    case "red": (new Audio("sounds/" + color + ".mp3")).play(); break;
    case "yellow": (new Audio("sounds/" + color + ".mp3")).play(); break;
    case "wrong": (new Audio("sounds/" + color + ".mp3")).play(); break;
    default: console.log("none of the colors.");
  }
}

function clickButton(myButton, computerClicked) {
  var color = myButton.getAttribute("id");

  // Click the button
  $(myButton).addClass("pressed color");
  makeSound(myButton.getAttribute("id"));
  setTimeout(function() {
    $(myButton).removeClass("pressed color");
  }, 100);

  if (gameStart && !computerClicked && (color !== comp[currentIndex++])) {
    makeSound("wrong"); wrongInput = true;
  }

}

$(document).on("keydown", function() {
  if (!gameStart) {
    gameStart = true;
    $("body").removeClass("game-over");
    nextSection();
  }
})

$(".btn").on("click", function(event) {
  //Initiate Variables
  var myButton = this;
  var color = myButton.getAttribute("id");
  clickButton(myButton, computerClicked);

  if (gameStart) {
    // Update the arrays
    if (computerClicked) {comp.push(color); computerClicked = false;}
    else input.push(color);

    console.log("\nInput: " + input);
    console.log("Comp: " + comp);

    // Check Restart Game
    if (wrongInput) {
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      reset(true); // true - has lost
    }
    else if (gameStart && input.length === comp.length) {
      reset(false); // false - hasn't lost yet
      nextSection();
    }
  }
  else {
    gameStart = true;
    $("body").removeClass("game-over");
    nextSection();
  }
});
