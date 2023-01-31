class PlayerInput
{
    #touchPosition;

    constructor()
    {
        this.axis = {
            'x': 0,
            'y': 0
        };
        this.key = {
            'left': false,
            'right': false,
            'up': false,
            'down': false
        };
        this.#touchPosition = {
            'start': { 'x': 0, 'y': 0 }
        };

        this.jump = false;

        this.#ListenKeyboardInputs();
        this.#ListenTouchInputs();
    }

    #ListenKeyboardInputs()
    {
        window.addEventListener('keydown', (e)=>{
            if(e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A') {
                this.axis.x = -1;
                this.key.left = true;
                return;
            }
            if(e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D') {
                this.axis.x = 1;
                this.key.right = true;
                return;
            }
            if(e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W') {
                this.axis.y = -1;
                this.key.up = true;
                return;
            }
            if(e.key == 'ArrowDown' || e.key == 's' || e.key == 'S') {
                this.axis.y = 1;
                this.key.down = true;
                return;
            }
            if(e.key == ' ') {
                this.jump = true;
                return;
            }
        });

        window.addEventListener('keyup', (e)=>{
            if(e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A') {
                this.axis.x = 0;
                this.key.left = false;
                return;
            }
            if(e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D') {
                this.axis.x = 0;
                this.key.right = false;
                return;
            }
            if(e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W') {
                this.axis.y = 0;
                this.key.up = false;
                return;
            }
            if(e.key == 'ArrowDown' || e.key == 's' || e.key == 'S') {
                this.axis.y = 0;
                this.key.down = false;
                return;
            }
            if(e.key == ' ') {
                this.jump = false;
                return;
            }
        });
    }

    #ListenTouchInputs()
    {
        window.addEventListener('touchstart', (e)=>{
            this.jump = true;
            this.#touchPosition.start.x = e.touches[0].clientX;
            this.#touchPosition.start.y = e.touches[0].clientY;
        });
        
        window.addEventListener('touchmove', (e)=>{
            let dx = e.touches[0].clientX - this.#touchPosition.start.x;
            let dy = e.touches[0].clientY - this.#touchPosition.start.y;

            // if dx is greater than dy then finger swip on horizontal azis otherwise vertical.
            if(Math.abs(dx) > Math.abs(dy)) {
                if(dx > 0) {
                    this.axis.x = 1;
                    this.key.right = true;
                }
                else {
                    this.axis.x = -1;
                    this.key.left = true;
                }
            }
            else {
                if(dy > 0) {
                    this.axis.y = 1;
                    this.key.down = true;
                }
                else {
                    this.axis.y = -1;
                    this.key.up = true;
                }
            }
        });
        window.addEventListener('touchend', ()=>{
            this.#touchPosition.start.x = 0;
            this.#touchPosition.start.y = 0;

            this.axis.x = 0;            
            this.axis.y = 0;

            this.key.left = false;
            this.key.right = false;
            this.key.up = false;
            this.key.down = false;

            this.jump = false;
        });
    }
}
