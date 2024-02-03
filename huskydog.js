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
        this.height = 58;

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
                this.mickey.takeDamage(5);
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
                this.pos.x, this.pos.y,
                this.w, this.h);
        }
        else if (this.flip == 1) {
            ctx.drawImage(this.spritesheet1,
                this.xStart - this.width * frame, this.yStart,
                this.width, this.height,
                this.pos.x, this.pos.y,
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
        this.speed = 1;
        this.drag = -1 / (this.speed); // dont question
        this.spdMul = 1;

        // actual sprite dimension for loading animations
        this.width = 90;
        this.height = 58;
        this.animations = [];
        this.loadAnimations();

        this.MaxHP = 100;
        this.currentHP = 100;
        this.collideDmg = 10;

        this.flip = 0;

        // change to be ingame dimension
        this.width = 150;
        this.height = 150;
        //Rectangle bounding box
        this.offsetBB = { x: 18, y: 14, w: -20, h: -20 };
        //this.offsetBB = { x: 3, y: 3, w: -3, h: -3 };
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);

        // attacks
        this.dashClock = new Clock(game, 5); // dash every 5 sec
        this.dashingClock = new Clock(game, 1); // how long to dash for (1 sec)
        this.isDashing = false;

        // roar blast
        this.barkClock = new Clock(game, 8); // Bark every 8 sec
        this.barkingClock = new Clock(game, 5); // how long bark lasts
        this.firingClock = new Clock(game, 0.5);
        this.isBarking = false;

        // jump attack
        this.jumpClock = new Clock(game, 5); // jump every 20 sec
        this.jumpingClock = new Clock(game, 0.6); // how long jumping lasts
        this.airBorneClock = new Clock(game, 2); // how long airborne lasts
        this.jumpY = 0;
        this.isJumping = false;
        this.isAirborne = false;
        this.isLanding = false;
        this.landCenter = null;
    };

    loadAnimations() {
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), this.width * 6, this.height, this.width, this.height, 6, 0.1, 0, false, true));
        // bark
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), this.width * 6, 0, this.width, this.height, 6, 0.2, 0, false, true));
        // dash
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), this.width * 6, this.height * 2, this.width, this.height, 5, 0.1, 0, false, true));
        // jump
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), this.width * 6, this.height * 5, this.width, this.height, 6, 0.1, 0, false, true));

        //reversed images
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), 0, this.height, this.width, this.height, 6, 0.1, 0, false, false));
        // bark
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), 0, 0, this.width, this.height, 6, 0.2, 0, false, false));
        // dash
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), 0, this.height * 2, this.width, this.height, 5, 0.1, 0, false, false));
        // jump
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), 0, this.height * 5, this.width, this.height, 6, 0.1, 0, false, false));
    }

    handleCollision(entity, scalarForce) {
        let toEntityCenter = this.BB.center().sub(entity.BB.center()).norm().mul(scalarForce);
        this.applyForce(toEntityCenter);
    }

    move() {
        this.vel = this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel.mul(this.spdMul));
        // update bounding box
        this.BB.updateBB(this.pos.x + this.offsetBB.x, this.pos.y + this.offsetBB.y);
        // reset net accel
        this.acc = this.acc.mul(0);
    }

    applyForce(force) {
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
        this.game.entities.forEach(entity => {
            if (entity !== this && entity !== this.mickey && this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity, 1);
            }
            // colliding with mickey and attacking mickey
            if (entity == this.mickey && this.BB.collideBB(entity.BB)) {
                this.mickey.takeDamage(this.collideDmg);
            }
        });

        // === attack events ===
        // this.barkClock.update();
        // this.dashClock.update();
        this.jumpClock.update();

        // bark attack
        if (!this.isDashing && !this.isBarking && !this.isJumping && this.barkClock.isDone()) {
            // Start barking towards Mickey
            this.isBarking = true;
            this.spdMul = 0.5;
        }
        else if (this.isBarking) {
            this.barkingClock.update();
            this.firingClock.update();

            if (this.firingClock.isDone()) {
                this.game.addAttackEntity(new Blast(
                    this.game, this.mickey, false, this.BB.center().x - (this.flip == 1 ? 70 : 0), this.BB.center().y - 50,
                    10, 5, 4, 1,             // attributes (dmg, spd, duration, pierce)
                    this.mickey.BB.center(), 0 // destination vector (x, y)
                ));
                this.game.addAttackEntity(new Blast(
                    this.game, this.mickey, false, this.BB.center().x - (this.flip == 1 ? 70 : 0), this.BB.center().y - 50,
                    10, 5, 4, 1,
                    this.mickey.BB.center(), degreeToRad(20)
                ));
                this.game.addAttackEntity(new Blast(
                    this.game, this.mickey, false, this.BB.center().x - (this.flip == 1 ? 70 : 0), this.BB.center().y - 50,
                    10, 5, 4, 1,
                    this.mickey.BB.center(), degreeToRad(-20)
                ));
                this.firingClock.reset();
            }

            if (this.barkingClock.isDone()) {
                this.isBarking = false;
                this.spdMul = 1;
                this.barkClock.reset();
                this.barkingClock.reset();
                this.firingClock.reset();
            }
        }

        // dash every 5 seconds
        if (!this.isDashing && !this.isBarking && !this.isJumping && this.dashClock.isDone()) {
            // Start dashing towards Mickey
            this.isDashing = true;
        }
        else if (this.isDashing) {
            this.dashingClock.update();

            let dashForce = toMickey.mul(4);  // You can adjust the force multiplier as needed
            this.applyForce(dashForce);

            // You can also add logic to control the duration of the dash if needed

            // Reset the dash flag after a certain duration (e.g., 1 seconds)
            if (this.dashingClock.isDone()) {
                this.isDashing = false;
                this.dashingClock.reset();
                this.dashClock.reset();
            }
        }

        // jump attack
        if (!this.isDashing && !this.isBarking && !this.isJumping && this.jumpClock.isDone()) {
            this.isJumping = true;
            this.spdMul = 0;
        } else if (this.isJumping) {
            this.jumpingClock.update();

            if (this.isLanding) {
                if (this.jumpY < 0) {
                    this.jumpY += 40;
                } else {
                    // attack end
                    this.jumpY = 0;
                    this.isJumping = false;
                    this.isLanding = false;
                    this.spdMul = 1;
                    this.collideDmg = 10;
                    
                    this.jumpClock.reset();
                    this.jumpingClock.reset();
                    this.airBorneClock.reset();
                }
            } else if (this.isAirborne) {
                this.airBorneClock.update();

                if (this.airBorneClock.isDone()) {
                    this.isLanding = true;
                    this.isAirborne = false;
                    this.pos.x = this.landCenter.x - this.width / 2;
                    this.pos.y = this.landCenter.y - this.height / 2;
                }
            } else if (this.jumpingClock.isDone()) {
                this.isAirborne = true;
                this.collideDmg = 0;
                this.landCenter = this.mickey.BB.center();
                this.game.addAttackEntity(new Warning(this.game, this.landCenter.x, this.landCenter.y, 300, 200, 2.2,
                        new Shockwave(
                            this.game, this.mickey, false, this.landCenter.x, this.landCenter.y,
                            10, 0, 1, 1,             // attributes (dmg, spd, duration, pierce)
                            this.mickey.BB.center() // destination vector (x, y)
                )));
            } else {
                if (this.jumpingClock.elapsed > 0.35) {
                    this.jumpY -= 40;
                }
            }
        }

        

        // === end of attack events ===

        if (this.pos.x - this.mickey.x + 10 > 0) {
            this.flip = 1; // Flip the sprite if moving left
        } else {
            this.flip = 0; // Do not flip the sprite if moving right
        }

        if (this.currentHP <= 0) {
            this.removeFromWorld = true;
        }

        // this should be last thing to update
        this.move();
    };

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
        if (this.isAirborne) {
            return;
        }
        if (this.flip == 0) {
            if (this.isLanding || this.isJumping) {
                this.animations[3].drawFrame(this.game.clockTick, ctx, this.pos.x, this.pos.y + this.jumpY, this.width, this.height);
            } else if (this.isDashing) {
                this.animations[2].drawFrame(this.game.clockTick, ctx, this.pos.x, this.pos.y, this.width, this.height);
            } else if (this.isBarking) {
                this.animations[1].drawFrame(this.game.clockTick, ctx, this.pos.x, this.pos.y, this.width, this.height);
            } else {
                this.animations[0].drawFrame(this.game.clockTick, ctx, this.pos.x, this.pos.y, this.width, this.height);
            }
        }
        else if (this.flip == 1) {
            if (this.isLanding || this.isJumping) {
                this.animations[7].drawFrame(this.game.clockTick, ctx, this.pos.x, this.pos.y + this.jumpY, this.width, this.height);
            } else if (this.isDashing) {
                this.animations[6].drawFrame(this.game.clockTick, ctx, this.pos.x, this.pos.y, this.width, this.height);
            } else if (this.isBarking) {
                this.animations[5].drawFrame(this.game.clockTick, ctx, this.pos.x, this.pos.y, this.width, this.height);
            } else {
                this.animations[4].drawFrame(this.game.clockTick, ctx, this.pos.x, this.pos.y, this.width, this.height);
            }
        }
        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }

        // draw health bar
        this.drawHealthBar(ctx);
    };
};