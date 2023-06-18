export class AlbumSound {

    playFoneMusic = false;

    constructor() {
        this.fone = new Audio('./sounds/fone.mp3');
        this.fone.currentTime = 0; // в секундах    
        this.fone.loop = true;
        this.fone.volume = 0.2;
        this.buttonClick = new Audio('./sounds/click1.mp3');
        this.buttonClick.volume = 0.4;
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
        if (this.playFoneMusic) return;
        this.fone.play();
        this.playFoneMusic = true;
    }
    stop() {
        if (!this.playFoneMusic) return;
        this.fone.pause();
        this.playFoneMusic = false;
    }
}