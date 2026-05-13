class Question {
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices() {
        const shuffleArray = function (choice, index, choicesArr) {
            const tempChoice = choice
            const randomIndex = Math.floor(Math.random() * choicesArr.length)
            choicesArr[index] = choicesArr[randomIndex]
            choicesArr[randomIndex] = tempChoice
        }
        this.choices.forEach(shuffleArray);
    }

}