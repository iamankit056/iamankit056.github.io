class GemsLoader {
    #_myCtx;
    #_player;
    #_scoreBoard;
    #gems;
    #_spawnTime;
    #_spawnInterval;

    #MINSPAWNTIME;
    #MAXSPAWNTIME;

    constructor(myCtx, player, scoreBoard) {
        this.#_myCtx = myCtx;
        this.#_player = player;
        this.#_scoreBoard = scoreBoard;
        this.#gems = [];

        this.#MINSPAWNTIME = 2;
        this.#MAXSPAWNTIME = 5;

        this.#_spawnTime = 0;
        this.#_spawnInterval = 0;
    }

    Update() {
        this.#Logic();
        this.#Draw();
    }

    #Draw() {
        this.#gems.forEach((platform)=>{
            platform.Draw(this.#_myCtx);
        });
    }

    #Logic() {
        for(let i=0; i < this.#gems.length; i++) 
        {
            this.#Move(this.#gems[i]);

            if(this.#gems[i].RectCollision(this.#_player.sprite)) {
                this.#_scoreBoard.score += 1;
                this.#gems.splice(i, 1);
                break;
            }

            if(this.#gems[i].y > window.innerHeight) {
                this.#gems.splice(i, 1);
            }
        }

        if(this.#Spawn()) {
            this.#gems.push(
                new Circle(
                    Utils.Random(0, window.innerWidth), 
                    -50, 8, '#ff5500'
                )
            );
        }
    }

    #Move(gem) {
        gem.y += this.#_player.speed.y;
    }

    #Spawn() {
        if(this.#_spawnInterval >= this.#_spawnTime) {
            this.#_spawnTime = Utils.Random(this.#MINSPAWNTIME, this.#MAXSPAWNTIME);
            this.#_spawnInterval = 0;
            return true;
        }

        this.#_spawnInterval += 0.1;
        return false;
    }
}
