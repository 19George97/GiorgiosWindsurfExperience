/**
 * Created by giorgio on 21-05-17.
 */
class wind {
    private _elSpeed : any = document.getElementById('windspeed');
    private _elDirection : any = document.getElementById('winddirection');
    public _windspeed : number;
    public _windDirection : number;

    private _className: string = 'surfer';
    private _baseUrl: string = './assets/images/';
    private _imageName: string;
    private _el: any = document.createElement('img');


    constructor(img : string) {
        this._windspeed = this.generateWindspeed();
        this._elSpeed.innerText = this._windspeed;
        this._windDirection = this.generateWindDirection();
        this._elDirection.innerText = this._windDirection;

        this._imageName = img;
        const divwindarrow = document.querySelector('#windarrow');
        this._el.setAttribute('src', this._baseUrl + this._imageName);
        divwindarrow.appendChild(this._el);
        this._el.className = 'windarrow';
    }


    private generateWindspeed(){
        let speed = Math.round(Math.random() * 10);

        if(speed === 0)
            speed = 1;

        return speed = 3;
    }

    private generateWindDirection(){
        let degrees = Math.floor((Math.random() * 360) + 1);

        // let css = document.createElement("style");
        // css.type = "text/css";
        // css.innerHTML = "strong { color: red }";
        // document.body.appendChild(css);
        return degrees;
    }

    public render(){
        this._el.style.msTransform = 'rotate(' + this._windDirection + 'deg)';
        this._el.style.webkitTransform = 'rotate(' + this._windDirection + 'deg)';
        this._el.style.transform = 'rotate(' + this._windDirection + 'deg)';
        this._el.style.maxHeight = '200px';
    }

    get windspeed(): number {
        return this._windspeed;
    }

    //
    // get windDirection(): number {
    //     return this._windDirection;
    // }
}