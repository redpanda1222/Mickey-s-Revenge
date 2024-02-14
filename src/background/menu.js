const menuButtonDimensions = {
    w: 90,
    h: 26
}

const startButton = {
    x: PARAMS.WIDTH / 2,
    y: PARAMS.HEIGHT / 2 + 40,
    color: "white"
}

const creditsButton = {
    x: PARAMS.WIDTH / 2,
    y: PARAMS.HEIGHT / 2 + 80,
    color: "white"
}

const creditsBackButton = {
    x: PARAMS.WIDTH / 2,
    y: PARAMS.HEIGHT - 40,
    color: "white"
}

class MenuScreen {
    constructor(game, sceneManager) {
        this.game = game;
        this.sceneManager = sceneManager;

        this.isInMenu = true;
        this.isInCredits = false;

        this.menuSelect = {
            start: false,
            credits: false
        };
    }

    update() {
        if (this.game.mouse) {
            if (this.isInCredits) {
                creditsBackButton.color = "white";
                if (mouseOver(this.game.mouse, creditsBackButton.x - menuButtonDimensions.w / 2, 
                                               creditsBackButton.y - menuButtonDimensions.h / 2, 
                                               menuButtonDimensions.w, menuButtonDimensions.h)) {
                    creditsBackButton.color = "gold";
                    if (this.game.click) {
                        this.isInCredits = false;
                    }
                }
                this.game.click = null;
            } else if (this.isInMenu) {
                startButton.color = "white";
                creditsButton.color = "white";
                if (this.menuSelect.start || 
                        mouseOver(this.game.mouse, startButton.x - menuButtonDimensions.w / 2, 
                                                   startButton.y - menuButtonDimensions.h / 2, 
                                                   menuButtonDimensions.w, menuButtonDimensions.h)) {
                    startButton.color = "gold";
                    if (this.game.click) {
                        // clicked on start
                        this.isInMenu = false;
                        this.sceneManager.gameover = false;
                        this.sceneManager.gamewin = false;
                        this.sceneManager.loadScene(levelOne, true);
                    }
                }
                if (this.menuSelect.credits || 
                        mouseOver(this.game.mouse, creditsButton.x - menuButtonDimensions.w / 2, 
                                                   creditsButton.y - menuButtonDimensions.h / 2, 
                                                   menuButtonDimensions.w, menuButtonDimensions.h)) {
                    creditsButton.color = "gold";
                    if (this.game.click) {
                        this.isInCredits = true;
                        this.menuSelect.credits = false;
                    }
                }
                this.game.click = null;
            }
        }
    };

    draw(ctx) {
        ctx.strokeStyle = "Black";
        ctx.textAlign = "center";
        if (this.isInCredits) {
            centerRect(ctx, creditsBackButton.x, creditsBackButton.y, menuButtonDimensions.w, menuButtonDimensions.h, creditsBackButton.color, "black");

            ctx.font = (menuButtonDimensions.h - 4) + 'px Arial';
            ctx.fillText("Back", creditsBackButton.x, creditsBackButton.y + menuButtonDimensions.h / 2 - 4);

            let creatorY = PARAMS.HEIGHT / 2  - 50;
            let vertspacing = 30;

            centerRect(ctx, PARAMS.WIDTH / 2, creatorY, 240, 290, "lightgray", "black");

            ctx.font = (vertspacing * 2 / 3) + 'px Arial';
            ctx.fillText("Creators:", PARAMS.WIDTH / 2, creatorY - vertspacing * 2.5);
            ctx.fillText("Mark Andrey Rubio", PARAMS.WIDTH / 2, creatorY - vertspacing);
            ctx.fillText("Soe Lin", PARAMS.WIDTH / 2, creatorY);
            ctx.fillText("Yasin Ibrahim", PARAMS.WIDTH / 2, creatorY + vertspacing);
            ctx.fillText("Bairu Li", PARAMS.WIDTH / 2, creatorY + vertspacing * 2);

        } else if (this.isInMenu) {
            centerRect(ctx, startButton.x, startButton.y, menuButtonDimensions.w, menuButtonDimensions.h, startButton.color, "black");
            centerRect(ctx, creditsButton.x, creditsButton.y, menuButtonDimensions.w, menuButtonDimensions.h, creditsButton.color, "black");

            ctx.fillStyle = "black";
            ctx.font = '120px titleFont';
            ctx.fillText("Mickey's Revenge", PARAMS.WIDTH / 2, 150);

            ctx.font = (menuButtonDimensions.h - 4) + 'px Arial';
            ctx.fillText("Start", startButton.x, startButton.y + menuButtonDimensions.h / 2 - 4);
            ctx.fillText("Credits", creditsButton.x, creditsButton.y + menuButtonDimensions.h / 2 - 4);
        }
    };
}