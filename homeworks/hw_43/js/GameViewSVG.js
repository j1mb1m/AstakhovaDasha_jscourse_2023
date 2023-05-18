export class GameViewSVG {
    #svgNS = "http://www.w3.org/2000/svg";
    svg = document.createElementNS(this.#svgNS, 'svg');

    constructor(field, rightRacket, leftRacket, ball) {
        this.fieldSVG = document.createElementNS(this.#svgNS, 'rect');
        this.rightRacketSVG = document.createElementNS(this.#svgNS, 'rect');
        this.leftRacketSVG = document.createElementNS(this.#svgNS, 'rect');
        this.ballSVG = document.createElementNS(this.#svgNS, 'circle');
        this.scoreSVG = document.createElementNS(this.#svgNS, 'text');

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
        this.svg.appendChild(this.fieldSVG);
        this.fieldSVG.setAttribute('class', 'game-field');
        this.fieldSVG.setAttribute("width", this.field.width);
        this.fieldSVG.setAttribute("height", this.field.height);
        this.fieldSVG.setAttribute("x", 0);
        this.fieldSVG.setAttribute("y", this.heightUI);
        this.fieldSVG.setAttribute('fill', 'yellow');

        //разметка
        this.drowInnerDivisions();

        //правый игрок
        this.svg.appendChild(this.rightRacketSVG);
        this.rightRacketSVG.setAttribute('class', 'game-racket');
        this.rightRacketSVG.setAttribute('width', this.rightRacket.width);
        this.rightRacketSVG.setAttribute('height', this.rightRacket.height);
        this.rightRacketSVG.setAttribute('fill', 'blue');

        //левый игрок
        this.svg.appendChild(this.leftRacketSVG);
        this.leftRacketSVG.setAttribute('class', 'game-racket');
        this.leftRacketSVG.setAttribute('width', this.leftRacket.width);
        this.leftRacketSVG.setAttribute('height', this.leftRacket.height);
        this.leftRacketSVG.setAttribute('fill', 'green');

        //мяч
        this.svg.appendChild(this.ballSVG);
        this.ballSVG.setAttribute('class', 'game-ball');
        this.ballSVG.setAttribute('r', this.ball.r);
        this.ballSVG.setAttribute('fill', 'red');

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

        const group = document.createElementNS(this.#svgNS, 'g');
        this.svg.appendChild(group);
        group.setAttribute('class', 'btn');
        const btnStart = document.createElementNS(this.#svgNS, 'rect');
        btnStart.setAttribute('width', 100);
        btnStart.setAttribute('height', 18);
        btnStart.setAttribute('fill', 'rgb(194, 194, 194)');
        btnStart.setAttribute('id', 'showBtn');
        group.appendChild(btnStart);


        const btnLabel = document.createElementNS(this.#svgNS, 'text');
        btnLabel.setAttributeNS(null, "x", 30);
        btnLabel.setAttributeNS(null, "y", 14);
        btnLabel.setAttributeNS(null, "font-size", "16px");
        btnLabel.appendChild(document.createTextNode('старт!'));
        group.appendChild(btnLabel);

        return group;
    }

    update() {
        this.ballSVG.setAttribute('cy', this.ball.y + this.heightUI);
        this.ballSVG.setAttribute('cx', this.ball.x);

        this.rightRacketSVG.setAttribute('x', this.rightRacket.x);
        this.rightRacketSVG.setAttribute('y', this.rightRacket.y + this.heightUI);

        this.leftRacketSVG.setAttribute('x', this.leftRacket.x);
        this.leftRacketSVG.setAttribute('y', this.leftRacket.y + this.heightUI);
    }

    #cteateUI() {
        this.svg.appendChild(this.scoreSVG);
        this.scoreSVG.setAttribute('class', 'game-score');
        this.scoreSVG.setAttributeNS(null, "x", this.field.width / 2);
        this.scoreSVG.setAttributeNS(null, "y", this.heightUI);
        this.scoreSVG.setAttributeNS(null, "font-size", "30px");
        this.scoreSVG.setAttributeNS(null, "dx", -26);//подогнала положение текста
        this.scoreSVG.setAttributeNS(null, "dy", -7);
        let textNode = document.createTextNode('');
        this.scoreSVG.appendChild(textNode);

        this.updateUI();

    }

    updateUI() {
        this.scoreSVG.innerHTML = `${this.leftRacket.getScore()}:${this.rightRacket.getScore()}`;
    }

}