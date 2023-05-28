'use strict';

import { RGB } from "./RGB.js";
import { colors } from "./colors.js";

const canvas = document.getElementById('canvas1');
const context = canvas.getContext("2d", { willReadFrequently: true });

const MAX_BLACK_COLOR = 82; // из диапазона [0..255], где 0 - черный, 255 - белый
const MIN_WHITE_COLOR = 240;// из диапазона [0..255], где 0 - черный, 255 - белый

let palleteSize = 3; //size: 3-normal, 2 - middle, 1 - small

let originImg = []; //храним исходное изображение
let currentColorDiv = null;
const boundary = [];

function resizeWindow() {
    const colorsDiv = document.getElementById('colors1');
    let cldNodes = colorsDiv.childNodes;
    if (window.innerWidth < 335 && palleteSize != 1) {
        for (let i = 2; i < cldNodes.length; i += 5) {
            cldNodes[i].classList.add('display-none');
            palleteSize = 1;
        }
        for (let i = 2; i < cldNodes.length; i += 3) {
            cldNodes[i].classList.add('display-none');
            palleteSize = 2;
        }
    }
    else if (window.innerWidth <= 450 && palleteSize != 2) {
        for (let i = 2; i < cldNodes.length; i += 3) {
            cldNodes[i].classList.add('display-none');
            palleteSize = 2;
        }
    }

    else if (window.innerWidth > 450 && palleteSize != 3) {
        for (let i = 1; i < cldNodes.length; i++) {
            cldNodes[i].classList.remove('display-none');
            palleteSize = 3;
        }
    }
}

function start() {

    const colorsDiv = document.getElementById('colors1');

    colors.forEach(group => {
        let newGroupDiv = colorsDiv.appendChild(document.createElement('div'));
        newGroupDiv.classList.add("color-set");
        group.forEach(el => {
            let newDiv = newGroupDiv.appendChild(document.createElement('div'));
            newDiv.classList.add("color-format");
            newDiv.style.setProperty('background-color', el);
            newDiv.addEventListener("click", chooseColor);
            if (!currentColorDiv) {
                currentColorDiv = newDiv;
                currentColorDiv.classList.add('activ');
            }
        });
    });

    resizeWindow();

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let image = new Image();
    /*     image.src = './images/52-raskraska.gif';     */
    image.src = './images/ulitka6.gif';
    image.onload = function () {

        let width = canvas.width;
        let height = canvas.height;
        let imgWidth = image.width;
        let imgHeight = image.height;
        let kX = image.width / width;
        let kY = image.height / height;
        if (kX <= kY) {
            imgWidth = Math.floor(image.width / kY);
            imgHeight = height;
        }
        else {
            imgWidth = width;
            imgHeight = Math.floor(image.height / kX);
        }

        context.drawImage(image, 0, 0, imgWidth, imgHeight);

        let imageData = context.getImageData(0, 0, width, height);
        originImg = convertFrom1DTo2DArray(imageData.data, width, height);
        highlightBorders(originImg);
    }
}


function highlightBorders(data) {
    // выделим границы четко

    for (let i = 0; i < data.length; i++) {
        boundary[i] = []; 
        for (let j = 0; j < data[i].length; j++) {
            boundary[i][j] = 0;
            if (data[i][j].r === data[i][j].g && data[i][j].r === data[i][j].b) {
                if (data[i][j].r <= MAX_BLACK_COLOR) {
                    data[i][j] = new RGB(0, 0, 0, 255);
                    boundary[i][j] = 1;
                    /*                    data[i][j].k = 1; */
                }
                else if (data[i][j].r >= MIN_WHITE_COLOR) {
                    data[i][j] = new RGB(255, 255, 255, 255);
                    /*                     data[i][j].k = 0; */
                }
                else data[i][j].k = data[i][j].r / 255;

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

    let boundingClientRect = canvas.getBoundingClientRect();

    let x = Math.round((event.pageX - boundingClientRect.left) / canvas.offsetWidth * canvas.width);
    let y = Math.round((event.pageY - boundingClientRect.top) / canvas.offsetHeight * canvas.height);

    if (boundary[y][x]) return;
    let bcolor = originImg[y][x];

    let cur_color = RGB.rgbToObj(currentColorDiv.style.backgroundColor);

    let width = canvas.width;
    let height = canvas.height;

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
            if (!boundary[i][x]) {
                y = i;
            }
            else break;
        }

        let rightCheck = false;
        let leftCheck = false;
        for (let i = y; i < height; i++) {
            //проверим позицию слева и если не закращена, то поместим в стек для следующего прохода
            if (x > 0 && !arr[i][x - 1].isMatch(cur_color)) {
                if (rightCheck === false && !boundary[i][x - 1]) {
                    stack.push([x - 1, i]);
                    rightCheck = true;
                }
                if (boundary[i][x - 1]) {
                    rightCheck = false;
                }
            }
            //проверим позицию справа и если не закращена, то поместим в стек для следующего прохода
            if (x < width - 1 && !arr[i][x + 1].isMatch(cur_color)) {
                if (leftCheck === false && !boundary[i][x + 1]) {
                    stack.push([x + 1, i]);
                    leftCheck = true;
                }
                if (boundary[i][x + 1]) {
                    leftCheck = false;
                }
            }
            if (boundary[i][x]) {
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

function chooseColor(e) {
    e.stopPropagation();

    currentColorDiv.classList.remove('activ');
    if (e.target) {
        currentColorDiv = e.target;
        currentColorDiv.classList.add('activ');
    }
}


canvas.addEventListener('mouseup', pick);
window.onload = start;
window.addEventListener("resize", function () {
    resizeWindow();
});

/* document.addEventListener("click", chooseColor); */
