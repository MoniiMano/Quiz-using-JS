const questions=[
    {
        question:"Inside which HTML element do we put the JavaScript?",
        answers: [
            {text: "javascript" , correct:false},
            {text: "js" , correct:false},
            {text: "script" , correct:true},
            {text: "scripting" , correct:false},
        ]
    },
    {
        question:"How to write an IF statement in JavaScript?",
        answers: [
            {text: "if(i==5)" , correct:true},
            {text: "if i=5" , correct:false},
            {text: "if i==5 then" , correct:false},
            {text: "if i=5 then" , correct:false},
        ]
    },
    {
        question:"How do you round the number 7.25, to the nearest integer?",
        answers: [
            {text: "Math.rnd(7.25)" , correct:false},
            {text: "rnd(7.25)" , correct:false},
            {text: "round(7.25)" , correct:false},
            {text: "Math.round(7.25)" , correct:true},
        ]
    },
    {
        question:"Which event occurs when the user clicks on an HTML element?",
        answers: [
            {text: "onmouseover" , correct:false},
            {text: "onclick" , correct:true},
            {text: "onmouseclick" , correct:false},
            {text: "onchange" , correct:false},
        ]
    },
    {
        question:"Which operator is used to assign a value to a variable?",
        answers: [
            {text: "-" , correct:false},
            {text: "*" , correct:false},
            {text: "+" , correct:false},
            {text: "=" , correct:true},
        ]
    },

];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}
    function resetState()
    {
        nextButton.style.display="none";
        while(answerButton.firstChild)
        {
            answerButton.removeChild(answerButton.firstChild);
        }
    }

    function selectAnswer(e)
    {
        const selectedBtn =e.target;
        const isCorrect=selectedBtn.dataset.correct=="true";
        if(isCorrect)
        {
            selectedBtn.classList.add("correct");
            score++;
        }
        else
        {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButton.children).forEach(button => {
            if(button.dataset.correct=="true")
            {
                button.classList.add("correct");
            }
            button.disabled=true;
        });
        nextButton.style.display="block";
    }

    function showScore()
    {
        resetState();
        questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML="Play Again";
        nextButton.style.display="block";
    }

    function hendleNextButton()
    {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length)
        {
            showQuestion();
        }
        else
        {
            showScore();
        }
    }

    nextButton.addEventListener("click", () =>{
        if(currentQuestionIndex < questions.length)
        {
            hendleNextButton();
        }
        else
        {
                startQuiz();
        }
    });
    startQuiz();