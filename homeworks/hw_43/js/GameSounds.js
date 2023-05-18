export class GameSounds {

    constructor() {
        this.hitAudio = new Audio('./sounds/hit.wav');
        this.failAudio = new Audio('./sounds/fail.wav');
    }

    start() {
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