'use strict';

import { Album } from "./Album.js";
import { AlbumView } from "./AlbumView.js";
import { AlbumSound } from "./AlbumSound.js";
import { AlbumStorage } from "./AlbumStorage.js";
import { RGB } from "./RGB.js";


const field = document.getElementById('field1');
const canvas = field.querySelector('.draw');
const album = new Album();
const albumView = new AlbumView(field);
const albumSound = new AlbumSound();
const albumStorage = new AlbumStorage();
let checkedColor = new RGB(255, 255, 255);

function start() {
    album.start(albumView);
    albumView.start(album);
    albumSound.start();
    albumStorage.start(album);
    albumView.showColorSet(); 
    checkedColor = album.color;
}

function getCurrentСoordinates(event) {
    let pageX = 0;
    let pageY = 0;
    if (event.type === 'touchstart' || event.type === 'touchmove') {
        pageX = event.touches[0].clientX;
        pageY = event.touches[0].clientY;
    }
    else {
        pageX = event.clientX;
        pageY = event.clientY;
    }
    let boundingClientRect = canvas.getBoundingClientRect();
    let x = Math.round((pageX - boundingClientRect.left) / canvas.offsetWidth * canvas.width);
    let y = Math.round((pageY - boundingClientRect.top) / canvas.offsetHeight * canvas.height);

    return { 'x': x, 'y': y };
}

function fill(event) {

    event.preventDefault();
    event.stopPropagation();

    const coord = getCurrentСoordinates(event);
    albumView.fill(coord, checkedColor);
}

function pensilStart(event) {

    event = event || window.e;
    event.preventDefault();
    event.stopPropagation();
    canvas.addEventListener('mousemove', pensilMove);
    canvas.addEventListener('touchmove', pensilMove);
    canvas.addEventListener("mouseout", pensilEnd);
    canvas.addEventListener("mouseup", pensilEnd);

    let coord = getCurrentСoordinates(event);
    albumView.lineStart(coord);
    albumView.lineMove(coord);
}

function pensilMove(event) {
    let coord = getCurrentСoordinates(event);
    albumView.lineMove(coord);
}

function pensilEnd() {
    canvas.removeEventListener("mousemove", pensilMove);
    canvas.removeEventListener("touchmove", pensilMove);
    canvas.removeEventListener("mouseout", pensilEnd);
    canvas.removeEventListener("mouseup", pensilEnd);
    album.saveAction();
    albumView.lineEnd();
}

function changeColor(event) {
    event.stopPropagation();
    event.preventDefault();

    albumSound.click();

    if (event.target) {
        albumView.changeColor(event.target);
        checkedColor = album.color;
    }
}

function fillImage(event) {
    event.stopPropagation();
    event.preventDefault();

    albumSound.click();

    const currentActiveDiv = event.target;
    currentActiveDiv.classList.add('active');
    pencilBtn.classList.remove('active');

    canvas.addEventListener('mouseup', fill);
    canvas.removeEventListener('mousedown', pensilStart);

    canvas.removeEventListener('touchstart', pensilStart);
    canvas.removeEventListener('touchend', pensilEnd);
}

function drawByPencilImage(event) {
    event.stopPropagation();
    event.preventDefault();

    albumSound.click();

    const currentActiveDiv = event.target;
    currentActiveDiv.classList.add('active');
    fillBtn.classList.remove('active');

    canvas.removeEventListener('mouseup', fill);
    canvas.addEventListener('mousedown', pensilStart);

    canvas.addEventListener('touchstart', pensilStart);
    canvas.addEventListener('touchend', pensilEnd);
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

function uploadImage(event) {
    event.stopPropagation();
    event.preventDefault();
    albumStorage.uploadImage(event.target.files[0], albumView);
}

function saveImage(event) {
    event.stopPropagation();
    event.preventDefault();
    albumSound.click();
    albumView.downloadCanvasAsImage();

}

function musicOnOff(event) {
    event.stopPropagation();
    event.preventDefault();
    albumSound.click();
    if (albumSound.playFoneMusic)
        albumSound.stop();
    else
        albumSound.play();

    musicBtn.classList.toggle('on');
    musicBtn.classList.toggle('active');
}

function changeImage(event) {
    event.stopPropagation();
    event.preventDefault();
    albumSound.click();
    albumStorage.getNewImage();
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

const changeBtn = document.getElementById('change');
changeBtn.addEventListener('click', changeImage);

const inputFileBtn = document.getElementById('inputFile');;
inputFileBtn.addEventListener('change', uploadImage);

const uploadBtn = document.getElementById('upload');
uploadBtn.onclick = () => {
    albumSound.click();
    inputFileBtn.click();
}

const musicBtn = document.getElementById('music');
musicBtn.addEventListener('click', musicOnOff);

const colorsDiv = document.getElementById('colors1');
colorsDiv.addEventListener("click", changeColor);

window.onload = start;



