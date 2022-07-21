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
  const mainContent = document.getElementById('content');

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

  }

  function loadStartPageContent(){
    displayMainContent('startPage');
  }

  function startQuiz(){
    
  }

  function displayHighScores(){
    displayMainContent('highScore');
  }

  function displayMainContent(contentName){
    mainContent.innerHTML = content[contentName];
  }

