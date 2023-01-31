class GameUI {
    static Text(
        myCtx, 
        text='', 
        x=0, y=0,
        color='#000', 
        font='50px Arial',
        textAlign='center'
    ) {
        myCtx.beginPath();
        myCtx.font = font;
        myCtx.fillStyle = color;
        myCtx.textAlign = textAlign;
        myCtx.fillText(text, x, y);
        myCtx.closePath();
    }
}