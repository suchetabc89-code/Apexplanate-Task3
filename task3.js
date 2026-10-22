const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", function(event) {

    // Prevent page refresh

    event.preventDefault();


    // Get values

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    // Error elements

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const messageError =
        document.getElementById("messageError");

    const successMessage =
        document.getElementById("successMessage");


    // Clear previous messages

    nameError.textContent = "";

    emailError.textContent = "";

    messageError.textContent = "";

    successMessage.textContent = "";


    let valid = true;



    /* =====================================
       NAME VALIDATION
    ====================================== */

    if (name === "") {

        nameError.textContent =
            "Name is required.";

        valid = false;

    }

    else if (name.length < 3) {

        nameError.textContent =
            "Name must contain at least 3 characters.";

        valid = false;

    }



    /* =====================================
       EMAIL VALIDATION
    ====================================== */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        emailError.textContent =
            "Email is required.";

        valid = false;

    }

    else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;

    }



    /* =====================================
       MESSAGE VALIDATION
    ====================================== */

    if (message === "") {

        messageError.textContent =
            "Message is required.";

        valid = false;

    }

    else if (message.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        valid = false;

    }



    /* =====================================
       SUCCESS
    ====================================== */

    if (valid) {

        successMessage.textContent =
            "Form submitted successfully!";

        contactForm.reset();

    }

});



/* =====================================================
   DYNAMIC TO-DO LIST
===================================================== */


const taskInput =
    document.getElementById("taskInput");


const addTask =
    document.getElementById("addTask");


const taskList =
    document.getElementById("taskList");



/* =====================================
   ADD TASK
====================================== */

function addNewTask() {

    const taskText =
        taskInput.value.trim();


    // Empty task check

    if (taskText === "") {

        alert("Please enter a task.");

        return;

    }


    // Create list item

    const listItem =
        document.createElement("li");


    // Create task text

    const text =
        document.createElement("span");


    text.textContent = taskText;

    text.className = "task-text";



    /* Complete task */

    text.addEventListener("click", function() {

        text.classList.toggle("completed");

    });



    // Create delete button

    const deleteButton =
        document.createElement("button");


    deleteButton.textContent =
        "Delete";


    deleteButton.className =
        "delete-btn";



    /* Delete task */

    deleteButton.addEventListener("click", function() {

        listItem.remove();

    });



    // Add elements

    listItem.appendChild(text);

    listItem.appendChild(deleteButton);


    // Add task to list

    taskList.appendChild(listItem);


    // Clear input

    taskInput.value = "";

}



addTask.addEventListener("click", addNewTask);



/* Add task using Enter */

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addNewTask();

    }

});



/* =====================================================
   INTERACTIVE QUIZ
===================================================== */


const questions = [

    {
        question:
            "Which language is used to structure a webpage?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        correct: "HTML"
    },


    {
        question:
            "Which language is used to style a webpage?",

        answers: [
            "HTML",
            "CSS",
            "C",
            "Java"
        ],

        correct: "CSS"
    },


    {
        question:
            "Which language is used for DOM manipulation?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        correct: "JavaScript"
    },


    {
        question:
            "Which CSS system is useful for two-dimensional layouts?",

        answers: [
            "Flexbox",
            "CSS Grid",
            "Float",
            "Position"
        ],

        correct: "CSS Grid"
    },


    {
        question:
            "Which JavaScript method is commonly used to fetch API data?",

        answers: [
            "fetch()",
            "print()",
            "scan()",
            "write()"
        ],

        correct: "fetch()"
    }

];



/* Quiz variables */

let currentQuestion = 0;

let score = 0;

let answerSelected = false;



/* HTML elements */

const questionNumber =
    document.getElementById("questionNumber");


const questionElement =
    document.getElementById("question");


const answersElement =
    document.getElementById("answers");


const nextButton =
    document.getElementById("nextButton");


const quizResult =
    document.getElementById("quizResult");



/* =====================================
   DISPLAY QUESTION
====================================== */

function showQuestion() {

    answerSelected = false;


    const current =
        questions[currentQuestion];


    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    questionElement.textContent =
        current.question;


    answersElement.innerHTML = "";


    quizResult.textContent = "";


    nextButton.disabled = true;


    nextButton.textContent =
        "Next Question";



    /* Create answer buttons */

    current.answers.forEach(function(answer) {


        const button =
            document.createElement("button");


        button.textContent =
            answer;


        button.className =
            "answer-button";


        button.addEventListener("click", function() {

            selectAnswer(button, answer);

        });


        answersElement.appendChild(button);

    });

}



/* =====================================
   SELECT ANSWER
====================================== */

function selectAnswer(button, answer) {


    // Prevent multiple selections

    if (answerSelected) {

        return;

    }


    answerSelected = true;


    const current =
        questions[currentQuestion];



    /* Correct answer */

    if (answer === current.correct) {

        button.classList.add("correct");

        score++;

    }


    /* Wrong answer */

    else {

        button.classList.add("wrong");


        // Show correct answer

        const allButtons =
            document.querySelectorAll(".answer-button");


        allButtons.forEach(function(btn) {

            if (btn.textContent === current.correct) {

                btn.classList.add("correct");

            }

        });

    }


    nextButton.disabled = false;

}



/* =====================================
   NEXT QUESTION
====================================== */

nextButton.addEventListener("click", function() {


    currentQuestion++;


    if (currentQuestion < questions.length) {

        showQuestion();

    }

    else {

        showResult();

    }

});



/* =====================================
   SHOW RESULT
====================================== */

function showResult() {


    questionNumber.textContent =
        "Quiz Completed";


    questionElement.textContent =
        "Your score: " +
        score +
        " / " +
        questions.length;


    answersElement.innerHTML = "";


    quizResult.textContent =
        "You completed the quiz successfully!";


    nextButton.textContent =
        "Restart Quiz";


    nextButton.disabled = false;


    nextButton.onclick =
        restartQuiz;

}



/* =====================================
   RESTART QUIZ
====================================== */

function restartQuiz() {


    currentQuestion = 0;

    score = 0;


    nextButton.onclick = null;


    showQuestion();

}



/* Start quiz */

showQuestion();



/* =====================================================
   FETCH DATA FROM PUBLIC API
===================================================== */


/*
   Official Joke API

   This API does not require
   an API key.
*/


const jokeButton =
    document.getElementById("jokeButton");


const jokeElement =
    document.getElementById("joke");



/* =====================================
   FETCH JOKE
====================================== */

jokeButton.addEventListener("click", function() {


    jokeElement.textContent =
        "Loading joke...";


    fetch(
        "https://official-joke-api.appspot.com/random_joke"
    )


    .then(function(response) {


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );

        }


        return response.json();

    })


    .then(function(data) {


        jokeElement.textContent =
            data.setup +
            " — " +
            data.punchline;

    })


    .catch(function(error) {


        jokeElement.textContent =
            "Unable to load joke. Please try again.";


        console.log(error);

    });

});

