export class RGB {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    isBlack() {
        return (this.r === 0 && this.g === 0 && this.b === 0);
    }
    isMatch(color) {
        return (this.r === color.r && this.g === color.g && this.b === color.b);
    }
    setColor(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
    }


    static convertFromHex(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? new RGB(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16))
            : new RGB();
    }
}
