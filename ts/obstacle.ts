/**
 * Created by giorgio on 24-05-17.
 */
class Obstacle {
    public _el: any = document.createElement('img');
    private _baseUrl: string = './assets/images/obstacle/';
    private _imageName: string;
    public _name: string;

    position: Vector;
    speed: Vector;


    constructor(name: string, imageName: string, speed = new Vector(5,5)) {
        this._name = name;
        this._imageName = imageName;
        const game = document.querySelector('.container');
        this._el.setAttribute('src', this._baseUrl + this._imageName);
        this._el.className = 'obstacle';
        game.appendChild(this._el);

        // this.html = this._el;
        let rect = this._el.getBoundingClientRect();
        // console.log(rect);
        this.position = new Vector(0, 200);
        this.speed = speed;
    }


    public move() {

        // let displacement = this.speed.scale(interval);

        this.position = this.position.add(this.speed);


        // if(winddirection > 0 &&  winddirection < 90) {
        //     this._xPos += windspeed * 2;
        //     this._yPos += windspeed * 2;
        //     // this._game._wind._windDirection = winddirection;
        // } else if (winddirection > 90 && winddirection < 180){
        //     this._xPos += windspeed * 2;
        //     this._yPos -= windspeed * 2;
        //     // this._game._wind._windDirection = winddirection;
        // } else if (winddirection > 180 && winddirection < 270){
        //     this._xPos -= windspeed * 2;
        //     this._yPos -= windspeed * 2;
        //     // this._game._wind._windDirection = winddirection;
        // } else if (winddirection > 270 && winddirection < 360){
        //     this._xPos -= windspeed * 2;
        //     this._yPos += windspeed * 2;
        //     // this._game._wind._windDirection = winddirection;
        // }

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

