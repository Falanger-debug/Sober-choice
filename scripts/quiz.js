let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    fetch("../questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        })
        .catch(error => console.error("Error loading questions:", error));
});

function showQuestion() {
    document.getElementById("result-container").classList.remove("active");
    document.getElementById("question-container").classList.add("active");

    const questionElement = document.getElementById("question");
    const choicesContainer = document.getElementById("choices");

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerText = choice;
        button.classList.add("choice-button");
        button.addEventListener("click", () => selectAnswer(index));
        choicesContainer.appendChild(button);
    });


}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    const choiceButtons = document.querySelectorAll('.choice-button');
    choiceButtons.forEach(button => button.classList.remove("selected"));

    choiceButtons[selectedIndex].classList.add("selected");

    selectedAnswerIndex = selectedIndex;

    document.getElementById("next-button").style.display = "block";
}

function nextQuestion() {

    const currentQuestion = questions[currentQuestionIndex];
    const currentCorrectIndex = "ABCD".indexOf(currentQuestion.correctAnswer);
    if (currentCorrectIndex === selectedAnswerIndex) {
        score += 1;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
    document.getElementById("next-button").style.display = "none";
}

function showResult() {
    document.getElementById("question-container").classList.remove("active");
    document.getElementById("result-container").classList.add("active");
    document.getElementById("score").innerText = `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-container").classList.remove("active");
    document.getElementById("question-container").classList.add("active");
    showQuestion();
}