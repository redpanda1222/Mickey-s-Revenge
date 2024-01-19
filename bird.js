class Bird {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./bird.png"), 0, 160, 160, 160, 8, 0.1);

        this.x = 0;
        this.y = 100;
        this.speed = 200;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
        if(this.x > 1024) this.x = -200;
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 50, 50);
    };
};