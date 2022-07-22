window.addEventListener('load', (event) => {
    init();
  });

// Score 
let score;

// ID names 
const startButtonName = "start_button";
const scoreSpanName = "score_results";
const submitScoreButtonName = "score_initials_submit";
const userInitialsName = "user_initials";
const startOverName = "start_over";

// HTML Content
const content = {
    startPage: () => `<h1>Welcome</h1>
        <button id=${startButtonName}>Start Quiz</button>`,
    highScore: () => {
        const scoreArray = getScores();
        let individualScores = ``;
        for(let i = 0; i < scoreArray.length; i++){
            individualScores += `<li>${scoreArray[i]['initials']} : ${scoreArray[i]['score']}</li>`
        }
        
        return `<div>High Scores Page</div>
        <ul>${individualScores}</ul>
        <button id=${startOverName}>Start Over</button>`
    },
    finalPage: () => `Final Page with score 
        <span id=${scoreSpanName}></span>
        <div>
            <input id=${userInitialsName}></input>
            <button id=${submitScoreButtonName}>Submit</button>
        </div>`,
};

// Elements
const mainContentElement = document.getElementById('content');
const timerElement = document.getElementById('timer');

// Timer 
const initialTime = 60;
let timeleft;
let timer; 

// Questions 
const questions = [
    {question: "Commonly used data types DO Not Include:", options: ["String","Alerts","Booleans","Numbers"], answer: 1},
    {question: "Question 2", options: ["Option 1","Option 2","Option 3","Option 4"], answer: 1},
    {question: "Question 3", options: ["Option 1","Option 2","Option 3","Option 4"], answer: 2},
    {question: "Question 4", options: ["Option 1","Option 2","Option 3","Option 4"], answer: 1}
];

let currentQuestion;

function init(){
    attachScoreEventListener();
    attachHomeQuizEventListener();
    loadStartPageContent();
    loadInitialTimer();
}

function goToHomePage(){
    clearInterval(timer);
    loadStartPageContent();
    loadInitialTimer();
}

function getScores(){
    return JSON.parse(localStorage.getItem("results")) ? JSON.parse(localStorage.getItem("results")) : [];
}

function attachHomeQuizEventListener(){
    const quizHomeElement = document.getElementById('quiz_home'); 
    quizHomeElement.addEventListener ("click",  goToHomePage);
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
    attachStartButtonEventListener();
}

function startQuiz(){
    resetQuizParams();
    startTimer();
    loadQuestionsContent();
}

function displayHighScores(){
    displayMainContent('highScore');
    const startOverElement = document.getElementById(startOverName);
    startOverElement.addEventListener ("click", () => {
        resetQuizParams();
        loadStartPageContent();
    })
    
}

function startTimer(){
    timer = setInterval(function(){
        if(timeleft <= 0){
            // End Quiz and show results / score
            endQuiz();
        }
        timerElement.innerHTML = timeleft;
        timeleft -= 1;
        }, 1000);
}

function loadFinalPage(){
    displayMainContent('finalPage');
    const scoreSpanElement = document.getElementById(scoreSpanName);
    // TODO Score does not reflect accurately
    scoreSpanElement.innerHTML = score;
    
    document.getElementById(submitScoreButtonName).addEventListener ("click", () => {
        const userInitiasValues = document.getElementById(userInitialsName).value;
        saveResults(userInitiasValues);
        displayHighScores();
    });
}

function saveResults(initials){
    const resultObj = {initials: initials, score: score};
    const scoreArray = getScores()
    scoreArray.push(resultObj);
    localStorage.setItem("results", JSON.stringify(scoreArray));
}

function loadQuestionsContent(){
    // Parent card
    const parentCard = document.createElement("div");
    parentCard.classList.add("card");

    // Display current question text
    const questionText = questions[currentQuestion]['question'];
    const questionTextNode = document.createElement("div");
    questionTextNode.classList.add("questionText");
    const textnode = document.createTextNode(questionText);
    questionTextNode.appendChild(textnode);
    
    // Display current question options
    const questionOptions = questions[currentQuestion]['options'];
    const questionOptionsNode = document.createElement("div");
    questionOptionsNode.classList.add("questionOptionsNode");
    questionOptions.forEach((option,index) => {
        const optionTextnode = document.createTextNode(option);
        const questionOptionNode = document.createElement("button");
        questionOptionNode.classList.add("questionOptionNode");
        questionOptionNode.addEventListener("click", function () {
            handleResponse(index);
          });
        questionOptionNode.appendChild(optionTextnode);
        questionOptionsNode.appendChild(questionOptionNode);
    })
    

    // Append all to main content element
    mainContentElement.innerHTML = "";
    parentCard.appendChild(questionTextNode);
    parentCard.appendChild(questionOptionsNode);
    mainContentElement.appendChild(parentCard);
}

function handleResponse(answer){
    // Check if response is false, if so subtract from time
    if(answer !== questions[currentQuestion].answer){
        alert(`Wrong Choice`);
        subtractTime();
    } else {
        score++;
        alert(`Correct Choice`);
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
    clearInterval(timer);
    loadFinalPage();
}

function resetQuizParams(){
    timeleft = initialTime;
    currentQuestion = 0;
    score = 0;
}

function displayMainContent(contentName){
    mainContentElement.innerHTML = content[contentName]();
}