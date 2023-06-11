var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var firstTime = true;
var level = 0;
var gameOver = false;

$(".btn").click(function () {
  if (firstTime) {
    $("#level-title").html("Level " + level);
    firstTime = false;
  } else {
    $("#level-title").html("Level " + level);
  }
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animate_key(userChosenColour);
  console.log(userClickedPattern, gamePattern);
  checkAnswer();
  console.log(userClickedPattern, gamePattern);
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;

  $(`#${randomChosenColour}`).fadeOut(50).fadeIn(50).delay(100);

  playSound(randomChosenColour);
}

function animate_key(color) {
  $(`#${color}`).addClass("pressed");

  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

$(document).keydown(function (e) {
  if (!gameOver) {
    if (firstTime) {
      $("#level-title").html("Level " + level);
      firstTime = false;
    }
  } else {
    $("#level-title").html("Level " + 0);
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameOver = false;
  }

  nextSequence();
});

function checkAnswer() {
  if (userClickedPattern.length == gamePattern.length) {
    for (var x = 0; x < userClickedPattern.length; x++) {
      var ans = userClickedPattern[x] == gamePattern[x];
      if (!ans) {
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        gameOver = true;
        $("#level-title").html("Game Over, Press any key ");
      }
    }
    userClickedPattern = [];
  }
}
