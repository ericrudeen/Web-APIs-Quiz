var startQuizButton = document.querySelector(".start-button");
var timeEl = document.querySelector(".time");
var startBoxEl = document.querySelector(".start-box");
var quizBoxEl = document.querySelector(".quiz-box");
var completeBoxEl = document.querySelector(".complete-box");
var questionsEl = document.querySelector(".questions");
var answersEl = document.querySelector(".answers");
var hasQuizStarted = false;
var questionIndex = 0;
var questions = [
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        options: ["commas", "quotes", "parentheses", "curly brackets"],
        answer: "quotes"
    },
    {
        title: "The condition in an if/else statement is enclosed in _____.",
        options: ["square brackets", "parentheses", "curly brackets", "quotes"],
        answer: "parentheses"
    },
    {
        title: "Commonly used data types DO NOT include:",
        options: ["booleans", "numbers", "alerts", "strings"],
        answer: "alerts"
    },
    {
        title: "Arrays in JavaScript can be used to store _______.",
        options: ["booleans", "numbers and strings", "other arrays", "all of the above"],
        answer: "all of the above"
    },
];
var hasQuizEnded = false;
var endQuizEl = document.querySelector('.complete-box');
var initials = "";
var correctAnswers = 0;

/******************** Start the Quiz! ************************/

/* Start Button */
startQuizButton.addEventListener("click", function(){
    startTimer();
    startGame();
    startQuestions();
})

/* Start Timer */
var secondsLeft = 75;

function startTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left"
        if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    },1000);
}

/* Start Game */
function startGame() {
    hasQuizStarted = true;
    startBoxEl.setAttribute("class","hidden");
    quizBoxEl.setAttribute("class","visible");
}

/* Start Questions */
function startQuestions() {
    questionsEl.textContent = questions[questionIndex].title;
    answersEl.innerHTML = '';
    for (var i = 0; i < questions[questionIndex].options.length; i++) {
        var answerButton = document.createElement("button")
        answerButton.textContent = questions[questionIndex].options[i];
        answerButton.onclick = checkAnswer;
        answersEl.append(answerButton);
    }
}

/* Checks the answer clicked on against the answer stored in the questionIndex */
function checkAnswer() {
    if (this.textContent === questions[questionIndex].answer) {
        /* insert pseudoclass here*/
        correctAnswers++;
    } else{
        /* insert pseudoclass here*/
        secondsLeft -= 10;
    } 
    questionIndex++;
    if (questionIndex > 3) {
        clearInterval(timerInterval)
        getInitials();
    } else {
        startQuestions();
    }
}

/* Stores the initials in the initials variable and ends the quiz */
document.querySelector('.submit-initials').addEventListener("click", function() {
    initials = document.querySelector(".initials").nodeValue;
    endQuiz();
})


function getInitials() {
    document.getElementById("your-score").textContent = "Your score is " + correctAnswers;
    document.querySelector("#complete-box").classList.remove("hidden");
    quizBoxEl.setAttribute("class", "hidden");
}

function endQuiz() {
    hasQuizEnded = true;
    endQuizEl.setAttribute("class","visible");
}