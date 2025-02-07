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
let blockSetting = false;
function startProgramm(){
    if(input.value.trim() === "/start"){
        menuSetting.style.display = "none";
        blockSetting = true;
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
            blockSetting = false;
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
        blockSetting = false;
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
    blockSetting = true;
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
            blockSetting = false;
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

//Открытие окна настроек
let custom = document.getElementById("custom");
let isChanging = false; // Флаг для отслеживания активности изменения
let menuSetting = document.getElementById("menu-settings");
let touch = false;
function changeSettingsButton() {
    if (isChanging) return; // Если изменение уже активно, выходим из функции

    let customIdOrig = custom.src;
    custom.src = "onCustomization.png";
    isChanging = true; // Устанавливаем флаг в true

    setTimeout(() => {
        custom.src = customIdOrig;
        isChanging = false; // Сбрасываем флаг после завершения анимации
    }, 50);
    toggleMenuSetting();
}
function toggleMenuSetting(){
    if(blockSetting === false){
    if(touch === false){
        menuSetting.style.display = "flex";
       touch = true;
    }
    else{
        menuSetting.style.display = "none";
        touch = false;
    }
    }
    else if(blockSetting === true){
    }
}
custom.addEventListener("click", changeSettingsButton);
//Включить счётчик
let counter = document.getElementById("counter");
touch2 = false;
function onTurnCounter(){
    if(touch2 === false){
        counter.src = "onTurn.png";
        touch2 = true;
        scoreHtml.style.display = "flex";
    }
    else{
        counter.src = "offTurn.png"
        touch2 = false;
        scoreHtml.style.display = "none";
    }
}
counter.addEventListener("click", onTurnCounter);