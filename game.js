const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is his favourite food?',
        choice1: 'Mutton Biryani',
        choice2: 'Chicken Wings',
        choice3: 'Chicken Teriyaki Salad',
        choice4: 'Tandoori Chicken',
        answer: 1,
    },
    {
        question:
            "What is his favourite timepass?",
        choice1: "Reading",
        choice2: "Singing",
        choice3: "Doomscrolling",
        choice4: "Sleeping",
        answer: 3,
    },
    {
        question: "What is his favourite movie?",
        choice1: "Gangs of Wasseypur (Part 1)",
        choice2: "Gangs of Wasseypur (Part 2)",
        choice3: "Andaz Apna Apna",
        choice4: "Shawshank Redemption",
        answer: 1,
    },
    {
        question: "What according to him is the best description of himself?",
        choice1: "Bald",
        choice2: "Weird",
        choice3: "Controversial",
        choice4: "Smart",
        answer: 4,
    },

    {
        question: "If he could swap lives with one fictional character, who would it be?",
        choice1: "Harry Potter",
        choice2: "God",
        choice3: "Sardar Khan",
        choice4: "James Bond",
        answer: 2,
    },

    {
        question: "Which of these is he most likely to commit?",
        choice1: "Blasphemy",
        choice2: "Misogyny",
        choice3: "Racism",
        choice4: "Homophobia",
        answer: 1,
    },

    {
        question: "What is a superpower that he would like to have?",
        choice1: "Superspeed",
        choice2: "Shapeshifting",
        choice3: "Iccha Mrityu",
        choice4: "Probability Manipulation",
        answer: 3,
    },

    {
        question: "Which song describes him the best?",
        choice1: "Jaane Woh Kaise Log The",
        choice2: "Jaa Chudail",
        choice3: "Main Pal Do Pal Ka Shayar Hoon",
        choice4: "Gumaan",
        answer: 4,
    },

    {
        question: "What is his favourite quote?",
        choice1: "The most amazing things that can happen to a human being will happen to you, if you just lower your expectations.",
        choice2: "The man of knowledge must be able not only to love his enemies but also to hate his friends.",
        choice3: "How can a man of consciousness have the slightest respect for himself.",
        choice4: "God is dead.",
        answer: 4,
    },

    {
        question: "What annoys him the most?",
        choice1: "Hypocrisy",
        choice2: "Forced humour",
        choice3: "Narcissism",
        choice4: "Quizzes",
        answer: 2,
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()