const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');

const Input = 
{
    'Vertical': 0,
    'Horizontal': 0,
    'Reset': function() 
    {
        this.Horizontal = 0;
        this.Vertical = 0;
    }
};

class Snake 
{
    constructor(life=3, tiles) 
    {
        this.Body = [];
        this.life = life;
        this.size = tiles.size;
        this.ResetBody(tiles);
        this.hasFoodEat = false;
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

    Movement(Input)
    {
        this.Body.unshift({
            'x': this.Body[0].x + Input.Horizontal * this.size,
            'y': this.Body[0].y + Input.Vertical * this.size,
        });

        if(!this.hasFoodEat) {
            this.Body.pop();
        } else {
            this.hasFoodEat = false;
        }
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

    const TILE_SIZE = 20;
    const tiles = 
    {
        'size': TILE_SIZE,
        'x': SCR_WIDTH / TILE_SIZE,
        'y': SCR_HEIGHT / TILE_SIZE
    };

    const food  = new Food(tiles);
    const snake = new Snake(3, tiles);

    let score = 0;

    Input.Reset();
    food.GenerateRandomPosition(tiles);

    // Game Loop.
    const gameInterval = setInterval(function() 
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
        
        // Render objects.
        food.Draw(ctx);
        snake.Draw(ctx);
        ScoreBoard(snake.life, score);

        // Game Logic.
        if(snake.Eat(food)) 
        {
            score += 5;
            snake.hasFoodEat = true;
            food.GenerateRandomPosition(tiles);
        }

        for(let i=1; i < snake.Body.length; i++)
        {
            if(snake.Body[0].x < snake.Body[i].x + snake.size && snake.Body[0].x + snake.size > snake.Body[i].x && 
                snake.Body[0].y < snake.Body[i].y + snake.size && snake.Body[0].y + snake.size > snake.Body[i].y) {
                    Input.Reset();
                    snake.life -= 1;
                    snake.ResetBody(tiles);
                    food.GenerateRandomPosition(tiles);
                    console.log('snake bite it self.');
            }
        }

        if(snake.Body[0].x < 0  || snake.Body[0].x > SCR_WIDTH || 
            snake.Body[0].y < 0 || snake.Body[0].y > SCR_HEIGHT) {
                Input.Reset();
                snake.life -= 1;
                snake.ResetBody(tiles);
                food.GenerateRandomPosition(tiles);
        }

        if(snake.life < 1) 
        {
            GameOver();
            playBtn.style.display = 'inline';
            clearInterval(gameInterval); 
        }

        snake.Movement(Input);

    }, FRAME_RATE);
}

function ScoreBoard(life=0, score=0) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = "40px cursive";
    ctx.fillText('Life : ' + life, ctx.canvas.width * 0.05, 100);
    ctx.fillText('Score : ' + score, ctx.canvas.width * 0.05, 160);
    ctx.closePath();
}

function GameOver() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.font = 'bold 150px cursive';
    ctx.fillText('Game Over', ctx.canvas.width/2, ctx.canvas.height * 0.4);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '40px cursive';
    ctx.fillText('Press Play to Restart Game', ctx.canvas.width/2, ctx.canvas.height * 0.7);
    ctx.closePath();
}

// Handle keyboard inputs
window.addEventListener('keydown', function(event)
{
    if(event.key === 'ArrowLeft' && Input.Horizontal == 0) {
        Input.Vertical = 0;
        Input.Horizontal = -1;
    }
    if(event.key === 'ArrowRight' && Input.Horizontal == 0) {
        Input.Vertical = 0;
        Input.Horizontal = 1;
    }
    if(event.key === 'ArrowUp' && Input.Vertical == 0) {
        Input.Vertical = -1;
        Input.Horizontal = 0;
    }
    if(event.key === 'ArrowDown' && Input.Vertical == 0) {
        Input.Vertical = 1;
        Input.Horizontal = 0;
    }
});

{   // Handle touch input, for touches devices like mobile phones.
    const touch = {
        'start': {},
        'delta': {},
        'hasTouch': false
    };

    window.addEventListener('touchstart', function(event)
    {
        touch.start = {
            'x': event.touches[0].clientX,
            'y': event.touches[0].clientY
        };

        touch.hasTouch = true;
    });
    window.addEventListener('touchmove', function(event)
    {
        touch.delta = {
            'x': event.touches[0].clientX - touch.start.x,
            'y': event.touches[0].clientY - touch.start.y
        };
        
        if(Math.abs(touch.start.x) > Math.abs(touch.delta.y) && touch.hasTouch && Input.Horizontal == 0)
        {
            if(touch.delta.x < 0) {
                Input.Horizontal = -1;
            }
            if(touch.delta.x > 0) {
                Input.Horizontal = 1;
            }

            Input.Vertical = 0;
        }
        else if(Input.Vertical == 0 && touch.hasTouch)
        {
            if(touch.delta.y < 0) {
                Input.Vertical = -1;
            }
            if(touch.delta.y > 0) {
                Input.Vertical = 1;
            }

            Input.Horizontal = 0;
        }

        touch.hasTouch = false;
    });
}
