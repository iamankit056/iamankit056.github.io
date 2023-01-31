class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    } 

    Draw(myCtx) {
        myCtx.beginPath();
        myCtx.fillStyle = this.color;
        myCtx.fillRect(this.x, this.y, this.width, this.height);
        myCtx.closePath();
    }

    CircleCollision(circle) {
        if(this.x+this.width >= circle.x-circle.radius && this.x <= circle.x+circle.radius &&
            this.y+this.height >= circle.y-circle.radius && this.y <= circle.y+circle.radius) {
                return true;
        }

        return false;
    }

    RectCollision(rect) {
        if(this.x+this.width >= rect.x && this.x <= rect.x+rect.width &&
            this.y+this.height >= rect.y && this.y <= rect.y+rect.height) {
                return true;
        }

        return false;
    }
}
