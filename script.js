window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    init();
  });

// ID names 
const startButtonName = "start_button";
// Content
const content = {
    startPage: `<h1>Welcome</h1><button id=${startButtonName}>Start Quiz</button>`,
    highScore: `High Score Page`
};
// Elements
const mainContentElement = document.getElementById('content');
const timerElement = document.getElementById('timer');
// Timer 
var timeleft = 60;
var timer; 
// Questions 


function init(){
    attachScoreEventListener();
    loadStartPageContent();
    attachStartButtonEventListener();
    loadTimer();
}

function attachScoreEventListener(){
    const highScoreElement = document.getElementById('high_score'); 
    highScoreElement.addEventListener ("click", displayHighScores);
}

function attachStartButtonEventListener(){
    const startButtonElement = document.getElementById('content');
    startButtonElement.addEventListener ("click", startQuiz);
}

function loadTimer(){
    timerElement.innerHTML = timeleft;
}

function loadStartPageContent(){
    displayMainContent('startPage');
}

function startQuiz(){
    startTimer();
    loadQuestionsContent();
}

function displayHighScores(){
    displayMainContent('highScore');
}

function startTimer(){
    timer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(timer);
        }
        timerElement.innerHTML = timeleft;
        timeleft -= 1;
        }, 1000);
}

function loadQuestionsContent(){
    
}


function displayMainContent(contentName){
    mainContentElement.innerHTML = content[contentName];
}