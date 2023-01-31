class Player {

    #_myCtx;
    #_playerInput;

    constructor(myCtx) {        
        this.sprite = new Rectangle(
            window.innerWidth/2 - 10,
            window.innerHeight/2 - 10,
            20, 20, '#f0f'
        );        

        this.speed = {
            'x': 10,
            'y': 5
        };

        this.#_myCtx = myCtx;
        this.#_playerInput = new PlayerInput();
    }

    Update() {
        this.#Input();
        this.sprite.Draw(this.#_myCtx);
    }

    #MoveX(velocity=0) {
        this.sprite.x = Utils.Clamp(
            this.sprite.x + velocity,
            0, window.innerWidth-this.sprite.width
        );
    }

    #Input() {
        if(this.#_playerInput.key.left || this.#_playerInput.key.right) {
            this.#MoveX(this.#_playerInput.axis.x * this.speed.x)
        }
    }
}