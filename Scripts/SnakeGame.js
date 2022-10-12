const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');
const Input = {
    'Horizontal': 0,
    'Vertical': 0
};

function Gameplay()
{
    // Hide play button when user click it.
    playBtn.style.display = 'none';
    // Set canvas resulation according to portrait or landscape mode.
    if(screen.width > screen.height) {
        ctx.canvas.width = 1920;
        ctx.canvas.height = 1080;
    } else {
        ctx.canvas.width = 1080;
        ctx.canvas.height = 1920;
    }
    
    // Define all variables, constant and object.
    const frameRate = 41.6667; 
    const SCR_WIDTH = ctx.canvas.width;
    const SCR_HEIGHT = ctx.canvas.height;
    const food = {
        'x': 0,
        'y': 0
    };
    const snake = [{
        'x': 0,
        'y': 0
    }];
    const size = 20;
    const tiles = {
        'x': SCR_WIDTH / size,
        'y': SCR_HEIGHT / size
    };

    let score;
    let health;
    let hasFoodEat = false;

    InitialSetup();

    // Game Loop ------------------------------------
    const gameInterval = setInterval(function() 
    {
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);
        Draw(food, size, 'red');
        Draw(snake[0], size, 'rgb(0, 255, 0)');
        ScoreBoard(score, snake.length);

        if(DetectCollision(snake[0], food, size)) {
            score += 5;
            hasFoodEat = true;
            GenerateRandomFoodPosition(food, size, tiles);
        }

        if(snake[0].x < 0 || snake[0].x > SCR_WIDTH || snake[0].y < 0 || snake[0].y > SCR_HEIGHT) {
            health -= 1;
            Input.Horizontal = 0;
            Input.Vertical = 0;
            snake[0].x = (tiles.x/2) * size;
            snake[0].y = (tiles.y/2) * size;
            GenerateRandomFoodPosition(food, size, tiles);
        }
        if(health < 1) {
            GameOver();
            playBtn.style.display = 'inline';
            clearInterval(gameInterval); 
        }

        SnakeMovement(snake, size);

    }, frameRate);

    function InitialSetup() {
        score = 0;
        health = 3;
        snake[0].x = (tiles.x/2) * size;
        snake[0].y = (tiles.y/2) * size;
        GenerateRandomFoodPosition(food, size, tiles);
        Input.Horizontal = 0;
        Input.Vertical = 0;
    }
}

function Random(min=0, max=100) {
    return Math.floor(Math.random() * (max - min) + min);
}
function GenerateRandomFoodPosition(food, size=0, tiles) {
    food.x = Random(0, tiles.x) * size;
    food.y = Random(0, tiles.y) * size;
}
function Draw(object, size=0, color='white') {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(object.x, object.y, size, size);
    ctx.closePath();
}
function DetectCollision(object1, object2, size=0) {
    if(object1.x < object2.x+size && object1.x+size > object2.x && 
        object1.y < object2.y+size && object1.y+size > object2.y) {
            return true;
    }
    return false;
}
function SnakeMovement(snake, size=0) 
{
    snake.unshift({
        'x': snake[0].x + Input.Horizontal * size,
        'y': snake[0].y + Input.Vertical * size
    });

    if(!hasFoodEat)
        snake.pop();
    else
        hasFoodEat = false;
}
function ScoreBoard(score=0, health=0) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = "bold 2rem cursive"
    ctx.fillText('Score : '+score, ctx.canvas.width * 0.05, 100);
    ctx.fillText('Health : '+health, ctx.canvas.width * 0.05, 150);
    ctx.closePath();
}
function GameOver() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.font = 'bold 5rem cursive';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', ctx.canvas.width/2, ctx.canvas.height * 0.4);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = 'bold 2.5rem cursive';
    ctx.textAlign = 'center';
    ctx.fillText('Press Play to Restart Game', ctx.canvas.width/2, ctx.canvas.height * 0.7);
    ctx.closePath();
}

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
