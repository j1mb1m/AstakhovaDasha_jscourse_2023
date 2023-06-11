'use strict';

export function AlbumController() {

    let fillBtn, pencilBtn, clearBtn, undoBtn, saveBtn, changeBtn, inputFileBtn, uploadBtn, musicBtn, colorsDiv, canvas;

    const self = this;

    self.start = function (album, container) {
        self.container = container;
        self.album = album;

        self.canvas = container.querySelector('.draw');
        fillBtn = container.querySelector('.fill');
        fillBtn.addEventListener('click', self.fillBtnClick);

        pencilBtn = container.querySelector('.pencil');
        pencilBtn.addEventListener('click', self.pencilBtnClick);

        clearBtn = container.querySelector('.clear');
        clearBtn.addEventListener('click', self.clearBtnClick);

        undoBtn = container.querySelector('.undo');
        undoBtn.addEventListener('click', self.undoBtnClick);

        saveBtn = container.querySelector('.save');
        saveBtn.addEventListener('click', self.saveBtnClick);

        changeBtn = container.querySelector('.change');
        changeBtn.addEventListener('click', self.changeBtnClick);

        inputFileBtn = container.querySelector('.inputFile');;
        inputFileBtn.addEventListener('change', self.inputFileChange);

        uploadBtn = container.querySelector('.upload');
        uploadBtn.onclick = () => {
            self.album.btnClick();
            inputFileBtn.click();
        }

        musicBtn = container.querySelector('.music');
        musicBtn.addEventListener('click', self.musicBtnClick);

        colorsDiv = container.querySelector('.colors');
        colorsDiv.addEventListener("click", self.selectColor);

        canvas = container.querySelector('.draw');
    }

    self.getCurrentСoordinates = function (event) {
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
        let boundingClientRect = self.canvas.getBoundingClientRect();
        let x = Math.round((pageX - boundingClientRect.left) / self.canvas.offsetWidth * self.canvas.width);
        let y = Math.round((pageY - boundingClientRect.top) / self.canvas.offsetHeight * self.canvas.height);

        return { 'x': x, 'y': y };
    }

    self.fill = function (event) {

        event.preventDefault();
        event.stopPropagation();

        const coord = self.getCurrentСoordinates(event);
        self.album.fill(coord);
    }

    self.pensilStart = function (event) {

        event = event || window.e;
        event.preventDefault();
        event.stopPropagation();
        self.canvas.addEventListener('mousemove', self.pensilMove);
        self.canvas.addEventListener('touchmove', self.pensilMove);
        self.canvas.addEventListener("mouseout", self.pensilEnd);
        self.canvas.addEventListener("mouseup", self.pensilEnd);

        let coord = self.getCurrentСoordinates(event);
        self.album.lineStart(coord);
        self.album.lineMove(coord);
    }

    self.pensilMove = function (event) {
        let coord = self.getCurrentСoordinates(event);
        self.album.lineMove(coord);
    }

    self.pensilEnd = function () {
        self.canvas.removeEventListener("mousemove", self.pensilMove);
        self.canvas.removeEventListener("touchmove", self.pensilMove);
        self.canvas.removeEventListener("mouseout", self.pensilEnd);
        self.canvas.removeEventListener("mouseup", self.pensilEnd);

        self.album.lineEnd();
        self.album.saveAction();
    }

    self.selectColor = function (event) {
        event.stopPropagation();
        event.preventDefault();

        if (event.target) {
            self.album.selectColor(event.target.getAttribute('data-colorNumber'));
        }
    }

    self.fillBtnClick = function (event) {
        event.stopPropagation();
        event.preventDefault();

        self.album.btnClick();

        const currentActiveDiv = event.target;
        currentActiveDiv.classList.add('active');
        pencilBtn.classList.remove('active');

        self.canvas.addEventListener('mouseup', self.fill);
        self.canvas.removeEventListener('mousedown', self.pensilStart);

        self.canvas.removeEventListener('touchstart', self.pensilStart);
        self.canvas.removeEventListener('touchend', self.pensilEnd);
    }

    self.pencilBtnClick = function (event) {
        event.stopPropagation();
        event.preventDefault();

        self.album.btnClick();

        const currentActiveDiv = event.target;
        currentActiveDiv.classList.add('active');
        fillBtn.classList.remove('active');

        self.canvas.removeEventListener('mouseup', self.fill);
        self.canvas.addEventListener('mousedown', self.pensilStart);

        self.canvas.addEventListener('touchstart', self.pensilStart);
        self.canvas.addEventListener('touchend', self.pensilEnd);
    }

    self.clearBtnClick = function (event) {
        event.stopPropagation();
        event.preventDefault();

        self.album.clear();
    }

    self.undoBtnClick = function (event) {
        event.stopPropagation();
        event.preventDefault();

        self.album.undo();
    }

    self.inputFileChange = function (event) {
        event.stopPropagation();
        event.preventDefault();

        self.album.uploadImage(event.target.files[0]);
    }

    self.saveBtnClick = function (event) {
        event.stopPropagation();
        event.preventDefault();

        self.album.saveImage();
    }

    self.musicBtnClick = function (event) {
        event.stopPropagation();
        event.preventDefault();

        self.album.musicOnOff();

        event.target.classList.toggle('on');
        event.target.classList.toggle('active');
    }

    self.changeBtnClick = function (event) {
        event.stopPropagation();
        event.preventDefault();

        self.album.refreshImage();
    }


}

