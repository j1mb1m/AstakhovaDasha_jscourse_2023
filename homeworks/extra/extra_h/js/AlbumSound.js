export class AlbumSound{

    constructor() {
        this.fone = new Audio('./sounds/fone.mp3');
        this.fone.loop = true;
        this.buttonClick = new Audio('./sounds/game_click.wav');
    }

    start() {
        this.fone.pause();
        this.buttonClick.pause();
    }

    click() {
        this.buttonClick.currentTime = 0; // в секундах
        this.buttonClick.play();
    }

    play() {
        this.fone.currentTime = 0; // в секундах
        this.fone.play();
    }
    stop() {
        this.fone.pause();
    }
}