window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
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

// Content
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
    {question: "Question 1", options: ["Option 1","Option 2","Option 3","Option 4"], answer: 0},
    {question: "Question 2", options: ["Option 1","Option 2","Option 3","Option 4"], answer: 1}
];
let currentQuestion;

function init(){
    attachScoreEventListener();
    loadStartPageContent();
    loadInitialTimer();
}

function getScores(){
    return JSON.parse(localStorage.getItem("results")) ? JSON.parse(localStorage.getItem("results")) : [];
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
    // TODO
    console.log(`For question ${currentQuestion} you responded with ${answer}`);
    // Check if response is false, if so subtract from time
    if(answer !== questions[currentQuestion].answer){
        
        // TODO 
        // alert(`Wrong Choice`);
        subtractTime();
    } else {
        score =+ 1;
        // TODO
        // alert(`Correct Choice`);
    }
    // Go to next question of show final page with results / score
    if(currentQuestion + 1 < questions.length){
        currentQuestion =+ 1;
        loadQuestionsContent();
    } else {
        // TODO
        console.log(`score ${score}`);
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