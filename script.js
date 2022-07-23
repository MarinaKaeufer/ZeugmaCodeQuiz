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
const welcomeTitleName = "welcome_title";
const greenButtonName = "green_button";
const headerText = "header_text";

// HTML Content
const content = {
    startPage: () => `<div><div id=${welcomeTitleName}>Welcome</div></br>
        <button id=${startButtonName} class=${greenButtonName}>Start Quiz</button></div>`,
    highScore: () => {
        const scoreArray = getScores();
        let individualScores = ``;
        for(let i = 0; i < scoreArray.length; i++){
            individualScores += `
            <article class="leaderboard__profile">
                <span class="leaderboard__name">${scoreArray[i]['initials']}</span>
                <span class="leaderboard__value">${scoreArray[i]['score']}<span>Points</span></span>
            </article>
            `}
        
        return `
        <article class="leaderboard">
            <header>
                <h1 class="leaderboard__title">
                    <span class="leaderboard__title--top">Score</span>
                    <span class="leaderboard__title--bottom">History</span>
                </h1>
            </header>
  
            <main class="leaderboard__profiles">
                <div class=${headerText}>High Scores Page</div>
                ${individualScores}
                <button id=${startOverName} class=${greenButtonName}>Start Over</button>
            </main>
        </article>
        `
    },
    finalPage: () => 
    `<div>
        <div class=${headerText}>Your Score Was:</div>
        <div id=${scoreSpanName} class=${headerText}> </div>
        

        <div class="field">
            <input type="text" id=${userInitialsName} placeholder="What are your initials?"/>
            <div class="line"></div>
            
        </div>
        <button id=${submitScoreButtonName} class=${greenButtonName}>Submit</button>
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
    {question: "Arrays in JavaScript can be used to store:", options: ["numbers and strings","other arrays","booleans","all of the above"], answer: 4},
    {question: "The condition in an if/else statement is enclosed with", options: ["quotes","curly brackets","parenthesis","square brackets"], answer: 3},
    {question: "A very useful tool used during development and debugging for printing content to the debugger is", options: ["JavaScript","terminal/bash","for loops","console log"], answer: 4}
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
        timeleft--;
        }, 1000);
}

function loadFinalPage(){
    displayMainContent('finalPage');
    const scoreSpanElement = document.getElementById(scoreSpanName);
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
        questionOptionNode.classList.add(greenButtonName);
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
        // TODO
        // alert(`Wrong Choice`);
        subtractTime();
    } else {
        score++;
        // TODO
        // alert(`Correct Choice`);
    }
    // Go to next question of show final page with results / score
    if(currentQuestion + 1 < questions.length){
        currentQuestion++;
        console.log(`==> handleResponse currentQuestion after increase ${currentQuestion}`);
        loadQuestionsContent();
    } else {
        endQuiz();
    }
}

function subtractTime(){
    timeleft = timeleft - 10;
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