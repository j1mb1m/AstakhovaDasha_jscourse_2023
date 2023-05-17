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

        pos.appendChild(this.scoreDOM);
        this.scoreDOM.setAttribute('class', 'game-score');
        this.scoreDOM.innerText = `0 : 0`;

        pos.appendChild(this.fieldDOM);
        this.fieldDOM.setAttribute('class', 'game-field');
        this.fieldDOM.style.setProperty('width', this.field.width + 'px');
        this.fieldDOM.style.setProperty('height', this.field.height + 'px');

        this.fieldDOM.appendChild(this.rightRacketDOM);
        this.rightRacketDOM.setAttribute('class', 'game-racket');
        this.rightRacketDOM.style.setProperty('width', this.rightRacket.width + 'px');
        this.rightRacketDOM.style.setProperty('height', this.rightRacket.height + 'px');
        this.rightRacketDOM.style.setProperty('background-color', 'green');
        this.rightRacketDOM.style.setProperty('position', 'absolute');
        this.rightRacketDOM.style.setProperty('left', this.rightRacket.x + 'px');
        this.rightRacketDOM.style.setProperty('top', this.rightRacket.y + 'px');

        this.fieldDOM.appendChild(this.leftRacketDOM);
        this.leftRacketDOM.setAttribute('class', 'game-racket');
        this.leftRacketDOM.style.setProperty('width', this.leftRacket.width + 'px');
        this.leftRacketDOM.style.setProperty('height', this.leftRacket.height + 'px');
        this.leftRacketDOM.style.setProperty('background-color', 'green');
        this.leftRacketDOM.style.setProperty('position', 'absolute');
        this.leftRacketDOM.style.setProperty('left', this.leftRacket.x + 'px');
        this.leftRacketDOM.style.setProperty('top', this.leftRacket.y + 'px');

        this.fieldDOM.appendChild(this.ballDOM);
        this.ballDOM.setAttribute('class', 'game-ball');
        this.ballDOM.style.setProperty('width', this.ball.r * 2 + 'px');
        this.ballDOM.style.setProperty('height', this.ball.r * 2 + 'px');
        this.ballDOM.style.setProperty('border-radius', '50%');
        this.ballDOM.style.setProperty('background-color', 'red');
        this.ballDOM.style.setProperty('position', 'absolute');
        this.ballDOM.style.setProperty('left', this.ball.x - this.ball.r + 'px');
        this.ballDOM.style.setProperty('top', this.ball.y - this.ball.r + 'px');
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
        this.scoreDOM.innerText = `${this.leftRacket.getScore()} : ${this.rightRacket.getScore()}`;
    }

}