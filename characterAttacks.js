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
        this.BB.updateBB(this.mickey.x-((mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5));
    }

    draw(ctx){
        this.elapsedTime += this.game.clockTick;
        if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 0) this.attackAnimations[0].drawFrame(this.game.clockTick, ctx, this.mickey.x-((this.mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5), this.mickey.width*3, this.mickey.height*3);
        if (Math.floor(this.elapsedTime%3) == 0 && this.mickey.facing == 1) this.attackAnimations[1].drawFrame(this.game.clockTick, ctx, this.mickey.x-((this.mickey.width*3)/2.5), this.mickey.y-((this.mickey.height*3)/2.5), this.mickey.width*3, this.mickey.height*3);
        
        if (this.elapsedTime > 5) this.removeFromWorld = true;

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    }
}