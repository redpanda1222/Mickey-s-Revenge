class Mickey {
    constructor(game){
		this.game = game;
		this.animator = new Animator(ASSET_MANAGER.getAsset("./mickey.png"), 0, 0, 66,73,10,0.2);
		this.x = 0;
		this.y = 0;
		this.speed = 130;
	};

	update()
	{
		const currentFrame = this.animator.currentFrame();
		if (this.x > 1024) 
		{
			this.x = -66 * 3;
		}
		else if (currentFrame > 3)
		{
			this.x += this.speed * this.game.clockTick;
		};
	};

	draw(ctx)
	{
		this.animator.drawFrame(this.game.clockTick, ctx, this.x,this.y, 3);
	};
    
}