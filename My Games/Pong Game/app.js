const myCanvas = document.querySelector('#myCanvas');
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const myCtx = myCanvas.getContext('2d');

const playBtn = document.querySelector('#playBtn');

const Gameplay = function() 
{
    const board = {
        'gameOver': false,
        'winner': '',
    }

    const paddle1 = new Paddle(myCtx, 1, window.innerHeight/2-20, 5, 40, true);
    const paddle2 = new Paddle(myCtx, window.innerWidth-6, window.innerHeight/2-20, 5, 40);

    const ball = new Ball(myCtx, paddle1, paddle2, board);

    paddle1.ball = ball;

    const Gameloop = ()=>{
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;

        paddle1.Update();
        paddle2.Update();
        ball.Update();

        if(board.gameOver) {
            GameUI.Text(
                myCtx, 
                board.winner + ' win',
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
})