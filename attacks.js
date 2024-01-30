class Projectile {
    constructor(game, mickey, isFriendly, x, y, width, height, projDamage, projSpeed, projDuration, projPierce, targetLocation, isHoming, targetEntity, isRevolving, isClockwise, radius) {
        Object.assign(this, { game, mickey, isFriendly, x, y, width, height, projDamage, projSpeed, projDuration, projPierce, targetLocation, isHoming, targetEntity, isRevolving, isClockwise, radius});
    
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