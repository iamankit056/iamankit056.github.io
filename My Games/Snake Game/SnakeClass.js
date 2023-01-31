class Snake {
    #_myCtx;
    #_food;
    #_playerInput;
    #_direction;
    #_tail;
    #_timeToMove;
    #_moveTime;

    constructor(myCtx, food) {
        this.#_myCtx = myCtx;
        this.#_food = food;

        this.body = [
            new Rectangle(
                window.innerWidth/2 - 5,
                window.innerHeight/2 - 5,
                10, 10, '#f00'
            )
        ];
        this.#_tail = new Rectangle(
            window.innerWidth/2 - 5,
            window.innerHeight/2 - 5,
            10, 10, '#fff'
        );

        this.speed = 5;
        this.isAlive = true;
        this.#_moveTime = 0;
        this.#_timeToMove = 1/this.speed;
        this.#_direction = {'x': 0, 'y': 0};
        this.#_playerInput = new PlayerInput();
    }

    Update() {
        this.#Input();
        this.#Logic();
        this.#Draw();
    }

    #Draw() {
        for(let i=0; i<this.body.length; i++) {
            this.body[i].Draw(this.#_myCtx);
        }
    }

    #Input() {
        if((this.#_playerInput.key.left || this.#_playerInput.key.right) && this.#_direction.x == 0) {
            this.#_direction.x = this.#_playerInput.axis.x;
            this.#_direction.y = 0;
        }
        if((this.#_playerInput.key.up || this.#_playerInput.key.down) && this.#_direction.y == 0) {
            this.#_direction.x = 0;
            this.#_direction.y = this.#_playerInput.axis.y;
        }
    }

    #Logic() {
        if(this.#NowMove()) {
            this.#Move();
        }
        this.#Collision();
    }

    #NowMove() {
        if(this.#_moveTime >= this.#_timeToMove) {
            this.#_timeToMove = 1 / this.speed;
            this.#_moveTime = 0;
            return true;
        }

        this.#_moveTime += 0.1;
        return false;
    }

    #Move() {
        this.#_tail.x = this.body[this.body.length-1].x;
        this.#_tail.y = this.body[this.body.length-1].y;

        for(let i=this.body.length-1; i>0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }

        this.body[0].x = Utils.Lerp(
            this.body[0].x,
            this.body[0].x+this.body[0].width,
            this.#_direction.x
        );
        this.body[0].y = Utils.Lerp(
            this.body[0].y,
            this.body[0].y+this.body[0].height,
            this.#_direction.y
        );
    }

    #Collision() {
        if(this.body[0].RectCollision(this.#_food.sprite)) {
            this.#_food.Drop();
            this.body.push(
                new Rectangle(
                    this.#_tail.x, this.#_tail.y, 
                    this.#_tail.width, this.#_tail.height, 
                    this.#_tail.color
                )
            );
        }

        if(this.body[0].x < 1 || this.body[0].x+this.body[0].width >= window.innerWidth ||
            this.body[0].y < 1 || this.body[0].y+this.body[0].height >= window.innerHeight) {
                this.isAlive = false;
        }

        for(let i=1; i<this.body.length; i++) {
            if(this.body[0].x+this.width > this.body[i].x && this.x < this.body[i].x+this.body[i].width &&
                this.body.y+this.height > this.body[i].y && this.body.y < this.body[i].y+this.body[i].height) {
                    this.isAlive = false;
            }
        }
    }
}
