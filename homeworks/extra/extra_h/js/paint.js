'use strict';

import { colors } from "./colors.js";
import { Album } from "./Album.js";
import { AlbumView } from "./AlbumView.js";
import { AlbumSound } from "./AlbumSound.js";


const field = document.getElementById('field1');
const canvas = field.querySelector('.draw');
let currentColorDiv = null;
let currentActinDiv = null;

const album = new Album();
const albumView = new AlbumView(field);
const albumSound = new AlbumSound();

function start() {
    album.start(albumView);
    albumView.start(album);
    albumSound.start();
    albumSound.play();
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
                album.setColor(el);
            }
        });
    });
}

function getCurrentСoordinates(pageX, pageY) {
    let boundingClientRect = canvas.getBoundingClientRect();
    let x = Math.round((pageX - boundingClientRect.left) / canvas.offsetWidth * canvas.width);
    let y = Math.round((pageY - boundingClientRect.top) / canvas.offsetHeight * canvas.height);

    return { 'x': x, 'y': y };
}

function fill(event) {

    event.preventDefault();
    event.stopPropagation();

    let coord = getCurrentСoordinates(event.pageX, event.pageY);
    album.fill(coord.x, coord.y);
}

function pensilStart(event) {
    event = event || window.e;
    event.preventDefault();
    event.stopPropagation();
    canvas.addEventListener('mousemove', pensilMove);
    let coord = getCurrentСoordinates(event.pageX, event.pageY);
    albumView.lineStart(coord);
}

function pensilMove(event) {
    let coord = getCurrentСoordinates(event.pageX, event.pageY);
    albumView.lineMove(coord);
}

function pensilEnd() {
    canvas.removeEventListener("mousemove", pensilMove);
    album.saveAction();
    albumView.lineEnd();
}

function chooseColor(event) {
    event.stopPropagation();
    event.preventDefault();
    if (currentColorDiv)
        currentColorDiv.classList.remove('activ');

    if (event.target) {
        currentColorDiv = event.target;
        currentColorDiv.classList.add('activ');
        album.setColor(currentColorDiv.style.backgroundColor);
    }
}

function fillImage(event) {
    event.stopPropagation();
    event.preventDefault();

    albumSound.click();

    if (currentActinDiv)
        currentActinDiv.classList.remove('activ');

    currentActinDiv = event.target;
    currentActinDiv.classList.add('activ');

    canvas.addEventListener('mouseup', fill);
    canvas.removeEventListener('mousedown', pensilStart);
}

function drawByPencilImage(event) {
    event.stopPropagation();
    event.preventDefault();

    albumSound.click();

    if (currentActinDiv)
        currentActinDiv.classList.remove('activ');

    currentActinDiv = event.target;
    currentActinDiv.classList.add('activ');

    canvas.removeEventListener('mouseup', fill);
    canvas.addEventListener('mousedown', pensilStart);
    canvas.addEventListener('mouseup', pensilEnd);
}

function clearImage(event) {
    event.stopPropagation();
    event.preventDefault();
    albumSound.click();
    album.clear();
}

function undoImage(event) {
    event.stopPropagation();
    event.preventDefault();
    albumSound.click();
    album.undo();

}

function saveImage(event) {
    event.stopPropagation();
    event.preventDefault();
    albumSound.click();
    albumView.downloadCanvasAsImage();

}

const fillBtn = document.getElementById('fill');
fillBtn.addEventListener('click', fillImage);

const pencilBtn = document.getElementById('pencil');
pencilBtn.addEventListener('click', drawByPencilImage);

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', clearImage);

const undoBtn = document.getElementById('undo');
undoBtn.addEventListener('click', undoImage);

const saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', saveImage);


/* fillBtn.addEventListener("mouseenter", function(event) {
  let sound = document.getElementById("Sound");
  sound.play();
}, false);
 */
window.onload = start;



