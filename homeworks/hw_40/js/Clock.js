export default class Clock {

    #dialProperties = {
        radius: 100, //радиус циферблата
        radiusToDivision: 75,  //расстояние от центра циферблата до ближнего края div с делением (1-12)
        divisions: 12, // количество делений, часов
        radiusDivision: 15, // радиус деления в которым храним значения делений от 1 до 12
    };

    //начальные размеры стрелки часов
    #hourHandSize = {
        width: 6,
        height: 0.5 * this.#dialProperties.radius
    }
    //начальные размеры стрелки минут
    #minuteHandSize = {
        width: 4,
        height: 0.7 * this.#dialProperties.radius
    }
    //начальные размеры стрелки секунд
    #secondHandSize = {
        width: 2,
        height: 0.9 * this.#dialProperties.radius
    }

    #divisions = [];

    #shiftHand = 6; // сдвиг стрелок от центра вращения
    #fontSize = 20; // размер шрифта
    #isRun = false;

    constructor(clockSize) {
        let radiusDial = clockSize / 2; //размер циферблата  
        let sizeincreaseFactor = radiusDial / this.#dialProperties.radius; //соотношение к базовым настройкам

        this.#dialProperties.radius *= sizeincreaseFactor;
        this.#dialProperties.radiusToDivision *= sizeincreaseFactor;
        this.#dialProperties.radiusDivision *= sizeincreaseFactor;

        this.#increaseSize(this.#hourHandSize, sizeincreaseFactor);
        this.#increaseSize(this.#minuteHandSize, sizeincreaseFactor);
        this.#increaseSize(this.#secondHandSize, sizeincreaseFactor);

        this.#shiftHand *= sizeincreaseFactor;
        this.#fontSize *= sizeincreaseFactor;

        this.#initDivisions();
    };

    #increaseSize(element, sizeincreaseFactor) {
        element.width *= sizeincreaseFactor;
        element.height *= sizeincreaseFactor;
    }

    #initDivisions() {

        let angleDegree = 2 * Math.PI / this.#dialProperties.divisions; //угол

        for (let index = 0; index < this.#dialProperties.divisions; index++) {

            let newEl = {};
            newEl.r = this.#dialProperties.radiusDivision;
            newEl.cx = this.#dialProperties.radius + this.#dialProperties.radiusToDivision * Math.cos(angleDegree * index - Math.PI / 2); //делаем со смещением на 90%=pi/2
            newEl.cy = this.#dialProperties.radius + this.#dialProperties.radiusToDivision * Math.sin(angleDegree * index - Math.PI / 2);
            newEl.text = (index === 0 ? this.#dialProperties.divisions : index);

            this.#divisions.push(newEl);
        }

    }

    getDivisions() {
        return this.#divisions;
    }

    getHourHand() {
        return this.#hourHandSize;
    }
 
    getMinuteHand() {
        return this.#minuteHandSize;
    }
 
    getSecondHand() {
        return this.#secondHandSize;
    }

    getClockRadius() {
        return this.#dialProperties.radius;
    }

    getShiftHand() {
        return this.#shiftHand;
    }

    getFontSize() {
        return this.#fontSize;
    }
    run() {
        this.#isRun = true;
    }
    stop() {        
        this.#isRun = false;
    }
    isRun() {
        return this.#isRun;
    }
}