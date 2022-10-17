class UI
{
    constructor(x=0, y=0, text='', color='white', font='', textAlign='center')
    {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.font = font;
        this.textAlign = textAlign;
    }

    Draw(ctx = document.createElement('canvas').getContext('2d'), text='')
    {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text + text, this.x, this.y);
        ctx.closePath();
    }
}