class FireSlash{
    constructor(game, mickey,){
        Object.assign(this, {game, mickey});
        this.elapsedTime = 0;
        this.removeFromWorld = false;
        this.BB = new BoundingBox(mickey.x-((mickey.width*3)/2.5), mickey.y-((mickey.height*3)/2.5), mickey.width*3, mickey.height*3);
        this.attackAnimations = [];
        this.loadAttackAnimations();
    }

    loadAttackAnimations()
    {
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/fireslash.png"), 3060, 0, 340, 334, 10, 0.04, false, true));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/fireslash2.png"), 0, 0, 340, 334, 10, 0.04, false, false));
    }



    update()
    {
        this.BB.updateBB(this.mickey.x-((this.mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5));
    }

    draw(ctx){
        this.elapsedTime += this.game.clockTick;
        if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 0) this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x-((this.mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5), this.mickey.width*3, this.mickey.height*3);
        if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 1) this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x-((this.mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5), this.mickey.width*3, this.mickey.height*3);
        if (this.elapsedTime > 1) this.removeFromWorld = true;

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    }
}

class Projectile {
    constructor(game, mickey, isFriendly, x, y, width, height, projDamage, projSpeed, projDuration, projPierce, targetLocation, isHoming, targetEntity, isRevolving, isClockwise, radius) {
        Object.assign(this, { game, mickey, isFriendly, x, y, width, height, projDamage, projSpeed, projDuration, projPierce, targetLocation, isHoming, targetEntity, isRevolving, isClockwise, radius });

        this.elapsed = 0;

        this.targetX = x;
        this.targetY = y;

        if (targetEntity) {
            this.updateTargetLocation(targetEntity.BB.center().x, targetEntity.BB.center().y);
        }
        else if (targetLocation) {
            this.updateTargetLocation(targetLocation.x, targetLocation.y);
        }

        if (isRevolving) {
            this.x += radius;
            this.theta = 0;
            this.rotSpeed = degreeToRad(this.projSpeed * (this.isClockwise ? 1 : -1));
        }
    }

    handleCollision(entity) {
        if (this.projPierce < 1) {
            this.removeFromWorld = true;
            return;
        }
        // entity.takeDamage(this.projDamage); // uncomment this later
    }

    updateTargetLocation(x, y) {
        this.targetX = x;
        this.targetY = y;
    }

    update() {
        this.elapsed += this.game.clockTick;

        // projectile duration
        if (this.elapsed >= this.projDuration) {
            this.removeFromWorld = true;
        }

        if (this.targetEntity && (this.isHoming || this.isRevolving)) {
            this.updateTargetLocation(this.targetEntity.BB.center().x, this.targetEntity.BB.center().y);
        }

        if (this.isRevolving) {
            this.theta += this.rotSpeed;
            if (this.theta > Math.PI * 2) {
                this.theta -= Math.PI * 2;
            }
            this.x = this.targetX + Math.cos(this.theta) * this.radius;
            this.y = this.targetY + Math.sin(this.theta) * this.radius;
        } else {
            // move towards target location
            const targetDirection = Math.atan2(this.targetY - this.BB.center().y, this.targetX - this.BB.center().x);
            this.x += Math.cos(targetDirection) * this.projSpeed;
            this.y += Math.sin(targetDirection) * this.projSpeed;
        }

        // update bounding box
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);

        // collision against entities
        this.game.entities.forEach(entity => {
            if (entity !== this && this.isFriendly) {
                // friendly projectile can not harm Mickey, it harms only enemies
                if (this.BB.collideBB(entity.BB) && entity !== this.mickey) {
                    this.handleCollision(entity);
                    console.log("lol");
                }
            } else {
                // not friendly projectile only harms Mickey
                if (this.BB.collideBB(entity.BB) && entity === this.mickey) {
                    this.handleCollision(entity);
                    console.log("lmao");
                }
            }
        });
    }
}

class FireBall extends Projectile {
    constructor(game, mickey, isFriendly, x, y, projDamage, projSpeed, projDuration, projPierce, targetLocation, isHoming, targetEntity, isRevolving, isClockwise, radius) {
        super(game, mickey, isFriendly, x, y, 34, 34, projDamage, projSpeed, projDuration, projPierce, targetLocation, isHoming, targetEntity, isRevolving, isClockwise, radius);

        this.spritesheet = new Animator(ASSET_MANAGER.getAsset("./assets/attack/Fireball.png"), 0, 235, this.width, this.height, 6, 0.05, 1, false, false);

        // this.sizeScale = 3
        // this.width  *= this.sizeScale;
        // this.height *= this.sizeScale;

        //Rectangle bounding box
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);
    }

    draw(ctx) {
        this.spritesheet.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.width, this.height);

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    };
}

class Meteor extends Projectile {
    constructor(game, mickey, isFriendly, x, y, width, height, projDamage, projSpeed, projDuration, projPierce, targetLocation, isHoming, targetEntity, isRevolving, isClockwise, radius) {
        super(game, mickey, isFriendly, x, y, width, height, projDamage, projSpeed, projDuration, projPierce, targetLocation, isHoming, targetEntity, isRevolving, isClockwise, radius);

        this.meteorArrive = false;
        this.meteorArriveTime = 0;
        this.meteorSpd = 15;
        this.meteorY = -180;

        this.spritesheet = [];
        this.meteorSize = { w: 64, h: 180 };
        this.explosionSize = { w: 140, h: 130 };
        this.spritesheet.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/meteor.png"), 0, 0, this.meteorSize.w, this.meteorSize.h, 6, 0.1, 1, true, false));
        this.spritesheet.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/explosion.png"), 0, 0, this.explosionSize.w, this.explosionSize.h, 9, 0.1, 1, false, false));

        //Rectangle bounding box
        this.offsetBB = { x: -this.width / 2, y: -this.height / 2, w: 0, h: 0 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);
    }

    update() {
        if (this.meteorArrive) {
            super.update();
        } else {
            this.meteorY += this.meteorSpd;
            if (this.meteorY + this.meteorSize.h / 2 >= this.y) {
                this.meteorY = this.y + this.meteorSize.h / 2;
                this.meteorArrive = true;
            }
        }
    }

    draw(ctx) {
        if (this.meteorArrive) {
            if (this.elapsed > this.meteorArriveTime + 0.9) {
                this.removeFromWorld = true;
                return;
            }
            this.spritesheet[1].drawFrame(this.game.clockTick, ctx, this.x - this.explosionSize.w, this.y - this.meteorSize.h - 50, this.explosionSize.w * 2, this.explosionSize.h * 2);
        } else {
            this.meteorArriveTime = this.elapsed;
            this.spritesheet[0].drawFrame(this.game.clockTick, ctx, this.x - this.meteorSize.w / 2, this.meteorY, this.meteorSize.w, this.meteorSize.h);
        }


        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    };
}