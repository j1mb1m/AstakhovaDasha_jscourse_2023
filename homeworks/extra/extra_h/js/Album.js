'use strict';

import { RGB } from "./RGB.js";

export class Album {

    MAX_BLACK_COLOR = 62; // из диапазона [0..255], где 0 - черный, 255 - белый
    MIN_WHITE_COLOR = 240;// из диапазона [0..255], где 0 - черный, 255 - белый
    prevCoord = Array();
    restore = Array();

    constructor() {
        this.view = null;
        this.boundary = Array(0);
        this.originImg = Array(0);
        this.width = 0;
        this.height = 0;
        this.imageData = Array(0);
        this.color = 'rgb(255,255,255)';
        this.lineSize = 10;

    }

    update() {
        if (this.view)
            this.view.update(this.imageData);
    }



    setColor(color) {
        this.color = color;
    }

    start(view) {
        this.view = view;
    }

    loadImage(imageData, width, height) {
        this.imageData = imageData;
        this.originImg = this.#convertFrom1DTo2DArray(imageData.data, width, height);
        this.#highlightBorders(this.originImg);
        this.height = height;
        this.width = width;
        this.restore.push(Array.from(this.imageData.data));
    }

    redraw(x, y, backgroundData) {
        let coord = { 'x': x, 'y': y };
        if (this.prevCoord.length > 0) {
            coord = this.prevCoord.pop();
        }

        let shiftX = Math.abs(x - coord.x) + this.lineSize;
        let shiftY = Math.abs(y - coord.y) + this.lineSize;

        let sX = Math.max(0, x - shiftX);
        let eX = Math.min(this.width, x + shiftX);
        let sY = Math.max(0, y - shiftY);
        let eY = Math.min(this.height, y + shiftY);

        let cur_color = RGB.rgbToObj(this.color);
        for (let i = sX; i < eX; i++) {
            for (let j = sY; j < eY; j++) {
                let pos = (j * this.width + i) * 4;
                if (backgroundData.data[pos] > 0) {
                    this.imageData.data[pos] = cur_color.r * this.originImg[j][i].k;
                    this.imageData.data[pos + 1] = cur_color.g * this.originImg[j][i].k;
                    this.imageData.data[pos + 2] = cur_color.b * this.originImg[j][i].k;
                }
            }
        }

        this.prevCoord.push({ 'x': x, 'y': y });
        this.update();
    }

    saveAction() {
        this.restore.push(Array.from(this.imageData.data));
    }

    fill(x, y) {

        if (this.boundary[y][x]) return;

        let cur_color = RGB.rgbToObj(this.color);
        let data = this.imageData.data;

        let arr = this.#convertFrom1DTo2DArray(data, this.width, this.height);
        let stack = [[x, y]];

        while (stack.length) {

            let pos = stack.pop();
            x = pos[0];
            y = pos[1];

            //поднимемся в начало, до незакрашенного пикселя
            for (let i = y; i >= 0; i--) {
                if (!this.boundary[i][x]) {
                    y = i;
                }
                else break;
            }

            let rightCheck = false;
            let leftCheck = false;
            for (let i = y; i < this.height; i++) {
                //проверим позицию слева и если не закращена, то поместим в стек для следующего прохода
                if (x > 0 && !arr[i][x - 1].isMatch(cur_color)) {
                    if (rightCheck === false && !this.boundary[i][x - 1]) {
                        stack.push([x - 1, i]);
                        rightCheck = true;
                    }
                    if (this.boundary[i][x - 1]) {
                        rightCheck = false;
                    }
                }
                //проверим позицию справа и если не закращена, то поместим в стек для следующего прохода
                if (x < this.width - 1 && !arr[i][x + 1].isMatch(cur_color)) {
                    if (leftCheck === false && !this.boundary[i][x + 1]) {
                        stack.push([x + 1, i]);
                        leftCheck = true;
                    }
                    if (this.boundary[i][x + 1]) {
                        leftCheck = false;
                    }
                }
                if (this.boundary[i][x]) {
                    break;
                }
                arr[i][x].setColor(cur_color, this.originImg[i][x].k); //установим цвет с учетом сглаживания
            }

        }
        this.#colorize(arr, data);
        this.restore.push(Array.from(data));
        this.update();

    }

    clear() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let pos = (j * this.width + i) * 4;
                if (this.imageData.data[pos] != this.imageData.data[pos + 1] != this.imageData.data[pos + 2]) {
                    this.imageData.data[pos] = 255 * this.originImg[j][i].k;
                    this.imageData.data[pos + 1] = 255 * this.originImg[j][i].k;
                    this.imageData.data[pos + 2] = 255 * this.originImg[j][i].k;
                }
            }
        }
        this.restore = Array();
        this.restore.push(Array.from(this.imageData.data)); 
        this.update();
    }

    undo() {
        this.restore.pop();
        if (!this.restore.length) return;

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let pos = (j * this.width + i) * 4;
                this.imageData.data[pos] = this.restore[this.restore.length - 1][pos];
                this.imageData.data[pos + 1] = this.restore[this.restore.length - 1][pos + 1];
                this.imageData.data[pos + 2] = this.restore[this.restore.length - 1][pos + 2];

            }
        }

        this.update();
    }

    #highlightBorders(data) {
        // выделим границы четко

        for (let i = 0; i < data.length; i++) {
            this.boundary[i] = [];
            for (let j = 0; j < data[i].length; j++) {
                this.boundary[i][j] = 0;
                if (data[i][j].r === data[i][j].g && data[i][j].r === data[i][j].b) {
                    if (data[i][j].r <= this.MAX_BLACK_COLOR) {
                        data[i][j] = new RGB(0, 0, 0, 255, data[i][j].r / 255);
                        this.boundary[i][j] = 1;
                    }
                    else if (data[i][j].r >= this.MIN_WHITE_COLOR) {
                        data[i][j] = new RGB(255, 255, 255, 0);

                    }
                    else data[i][j].k = data[i][j].r / 255;

                }

            }
        }
    }

    #convertFrom1DTo2DArray(data, width, height) {
        //одномерный массив конвертнем в двумерный по размеру полотна
        let arr = new Array();

        for (let i = 0; i < height; i++) {
            arr[i] = [];
            for (let j = 0; j < width; j++) {
                let pos = i * (width * 4) + (j * 4);
                arr[i][j] = new RGB(data[pos], data[pos + 1], data[pos + 2], data[pos + 3]);
            }
        }

        return arr;
    }
    #colorize(arr, data) {
        //перенесем расцветку из двумерного массива в одномерный
        let k = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                data[k] = arr[i][j].r;
                data[k + 1] = arr[i][j].g;
                data[k + 2] = arr[i][j].b;
                data[k + 3] = arr[i][j].a;
                k += 4;
            }
        }
    }
}