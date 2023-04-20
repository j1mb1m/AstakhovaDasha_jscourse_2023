"use strict";
const solution = document.getElementById('solution');
let arr_img = solution.getElementsByTagName('img');

for (const iterator of arr_img) {
    iterator.addEventListener('mousedown', mousedownHandler, false);
}


function mousedownHandler(e) {
    e = e || window.event;
    if (e.button !== 0) return;
    const markerObj = e.target;
    let shiftX = e.clientX - markerObj.getBoundingClientRect().left;
    let shiftY = e.clientY - markerObj.getBoundingClientRect().top;

    let newNode = markerObj.cloneNode(false);
    newNode.ondragstart = function () {
        return false;
    };

    newNode.style.zIndex = 100;
    newNode.style.position = 'absolute';
    newNode.style.cursor = 'pointer';
    markerObj.style.visibility = 'hidden';
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
        document.body.removeChild(newNode);
        markerObj.style.visibility = 'visible';
    };
}

