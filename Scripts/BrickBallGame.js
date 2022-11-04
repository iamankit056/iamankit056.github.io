class Tile
{
    constructor(x=0, y=0, width=0, height=0)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    Draw(ctx=new CanvasRenderingContext2D, color='rgb(255, 0, 0)')
    {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
}

class TilesManager
{
    constructor(SCR_WIDTH=0, SCR_HEIGHT=0)
    {
        this.Tiles = [];
        this.margin = 20;
        this.tilesHeight = 30;
        this.tilesColor = 'rgb(255, 0, 0)';
        
        // Adjust number of tiles
        if(SCR_WIDTH > SCR_HEIGHT)
        {
            this.numberOfTiles = 10;
            this.tilesWidth = SCR_WIDTH/(this.numberOfTiles + this.margin);
            for(let i=0; i < this.numberOfTiles; i++) 
            {
                const x = this.margin + this.tilesWidth * i;
                const y = this.margin + this.tilesHeight * i;
                const tile = new Tile(x, y, this.tilesWidth, this.tilesHeight);
            }
        }
        else 
        {
            this.numberOfTiles = 5;
            this.tilesWidth = SCR_WIDTH/(this.numberOfTiles + this.margin);
        }
    }

    Draw(ctx)
    {
        this.Tiles.forEach((tile)=>{
            tile.Draw(ctx, this.tilesColor);
        })
    }
}

class Ball {
    constructor(x=0, y=0, radius=0, color='red')
    {
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = -1;
        this.radius = radius;
        this.color = color;
    }

    Draw(ctx=new CanvasRenderingContext2D())
    {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    DetectCollision(tile)
    {
        if(this.x-this.radius < tile.x+tile.width && this.x+this.radius > tile.x &&
            this.y-this.radius < tile.y+tile.height && this.y+this.radius > tile.y) {
                return true;
        }
        
        return false;
    }
}

const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');

Gameplay();

function Gameplay()
{
    // Hide play button when user click it.
    playBtn.style.display = 'none';

    // Set canvas resulation according to portrait or landscape mode.
    if(screen.width > screen.height) {
        ctx.canvas.width  = 1920;
        ctx.canvas.height = 1080;
    } else {
        ctx.canvas.width  = 1080;
        ctx.canvas.height = 1920;
    }
    
    // Define all variables, constant and object.
    const FRAME_RATE = 41.6667; 
    const SCR_WIDTH  = ctx.canvas.width;
    const SCR_HEIGHT = ctx.canvas.height;

    const lifeLineBoard = 
        new UI(SCR_WIDTH * 0.05, 100, 'Life Line : ', 'white', '50px Arial', 'left');
    const scoreBoard = 
        new UI(SCR_WIDTH * 0.05, 180, 'Score : ', 'white', '50px Arial', 'left');
    const gameOverMessage = 
        new UI(ctx.canvas.width/2, ctx.canvas.height * 0.4, 'Game Over', 'red', 'bold 150px cursive', 'center');
    const gameRestartMessage = 
        new UI(ctx.canvas.width/2, ctx.canvas.height * 0.7, 'Press Play to Restart Game', 'white', 'bold 50px cursive', 'center');
    
    const ball = new Ball(SCR_WIDTH/2, SCR_HEIGHT - 50, 20, 'rgb(255, 0, 0)');
    const playerPaddel = new Tile(SCR_WIDTH/2 - 80, SCR_HEIGHT-30, 160, 30);

    let score = 0;
    let lifeLine = 3;
    const ballSpeed = 20;
    const playerSpeed = 20;

    const playerInput = new Input();

    // start listening player input.
    playerInput.StartListener();


    // Game Loop.
    const gameInterval = setInterval(function() 
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
        
        // Render objects.
        ball.Draw(ctx);
        playerPaddel.Draw(ctx, 'rgb(0, 0, 255');
        lifeLineBoard.Draw(ctx, lifeLine);
        scoreBoard.Draw(ctx, score);

        // Game Logic
        playerPaddel.x += playerInput.Horizontal * playerSpeed;
        // bound blayer movement.
        if(playerPaddel.x < 1) {
            playerPaddel.x = 1;
        }
        if(playerPaddel.x+playerPaddel.width > SCR_WIDTH) {
            playerPaddel.x = SCR_WIDTH-playerPaddel.width;
        }

        // ball movement
        ball.x += ball.dx * ballSpeed;
        ball.y += ball.dy * ballSpeed;
        // change ball movement direction
        if(ball.x-ball.radius < 1 || ball.x+ball.radius > SCR_WIDTH) {
            ball.dx = -ball.dx;
        }
        if(ball.y-ball.radius < 1 || ball.y+ball.radius > SCR_HEIGHT) {
            ball.dy = -ball.dy;
        }


    }, FRAME_RATE);
}