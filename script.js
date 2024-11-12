let questions = [];
let currentQuestionIndex = 0;
let score = 0;
const delayTime = 1000; // Delay time in milliseconds for moving to the next question

async function loadQuestions() {
    const response = await fetch('questions.json');
    const data = await response.json();
    return data;
}

function startQuiz() {
    const section = document.getElementById('section').value;
    loadQuestions().then(data => {
        questions = data[section].sort(() => 0.5 - Math.random()); // Shuffle questions
        score = 0;
        currentQuestionIndex = 0;
        document.getElementById('section-select').style.display = 'none';
        document.getElementById('question-container').style.display = 'block';
        document.getElementById('score').style.display = 'none'; // Hide score until the quiz ends
        showQuestion();
    });
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    if (!question) {
        endQuiz();
        return;
    }

    document.getElementById('question').innerText = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    if (question.image) {
        document.getElementById('scientist-image').src = question.image;
        document.getElementById('scientist-image').style.display = 'block';
    } else {
        document.getElementById('scientist-image').style.display = 'none';
    }

    // Shuffle and display options
    const shuffledOptions = question.options.sort(() => 0.5 - Math.random());
    shuffledOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerText = option;
        optionElement.onclick = () => selectOption(option, question.answer);
        optionsContainer.appendChild(optionElement);
    });
}

function selectOption(selected, correct) {
    if (selected === correct) {
        score++; // Increment score for correct answer
        currentQuestionIndex++;
        setTimeout(showQuestion, delayTime); // Automatically move to the next question after a delay
    } else {
        endQuiz(); // End quiz if the answer is incorrect
    }
}

function endQuiz() {
    // Hide the question container
    document.getElementById('question-container').style.display = 'none';
    // Display the score
    document.getElementById('score').innerText = `Quiz over! Your total score is: ${score}`;
    document.getElementById('score').style.display = 'block'; // Show the score container
}
