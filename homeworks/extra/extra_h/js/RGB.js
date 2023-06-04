export class RGB {
    constructor(r = 0, g = 0, b = 0, a = 255, k = 1) {
        this.r = Number(r);
        this.g = Number(g);
        this.b = Number(b);
        this.a = Number(a);
        this.k = k; //коэф сглаживания
    }

    isMatch(color) {
        return (this.r === Math.floor(color.r * this.k)
            && this.g === Math.floor(color.g * this.k)
            && this.b === Math.floor(color.b * this.k));
    }

    setColor(color, k) {
        this.r = Math.floor(color.r * k);
        this.g = Math.floor(color.g * k);
        this.b = Math.floor(color.b * k);
        this.k = k;
    }


    static rgbToObj(rgbString) {

        let colorArr = rgbString.slice(
            rgbString.indexOf("(") + 1,
            rgbString.indexOf(")")
        ).split(", ");

        let obj = new RGB(...colorArr);

        return obj;
    }

    static convertFromHex(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? new RGB(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16))
            : new RGB();
    }
}
