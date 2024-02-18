class Huskydog {
    constructor(game, mickey, x, y, move, lifespan) {
        this.game = game;
        this.mickey = mickey;

        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.w = 50;
        this.h = 50;
        this.speed = 1.5; // must be at least 1
        this.drag = -1 / this.speed; // dont question

        this.totalElapsed = 0;
        this.elapsedTime = 0;
        this.frameCount = 5;
        this.frameDuration = 0.1;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheets = [];
        this.spritesheets.push(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"));
        this.spritesheets.push(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"));
        this.xStart = 0;
        this.yStart = 61;
        this.width = 90;
        this.height = 60;

        // attributes
        this.currentHP = 100;
        this.collideDmg = 5;

        this.flipLeft = false;

        // for formations
        if (move) {
            this.moveVec = new Vector2(move.x, move.y);
            this.updateFacing();
        }
        this.lifespan = lifespan ? lifespan : null;

        //Rectangle bounding box
        this.offsetBB = { x: 3, y: 3, w: -3, h: -3 };
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
        });
        // colliding with mickey and attacking mickey
        if (this.BB.collideBB(this.mickey.BB)) {
            this.mickey.takeDamage(this.collideDmg);
        }
    }

    takeDamage(damage) {
        this.currentHP -= damage;
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
        if ((this.pos.x - this.mickey.x - 5) > 0) {
            this.flipLeft = true // Flip the sprite if moving left
            this.xStart = 0;
        } else {
            this.flipLeft = false; // Do not flip the sprite if moving right
            this.xStart = 445;
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
        this.game.addEntityDistances(this, toMickey.mag());

        if (this.moveVec) {
            this.applyForce(this.moveVec.norm());
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
            this.game.addGemEntity(new Gem(this.game, this.mickey, this.pos.x, this.pos.y, 1));
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

        ctx.drawImage(this.spritesheets[this.flipLeft ? 1 : 0],
            this.xStart + this.width * frame * (this.flipLeft ? 1 : -1), this.yStart,
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

class GiantHuskydog {
    constructor(game, mickey, x, y) {
        this.game = game;
        this.mickey = mickey;

        this.initialX = x;
        this.initialY = y;
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

        this.MaxHP = 1000;
        this.currentHP = 1000;
        this.collideDmg = 10;

        this.flipLeft = false;

        // change to be ingame dimension
        this.width = 150;
        this.height = 150;
        //Rectangle bounding box
        this.offsetBB = { x: 18, y: 14, w: -20, h: -20 };
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);

        // attacks
        this.dashAtkClock = new Clock(game, 5); // dash every 5 sec
        this.dashingClock = new Clock(game, 1); // how long to dash for (1 sec)
        this.isDashing = false;

        // roar blast
        this.barkAtkClock = new Clock(game, 8); // Bark every 8 sec
        this.barkingClock = new Clock(game, 5); // how long bark lasts
        this.firingClock = new Clock(game, 0.5);
        this.isBarking = false;

        // jump attack
        this.jumpAtkClock = new Clock(game, 20); // jump every 20 sec
        this.jumpingClock = new Clock(game, 0.6); // how long jumping lasts
        this.airBorneClock = new Clock(game, 1); // how long airborne lasts
        this.landingClock = new Clock(game, 0.8);
        
        this.isJumping = false;
        this.isAirborne = false;
        this.isLanding = false;
        this.isLanded = false;
        this.jumpY = 0;
        this.landCenter = null;
    };

    setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    loadAnimations() {
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), this.width * 6, this.height, this.width, this.height, 6, 0.1, 0, false, true));
        // bark
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), this.width * 6, 0, this.width, this.height, 6, 0.2, 0, false, true));
        // dash
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), this.width * 6, this.height * 2, this.width, this.height, 5, 0.1, 0, false, true));
        // jump
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), this.width * 6, this.height * 5, this.width, this.height, 6, 0.1, 0, false, true));
        // land
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png"), 0, this.height * 3, this.width, this.height, 8, 0.1, 0, false, false));

        //reversed images
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), 0, this.height, this.width, this.height, 6, 0.1, 0, false, false));
        // bark
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), 0, 0, this.width, this.height, 6, 0.2, 0, false, false));
        // dash
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), 0, this.height * 2, this.width, this.height, 5, 0.1, 0, false, false));
        // jump
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), 0, this.height * 5, this.width, this.height, 6, 0.1, 0, false, false));
        // land
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png"), this.width * 7, this.height * 3, this.width, this.height, 8, 0.1, 0, false, true));
    }

    takeDamage(damage) {
        if (this.isAirborne) return;
        this.currentHP -= damage;
    }

    checkCollision() {
        // collision with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity, this.speed + 1);
            }
        });
        // colliding with mickey and attacking mickey
        if (this.BB.collideBB(this.mickey.BB)) {
            this.mickey.takeDamage(this.collideDmg);
        }
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
        let toMickey = this.mickey.BB.center().sub(this.BB.center());
        this.game.addEntityDistances(this, toMickey.mag());
        toMickey = toMickey.norm();
        this.applyForce(toMickey);
        

        // drag force to limit velocity
        let v = this.vel.mag();
        if (v !== 0) {
            this.applyForce(this.vel.norm().mul(this.drag * v));
        }

        this.checkCollision();

        // === attack events ===
        this.barkAtkClock.update();
        this.dashAtkClock.update();
        this.jumpAtkClock.update();

        // bark attack
        if (!this.isDashing && !this.isBarking && !this.isJumping && this.barkAtkClock.isDone()) {
            // Start barking towards Mickey
            this.isBarking = true;
            this.spdMul = 0.5;
        }
        else if (this.isBarking) {
            if (this.firingClock.doneTicking()) {
                this.game.addAttackEntity(new Blast(
                    this.game, this.mickey, false, this.BB.center().x - (this.flipLeft ? 70 : 0), this.BB.center().y - 50,
                    10, 5, 4, 1,             // attributes (dmg, spd, duration, pierce)
                    this.mickey.BB.center(), 0 // destination vector (x, y)
                ));
                this.game.addAttackEntity(new Blast(
                    this.game, this.mickey, false, this.BB.center().x - (this.flipLeft ? 70 : 0), this.BB.center().y - 50,
                    10, 5, 4, 1,
                    this.mickey.BB.center(), degreeToRad(20)
                ));
                this.game.addAttackEntity(new Blast(
                    this.game, this.mickey, false, this.BB.center().x - (this.flipLeft ? 70 : 0), this.BB.center().y - 50,
                    10, 5, 4, 1,
                    this.mickey.BB.center(), degreeToRad(-20)
                ));
            }

            if (this.barkingClock.doneTicking()) {
                this.isBarking = false;
                this.spdMul = 1;
                this.barkAtkClock.reset();
                this.firingClock.reset();
                // reset animation
                this.animations[6].reset();
                this.animations[1].reset();
            }
        }

        // dash every 5 seconds
        if (!this.isDashing && !this.isBarking && !this.isJumping && this.dashAtkClock.isDone()) {
            // Start dashing towards Mickey
            this.isDashing = true;
        }
        else if (this.isDashing) {
            let dashForce = toMickey.mul(4);  // You can adjust the force multiplier as needed
            this.applyForce(dashForce);

            // You can also add logic to control the duration of the dash if needed

            // Reset the dash flag after a certain duration (e.g., 1 seconds)
            if (this.dashingClock.doneTicking()) {
                this.isDashing = false;
                this.dashAtkClock.reset();
                // reset animation
                this.animations[4].reset();
                this.animations[3].reset();
                this.animations[8].reset();
                this.animations[9].reset();
            }
        }

        // jump attack sequence 
        if (!this.isDashing && !this.isBarking && !this.isJumping && this.jumpAtkClock.isDone()) {
            // initiate jumping
            this.isJumping = true;
            this.spdMul = 0;
        } else if (this.isJumping) {

            if (this.isLanded) {
                if (this.landingClock.doneTicking()) {
                    // attack end
                    this.isLanded = false;
                    this.isJumping = false;

                    this.spdMul = 1;
                    this.collideDmg = 10;
                    
                    this.jumpAtkClock.reset();
                    // reset animation
                    this.animations[6].reset();
                    this.animations[1].reset();
                }
            } else if (this.isLanding) {
                if (this.jumpY < 0) {
                    this.jumpY += 40;
                } else {
                    this.jumpY = 0;
                    this.isLanded = true;
                    this.isLanding = false;
                }
            } else if (this.isAirborne) {
                if (this.airBorneClock.doneTicking()) {
                    this.isAirborne = false;
                    this.isLanding = true;
                    this.pos.x = this.landCenter.x - this.width / 2;
                    this.pos.y = this.landCenter.y - this.height / 2;
                }
            } else if (this.jumpingClock.doneTicking()) {
                this.isAirborne = true;
                this.collideDmg = 0;
                this.landCenter = this.mickey.BB.center();
                this.game.addAttackEntity(new Warning(this.game, this.landCenter.x, this.landCenter.y, 500, 500, 1.2,
                        new Shockwave(
                            this.game, this.mickey, false, this.landCenter.x, this.landCenter.y,
                            10, 0.8, 1000,          // attributes (dmg, duration, pierce)
                            this.mickey.BB.center() // destination vector (x, y)
                )));
            } else {
                // jumping up
                if (this.jumpingClock.elapsed > 0.35) {
                    this.jumpY -= 40;
                }
            }
        }

        // === end of attack events ===

        this.flipLeft = (this.pos.x - this.mickey.x + 10) > 0;

        if (this.currentHP <= 0) {
            this.removeFromWorld = true;
        }

        // this should be last thing to update
        this.move();
    };

    reset() {
        this.currentHP = this.MaxHP;
        this.pos.x = this.initialX;
        this.pos.y = this.initialY;

        this.barkAtkClock.reset();
        this.dashAtkClock.reset();
        this.jumpAtkClock.reset();
    }

    drawHealthBar(ctx) {
        const camX = this.pos.x + 15 - this.game.cameraX;
        const camY = this.pos.y - 8  - this.game.cameraY;
        // Drawing health box
        ctx.fillStyle = 'black';
        ctx.fillRect(camX, camY, 120, 10);

        // Calculating current HP and changing color with appropriate indicators for health percentage.
        let healthRatio = this.currentHP / this.MaxHP;
        let healthBarSize = 120 * healthRatio;

        if (healthRatio > 0.75) ctx.fillStyle = 'green';
        else if (healthRatio > 0.50) ctx.fillStyle = 'orange';
        else if (healthRatio > 0.25) ctx.fillStyle = 'red';
        else ctx.fillStyle = 'maroon';

        if (healthRatio > 0) {
            ctx.fillRect(camX, camY, healthBarSize, 10);
        } else {
            ctx.fillRect(camX, camY, 0, 10);
        }
    }

    draw(ctx) {
        if (this.isAirborne) {
            return;
        }

        const camX = this.pos.x - this.game.cameraX;
        const camY = this.pos.y - this.game.cameraY;

        if (this.flipLeft) {
            if (this.isLanded) {
                this.animations[9].drawFrame(this.game.clockTick, ctx, camX, camY + this.jumpY, this.width, this.height);
            } else if (this.isLanding || this.isJumping) {
                this.animations[8].drawFrame(this.game.clockTick, ctx, camX, camY + this.jumpY, this.width, this.height);
            } else if (this.isDashing) {
                this.animations[7].drawFrame(this.game.clockTick, ctx, camX, camY, this.width, this.height);
            } else if (this.isBarking) {
                this.animations[6].drawFrame(this.game.clockTick, ctx, camX, camY, this.width, this.height);
            } else {
                this.animations[5].drawFrame(this.game.clockTick, ctx, camX, camY, this.width, this.height);
            }
        }
        else {
            if (this.isLanded) {
                this.animations[4].drawFrame(this.game.clockTick, ctx, camX, camY + this.jumpY, this.width, this.height);
            } else if (this.isLanding || this.isJumping) {
                this.animations[3].drawFrame(this.game.clockTick, ctx, camX, camY + this.jumpY, this.width, this.height);
            } else if (this.isDashing) {
                this.animations[2].drawFrame(this.game.clockTick, ctx, camX, camY, this.width, this.height);
            } else if (this.isBarking) {
                this.animations[1].drawFrame(this.game.clockTick, ctx, camX, camY, this.width, this.height);
            } else {
                this.animations[0].drawFrame(this.game.clockTick, ctx, camX, camY, this.width, this.height);
            }
        }

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
        }

        // draw health bar
        this.drawHealthBar(ctx);
    };
};