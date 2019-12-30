var counter = 0;
var answerTimeout;
var displayTimer;

var answerBtn1 = document.getElementById('answer-1');
var answerBtn2 = document.getElementById('answer-2');
var progress = document.getElementById('progress');
var question = document.getElementById('question');
var solution = document.getElementById('solution');
var timer = document.getElementById('timer');

window.onload = function () {
    var cookies = {};
    
    document.cookie.split(';').map(function (el) {
        el = el.split('=');

        return cookies[el[0]] = el[1];
    });

    if (cookies.solution === 'true') {
        return solution.setAttribute('class', 'show');
    }

    progress.setAttribute('max', questions.length);

    answerBtn1.addEventListener('click', function () {
        checkAnswer(answerBtn1.value, counter);
    });

    answerBtn2.addEventListener('click', function () {
        checkAnswer(answerBtn2.value, counter);
    });

    runQuestion(0);
}

function runQuestion(key) {
    var seconds = 5;
    var randomizer = Math.random();

    clearTimeout(answerTimeout);
    clearInterval(displayTimer);

    question.innerText = questions[key].q;

    if(randomizer > 0.5) {
        answerBtn1.innerText = questions[key].a[0];
        answerBtn2.innerText = questions[key].a[1];
        answerBtn1.setAttribute('value', 1);
        answerBtn2.setAttribute('value', 2);
    } else {
        answerBtn1.innerText = questions[key].a[1];
        answerBtn2.innerText = questions[key].a[0];
        answerBtn1.setAttribute('value', 2);
        answerBtn2.setAttribute('value', 1);
    }

    timer.innerText = seconds;
    displayTimer = setInterval(function () {
        timer.innerText = --seconds;
    }, 1000);

    return answerTimeout = setTimeout(function () {
        counter = 0;
        progress.value = counter;

        return runQuestion(counter);
    }, seconds * 1000);
}

function checkAnswer(value, key) {
    if (questions[key].v == value) {
        counter++;
        progress.value = counter;

        if (counter < questions.length) {
            return runQuestion(counter);
        } else {
            clearTimeout(answerTimeout);
            clearInterval(displayTimer);

            timer.innerText = '-';
            solution.setAttribute('class', 'show');
            document.cookie = "solution=true; max-age=3600";

            return true;
        }
    } else {
        counter = 0;
        progress.value = counter;

        return runQuestion(counter);
    }
}