"use strict";

const solution = document.getElementById('solution');
let arr_img = solution.getElementsByTagName('img');
let wasClick = false;

function mousedownHandler(e) {
    e = e || window.event;
    if (e.button !== 0) return;
    let newNode = e.target;
    let shiftX = e.clientX - newNode.getBoundingClientRect().left;
    let shiftY = e.clientY - newNode.getBoundingClientRect().top;


    newNode.style.cursor = 'move';

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
        newNode.style.cursor = 'pointer';
    };
}
window.onload = () => {

    let arr_img = solution.getElementsByTagName('img');
    for (const iterator of arr_img) {
        iterator.style.left = iterator.offsetLeft + 'px';
        iterator.style.top = iterator.offsetTop + 'px';
        iterator.addEventListener('mousedown', mousedownHandler, false);
    }
    for (const iterator of arr_img) {
        iterator.style.position = 'absolute'; //делаю в разных циклах, чтобы картинка была прижата по нижнему краю занимаемой области,
        // иначе она будет выравнена по верхнему краю. Если не критично, то можно объединить в один цикл-проход 
    }

}

