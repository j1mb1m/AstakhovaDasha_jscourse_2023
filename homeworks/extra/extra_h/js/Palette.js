import { colors } from "./colors.js";
import { RGB } from "./RGB.js";

export class Palette {
    constructor() {
        this.colors = colors;
        this.map = this.#convertTomap();
        this.currentPosition = 0;
    }

    #convertTomap() {
        let colorsMap = {};
        this.colors.forEach((group, indexGroup) => {
            group.forEach((el, indexEl) => {
                colorsMap[indexGroup * group.length + indexEl]= {
                    row: indexGroup,
                    column: indexEl,
                    color: RGB.rgbToObj(el)
                }
            });
        });
        return colorsMap;
    }

    getColor(number) {
        this.currentPosition = number;
        return this.map[number].color;
    }

    getCurrentColor(number) {
        return this.map[this.currentPosition].color;
    }
    getCurrentPosition(){
        return this.currentPosition;
    }     

}

