class TransitionScreen {
    constructor(game, scene, x, y) {
        Object.assign(this, { game, scene, x, y });

        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if (this.elapsed > 2) {
            this.game.entities.length -= 1;
            console.log("Start Gaming");
            this.game.camera.loadScene(this.scene, this.x, this.y, false);
        }
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.WIDTH, PARAMS.HEIGHT);

        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.font ='40px Arial';
        ctx.fillText("SICK TRANSITION", PARAMS.WIDTH / 2, PARAMS.HEIGHT / 2);
    };
};
