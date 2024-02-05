class Huskydog {
    constructor(game, mickey, x, y) {
        this.game = game;
        this.mickey = mickey;

        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.w = 50;
        this.h = 50;
        this.speed = 1.5;
        this.drag = -1 / (this.speed); // dont question

        this.elapsedTime = 0;
        this.frameCount = 5;
        this.frameDuration = 0.1;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png");
        this.spritesheet1 = ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png");
        this.xStart = 0;
        this.yStart = 61;
        this.width = 90;
        this.height = 60;

        this.currentHP = 100;

        this.flip = 0;

        //Rectangle bounding box
        this.offsetBB = { x: 3, y: 3, w: -3, h: -3 };
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, this.w + this.offsetBB.w, this.h + this.offsetBB.h);
    };

    handleCollision(entity, scalarForce) {
        // basically treats other entity like a repelling force field
        let toEntityCenter = this.BB.center().sub(entity.BB.center()).norm().mul(scalarForce);
        this.applyForce(toEntityCenter);
    }

    move() {
        this.vel = this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel);
        // update bounding box
        this.BB.updateBB(this.pos.x + this.offsetBB.x, this.pos.y + this.offsetBB.y);
        // reset net accel
        this.acc = this.acc.mul(0);
    }

    applyForce(force) {
        // assume mass is 1, F = A
        this.acc = this.acc.add(force);
    }

    update() {
        // applies force to move towards center of mickey
        let toMickey = this.mickey.BB.center().sub(this.BB.center()).norm();
        this.applyForce(toMickey);

        // drag force to limit velocity
        let v = this.vel.mag();
        if (v !== 0) {
            this.applyForce(this.vel.norm().mul(this.drag * v));
        }

        // collision detection & resolution with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity, this.speed + 1);
            }
        });
        // collision detection & resolution with other enemmies
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB) && entity !== this && entity !== this.mickey) {
                this.handleCollision(entity, 0.75);
            }
            // colliding with mickey and attacking mickey
            if (entity == this.mickey && this.BB.collideBB(entity.BB)) {
                this.mickey.currentHP -= 1;
            }
        });

        if (this.pos.x - this.mickey.x - 30 > 0) {
            this.flip = 1; // Flip the sprite if moving left
            this.xStart = 445;
        } else {
            this.flip = 0; // Do not flip the sprite if moving right
            this.xStart = 0;
        }

        if (this.currentHP <= 0) {
            this.removeFromWorld = true;
        }

        // this should be last thing to update
        this.move();
    };

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        if (this.flip == 0) {
            ctx.drawImage(this.spritesheet,
                this.xStart + this.width * frame, this.yStart,
                this.width, this.height,
                this.pos.x - this.game.cameraX, this.pos.y - this.game.cameraY,
                this.w, this.h);
        }
        else if (this.flip == 1) {
            ctx.drawImage(this.spritesheet1,
                this.xStart - this.width * frame, this.yStart,
                this.width, this.height,
                this.pos.x - this.game.cameraX, this.pos.y - this.game.cameraY,
                this.w, this.h);
        }
        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};

class GiantHuskydog {
    constructor(game, mickey, x, y) {
        this.game = game;
        this.mickey = mickey;

        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.w = 150;
        this.h = 150;
        this.speed = 0.5;
        this.drag = -0.33 / (this.speed); // dont question

        this.elapsedTime = 0;
        this.frameCount = 5;
        this.frameDuration = 0.1;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png");
        this.spritesheet1 = ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png");
        this.xStart = 0;
        this.yStart = 61;
        this.width = 90;
        this.height = 60;

        this.MaxHP = 100;
        this.currentHP = 100;

        this.flip = 0;

        //Rectangle bounding box
        this.offsetBB = { x: 18, y: 14, w: -20, h: -20 };
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, this.w + this.offsetBB.w, this.h + this.offsetBB.h);

