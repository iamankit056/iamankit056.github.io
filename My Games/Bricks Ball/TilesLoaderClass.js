class TilesLoader 
{
    #_ball;
    #_scoreBoard;
    #_myCtx;
    #_tile;
    #_margin;

    constructor(myCtx, ball, scoreBoard=0) 
    {
        this.#_ball = ball;
        this.#_myCtx = myCtx;
        this.#_scoreBoard = scoreBoard;

        this.#_tile = 
        {
            'width': 30,
            'height': 5,
            'spacing': {
                'inX': 15,
                'inY': 10
            },
            'number': {
                'inX': 0,
                'inY': 20
            }
        };

        this.#_margin = {
            'left': 15,
            'top': 15
        }

        this.tiles = {
            'sprite': [],
            'noOfHitToDestory': []
        };
    }

    Update() {
        this.#Logic();
        this.tiles.sprite.forEach((tile)=>{
            tile.Draw(this.#_myCtx);
        })
    }

    #LoadTiles() {
        this.#_tile.number.inX = Math.floor((window.innerWidth-2*this.#_margin.left-this.#_tile.spacing.inX)/(this.#_tile.width+this.#_tile.spacing.inX))+1;
        for(let i=0; i<this.#_tile.number.inY; i++) 
        {
            let tilesSolidness, tilesColor;

            if(this.#_scoreBoard.level < 5) {
                tilesColor = '#636364';
                tilesSolidness = 0;
            }
            else if(this.#_scoreBoard.level < 10) {
                tilesColor = '#ff0';
                tilesSolidness = 5;
            } 
            else {
                tilesColor = '#f0f';
                tilesSolidness = 10;
            }

            for(let j=0; j<this.#_tile.number.inX; j++) {

                this.tiles.noOfHitToDestory.push(tilesSolidness);

                this.tiles.sprite.push(
                    new Rectangle(
                        this.#_margin.left + j*(this.#_tile.width+this.#_tile.spacing.inX),
                        this.#_margin.top + i*(this.#_tile.height+this.#_tile.spacing.inY),
                        this.#_tile.width, this.#_tile.height, tilesColor
                    )
                );
            }
        }
    }

    #Logic() {
        if(this.tiles.sprite.length <= 0) {
            this.#LoadTiles();
            this.#_scoreBoard.level += 1;

        }
        
        this.tiles.sprite.forEach((tile, i)=>{
            if(tile.CircleCollision(this.#_ball.sprite)) {
                if(this.tiles.noOfHitToDestory[i] < 1) {
                    this.tiles.sprite.splice(i, 1);
                }
                else {
                    this.tiles.noOfHitToDestory[i] -= 1;
                }

                this.#_scoreBoard.score += 1;
                this.#_ball.speed.y = -this.#_ball.speed.y;
            }
        })
    }
}