class FireSlash {
    constructor(game, mickey, sizeScale, Level) {
        Object.assign(this, { game, mickey, sizeScale, Level });
        this.elapsedTime = 0;
        this.removeFromWorld = false;
        this.coolDown = 30;
        this.BB = new BoundingBox(mickey.x - ((mickey.width * 3) / 2.5), mickey.y - ((mickey.height * 3) / 2.5), mickey.width * 3 * this.sizeScale, mickey.height * 3 * this.sizeScale);
        this.attackAnimations = [];
        this.loadAttackAnimations();
    }

    loadAttackAnimations() {
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/fireslash.png"), 3060, 0, 340, 334, 10, 0.04, 0, false, true));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/fireslash2.png"), 0, 0, 340, 334, 10, 0.04, 0, false, false));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/redfireslash.png"), 3060, 0, 340, 334, 10, 0.04, 0, false, true));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/redfireslash2.png"), 0, 0, 340, 334, 10, 0.04, 0, false, false));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/bluefireslash.png"), 3060, 0, 340, 334, 10, 0.04, 0, false, true));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/bluefireslash2.png"), 0, 0, 340, 334, 10, 0.04, 0, false, false));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/purplefireslash.png"), 3060, 0, 340, 334, 10, 0.04, 0, false, true));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/purplefireslash2.png"), 0, 0, 340, 334, 10, 0.04, 0, false, false));
    }

    update() {
        this.BB.updateBB(this.mickey.x - ((this.mickey.width * 3) / 2.5), this.mickey.y - ((this.mickey.height * 3) / 2.5));

        this.game.entities.forEach(entity => {
            //check if the cooldown is less than 3, if so, deal damage upon collision
            if (entity != this.mickey && this.BB.collideBB(entity.BB) && this.coolDown <= 10) {
                entity.currentHP -= 5 + (Math.floor(this.mickey.Level / 100));
            }
        });

        //if the cooldown is greater than 3 reduce cooldown
        if (this.coolDown > 0) {
            this.coolDown -= 1;
        } else if (this.coolDown <= 0) {
            this.coolDown = 30;
        }
    }

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        if (this.Level == 1) {
            if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 0) {
                this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x - ((this.mickey.width * 3) / 2.5) - this.game.cameraX, this.mickey.y - ((this.mickey.height * 3) / 2.5) - this.game.cameraY, this.mickey.width * 3 * this.sizeScale, this.mickey.height * 3 * this.sizeScale);
            } else if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 1) {
                this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x - ((this.mickey.width * 3) / 2.5) - this.game.cameraX, this.mickey.y - ((this.mickey.height * 3) / 2.5) - this.game.cameraY, this.mickey.width * 3 * this.sizeScale, this.mickey.height * 3 * this.sizeScale);
            }
        } else if (this.Level == 2) {
            if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 0) {
                this.attackAnimations[2].drawFrame(this.game.clockTick, ctx, this.mickey.x - ((this.mickey.width * 3) / 2.5) - this.game.cameraX, this.mickey.y - ((this.mickey.height * 3) / 2.5) - this.game.cameraY, this.mickey.width * 3 * this.sizeScale, this.mickey.height * 3 * this.sizeScale);
            } else if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 1) {
                this.attackAnimations[3].drawFrame(this.game.clockTick, ctx, this.mickey.x - ((this.mickey.width * 3) / 2.5) - this.game.cameraX, this.mickey.y - ((this.mickey.height * 3) / 2.5) - this.game.cameraY, this.mickey.width * 3 * this.sizeScale, this.mickey.height * 3 * this.sizeScale);
            }
        } else if (this.Level == 3) {
            if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 0) {
                this.attackAnimations[4].drawFrame(this.game.clockTick, ctx, this.mickey.x - ((this.mickey.width * 3) / 2.5) - this.game.cameraX, this.mickey.y - ((this.mickey.height * 3) / 2.5) - this.game.cameraY, this.mickey.width * 3 * this.sizeScale, this.mickey.height * 3 * this.sizeScale);
            } else if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 1) {
                this.attackAnimations[5].drawFrame(this.game.clockTick, ctx, this.mickey.x - ((this.mickey.width * 3) / 2.5) - this.game.cameraX, this.mickey.y - ((this.mickey.height * 3) / 2.5) - this.game.cameraY, this.mickey.width * 3 * this.sizeScale, this.mickey.height * 3 * this.sizeScale);
            }
        } else if (this.Level == 4) {
            if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 0) {
                this.attackAnimations[6].drawFrame(this.game.clockTick, ctx, this.mickey.x - ((this.mickey.width * 3) / 2.5) - this.game.cameraX, this.mickey.y - ((this.mickey.height * 3) / 2.5) - this.game.cameraY, this.mickey.width * 3 * this.sizeScale, this.mickey.height * 3 * this.sizeScale);
            } else if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 1) {
                this.attackAnimations[7].drawFrame(this.game.clockTick, ctx, this.mickey.x - ((this.mickey.width * 3) / 2.5) - this.game.cameraX, this.mickey.y - ((this.mickey.height * 3) / 2.5) - this.game.cameraY, this.mickey.width * 3 * this.sizeScale, this.mickey.height * 3 * this.sizeScale);
            }
        }

        if (this.elapsedTime > 1) this.removeFromWorld = true;

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
        }
    }
}

