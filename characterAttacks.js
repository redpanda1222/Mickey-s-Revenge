class FireSlash{
    constructor(game, mickey,){
        Object.assign(this, {game, mickey});
        this.elapsedTime = 0;
        this.removeFromWorld = false;
        this.coolDown = 15;
        this.BB = new BoundingBox(mickey.x-((mickey.width*3)/2.5), mickey.y-((mickey.height*3)/2.5), mickey.width*3, mickey.height*3);
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
            this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x-((this.mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5), this.mickey.width*3, this.mickey.height*3);
        }else if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 1) {
            this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x-((this.mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5), this.mickey.width*3, this.mickey.height*3);
        }

        if (this.elapsedTime > 1) this.removeFromWorld = true;

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    }
}