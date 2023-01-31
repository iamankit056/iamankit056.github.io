class Player {

    #_myCtx;
    #_jumpForce;
    #_playerInput;

    constructor(myCtx) {        
        this.sprite = new Circle(
            window.innerWidth * 0.35,
            window.innerHeight * 0.3,
            15, '#00f'
        );        

        this.speed = {
            'x': 2,
            'y': 2
        };
        
        this.isAlive = true;
        this.#_jumpForce = 20;
        this.#_myCtx = myCtx;
        this.#_playerInput = new PlayerInput();
    }

    Update() {
        this.#Input();
        this.#Move();
        this.sprite.Draw(this.#_myCtx);
    }

    #Move() {
        this.sprite.y = Utils.Clamp(
            this.sprite.y + this.speed.y,
            this.sprite.radius, window.innerHeight-this.sprite.radius
        );
    }

    #Input() {
        if(this.#_playerInput.jump) {
            this.sprite.y = Utils.Clamp(
                this.sprite.y - Utils.Lerp(0, this.speed.y * this.#_jumpForce, 0.2),
                this.sprite.radius, window.innerHeight-this.sprite.radius
            );
        }
    }
}