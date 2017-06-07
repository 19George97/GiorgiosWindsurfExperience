/** Class representing a keyboardListener */
class KeyListener
{
    private _keyevents : any = {left:false, right:false, up:false} //should be dynamic

    private _keyUp : any = false;
    private _keyDown : any = false;
    private _keyLeft : any = false;
    private _keyRight : any = false;
    // private _key

    /**
     * Create a keyboardListener
     */
    constructor() {
        window.addEventListener("keydown", this.keyUpDownHandler);
        window.addEventListener("keyup", this.keyUpDownHandler);
    }

    /**
     * Keyboard handler
     * @param {KeyboardEvent} e - event object
     */
    private keyUpDownHandler = (e : KeyboardEvent) => {


        if(e.type == 'keydown'){
            if (e.key == 'ArrowLeft') this._keyLeft = true;
            else if (e.key == 'ArrowUp') this._keyUp = true;
            else if (e.key == 'ArrowRight') this._keyRight = true;
            else if (e.key == 'ArrowDown') this._keyDown = true;
        }

        if(e.type == 'keyup'){
            if (e.key == 'ArrowLeft') this._keyLeft = false;
            else if (e.key == 'ArrowUp') this._keyUp = false;
            else if (e.key == 'ArrowRight') this._keyRight = false;
            else if (e.key == 'ArrowDown') this._keyDown = false;
        }

    };

    /**
     * Get the keyevents
     * @return {any} The keyevent value
     */
    get keyevents(): any{
        return this._keyevents;
    }


    get keyUp(): any {
        return this._keyUp;
    }

    get keyLeft(): any {
        return this._keyLeft;
    }

    get keyRight(): any {
        return this._keyRight;
    }

    get keyDown(): any {
        return this._keyDown;
    }
}
