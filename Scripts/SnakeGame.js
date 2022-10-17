class Snake 
{
    constructor(life=3, tiles) 
    {
        this.Body = [];
        this.life = life;
        this.size = tiles.size;
        this.ResetBody(tiles);
        this.hasFoodEat = false;
        this.direction = {
            'x': 0,
            'y': 0
        };
    }

    Draw(ctx)
    {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fillRect(this.Body[0].x, this.Body[0].y, this.size, this.size);
        ctx.closePath();
        for(let i=1; i < this.Body.length; i++) 
        {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(this.Body[i].x, this.Body[i].y, this.size, this.size);
            ctx.closePath();
        }
    }

    ResetBody(tiles)
    {
        if(this.Body.length >= 0) {
            this.Body.splice(0, this.Body.length);
        }

        this.Body.unshift({
            'x': (tiles.x / 2) * this.size,
            'y': (tiles.y / 2) * this.size
        });
    }

    Move()
    {
        this.Body.unshift({
            'x': this.Body[0].x + this.direction.x * this.size,
            'y': this.Body[0].y + this.direction.y * this.size,
        });

        if(!this.hasFoodEat) {
            this.Body.pop();
        } else {
            this.hasFoodEat = false;
        }
    }

    Die(tiles)
    {
        this.direction.x = 0;
        this.direction.y = 0;
        this.life -= 1;
        this.ResetBody(tiles);
    }

    Eat(food) 
    {
        if(this.Body[0].x < food.x + food.size && this.Body[0].x + this.size > food.x && 
            this.Body[0].y < food.y + food.size && this.Body[0].y + this.size > food.y) {
                return true;
        }
        return false;
    }
};

class Food 
{
    constructor(tiles)
    {
        this.x = 0;
        this.y = 0;
        this.size = tiles.size;
        this.GenerateRandomPosition(tiles);
    }

    Draw(ctx) 
    {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.closePath();
    }

    GenerateRandomPosition(tiles)
    {
        this.x = Math.floor(Math.random() * tiles.x) * this.size;
        this.y = Math.floor(Math.random() * tiles.y) * this.size;
    }
};

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
    const lifeBoard = 
        new UI(SCR_WIDTH * 0.05, 100, 'life : ', 'white', '40px Arial', 'left');
    const scoreBoard = 
        new UI(SCR_WIDTH * 0.05, 160, 'Score : ', 'white', '40px Arial', 'left');
    const gameOverMessage = 
        new UI(ctx.canvas.width/2, ctx.canvas.height * 0.4, 'Game Over', 'red', 'bold 150px cursive', 'center');
    const gameRestartMessage = 
        new UI(ctx.canvas.width/2, ctx.canvas.height * 0.7, 'Press Play to Restart Game', 'white', '40px cursive', 'center');
    const TILE_SIZE = 20;
    const tiles = {
        'size': TILE_SIZE,
        'x': SCR_WIDTH / TILE_SIZE,
        'y': SCR_HEIGHT / TILE_SIZE
    };
    const food  = new Food(tiles);
    const snake = new Snake(3, tiles);
    const playerInput = new Input();

    let score = 0;

    playerInput.StartListener();
    food.GenerateRandomPosition(tiles);

    // Game Loop.
    const gameInterval = setInterval(function() 
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
        
        // Render objects.
        food.Draw(ctx);
        snake.Draw(ctx);
        lifeBoard.Draw(ctx, snake.life.toString());
        scoreBoard.Draw(ctx, score.toString());

        // Game Logic.
        if(snake.Eat(food)) 
        {
            score += 5;
            snake.hasFoodEat = true;
            food.GenerateRandomPosition(tiles);
            // console.log('snake eat food.');
        }

        for(let i=1; i < snake.Body.length; i++)
        {
            if(snake.Body[0].x < snake.Body[i].x + snake.size && snake.Body[0].x + snake.size > snake.Body[i].x && 
                snake.Body[0].y < snake.Body[i].y + snake.size && snake.Body[0].y + snake.size > snake.Body[i].y) {
                    snake.Die(tiles);
                    food.GenerateRandomPosition(tiles);
            }
        }

        if(snake.Body[0].x < 0  || snake.Body[0].x > SCR_WIDTH || 
            snake.Body[0].y < 0 || snake.Body[0].y > SCR_HEIGHT) {
                snake.Die(tiles);
                food.GenerateRandomPosition(tiles);
        }

        if(snake.life < 1) 
        {
            gameOverMessage.Draw(ctx);
            gameRestartMessage.Draw(ctx);
            playBtn.style.display = 'inline';
            clearInterval(gameInterval); 
        }

        if(Math.abs(playerInput.Horizontal) > 0 && snake.direction.x == 0) {
            snake.direction.y = 0;
            snake.direction.x = playerInput.Horizontal;
        }
        else if(Math.abs(playerInput.Vertical) > 0 && snake.direction.y == 0) {
            snake.direction.x = 0;
            snake.direction.y = playerInput.Vertical;
        }

        snake.Move();

    }, FRAME_RATE);
}