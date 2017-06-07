/** Class representing a collision */
class Collision{

    private _game: Game;
    private _el: any = document.createElement('div');
    private _window: any;
    // private _surfer = this._game.surfer._el;
    private _surfer: any;
    private _boat1: any;
    // private _boat1 = this._game.zboat._el;


    /**
     * Create a collisionListener
     * @param {Game} - the calling Game object
     */
    constructor(game: Game){
        this._game = game;
        this._surfer = this._game.surfer._el;
        this._boat1 = this._game.zboat._el;
        this._window = this._game.windowListener;
    }

    /**
     * What to do if objects collide
     */
    public checkCol(){
       



        // let width = this._window.windowWidth;

        this.surferOutOfBounds();


        if(this._surfer.offsetLeft + this._surfer.width >= this._boat1.offsetLeft && this._surfer.offsetLeft <= this._boat1.offsetLeft + this._boat1.width){
            if (this._surfer.offsetTop + this._surfer.height >= this._boat1.offsetTop && this._surfer.offsetTop <= this._boat1.offsetTop + this._boat1.height){
                const game = document.querySelector('.container');
                this._el.className = 'collisiontrue';
                this._el.innerText = 'YOU FAILED';
                this._el.setAttribute('style', 'z-index: 5; font-size: 75px; background-color: red; opacity: .8; width:' + this._window.windowWidth + 'px; height: ' + this._window.windowHeight + 'px;');
                game.appendChild(this._el);
                return true;
            }
        }
        return false;

    }

    private surferOutOfBounds(){
        if(this._surfer.offsetLeft <= 0){
            console.log('left border'); //stop the game
            this._game._gameOver = true;
        }
        if((this._surfer.offsetLeft + this._surfer.width + 15) >= this._window.windowWidth){
            console.log('right border'); //stop the game
            this._game._gameOver = true;
        }
        console.log('offset top ' + this._surfer.offsetTop + ' window height ' + this._window.windowHeight );
        if(this._surfer.offsetTop <= 0) {
            this._game._gameOver = true;
        }
        if((this._surfer.offsetTop + this._surfer.height + 10) >= this._window.windowHeight) {
            this._game._gameOver = true;
        }

    }

}
