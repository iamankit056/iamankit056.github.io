class Input
{
    constructor()
    {
        this.Vertical = 0;
        this.Horizontal = 0;
    }

    StartListener()
    {
        // Listen keyboard input.
        window.addEventListener('keydown', (event)=>{
            if(event.key === 'ArrowLeft') {
                this.Horizontal = -1;
            }
            else if(event.key === 'ArrowRight') {
                this.Horizontal = 1;
            }
            else if(event.key === 'ArrowUp') {
                this.Vertical = -1;
            }
            else if(event.key === 'ArrowDown') {
                this.Vertical = 1;
            }
        });
        window.addEventListener('keyup', (event)=>{
            this.Vertical = 0;
            this.Horizontal = 0;
        });

        // Listen touch input.
        const startTouchPosition = {};
        window.addEventListener('touchstart', (event)=>{
            startTouchPosition = {
                'x': event.touches[0].clientX,
                'y': event.touches[0].clientY
            };
        });
        window.addEventListener('touchmove', (event)=> {
            const deltaTouchPosition = startTouchPosition = {
                'x': event.touches[0].clientX - startTouchPosition.x,
                'y': event.touches[0].clientY - startTouchPosition.y
            };

            if(deltaTouchPosition.x > deltaTouchPosition.y) 
            {

            }
            else 
            {

            }
        });
        window.addEventListener('touchend', (event)=>{
            this.Vertical = 0;
            this.Horizontal = 0;
        });
    }
}