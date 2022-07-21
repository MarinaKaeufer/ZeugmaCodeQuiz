window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    init();
  });

  // ID names 
  const startButtonName = "start_button";
  // Content
  const content = {
    startPage: `<h1>Welcome</h1><button id=${startButtonName}>Start Quiz</button>`
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

  }

  function attachStartButtonEventListener(){
    const startButton = document.getElementById('content');
    startButton.addEventListener ("click", startQuiz);
  }

  function loadTimer(){

  }

  function loadStartPageContent(){
    mainContent.innerHTML = content['startPage'];
  }

  function startQuiz(){
    alert('Start Quiz...');
  }


