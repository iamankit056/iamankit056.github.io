class Ball {
    #_myCtx;
    #_paddle;
    #_scoreBoard;

    constructor(myCtx, paddle, scoreBoard) {
        this.#_myCtx = myCtx;
        this.#_paddle = paddle;
        this.#_scoreBoard = scoreBoard;

        this.speed = {
            'x': 0,
            'y': 0
        };

        this.gameOver = false;
        this.sprite = new Circle(window.innerWidth/2, window.innerHeight-10, 5, '#f00');
    }

    Update() {
        this.#Logic();
        this.sprite.Draw(this.#_myCtx);
    }

    #Logic() {

        this.#Move();

        if(this.sprite.y+this.sprite.radius >= window.innerHeight) {
            this.#_scoreBoard.lifeLine -= 1;
            this.speed.x = 0;
            this.speed.y = 0;
            this.sprite.x = window.innerWidth/2;
            this.sprite.y = window.innerHeight-10;
            this.#_paddle.sprite.x = window.innerWidth/2 - this.#_paddle.sprite.width/2;
            this.#_paddle.sprite.y = window.innerHeight - this.#_paddle.sprite.height;
        }

        if(this.sprite.x-this.sprite.radius < 1 || this.sprite.x+this.sprite.radius >= window.innerWidth) {
            this.speed.x = -this.speed.x;
        }
        if(this.sprite.y-this.sprite.radius < 1 || this.sprite.RectCollision(this.#_paddle.sprite)) {
            this.speed.y = -this.speed.y;
        }
    }

    #Move() {
        if(this.speed.x==0 && this.speed.y==0 && this.#_paddle.speed) {
            if(this.#_paddle.playerInput.key.left || this.#_paddle.playerInput.key.right) {
                this.speed.x = 5;
                this.speed.y = 5;
            }
            return;
        }

        this.sprite.x = Utils.Clamp(this.sprite.x+this.speed.x, 5, window.innerWidth-this.sprite.radius);
        this.sprite.y = Utils.Clamp(this.sprite.y+this.speed.y, 5, window.innerHeight-this.sprite.radius);
    }
}