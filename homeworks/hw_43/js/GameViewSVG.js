export class GameViewSVG {
    #svgNS = "http://www.w3.org/2000/svg";
    svg = document.createElementNS(this.#svgNS, 'svg');

    constructor(field, rightRacket, leftRacket, ball) {
        this.fieldDOM = document.createElementNS(this.#svgNS, 'rect');
        this.rightRacketDOM = document.createElementNS(this.#svgNS, 'rect');
        this.leftRacketDOM = document.createElementNS(this.#svgNS, 'rect');
        this.ballDOM = document.createElementNS(this.#svgNS, 'circle');
        this.scoreDOM = document.createElementNS(this.#svgNS, 'text');

        this.field = field;
        this.rightRacket = rightRacket;
        this.leftRacket = leftRacket;
        this.ball = ball;

        this.heightUI = 36;
    }


    drawPlayingField(pos) {
        this.svg.setAttribute("width", this.field.width);
        this.svg.setAttribute("height", this.field.height + this.heightUI);

        //очки
        this.#cteateUI()

        //поле        
        this.svg.appendChild(this.fieldDOM);
        this.fieldDOM.setAttribute('class', 'game-field');
        this.fieldDOM.setAttribute("width", this.field.width);
        this.fieldDOM.setAttribute("height", this.field.height);
        this.fieldDOM.setAttribute("x", 0);
        this.fieldDOM.setAttribute("y", this.heightUI);
        this.fieldDOM.setAttribute('fill', 'yellow');

        //разметка
        this.drowInnerDivisions();

        //правый игрок
        this.svg.appendChild(this.rightRacketDOM);
        this.rightRacketDOM.setAttribute('class', 'game-racket');
        this.rightRacketDOM.setAttribute('width', this.rightRacket.width);
        this.rightRacketDOM.setAttribute('height', this.rightRacket.height);
        this.rightRacketDOM.setAttribute('fill', 'blue');

        //левый игрок
        this.svg.appendChild(this.leftRacketDOM);
        this.leftRacketDOM.setAttribute('class', 'game-racket');
        this.leftRacketDOM.setAttribute('width', this.leftRacket.width);
        this.leftRacketDOM.setAttribute('height', this.leftRacket.height);
        this.leftRacketDOM.setAttribute('fill', 'green');

        //мяч
        this.svg.appendChild(this.ballDOM);
        this.ballDOM.setAttribute('class', 'game-ball');
        this.ballDOM.setAttribute('r', this.ball.r);
        this.ballDOM.setAttribute('fill', 'red');

        pos.append(this.svg);

        this.update();

    }

    drowInnerDivisions() {

        //вертикальные линии
        let divisionNumber = 6; // количество делений для красивого оформления поля
        for (let i = 0; i < divisionNumber; i++) {
            if (i % 2 != 0) { //прорисовываем не все, т.к. сетка нам не нужна
                let newLine = document.createElementNS(this.#svgNS, 'line');
                newLine.setAttribute('id', 'line' + i);
                newLine.setAttribute('x1', this.field.width / divisionNumber * i);
                newLine.setAttribute('y1', this.heightUI);
                newLine.setAttribute('x2', this.field.width / divisionNumber * i);
                newLine.setAttribute('y2', this.field.height + this.heightUI);
                newLine.setAttribute('stroke', 'white');
                this.svg.appendChild(newLine);
            }
        }

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
        this.ballDOM.setAttribute('cy', this.ball.y + this.heightUI);
        this.ballDOM.setAttribute('cx', this.ball.x);

        this.rightRacketDOM.setAttribute('x', this.rightRacket.x);
        this.rightRacketDOM.setAttribute('y', this.rightRacket.y + this.heightUI);

        this.leftRacketDOM.setAttribute('x', this.leftRacket.x);
        this.leftRacketDOM.setAttribute('y', this.leftRacket.y + this.heightUI);
    }

    #cteateUI() {

        this.svg.appendChild(this.scoreDOM);
        this.scoreDOM.setAttribute('class', 'game-score');
        this.scoreDOM.setAttributeNS(null, "x", this.field.width / 2);
        this.scoreDOM.setAttributeNS(null, "y", this.heightUI);
        this.scoreDOM.setAttributeNS(null, "font-size", "30px");
        this.scoreDOM.setAttributeNS(null, "dx", -26);//подогнала положение текста
        this.scoreDOM.setAttributeNS(null, "dy", -7);
        let textNode = document.createTextNode('');
        this.scoreDOM.appendChild(textNode);

        this.updateUI();

    }

    updateUI() {
        this.scoreDOM.innerHTML = `${this.leftRacket.getScore()}:${this.rightRacket.getScore()}`;
    }

}