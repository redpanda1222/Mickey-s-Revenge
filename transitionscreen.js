class TransitionScreen {
    constructor(game, scene, x, y) {
        Object.assign(this, { game, scene, x, y });
        this.message = "Mickey lost Minnie to those damn monsters";
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if (this.elapsed > 4) {
            this.removeFromWorld = true;
            this.game.camera.loadScene(this.scene, this.x, this.y, false);
        } else if (this.elapsed > 2) {
            this.message = "Now he's seeking revenge!!!";
        };
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.WIDTH, PARAMS.HEIGHT);

        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.font = '40px Arial';
        ctx.fillText(this.message, PARAMS.WIDTH / 2, PARAMS.HEIGHT / 2);
    };
};
