class Goblin {
    constructor(game, mickey, x, y, move, lifespan) {
        this.game = game;
        this.mickey = mickey;

        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.w = 70;
        this.h = 40;
        this.speed = 1.5; // must be at least 1
        this.drag = -1 / this.speed; // dont question

        this.totalElapsed = 0;
        this.elapsedTime = 0;
        this.frameCount = 4;
        this.frameDuration = 0.1;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/goblinsmasher.png");
        this.xStart = 0;
        this.yStart = 0
        this.width = 32;
        this.height = 16;

        // attributes
        this.currentHP = 150;
        this.collideDmg = 2;

        this.flipLeft = false;

        // for formations
        if (move) {
            this.moveVec = new Vector2(move.x, move.y);
            this.updateFacing();
        }
        this.lifespan = lifespan ? lifespan : null;

        //Rectangle bounding box
        this.offsetBB = { x: 0, y: 0, w: -28, h: 0 };
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
        for (let i = this.game.entities.length - 1; i > 0; --i) {
            const entity = this.game.entities[i];
            if (entity !== this && !entity.removeFromWorld && this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity, 0.75);
            }
        }

        // colliding with mickey and attacking mickey
        if (this.BB.collideBB(this.mickey.BB)) {
            this.mickey.takeDamage(this.collideDmg);
        }
    }

    takeDamage(damage, knockbackMultiplier, knockbackForce) {
        this.currentHP -= damage;
        this.game.addOtherEntity(new DamageText(this.game, this, damage, 10, 30));
        // unless knockbackForce is specified damage will knock away from mickey
        if (knockbackForce) {
            this.applyForce(knockbackForce);
        } else {
            const toMickeyRev = this.BB.center().sub(this.mickey.BB.center()).norm();
            const c = knockbackMultiplier ? knockbackMultiplier : 0;
            this.applyForce(toMickeyRev.mul(c));
        }
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
        if (this.pos.x - this.mickey.x - 5 > 0) {
            this.flipLeft = true; // Flip the sprite if moving left
            this.xStart = 128;
            this.yStart = 17;
        } else {
            this.flipLeft = false; // Do not flip the sprite if moving right
            this.xStart = 0;
            this.yStart = 0;
        }
    }

    update() {

        if (this.lifespan) {
            if (this.totalElapsed > this.lifespan) {
                this.removeFromWorld = true;
                return;
            } else {
                this.totalElapsed += this.game.clockTick;
            }
        }

        let toMickey = this.mickey.BB.center().sub(this.BB.center());
        this.game.addEntityDistances(this, toMickey.mag());

        if (this.moveVec) {
            this.applyForce(this.moveVec);
        } else {
            // applies force to move towards center of mickey
            this.applyForce(toMickey.norm());
            this.updateFacing();
        }

        // drag force to limit velocity
        let v = this.vel.mag();
        if (v !== 0) {
            this.applyForce(this.vel.norm().mul(this.drag * v));
        }

        if (this.currentHP <= 0) {
            this.game.addOtherEntity(new Gem(this.game, this.mickey, this.pos.x, this.pos.y, 0));
            this.mickey.enemiesCounter++;
            this.removeFromWorld = true;
        }

        this.checkCollision();
        // this should be last thing to update
        this.move();
    };

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame * (this.flipLeft ? -1 : 1), this.yStart,
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