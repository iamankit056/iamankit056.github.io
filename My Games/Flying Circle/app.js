const myCanvas = document.querySelector('#myCanvas');
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const myCtx = myCanvas.getContext('2d');

const playBtn = document.querySelector('#playBtn');

const Gameplay = function() 
{
    const player = new Player(myCtx);
    const obstaclesLoader = new ObstaclesLoader(myCtx, player);

    let score = 0;
    let level = 1;
    let scoreIncreaseRate = 0.01;
    let playerSpeedIncreaseRate = 0.2;

    const Gameloop = ()=>{
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        player.Update();
        obstaclesLoader.Update();

        score += scoreIncreaseRate;
        GameUI.Text(
            myCtx,
            `Score ${Math.floor(score)}`,
            window.innerWidth*0.1,
            window.innerHeight*0.12,
            '#fff',
            '25px poppins, arial, san-sarif',
            'left'
        );

        if(Math.floor(score) >= level*100) {
            level += 1;
            scoreIncreaseRate += 0.1;
            player.speed.x += playerSpeedIncreaseRate;
        }

        if(!player.isAlive) {
            GameUI.Text(
                myCtx, 
                'Game Over',
                window.innerWidth*0.5, 
                window.innerHeight*0.4,
                '#f00',
                `${window.innerWidth*0.15}px poppins, arial, san-sarif`
            );
                
            document.body.appendChild(playBtn);
            return;
        }

        window.requestAnimationFrame(Gameloop);
    }

    window.requestAnimationFrame(Gameloop);
}

playBtn.remove();
Gameplay();

playBtn.addEventListener('click', (e)=>{
    playBtn.remove();
    Gameplay();
});