var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
//to check if started or not
$(document).keypress(function(){
if(!started){
  $("#level-title").text("Level "+level );
  nextSequence();
  started=true;
//console.log(event.key);
}
});
//to log user button
$(".btn").click(function(event){

  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});
//to find the next button ramdomly and play it and effect the button with fading
function nextSequence(){

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level );

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

}
//function for playing sound when the color is selected by user or computer
function playSound(name){

  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}
//to amimate the colour box when user presses it.
function animatePress(currentColor){

  $("#"+currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
//to check if the pattern is right
function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("success");

    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function () {
      nextSequence();
    }, 1000);

    }
  }
//else function
  else{
    console.log("wrong");

    var audio= new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
  }
}
//function to startover if wrong case .
function startOver(){

  level=0;
  started=false;
  gamePattern= [];
}
