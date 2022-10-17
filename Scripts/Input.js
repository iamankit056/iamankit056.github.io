class Input
{
    constructor()
    {
        this.Vertical = 0;
        this.Horizontal = 0;

        this.touchPosition = {
            'x': 0,
            'y': 0
        }
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
            this.touchPosition.x = startTouchPosition.x = event.touches[0].clientX;
            this.touchPosition.y = startTouchPosition.y = event.touches[0].clientY;
        });
        window.addEventListener('touchmove', (event)=> {
            const deltaTouchPosition = {
                'x': event.touches[0].clientX - startTouchPosition.x,
                'y': event.touches[0].clientY - startTouchPosition.y
            };

            if(Math.abs(deltaTouchPosition.x) > Math.abs(deltaTouchPosition.y)) 
            {
                if(deltaTouchPosition.x < 0) {
                    this.Horizontal = -1;
                }
                else {
                    this.Horizontal = 1;                    
                }
            }
            else 
            {
                if(deltaTouchPosition.y < 0) {
                    this.Vertical = -1;
                }
                else {
                    this.Vertical = 1;                    
                }
            }
        });
        window.addEventListener('touchend', (event)=>{
            this.touchPosition.x = this.Vertical = 0;
            this.touchPosition.y = this.Horizontal = 0;
        });
    }

    HasTouched(x=0, y=0, width=0, height=0)
    {
        if(this.touchPosition.x > x && this.touchPosition.x < x + width &&
            this.touchPosition.y > y && this.touchPosition.y < y + height) {
                return true;
        }
        return false;
    }
}