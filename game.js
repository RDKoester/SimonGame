// Variables

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let startedGame = false;

// Detect which Button is clicked

$(".btn").click(function(event) {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if (level !== 0) {
        checkAnswer(userClickedPattern.length - 1);
    }
});

// Start next sequence

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("h1").text("Level " + level);
    level++
}

// Play Audio

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Button Animation

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Start the game

$(document).on("keydown", function() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    level++;
    if (startedGame === false) {
        nextSequence();
        startedGame = true;
    }
});

// // Mobile Start with Click


    $(document).on("click", function() {
        if (startedGame === false && $("h1").text() === "Press A Key to Start") {
            level = 0;
            userClickedPattern = [];
            gamePattern = [];
            level++;
            startedGame = true;
            if (startedGame === true) {
                nextSequence();
            }
        }
    });


// Check the answer of User 

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() { 
            nextSequence();
        },1000);
        userClickedPattern = [];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Reset everything to start over

function startOver() {
    level = 0;
    startedGame = false;
    gamePattern = [];
}