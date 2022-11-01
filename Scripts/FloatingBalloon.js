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

const hasGameStart = false;

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

    const townBackground = 
        new Object(townBackgroundTexture, 0, 0, SCR_WIDTH * (SCR_WIDTH > SCR_HEIGHT ? 2 : 4), SCR_HEIGHT);
    const balloon = 
        new Object(balloonTexture, SCR_WIDTH*0.25, SCR_HEIGHT*0.3, 80, 240);
    const booms = [];
    const coins = [];

    const playerInput = new Input();
    const jumpForce = 50.0;
    const gravity = 10.0;

    playerInput.StartListener();

    SpawnRandomCoinsAndBooms(coins, booms, spawnDelay, SCR_WIDTH, SCR_HEIGHT);

    // Game Loop.
    const gameInterval = setInterval(function() 
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
        
        // Render objects.
        townBackground.Draw(ctx);
        balloon.Draw(ctx);
        coin.Draw(ctx);
        boom.Draw(ctx);

        // Game Logic
        townBackground.x -= 20;
        if(Math.abs(townBackground.x) > townBackground.width/2) {
            townBackground.x = 0;
        }

        // Control balloon flooting.
        if(playerInput.Jump) {
            balloon.y -= jumpForce;
        }
        // Move balloon up and down make illusion of gravity.
        balloon.y += gravity;
        // Bound the balloon that it's not cross the screen.        
        if(balloon.y < 1) {
            balloon.y = 1;
        } else if(balloon.y+balloon.height/2 > SCR_HEIGHT) {
            balloon.y = SCR_HEIGHT - balloon.height/2;
        }


    }, FRAME_RATE);
}

function SpawnRandomCoinsAndBooms(coins=[], booms=[], spawnDelay=0, SCR_WIDTH=0, SCR_HEIGHT=0)
{
    setTimeout(function()
    {
        // Chance of spawn Coin is 30% and Boom is 70%.
        const chanceToSpawnObjectIsCoin = 30;
        // Calculate spawn probabilty.
        const calculateSpawnChance = Math.floor(Math.random() * 100); 
        // If calculated range is under chanceToSpawnCoin range than spawn coin other wise spawn boom.
        if(calculateSpawnChance <= chanceToSpawnObjectIsCoin) {
            const coin = new Object(coinTexture, 500, 500, 80, 80);
            coins.push(coin);
        } else {
            const boom = new Object(boomTexture, 500, 500, 100, 100);
            booms.push(boom);
        }

        const minSpawnRate = 700;
        const maxSpawnRate = 1500;
        const coinsOrBoomsSpawnRate = Math.random() * (maxSpawnRate - minSpawnRate) + minSpawnRate;
        
        if(hasGameStart) {
            SpawnRandomCars(cars, coinsOrBoomsSpawnRate, SCR_WIDTH, SCR_HEIGHT);
        }

    }, spawnDelay);
}
