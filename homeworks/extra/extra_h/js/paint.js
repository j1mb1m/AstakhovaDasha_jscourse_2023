'use strict';

import { colors } from "./colors.js";
import { Album } from "./Album.js";
import { AlbumView } from "./AlbumView.js";
import { AlbumSound } from "./AlbumSound.js";
import { RGB } from "./RGB.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getStorage, ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDp66XwmXPjZ_QBzYZyc-Sl76fp5bVT0NM",
    authDomain: "galleryapp-6d907.firebaseapp.com",
    projectId: "galleryapp-6d907",
    storageBucket: "galleryapp-6d907.appspot.com",
    messagingSenderId: "126127482908",
    appId: "1:126127482908:web:ea3c101bbe26afd10757d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Create a reference under which you want to list
const listRef = ref(storage, 'images/');

let list = [];
let currImage = 0;
// Find all the prefixes and items.
listAll(listRef)
    .then((res) => {
        res.items.forEach((itemRef) => {
            list.push(itemRef.name);
        });
    }).catch((error) => {
    });


function getNewImage() {
    if (list.length) {
        getDownloadURL(ref(storage, 'images/' + list[currImage]))
            .then((url) => {


                const image = new Image();
                image.crossOrigin = "Anonymous";
                image.onload = function () {
                    const ctxDraw = canvas.getContext("2d");
                    let width = canvas.width;
                    let height = canvas.height;
                    let imgWidth = image.width;
                    let imgHeight = image.height;
                    let kX = image.width / width;
                    let kY = image.height / height;
                    if (kX <= kY) {
                        imgWidth = Math.floor(imgWidth / kY);
                        imgHeight = height;
                    }
                    else {
                        imgWidth = width;
                        imgHeight = Math.floor(imgHeight / kX);
                    }
                    ctxDraw.fillStyle = 'rgb(255,255,255)';
                    ctxDraw.fillRect(0, 0, width, height);
                    ctxDraw.drawImage(image, (width - imgWidth) / 2, (height - imgHeight) / 2, imgWidth, imgHeight);
                    album.loadImage(ctxDraw.getImageData(0, 0, width, height), width, height);
                }
                image.src = url;

                currImage += 1;
                if (currImage >= list.length) currImage = 0;

            })
            .catch((error) => {
                console.log(error);
            });

    }
    else setTimeout(getNewImage);
}

function getNewImage1() {

    getDownloadURL(ref(storage, 'images/ulitka6.gif'))
        .then((url) => {
            /*             console.log(url); */

            var xhr = new XMLHttpRequest();
            /*             xhr.open('POST', 'functions.php', true);
                        xhr.onload = function () {
                            console.log(xhr.responseText);
                        }
            
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        xhr.send('function=hello'); */


            /*         xhr.open('GET', url); */
            xhr.open("GET", "index.php?url=" + url, true);
            /* xhr.open("GET", "index.php", true);*/
            /*             xhr.responseType = 'blob';
                        xhr.onload = (event) => {
                            const blob = xhr.response;
                        }; */

            xhr.send();
            xhr.onload = function () {
                console.log(xhr.responseText);
            }
            const ctxDraw = canvas.getContext("2d");

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    let img = new Image();
                    img.src = xhr.responseText;
                    img.onload = function () {
                        ctxDraw.drawImage(img, 0, 0, canvas.width, canvas.height);
                        album.loadImage(ctxDraw.getImageData(0, 0, canvas.width, canvas.height), canvas.width, canvas.height);
                    }

                }
            }

        })
        .catch((error) => {
            console.log(error);
        });
}

const field = document.getElementById('field1');
const canvas = field.querySelector('.draw');
let currentColorDiv = null;
let currentActinDiv = null;

const album = new Album();
const albumView = new AlbumView(field);
const albumSound = new AlbumSound();
let finalColor = new RGB(255, 255, 255);

/* let xhr = new XMLHttpRequest();
xhr.open('GET', "./uploads/list_images.json");

xhr.onload = function () {
    if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    } else { // если всё прошло гладко, выводим результат
        console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
        console.log(xhr.responseText);
    }
};

xhr.onerror = function () {
    console.log("Запрос не удался");
};

xhr.send(); */

function start() {
    album.start(albumView);
    albumView.start(album);
    albumSound.start();
    getNewImage();
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
                currentColorDiv.classList.add('active');
                album.setColor(RGB.rgbToObj(el));
                finalColor = RGB.rgbToObj(currentColorDiv.style.backgroundColor);
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

    const coord = getCurrentСoordinates(event.pageX, event.pageY);
    albumView.fill(coord, finalColor);
}

function pensilStart(event) {
    let coord;
    event = event || window.e;
    event.preventDefault();
    event.stopPropagation();
    canvas.addEventListener('mousemove', pensilMove);
    canvas.addEventListener('touchmove', pensilMove);

    if (event.type === 'touchstart') {
        coord = getCurrentСoordinates(event.touches[0].pageX, event.touches[0].pageY);
    }
    else {
        coord = getCurrentСoordinates(event.pageX, event.pageY);
    }
    albumView.lineStart(coord);
    albumView.lineMove(coord);
}

function pensilMove(event) {
    let coord;

    if (event.type === 'touchmove') {
        coord = getCurrentСoordinates(event.touches[0].pageX, event.touches[0].pageY);
    }
    else {
        coord = getCurrentСoordinates(event.pageX, event.pageY);
    }
    albumView.lineMove(coord);
}

function pensilEnd() {
    canvas.removeEventListener("mousemove", pensilMove);
    canvas.removeEventListener("touchmove", pensilMove);
    album.saveAction();
    albumView.lineEnd();
}

function chooseColor(event) {
    event.stopPropagation();
    event.preventDefault();

    albumSound.click();
    if (currentColorDiv)
        currentColorDiv.classList.remove('active');

    if (event.target) {
        currentColorDiv = event.target;
        currentColorDiv.classList.add('active');
        album.setColor(RGB.rgbToObj(currentColorDiv.style.backgroundColor));
        finalColor = RGB.rgbToObj(currentColorDiv.style.backgroundColor);
    }
}

function fillImage(event) {
    event.stopPropagation();
    event.preventDefault();

    albumSound.click();

    if (currentActinDiv)
        currentActinDiv.classList.remove('active');

    currentActinDiv = event.target;
    currentActinDiv.classList.add('active');

    canvas.addEventListener('mouseup', fill);
    canvas.removeEventListener('mousedown', pensilStart);

    canvas.removeEventListener('touchstart', pensilStart);
    canvas.removeEventListener('touchend', pensilEnd);
}

function drawByPencilImage(event) {
    event.stopPropagation();
    event.preventDefault();

    albumSound.click();

    if (currentActinDiv)
        currentActinDiv.classList.remove('active');

    currentActinDiv = event.target;
    currentActinDiv.classList.add('active');

    canvas.removeEventListener('mouseup', fill);
    canvas.addEventListener('mousedown', pensilStart);
    canvas.addEventListener('mouseup', pensilEnd);

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

function saveImage(event) {
    event.stopPropagation();
    event.preventDefault();
    albumSound.click();
    albumView.downloadCanvasAsImage();

}

function musicOnOff(event) {
    event.stopPropagation();
    event.preventDefault();
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
    getNewImage();
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

const musicBtn = document.getElementById('music');
musicBtn.addEventListener('click', musicOnOff);

/* fillBtn.addEventListener("mouseenter", function(event) {
  let sound = document.getElementById("Sound");
  sound.play();
}, false);
 */
window.onload = start;



