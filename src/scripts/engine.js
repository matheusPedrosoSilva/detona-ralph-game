 const state = {
   view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives")
   },
   values:{
    timeId: null,
    gameVelocity: 750,
    hitPosition: 0,
    points: 0,
    currentTime: 30,
    life: 3,
   },
   actions:{
    countDownTimerId: setInterval(countDown, 1000),
   },
}

function gameOver(){
    clearInterval(state.actions.countDownTimerId);
    alert("Game Over, Result: " + state.values.points);
    location.reload();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        gameOver();
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
            if(square.id === state.values.hitPosition){ //quando o player clicar no inimigo, ele ira ganhar 1 ponto
                playSound("hit");
                state.values.points++;
                state.view.score.textContent = state.values.points;
                state.values.hitPosition = null;
            } else{ //caso clique em um quadro sem o inimigo, o player ira perder vida
                state.values.life--;
                state.view.lives.textContent = "x" + state.values.life;
                if(state.values.life == 0){
                    gameOver();
                }
            };
        });
    });
}

function init(){
    moveEnemy();
    addListenerHitBox();
}

init()