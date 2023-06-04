export class AlbumView {

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

        let image = new Image();
        image.src = './images/ulitka6.gif';
        const canvasDraw = this.canvasDraw;
        const ctxDraw = this.ctxDraw;
        image.onload = function () {

            let width = canvasDraw.width;
            let height = canvasDraw.height;
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
            ctxDraw.drawImage(image, 0, 0, imgWidth, imgHeight);
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
     /*   this.ctxBackground.lineTo(coord.x, coord.y);
         this.ctxBackground.stroke(); 
        this.album.redraw(coord.x, coord.y, this.ctxBackground.getImageData(0, 0, this.canvasBackground.width, this.canvasBackground.height));*/
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

    downloadCanvasAsImage(){
        let downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'image.png');
        this.canvasDraw.toBlob(function(blob) {
          let url = URL.createObjectURL(blob);
          downloadLink.setAttribute('href', url);
          downloadLink.click();
        });
    }
}