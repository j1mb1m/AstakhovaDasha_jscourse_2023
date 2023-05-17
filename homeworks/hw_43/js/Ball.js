export class Ball {

    constructor(field) {

        this.r = 20;
        this.field = field;
        this.reset();
    }

    resetPosition() {
        this.x = this.field.width / 2;
        this.y = this.field.height / 2;
    }

    reset() {
        this.velocityX = 2;
        this.velocityY = Math.floor(Math.random() * 6) - 3;
        this.speed = 3;

        this.acceleration = 0.1;
        this.resetPosition();
    }

    isBallOutside() {
        let isOutside = false;

        // вылетел ли мяч правее стены?
        if (this.x + this.r > this.field.width) {
            this.velocityX = -this.velocityX;
            this.x = this.field.width - this.r;
            isOutside = true;
        }
        // вылетел ли мяч левее стены?
        if (this.x - this.r < 0) {
            this.velocityX = -this.velocityX;
            this.x = this.r;
            isOutside = true;
        }
        //если вылетел снизу - меняем направление
        if (this.y + this.r > this.field.height) {
            this.velocityY = -this.velocityY;
            this.y = this.field.height - this.r;
        }
        //если вылетел сверху - меняем направление
        if (this.y - this.r < 0) {
            this.velocityY = -this.velocityY;
            this.y = this.r;
        }

        return isOutside;
    }

    reduceSpeed() {
        this.speed += this.acceleration;
    }

    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }
}