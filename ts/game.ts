/** Class representing a Game */
class Game{
  public _el : Element = document.querySelector('.container');
  private _surfer : surfer;
  public _wind : wind;
  private _zboat : zboat;
  private _windowListener: WindowListener;
  private _collision: Collision;
  public _gameOver: boolean = false;

  /**
   * Create a game
   */
  constructor(){
    this._surfer = new surfer('windsurfert.png');
    this._wind = new wind('direction.png');
    this._zboat = new zboat();
    this._windowListener = new WindowListener();
    this._collision = new Collision(this);
  }

  /**
   * start the game
   */
  private start(){
    this.loop();
  }

  /**
   * Game loop 60 frames per seconds
   */
  private loop = () => {
    this.render();
    if(this.collide() === true){
      this._gameOver = true;
    }
    this.checkBoatBoundaries();
    this.moveSurfer(this._wind.windspeed, this._wind._windDirection);
    this.moveObstacle();
    setTimeout(() => {
      if(!this._gameOver) this.loop()
    }, 1000/60
    );
  };

  /**
   * Render the game objects
   */
  public render(){
    this._surfer.render();
    this._wind.render();
    this._zboat.render();
  }

  /**
   * Move all game objects
   */
  public moveSurfer(windspeed : number, winddirection : number){
    console.log(windspeed+winddirection);
    this._surfer.move(windspeed, winddirection);
  }

  public moveObstacle(){
    this._zboat.move();
  }

  /**
   * Check collision of different game objects
   */
  private collide(){
    return this._collision.checkGameOver();
  }

  private checkBoatBoundaries(){
    return this._collision.boatOutOfBounds();
  }

  /**
   * Get the surfer
   * @return {surfer} The surfer value
   */
  get surfer(): surfer{
    return this._surfer;
  }


  get zboat(): zboat {
    return this._zboat;
  }

  /**
   * Get the windowListener
   * @return {WindowListener} The windowListener value
   */
  get windowListener(): WindowListener{
    return this._windowListener;
  }

}
