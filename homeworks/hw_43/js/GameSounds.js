export class GameSounds {

    constructor() {
        this.hitAudio = new Audio('http://cd.textfiles.com/midiwavworkshop/WAV/SERVE.WAV');
        this.failAudio = new Audio('http://www.chiptape.com/chiptape/sounds/medium/countdown.wav');
    }

    start() {
/*         this.hitAudio.play().then(() => { this.hitAudio.pause() });
        this.failAudio.play().then(() => { this.failAudio.pause() }); */
        this.hitAudio.pause();
        this.failAudio.pause();
    }

    soundHit() {
        this.hitAudio.currentTime = 0; // в секундах
        this.hitAudio.play();
    }

    soundFail() {
        this.failAudio.currentTime = 0; // в секундах
        this.failAudio.play();
    }
}