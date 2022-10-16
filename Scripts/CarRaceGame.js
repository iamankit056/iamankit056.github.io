class Car
{
    constructor(speed=0, SCR_WIDTH=0, SCR_HEIGHT=0, carModelIndex=0, angleInDegree=0)
    {
        this.speed = speed;
        this.x = SCR_WIDTH / 2; 
        this.y = SCR_HEIGHT * ((SCR_HEIGHT < SCR_WIDTH) ? 0.8 : 0.9);
        this.width = SCR_WIDTH * 0.1;
        this.height = SCR_HEIGHT * ((SCR_HEIGHT < SCR_WIDTH) ? 0.3 : 0.15);
        this.modelIndex = carModelIndex;
        this.angle = angleInDegree * Math.PI / 180;

        this.models = [
            { 'sx': 77,  'sy': 56,  'swidth': 91, 'sheight': 181 }, // car 1
            { 'sx': 203, 'sy': 56,  'swidth': 91, 'sheight': 181 }, // car 2
            { 'sx': 331, 'sy': 270, 'swidth': 91, 'sheight': 181 }, // car 3
            { 'sx': 76,  'sy': 266, 'swidth': 91, 'sheight': 181 }, // car 4
            { 'sx': 204, 'sy': 259, 'swidth': 91, 'sheight': 192 }, // car 5
            { 'sx': 337, 'sy': 49 , 'swidth': 81, 'sheight': 183 }  // car 6
        ];
    }

    Draw(ctx, carsImage)
    {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(carsImage, 
            this.models[this.modelIndex].sx, this.models[this.modelIndex].sy, 
            this.models[this.modelIndex].swidth, this.models[this.modelIndex].sheight, 
            -this.width/2, -this.height/2, 
            this.width, this.height
        );
        ctx.restore();
        ctx.closePath();
    }

    Collision(car)
    {
        if(this.x < car.x + car.width && this.x + this.width > car.x && 
            this.y < car.y + car.height && this.y + this.height > car.height) {
                return true;
        }

        return false;
    }
};

class Road 
{
    constructor(image, SCR_WIDTH=0, SCR_HEIGHT=0)
    {
        this.x = SCR_WIDTH * 0.1;
        this.y = -SCR_HEIGHT;
        this.width = SCR_WIDTH * 0.8;
        this.height = 2 * SCR_HEIGHT;
        this.image = image;
    }

    Draw(ctx)
    {
        ctx.beginPath();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.closePath();
    }

    MoveDown(speed)
    {
        this.y += speed;

        if(this.y > 0) {
            this.y = -(this.height/2);
        }
    }
};

const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');

const carsImage = document.querySelector('#cars');
const roadImage = document.querySelector('#road');
const crashSoundEffect = document.querySelector('#crashSoundEffect');
const startSoundEffect = document.querySelector('#startSoundEffect');
const drivingSoundEffect = document.querySelector('#drivingSoundEffect');
const countDownSoundEffect = document.querySelector('#countDownSoundEffect');

