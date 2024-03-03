// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;
        this.delta = 0;
        this.desiredFps = 60;
        this.now = 0;
        this.past = Date.now();
        this.framesPerMs = 1000 / this.desiredFps;

        // Everything that will be updated and drawn each frame
        this.entityDistances = [];
        this.renderOrder = [];

        this.entities = [];
        this.backgroundEntities = [];
        this.attackEntities = [];
        this.otherEntities = [];
        this.background = null;

        this.transition = null;
        this.upgrade = null;

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};
        this.left = false;
        this.right = false;
        this.down = false;
        this.up = false;
        this.dash = false;

        this.cameraX = 0;
        this.cameraY = 0;
        this.pausable = false;
        this.pause = false;
        this.showPause = true;
        this.fps = 0;
        this.lastFps = 0;
        this.elapsed = 0;

        // Options and the Details
        this.options = options || {
            debugging: false,
            pause: false
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        this.keyboardActive = false;
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y, radius: 0 };
        }
        function mouseListener(e) {
            that.mouse = getXandY(e);
        }
        function mouseClickListener(e) {
            that.click = getXandY(e);
            // if (PARAMS.DEBUG) console.log(that.click);
        }
        function wheelListener(e) {
            e.preventDefault(); // Prevent Scrolling
            that.wheel = e.deltaY;
        }
        function keydownListener(e) {
            that.keyboardActive = true;
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
                case "Space":
                    that.dash = true;
                    break;
            }
        }
        function keyUpListener(e) {
            that.keyboardActive = false;
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
                case "Escape":
                    that.pause = that.pausable ? !that.pause : that.pause;
                    break;
            }
        }

        that.mousemove = mouseListener;
        that.leftclick = mouseClickListener;
        that.wheelscroll = wheelListener;
        that.keydown = keydownListener;
        that.keyup = keyUpListener;

        this.ctx.canvas.addEventListener("mousemove", that.mousemove, false);

        this.ctx.canvas.addEventListener("click", that.leftclick, false);

        this.ctx.canvas.addEventListener("wheel", that.wheelscroll, false);

        this.ctx.canvas.addEventListener("keydown", that.keydown, false);

        this.ctx.canvas.addEventListener("keyup", that.keyup, false);
    };

    addEntityDistances(entity, distance) {
        this.entityDistances.push({ e: entity, dist: distance });
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    addBackgroundEntity(entity) {
        this.backgroundEntities.push(entity);
    };

    addAttackEntity(entity) {
        this.attackEntities.push(entity);
    };

    addOtherEntity(entity) {
        this.otherEntities.push(entity);
    };

    update() {
        if (this.transition) {
            this.transition.update();
            return;
        } 
        else if (this.upgrade) this.upgrade.update();
        if (this.pause) return; // don't update if paused 
        
        this.entityDistances.length = 0;
        this.renderOrder.length = 0;

        this.camera.update();

        const entitiesCount = this.entities.length;
        const attackEntitiesCount = this.attackEntities.length;
        const otherEntitiesCount = this.otherEntities.length;
        let i;

        // updating entities, execpt for mickey, which is at index 0
        for (i = entitiesCount - 1; i > 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities[i] = this.entities[this.entities.length - 1];
                this.entities.length--;
            } else {
                this.entities[i].update();
                this.renderOrder.push({ y: this.entities[i].BB.y, e: this.entities[i] });
            }
        }
        // updating attacks
        for (i = attackEntitiesCount - 1; i >= 0; --i) {
            if (this.attackEntities[i].removeFromWorld) {
                this.attackEntities[i] = this.attackEntities[this.attackEntities.length - 1];
                this.attackEntities.length--;
            } else {
                this.attackEntities[i].update();
            }
        }
        // updating gems
        for (i = otherEntitiesCount - 1; i >= 0; --i) {
            if (this.otherEntities[i].removeFromWorld) {
                this.otherEntities[i] = this.otherEntities[this.otherEntities.length - 1];
                this.otherEntities.length--;
            } else {
                this.otherEntities[i].update();
            }
        }

        // proximity sorting
        this.entityDistances.sort((a, b) => a.dist - b.dist);

        // update mickey last
        if (this.entities[0]) {
            if (this.entities[0].removeFromWorld) this.entities.length = 0;
            else {
                this.entities[0].update();
                this.renderOrder.push({ y: this.entities[0].BB.y, e: this.entities[0] });
            }
        }

        // y-sorting
        this.backgroundEntities.forEach(be => {
            this.renderOrder.push({ y: be.BB.y, e: be });
        });
        this.renderOrder.sort((a, b) => a.y - b.y);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        if (this.transition) {
            this.transition.draw(this.ctx);
        } else if (this.background) {
            this.background.draw(this.ctx);
        }

        let i;

        // Draw latest gem entities things first
        for (i = this.otherEntities.length - 1; i >= 0; i--) {
            this.otherEntities[i].draw(this.ctx, this);
        }

        // draw entities and background entities by their y-value
        this.renderOrder.forEach(order => {
            order.e.draw(this.ctx, this);
        });

        // Draw latest attack entities things first
        for (i = this.attackEntities.length - 1; i >= 0; i--) {
            this.attackEntities[i].draw(this.ctx, this);
        }


        this.camera.draw(this.ctx);

        if (this.pause && this.showPause) {
            this.ctx.font = '50px Arial';
            this.ctx.fillStyle = rgba(0, 0, 0, 0.5);
            this.ctx.fillText("PAUSED", PARAMS.WIDTH / 2, PARAMS.HEIGHT / 2);
        }

        if (this.upgrade) {
            this.upgrade.draw(this.ctx);
        }
        // fps counter
        if (PARAMS.DEBUG) {
            this.ctx.textAlign = "left";
            this.ctx.font = '16px Arial';
            this.ctx.fillStyle = rgb(0, 0, 0);
            this.ctx.strokeStyle = 'black';
            this.ctx.text
            this.ctx.fillText("FPS: " + this.lastFps, 5, 16);
            this.ctx.fillText("Entities: " + this.entities.length, 5, 32);
            this.ctx.fillText("Attacks: " + this.attackEntities.length, 5, 48);
            this.ctx.fillText("Time: " + Math.floor(this.camera.spawnmanager.elapsed), 5, 64);
            this.ctx.fillText("X: " + this.camera.mickey.x + " Y:" + this.camera.mickey.y, 5, 80);
            this.ctx.textAlign = "center";

            if (this.elapsed >= 1) {
                this.lastFps = this.fps;
                this.elapsed = 0;
                this.fps = 0;
            }

            this.fps++;
            this.elapsed += this.clockTick;
        }
    };

    loop() {
        this.now = Date.now();
        this.delta += (this.now - this.past) / this.framesPerMs;
        this.past = this.now;

        while (this.delta >= 1) {
            this.delta--;
            this.clockTick = this.timer.tick();
            // console.log(this.clockTick);
            this.update();
            this.draw();
            this.click = null;
        }
    };

};

// KV Le was here :)