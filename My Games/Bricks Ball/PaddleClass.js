class Paddle {
    #_myCtx;

    constructor(myCtx) {
        this.#_myCtx = myCtx;

        this.speed = {
            'x': 10,
            'y': 0
        };

        this.sprite = new Rectangle(window.innerWidth/2 - 20, window.innerHeight-5, 40, 5, '#0f0');

        this.playerInput = new PlayerInput();
    }

    Update() {
        this.#Input();
        this.sprite.Draw(this.#_myCtx);
    }

    #Input() {
        if(this.playerInput.key.left || this.playerInput.key.right) {
            this.#MoveX(this.playerInput.axis.x);
        }
    }

    #MoveX(directionX=0) {
        this.sprite.x = Utils.Clamp(this.sprite.x+(directionX*this.speed.x), 0, window.innerWidth-this.sprite.width);
    }
}