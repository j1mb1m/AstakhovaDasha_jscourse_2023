class Clock {

    #sizeincreaseFactor = 1; //коэффициент увеличения размера страницы относительно настроек по умолчанию
    //от центра циферблата до центра деления
    #DIAL = document.createElement("div");
    #HOURHAND = document.createElement("div");
    #MINUTEHAND = document.createElement("div");
    #SECONDSHAND = document.createElement("div");
    #CURRENTTIME = document.createElement("div");

    #hoursInDial = 12; // часов в одном обороте 
    #minutesInDial = 60; // минут в одном оборот 
    #secondsInDial = 60; // секунд в одном обороте 

    #dialProperties = {
        radius: 100, //радиус циферблата
        radiusToDivision: 75,  //расстояние от центра циферблата до ближнего края div с делением (1-12)
        divisions: 12, // количество делений, часов
        radiusDivision: 15, // радиус деления в которым храним значения делений от 1 до 12
    };

    #shiftHand = 5; //сдвиг стрелок от центра вращения

    constructor(clockSize) {
        let radiusDial = clockSize / 2; //размер циферблата  
        this.#sizeincreaseFactor = radiusDial / this.#dialProperties.radius;


        this.create();
        this.run();
        setInterval(this.run.bind(this), 200); //0.2сек, чтобы более менее синхронно работали часы
    };

    create() {
        this.#DIAL.appendChild(this.#CURRENTTIME);
        this.#CURRENTTIME.setAttribute("class", "currentTime");
        this.#CURRENTTIME.style.setProperty("font-size", 20 * this.#sizeincreaseFactor + "px");

        this.#DIAL.appendChild(this.#HOURHAND);
        this.#DIAL.appendChild(this.#MINUTEHAND);
        this.#DIAL.appendChild(this.#SECONDSHAND);

        this.#DIAL.style.setProperty("width", this.#dialProperties.radius * 2 * this.#sizeincreaseFactor + "px");
        this.#DIAL.style.setProperty("height", this.#dialProperties.radius * 2 * this.#sizeincreaseFactor + "px");
        this.#DIAL.setAttribute("class", "dial");

        let angleDegree = 2 * Math.PI / this.#hoursInDial; //угол

        for (let index = 0; index < this.#hoursInDial; index++) {
            const division = this.#DIAL.appendChild(document.createElement("div"));
            division.setAttribute("class", "division");
            division.innerText = (index === 0 ? this.#hoursInDial : index);
            division.style.setProperty("width", this.#dialProperties.radiusDivision * 2 * this.#sizeincreaseFactor + "px");
            division.style.setProperty("height", this.#dialProperties.radiusDivision * 2 * this.#sizeincreaseFactor + "px");
            division.style.setProperty("line-height", this.#dialProperties.radiusDivision * 2 * this.#sizeincreaseFactor + "px");
            division.style.setProperty("font-size", 20 * this.#sizeincreaseFactor + "px");

            let x = this.#dialProperties.radiusToDivision * this.#sizeincreaseFactor * Math.cos(angleDegree * index - Math.PI / 2); //делаем со смещением на 90%=pi/2
            let y = this.#dialProperties.radiusToDivision * this.#sizeincreaseFactor * Math.sin(angleDegree * index - Math.PI / 2);

            division.style.setProperty("left", (this.#dialProperties.radius - this.#dialProperties.radiusDivision) * this.#sizeincreaseFactor + x + "px");
            division.style.setProperty("top", (this.#dialProperties.radius - this.#dialProperties.radiusDivision) * this.#sizeincreaseFactor + y + "px");
        }

        this.#createHand(this.#HOURHAND, "hourHand", 6, 0.5);
        this.#createHand(this.#MINUTEHAND, "minutesHand", 4, 0.7);
        this.#createHand(this.#SECONDSHAND, "secondsHand", 2, 0.9);
    }

    getDial() {
        return this.#DIAL;
    }

    run() {
        let date = new Date();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        const deg = 360; // полный оборот круга в градусах

        let hrPosition = hr * deg / this.#hoursInDial + ((min * deg / this.#minutesInDial) / this.#hoursInDial);
        let minPosition = (min * deg / this.#minutesInDial) + (sec * deg / this.#secondsInDial) / this.#minutesInDial;
        let secPosition = sec * deg / this.#secondsInDial;

        this.#HOURHAND.style.setProperty("transform", "rotate(" + hrPosition + "deg)");
        this.#MINUTEHAND.style.setProperty("transform", "rotate(" + minPosition + "deg)");
        this.#SECONDSHAND.style.setProperty("transform", "rotate(" + secPosition + "deg)");
        this.#CURRENTTIME.innerText = `${('0' + hr).slice(-2)}:${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`;
    }

    /**
    * Настраивает css-свойства для стрелок часов.
    *
    * @param {Object} element ссылка на элемент DOM стрелки
    * @param {String} className название класса элемента.
    * @param {Number} width, ширина элемента.
    * @param {Number} factor, коэффициент, для получения высоты элемента от диаметра циферблата.
    */
    #createHand(element, className, width, factor) {
        let hrWidth = width;   //ширина стрелки часов      
        let hrHeight = this.#dialProperties.radius * this.#sizeincreaseFactor * factor;  //высота стрелки часов с коэффициентом factor от диаметра циферблата (коэффициент должен быть не более 1)
        element.setAttribute("class", className);
        element.style.setProperty("height", hrHeight + "px");
        element.style.setProperty("width", hrWidth + "px");
        element.style.setProperty("left", (this.#dialProperties.radius * this.#sizeincreaseFactor - hrWidth / 2) + "px");
        element.style.setProperty("top", (this.#dialProperties.radius + this.#shiftHand) * this.#sizeincreaseFactor - hrHeight + "px"); //сдвиг от центра вниз 5px
        element.style.setProperty("transform-origin", "center " + (hrHeight - this.#shiftHand * this.#sizeincreaseFactor) + "px");
    }

}