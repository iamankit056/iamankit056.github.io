class Object 
{
    constructor(texture=new Image(), x=0, y=0, width=0, height=0)
    {
        this.texture = texture;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    Draw(ctx=new CanvasRenderingContext2D())
    {
        ctx.beginPath();
        ctx.drawImage(this.texture, this.x, this.y, this.width, this.height);
        ctx.closePath();
    }

    Collider(collide)
    {
        if(this.x < collide.x+collide.width && this.x+this.width > collide.x &&
            this.y < collide.y+collide.height && this.y+this.height > collide.y) {
                return true;
        }

        return false;
    }
}

const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');

const townBackgroundTexture = document.querySelector("#TownBackground");
const balloonTexture = document.querySelector("#Balloon");
const boomTexture = document.querySelector("#Boom");
const coinTexture = document.querySelector("#Coin");

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
        new UI(SCR_WIDTH * 0.05, 100, 'Life Line : ', 'white', '40px Arial', 'left');
    const scoreBoard = 
        new UI(SCR_WIDTH * 0.05, 160, 'Score : ', 'white', '40px Arial', 'left');
    const gameOverMessage = 
        new UI(ctx.canvas.width/2, ctx.canvas.height * 0.4, 'Game Over', 'red', 'bold 150px cursive', 'center');
    const gameRestartMessage = 
        new UI(ctx.canvas.width/2, ctx.canvas.height * 0.7, 'Press Play to Restart Game', 'white', '40px cursive', 'center');
    const TILE_SIZE = 20;

    const balloon = new Object();

    // Game Loop.
    const gameInterval = setInterval(function() 
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
        
        // Render objects.

        // Game Logic


    }, FRAME_RATE);
}