class ObstaclesLoader {
    #_myCtx;
    #_player;
    #_obstacles;
    #_spawnTime;
    #_spawnInterval;

    #MINWIDTH;
    #MAXWIDTH;
    #MINHEIGHT;
    #MAXHEIGHT;
    #MINSPAWNTIME;
    #MAXSPAWNTIME;

    constructor(myCtx, player) {
        this.#_myCtx = myCtx;
        this.#_player = player;
        this.#_obstacles = [];

        this.#MINWIDTH = 10;
        this.#MAXWIDTH = 50;
        this.#MINHEIGHT = 50;
        this.#MAXHEIGHT = 10;
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
        this.#_obstacles.forEach((obstacle)=>{
            obstacle.Draw(this.#_myCtx);
        })
    }

    #Logic() {
        for(let i=0; i < this.#_obstacles.length; i++) 
        {
            this.#Move(this.#_obstacles[i]);

            if(this.#_obstacles[i].CircleCollision(this.#_player.sprite)) {
                this.#_player.isAlive = false;
            }

            if(this.#_obstacles[i].x < -this.#MAXWIDTH) {
                this.#_obstacles.splice(i, 1);
            }
        }

        if(this.#Spawn()) {
            this.#_obstacles.push(
                new Rectangle(
                    window.innerWidth,
                    Utils.Random(0, window.innerHeight),
                    Utils.Random(this.#MINWIDTH, this.#MAXWIDTH),
                    Utils.Random(this.#MINHEIGHT, this.#MAXHEIGHT),
                    `rgb(${Math.floor(Utils.Random(0, 255))}, ${Math.floor(Utils.Random(0, 255))}, ${Math.floor(Utils.Random(0, 255))})`
                )
            );
        }
    }

    #Move(obstacle) {
            obstacle.x -= this.#_player.speed.x;
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
