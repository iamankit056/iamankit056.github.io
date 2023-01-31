const myCanvas = document.querySelector('#myCanvas');
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const myCtx = myCanvas.getContext('2d');

const playBtn = document.querySelector('#playBtn');

const Gameplay = function() 
{
    const scoreBoard = {
        'score': 0,
        'level': 0,
        'lifeLine': 3
    };

    const player = new Player(myCtx);
    const gemsLoader = new GemsLoader(myCtx, player, scoreBoard);
    const platformLoader = new PlatformLoader(myCtx, player, scoreBoard);

    const Gameloop = ()=>{
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        player.Update();
        gemsLoader.Update();
        platformLoader.Update();

        GameUI.Text(
            myCtx,
            `Score ${scoreBoard.score}`,
            window.innerWidth*0.05,
            window.innerHeight*0.1,
            '#fff',
            '18px poppins, arial, san-sarif',
            'left'
        );
        GameUI.Text(
            myCtx,
            `Life Line ${scoreBoard.lifeLine}`,
            window.innerWidth*0.05,
            window.innerHeight*0.1+30,
            '#fff',
            '18px poppins, arial, san-sarif',
            'left'
        );

        if(scoreBoard.score < scoreBoard.level * 10) {
            player.speed.y += 1;
        }

        if(scoreBoard.lifeLine < 1) {
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