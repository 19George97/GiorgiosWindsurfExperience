/**
 * Created by giorgio on 24-05-17.
 */
class Obstacle {
    private _el: any = document.createElement('img');
    private _baseUrl: string = './assets/images/obstacle/';
    private _imageName: string;
    private _name: string;
    position: Vector;
    speed: Vector;


    constructor(name: string, imageName: string, speed: Vector) {
        this._name = name;
        this._imageName = imageName;
        const game = document.querySelector('.container');
        this._el.setAttribute('src', this._baseUrl + this._imageName);
        this._el.className = 'obstacle';
        game.appendChild(this._el);

        // this.html = this._el;
        let rect = this._el.getBoundingClientRect();
        // console.log(rect);
        console.log(game.clientWidth);
        this.position = new Vector(Math.floor(Math.random() * game.clientWidth), Math.floor(Math.random() * game.clientHeight));
        this.speed = speed;
    }


    public move() {
        this.position = this.position.add(this.speed);
    }

    /**
     * Render coordinates on the Dom
     */
    public render(){
        this._el.style.bottom = this.position.y() + 'px';
        this._el.style.left = this.position.x() + 'px';
        this._el.style.zIndex = 1000;
    }

    /**
     * Get the Element (DOM) representation
     * @return {any} The el value
     */
    get el(): any{
        return this._el;
    }

}

