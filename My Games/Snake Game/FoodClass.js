class Food {
    #_myCtx;

    constructor(myCtx) {
        this.#_myCtx = myCtx;

        this.width = 10;
        this.height = 10;

        this.sprite = new Rectangle(
            Utils.Random(1, window.innerWidth-this.width),
            Utils.Random(1, window.innerHeight-this.height),
            this.width, this.height, '#ff0'
        );
        
    }

    Update() {
        this.sprite.Draw(this.#_myCtx);
    }

    Drop() {
        this.sprite.x = Utils.Random(1, window.innerWidth-this.width);
        this.sprite.y = Utils.Random(1, window.innerHeight-this.height);
    }
}