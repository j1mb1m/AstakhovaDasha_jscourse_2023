export class ClockViewSVG {
    #svgNS = "http://www.w3.org/2000/svg";

    #DIAL;
    #HOURHAND;
    #MINUTEHAND;
    #SECONDSHAND;
    #CURRENTTIME;

    #intervalId = null;

    constructor(model) {
        this.model = model;
    }

    show() {
        this.#DIAL = document.createElementNS(this.#svgNS, "svg");
        this.#DIAL.setAttribute("width", this.model.getClockRadius() * 2);
        this.#DIAL.setAttribute("height", this.model.getClockRadius() * 2);

        let r = this.model.getClockRadius();
        let circle = this.#cteateCircle(r, r, r, "dial");
        this.#DIAL.appendChild(circle);

        this.model.getDivisions().forEach(element => {
            let division = this.#cteateCircle(element.r, element.cx, element.cy, "division");
            this.#DIAL.appendChild(division);
            let text = this.#cteateText(element.text, element.cx, element.cy)
            this.#DIAL.appendChild(text);
        });

        this.#CURRENTTIME = this.#cteateText("00:00:00", "35%", "35%");
        this.#DIAL.appendChild(this.#CURRENTTIME);

        this.#HOURHAND = this.#createHand("hourHand", this.model.getHourHand());
        this.#MINUTEHAND = this.#createHand("minutesHand", this.model.getMinuteHand());
        this.#SECONDSHAND = this.#createHand("secondsHand", this.model.getSecondHand());

        this.#DIAL.appendChild(this.#HOURHAND);
        this.#DIAL.appendChild(this.#MINUTEHAND);
        this.#DIAL.appendChild(this.#SECONDSHAND);

        return this.#DIAL;

    }

    #cteateText(value, x, y) {

        let fontSize = this.model.getFontSize();
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

        let r = this.model.getClockRadius();
        let shift = this.model.getShiftHand();
        let rect = this.#cteateRect(r - width / 2,
            r - height + shift,
            width, height,
            width / 2, width / 2);

        rect.setAttribute("class", className);

        return rect;
    }

    run() {
        let date = new Date();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let ms = date.getMilliseconds();

        const deg = 360; // полный оборот круга в градусах

        let hrPosition = hr * deg / 12 + ((min * deg / 60) / 12);
        let minPosition = (min * deg / 60) + (sec * deg / 60) / 60;
        let secPosition = sec * deg / 60;

        let center = this.model.getClockRadius();
        this.#HOURHAND.setAttribute("transform", `rotate(${hrPosition} ${center} ${center})`);
        this.#MINUTEHAND.setAttribute("transform", `rotate(${minPosition} ${center} ${center})`);
        this.#SECONDSHAND.setAttribute("transform", `rotate(${secPosition} ${center} ${center})`);
        this.#CURRENTTIME.innerHTML = date.toLocaleTimeString();

        if (!this.#intervalId){
            this.#intervalId = setInterval(this.run.bind(this), 1010 - ms);
        }
    }

    stop() {
        clearInterval(this.#intervalId);
        this.#intervalId = null;
    }

}


