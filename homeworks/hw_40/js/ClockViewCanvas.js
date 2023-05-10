export class ClockViewCanvas {

    //от центра циферблата до центра деления
    #intervalId = null;
    #canvas = document.createElement("canvas");

    constructor(model) {
        this.model = model;
        this.drawClock();
    }

    show() {
        return this.#canvas;
    }

    drawClock() {
        let r = this.model.getClockRadius();
        const ratio = window.devicePixelRatio;
        const canvas = this.#canvas;
        canvas.width = r * 2 * ratio;
        canvas.height = r * 2 * ratio;
        canvas.style.width = r * 2 + "px";
        canvas.style.height = r * 2 + "px";
        canvas.setAttribute("class", "dial");

        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(r * ratio, r * ratio, r * ratio, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = "orange";
        ctx.fill();

        this.model.getDivisions().forEach(element => {
            ctx.resetTransform();
            ctx.beginPath();
            ctx.arc((element.cx) * ratio, (element.cy) * ratio, element.r * ratio, 0, 2 * Math.PI);
            ctx.fillStyle = "green";
            ctx.fill();

            this.drawText(ctx, (element.cx) * ratio, (element.cy) * ratio, element.text, ratio);
        });

        this.drawHand(ctx, ratio);
    }

    #createHandRound(ctx, size, rotate, ratio = 1) {
        let r = this.model.getClockRadius() * ratio;
        let shift = this.model.getShiftHand() * ratio;
        let width = size.width * ratio;
        let height = size.height * ratio;

        ctx.resetTransform();
        ctx.translate(r, r);
        ctx.rotate(rotate * Math.PI / 180);

        ctx.beginPath();
        ctx.moveTo(-width / 2, shift - width / 2);
        ctx.lineTo(-width / 2, shift - height - width / 2);
        ctx.arc(0, shift - height - width / 2 * ratio, width / 2, Math.PI, 0);
        ctx.lineTo(width / 2, shift - width / 2);
        ctx.arc(0, shift - width / 2, width / 2, 0, Math.PI);
        ctx.closePath();
    }

    drawText(ctx, x, y, text = "", ratio = 1) {
        ctx.resetTransform();
        ctx.translate(x, y);
        ctx.font = this.model.getFontSize() * ratio + "px Times New Roman";
        ctx.fillStyle = "#000";
        ctx.textAlign = 'center';
        ctx.textBaseline = "middle";
        ctx.fillText(text, 0, 0);
    }

    drawHand(ctx, ratio) {
        let date = new Date();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        const deg = 360; // полный оборот круга в градусах

        let hrPosition = hr * deg / 12 + ((min * deg / 60) / 12);
        let minPosition = (min * deg / 60) + (sec * deg / 60) / 60;
        let secPosition = sec * deg / 60;

        let r = this.model.getClockRadius() * ratio;

        this.drawText(ctx, r, 2 * r / 3, date.toLocaleTimeString(), ratio);

        this.#createHandRound(ctx, this.model.getHourHand(), hrPosition, ratio);
        ctx.fillStyle = "black";
        ctx.fill();
        this.#createHandRound(ctx, this.model.getMinuteHand(), minPosition, ratio);
        ctx.fillStyle = "black";
        ctx.fill();
        this.#createHandRound(ctx, this.model.getSecondHand(), secPosition, ratio);
        ctx.fillStyle = "red";
        ctx.fill();

    }

    run() {
        let date = new Date();
        let ms = date.getMilliseconds();

        if (!this.#intervalId) {
            this.#intervalId = setInterval(this.drawClock.bind(this), 1000 - ms);
        }

    }

    stop() {
        clearInterval(this.#intervalId);
        this.#intervalId = null;
    }

}

