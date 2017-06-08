/** Class representing a surfer */
class surfer {
  public _el: any = document.createElement('img');
  private _className: string = 'surfer';
  private _baseUrl: string = './assets/images/'
  private _imageName: string;
  private _xPos: number = 700;
  private _yPos: number = 400;
  private _keyboardListener: KeyListener;

  position: Vector;
  speed: Vector;


  /**
   * Create a plane
   * @param {string} img - representing a image
   */
  constructor(img: string) {
    this._imageName = img;
    //creating a Dom Element
    const game = document.querySelector('.container');
    this._el.setAttribute('src', this._baseUrl + this._imageName);
    this._el.className = 'surfer';
    game.appendChild(this._el);
    this._keyboardListener = new KeyListener(); //append a keyboardListener
  }

  /**
   * Move a plane
   */
  public move(windspeed: number, winddirection: number) {
    const currentMovement = this._keyboardListener.keyevents; //could be loosely coupled by pubsub system
    const button = this._keyboardListener; //could be loosely coupled by pubsub system

    // links of recht bewegen door de wind
    if(winddirection > 0 &&  winddirection < 90) {
      this._xPos += windspeed;
      this._yPos += windspeed;
    } else if (winddirection > 90 && winddirection < 180){
      this._xPos += windspeed;
      this._yPos -= windspeed;
    } else if (winddirection > 180 && winddirection < 270){
      this._xPos -= windspeed;
      this._yPos -= windspeed;
    } else if (winddirection > 270 && winddirection < 360){
      this._xPos -= windspeed;
      this._yPos += windspeed;
    }

    if (button.keyRight){
      this._el.classList = 'surfer surferright';
      this._xPos += 10;
    }
    if (button.keyLeft){
      this._el.classList = 'surfer surferleft';
      this._xPos -= 10;
    }
    if (button.keyUp) {
      this._el.classList = 'surfer';
      this._yPos += 10;
    }
    if (button.keyDown) {
      this._el.classList = 'surfer surferdown';
      this._yPos -= 10;
    }
  }

  /**
   * Render coordinates on the Dom
   */
  public render(){
    this._el.style.bottom = this._yPos + 'px';
    this._el.style.marginLeft = this._xPos + 'px';
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
