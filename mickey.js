class Mickey {
    constructor(game){
		this.game = game;
        this.facing = 0;
        this.status = 0;
		this.x = 0;
		this.y = 0;
        this.movementSpeed = 2.5;
        this.animations = [];
        this.width = 100;
        this.height = 100;
        this.loadAnimations();
        this.updateBB();
	};

    updateBB(){
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 100,100);
    };

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
        };

        this.updateBB();

        var that = this;
        this.game.entities.forEach(function(entity){
            if (entity.BB && that.BB.collide(entity.BB)){
                if ((entity instanceof DesertTower || entity instanceof DestroyedDesertTower || entity instanceof DeadTree || entity instanceof BarbedWire || entity instanceof DeadBody || entity instanceof WallmartStoneHenge || entity instanceof EmptyBarrel)){
                    let overlap = that.BB.overlap(entity.BB);
                    console.log("Xdif " + overlap.x + " Ydif " + overlap.y);
                    if (that.lastBB.right >= entity.BB.left && that.lastBB.left < entity.BB.left){
                        if (overlap.x < 5) {
                            that.x = entity.left - that.width;
                        }
                        if (that.lastBB.bottom >= entity.BB.top && that.lastBB.bottom < entity.BB.bottom){
                            if (overlap.y < 5){
                                that.y = entity.BB.top - that.height;
                            }            
                        }
                        if (that.lastBB.top <= entity.BB.bottom && that.lastBB.bottom > entity.BB.bottom) {
                            if (overlap.y < 5){
                                that.y = entity.BB.bottom;
                            }

                        }
                    }
                    else if (that.lastBB.left <= entity.BB.right && that.lastBB.right > entity.BB.right){
                        if (overlap.x < 5) {
                            that.x = entity.BB.right;
                        }
                        if (that.lastBB.bottom >= entity.BB.top && that.lastBB.bottom < entity.BB.bottom){
                            if (overlap.y < 5){
                                that.y = entity.BB.top - that.height;
                            }            
                        }
                        if (that.lastBB.top <= entity.BB.bottom && that.lastBB.bottom > entity.BB.bottom) {
                            if (overlap.y < 5){
                                that.y = entity.BB.bottom;
                            }

                        }
                    }else if (that.lastBB.bottom >= entity.BB.top && that.BB.bottom < entity.BB.bottom) {
                        that.y = entity.BB.top - that.height;
                    }else if (that.lastBB.top <= entity.BB.bottom) {
                        that.y = entity.BB.bottom;
                    };
                };
                 
            };
        });
	};

	draw(ctx)
	{
        if (this.status == 0 && this.facing == 0){
            this.animations[0].drawFrame(this.game.clockTick, ctx, this.x,this.y, 100,100);
        }else if (this.status == 0 && this.facing == 1){
            this.animations[2].drawFrame(this.game.clockTick, ctx, this.x,this.y, 100,100);
        }else if (this.status == 1 && this.facing == 0){
            this.animations[1].drawFrame(this.game.clockTick, ctx, this.x,this.y, 100,100);
        }else if (this.status == 1 && this.facing == 1){
            this.animations[3].drawFrame(this.game.clockTick, ctx, this.x,this.y, 100,100);
        };

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
	};
    
}