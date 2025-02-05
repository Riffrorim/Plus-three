//Начало работы
const input = document.getElementById("input-number");
const answer = document.getElementById("answer-button");
const startWindow = document.getElementById("start-window");
const number = document.getElementById("number");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const again = document.getElementById("again");
let nulles = document.getElementById("nulles");
let scoreHtml = document.getElementById("scoreHtml");
let result;
let timer;
let originalSrc;
let numberMinutes = 0;
let numberSeconds = 9;
let score = 0;
let saving;
function startProgramm(){
    if(input.value.trim() === "/start"){
        scoreHtml.innerHTML = score;
        startWindow.style.display = "none";
        input.value = "";
        numberMinutes = 0;
        numberSeconds = 15;
        number.innerHTML = Math.floor(Math.random() * 8999) + 1000;
        result = parseInt(number.innerHTML) + 3333;
        input.type = "number";
        nulles.innerHTML = "";
    timer = setInterval(() => {
        minutes.innerHTML = numberMinutes;
        seconds.innerHTML = numberSeconds;
        numberSeconds--;
        if(numberSeconds < 9){
                nulles.innerHTML = "0";
        }
        if(numberSeconds < 0){
            clearInterval(timer);
            number.innerHTML = "Побед: " + score;
            result = "";
            input.type = "text";
            saving = localStorage.setItem('point', score.toString());
            score = 0;
            scoreHtml.innerHTML = score;
            setTimeout(GameOver, 1000);
        }
    }, 1000);
    }
    else if(parseInt(input.value.trim()) === result){
        clearInterval(timer);
        input.value = "";
        againStartProgramm();
        score++;
        scoreHtml.innerHTML = score;
    }
    else if(parseInt(input.value.trim()) !== result){
        clearInterval(timer);
        number.innerHTML = "Побед: " + score;
        result = "";
        input.value = "";
        input.type = "text";
        saving = localStorage.setItem('point', score.toString());
        score = 0;
        scoreHtml.innerHTML = score;
        setTimeout(GameOver, 1000);
    }
    else{
        input.value = "";
    }
}
function changeColorButtons(){
    originalSrc = answer.src;
    answer.src = "on-answer.png";
    setTimeout(() =>
    {
        answer.src = originalSrc;
    }, 500);
}
//Перезапуск чисел, таймера и результата
function againStartProgramm(){
    let numberMinutes = 0;
    let numberSeconds = 15;
    number.innerHTML = Math.floor(Math.random() * 8999) + 1000;
    result = parseInt(number.innerHTML) + 3333;
        input.type = "number";
        nulles.innerHTML = "";
    timer = setInterval(() => {
        minutes.innerHTML = numberMinutes;
        seconds.innerHTML = numberSeconds;
        numberSeconds--;
        if(numberSeconds < 9){
            nulles.innerHTML = "0";
        }
        if(numberSeconds < 0){
            clearInterval(timer);
            number.innerHTML = "Побед: " + score;
            input.type = "text";
            saving = localStorage.setItem('point', score.toString());
            score = 0;
            scoreHtml.innerHTML = score;
            setTimeout(GameOver, 1000);
        }
    }, 1000);
}
function GameOver(){
    again.innerHTML = "Начать снова";
}
again.addEventListener("click", completion);
function stopCleanScore(){
    if(input.value.trim() !== ""){
        convergence();
    }
}
function convergence(){
    changeColorButtons();
    startProgramm();
    again.innerHTML = "";
}
answer.addEventListener("click", stopCleanScore);
//Быстрый ввод /start
const textStart = document.getElementById("start");
function completion(){
    input.value = "/start";
}
textStart.addEventListener("click", completion);
input.addEventListener("focus", function() {
    document.body.style.overflow = "hidden";
});

input.addEventListener("blur", function() {
    document.body.style.overflow = "";
});