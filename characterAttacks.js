class FireSlash{
    constructor(game, mickey,){
        Object.assign(this, {game, mickey});
        this.elapsedTime = 0;
        this.removeFromWorld = false;
        this.coolDown = 15;
        this.BB = new BoundingBox(game, mickey.x-((mickey.width*3)/2.5), mickey.y-((mickey.height*3)/2.5), mickey.width*3, mickey.height*3);
        this.attackAnimations = [];
        this.loadAttackAnimations();
    }

    loadAttackAnimations()
    {
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/fireslash.png"), 3060, 0, 340, 334, 10, 0.04, 0, false, true));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/fireslash2.png"), 0, 0, 340, 334, 10, 0.04, 0, false, false));
    }



    update()
    {
        this.BB.updateBB(this.mickey.x-((this.mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5));

        this.game.entities.forEach(entity => {
            //check if the cooldown is less than 3, if so, deal damage upon collision
            if (entity != this.mickey && this.BB.collideBB(entity.BB) && this.coolDown <= 3) {
                entity.currentHP -= 10;
            }
        });

        //if the cooldown is greater than 3 reduce cooldown
        if (this.coolDown > 3) {
            this.coolDown -= 1;
        }else if (this.coolDown == 0) {
            this.coolDown = 15;
        }
    }

    draw(ctx){
        this.elapsedTime += this.game.clockTick;
        if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 0) {
            this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x-((this.mickey.width*3)/2.5) - this.game.cameraX, this.mickey.y-((this.mickey.height*3)/2.5)- this.game.cameraY, this.mickey.width*3, this.mickey.height*3);
        }else if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 1) {
            this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x-((this.mickey.width*3)/2.5) - this.game.cameraX, this.mickey.y-((this.mickey.height*3)/2.5) - this.game.cameraY, this.mickey.width*3, this.mickey.height*3);
        }

        if (this.elapsedTime > 1) this.removeFromWorld = true;

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    }
}

class FireBreath{
    constructor(game, mickey,){
        Object.assign(this, {game, mickey});
        this.elapsedTime = 0;
        this.removeFromWorld = false;
        this.width = 200
        this.height = 100
        this.coolDown = 15;

        this.offsetBB = { x: 0, y: 30, w: 0, h: -45 };
        this.BB = new BoundingBox(game,  this.mickey.x + this.width/2 - this.game.cameraX + this.offsetBB.x, this.mickey.y - this.game.cameraY + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);
        this.attackAnimations = [];
        this.loadAttackAnimations();
    }

    loadAttackAnimations()
    {
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/firebreath.png"), 0, 0, 120, 65, 10, 0.08, 0, true, false));
        this.attackAnimations.push(new Animator(ASSET_MANAGER.getAsset("./assets/attack/firebreath2.png"), 1200, 0, 120, 65, 10, 0.08, 0, true, true));
    }



    update()
    {
        if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 0) {
            this.BB.updateBB(this.mickey.x + this.width/2 + this.offsetBB.x, this.mickey.y + this.offsetBB.y);
        }else if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 1) {
            this.BB.updateBB(this.mickey.x - this.width - this.offsetBB.x, this.mickey.y + this.offsetBB.y);
        }

        this.game.entities.forEach(entity => {
            //check if the cooldown is less than 3, if so, deal damage upon collision
            if (entity != this.mickey && this.BB.collideBB(entity.BB) && this.coolDown <= 3) {
                entity.currentHP -= 10;
            }
        });

        //if the cooldown is greater than 3 reduce cooldown
        if (this.coolDown > 3) {
            this.coolDown -= 1;
        }else if (this.coolDown == 0) {
            this.coolDown = 15;
        }
    }

    draw(ctx){
        this.elapsedTime += this.game.clockTick;
        if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 0) {
            this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x + this.width/2 - this.game.cameraX, this.mickey.y- this.game.cameraY, this.width, this.height);
        }else if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 1) {
             this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x - this.width  - this.game.cameraX, this.mickey.y - this.game.cameraY, this.width, this.height);
        }

        if (this.elapsedTime > 1) this.removeFromWorld = true;

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    }
}