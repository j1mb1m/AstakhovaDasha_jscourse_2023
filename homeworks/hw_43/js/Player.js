import { DIRECTION } from "./enums/direction.js";

export class Player {

    //default settings
    #score = 0;

    constructor(field) {
        this.field = field;
        this.width = 20;
        this.height = 150;
        this.reset();
    }
    reset() {
        this.moveDirection = DIRECTION.IDLE;
        this.playerSpeed = 2;
        this.x = 0;
        this.y = 0;
        this.#score = 0;
    }

    isHit(ball) {
        return ball.x + ball.r > this.x && ball.x - ball.r < this.x + this.width && ball.y - ball.r < this.y + this.height && ball.y + ball.r > this.y;
    }

    move() {
        //down
        if (this.moveDirection === DIRECTION.DOWN) {
            this.y += this.playerSpeed;
            if (this.y + this.height > this.field.height) {
                this.y = this.field.height - this.height;
            }
        }
        //up
        if (this.moveDirection === DIRECTION.UP) {
            this.y -= this.playerSpeed;
            if (this.y < 0) {
                this.y = 0;
            }
        }
    }

    hitBall(ball, direction) {
        let angle = (ball.y - (this.y + this.height / 2)) / (this.height / 2) * Math.PI / 4;

        ball.velocityX = direction * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sign(angle);
        ball.reduceSpeed();
    }

    increaseScore() {
        this.#score += 1;
    }


    getScore() {
        return this.#score;
    }

}