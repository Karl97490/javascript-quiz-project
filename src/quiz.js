class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    shuffleQuestions() {
        const shuffleArray = function (question, index, questionsArr) {
            const tempQuestion = question
            const randomIndex = Math.floor(Math.random() * questionsArr.length)
            questionsArr[index] = questionsArr[randomIndex]
            questionsArr[randomIndex] = tempQuestion
        }
        this.questions.forEach(shuffleArray);
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {
        this.currentQuestionIndex++;
    }

    checkAnswer(answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex]
        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
        }
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }


    filterQuestionsByDifficulty(difficulty) {
        if (difficulty >= 1 || difficulty <= 3) {
            this.questions = this.questions.filter(question => question.difficulty === difficulty);
        }
    }

    averageDifficulty() {
        return this.questions.reduce((avgDifficulty, question, i, arr) => avgDifficulty + question.difficulty, 0) / this.questions.length;
    }
}
