"use strict";

let panel = document.getElementById("imgCat");
let imgCat = document.getElementById("imgCat");

let leftTop = document.getElementById("leftTop");
let middleTop = document.getElementById("middleTop");
let rightTop = document.getElementById("rightTop");

let rightCenter = document.getElementById("rightCenter");
let leftCenter = document.getElementById("leftCenter");

let leftDown = document.getElementById("leftDown");
let middleDown = document.getElementById("middleDown");
let rightDown = document.getElementById("rightDown");

let shiftX;
let shiftY;
let sideRatio;

let coord = {
    x: 0,
    y: 0
};

let currentTarget;

function resize() {
    leftTop.style.left = imgCat.offsetLeft - leftTop.offsetWidth / 2 + "px";
    leftTop.style.top = imgCat.offsetTop - leftTop.offsetHeight / 2 + "px";

    middleTop.style.left = imgCat.offsetLeft + (imgCat.offsetWidth - middleTop.offsetWidth) / 2 + "px";
    middleTop.style.top = imgCat.offsetTop - middleTop.offsetHeight / 2 + "px";

    rightTop.style.left = imgCat.offsetLeft + imgCat.offsetWidth - rightTop.offsetWidth / 2 + "px";
    rightTop.style.top = imgCat.offsetTop - rightTop.offsetHeight / 2 + "px";

    leftCenter.style.left = imgCat.offsetLeft - leftCenter.offsetWidth / 2 + "px";
    leftCenter.style.top = imgCat.offsetTop + (imgCat.offsetHeight - leftCenter.offsetHeight) / 2 + "px";

    rightCenter.style.left = imgCat.offsetLeft + imgCat.offsetWidth - rightCenter.offsetWidth / 2 + "px";
    rightCenter.style.top = imgCat.offsetTop + (imgCat.offsetHeight - rightCenter.offsetHeight) / 2 + "px";

    leftDown.style.left = imgCat.offsetLeft - leftDown.offsetWidth / 2 + "px";
    leftDown.style.top = imgCat.offsetTop + imgCat.offsetHeight - leftDown.offsetHeight / 2 + "px";

    middleDown.style.left = imgCat.offsetLeft + (imgCat.offsetWidth - middleDown.offsetWidth) / 2 + "px";
    middleDown.style.top = imgCat.offsetTop + imgCat.offsetHeight - middleDown.offsetHeight / 2 + "px";

    rightDown.style.left = imgCat.offsetLeft + imgCat.offsetWidth - rightDown.offsetWidth / 2 + "px";
    rightDown.style.top = imgCat.offsetTop + imgCat.offsetHeight - rightDown.offsetHeight / 2 + "px";

}

function setBoundaries(e){    
    let bcr = imgCat.getBoundingClientRect();
    sideRatio = (bcr.width === 0 ? 1 : bcr.height / bcr.width);

    switch (currentTarget) {
        case rightCenter:
            coord.x = bcr.left;
            break;
        case leftCenter:
            coord.x = bcr.left + bcr.width;
            break;
        case middleTop:
            coord.y = bcr.top + bcr.height;
            break;
        case middleDown:
            coord.y = bcr.top;
            break;
        case leftTop:
            coord.x = bcr.left + bcr.width;
            coord.y = bcr.top + bcr.height;
            break;
        case rightTop:
            coord.x = bcr.left;
            coord.y = bcr.top + bcr.height;
            break;
        case leftDown:
            coord.x = bcr.left + bcr.width;
            coord.y = bcr.top;
            break;
        case rightDown:
            coord.x = bcr.left;
            coord.y = bcr.top;
            break;
         case imgCat:
                coord.x = e.clientX - bcr.left;;
                coord.y = e.clientY - bcr.top;
                break;
    }
}

function mousedown(e) {
    e = e || window.e;
    e.preventDefault();

    if (e.button !== 0) return;
    if (!currentTarget) currentTarget = e.target;

    setBoundaries(e);
    document.addEventListener("mousemove", mousemove, false);

    moveAt(e.pageX, e.pageY);
}

function checkDirection(pageX, pageY) {
    if (pageY >= coord.y && currentTarget === middleTop) {
        currentTarget = middleDown;
    }
    else if (pageY <= coord.y && currentTarget === middleDown) {
        currentTarget = middleTop;
    }
    else if (pageX >= coord.x && currentTarget === leftCenter) {
        currentTarget = rightCenter;
    }
    else if (pageX <= coord.x && currentTarget === rightCenter) {
        currentTarget = leftCenter;
    }
    else if (pageX <= coord.x && currentTarget === rightTop) { //т.к. соотношение считаем по Х, то проверяем положение Х, т.к. pageY получается расчетным путем
        currentTarget = leftDown;
    }
    else if (pageX >= coord.x && currentTarget === leftDown) { //т.к. соотношение считаем по Х, то проверяем положение Х, т.к. pageY получается расчетным путем
        currentTarget = rightTop;
    }
    else if (pageX >= coord.x && currentTarget === leftTop) { //т.к. соотношение считаем по Х, то проверяем положение Х, т.к. pageY получается расчетным путем
        currentTarget = rightDown;
    }
    else if (pageX <= coord.x && currentTarget === rightDown) { //т.к. соотношение считаем по Х, то проверяем положение Х, т.к. pageY получается расчетным путем
        currentTarget = leftTop;
    }
}

function moveAt(pageX, pageY) {
    checkDirection(pageX, pageY);

    let h; // переменная для промежуточных расчетов

    switch (currentTarget) {
        case rightCenter:
            imgCat.style.width = (pageX - coord.x) + "px";
            imgCat.style.left = coord.x + "px";
            break;
        case leftCenter:
            imgCat.style.width = (coord.x - pageX) + "px";
            imgCat.style.left = pageX + "px";
            break;
        case middleTop:
            imgCat.style.height = coord.y - pageY + "px";
            imgCat.style.top = pageY + "px";
            break;
        case middleDown:
            imgCat.style.height = (pageY - coord.y) + "px";
            imgCat.style.top = coord.y + "px";
            break;
        case imgCat:
            imgCat.style.left = (pageX - coord.x) + "px";
            imgCat.style.top = (pageY - coord.y) + "px";
            break;
        case leftTop:
            imgCat.style.width = coord.x - pageX + "px";
            imgCat.style.left = pageX + "px";
            h = (coord.x - pageX) * sideRatio;
            imgCat.style.height = h + "px";
            imgCat.style.top = coord.y - h + "px";
            break;
        case rightTop:
            imgCat.style.width = pageX - coord.x + "px";
            imgCat.style.left = coord.x + "px";
            h = (pageX - coord.x) * sideRatio;
            imgCat.style.height = h + "px";
            imgCat.style.top = coord.y - h + "px";
            break;
        case leftDown:
            imgCat.style.width = coord.x - pageX + "px";
            imgCat.style.left = pageX + "px";
            h = (coord.x - pageX) * sideRatio;
            imgCat.style.height = h + "px";
            imgCat.style.top = coord.y + "px";
            break;
        case rightDown:
            imgCat.style.width = pageX - coord.x + "px";
            imgCat.style.left = coord.x + "px";
            h = (pageX - coord.x) * sideRatio;
            imgCat.style.height = h + "px";
            imgCat.style.top = coord.y + "px";
            break;
    }
    resize();
}
function mousemove(e) {
    moveAt(e.pageX, e.pageY);
}

function mouseup(e) {
    document.removeEventListener("mousemove", mousemove);
    currentTarget = null;
}

document.addEventListener("mousedown", mousedown, false);
document.addEventListener("mouseup", mouseup, false);

window.onload = () => {
    resize();
};