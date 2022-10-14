const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');

const carsImages = document.querySelector('#cars');
const roadImages = document.querySelector('#road');
const crashSoundEffect = document.querySelector('#crashSoundEffect');
const startSoundEffect = document.querySelector('#startSoundEffect');
const drivingSoundEffect = document.querySelector('#drivingSoundEffect');
const countDownSoundEffect = document.querySelector('#countDownSoundEffect');

class Car
{
    constructor(SCR_WIDTH=0, SCR_HEIGHT=0, sx=0, sy=0, swidth=0, sheight=0)
    {
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
        this.width = SCR_WIDTH * 0.1;
        this.height = SCR_HEIGHT * 0.1;
        this.x = (SCR_WIDTH - this.width) / 2; 
        this.y = SCR_HEIGHT * 0.5;
    }

    Draw(ctx, carsImages)
    {
        ctx.beginPath();
        ctx.drawImage(carsImages, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y);
        ctx.closePath();
    }
}

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
}


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

    const road = new Road(roadImages, SCR_WIDTH, SCR_HEIGHT);
    const cars = [
        new Car(SCR_WIDTH, SCR_HEIGHT, 10, 10, 200, 200)
    ];


    const gameInterval = setInterval(function()
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);

        // Render objects.
        road.Draw(ctx);
        cars[0].Draw(ctx, carsImages);
        

        // Game Logic.

    }, FRAME_RATE);
}
