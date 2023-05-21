'use strict';

import { RGB } from "./RGB.js";

const canvas = document.getElementById('canvas1');
const context = canvas.getContext("2d", { willReadFrequently: true });

const MAX_BLACK_COLOR = 44; // из диапазона [0..255], где 0 - черный, 255 - белый
const MIN_WHITE_COLOR = 240;// из диапазона [0..255], где 0 - черный, 255 - белый

let originImg = []; //храним исходное изображение

function start() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    let image = new Image();
    /*     image.src = './images/52-raskraska.gif';     */
    image.src = './images/ulitka6.gif';
    image.onload = function () {

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        context.drawImage(image, 0, 0, width, height);

        let imageData = context.getImageData(0, 0, width, height);
        originImg = convertFrom1DTo2DArray(imageData.data, width, height);
        highlightBorders(originImg); 
    }
}


function highlightBorders(data) {
    // выделим границы четко

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j].a < 255) {
                debugger;
            } 
            if (data[i][j].r === data[i][j].g && data[i][j].r === data[i][j].b) {
                if (data[i][j].r <= MAX_BLACK_COLOR) {
                    data[i][j] = new RGB(0, 0, 0, 255);
                }
                else if (data[i][j].r >= MIN_WHITE_COLOR) {
                    data[i][j] = new RGB(255, 255, 255, 255);
                }
                else  data[i][j].k = data[i][j].r/255;

            }

        }
    }
}

function convertFrom1DTo2DArray(data, width, height) {
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

function pick(event) {

    event.preventDefault();
    event.stopPropagation();

    let x = (event.pageX - canvas.offsetLeft);
    let y = (event.pageY - canvas.offsetTop);

    let bcolor = originImg[y][x];

    let cur_color_D = document.getElementById('color');
    let cur_color = RGB.convertFromHex(cur_color_D.value);

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    let imageData = context.getImageData(0, 0, width, height);
    let data = imageData.data;

    let arr = convertFrom1DTo2DArray(data, width, height);;
    let stack = [[x, y]];

    while (stack.length) {

        let pos = stack.pop();
        x = pos[0];
        y = pos[1];

        //поднимемся в начало, до незакрашенного пикселя
        for (let i = y; i >= 0; i--) {
            if (originImg[i][x].isMatch(bcolor)) {
                y = i;
            }
            else break;
        }

        let rightCheck = false;
        let leftCheck = false;
        for (let i = y; i < height; i++) {
            //проверим позицию слева и если не закращена, то поместим в стек для следующего прохода
            if (x > 0 && !arr[i][x - 1].isMatch(cur_color)) {
                if (rightCheck === false && originImg[i][x - 1].isMatch(bcolor)) {
                    stack.push([x - 1, i]);
                    rightCheck = true;
                }
                if (!originImg[i][x - 1].isMatch(bcolor)) {
                    rightCheck = false;
                }
            }
            //проверим позицию справа и если не закращена, то поместим в стек для следующего прохода
            if (x < width - 1 && !arr[i][x + 1].isMatch(cur_color)) {
                if (leftCheck === false && originImg[i][x + 1].isMatch(bcolor)) {
                    stack.push([x + 1, i]);
                    leftCheck = true;
                }
                if (!originImg[i][x + 1].isMatch(bcolor)) {
                    leftCheck = false;
                }
            }
            if (!originImg[i][x].isMatch(bcolor)) {
                break;
            }
            arr[i][x].setColor(cur_color, originImg[i][x].k); //установим цвет с учетом сглаживания
        }

    }
    colorize(arr, data);
    context.putImageData(imageData, 0, 0);

}

function colorize(arr, data) {
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

canvas.addEventListener('mouseup', pick);
window.onload = start;
