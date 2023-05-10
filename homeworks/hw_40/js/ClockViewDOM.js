export class ClockViewDOM {

    //от центра циферблата до центра деления
    #DIAL = document.createElement("div");
    #HOURHAND;
    #MINUTEHAND;
    #SECONDSHAND;
    #CURRENTTIME;

    #intervalId = null;

    constructor(model) {
        this.model = model;

    }

    show() {

        let r = this.model.getClockRadius();
        this.#DIAL = document.createElement("div");
        this.#DIAL.setAttribute("class", "dial");
        this.#DIAL.style.setProperty("width", r * 2 + "px");
        this.#DIAL.style.setProperty("height", r * 2 + "px");


        this.#CURRENTTIME = document.createElement("div");
        this.#CURRENTTIME.setAttribute("class", "currentTime");
        this.#CURRENTTIME.style.setProperty("font-size", this.model.getFontSize() + "px");
        this.#DIAL.appendChild(this.#CURRENTTIME);

        this.model.getDivisions().forEach(element => {

            let division = this.#DIAL.appendChild(document.createElement("div"));
            division.setAttribute("class", "division");
            division.innerText = element.text;
            division.style.setProperty("width", element.r * 2 + "px");
            division.style.setProperty("height", element.r * 2 + "px");
            division.style.setProperty("line-height", element.r * 2 + "px");
            division.style.setProperty("font-size", this.model.getFontSize() + "px");
            division.style.setProperty("left", element.cx - element.r + "px");
            division.style.setProperty("top", element.cy - element.r + "px");

        });

        this.#HOURHAND = this.#createHand("hourHand", this.model.getHourHand());
        this.#MINUTEHAND = this.#createHand("minutesHand", this.model.getMinuteHand());
        this.#SECONDSHAND = this.#createHand("secondsHand", this.model.getSecondHand());

        this.#DIAL.appendChild(this.#HOURHAND);
        this.#DIAL.appendChild(this.#MINUTEHAND);
        this.#DIAL.appendChild(this.#SECONDSHAND);

        return this.#DIAL;

    }

    #createHand(className, size) {

        let r = this.model.getClockRadius();
        let shift = this.model.getShiftHand();

        let element = document.createElement("div");

        element.setAttribute("class", className);
        element.style.setProperty("height", size.height + "px");
        element.style.setProperty("width", size.width + "px");
        element.style.setProperty("left", (r - size.width / 2) + "px");
        element.style.setProperty("top", (r + shift) - size.height + "px"); //сдвиг от центра вниз 5px
        element.style.setProperty("transform-origin", "center " + (size.height - shift) + "px");
        element.style.setProperty("border-radius", size.width / 2 +"px")

        return element;
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

        this.#HOURHAND.style.setProperty("transform", "rotate(" + hrPosition + "deg)");
        this.#MINUTEHAND.style.setProperty("transform", "rotate(" + minPosition + "deg)");
        this.#SECONDSHAND.style.setProperty("transform", "rotate(" + secPosition + "deg)");
        this.#CURRENTTIME.innerText = date.toLocaleTimeString();

        if (!this.#intervalId){
            this.#intervalId = setInterval(this.run.bind(this), 1010 - ms);
        }

    }
    stop(){
        clearInterval(this.#intervalId);
        this.#intervalId = null;
    }

}