let horizontalInput = 0;
let hasGameStart = false;
let hasAnimationComplete = false;

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

    const road = new Road(roadImage, SCR_WIDTH, SCR_HEIGHT);
    const player = new Car(20, SCR_WIDTH, SCR_HEIGHT, 0, 180);
    const cars = [];
    const spawnRate = Math.random(200, 600);
    
    let playerInitialSpeed = 0;
    const playerFinalPositionOnY = SCR_HEIGHT * 0.6;

    StartAnimation(ctx);

    // Game Loop.
    const gameInterval = setInterval(function()
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);

        // Render objects.
        road.Draw(ctx);
        ScoreBoard()
        for(let i=0; i < cars.length; i++) {
            cars[i].Draw(ctx, carsImage);
        }
        player.Draw(ctx, carsImage, 180);

        // Game Logic.
        if(hasGameStart)
        {
            road.MoveDown(player.speed);
            player.x += horizontalInput * 20;

            // Bound player movement.
            let playerHalfWidth = player.width / 2;

            if(player.x - playerHalfWidth < SCR_WIDTH * 0.2) {
                player.x = SCR_WIDTH * 0.2 + playerHalfWidth;
            }
            else if(player.x + playerHalfWidth > SCR_WIDTH * 0.8) {
                player.x = SCR_WIDTH * 0.8 - playerHalfWidth;
            }

            for(let i=0; i < cars.length; i++)
            {
                // Car move top to down.
                cars[i].y += cars[i].speed;

                // Destory out of bound.
                if(cars[i].y - cars[i].height > SCR_HEIGHT) {
                    cars.splice(i, 1);
                }

                // Stop the game when player collide with car.
                if(player.Collision(cars[i])) 
                {
                    // console.log('car collide with player car.');
                    hasGameStart = false;
                    hasAnimationComplete = false;
                    GameOver(ctx);
                    playBtn.style.display = 'inline';
                    clearInterval(gameInterval);
                }
                
            }
        }
        else
        {
            if(hasAnimationComplete)
            {
                player.y -= playerInitialSpeed;
                playerInitialSpeed += 0.5;
    
                // If player reach its position then start the game.
                if(player.y <= playerFinalPositionOnY)
                {
                    // Start the game.
                    hasGameStart = true;
                    // Start the spawning cars when game start.
                    SpawnRandomCars(cars, spawnRate, SCR_WIDTH, SCR_HEIGHT);
                }
            }
        }

    }, FRAME_RATE);
}

function StartAnimation(ctx, countDown=0)
{
    setTimeout(function()
    {
        const message = countDown < 4 ? countDown : 'Start';
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 200px cursive';
        ctx.textAlign = 'center';
        ctx.fillText(message, ctx.canvas.width/2, ctx.canvas.height);
        ctx.closePath();

        if(countDown > 3) {
            StartAnimation(ctx, countDown + 1);
        } else {
            hasAnimationComplete = true;
        }
        
    }, 1000); // Wait 1second
}

function SpawnRandomCars(cars=[], spawnRate=0, SCR_WIDTH=0, SCR_HEIGHT=0)
{
    setTimeout(function()
    {
        const minSpeed = 40;
        const maxspeed = 60;
        const speed = Math.floor(Math.random() * (maxspeed - minSpeed) + minSpeed);
        const car = new Car(speed, SCR_WIDTH, SCR_HEIGHT);
        const minRangeX = SCR_WIDTH * 0.2 + car.width / 2;
        const maxRangeX = SCR_WIDTH * 0.8 - car.width / 2;
        
        car.x = Math.floor(Math.random() * (maxRangeX - minRangeX) + minRangeX);
        car.y = -car.height;
        car.modelIndex = Math.floor(Math.random() * (car.models.length-1));
        
        cars.push(car);

        const minSpawnRate = 700;
        const maxSpawnRate = 1500;
        const carSpawnRate = Math.random() * (maxSpawnRate - minSpawnRate) + minSpawnRate;
        
        if(hasGameStart) {
            SpawnRandomCars(cars, carSpawnRate, SCR_WIDTH, SCR_HEIGHT);
        }

    }, spawnRate);
}

function ScoreBoard(speed=0, distance=0) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.font = "40px cursive";
    ctx.fillText('Speed : ' + speed + 'km\\h', ctx.canvas.width * 0.05, 100);
    ctx.fillText('Distance : ' + distance + 'km', ctx.canvas.width * 0.05, 160);
    ctx.closePath();
}

function GameOver(ctx) {
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

// Handle keyboard inputs.
window.addEventListener('keydown', function(event)
{
    if(event.key === 'ArrowLeft' || event.key === 'A' || event.key === 'a') {
        horizontalInput = -1;
    }
    else if(event.key === 'ArrowRight' || event.key === 'D' || event.key === 'd') {
        horizontalInput = 1;
    }
});
window.addEventListener('keyup', function(event)
{
    horizontalInput = 0;
});

// Handle touch input, for touches devices like mobile phones.
let touchStart;

window.addEventListener('touchstart', function(event)
{
    touchStart = event.touches[0];
});
window.addEventListener('touchmove', function(event)
{
    if(touchStart.clientX < event.touches[0].clientX) {
        horizontalInput = 1;
    }
    else {
        horizontalInput = -1;
    }
});
window.addEventListener('touchend', function(event)
{
    horizontalInput = 0;
});
