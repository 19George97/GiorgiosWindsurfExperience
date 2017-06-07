/**
 * This class represents the main game window. Responsible to know its size. This is placed in a
 * separate class becaus detecting window size can be tricky and browser dependent.
 *
 * Some parts of this class are pretty complex, but the class itself is fairly easy to use.
 *
 * @author BugSlayer
 */
class WindowListener
{

	private _windowHeight: number;
	private _windowWidth: number;

	/**
	 * Constructs a new WindowListener
	 */
    constructor()
    {
        this.listen(0);
    }

    /**
     * Listen to the window state.
     *
     * @param interval the time interval between this call and the previous
     */
    public listen(interval: number) : void
    {
        // Taken from some StackOverflow discussion
    		// http://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    		//IE
    		if(!window.innerWidth){
    		    if(!(document.documentElement.clientWidth == 0)){
    		        //strict mode
    		        this._windowWidth = document.documentElement.clientWidth;
								this._windowHeight = document.documentElement.clientHeight;
    		    } else{
    		        //quirks mode
    		        this._windowWidth = document.body.clientWidth;
    		        this._windowHeight = document.body.clientHeight;
    		    }
    		} else {
    		    //w3c
    		    this._windowWidth = window.innerWidth;
						this._windowHeight = window.innerHeight;
    		}
    }

		/**
	  * Get the height of the window
	  * @return {number} The windowHeight value
	  */
		get windowHeight(): number{
			return this._windowHeight;
		}

		/**
	  * Get the width of the window
	  * @return {number} The windowWidth value
	  */
		get windowWidth(): number{
			return this._windowWidth;
		}

}
