class Mickey {
    constructor(game){
		this.game = game;
        this.facing = 0;
        this.status = 0;
		this.x = 0;
		this.y = 0;
        this.width = 100;
        this.height = 100;
        this.movementSpeed = 5;
        this.animations = [];
        this.width = 100;
        this.height = 100;
        this.loadAnimations();
 
        //CHARACTER STATS
        this.MaxHP = 100;
        this.currentHP = 100;

        //Rectangle bounding box
        this.offsetBB = {x: 18, y: 3, w: -26, h: -10};
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);
	};

    handleCollision(entity) {
        let overlap = this.BB.overlapBB(entity.BB);
        let sig = { x: Math.sign(this.BB.x - entity.BB.x), y: Math.sign(this.BB.y - entity.BB.y) };
        // console.log("[X: sig " + sig.x + ", dif " + overlap.x + "], [Y: sig " + sig.y + ", dif " + overlap.y + "]");

        if (overlap.x < overlap.y) {
            this.x += (overlap.x + 1) * sig.x;
        } else {
            this.y += (overlap.y + 1) * sig.y;
        }
    }

    loadAnimations() 
    {
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 5, 9, 33, 44, 4, 0.09, true, false));
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 5, 54, 33, 44, 6, 0.09, false, false));
        //reversed images
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse2.png"), 212, 9, 33, 44, 4, 0.09, true, true));
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse2.png"), 212, 54, 33, 44, 6, 0.09, false, true));
    };

	update()
	{
        this.status = 0;
		if (this.game.left){
            this.x -= this.movementSpeed;
            this.facing = 1;
            this.status = 1;
        };
        if (this.game.right) {
            this.x += this.movementSpeed
            this.facing = 0;
            this.status = 1;
        };
        if (this.game.up){
            this.y -= this.movementSpeed;
            this.status = 1;
        };
        if (this.game.down) {
            this.y += this.movementSpeed;
            this.status = 1;
            //this.currentHP -= 0.1;  //<----TESTING HEALTH TRANSITION
        };

        // update bounding box
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);

        // mickey only collide with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity); 
            }
        });
	};

	draw(ctx)
	{
        if (this.status == 0 && this.facing == 0){
            this.animations[0].drawFrame(this.game.clockTick, ctx, this.x,this.y, this.width,this.height);
        }else if (this.status == 0 && this.facing == 1){
            this.animations[2].drawFrame(this.game.clockTick, ctx, this.x,this.y, this.width,this.height);
        }else if (this.status == 1 && this.facing == 0){
            this.animations[1].drawFrame(this.game.clockTick, ctx, this.x,this.y, this.width,this.height);
        }else if (this.status == 1 && this.facing == 1){
            this.animations[3].drawFrame(this.game.clockTick, ctx, this.x,this.y, this.width,this.height);
        };

        this.drawHealthBar(ctx);

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
	};

    drawHealthBar(ctx){
        //drawing health box
        //--BACKGROUND FOR MAX HP
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 15, this.y - 8, 80, 10);

        //--Calculating Current HP and changing color with appropriate indicators for health percentage.
        let healthRatio = this.currentHP/this.MaxHP;
        let healthBarSize = 80 * healthRatio;
        if (healthRatio > 0.75) ctx.fillStyle = 'green';
        if (healthRatio <= 0.75) ctx.fillStyle = 'orange';
        if (healthRatio <= 0.50) ctx.fillStyle = 'red';
        if (healthRatio <= 0.25) ctx.fillStyle = 'maroon';
        ctx.fillRect(this.x + 15, this.y - 8, healthBarSize, 10);
    }
    
}