class Mickey {
    constructor(game){
		this.game = game;
        this.facing = 0;
        this.status = 0;
		this.x = 0;
		this.y = 0;
        this.movementSpeed = 2.5;
        this.animations = [];
        this.layer = 1;
        this.loadAnimations();
    
        //Rectangle 
        this.xRect = this.x + 3;
        this.yRect = this.y - 2;
        this.wRect = 90;
        this.hRect = 90;
        this.left = this.xRect;
        this.top = this.yRect;
        this.right = this.left + this.wRect;
        this.bottom = this.top + this.hRect;
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

        this.xRect = this.x + 3;
        this.yRect = this.y - 2;
        this.left = this.xRect;
        this.top = this.yRect;
        this.right = this.left + this.wRect;
        this.bottom = this.top + this.hRect;
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

        ctx.beginPath();
        ctx.rect(this.xRect, this.yRect, this.wRect, this.hRect);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
	};
    
}