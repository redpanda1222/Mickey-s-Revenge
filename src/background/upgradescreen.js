const upgradeButtonLeft = {
    x: PARAMS.WIDTH * 0.25,
    y: PARAMS.HEIGHT / 1.2,
    color: "black"
}

const upgradeButtonMid = {
    x: PARAMS.WIDTH * 0.5,
    y: PARAMS.HEIGHT / 1.2,
    color: "black"
}

const upgradeButtonRight = {
    x: PARAMS.WIDTH * 0.75,
    y: PARAMS.HEIGHT / 1.2,
    color: "black"
}

const upgradeButtonDimensions = {
    w: 240,
    h: 120
}

class UpgradeScreen {
    constructor(game, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager;
        this.visible = false;

        this.upgrade1 = "Fire Slash Upgrade";
        this.upgrade2 = "Fire Breath Upgrade";
        this.upgrade3 = "Fire Slash Upgrade";

        this.upgrades = ["Fire Slash Upgrade", "Fire Breath Upgrade", "Increased Health: +100"];

        this.fireSlashMaxLevel = 4
        this.fireBreathMaxLevel = 2
    }

    handleUpgrade(Upgrade) {
        if (Upgrade == "Fire Slash Upgrade" && this.sceneManager.mickey.fireSlashLevel < this.fireSlashMaxLevel) {
            this.sceneManager.mickey.fireSlashLevel += 1;
        } else if (Upgrade == "Fire Breath Upgrade" && this.sceneManager.mickey.fireBreathLevel < this.fireBreathMaxLevel) {
            this.sceneManager.mickey.fireBreathLevel += 1;
        } else if (Upgrade == "Increased Health: +100") {
            this.sceneManager.mickey.MaxHP += 100;
            this.sceneManager.mickey.currentHP += 100;
        }
        this.upgrade1 = null;
        this.upgrade2 = null;
        this.upgrade3 = null;
    }

    update() {
        if (this.upgrade1 == null || this.upgrade2 == null || this.upgrade3 == null) {
            this.upgrade1 = this.upgrades[Math.floor((Math.random() * this.upgrades.length + 1))];
            this.upgrade2 = this.upgrades[Math.floor((Math.random() * this.upgrades.length + 1))];
            this.upgrade3 = this.upgrades[Math.floor((Math.random() * this.upgrades.length + 1))];
        }

        if (this.game.mouse && this.visible) {
            this.game.pause = true;
            if (mouseOver(this.game.mouse, upgradeButtonLeft.x - upgradeButtonDimensions.w / 2,
                upgradeButtonLeft.y - upgradeButtonDimensions.h / 2,
                upgradeButtonDimensions.w, upgradeButtonDimensions.h)) {
                creditsBackButton.color = "gray";
                if (this.game.click) {
                    this.handleUpgrade(this.upgrade1);
                    this.visible = false;
                    this.game.pause = false;
                }
            }
            if (mouseOver(this.game.mouse, upgradeButtonMid.x - upgradeButtonDimensions.w / 2,
                upgradeButtonMid.y - upgradeButtonDimensions.h / 2,
                upgradeButtonDimensions.w, upgradeButtonDimensions.h)) {
                creditsBackButton.color = "gray";
                if (this.game.click) {
                    this.handleUpgrade(this.upgrade2);
                    this.visible = false;
                    this.game.pause = false;
                }
            }
            if (mouseOver(this.game.mouse, upgradeButtonRight.x - upgradeButtonDimensions.w / 1.3,
                upgradeButtonRight.y - upgradeButtonDimensions.h / 2,
                upgradeButtonDimensions.w, upgradeButtonDimensions.h)) {
                creditsBackButton.color = "gray";
                if (this.game.click) {
                    this.handleUpgrade(this.upgrade3);
                    this.visible = false;
                    this.game.pause = false;
                }
            }
            this.game.click = null;
        }
    }

    draw(ctx) {
        if (this.visible) {
            ctx.textAlign = "center";
            centerRect(ctx, upgradeButtonLeft.x, upgradeButtonLeft.y + 20, upgradeButtonDimensions.w, upgradeButtonDimensions.h, upgradeButtonLeft.color, "black");
            centerRect(ctx, upgradeButtonMid.x, upgradeButtonMid.y + 20, upgradeButtonDimensions.w, upgradeButtonDimensions.h, upgradeButtonMid.color, "black");
            centerRect(ctx, upgradeButtonRight.x, upgradeButtonRight.y + 20, upgradeButtonDimensions.w, upgradeButtonDimensions.h, upgradeButtonRight.color, "black");

            ctx.fillStyle = "white";
            ctx.font = (upgradeButtonDimensions.h/2) + 'px Arial';
            ctx.fillText(this.upgrade1, upgradeButtonLeft.x, upgradeButtonLeft.y + upgradeButtonDimensions.h / 2 , upgradeButtonDimensions.w * 0.80);
            ctx.fillText(this.upgrade2, upgradeButtonMid.x, upgradeButtonMid.y + upgradeButtonDimensions.h / 2, upgradeButtonDimensions.w * 0.80);
            ctx.fillText(this.upgrade3, upgradeButtonRight.x, upgradeButtonRight.y + upgradeButtonDimensions.h / 2, upgradeButtonDimensions.w * 0.80);
        }
    }
}