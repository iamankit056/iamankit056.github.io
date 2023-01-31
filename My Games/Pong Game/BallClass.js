class Ball {
    #_myCtx;
    #_paddle1;
    #_paddle2;
    #_scoreBoard;

    constructor(myCtx, paddle1, paddle2, scoreBoard) {
        this.#_myCtx = myCtx;
        this.#_paddle1 = paddle1;
        this.#_paddle2 = paddle2;
        this.#_scoreBoard = scoreBoard;

        this.sprite = new Circle(window.innerWidth/2, window.innerHeight/2, 5, '#f00');

        this.speed = {
            'x': -5,
            'y': 5
        };
    }

    Update() {
        this.#Logic();
        this.#Draw();
    }

    #Logic() {
        this.#Move();

        if(this.sprite.x-this.sprite.radius < 1 || this.sprite.RectCollision(this.#_paddle1.sprite) || this.sprite.RectCollision(this.#_paddle2.sprite)) {
            this.speed.x = -this.speed.x;
        }
        if(this.sprite.y-this.sprite.radius < 1 || this.sprite.y+this.sprite.radius >= window.innerHeight) {
            this.speed.y = -this.speed.y;
        }

        if(this.sprite.x-this.sprite.radius < 1 || this.sprite.x+this.sprite.radius >= window.innerWidth) {
            this.#_scoreBoard.gameOver = true;
            this.#_scoreBoard.winner = (this.sprite.x < window.innerWidth/2) ? 'Player 1' : 'Player 2';
            return;
        }
    }

    #Move() {
        this.sprite.x = Utils.Clamp(this.sprite.x+this.speed.x, this.sprite.radius, window.innerWidth-this.sprite.radius);
        this.sprite.y = Utils.Clamp(this.sprite.y+this.speed.y, this.sprite.radius, window.innerHeight-this.sprite.radius);
    }

    #Draw() {
        this.sprite.Draw(this.#_myCtx);
    }
}