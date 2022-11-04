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
        this.tiles = [];
        this.margin = 20;
        this.tilesHeight = 30;
        this.tilesColor = 'rgb(0, 255, 0)';
        
        // Adjust tiles
        if(SCR_WIDTH > SCR_HEIGHT) 
        {
            this.numberOfTilesIn = {
                'Rows': 10,
                'Columns': 10
            };

            // calculate final screen with after substracting margin.
            const finalWidth = SCR_WIDTH - this.margin*(this.numberOfTilesIn.Rows+1);
            // calculate tiles width. that fits in screen width.
            this.tilesWidth = finalWidth/this.numberOfTilesIn.Rows;       
        }
        else 
        {
            this.numberOfTilesIn = {
                'Rows': 5,
                'Columns': 10
            };

            // calculate final screen with after substracting margin.
            const finalWidth = SCR_WIDTH - this.margin*(this.numberOfTilesIn.Rows+1);
            // calculate tiles width. that fits in screen width.
            this.tilesWidth = finalWidth/this.numberOfTilesIn.Rows; 
        }

        // Generate tiles.
        this.GenerateTiles();
    }

    Draw(ctx)
    {
        this.tiles.forEach((tile)=>{
            tile.Draw(ctx, this.tilesColor);
        })
    }

    GenerateTiles()
    {
        for(let i=0; i<this.numberOfTilesIn.Columns; i++)
        {
            for(let j=0; j<this.numberOfTilesIn.Rows; j++)
            {
                const x = this.margin + (this.margin + this.tilesWidth) * j;
                const y = this.margin + (this.margin + this.tilesHeight) * i;
                const tile = new Tile(x, y, this.tilesWidth, this.tilesHeight);
                this.tiles.push(tile);
            }
        } 
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
const boingSoundEffect = document.querySelector('#BoingSoundEffect');

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
    const tilesManager = new TilesManager(SCR_WIDTH, SCR_HEIGHT);

    let score = 0;
    let lifeLine = 3;
    const ballSpeed = 20;
    const playerSpeed = 30;

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
        tilesManager.Draw(ctx);
        lifeLineBoard.Draw(ctx, lifeLine);
        scoreBoard.Draw(ctx, score);

        // Game Logic
        playerPaddel.x += playerInput.Horizontal * playerSpeed;
        // bound blayer movement.
        let playerPaddelAddWidthOnX = playerPaddel.x + playerPaddel.width;
        if(playerPaddel.x < 1) {
            playerPaddel.x = 1;
        }
        if(playerPaddelAddWidthOnX > SCR_WIDTH) {
            playerPaddel.x = SCR_WIDTH-playerPaddel.width;
        }

        // ball movement
        ball.x += ball.dx * ballSpeed;
        ball.y += ball.dy * ballSpeed;
        // change ball movement direction
        let ballSubRadiusOnX = ball.x - ball.radius;
        let ballAddRadiusOnX = ball.x + ball.radius;
        let ballSubRadiusOnY = ball.y - ball.radius;
        let ballAddRadiusOnY = ball.y + ball.radius;

        if(ballSubRadiusOnX < 1 || ballAddRadiusOnX > SCR_WIDTH) {
            ball.dx = -ball.dx;
            boingSoundEffect.pause();
            boingSoundEffect.play();
        }
        if(ballSubRadiusOnY < 1 || (ballAddRadiusOnY >= playerPaddel.y && ballAddRadiusOnX <= playerPaddelAddWidthOnX && ballSubRadiusOnX > playerPaddel.x)) {
            ball.dy = -ball.dy;
            boingSoundEffect.pause();
            boingSoundEffect.play();
        }
        
        // If ball touches the ground then reduce player lifeline and reset game.
        if(ballAddRadiusOnY > SCR_HEIGHT) {
            lifeLine -= 1;
            ball.dx = 1;
            ball.dy = -1;
            ball.x = SCR_WIDTH / 2;
            ball.y = SCR_HEIGHT - (playerPaddel.height + ball.radius);
            playerPaddel.x = (SCR_WIDTH - playerPaddel.width) / 2;
            playerPaddel.y = SCR_HEIGHT - playerPaddel.height;
        }
        
        // If player lifeline is zere then display game over message.
        if(lifeLine < 1) {
            gameOverMessage.Draw(ctx);
            gameRestartMessage.Draw(ctx);
            playBtn.style.display = 'inline';
            clearInterval(gameInterval);
        }

        // Tiles logic
        for(let tilesIndex=0; tilesIndex<tilesManager.tiles.length; tilesIndex++)
        {
            if(ball.DetectCollision(tilesManager.tiles[tilesIndex]))
            {
                score += 5;
                ball.dy = -ball.dy;
                boingSoundEffect.pause();
                boingSoundEffect.play();
                tilesManager.tiles.splice(tilesIndex, 1);
            }
        }

        // Generate tiles if all tiles are destoryed and increase tiles for increase deficulty.
        if(tilesManager.tiles.length < 1) {
            tilesManager.numberOfTilesIn.Columns += 2;
            tilesManager.GenerateTiles();
        }

    }, FRAME_RATE);
}