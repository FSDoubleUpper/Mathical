let correctCounter = 0, problemCounter = 1;
let answers = [];
let maxProblem = 10;
let maxValue = 10;
let problemExpression = "";
let answer = 0;
let value1 = 0, value2 = 0;
let operator = "+";

function getVariables() {
    console.log(
        "correctCounter: " + correctCounter, "\n",
        "answers: " + answers, "\n",
        "maxProblem: " + maxProblem, "\n",
        "maxValue: " + maxValue, "\n",
        "problemExpression: " + problemExpression, "\n",
        "answer: " + answer, "\n",
        "value1: " + value1, "\n",
        "value2: " + value2, "\n",
        "operator: " + operator, "\n",
        "currentProblem: " + document.querySelector(".currentProblem").innerText, "\n",
        "totalProblem: " + document.querySelector(".totalProblem").innerText, "\n",
        "Score: " + document.querySelector(".currentScore").innerText
    )
}

function showHideProblem(bool) {
    document.querySelectorAll('.show-hide').forEach(showHide => {
        if (bool) {
            showHide.style.display = 'inline';
        } else {
            showHide.style.display = 'none';
        }
    });
}

function showSettings(bool) {
    let settingSelector = document.querySelector(".settings");
    if(bool) {
        settingSelector.style.display = 'inline';
    } else {
        settingSelector.style.display = 'none';
    }
}

function showScoreBoard(bool) {
    let scoreSelector = document.getElementById("problem");
    if(bool) {
        scoreSelector.style.display = 'inline';
    } else {
        scoreSelector.style.display = 'none';
    }
}

function showStartOverButton(bool) {
    let buttonSelector = document.querySelector(".hide");
    if(bool) {
        buttonSelector.style.display = 'inline';
    } else {
        buttonSelector.style.display = 'none';
    }
}

function startOverReload(bool) {
    if (bool) {
        showSettings(true);
        showScoreBoard(false);
        showStartOverButton(false);
        showHideProblem(false);
    } else {
        showSettings(false);
        showScoreBoard(true);
        showStartOverButton(true);
        showHideProblem(true);
    }
}

function setSettings() {
    maxProblem = document.getElementById("maxProb").value;
    maxValue = document.getElementById("maxValue").value;
    operator = document.getElementById("opType").value;

    if (maxProblem == 0 || maxProblem == "") {
        maxProblem = 10;
    }
    if (maxValue == 0 || maxValue == "") {
        maxValue = 10;
    }
    document.querySelector(".totalProblem").innerHTML = maxProblem;
}

function getRandomNumber(max) {
    let randomNumber = Math.floor(Math.random() * Math.floor(max));
    if (operator == "division") {
        while (randomNumber == 0) {
            randomNumber = Math.floor(Math.random() * Math.floor(max));
        }
    }
    return randomNumber;
}

function setValues(maxValue) {
        value1 = getRandomNumber(maxValue);
        value2 = getRandomNumber(maxValue);
}

function setProblemExpression() {
    switch (operator) {
        case "addition": problemExpression = value1 + " + " + value2; break;
        case "subtraction": problemExpression = value1 + " - " + value2; break;
        case "multiplication": problemExpression = value1 + " × " + value2; break;
        case "division": problemExpression = value1 + " ÷ " + value2; break;
        default: problemExpression = value1 + " + " + value2;
    }
}

function getProblemExpression() {
    return problemExpression;
}

function setAnswer() {
    switch(operator) {
        case "addition": answer = value1 + value2; break;
        case "subtraction": answer = value1 - value2; break;
        case "multiplication": answer = value1 * value2; break;
        case "division": answer = value1 / value2; break;
        default: answer = value1 + value2;
    }
}

function getIncorrectAnswer() {
    let incorrectAnswer = 0;

    switch(operator) {
        case "addition": incorrectAnswer = value1 + getRandomNumber(maxValue); break;
        case "subtraction": incorrectAnswer = value1 - getRandomNumber(maxValue); break;
        case "multiplication": incorrectAnswer = value1 * getRandomNumber(maxValue); break;
        case "division": incorrectAnswer = value1 / getRandomNumber(maxValue); break;
        default: incorrectAnswer = value1 + getRandomNumber(maxValue);
    }

    if (incorrectAnswer % 1 == 0) {
        return incorrectAnswer;
    } else {
        return incorrectAnswer.toFixed(2);
    }
}

function getAnswer() {
    if (answer % 1 == 0) {
        return answer;
    } else {
        return answer.toFixed(2);
    }
}

function addAnswers() {
    let incorrectAnswer = getIncorrectAnswer();
    answers.push(getAnswer());
    while (answers.length < 4) {
        if (answers.includes(incorrectAnswer)) {
            incorrectAnswer = getIncorrectAnswer();
        } else {
            answers.push(incorrectAnswer);
        }
    }
}

function shuffleArray(arr) {
    return arr.sort((a, b) => Math.random() - 0.5);
}

function displayAnswers() {  
    let shuffledAnswers = shuffleArray(answers); 
    for (let n = 0; n < shuffledAnswers.length; n++) {
        document.querySelectorAll('li')[n].innerText = shuffledAnswers[n];
    };
}

function incrementScore() {
    correctCounter++;
    document.querySelector('.currentScore').innerText = correctCounter;
}

function nextExpression() {
    answers = [];
    setValues(maxValue);
    setProblemExpression();
    document.querySelector(".expression").innerText = getProblemExpression();
    setAnswer();
    addAnswers()
    displayAnswers();
}

function incrementProblemCounter() {
    problemCounter++;
    document.querySelector('.currentProblem').innerText = problemCounter;
}

function resetValues() {
    correctCounter = 0, problemCounter = 1;
    answers = [];
    maxProblem = 10;
    maxValue = 10;
    problemExpression = "";
    answer = 0;
    value1 = 0, value2 = 0;
    operator = "addition";
    document.querySelector(".currentProblem").innerText = 1;
    document.querySelector(".currentScore").innerText = 0;
}

function evaluateChoice(e) {
    if (problemCounter <= maxProblem) {
        if (e.innerText == getAnswer()) {
            incrementScore();
        }
        nextExpression();
    }
}

function isFinish() {
    if (problemCounter >= (parseInt(maxProblem) + 1)) {
        document.querySelector('.currentProblem').innerText = maxProblem;
        document.querySelector(".currentScore").innerText += " (" 
            + ((correctCounter / parseInt(maxProblem)) * 100).toFixed(2) + "%)";
        showHideProblem(false);
    }
}

//-------------------------------DOMContentLoaded-------------------------------//
document.addEventListener('DOMContentLoaded', () => {
    //Initialize the UI
    setTimeout(startOverReload(true), 2000);
    
    document.getElementById("submitStart").addEventListener('click', e => {
        setTimeout(setSettings(), 2000);
        setValues(maxValue);
        setTimeout(startOverReload(false), 2000);
        e.preventDefault();
        setProblemExpression();
        document.querySelector(".expression").innerText = getProblemExpression();
        setAnswer();
        addAnswers();
        setTimeout(displayAnswers(), 2000);
    })
    
    document.querySelectorAll('li').forEach(listItem => {
        listItem.addEventListener('click', () => {
            setTimeout(evaluateChoice(listItem), 2000);
            incrementProblemCounter();
            isFinish();
        })
    });

    document.getElementById('btnStartOver').addEventListener('click', () => {
        resetValues();
        startOverReload(true);
    })  
});