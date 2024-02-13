class SkeletonMage {
    constructor(game, mickey, x, y, move, lifespan) {
        this.game = game;
        this.mickey = mickey;
    
        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.w = 50;
        this.h = 50;
        this.speed = 1; // must be at least 1
        this.drag = -1 / this.speed; // dont question

        this.totalElapsed = 0;
        this.elapsedTime = 0;
        this.frameCount = 2;
        this.frameDuration = 0.3;

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/skeletonmage.png");
        this.totalTime = this.frameCount * this.frameDuration;
        this.xStart = 1;
        this.yStart = 48;
        this.width = 32;
        this.height = 46;

        // attributes
        this.currentHP = 100;
        this.collideDmg = 2;
        this.fireBallDmg = 10;
        this.shootingRange = 400;

        this.fireballDelay = 3; // Delay in seconds before firing another FireBall
        this.timeSinceLastFireball = 0; // Track time since the last FireBall was fired

        // for formations
        if (move) {
            this.moveVec = new Vector2(move.x, move.y);
            this.updateFacing();
        }
        this.lifespan = lifespan ? lifespan : null;

        //Rectangle bounding box
        this.offsetBB = { x: 5, y: 0, w: -13, h: 0 };
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, this.w + this.offsetBB.w, this.h + this.offsetBB.h);
    };

    checkCollision() {
        // collision with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity, this.speed + 1);
            }
        });
        // collision with other enemies
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB) && entity !== this && entity !== this.mickey && !(entity instanceof Gem)) {
                this.handleCollision(entity, 0.75);
            }
            // colliding with mickey and attacking mickey
            if (entity == this.mickey && this.BB.collideBB(entity.BB)) {
                this.mickey.takeDamage(this.collideDmg);
            }
        });
    }

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

    updateFacing() {
        if (this.pos.x - this.mickey.x - 25 > 0) {
            // Flip the sprite if moving left
            this.xStart = 1;
            this.yStart = 48;
        } else {
            // Do not flip the sprite if moving right
            this.xStart = 1;
            this.yStart = 96;
        }
    }

    update() {
        if (this.lifespan){
            if (this.totalElapsed > this.lifespan) {
                this.removeFromWorld = true;
                return;
            } else {
                this.totalElapsed += this.game.clockTick;
            }
        }

        let toMickey = this.mickey.BB.center().sub(this.BB.center());
        const distance = toMickey.mag();

        if (this.moveVec) {
            this.applyForce(this.moveVec);
        } else {
            // applies force to move towards center of mickey
            this.applyForce(toMickey.norm());
        }

        // drag force to limit velocity
        let v = this.vel.mag();
        if (v !== 0) {
            this.applyForce(this.vel.norm().mul(this.drag * v));
        }

        // fire ball shooting 
        // Check if enough time has passed to fire another FireBall
        if (this.timeSinceLastFireball >= this.fireballDelay && distance <= this.shootingRange) {
            this.game.addAttackEntity(new FireBall(this.game, this, this.mickey));
            this.timeSinceLastFireball = 0; // Reset the timer
        } else {
            this.timeSinceLastFireball += this.game.clockTick; // Increment the timer
        }

        if (this.currentHP <= 0) {
            this.game.addEntity(new Gem(this.game, this.mickey, this.pos.x, this.pos.y, 2));
            this.mickey.enemiesCounter++;
            this.removeFromWorld = true;
        }

        this.updateFacing();
        this.checkCollision();
        // this should be last thing to update
        this.move();
    };

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            this.pos.x - this.game.cameraX, this.pos.y - this.game.cameraY,
            this.w, this.h);

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };
};

class FireBall {
    constructor(game, skeletonMage, mickey) {
        Object.assign(this, { game, skeletonMage, mickey });

        this.x = this.skeletonMage.pos.x;
        this.y = this.skeletonMage.pos.y;
        this.w = 50;
        this.h = 50;

        this.targetX = this.mickey.x + this.mickey.width / 4;
        this.targetY = this.mickey.y + this.mickey.height / 4;

        this.dx = this.targetX - this.x;
        this.dy = this.targetY - this.y;

        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        this.dx /= this.distance;
        this.dy /= this.distance;

        this.speed = 3;

        this.elapsedTime = 0;
        this.frameDuration = 0.3;
        this.frameCount = 5;
        this.totalTime = this.frameCount * this.frameDuration;

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/attack/Fireball.png");
        this.xStart = 0;
        this.yStart = 145;
        this.width = 133;
        this.height = 105;

        this.timer = 0;
        this.totalAllowedTime = 5;

        // Rectangle bounding box
        this.offsetBB = { x: 10, y: 15, w: -20, h: -20 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.w + this.offsetBB.w, this. h + this.offsetBB.h);
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        this.elapsedTime += this.game.clockTick;
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);

        this.timer += this.game.clockTick;
        if (this.timer >= this.totalAllowedTime) {
            this.removeFromWorld = true; 
        }

        if (this.BB.collideBB(this.mickey.BB)) {
            this.mickey.takeDamage(this.skeletonMage.fireBallDmg);
            this.removeFromWorld = true; 
        }
    }

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            this.x - this.game.cameraX, this.y - this.game.cameraY,
            this.w, this.h);

        if (PARAMS.DEBUG) {
            this.BB.draw(ctx, this.game);
        }
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }
}

