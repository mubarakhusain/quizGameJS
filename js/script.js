(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
      },
      correctAnswer: "c",
    },
    {
      question: "Which type of language is Javascript?",
      answers: {
        a: "Programming",
        b: "Scriptingt",
        c: "Mark up",
        d: "None of the Above",
      },
      correctAnswer: "a",
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint",
      },
      correctAnswer: "d",
    },
    {
      question: "Which is not valid data type in Javascript?",
      answers: {
        a: "Undefinded",
        b: "Boolean",
        c: "float S",
        d: "Number",
      },
      correctAnswer: "c",
    },
    {
      question: "What does HTML stands for?",
      answers: {
        a: "Hypertext Machine Language",
        b: "Hypertext and Link Labguage",
        c: "Hypertext Markup Language",
        d: "Hightext Machine Language",
      },
      correctAnswer: "c",
    },
    {
      question: "Who discovered Protons?",
      answers: {
        a: "Rutherford",
        b: "Newton",
        c: "Marie Curie",
        d: "Einstine",
      },
      correctAnswer: "a",
    },
    {
      question: "What does Big Bang Theory explain?",
      answers: {
        a: "Shrinking of Universe",
        b: "Origin of Universe",
        c: "State of Universe",
        d: "Size of Universe",
      },
      correctAnswer: "b",
    },
    {
      question: "Which is the smallest Ocean?",
      answers: {
        a: "Indian Ocean",
        b: "Pacific Ocean",
        c: "Arctic Ocean",
        d: "Atlantic Ocean",
      },
      correctAnswer: "c",
    },
    {
      question: "What is the SI unit of Force?",
      answers: {
        a: "Pascal",
        b: "Tesla",
        c: "ampere",
        d: "Newton",
      },
      correctAnswer: "d",
    },
    {
      question: "Which is the first Asian country to orbit Mars?",
      answers: {
        a: "South korea",
        b: "China",
        c: "India",
        d: "UAE",
      },
      correctAnswer: "c",
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
