class Bird {
    constructor(game, mickey, x, y) {
        this.game = game;
        this.mickey = mickey;

        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.w = 50;
        this.h = 50;
        this.speed = 2;
        this.drag = -1 / (this.speed); // dont question

        this.elapsedTime = 0;
        this.frameCount = 7;
        this.frameDuration = 0.1;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/bird.png");
        this.spritesheet1 = ASSET_MANAGER.getAsset("./assets/enemy/bird1.png");
        this.xStart = 0;
        this.yStart = 160;
        this.width = 159;
        this.height = 160;

        this.currentHP = 100;

        this.flip = 0;

        //Rectangle bounding box
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.BB = new BoundingBox(this.game, x + this.offsetBB.x, y + this.offsetBB.y, this.w + this.offsetBB.w, this.h + this.offsetBB.h);
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
                this.mickey.takeDamage(5);
            }
        });

        // facing
        if (this.pos.x - this.mickey.x - 35 > 0) {
            this.flip = 1; // Flip the sprite if moving left
            this.xStart = 1120;
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