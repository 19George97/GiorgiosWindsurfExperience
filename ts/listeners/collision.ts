/** Class representing a collision */
class Collision{

    private _game: Game;
    private _el: any = document.createElement('div');
    private _window: any;
    private _surfer: any;


    /**
     * Create a collisionListener
     * @param {Game} - the calling Game object
     */
    constructor(game: Game){
        this._game = game;
        this._surfer = this._game.surfer.el;
        // this._boat1 = this._game.zboat._el;
        // this.boat1object = this._game.zboat;
        this._window = this._game.windowListener;
    }

    /**
     * What to do if objects collide
     */
    public checkGameOver(){
        if(this.obstacleSurferCollision() || this.surferOutOfBounds()){
            const game = document.querySelector('.container');
            this._el.className = 'collisiontrue';
            this._el.innerText = 'YOU FAILED';
            this._el.setAttribute('style', 'z-index: 5; font-size: 75px; background-color: red; opacity: .8; width:' + this._window.windowWidth + 'px; height: ' + this._window.windowHeight + 'px;');
            game.appendChild(this._el);
            return true;
        }
        return false;
    }

    private obstacleSurferCollision(){
        
        for(let index in this._game.obstacles){
            if (this._surfer.offsetLeft + this._surfer.width >= this._game.obstacles[index].el.offsetLeft && this._surfer.offsetLeft <= this._game.obstacles[index].el.offsetLeft + this._game.obstacles[index].el.width) {
                if (this._surfer.offsetTop + this._surfer.height >= this._game.obstacles[index].el.offsetTop && this._surfer.offsetTop <= this._game.obstacles[index].el.offsetTop + this._game.obstacles[index].el.height) {
                    return true;
                }
            }
        }
        return false;
    }


    public boatOutOfBounds(){
        for(let index in this._game.obstacles){
            let newspeed = this._game.obstacles[index].speed;

            if(this._game.obstacles[index].el.offsetLeft <= 0){
                console.log('boat krijgt een nieuwe vector, links weg');
                newspeed =  this._game.obstacles[index].speed.mirror_Y();
            }
            if((this._game.obstacles[index].el.offsetLeft + this._game.obstacles[index].el.width + 15) >= this._window.windowWidth){
                console.log('boat krijgt een nieuwe vector, rechts weg');
                newspeed =  this._game.obstacles[index].speed.mirror_Y();
            }
            if(this._game.obstacles[index].el.offsetTop <= 0) {
                console.log('boat krijgt een nieuwe vector, boven weg');
                newspeed =  this._game.obstacles[index].speed.mirror_X();
            }
            if((this._game.obstacles[index].el.offsetTop + this._game.obstacles[index].el.height + 10) >= this._window.windowHeight) {
                console.log('boat krijgt een nieuwe vector, onder weg');
                newspeed =  this._game.obstacles[index].speed.mirror_X();
            }
            this._game.obstacles[index].speed = newspeed;
        }
    }

    private surferOutOfBounds(){
        if(this._surfer.offsetLeft <= 0){
            return true;
        }
        if((this._surfer.offsetLeft + this._surfer.width + 15) >= this._window.windowWidth){
            return true;
        }
        if(this._surfer.offsetTop <= 0) {
            return true;
        }
        if((this._surfer.offsetTop + this._surfer.height + 10) >= this._window.windowHeight) {
            return true;
        }
        return false;
    }
}
