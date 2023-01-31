const myCanvas = document.querySelector('#myCanvas');
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const myCtx = myCanvas.getContext('2d');

const playBtn = document.querySelector('#playBtn');

const Gameplay = function() 
{
    const scoreBoard = {
        'lifeLine': 3,
        'score': 0,
        'level': 0
    };

    const paddle = new Paddle(myCtx);
    const ball = new Ball(myCtx, paddle, scoreBoard);
    const tilesLoader = new TilesLoader(myCtx, ball, scoreBoard);

    const Gameloop = ()=>{
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        paddle.Update();
        ball.Update();
        tilesLoader.Update();

        GameUI.Text(
            myCtx,
            `Life ${scoreBoard.lifeLine}`,
            window.innerWidth*0.05,
            window.innerHeight*0.8,
            '#fff',
            '15px poppins, arial, san-sarif',
            'left'
        );
        GameUI.Text(
            myCtx,
            `Score ${Math.floor(scoreBoard.score)}`,
            window.innerWidth*0.05,
            window.innerHeight*0.8+30,
            '#fff',
            '15px poppins, arial, san-sarif',
            'left'
        );
        GameUI.Text(
            myCtx,
            `Level ${Math.floor(scoreBoard.level)}`,
            window.innerWidth*0.05,
            window.innerHeight*0.8+60,
            '#fff',
            '15px poppins, arial, san-sarif',
            'left'
        );

        if(scoreBoard.lifeLine < 1) {
            GameUI.Text(
                myCtx, 
                'Game Over',
                window.innerWidth*0.5+20, 
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