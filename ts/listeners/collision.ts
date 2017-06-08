/** Class representing a collision */
class Collision{

    private _game: Game;
    private _el: any = document.createElement('div');
    private _window: any;
    private _surfer: any;
    public _boat1: any;
    private boat1object: zboat;


    /**
     * Create a collisionListener
     * @param {Game} - the calling Game object
     */
    constructor(game: Game){
        this._game = game;
        this._surfer = this._game.surfer._el;
        this._boat1 = this._game.zboat._el;
        this.boat1object = this._game.zboat;
        this._window = this._game.windowListener;
    }

    /**
     * What to do if objects collide
     */
    public checkGameOver(){
        if(this.boatSurferCollision() || this.surferOutOfBounds()){
            const game = document.querySelector('.container');
            this._el.className = 'collisiontrue';
            this._el.innerText = 'YOU FAILED';
            this._el.setAttribute('style', 'z-index: 5; font-size: 75px; background-color: red; opacity: .8; width:' + this._window.windowWidth + 'px; height: ' + this._window.windowHeight + 'px;');
            game.appendChild(this._el);
            return true;
        }
        return false;
    }

    private boatSurferCollision(){
        if(this._surfer.offsetLeft + this._surfer.width >= this._boat1.offsetLeft && this._surfer.offsetLeft <= this._boat1.offsetLeft + this._boat1.width){
            if (this._surfer.offsetTop + this._surfer.height >= this._boat1.offsetTop && this._surfer.offsetTop <= this._boat1.offsetTop + this._boat1.height){
                return true;
            }
        }
        return false;
    }

    public boatOutOfBounds(){
        let newspeed = this.boat1object.speed;

        if(this._boat1.offsetLeft <= 0){
            console.log('boat krijgt een nieuwe vector, links weg');
            newspeed =  this.boat1object.speed.mirror_Y();
        }
        if((this._boat1.offsetLeft + this._boat1.width + 15) >= this._window.windowWidth){
            console.log('boat krijgt een nieuwe vector, rechts weg');
            newspeed =   this.boat1object.speed.mirror_Y();
        }
        if(this._boat1.offsetTop <= 0) {
            console.log('boat krijgt een nieuwe vector, boven weg');
            newspeed =  this.boat1object.speed.mirror_X();
        }
        if((this._boat1.offsetTop + this._boat1.height + 10) >= this._window.windowHeight) {
            console.log('boat krijgt een nieuwe vector, onder weg');
            newspeed =  this.boat1object.speed.mirror_X();
        }
        this.boat1object.speed = newspeed;
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
