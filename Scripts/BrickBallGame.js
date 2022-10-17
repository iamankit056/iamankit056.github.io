class Tiles 
{
    constructor(SCR_WIDTH=0, SCR_HEIGHT=0, TILE_SIZE=0)
    {
        this.tiles = [];
    }
}

const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');

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


    // Game Loop.
    const gameInterval = setInterval(function() 
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
        
        // Render objects.

        // Game Logic


    }, FRAME_RATE);
}