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
        this.mickey = sceneManager.mickey;
        this.visible = false;

        this.upgrades = ["Fire Slash Upgrade", "Fire Breath Upgrade", "Rasengan Upgrade", "Fire Blade Upgrade", "Increased Health: +15", "Laser Upgrade"];

        this.generateUpgrades();

        this.fireSlashMaxLevel = 4;
        this.fireBreathMaxLevel = 2;
        this.fireBladeMaxLevel = 5;
        this.rasenganMaxLevel = 5;
        this.laserMaxLevel = 5;
    }

    generateUpgrades() { // does not allow duplicates
        const rand1 = randomInt(this.upgrades.length);
        let rand2 = randomInt(this.upgrades.length);
        let rand3 = randomInt(this.upgrades.length);

        while (rand2 === rand1) {
            rand2 = randomInt(this.upgrades.length);
        }
        
        while (rand3 === rand1 || rand3 === rand2) {
            rand3 = randomInt(this.upgrades.length);
        }

        this.upgrade1 = this.upgrades[rand1];
        this.upgrade2 = this.upgrades[rand2];
        this.upgrade3 = this.upgrades[rand3];
    }

    handleUpgrade(Upgrade) {
        if (Upgrade == "Fire Slash Upgrade" && this.mickey.fireSlashLevel < this.fireSlashMaxLevel) {
            this.mickey.fireSlashLevel += 1;
            // example of changing CD
            if (this.mickey.fireSlashLevel == 3) this.mickey.fireSlashCD.timesUp = 4; // change cd to 4 sec
        }
        else if (Upgrade == "Fire Breath Upgrade" && this.mickey.fireBreathLevel < this.fireBreathMaxLevel) {
            this.mickey.fireBreathLevel += 1;
        }
        else if (Upgrade == "Rasengan Upgrade" && this.mickey.rasenganLevel < this.rasenganMaxLevel) {
            this.mickey.rasenganLevel += 1;
        }
        else if (Upgrade == "Fire Blade Upgrade" && this.mickey.fireBladeLevel < this.fireBladeMaxLevel) {
            this.mickey.fireBladeLevel += 1;
        }
        else if (Upgrade == "Laser Upgrade" && this.mickey.laserLevel < this.laserMaxLevel) {
            this.mickey.laserLevel += 1;
        }
        else if (Upgrade == "Increased Health: +15") {
            this.mickey.MaxHP += 15;
            this.mickey.currentHP += 15;
        }
        this.upgrade1 = null;
        this.upgrade2 = null;
        this.upgrade3 = null;
    }

    unpause() {
        this.visible = false;
        this.game.pausable = true;
        this.game.pause = false;
        this.game.showPause = true;
    }

    update() {
        if (!this.visible) return;

        if (this.upgrade1 === null || this.upgrade2 === null || this.upgrade3 === null) {
            this.generateUpgrades();
        }

        if (this.game.mouse) {
            this.game.pause = true;
            this.game.pausable = false;
            this.game.showPause = false;
            if (mouseOver(this.game.mouse, upgradeButtonLeft.x - upgradeButtonDimensions.w / 2,
                upgradeButtonLeft.y - upgradeButtonDimensions.h / 2,
                upgradeButtonDimensions.w, upgradeButtonDimensions.h)) {
                creditsBackButton.color = "gray";
                if (this.game.click) {
                    this.handleUpgrade(this.upgrade1);
                    this.unpause();
                }
            }
            if (mouseOver(this.game.mouse, upgradeButtonMid.x - upgradeButtonDimensions.w / 2,
                upgradeButtonMid.y - upgradeButtonDimensions.h / 2,
                upgradeButtonDimensions.w, upgradeButtonDimensions.h)) {
                creditsBackButton.color = "gray";
                if (this.game.click) {
                    this.handleUpgrade(this.upgrade2);
                    this.unpause();
                }
            }
            if (mouseOver(this.game.mouse, upgradeButtonRight.x - upgradeButtonDimensions.w / 1.3,
                upgradeButtonRight.y - upgradeButtonDimensions.h / 2,
                upgradeButtonDimensions.w, upgradeButtonDimensions.h)) {
                creditsBackButton.color = "gray";
                if (this.game.click) {
                    this.handleUpgrade(this.upgrade3);
                    this.unpause();
                }
            }
        }
    }

    draw(ctx) {
        if (this.visible) {
            ctx.fillStyle = rgba(0,0,0,0.5);
            ctx.fillRect(0, 0, PARAMS.WIDTH, PARAMS.HEIGHT);

            ctx.strokeStyle = "gold";
            ctx.textAlign = "center";
            centerRect(ctx, upgradeButtonLeft.x, upgradeButtonLeft.y + 20, upgradeButtonDimensions.w, upgradeButtonDimensions.h, upgradeButtonLeft.color, "black");
            centerRect(ctx, upgradeButtonMid.x, upgradeButtonMid.y + 20, upgradeButtonDimensions.w, upgradeButtonDimensions.h, upgradeButtonMid.color, "black");
            centerRect(ctx, upgradeButtonRight.x, upgradeButtonRight.y + 20, upgradeButtonDimensions.w, upgradeButtonDimensions.h, upgradeButtonRight.color, "black");

            ctx.fillStyle = "white";
            ctx.font = (upgradeButtonDimensions.h/3) + 'px Arial';
            ctx.fillText(this.upgrade1, upgradeButtonLeft.x, upgradeButtonLeft.y + 40 , upgradeButtonDimensions.w * 0.80);
            ctx.fillText(this.upgrade2, upgradeButtonMid.x, upgradeButtonMid.y + 40, upgradeButtonDimensions.w * 0.80);
            ctx.fillText(this.upgrade3, upgradeButtonRight.x, upgradeButtonRight.y + 40, upgradeButtonDimensions.w * 0.80);
        }
    }
}