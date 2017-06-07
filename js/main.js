var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this._el = document.querySelector('.container');
        this._gameOver = false;
        this.loop = function () {
            _this.render();
            if (_this.collide() === true) {
                _this._gameOver = true;
            }
            _this.moveSurfer(_this._wind.windspeed, _this._wind.windDirection);
            setTimeout(function () {
                if (!_this._gameOver)
                    _this.loop();
            }, 1000 / 60);
        };
        this._surfer = new surfer('windsurfert.png');
        this._wind = new wind('direction.png');
        this._zboat = new zboat();
        this._windowListener = new WindowListener();
        this._collision = new Collision(this);
    }
    Game.prototype.start = function () {
        this.loop();
    };
    Game.prototype.render = function () {
        this._surfer.render();
        this._wind.render();
        this._zboat.render();
    };
    Game.prototype.moveSurfer = function (windspeed, winddirection) {
        this._surfer.move(windspeed, winddirection);
        this._zboat.move(windspeed, winddirection);
    };
    Game.prototype.collide = function () {
        return this._collision.checkCol();
    };
    Object.defineProperty(Game.prototype, "surfer", {
        get: function () {
            return this._surfer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "zboat", {
        get: function () {
            return this._zboat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "windowListener", {
        get: function () {
            return this._windowListener;
        },
        enumerable: true,
        configurable: true
    });
    return Game;
}());
var app = {};
(function () {
    var init = function () {
        app.game = new Game();
        app.game.start();
    };
    window.addEventListener('load', init);
})();
var Obstacle = (function () {
    function Obstacle(name, imageName) {
        this._el = document.createElement('img');
        this._className = 'obstacle';
        this._baseUrl = './assets/images/obstacle/';
        this._xPos = 0;
        this._yPos = 350;
        this._name = name;
        this._imageName = imageName;
        var game = document.querySelector('.container');
        this._el.setAttribute('src', this._baseUrl + this._imageName);
        this._el.className = 'obstacle';
        game.appendChild(this._el);
    }
    Obstacle.prototype.move = function (windspeed, winddirection) {
        if (winddirection > 0 && winddirection < 90) {
            this._xPos += windspeed * 2;
            this._yPos += windspeed * 2;
            this.lastDirection = winddirection;
        }
        else if (winddirection > 90 && winddirection < 180) {
            this._xPos += windspeed * 2;
            this._yPos -= windspeed * 2;
            this.lastDirection = winddirection;
        }
        else if (winddirection > 180 && winddirection < 270) {
            this._xPos -= windspeed * 2;
            this._yPos -= windspeed * 2;
            this.lastDirection = winddirection;
        }
        else if (winddirection > 270 && winddirection < 360) {
            this._xPos -= windspeed * 2;
            this._yPos += windspeed * 2;
            this.lastDirection = winddirection;
        }
        console.log('new lastdirection ' + this.lastDirection);
    };
    Obstacle.prototype.render = function () {
        this._el.style.bottom = this._yPos + 'px';
        this._el.style.left = this._xPos + 'px';
        this._el.style.zIndex = 1000;
    };
    Object.defineProperty(Obstacle.prototype, "el", {
        get: function () {
            return this._el;
        },
        enumerable: true,
        configurable: true
    });
    return Obstacle;
}());
var surfer = (function () {
    function surfer(img) {
        this._el = document.createElement('img');
        this._className = 'surfer';
        this._baseUrl = './assets/images/';
        this._xPos = 150;
        this._yPos = 400;
        this._imageName = img;
        var game = document.querySelector('.container');
        this._el.setAttribute('src', this._baseUrl + this._imageName);
        this._el.className = 'surfer';
        game.appendChild(this._el);
        this._keyboardListener = new KeyListener();
    }
    surfer.prototype.move = function (windspeed, winddirection) {
        var currentMovement = this._keyboardListener.keyevents;
        var button = this._keyboardListener;
        if (button.keyRight) {
            this._el.classList = 'surfer surferright';
            this._xPos += 7;
        }
        if (button.keyLeft) {
            this._el.classList = 'surfer surferleft';
            this._xPos -= 7;
        }
        if (button.keyUp) {
            this._el.classList = 'surfer';
            this._yPos += 5;
        }
        if (button.keyDown) {
            this._el.classList = 'surfer surferdown';
            this._yPos -= 5;
        }
    };
    surfer.prototype.render = function () {
        this._el.style.bottom = this._yPos + 'px';
        this._el.style.marginLeft = this._xPos + 'px';
        this._el.style.zIndex = 1000;
    };
    Object.defineProperty(surfer.prototype, "el", {
        get: function () {
            return this._el;
        },
        enumerable: true,
        configurable: true
    });
    return surfer;
}());
var wind = (function () {
    function wind(img) {
        this._elSpeed = document.getElementById('windspeed');
        this._elDirection = document.getElementById('winddirection');
        this._className = 'surfer';
        this._baseUrl = './assets/images/';
        this._el = document.createElement('img');
        this._windspeed = this.generateWindspeed();
        this._elSpeed.innerText = this._windspeed;
        this._windDirection = this.generateWindDirection();
        this._elDirection.innerText = this._windDirection;
        this._imageName = img;
        var divwindarrow = document.querySelector('#windarrow');
        this._el.setAttribute('src', this._baseUrl + this._imageName);
        divwindarrow.appendChild(this._el);
        this._el.className = 'windarrow';
    }
    wind.prototype.generateWindspeed = function () {
        var speed = Math.round(Math.random() * 10);
        if (speed === 0)
            speed = 1;
        return speed = 3;
    };
    wind.prototype.generateWindDirection = function () {
        var degrees = Math.floor((Math.random() * 360) + 1);
        return degrees;
    };
    wind.prototype.render = function () {
        this._el.style.msTransform = 'rotate(' + this._windDirection + 'deg)';
        this._el.style.webkitTransform = 'rotate(' + this._windDirection + 'deg)';
        this._el.style.transform = 'rotate(' + this._windDirection + 'deg)';
        this._el.style.maxHeight = '200px';
    };
    Object.defineProperty(wind.prototype, "windspeed", {
        get: function () {
            return this._windspeed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(wind.prototype, "windDirection", {
        get: function () {
            return this._windDirection;
        },
        enumerable: true,
        configurable: true
    });
    return wind;
}());
var zboat = (function (_super) {
    __extends(zboat, _super);
    function zboat() {
        return _super.call(this, 'Belgen in boot', 'zeilboot.png') || this;
    }
    return zboat;
}(Obstacle));
var Collision = (function () {
    function Collision(game) {
        this._el = document.createElement('div');
        this._game = game;
        this._surfer = this._game.surfer._el;
        this._boat1 = this._game.zboat._el;
        this.boat1object = this._game.zboat;
        this._window = this._game.windowListener;
    }
    Collision.prototype.checkCol = function () {
        this.boatOutOfBounds();
        if (this.boatSurferCollision() || this.surferOutOfBounds()) {
            var game = document.querySelector('.container');
            this._el.className = 'collisiontrue';
            this._el.innerText = 'YOU FAILED';
            this._el.setAttribute('style', 'z-index: 5; font-size: 75px; background-color: red; opacity: .8; width:' + this._window.windowWidth + 'px; height: ' + this._window.windowHeight + 'px;');
            game.appendChild(this._el);
            return true;
        }
        return false;
    };
    Collision.prototype.boatSurferCollision = function () {
        if (this._surfer.offsetLeft + this._surfer.width >= this._boat1.offsetLeft && this._surfer.offsetLeft <= this._boat1.offsetLeft + this._boat1.width) {
            if (this._surfer.offsetTop + this._surfer.height >= this._boat1.offsetTop && this._surfer.offsetTop <= this._boat1.offsetTop + this._boat1.height) {
                return true;
            }
        }
        return false;
    };
    Collision.prototype.boatOutOfBounds = function () {
        console.log('boat gaat altijd voor debuggen weg');
        console.log(this.boat1object.lastDirection);
        this.boat1object.move(3, (this.boat1object.lastDirection / 2));
    };
    Collision.prototype.surferOutOfBounds = function () {
        if (this._surfer.offsetLeft <= 0) {
            return true;
        }
        if ((this._surfer.offsetLeft + this._surfer.width + 15) >= this._window.windowWidth) {
            return true;
        }
        if (this._surfer.offsetTop <= 0) {
            return true;
        }
        if ((this._surfer.offsetTop + this._surfer.height + 10) >= this._window.windowHeight) {
            return true;
        }
        return false;
    };
    return Collision;
}());
var KeyListener = (function () {
    function KeyListener() {
        var _this = this;
        this._keyevents = { left: false, right: false, up: false };
        this._keyUp = false;
        this._keyDown = false;
        this._keyLeft = false;
        this._keyRight = false;
        this.keyUpDownHandler = function (e) {
            if (e.type == 'keydown') {
                if (e.key == 'ArrowLeft')
                    _this._keyLeft = true;
                else if (e.key == 'ArrowUp')
                    _this._keyUp = true;
                else if (e.key == 'ArrowRight')
                    _this._keyRight = true;
                else if (e.key == 'ArrowDown')
                    _this._keyDown = true;
            }
            if (e.type == 'keyup') {
                if (e.key == 'ArrowLeft')
                    _this._keyLeft = false;
                else if (e.key == 'ArrowUp')
                    _this._keyUp = false;
                else if (e.key == 'ArrowRight')
                    _this._keyRight = false;
                else if (e.key == 'ArrowDown')
                    _this._keyDown = false;
            }
        };
        window.addEventListener("keydown", this.keyUpDownHandler);
        window.addEventListener("keyup", this.keyUpDownHandler);
    }
    Object.defineProperty(KeyListener.prototype, "keyevents", {
        get: function () {
            return this._keyevents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyListener.prototype, "keyUp", {
        get: function () {
            return this._keyUp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyListener.prototype, "keyLeft", {
        get: function () {
            return this._keyLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyListener.prototype, "keyRight", {
        get: function () {
            return this._keyRight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyListener.prototype, "keyDown", {
        get: function () {
            return this._keyDown;
        },
        enumerable: true,
        configurable: true
    });
    return KeyListener;
}());
var WindowListener = (function () {
    function WindowListener() {
        this.listen(0);
    }
    WindowListener.prototype.listen = function (interval) {
        if (!window.innerWidth) {
            if (!(document.documentElement.clientWidth == 0)) {
                this._windowWidth = document.documentElement.clientWidth;
                this._windowHeight = document.documentElement.clientHeight;
            }
            else {
                this._windowWidth = document.body.clientWidth;
                this._windowHeight = document.body.clientHeight;
            }
        }
        else {
            this._windowWidth = window.innerWidth;
            this._windowHeight = window.innerHeight;
        }
    };
    Object.defineProperty(WindowListener.prototype, "windowHeight", {
        get: function () {
            return this._windowHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowListener.prototype, "windowWidth", {
        get: function () {
            return this._windowWidth;
        },
        enumerable: true,
        configurable: true
    });
    return WindowListener;
}());
//# sourceMappingURL=main.js.map