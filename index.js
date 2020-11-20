var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
            setTimeout(function(){
                nextSequence();
            },1000);
    }
    else 
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
    
}

function nextSequence(){
    var duration = 250;
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    highscore();
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    for(var i=0; i < gamePattern.length; i++)
    {
        setTimeout(animatePress,duration, gamePattern[i]);
        setTimeout(playSound,duration, gamePattern[i]);
           duration+=500;
        }
    }

function highscore(){
    if(parseInt($("#level").text()) < level){
        $("#level").text(level);
    }
}

function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});