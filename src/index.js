document.addEventListener("DOMContentLoaded", (e) => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton")

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view and hide the end view
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [

    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass-energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),

  ];

  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0"); //02
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/
  let timer;
  startTimer();


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", function () { window.location.reload() })


  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results
  // startTimer() - Start the timer when the page load


  function showQuestion() {

    // Check if the quiz has questions
    if (!quiz.questions.length) {
      console.log("No questions!")
      return;
    }

    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;

    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered
    progressBar.style.width = `${(quiz.currentQuestionIndex + 1) / quiz.questions.length * 100}%`; // Get the pourcentage of questions answered
    // progressBar.style.width = (quiz.currentQuestionIndex / quiz.questions.length * 100).toString() + "%"; 

    // Update the question count (div#questionCount) show the current question out of total questions
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder

    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label
    question.choices.forEach((choice, i, arr) => {

      const listElm = document.createElement("li")

      listElm.innerHTML = `
        <label>
          <input type="radio" name="choice" value="${choice}">
          ${choice}
        </label>
      `
      choiceContainer.appendChild(listElm)
    })

    // console.log(questionContainer.offsetWidth) // Show the width of the questionContainer div
    // choiceContainer.style.minWidth = questionContainer.offsetWidth.toString() + "px"; // Set the min-width of choiceContainer div equal to the width's questionContainer div
  }


  function nextButtonHandler() {

    let selectedAnswer; // A variable to store the selected answer value

    // Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const choiceElmts = document.querySelectorAll("#choices li input")

    // Loop through all the choice elements and check which one is selected
    selectedAnswer = [...choiceElmts].filter((choiceElmt) => choiceElmt.checked);

    // If an answer is selected, check if it is correct and move to the next question
    if (selectedAnswer.length) {
      quiz.checkAnswer(selectedAnswer[0].value) // Check if selected answer is correct
      quiz.moveToNextQuestion() // Move to the next question
      showQuestion() // Show the next question
    }

  }


  function startTimer() {

    timer = setInterval(function () {

      quiz.timeRemaining--; // counting down from the time specified in the timeRemaining property of the Quiz instance

      // Convert the time remaining in seconds to minutes and seconds
      const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      // Update the timer text every second
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      // Stop counting down when the time is up - when timeRemaining is 0;
      if (quiz.timeRemaining <= 0) {
        showResults() // When the time is up, display the end view and the score
      }

    }, 1000)
  }


  function showResults() {

    // Ends the timer
    clearInterval(timer)

    // Hide the quiz view
    quizView.style.display = "none";

    // Show the end view
    endView.style.display = "flex";

    // Update the result container inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

});