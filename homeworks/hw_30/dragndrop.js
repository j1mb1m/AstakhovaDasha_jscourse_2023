"use strict";
const solution = document.getElementById('solution');
let arr_img = solution.getElementsByTagName('img');

for (const iterator of arr_img) {
    iterator.style.left = iterator.offsetLeft + 'px';
    iterator.style.top = iterator.offsetTop + 'px';
    iterator.addEventListener('mousedown', mousedownHandler, false);
    iterator.addEventListener('mouseover', mouseoverHandler, false);
}

function mouseoverHandler(e) {
    e = e || window.event;

    for (const iterator of arr_img) {
        iterator.style.position = 'absolute';
        iterator.removeEventListener('mouseover', mouseoverHandler, false);
    }
}

function mousedownHandler(e) {
    e = e || window.event;
    if (e.button !== 0) return;
    const newNode = e.target;
    let shiftX = e.clientX - newNode.getBoundingClientRect().left;
    let shiftY = e.clientY - newNode.getBoundingClientRect().top;

    newNode.style.zIndex = 100;
    newNode.style.position = 'absolute';
    newNode.style.cursor = 'pointer';

    newNode.ondragstart = function () {
        return false;
    };

    document.body.append(newNode);

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
        newNode.style.left = pageX - shiftX + 'px';
        newNode.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    newNode.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        newNode.onmouseup = null;
    };
}