class FireBreath {
    constructor(game, mickey, sizeScale, Level) {
        Object.assign(this, { game, mickey, sizeScale, Level });
        this.elapsedTime = 0;
        this.removeFromWorld = false;
        this.width = 200;
        this.height = 100
        this.coolDown = 15;

        this.offsetBB = { x: 0, y: 30, w: 0, h: -45 };

        this.BB = new BoundingBox(this.mickey.x + this.width / 2 - this.game.cameraX + this.offsetBB.x, this.mickey.y - this.game.cameraY + this.offsetBB.y, this.width + this.offsetBB.w * this.sizeScale, this.height + this.offsetBB.h * this.sizeScale);
        this.BB2 = null;
        this.BB3 = null;
        this.BB4 = null;

        if (Level == 2) {
            this.BB2 = new BoundingBox(this.mickey.x + this.width / 2 - this.game.cameraX + this.offsetBB.x, this.mickey.y - this.game.cameraY + this.offsetBB.y, this.width + this.offsetBB.w * this.sizeScale, this.height + this.offsetBB.h * this.sizeScale);
        }

        this.attackAnimations = [];
        this.loadAttackAnimations();
    }

    loadAttackAnimations() {
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/firebreath.png"), 0, 0, 120, 65, 10, 0.08, 0, true, false));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/firebreath2.png"), 1200, 0, 120, 65, 10, 0.08, 0, true, true));
    }

    update() {
        if (this.Level == 1) {
            if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 0) {
                this.BB.updateBB(this.mickey.x + (this.width / 2) + this.offsetBB.x, this.mickey.y + this.offsetBB.y);
            } else if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 1) {
                this.BB.updateBB(this.mickey.x - this.width - this.offsetBB.x, this.mickey.y + this.offsetBB.y);
            }
        } else if (this.Level == 2) {
            if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 0) {
                this.BB.updateBB(this.mickey.x + (this.width / 2) + this.offsetBB.x, this.mickey.y + this.offsetBB.y);
                this.BB2.updateBB(this.mickey.x - this.width - this.offsetBB.x, this.mickey.y + this.offsetBB.y);
            } else if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 1) {
                this.BB.updateBB(this.mickey.x + (this.width / 2) + this.offsetBB.x, this.mickey.y + this.offsetBB.y);
                this.BB2.updateBB(this.mickey.x - this.width - this.offsetBB.x, this.mickey.y + this.offsetBB.y);
            }
        }

        this.game.entities.forEach(entity => {
            //check if the cooldown is less than 3, if so, deal damage upon collision
            if (entity != this.mickey && this.BB.collideBB(entity.BB) && this.coolDown <= 3) {
                entity.currentHP -= 4 * this.mickey.Level;
            }
        });
        if (this.BB2 != null) {
            this.game.entities.forEach(entity => {
                //check if the cooldown is less than 3, if so, deal damage upon collision
                if (entity != this.mickey && this.BB2.collideBB(entity.BB) && this.coolDown <= 3) {
                    entity.currentHP -= 3 *this.mickey.Level;
                }
            });
        }

        //if the cooldown is greater than 3 reduce cooldown
        if (this.coolDown > 3) {
            this.coolDown -= 1;
        } else if (this.coolDown == 0) {
            this.coolDown = 30;
        }
    }

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        if (this.Level == 1) {
            if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 0) {
                this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x + this.width / 2 - this.game.cameraX, this.mickey.y - this.game.cameraY, this.width * this.sizeScale, this.height * this.sizeScale);
            } else if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 1) {
                this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x - this.width - this.game.cameraX, this.mickey.y - this.game.cameraY, this.width * this.sizeScale, this.height * this.sizeScale);
            }
        } else if (this.Level == 2) {
            if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 0) {
                this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x + this.width / 2 - this.game.cameraX, this.mickey.y - this.game.cameraY, this.width * this.sizeScale, this.height * this.sizeScale);
                this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x - this.width - this.game.cameraX, this.mickey.y - this.game.cameraY, this.width * this.sizeScale, this.height * this.sizeScale);
            } else if (Math.floor(this.elapsedTime % 3) == 0 && this.mickey.facing == 1) {
                this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x + this.width / 2 - this.game.cameraX, this.mickey.y - this.game.cameraY, this.width * this.sizeScale, this.height * this.sizeScale);
                this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x - this.width - this.game.cameraX, this.mickey.y - this.game.cameraY, this.width * this.sizeScale, this.height * this.sizeScale);
            }
        }

        if (this.elapsedTime > 1) this.removeFromWorld = true;

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
            if (this.BB2 != null) this.BB2.draw(ctx, this.game);
        }
    }
}

