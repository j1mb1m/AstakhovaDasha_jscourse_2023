class Clock {

    //от центра циферблата до центра деления
    #DIAL;
    #HOURHAND;
    #MINUTEHAND;
    #SECONDSHAND;
    #CURRENTTIME;

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


    #shiftHand = 6; // сдвиг стрелок от центра вращения
    #fontSize = 20; // размер шрифта

    #svgNS = "http://www.w3.org/2000/svg";


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

        this.#create();
        this.#run();
        setInterval(this.#run.bind(this), 1000); 
    };

    #increaseSize(element, sizeincreaseFactor) {
        element.width *= sizeincreaseFactor;
        element.height *= sizeincreaseFactor;
    }

    #create() {
        this.#DIAL = document.createElementNS(this.#svgNS, "svg");
        this.#DIAL.setAttribute("width", this.#dialProperties.radius * 2);
        this.#DIAL.setAttribute("height", this.#dialProperties.radius * 2);

        let r = this.#dialProperties.radius;
        let circle = this.#cteateCircle(r, r, r, "dial");
        this.#DIAL.appendChild(circle);


        let angleDegree = 2 * Math.PI / this.#hoursInDial; //угол

        for (let index = 0; index < 12; index++) {

            let r = this.#dialProperties.radiusDivision;
            let x = this.#dialProperties.radiusToDivision * Math.cos(angleDegree * index - Math.PI / 2); //делаем со смещением на 90%=pi/2
            let y = this.#dialProperties.radiusToDivision * Math.sin(angleDegree * index - Math.PI / 2);

            let cx = this.#dialProperties.radius + x;
            let cy = this.#dialProperties.radius + y;

            let division = this.#cteateCircle(r, cx, cy, "division");
            this.#DIAL.appendChild(division);

            let value = (index === 0 ? this.#hoursInDial : index);
            let newText = this.#cteateText(value, cx, cy)
            this.#DIAL.appendChild(newText);
        }

        this.#CURRENTTIME = this.#cteateText("00:00:00", "35%", "35%");
        this.#DIAL.appendChild(this.#CURRENTTIME);


        this.#HOURHAND = this.#createHand("hourHand", this.#hourHandSize);
        this.#MINUTEHAND = this.#createHand("minutesHand", this.#minuteHandSize);
        this.#SECONDSHAND = this.#createHand("secondsHand", this.#secondHandSize);

        this.#DIAL.appendChild(this.#HOURHAND);
        this.#DIAL.appendChild(this.#MINUTEHAND);
        this.#DIAL.appendChild(this.#SECONDSHAND);

    }

    #cteateText(value, x, y) {

        let fontSize = this.#fontSize;
        let newText = document.createElementNS(this.#svgNS, "text");
        newText.setAttributeNS(null, "x", x);
        newText.setAttributeNS(null, "y", y);
        newText.setAttributeNS(null, "font-size", fontSize + "px");
        newText.setAttributeNS(null, "dominant-baseline", "central");
        if (value >= 10)
            newText.setAttributeNS(null, "dx", -fontSize / 2); //сдвигаем цифру

        else
            newText.setAttributeNS(null, "dx", -fontSize / 4); //сдвигаем цифру
        let textNode = document.createTextNode(value);
        newText.appendChild(textNode);

        return newText;
    }

    #cteateCircle(r, cx, cy, className) {

        let circle = document.createElementNS(this.#svgNS, "circle");
        circle.setAttribute("r", r);
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("class", className);

        return circle;
    }

    #cteateRect(x, y, width, height, ry, rx) {

        let rect = document.createElementNS(this.#svgNS, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("rx", rx);
        rect.setAttribute("ry", ry);

        return rect;
    }

    #createHand(className, size) {

        let height = size.height;
        let width = size.width;

        let rect = this.#cteateRect(this.#dialProperties.radius - width / 2,
            this.#dialProperties.radius - height + this.#shiftHand,
            width, height,
            width / 2, width / 2);

        rect.setAttribute("class", className);

        return rect;
    }

    #run() {
        let date = new Date();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        const deg = 360; // полный оборот круга в градусах

        let hrPosition = hr * deg / this.#hoursInDial + ((min * deg / this.#minutesInDial) / this.#hoursInDial);
        let minPosition = (min * deg / this.#minutesInDial) + (sec * deg / this.#secondsInDial) / this.#minutesInDial;
        let secPosition = sec * deg / this.#secondsInDial;

        let center = this.#dialProperties.radius;
        this.#HOURHAND.setAttribute("transform", `rotate(${hrPosition} ${center} ${center})`);
        this.#MINUTEHAND.setAttribute("transform", `rotate(${minPosition} ${center} ${center})`);
        this.#SECONDSHAND.setAttribute("transform", `rotate(${secPosition} ${center} ${center})`);
        this.#CURRENTTIME.innerHTML = date.toLocaleTimeString();
        
        console.log(date.toLocaleTimeString());
    }

    getDial() {
        return this.#DIAL;
    }

}