class Paddle {
    #_myCtx;
    #_autoPilate;
    #_playerInput;

    constructor(myCtx, x, y, width, height, autoPilate=false) {
        this.#_myCtx = myCtx;
        this.#_autoPilate = autoPilate;
        this.sprite = new Rectangle(x, y, width, height, '#00f');

        this.speed = {
            'x': 0,
            'y': 10    
        };

        if(!autoPilate)
            this.#_playerInput = new PlayerInput();
        else
            this.ball;

    }

    Update() {
        if(this.#_autoPilate) 
            this.#AutoPilate();
        else 
            this.#Input();

        this.#Logic();
        this.#Draw();
    }

    #Input() {
        if(this.#_playerInput.key.up || this.#_playerInput.key.down) {
            this.#MoveY(this.speed.y * this.#_playerInput.axis.y);
        }
    }

    #Logic() {

    }

    #MoveY(yVelocity=0) {
        this.sprite.y = Utils.Clamp(this.sprite.y+yVelocity, 0, window.innerHeight-this.sprite.height);
    }

    #AutoPilate() {
        if(this.sprite.y > this.ball.sprite.y) {
            this.#MoveY(this.speed.y * -1);
        }
        else if(this.sprite.y+this.sprite.height < this.ball.sprite.y) {
            this.#MoveY(this.speed.y * 1);
        }
    }

    #Draw() {
        this.sprite.Draw(this.#_myCtx);
    }
}