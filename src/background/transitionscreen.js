class TransitionScreen {
    constructor(game, scene, isGamewin) {
        Object.assign(this, { game, scene, isGamewin });
        this.message = "";
        this.randomMessage = randomInt(3);
        this.elapsed = 0;
        this.showTitle = false;
        this.fade = false;
        this.opacity = 1;
        this.fading = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if (this.isGamewin) {
            if (this.elapsed > 10) {
                this.game.transition = null;
                this.game.camera.menu.isInMenu = true;
            } else if (this.elapsed > 8) {
                this.message = "";
                this.fade = true;
                this.showTitle = true;
                this.fading = 0.0084;
            } else if (this.elapsed > 6) {
                this.message = "All he has now, is MORE REVENGE!!!";
                ASSET_MANAGER.pauseAsset("./audio/pianoambience.wav");
            } else if (this.elapsed > 4) {
                this.message = "Minnie cannot come back";
            } else if (this.elapsed > 2) {
                this.message = "But at what cost";
            } else {
                this.message = "Mickey finally got his revenge";
                ASSET_MANAGER.playAsset("./audio/pianoambience.wav");
            }
        } else if (this.scene) {
            if (this.elapsed > 6) {
                this.game.transition = null;
                this.game.camera.loadScene(this.scene, false);
                ASSET_MANAGER.pauseAsset("./audio/suspense.wav");
            } else if (this.elapsed > 5) {
                this.message = "Now he's seeking revenge!!!";
            } else if (this.elapsed > 3) {
                this.message = "Mickey lost Minnie to those damn monsters";
            } else {
                ASSET_MANAGER.playAsset("./audio/suspense.wav");
                this.message = "In the darkest of all timelines";
            }
        } else {
            if (this.elapsed > 2) {
                this.game.transition = null;
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
        if (this.showTitle) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, PARAMS.WIDTH, PARAMS.HEIGHT);
            ctx.fillStyle = "black";
            ctx.font = '120px titleFont';
            ctx.fillText("Mickey's Revenge", PARAMS.WIDTH / 2, 150);
        }

        if (this.fade) {
            ctx.fillStyle = rgba(0,0,0,this.opacity);
            this.opacity -= this.fading;
        } else {
            ctx.fillStyle = "Black";
        }
        
        ctx.fillRect(0, 0, PARAMS.WIDTH, PARAMS.HEIGHT);

        ctx.fillStyle = "White";
        ctx.textAlign = "center";
        ctx.font = '40px Arial';
        ctx.fillText(this.message, PARAMS.WIDTH / 2, PARAMS.HEIGHT / 2);
    };
};
