window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    init();
  });
// Score 
let score = 0;
// ID names 
const startButtonName = "start_button";
// Content
const content = {
    startPage: `<h1>Welcome</h1><button id=${startButtonName}>Start Quiz</button>`,
    highScore: `High Score Page`,
    finalPage: `Final Page with score ${score}`,
};
// Elements
const mainContentElement = document.getElementById('content');
const timerElement = document.getElementById('timer');
// Timer 
const initialTime = 60;
let timeleft = initialTime;
let timer; 
// Questions 
const questions = [
    {question: "Question 1", options: ["Option 1","Option 2","Option 3","Option 4"], answer: 0},
    {question: "Question 2", options: ["Option 1","Option 2","Option 3","Option 4"], answer: 1}
];
let currentQuestion = 0;

function init(){
    attachScoreEventListener();
    loadStartPageContent();
    attachStartButtonEventListener();
    loadInitialTimer();
}

function attachScoreEventListener(){
    const highScoreElement = document.getElementById('high_score'); 
    highScoreElement.addEventListener ("click", displayHighScores);
}

function attachStartButtonEventListener(){
    const startButtonElement = document.getElementById(startButtonName);
    startButtonElement.addEventListener ("click", startQuiz);
}

function loadInitialTimer(){
    timerElement.innerHTML = initialTime;
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
            console.log(`Time up`);
            // TODO Stop timer
            clearInterval(timer);
            // End Quiz and show results / score
            endQuiz();
        }
        timerElement.innerHTML = timeleft;
        timeleft -= 1;
        }, 1000);
}

function loadFinalPage(){
    displayMainContent('finalPage');
}

function loadQuestionsContent(){
    // Display current question text
    const questionText = questions[currentQuestion]['question'];
    const questionTextNode = document.createElement("div");
    const textnode = document.createTextNode(questionText);
    questionTextNode.appendChild(textnode);
    
    // Display current question options
    const questionOptions = questions[currentQuestion]['options'];
    const questionOptionsNode = document.createElement("div");
    questionOptions.forEach((option,index) => {
        const optionTextnode = document.createTextNode(option);
        const questionOptionNode = document.createElement("button");
        questionOptionNode.addEventListener("click", function () {
            handleResponse(index);
          });
        questionOptionNode.appendChild(optionTextnode);
        questionOptionsNode.appendChild(questionOptionNode);
    })
    

    // Append all to main content element
    mainContentElement.innerHTML = "";
    mainContentElement.appendChild(questionTextNode);
    mainContentElement.appendChild(questionOptionsNode);
}


function handleResponse(answer){
    console.log(`For question ${currentQuestion} you responded with ${answer}`);
    // Check if response is false, if so subtract from time
    if(answer !== questions[currentQuestion].answer){
        console.log(`Incorrect response`);
        subtractTime();
    } else {
        score += 1;
        console.log(`Correct response`);
    }
    // Go to next question of show final page with results / score
    if(currentQuestion + 1 < questions.length){
        currentQuestion =+ 1;
        loadQuestionsContent();
    } else {
        endQuiz();
    }
}

function subtractTime(){
    timeleft -= 10;
}

function endQuiz(){
    loadFinalPage();
    resetQuizParams();
}

function resetQuizParams(){
    timeleft = initialTime;
    currentQuestion = 0;
    score = 0;
}

function displayMainContent(contentName){
    mainContentElement.innerHTML = content[contentName];
}