class Projectile {
    constructor(game, mickey, isFriendly, x, y, width, height, projDamage, projSpeed, projDuration, projPierce) {
        Object.assign(this, { game, mickey, isFriendly, x, y, width, height, projDamage, projSpeed, projDuration, projPierce });

        this.elapsed = 0;
        this.targetX = x;
        this.targetY = y;
        this.prevHits = new Map();

        // if (targetEntity) {
        //     this.updateTargetLocation(targetEntity.BB.center().x, targetEntity.BB.center().y);
        // }
        // else if (targetLocation) {
        //     this.updateTargetLocation(targetLocation.x, targetLocation.y);
        // }
        // if (this.targetEntity && (this.isHoming || this.isRevolving)) {
        //     this.updateTargetLocation(this.targetEntity.BB.center().x, this.targetEntity.BB.center().y);
        // }
    }

    checkCollision() {
        if (this.isFriendly) {
            // friendly projectile can not harm Mickey, it harms only enemies
            for (let i = this.game.entities.length - 1; i > 0; --i) {
                const entity = this.game.entities[i];

                if (this.BB.collideBB(entity.BB) && entity !== this.mickey) {
                    this.handleCollision(entity);
                } else {
                    this.prevHits.delete(entity);
                }

                if (this.projPierce < 1) {
                    this.removeFromWorld = true;
                    return;
                }
            }
        } else {
            // not friendly projectile only harms Mickey
            if (this.BB.collideBB(this.mickey.BB)) {
                this.handleCollision(this.mickey);
                this.removeFromWorld = this.projPierce < 1;
            }
        }
    }

    handleCollision(entity) {
        if (!this.prevHits.has(entity)) {
            entity.takeDamage(this.projDamage);
            this.prevHits.set(entity, true);
            this.projPierce--;
        }
    }

    updateTargetLocation(x, y) {
        this.targetX = x;
        this.targetY = y;
    }

    checkDuration() {
        this.elapsed += this.game.clockTick;

        // projectile duration
        if (this.elapsed >= this.projDuration) {
            this.removeFromWorld = true;
            return true;
        }
        return false;
    }

    moveStraight(stop) {
        if (stop) {
            this.targetDirection = Math.atan2(this.targetY - this.BB.center().y, this.targetX - this.BB.center().x);
        }
        // move towards target location
        this.x += Math.cos(this.targetDirection) * this.projSpeed;
        this.y += Math.sin(this.targetDirection) * this.projSpeed;
    }

    revolve() {
        this.theta += this.rotSpeed;
        if (this.theta > Math.PI * 2) {
            this.theta -= Math.PI * 2;
        }
        this.x = this.targetX + Math.cos(this.theta) * this.radius;
        this.y = this.targetY + Math.sin(this.theta) * this.radius;
    }

    draw(ctx) {
        this.spritesheet.drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width, this.height);

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
        }
    };
}

class Warning {
    constructor(game, x, y, w, h, duration, projectile) {
        Object.assign(this, { game, x, y, w, h, duration, projectile });

        this.clock = new Clock(this.game, this.duration);
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/attack/red.png");
        this.width = 181;
        this.height = 137;
        this.x -= this.w / 2;
        this.y -= this.h / 2;
    }

    update() {
        if (this.clock.doneTicking()) {
            this.removeFromWorld = true;
            this.game.addAttackEntity(this.projectile);
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0,
            this.width, this.height,
            this.x - this.game.cameraX, this.y - this.game.cameraY,
            this.w, this.h);
    }
}

