class Huskydog {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./huskydog.png"), 0, 61, 91, 60, 5, 0.1);

        this.x = 0;
        this.y = 720;
        this.speed = 100;
    };

    update() {
        this.x += this.speed * this.game.clockTick;
        if(this.x > 1024) this.x = -100;
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 50, 50);
    };
};