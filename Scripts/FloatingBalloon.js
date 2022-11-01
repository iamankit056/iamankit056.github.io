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

    Collider(x=0, y=0, width=0, height=0)
    {
        if(this.x < x+width && this.x+this.width > x &&
            this.y < y+height && this.y+this.height > y) {
                return true;
        }

        return false;
    }
}

const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');

// Textures
const townBackgroundTexture = document.querySelector("#TownBackground");
const balloonTexture = document.querySelector("#Balloon");
const boomTexture = document.querySelector("#Boom");
const coinTexture = document.querySelector("#Coin");

// sound Effects
const boomSoundEffect = document.querySelector('#BoomSoundEffect');
const boingSoundEffect = document.querySelector('#BoingSoundEffect');
const backgroundSoundEffect = document.querySelector('#BackgroundSoundEffect');

let hasGameStart = false;

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

    const scoreBoard = 
        new UI(SCR_WIDTH * 0.05, 120, 'Score : ', 'white', '50px Arial', 'left');
    const gameOverMessage = 
        new UI(ctx.canvas.width/2, ctx.canvas.height * 0.4, 'Game Over', 'red', 'bold 150px cursive', 'center');
    const gameRestartMessage = 
        new UI(ctx.canvas.width/2, ctx.canvas.height * 0.7, 'Press Play to Restart Game', 'rgb(80, 80, 80)', 'bold 50px cursive', 'center');

    const townBackground = 
        new Object(townBackgroundTexture, 0, 0, SCR_WIDTH * (SCR_WIDTH > SCR_HEIGHT ? 2 : 4), SCR_HEIGHT);
    const balloon = 
        new Object(balloonTexture, SCR_WIDTH*0.25, SCR_HEIGHT*0.3, 80, 240);
    const playerInput = new Input();

    const booms = [];
    const coins = [];
    const jumpForce = 50.0;
    const gravity = 10.0;
    const spawnDelay = 200;
    const coinsSpeed = 25;
    const boomsSpeed = 20;
    const backgroundSpeed = 15;
    let score = 0;

    // Start listening player inputs.
    playerInput.StartListener();
    // True hasGameStart variable to start game.
    hasGameStart = true;
    // Start background music.
    backgroundSoundEffect.play();
    // Start spawning coins and booms.
    SpawnRandomCoinsAndBooms(coins, booms, spawnDelay, SCR_WIDTH, SCR_HEIGHT);

    // Game Loop.
    const gameInterval = setInterval(function() 
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
        
        // Render objects.
        townBackground.Draw(ctx);
        balloon.Draw(ctx);
        for(let i=0; i<coins.length; i++) {
            coins[i].Draw(ctx);
        }
        for(let i=0; i<booms.length; i++) {
            booms[i].Draw(ctx);
        }
        scoreBoard.Draw(ctx, score);

        // Game Logic
        townBackground.x -= backgroundSpeed;
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
        
        // coins logic.
        for(let i=0; i<coins.length; i++) 
        {
            let DestroyCoin = false;   

            // move left.
            coins[i].x -= coinsSpeed;
            // Destory out of bound
            if(coins[i].x + coins[i].width < 0) {
                DestroyCoin = true;
            }

            // If player collide with the coins then increase the score.
            if(coins[i].Collider(balloon.x, balloon.y, balloon.width, balloon.height/2)) {
                score += 5;
                DestroyCoin = true;
                boingSoundEffect.play();
            }

            // If Destroy coin is true then Destroy the coin.
            if(DestroyCoin) {
                coins.splice(i, 1);
            }
        }

        // booms logic.
        for(let i=0; i<booms.length; i++) 
        {
            let DestroyBoom = false;

            // move letf.
            booms[i].x -= boomsSpeed;
            // Destory out of bound
            if(booms[i].x + booms[i].width < 0) {
                DestoryBoom = true;
            }

            // If player collide with boom destory the player and stop the game.
            if(booms[i].Collider(balloon.x, balloon.y, balloon.width, balloon.height/2)) {
                DestoryBoom = true;
                hasGameStart = false;
                gameOverMessage.Draw(ctx);
                gameRestartMessage.Draw(ctx);
                backgroundSoundEffect.pause();
                boomSoundEffect.play();
                playBtn.style.display = 'inline';
                clearInterval(gameInterval);
            }

            // If Destroy coin is true then Destroy the coin.
            if(DestroyBoom) {
                booms.splice(i, 1);
            }
        }
        
    }, FRAME_RATE);
}

function SpawnRandomCoinsAndBooms(coins=[], booms=[], spawnDelay=0, SCR_WIDTH=0, SCR_HEIGHT=0)
{
    setTimeout(function()
    {
        // Chance of spawn Coin.
        const chanceToSpawnObjectIsCoin = 40;

        // Calculate spawn probabilty.
        const calculateSpawnChance = Math.floor(Math.random() * 100); 

        // Random y spawning position.
        const y = Math.random() * (SCR_HEIGHT-120);
        
        // If calculated range is under chanceToSpawnCoin range than spawn coin other wise spawn boom.
        if(calculateSpawnChance <= chanceToSpawnObjectIsCoin) {
            const coin = new Object(coinTexture, SCR_WIDTH, y, 80, 80);
            coins.push(coin);
        } else {
            const boom = new Object(boomTexture, SCR_WIDTH, y, 100, 100);
            booms.push(boom);
        }

        const minSpawnRate = 1000;
        const maxSpawnRate = 2000;
        const coinsOrBoomsSpawnRate = Math.random() * (maxSpawnRate - minSpawnRate) + minSpawnRate;
        
        if(hasGameStart) {
            SpawnRandomCoinsAndBooms(coins, booms, coinsOrBoomsSpawnRate, SCR_WIDTH, SCR_HEIGHT);
        }

    }, spawnDelay);
}
