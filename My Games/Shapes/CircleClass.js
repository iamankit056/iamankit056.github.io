class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    Draw(myCtx) {
        myCtx.beginPath();
        myCtx.fillStyle = this.color;
        myCtx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        myCtx.fill();
        myCtx.closePath();
    }

    CircleCollision(circle) {
        if(this.x+this.radius >= circle.x-circle.radius && this.x-this.radius <= circle.x+circle.radius &&
            this.y+this.radius >= circle.y-circle.radius && this.y-this.radius <= circle.y+circle.radius) {
                return true;
        }

        return false;
    }

    RectCollision(rect) {
        if(this.x+this.radius >= rect.x && this.x-this.radius <= rect.x+rect.width &&
            this.y+this.radius >= rect.y && this.y-this.radius <= rect.y+rect.height) {
                return true;
        }

        return false;
    }
}