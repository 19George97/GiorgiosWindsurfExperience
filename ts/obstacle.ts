/**
 * Created by giorgio on 24-05-17.
 */
class Obstacle {
    public _el: any = document.createElement('img');
    private _className: string = 'obstacle';
    private _baseUrl: string = './assets/images/obstacle/';
    private _imageName: string;
    //private _xPos: number = 150;
    private _xPos: number = 0;
    private _yPos: number = 350;
    public _name: string;
    public lastDirection: number;


    constructor(name: string, imageName: string) {
        this._name = name;
        this._imageName = imageName;
        const game = document.querySelector('.container');
        this._el.setAttribute('src', this._baseUrl + this._imageName);
        this._el.className = 'obstacle';
        game.appendChild(this._el);
    }


    public move(windspeed: number, winddirection: number) {
        // links of recht bewegen door de wind
        if(winddirection > 0 &&  winddirection < 90) {
            this._xPos += windspeed * 2;
            this._yPos += windspeed * 2;
            this.lastDirection = winddirection;
        } else if (winddirection > 90 && winddirection < 180){
            this._xPos += windspeed * 2;
            this._yPos -= windspeed * 2;
            this.lastDirection = winddirection;
        } else if (winddirection > 180 && winddirection < 270){
            this._xPos -= windspeed * 2;
            this._yPos -= windspeed * 2;
            this.lastDirection = winddirection;
        } else if (winddirection > 270 && winddirection < 360){
            this._xPos -= windspeed * 2;
            this._yPos += windspeed * 2;
            this.lastDirection = winddirection;
        }
        console.log('new lastdirection ' + this.lastDirection);
    }



    /**
     * Render coordinates on the Dom
     */
    public render(){
        this._el.style.bottom = this._yPos + 'px';
        this._el.style.left = this._xPos + 'px';
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

