const dictionary = [
    { english: "intuition", icelandic: "innsæi" },
    { english: "manifest", icelandic: "áþreifanlegur" },
    { english: "compass", icelandic: "áttaviti" },
    { english: "procrastination", icelandic: "frestun" },
    { english: "define", icelandic: "afmarka" },
    // Add more entries as needed
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionButtons = Array.from(document.getElementsByClassName('option'));
const nextButton = document.getElementById('next-button');

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < dictionary.length) {
        setNextQuestion();
    } else {
        showResults();
    }
});

function setNextQuestion() {
    resetState();
    const currentQuestion = dictionary[currentQuestionIndex];
    questionElement.textContent = `What is the Icelandic translation for "${currentQuestion.english}"?`;

    const options = generateOptions(currentQuestion.icelandic);
    options.forEach((option, index) => {
        optionButtons[index].textContent = option;
        optionButtons[index].addEventListener('click', selectAnswer);
    });
}

function resetState() {
    optionButtons.forEach(button => {
        button.style.backgroundColor = '#4CAF50';
        button.removeEventListener('click', selectAnswer);
    });
}

function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * dictionary.length);
        const randomOption = dictionary[randomIndex].icelandic;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }
    return shuffleArray(options);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correctAnswer = dictionary[currentQuestionIndex].icelandic;
    if (selectedButton.textContent === correctAnswer) {
        selectedButton.style.backgroundColor = 'green';
        score++;
    } else {
        selectedButton.style.backgroundColor = 'red';
    }
    optionButtons.forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });
}

function showResults() {
    questionElement.textContent = `Quiz completed! Your score: ${score}/${dictionary.length}`;
    optionButtons.forEach(button => {
        button.style.display = 'none';
    });
    nextButton.style.display = 'none';
}

setNextQuestion();