        this.dashTimer = 0;
        this.dashInterval = 5;  // Dash every 5 seconds
        this.isDashing = false;
    };

    handleCollision(entity, scalarForce) {
        // basically treats other entity like a repelling force field
        let toEntityCenter = this.BB.center().sub(entity.BB.center()).norm().mul(scalarForce);
        this.applyForce(toEntityCenter);
    }

    move() {
        this.vel = this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel);
        // update bounding box
        this.BB.updateBB(this.pos.x + this.offsetBB.x, this.pos.y + this.offsetBB.y);
        // reset net accel
        this.acc = this.acc.mul(0);
    }

    applyForce(force) {
        // assume mass is 1, F = A
        this.acc = this.acc.add(force);
    }

    update() {
        // applies force to move towards center of mickey
        let toMickey = this.mickey.BB.center().sub(this.BB.center()).norm();
        this.applyForce(toMickey);

        // drag force to limit velocity
        let v = this.vel.mag();
        if (v !== 0) {
            this.applyForce(this.vel.norm().mul(this.drag * v));
        }

        // collision detection & resolution with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity, this.speed + 1);
            }
        });
        // collision detection & resolution with other enemmies
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB) && entity !== this && entity !== this.mickey) {
                this.handleCollision(entity, 1);
            }
            // colliding with mickey and attacking mickey
            if (entity == this.mickey && this.BB.collideBB(entity.BB)) {
                this.mickey.currentHP -= 2;
            }
        });

        this.dashTimer += this.game.clockTick;
        if (this.dashTimer >= this.dashInterval) {
            // Start dashing towards Mickey
            this.isDashing = true;
            this.dashTimer = 0;  // Reset the timer
        }

        // Dash towards Mickey if it's currently dashing
        if (this.isDashing) {
            let dashForce = toMickey.mul(2);  // You can adjust the force multiplier as needed
            this.applyForce(dashForce);

            // You can also add logic to control the duration of the dash if needed

            // Reset the dash flag after a certain duration (e.g., 0.5 seconds)
            if (this.dashTimer >= 0.5) {
                this.isDashing = false;
            }
        }

        if (this.pos.x - this.mickey.x + 10 > 0) {
            this.flip = 1; // Flip the sprite if moving left
            this.xStart = 445;
        } else {
            this.flip = 0; // Do not flip the sprite if moving right
            this.xStart = 0;
        }

        if (this.currentHP <= 0) {
            this.removeFromWorld = true;
        }

        // this should be last thing to update
        this.move();
    };

    drawHealthBar(ctx){
        //drawing health box
        //--BACKGROUND FOR MAX HP
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 15, this.y - 8, 80, 10);

        //--Calculating Current HP and changing color with appropriate indicators for health percentage.
        let healthRatio = this.currentHP/this.MaxHP;
        let healthBarSize = 80 * healthRatio;
        if (healthRatio > 0.75) ctx.fillStyle = 'green';
        if (healthRatio <= 0.75) ctx.fillStyle = 'orange';
        if (healthRatio <= 0.50) ctx.fillStyle = 'red';
        if (healthRatio <= 0.25) ctx.fillStyle = 'maroon';
        if (healthRatio >= 0){ ctx.fillRect(this.x + 15, this.y - 8, healthBarSize, 10)}
        else {ctx.fillRect(this.x + 15, this.y - 8, 0, 10)}
    }

    drawHealthBar(ctx) {
        // Drawing health box
        ctx.fillStyle = 'black';
        ctx.fillRect(this.pos.x + 15, this.pos.y - 8, 120, 10);

        // Calculating current HP and changing color with appropriate indicators for health percentage.
        let healthRatio = this.currentHP / this.MaxHP;
        let healthBarSize = 120 * healthRatio;

        if (healthRatio > 0.75) ctx.fillStyle = 'green';
        else if (healthRatio > 0.50) ctx.fillStyle = 'orange';
        else if (healthRatio > 0.25) ctx.fillStyle = 'red';
        else ctx.fillStyle = 'maroon';

        if (healthRatio > 0) {
            ctx.fillRect(this.pos.x + 15, this.pos.y - 8, healthBarSize, 10);
        } else {
            ctx.fillRect(this.pos.x + 15, this.pos.y - 8, 0, 10);
        }
    }

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        if (this.flip == 0) {
            ctx.drawImage(this.spritesheet,
                this.xStart + this.width * frame, this.yStart,
                this.width, this.height,
                this.pos.x - this.game.cameraX, this.pos.y - this.game.cameraY,
                this.w, this.h);
        }
        else if (this.flip == 1) {
            ctx.drawImage(this.spritesheet1,
                this.xStart - this.width * frame, this.yStart,
                this.width, this.height,
                this.pos.x - this.game.cameraX, this.pos.y - this.game.cameraY,
                this.w, this.h);
        }
        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }

        // draw health bar
        this.drawHealthBar(ctx);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};