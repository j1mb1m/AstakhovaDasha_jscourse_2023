'use strict';

import { Player } from "./Player.js";
import { DIRECTION } from "./enums/direction.js";
import { Ball } from "./Ball.js";
import { GAME_STATUS } from "./enums/gameStatus.js";
import { GameSounds } from "./GameSounds.js";
import { GameViewDOM } from "./GameViewDOM.js";
import { GameViewCanvas } from "./GameViewCanvas.js";
import { GameViewSVG } from "./GameViewSVG.js";

const pos = document.getElementById("solution1");
const btnOK = document.getElementById('btnOK');
btnOK.addEventListener('click', init);

const gameField = {
    width: 600,
    height: 350
}

const leftRacket = new Player(gameField);
const rightRacket = new Player(gameField);
const ball = new Ball(gameField);
const audio = new GameSounds();
let gameView;

const MAX_WINS = 3;
let gameStatus = GAME_STATUS.STOP;


function init() {

    const selectView = document.getElementById('selectView');
    if (selectView.value === 'DOM')
        gameView = new GameViewDOM(gameField, rightRacket, leftRacket, ball);
    else if (selectView.value === 'Canvas')
        gameView = new GameViewCanvas(gameField, rightRacket, leftRacket, ball); //создаем viewer
    else
        gameView = new GameViewSVG(gameField, rightRacket, leftRacket, ball); //создаем viewer

    //удаляем все   
    while (pos.hasChildNodes()) {
        pos.removeChild(pos.lastChild);
    }

    const btnStart = gameView.drawBtnStart(pos);
    btnStart.addEventListener('click', run);
    reset(); // сбрасываем настройки
    gameView.drawPlayingField(pos); // отображаем в DOM

}

function run() {
    audio.start();
    // если есть победитель, то сбрасываем все настройки
    if (rightRacket.getScore() === MAX_WINS || leftRacket.getScore() === MAX_WINS) {
        reset();
        gameView.updateUI();
    }

    // если игра уже идет, то не запускаем еще один interval
    if (gameStatus === GAME_STATUS.RUN) return;

    // начинаем игру
    gameStatus = GAME_STATUS.RUN;
    ball.resetPosition();
    render();
}

function reset() {
    //сбрасываем на дефолтные настройки
    leftRacket.reset();
    leftRacket.x = 0;
    leftRacket.y = (gameField.height - leftRacket.height) / 2;

    rightRacket.reset();
    rightRacket.x = gameField.width - rightRacket.width;
    rightRacket.y = (gameField.height - leftRacket.height) / 2;

    ball.reset();
    //останавливаем игру
    gameStatus = GAME_STATUS.STOP;
}

function render() {
    //логика по движению мяча и ракеток
    if (gameStatus != GAME_STATUS.RUN) {
        //повторяем логику
        requestAnimationFrame(render);
        return;
    }
    
    ball.move();

    let currentPlayer = ball.x + ball.r > gameField.width / 2 ? rightRacket : leftRacket;
    let direction = ball.x + ball.r < gameField.width / 2 ? 1 : -1;

    // попали по мячу?
    if (currentPlayer.isHit(ball)) {
        audio.soundHit();
        currentPlayer.hitBall(ball, direction);
    }
    // мяч за пределами?
    else if (ball.isBallOutside()) {
        audio.soundFail();
        let winner = ball.x + ball.r > gameField.width / 2 ? leftRacket : rightRacket;
        winner.increaseScore();
        gameStatus = GAME_STATUS.PAUSE;
        gameView.updateUI();
        return;
    }

    //продолжаем игру
    rightRacket.move();
    leftRacket.move();
    //обновляем DOM 
    gameView.update();


    //повторяем логику
    requestAnimationFrame(render);
}

document.addEventListener('keydown', function (event) {
    let key = event.key;
    event.preventDefault();
    switch (key) {
        case 'ArrowDown': rightRacket.moveDirection = DIRECTION.DOWN; break;
        case 'ArrowUp': rightRacket.moveDirection = DIRECTION.UP; break;
        case 'Shift': leftRacket.moveDirection = DIRECTION.UP; break;
        case 'Control': leftRacket.moveDirection = DIRECTION.DOWN; break;
        default: break;
    }
});

document.addEventListener('keyup', function (event) {
    let key = event.key;
    event.preventDefault();
    switch (key) {
        case 'ArrowDown': rightRacket.moveDirection = DIRECTION.IDLE; break;
        case 'ArrowUp': rightRacket.moveDirection = DIRECTION.IDLE; break;
        case 'Shift': leftRacket.moveDirection = DIRECTION.IDLE; break;
        case 'Control': leftRacket.moveDirection = DIRECTION.IDLE; break;
        default: break;
    }
});
