'use strict';

import { RGB } from "./RGB.js";

export class Album {

    MAX_BLACK_COLOR = 52; // из диапазона [0..255], где 0 - черный, 255 - белый
    prevCoord = Array();
    restore = Array();

    constructor() {
        this.view = null;
        this.boundary = Array(0);
        this.originImg = Array(0);
        this.width = 0;
        this.height = 0;
        this.imageData = Array(0);
        this.color = new RGB(255, 255, 255);
        this.lineSize = 10;
        this.imageURL;
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

    getImageFromURL(url){
        this.imageURL = url;
        this.view.showImageFromURL(url);
    }


    loadImage(imageData, width, height) {
        this.imageData = imageData;
        this.originImg = this.#convertFrom1DTo2DArray(imageData.data, width, height);
        this.#highlightBorders(this.originImg);
        this.height = height;
        this.width = width;
        this.saveAction();
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

        let cur_color = this.color;
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

        let cur_color = this.color;

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
                //проверим позицию справа и если не закрашена, то поместим в стек для следующего прохода
                if (x > 0) {
                    if (!arr[i][x - 1].isMatch(cur_color) && !rightCheck && !this.boundary[i][x - 1]) {
                        stack.push([x - 1, i]);
                        rightCheck = true;
                    }
                    if (this.boundary[i][x - 1]) {
                        rightCheck = false;
                    }
                }
                //проверим позицию слева и если не закрашена, то поместим в стек для следующего прохода
                if (x < this.width - 1) {
                    if (!arr[i][x + 1].isMatch(cur_color) && !leftCheck && !this.boundary[i][x + 1]) {
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
        this.update();
    }

    clear() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let pos = (j * this.width + i) * 4;
                this.imageData.data[pos] = this.originImg[j][i].r;
                this.imageData.data[pos + 1] = this.originImg[j][i].g;
                this.imageData.data[pos + 2] = this.originImg[j][i].b;
            }
        }
        this.restore = Array();
        this.saveAction();
        this.update();
    }

    undo() {
        this.restore.pop();
        if (!this.restore.length) {
            this.clear();
            return;
        }

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

    getBGColor(x, y) {
        let pos = (y * this.width + x) * 4;
        return new RGB(this.imageData.data[pos], this.imageData.data[pos + 1], this.imageData.data[pos + 2]);
    }

    #highlightBorders(data) {
        // выделим границы четко

        for (let i = 0; i < data.length; i++) {
            this.boundary[i] = [];
            for (let j = 0; j < data[i].length; j++) {
                this.boundary[i][j] = 0;
                if (data[i][j].r === data[i][j].g && data[i][j].r === data[i][j].b) {
                    if (data[i][j].r <= this.MAX_BLACK_COLOR) {
                        this.boundary[i][j] = 1;
                    }
                }
                data[i][j].k = data[i][j].r / 255;

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