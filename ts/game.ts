/** Class representing a Game */
class Game{
  private _el : Element = document.querySelector('.container');
  private _surfer : surfer;
  private _wind : wind;
  // private _zboat : zboat;
  private _obstacles: Array<Obstacle>;
  private _windowListener: WindowListener;
  private _collision: Collision;
  private _gameOver: boolean = false;

  /**
   * Create a game
   */
  constructor(){
    this._surfer = new surfer('windsurfert.png');
    this._wind = new wind('direction.png');
    // this._zboat = new zboat('Belgen in boot', 'zeilboot.png');
    this._windowListener = new WindowListener();
    this._collision = new Collision(this);
    this._obstacles = this.createObstacles();
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

  private createObstacles() {
    return this._obstacles = [
      new zboat('Belgen in boot', 'zeilboot.png', new Vector(-1, 3)),
      new zboat('Duitsers in boot', 'zeilboot.png', new Vector(-2, 1)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(-2, 2)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(2, 1)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(-2, 3)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(-2, 0)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(-2, 2)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(-2, 1)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(-2, 3)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(1, 2)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(0, 2)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(2, 2)),
      new zboat('Nederlanders in boot', 'zeilboot.png', new Vector(-2, 2)),
      new zboat('Belgen in boot', 'zeilboot.png', new Vector(-4, 2)),
      new shark('Shark', 'fin.png', new Vector(1,-3)),
      new shark('Shark', 'fin.png', new Vector(1,-3)),
      new shark('Shark', 'fin.png', new Vector(-2,-1)),
      new shark('Shark', 'fin.png', new Vector(-2,-2)),
      new shark('Shark', 'fin.png', new Vector(-2,-1)),
      new shark('Shark', 'fin.png', new Vector(-1,-2)),
      new shark('Shark', 'fin.png', new Vector(-3,-2)),
      new shark('Shark', 'fin.png', new Vector(1,-3)),
      new shark('Shark', 'fin.png', new Vector(0,-2)),
    ]
  }

  /**
   * Render the game objects
   */
  public render(){
    this._surfer.render();
    this._wind.render();
    for(let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].render();
    }
  }

  /**
   * Move all game objects
   */
  public moveSurfer(windspeed : number, winddirection : number){
    this._surfer.move(windspeed, winddirection);
  }

  public moveObstacle(){
    for(let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].move();
    }
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

  get obstacles(): Array<Obstacle> {
    return this._obstacles;
  }

  /**
   * Get the windowListener
   * @return {WindowListener} The windowListener value
   */
  get windowListener(): WindowListener{
    return this._windowListener;
  }

}