class Rasengan extends Projectile {
    constructor(game, mickey, isFriendly, x, y, projDamage, projSpeed, projDuration, projPierce, targetLocation, aimOffsetRadians) {
        super(game, mickey, isFriendly, x, y, 94, 93, projDamage, projSpeed, projDuration, projPierce);

        this.spritesheet = new Animator(ASSET_MANAGER.getAsset("./assets/attack/rasenganBall.png"), 0, 0, this.width, this.height, 4, 0.1, 0, false, false);
        this.sizeScale = 0.75;
        this.width *= this.sizeScale;
        this.height *= this.sizeScale;

        this.offsetBB = { x: 20, y: 22, w: -44, h: -42 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);

        this.updateTargetLocation(targetLocation.x, targetLocation.y);
        this.targetDirection = Math.atan2(this.targetY - this.BB.center().y, this.targetX - this.BB.center().x) + aimOffsetRadians;
    }

    update() {
        if (this.checkDuration()) return;

        this.moveStraight();
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);
        this.checkCollision();
    }
}

class Shockwave extends Projectile {
    constructor(game, mickey, isFriendly, x, y, projDamage, projDuration, projPierce, targetLocation) {
        super(game, mickey, isFriendly, x, y, 113, 95, projDamage, 0, projDuration, projPierce);

        this.spritesheet = new Animator(ASSET_MANAGER.getAsset("./assets/attack/shockwave.png"), 0, 0, this.width, this.height, 8, 0.1, 0, false, false);

        this.sizeScale = 4;
        this.width *= this.sizeScale;
        this.height *= this.sizeScale;

        this.x -= this.width / 2;
        this.y -= this.height / 2;

        //Rectangle bounding box
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);

        this.updateTargetLocation(targetLocation.x, targetLocation.y);
    }

    update() {
        if (this.checkDuration()) {
            return;
        }

        this.moveStraight(true);
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);
        this.checkCollision();
    }
}

class Fireblade extends Projectile {
    constructor(game, mickey, isFriendly, x, y, projDamage, projSpeed, projDuration, targetEntity, isClockwise, radius, theta) {
        super(game, mickey, isFriendly, x, y, 80, 90, projDamage, projSpeed, projDuration, 4095);

        this.spritesheet = new Animator(ASSET_MANAGER.getAsset("./assets/attack/fireblade.png"), 0, 0, this.width, this.height, 4, 0.1, 0, false, false);
        this.sizeScale = 0.5;
        this.width *= this.sizeScale;
        this.height *= this.sizeScale;

        //Rectangle bounding box
        this.offsetBB = { x: 12 - this.width / 2, y: 16 - this.height / 2, w: -24, h: -32 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);

        this.targetEntity = targetEntity;
        this.radius = radius;
        this.theta = theta;
        this.updateTargetLocation(targetEntity.BB.center().x, targetEntity.BB.center().y);

        this.rotSpeed = degreeToRad(this.projSpeed * (isClockwise ? 1 : -1));
        this.x = this.targetX + Math.cos(this.theta) * this.radius;
        this.y = this.targetY + Math.sin(this.theta) * this.radius;
    }

    update() {
        if (this.checkDuration()) return;

        this.updateTargetLocation(this.targetEntity.BB.center().x, this.targetEntity.BB.center().y);

        this.revolve();
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);
        this.checkCollision();
    }

    draw(ctx) {
        this.spritesheet.drawFrame(this.game.clockTick, ctx, this.x - this.width / 2 - this.game.cameraX, this.y - this.height / 2 - this.game.cameraY, this.width, this.height);

        if (PARAMS.DEBUG) {
            this.BB.draw(ctx, this.game);
        }
    };
}

class Blast extends Projectile {
    constructor(game, mickey, isFriendly, x, y, projDamage, projSpeed, projDuration, projPierce, targetLocation, aimOffsetRadians) {
        super(game, mickey, isFriendly, x, y, 32, 32, projDamage, projSpeed, projDuration, projPierce);

        this.spritesheet = new Animator(ASSET_MANAGER.getAsset("./assets/attack/blast.png"), 0, 0, this.width, this.height, 5, 0.5, 0, false, false);
        this.sizeScale = 2;
        this.width *= this.sizeScale;
        this.height *= this.sizeScale;

        //Rectangle bounding box
        this.offsetBB = { x: 16, y: 16, w: -32, h: -32 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);

        this.updateTargetLocation(targetLocation.x, targetLocation.y);
        this.targetDirection = Math.atan2(this.targetY - this.BB.center().y, this.targetX - this.BB.center().x) + aimOffsetRadians;
    }

    update() {
        if (this.checkDuration()) return;

        this.moveStraight();
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);
        this.checkCollision();
    }
}

