class TransitionScreen {
    constructor(game, scene) {
        Object.assign(this, { game, scene });
        this.message = "";
        this.randomMessage = randomInt(3);
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if (this.scene) {
            if (this.elapsed > 4) {
                this.removeFromWorld = true;
                this.game.camera.loadScene(this.scene, false);
            } else if (this.elapsed > 2) {
                this.message = "Now he's seeking revenge!!!";
            } else {
                this.message = "Mickey lost Minnie to those damn monsters";
            }
        } else {
            if (this.elapsed > 2) {
                this.removeFromWorld = true;
                this.game.camera.menu.isInMenu = true;
            } else {
                switch(this.randomMessage) {
                    case 0:
                        this.message = "You Died";
                        break;
                    case 1:
                        this.message = "Get Good";
                        break;
                    default:
                        this.message = "Death only fuels his vengeance!!!";
                }
            }
        }
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
