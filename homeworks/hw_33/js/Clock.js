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

    #shiftHand = 6; //сдвиг стрелок от центра вращения
    #fontSize = 20; // размер шрифта

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


        this.create();
        this.run();
        setInterval(this.run.bind(this), 1000); 
    };

    #increaseSize(element, sizeincreaseFactor) {
        element.width *= sizeincreaseFactor;
        element.height *= sizeincreaseFactor;
    }

    create() {
        this.#DIAL.appendChild(this.#CURRENTTIME);
        this.#CURRENTTIME.setAttribute("class", "currentTime");
        this.#CURRENTTIME.style.setProperty("font-size", this.#fontSize + "px");

        this.#DIAL.appendChild(this.#HOURHAND);
        this.#DIAL.appendChild(this.#MINUTEHAND);
        this.#DIAL.appendChild(this.#SECONDSHAND);

        this.#DIAL.style.setProperty("width", this.#dialProperties.radius * 2 + "px");
        this.#DIAL.style.setProperty("height", this.#dialProperties.radius * 2 + "px");
        this.#DIAL.setAttribute("class", "dial");

        let angleDegree = 2 * Math.PI / this.#hoursInDial; //угол

        for (let index = 0; index < this.#hoursInDial; index++) {
            const division = this.#DIAL.appendChild(document.createElement("div"));
            division.setAttribute("class", "division");
            division.innerText = (index === 0 ? this.#hoursInDial : index);
            division.style.setProperty("width", this.#dialProperties.radiusDivision * 2 + "px");
            division.style.setProperty("height", this.#dialProperties.radiusDivision * 2 + "px");
            division.style.setProperty("line-height", this.#dialProperties.radiusDivision * 2 + "px");
            division.style.setProperty("font-size", this.#fontSize + "px");

            let x = this.#dialProperties.radiusToDivision * Math.cos(angleDegree * index - Math.PI / 2); //делаем со смещением на 90%=pi/2
            let y = this.#dialProperties.radiusToDivision * Math.sin(angleDegree * index - Math.PI / 2);

            division.style.setProperty("left", (this.#dialProperties.radius - this.#dialProperties.radiusDivision) + x + "px");
            division.style.setProperty("top", (this.#dialProperties.radius - this.#dialProperties.radiusDivision) + y + "px");
        }

        this.#createHand(this.#HOURHAND, "hourHand", this.#hourHandSize);
        this.#createHand(this.#MINUTEHAND, "minutesHand", this.#minuteHandSize);
        this.#createHand(this.#SECONDSHAND, "secondsHand", this.#secondHandSize);
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
        this.#CURRENTTIME.innerText = date.toLocaleTimeString();

        console.log(date.toLocaleTimeString());
    }


    #createHand(element, className, size) {
        element.setAttribute("class", className);
        element.style.setProperty("height", size.height + "px");
        element.style.setProperty("width", size.width + "px");
        element.style.setProperty("left", (this.#dialProperties.radius - size.width / 2) + "px");
        element.style.setProperty("top", (this.#dialProperties.radius + this.#shiftHand) - size.height + "px"); //сдвиг от центра вниз 5px
        element.style.setProperty("transform-origin", "center " + (size.height - this.#shiftHand) + "px");
    }

}