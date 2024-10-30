const state = {
   view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
   },
   values:{
    timeId: null,
    gameVelocity: 750,
    hitPosition: 0,
    points: 0,
    currentTime: 30,
   },
   actions:{
    countDownTimerId: setInterval(countDown, 1000),
   },
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        alert("Game Over, Result: " + state.values.points);
    };
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.3;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                playSound("hit");
                state.values.points++;
                state.view.score.textContent = state.values.points;
                state.values.hitPosition = null;
            };
        });
    });
}

function init(){
    moveEnemy();
    addListenerHitBox();
}

init()