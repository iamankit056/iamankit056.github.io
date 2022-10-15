const ctx = document.querySelector('canvas').getContext('2d');
const playBtn = document.querySelector('button');

const carsImage = document.querySelector('#cars');
const roadImage = document.querySelector('#road');
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
        this.height = SCR_HEIGHT * ((SCR_HEIGHT < SCR_WIDTH) ? 0.3 : 0.15);
        this.x = SCR_WIDTH / 2; 
        this.y = SCR_HEIGHT * 0.6;
    }

    Draw(ctx, carsImage, angleInDegree=0)
    {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angleInDegree * Math.PI / 180);
        ctx.drawImage(carsImage, this.sx, this.sy, this.swidth, this.sheight, -this.width/2, -this.height/2, this.width, this.height);
        ctx.restore();
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

Gameplay();

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
    const cars = [
        new Car(SCR_WIDTH, SCR_HEIGHT, 77, 56, 91, 181),
        new Car(SCR_WIDTH, SCR_HEIGHT, 203, 56, 91, 181),
        new Car(SCR_WIDTH, SCR_HEIGHT, 331, 270, 91, 181),
        new Car(SCR_WIDTH, SCR_HEIGHT, 76, 266, 91, 181),
        new Car(SCR_WIDTH, SCR_HEIGHT, 204, 259, 91, 192),
        new Car(SCR_WIDTH, SCR_HEIGHT, 337, 49, 81, 183)
    ];
    
    const player = cars[0];

    const gameInterval = setInterval(function()
    {
        // Clear canvas before rendering every frame.
        ctx.clearRect(0, 0, SCR_WIDTH, SCR_HEIGHT);

        // Render objects.
        road.Draw(ctx);
        player.Draw(ctx, carsImage, 180);

        // Game Logic.

    }, FRAME_RATE);
}
