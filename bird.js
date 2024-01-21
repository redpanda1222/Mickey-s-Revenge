class Bird {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./assets/enemy/bird.png"), 0, 160, 159, 160, 7, 0.1);

        this.x = 0;
        this.y = 50;
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