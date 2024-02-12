class Mickey {
    constructor(game, x, y){
		this.game = game;

        // this.game.mickey = this;

        this.facing = 0;
        this.status = 0;
        this.attacking = false;
        this.elapsedTime = 0;
        this.initialX = x;
        this.initialY = y;
		this.x = x;
		this.y = y;
        this.sizeScale = 3
        this.width = 26 * this.sizeScale;
        this.height = 40 * this.sizeScale;
        this.movementSpeed = 5;
        this.animations = [];
        this.loadAnimations();

        // dmg immune
        this.immunityFrames = 20;
        this.immunityCurrent = 0;
        this.immune = false;
 
        //CHARACTER STATS
        this.MaxHP = 100;
        this.currentHP = this.MaxHP;
        this.Level = 1;
        this.experiencePoints = 0;

        //Rectangle bounding box
        this.offsetBB = {x: 20, y: 30, w: -38, h: -33};
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);
	};

    handleCollision(entity) {
        let overlap = this.BB.overlapBB(entity.BB);
        let sig = { x: Math.sign(this.BB.x - entity.BB.x), y: Math.sign(this.BB.y - entity.BB.y) };

        if (overlap.x < overlap.y) {
            this.x += (overlap.x + 1) * sig.x;
        } else {
            this.y += (overlap.y + 1) * sig.y;
        }
    }

    loadAnimations() 
    { 
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 0, 0, 26, 40, 4, 0.09, 1, true, false));
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 0, 41, 26, 40, 6, 0.09, 1, false, false));
        //reversed images
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 27 * 6, 41 * 2, 26, 40, 4, 0.09, 1, true, true));
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 27 * 6, 41 * 3, 26, 40, 6, 0.09, 1, false, true));
    };

    takeDamage(damage) {
        if (this.immune) return;
        if (this.currentHP <= 0){
            this.currentHP = 0;
            return;
        }
        this.immune = true
        this.currentHP -= damage;
        // ASSET_MANAGER.playAsset("./audio/hurt.mp3");
    }

    reset() {
        this.currentHP = this.MaxHP;
        this.x = this.initialX;
        this.y = this.initialY;

        this.immunityCurrent = 0;
        this.immune = false;
    }

	update()
	{
        this.elapsedTime += this.game.clockTick;
        this.status = 0;

        //console.log(this.experiencePoints);
        //update his level
        if (this.experiencePoints >= this.Level * 10) {
            this.Level +=1; //add level if experience points met
            //should we reset player's exp points?
        }

        this.game.cameraX = this.x - PARAMS.WIDTH/2 + this.width/2;
        this.game.cameraY = this.y - PARAMS.HEIGHT/2 + this.height/2;

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
        };

        // update bounding box
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);


        //add attack
        if (Math.floor(this.elapsedTime) < 2 && !this.attacking){
            //this.game.addAttackEntity(new FireSlash(this.game, this, 1 + (Math.floor(this.Level/100))));
            this.game.addAttackEntity(new FireBreath(this.game, this, 1 + (Math.floor(this.Level/100)), 2));
            this.attacking = true
        }

        if (Math.floor(this.elapsedTime) > 1 && this.attacking){
            this.elapsedTime = 0;
            this.attacking = false;
        }

        // mickey only collide with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity); 
            }
        });

        // immunity frames
        if (this.immune) {
            if (this.immunityCurrent++ >= this.immunityFrames) {
                this.immunityCurrent = 0;
                this.immune = false;
            }
        }
	};

	draw(ctx)
	{
        if (this.status == 0 && this.facing == 0){
            this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width,this.height);
        }else if (this.status == 0 && this.facing == 1){
            this.animations[2].drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width,this.height);
        }else if (this.status == 1 && this.facing == 0){
            this.animations[1].drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width,this.height);
        }else if (this.status == 1 && this.facing == 1){
            this.animations[3].drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width,this.height);
        };

        this.drawHealthBar(ctx);

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
        }
	};

    drawHealthBar(ctx){
        const camX = this.x + 15 - this.game.cameraX;
        const camY = this.y - 8 - this.game.cameraY;
        //drawing health box
        //--BACKGROUND FOR MAX HP
        ctx.fillStyle = 'black';
        ctx.fillRect(camX, camY, 80, 10);

        //--Calculating Current HP and changing color with appropriate indicators for health percentage.
        let healthRatio = this.currentHP/this.MaxHP;
        let healthBarSize = 80 * healthRatio;
        if (healthRatio > 0.75) ctx.fillStyle = 'green';
        if (healthRatio <= 0.75) ctx.fillStyle = 'orange';
        if (healthRatio <= 0.50) ctx.fillStyle = 'red';
        if (healthRatio <= 0.25) ctx.fillStyle = 'maroon';
        if (healthRatio >= 0){ ctx.fillRect(camX, camY, healthBarSize, 10)}
        else {ctx.fillRect(camX, camY, 0, 10)}
    }
    
}
