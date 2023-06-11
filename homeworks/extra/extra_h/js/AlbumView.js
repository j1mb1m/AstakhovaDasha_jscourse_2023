import { colors } from "./colors.js";
import { RGB } from "./RGB.js";

export class AlbumView {

    currentColorDiv = null;

    constructor(field) {
        this.canvasDraw = field.querySelector('.draw');
        this.canvasBackground = field.querySelector('.background');
        this.ctxDraw = this.canvasDraw.getContext("2d", { willReadFrequently: true });
        this.ctxBackground = this.canvasBackground.getContext("2d", { willReadFrequently: true });
        this.album = null;
    }

    start(album) {
        this.album = album;

        this.ctxDraw.fillStyle = 'white';
        this.ctxDraw.fillRect(0, 0, this.canvasDraw.width, this.canvasDraw.height);
        this.ctxBackground.fillStyle = 'rgb(0,0,0)';
        this.ctxBackground.fillRect(0, 0, this.canvasDraw.width, this.canvasDraw.height);
    }

    showImageFromURL(url) {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = url;

        const canvasDraw = this.canvasDraw;
        const ctxDraw = this.ctxDraw;
        const album = this.album;

        image.onload = function () {
            let width = canvasDraw.width;
            let height = canvasDraw.height;

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

    }

    update(data) {
        this.ctxDraw.putImageData(data, 0, 0);
    }

    lineStart(coord) {
        if (!this.album) return;
        this.ctxBackground.strokeStyle = 'white';
        this.ctxBackground.fillStyle = 'white';
        this.ctxBackground.lineCap = "round";
        this.ctxBackground.lineJoin = "round";
        this.ctxBackground.lineWidth = this.album.lineSize;
        this.ctxBackground.beginPath();
        this.ctxBackground.moveTo(coord.x, coord.y);
    }

    lineMove(coord) {
        this.ctxBackground.lineTo(coord.x, coord.y);
        this.ctxBackground.stroke();

        if (this.album)
            this.album.redraw(coord.x, coord.y, this.ctxBackground.getImageData(0, 0, this.canvasBackground.width, this.canvasBackground.height));

    }

    lineEnd() {
        this.ctxBackground.closePath();
        this.ctxBackground.fillStyle = 'rgb(0,0,0)';
        this.ctxBackground.fillRect(0, 0, this.canvasBackground.width, this.canvasBackground.height);
    }

    downloadCanvasAsImage() {
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'image.png');
        this.canvasDraw.toBlob(function (blob) {
            let url = URL.createObjectURL(blob);
            downloadLink.setAttribute('href', url);
            downloadLink.click();
        });
    }

    fill(coord, color) {
        if (!this.album) return;

        const album = this.album;
        let cur_color = this.album.getBGColor(coord.x, coord.y);
        let finalColor = color;
        let countUpdates = 8;
        let stepR = Math.floor(Math.abs(cur_color.r - finalColor.r) / countUpdates);
        let stepG = Math.floor(Math.abs(cur_color.g - finalColor.g) / countUpdates);
        let stepB = Math.floor(Math.abs(cur_color.b - finalColor.b) / countUpdates);
        tick();

        function tick() {

            if (cur_color.r > finalColor.r) {
                cur_color.r -= stepR;
                if (cur_color.r < finalColor.r || stepR === 0)
                    cur_color.r = finalColor.r;
            }
            else if (cur_color.r < finalColor.r) {
                cur_color.r += stepR;
                if (cur_color.r > finalColor.r || stepR === 0)
                    cur_color.r = finalColor.r;
            }

            if (cur_color.g > finalColor.g) {
                cur_color.g -= stepG;
                if (cur_color.g < finalColor.g || stepG === 0)
                    cur_color.g = finalColor.g;
            }
            else if (cur_color.g < finalColor.g) {
                cur_color.g += stepG;
                if (cur_color.g > finalColor.g || stepG === 0)
                    cur_color.g = finalColor.g;
            }

            if (cur_color.b > finalColor.b) {
                cur_color.b -= stepB;
                if (cur_color.b < finalColor.b || stepB === 0)
                    cur_color.b = finalColor.b;
            }
            else if (cur_color.b < finalColor.b) {
                cur_color.b += stepB;
                if (cur_color.b > finalColor.b || stepB === 0)
                    cur_color.b = finalColor.b;
            }

            album.setColor(cur_color);
            album.fill(coord.x, coord.y);

            if (cur_color.r != finalColor.r || cur_color.g != finalColor.g || cur_color.b != finalColor.b)
                setTimeout(tick, 10);
            else album.saveAction();
        }
    }

    showProgress(percent) {

        let progress = document.getElementById('progress');
        progress.classList.add('progress');
        if (percent) {
            progress.textContent = percent + '%';
        }
        progress.style.width = percent + '%';
        if (percent === 100) {
            setTimeout(function () {
                progress.classList.add('loaded_hiding');
                progress.classList.remove('progress');
                progress.style.width = 0;
                progress.textContent = '';
            }, 1000);
        }
    }

    showColorSet() {
        const colorsDiv = document.getElementById('colors1');
        colors.forEach(group => {
            let newGroupDiv = colorsDiv.appendChild(document.createElement('div'));
            newGroupDiv.classList.add("color-set");
            group.forEach(el => {
                let newDiv = newGroupDiv.appendChild(document.createElement('div'));
                newDiv.classList.add("color-format");
                newDiv.style.setProperty('background-color', el);
                if (!this.currentColorDiv) {
                    this.currentColorDiv = newDiv;
                    this.currentColorDiv.classList.add('active');
                    this.album.setColor(RGB.rgbToObj(el));
                }
            });
        });
    }

    changeColor(target) {
        if (this.currentColorDiv)
            this.currentColorDiv.classList.remove('active');

        this.currentColorDiv = target;
        this.currentColorDiv.classList.add('active');
        this.album.setColor(RGB.rgbToObj(this.currentColorDiv.style.backgroundColor));
    }
}