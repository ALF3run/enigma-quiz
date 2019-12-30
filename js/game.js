var counter = 0;
var answerTimeout;
var displayTimer;

var answerBtn1 = document.getElementById('answer-1');
var answerBtn2 = document.getElementById('answer-2');
var question = document.getElementById('question');
var timer = document.getElementById('timer');

window.onload = function () {
    var cookies = {};
    
    document.cookie.split(';').map(function (el) {
        var couple = el.split('=');
        var obj = {};

        return cookies[couple[0]] = couple[1];
    });

    if (cookies.solution === 'true') {
        return document.getElementById('solution').setAttribute('class', 'show');
    }

    answerBtn1 = document.getElementById('answer-1');
    answerBtn2 = document.getElementById('answer-2');
    question = document.getElementById('question');
    timer = document.getElementById('timer');

    answerBtn1.addEventListener('click', function () {
        checkAnswer(1, counter);
    });

    answerBtn2.addEventListener('click', function () {
        checkAnswer(2, counter);
    });

    runQuestion(0);
}

function runQuestion(key) {
    var seconds = 5;

    clearTimeout(answerTimeout);
    clearInterval(displayTimer);

    question.innerText = questions[key].q;
    answerBtn1.innerText = questions[key].a[0];
    answerBtn2.innerText = questions[key].a[1];

    timer.innerText = seconds;
    displayTimer = setInterval(function () {
        timer.innerText = --seconds;
    }, 1000);

    return answerTimeout = setTimeout(function () {
        counter = 0;
        document.getElementById('progress').value = counter;

        return runQuestion(counter);
    }, seconds * 1000);
}

function checkAnswer(value, key) {
    if (questions[key].v === value) {
        counter++;
        document.getElementById('progress').value = counter;

        if (counter < questions.length) {
            return runQuestion(counter);
        } else {
            clearTimeout(answerTimeout);
            clearInterval(displayTimer);

            timer.innerText = '-';
            document.getElementById('solution').setAttribute('class', 'show');
            document.cookie = "solution=true; max-age=3600";

            return true;
        }
    } else {
        counter = 0;
        document.getElementById('progress').value = counter;

        return runQuestion(counter);
    }

}