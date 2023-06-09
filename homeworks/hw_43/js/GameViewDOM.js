export class GameViewDOM {

    constructor(field, rightRacket, leftRacket, ball) {
        this.fieldDOM = document.createElement('div');
        this.rightRacketDOM = document.createElement('div');
        this.leftRacketDOM = document.createElement('div');
        this.ballDOM = document.createElement('div');
        this.scoreDOM = document.createElement('div');

        this.field = field;
        this.rightRacket = rightRacket;
        this.leftRacket = leftRacket;
        this.ball = ball;
    }

    drawPlayingField(pos) {

        //очки
        pos.appendChild(this.scoreDOM);
        this.scoreDOM.setAttribute('class', 'game-score');
        this.scoreDOM.style.setProperty('width', this.field.width + 'px');
        this.updateUI();

        //поле

        pos.appendChild(this.fieldDOM);
        this.fieldDOM.setAttribute('class', 'game-field');
        this.fieldDOM.style.setProperty('width', this.field.width + 'px');
        this.fieldDOM.style.setProperty('height', this.field.height + 'px');

        //разметка
        this.drowInnerDivisions();

        //правый игрок
        this.fieldDOM.appendChild(this.rightRacketDOM);
        this.rightRacketDOM.setAttribute('class', 'game-racket');
        this.rightRacketDOM.style.setProperty('width', this.rightRacket.width + 'px');
        this.rightRacketDOM.style.setProperty('height', this.rightRacket.height + 'px');
        this.rightRacketDOM.style.setProperty('background-color', 'blue');
        this.rightRacketDOM.style.setProperty('position', 'absolute');

        //левый игрок
        this.fieldDOM.appendChild(this.leftRacketDOM);
        this.leftRacketDOM.setAttribute('class', 'game-racket');
        this.leftRacketDOM.style.setProperty('width', this.leftRacket.width + 'px');
        this.leftRacketDOM.style.setProperty('height', this.leftRacket.height + 'px');
        this.leftRacketDOM.style.setProperty('background-color', 'green');
        this.leftRacketDOM.style.setProperty('position', 'absolute');

        //мяч
        this.fieldDOM.appendChild(this.ballDOM);
        this.ballDOM.setAttribute('class', 'game-ball');
        this.ballDOM.style.setProperty('width', this.ball.r * 2 + 'px');
        this.ballDOM.style.setProperty('height', this.ball.r * 2 + 'px');
        this.ballDOM.style.setProperty('border-radius', '50%');
        this.ballDOM.style.setProperty('background-color', 'red');
        this.ballDOM.style.setProperty('position', 'absolute');

        this.update();

    }

    drowInnerDivisions() {

        let box = document.createElement('div');
        this.fieldDOM.appendChild(box);
        box.setAttribute('class', 'game-div__inner');
        box.style.setProperty('top', 0 + 'px');
        box.style.setProperty('left', this.field.width / 6 + 'px');
        box.style.setProperty('width', this.field.width / 3 + 'px');
        box.style.setProperty('height', this.field.height + 'px');

        let box1 = document.createElement('div');
        this.fieldDOM.appendChild(box1);
        box1.setAttribute('class', 'game-div__inner');
        box1.style.setProperty('top', 0 + 'px');
        box1.style.setProperty('left', this.field.width / 2 + 'px');
        box1.style.setProperty('width', this.field.width / 3 + 'px');
        box1.style.setProperty('height', this.field.height + 'px');
    }

    drawBtnStart(pos) {

        let btnStart = document.createElement('div');
        btnStart.setAttribute('id', 'showBtn');
        btnStart.classList.add('btn');
        btnStart.classList.add('btn-shift');
        btnStart.innerText = 'старт!';
        pos.appendChild(btnStart);
        
        return btnStart;
    }

    update() {
        this.ballDOM.style.setProperty('top', this.ball.y - this.ball.r + 'px');
        this.ballDOM.style.setProperty('left', this.ball.x - this.ball.r + 'px');

        this.rightRacketDOM.style.setProperty('left', this.rightRacket.x + 'px');
        this.rightRacketDOM.style.setProperty('top', this.rightRacket.y + 'px');
        this.leftRacketDOM.style.setProperty('left', this.leftRacket.x + 'px');
        this.leftRacketDOM.style.setProperty('top', this.leftRacket.y + 'px');
    }

    updateUI() {
        this.scoreDOM.innerText = `${this.leftRacket.getScore()}:${this.rightRacket.getScore()}`;
    }

}