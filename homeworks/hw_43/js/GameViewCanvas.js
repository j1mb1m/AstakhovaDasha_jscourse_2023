export class GameViewCanvas {

    #canvas = document.createElement("canvas");
    #ctx = this.#canvas.getContext('2d');

    constructor(field, rightRacket, leftRacket, ball) {

        this.field = field;
        this.rightRacket = rightRacket;
        this.leftRacket = leftRacket;
        this.ball = ball;
        this.heightUI = 36;
    }

    drawPlayer(ctx, size) {
        ctx.fillRect(size.x, size.y, size.width, size.height);
    }

    drawBall(ctx, size) {
        ctx.beginPath();
        ctx.arc(size.x, size.y, size.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.fillRect(size.x, size.y, size.width, size.height);
    }

    drawPoints(ctx) {
        ctx.resetTransform();
        ctx.translate(this.field.width / 2, 0);
        ctx.font = '30px Verdana';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'hanging';
        ctx.fillText(`${this.leftRacket.getScore()}:${this.rightRacket.getScore()}`, 0, 0);
        ctx.resetTransform();
    }

    drawPlayingField(pos) {
        this.#canvas.width = this.field.width;
        this.#canvas.height = this.field.height + this.heightUI;
        this.#canvas.setAttribute('class', 'game-field');
        pos.appendChild(this.#canvas);


        this.update();
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
        //цвет канваса
        this.#ctx.resetTransform();
        this.#ctx.fillStyle = 'white';
        this.#ctx.fillRect(0, 0, this.#canvas.clientWidth, this.#canvas.clientHeight);

        //цвет игрового поля
        this.#ctx.translate(0, this.heightUI);
        this.#ctx.fillStyle = 'yellow';
        this.#ctx.fillRect(0, 0, this.#canvas.clientWidth, this.#canvas.clientHeight);

        //вертикальные линии
        let divisionNumber = 6; // количество делений для красивого оформления поля
        for (let i = 0; i < divisionNumber; i++) {
            if (i % 2 != 0) { //прорисовываем не все, т.к. сетка нам не нужна
                this.#ctx.beginPath();
                this.#ctx.moveTo(this.field.width / divisionNumber * i, 0);
                this.#ctx.lineTo(this.field.width / divisionNumber * i, 0);
                this.#ctx.lineTo(this.field.width / divisionNumber * i, this.field.height);
                this.#ctx.strokeStyle = 'white';
                this.#ctx.closePath();
                this.#ctx.stroke();
            }
        }

        //рисуем очки
        this.drawPoints(this.#ctx);

        //рисуем ракетки и мячь
        this.#ctx.translate(0, this.heightUI); //сдвинемся на область с очками
        this.#ctx.fillStyle = 'blue';
        this.drawPlayer(this.#ctx, this.rightRacket);
        this.#ctx.fillStyle = 'green';
        this.drawPlayer(this.#ctx, this.leftRacket);
        this.drawBall(this.#ctx, this.ball);
    }

    updateUI() {
        //перересовываем поле очков
        this.#ctx.resetTransform();
        this.#ctx.fillStyle = 'white';
        this.#ctx.fillRect(0, 0, this.#canvas.clientWidth, this.heightUI);
        //рисуем очки
        this.drawPoints(this.#ctx);
    }

}