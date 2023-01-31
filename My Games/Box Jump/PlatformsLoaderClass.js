class PlatformLoader {
    #_myCtx;
    #_player;
    #_scoreBoard;
    #_platforms;
    #_spawnTime;
    #_spawnInterval;

    #MINSPAWNTIME;
    #MAXSPAWNTIME;

    constructor(myCtx, player, scoreBoard) {
        this.#_myCtx = myCtx;
        this.#_player = player;
        this.#_scoreBoard = scoreBoard;
        this.#_platforms = [];

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
        this.#_platforms.forEach((platform)=>{
            platform.Draw(this.#_myCtx);
        });
    }

    #Logic() {
        for(let i=0; i < this.#_platforms.length; i++) 
        {
            this.#Move(this.#_platforms[i]);

            if(this.#_platforms[i].RectCollision(this.#_player.sprite)) {
                this.#_scoreBoard.lifeLine -= 1;
                this.#_platforms.splice(i, 1);
                break;
            }

            if(this.#_platforms[i].y > window.innerHeight) {
                this.#_platforms.splice(i, 1);
            }
        }

        if(this.#Spawn()) {
            this.#_platforms.push(
                new Rectangle(
                    Utils.Random(0, window.innerWidth), -50,
                    40, 5,
                    '#404040'
                )
            );
        }
    }

    #Move(platform) {
        platform.y += this.#_player.speed.y;
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
