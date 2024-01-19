const menuButtonDimensions = {
    w: 80,
    h: 20
}

const creditsButtonPos = {
    x: PARAMS.WIDTH / 2,
    y: PARAMS.HEIGHT / 2 + 15
}

const creditsBackButtonPos = {
    x: PARAMS.WIDTH / 2,
    y: PARAMS.HEIGHT - 40
}

const startButtonPos = {
    x: PARAMS.WIDTH / 2,
    y: PARAMS.HEIGHT / 2 - 15
}

class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.isInMenu = true;
        this.isInCredits = false;
        this.level = null;

        this.menuSelect = {
            start: false,
            credits: false
        };

        this.loadScene(levelOne, 0, 0, false);
    };

    loadScene(level, x, y, isTransition) {
        if (isTransition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y));
            //this.game.addEntity(new Bird(this.game));
        } else {
            // levels go here
            this.game.addEntity(new Bird(this.game));
            this.game.addEntity(new Huskydog(this.game));
        }
    }

    update() {
        if (this.game.click) {
            if (this.isInCredits) {
                if (mouseOver(this.game.click, creditsBackButtonPos.x - menuButtonDimensions.w / 2, 
                                               creditsBackButtonPos.y - menuButtonDimensions.h / 2, 
                                               menuButtonDimensions.w, menuButtonDimensions.h)) {
                    this.isInCredits = false;
                }
            } else if (this.isInMenu) {
                // console.log(this.game.click.x + " " + this.game.click.y);
                if (this.menuSelect.start || 
                        mouseOver(this.game.click, startButtonPos.x - menuButtonDimensions.w / 2, 
                                                   startButtonPos.y - menuButtonDimensions.h / 2, 
                                                   menuButtonDimensions.w, menuButtonDimensions.h)) {
                    console.log("Clicked on start");
                    this.isInMenu = false;
                    this.loadScene(levelOne, 0, 0, true);
                }
                if (this.menuSelect.credits || 
                        mouseOver(this.game.click, creditsButtonPos.x - menuButtonDimensions.w / 2, 
                                                   creditsButtonPos.y - menuButtonDimensions.h / 2, 
                                                   menuButtonDimensions.w, menuButtonDimensions.h)) {
                    console.log("Clicked on credits");
                    this.isInCredits = true;
                    this.menuSelect.credits = false;
                }
            }
            this.game.click = null;
        }
    };

    draw(ctx) {
        ctx.strokeStyle = "Black";
        ctx.textAlign = "center";
        if (this.isInCredits) {
            centerRect(ctx, creditsBackButtonPos.x, creditsBackButtonPos.y, menuButtonDimensions.w, menuButtonDimensions.h);

            ctx.font = menuButtonDimensions.h + 'px Arial';
            ctx.fillText("Back", creditsBackButtonPos.x, creditsBackButtonPos.y + menuButtonDimensions.h / 2 - 2);

            ctx.font = '40px Arial';
            ctx.fillText("Name", PARAMS.WIDTH / 2, PARAMS.HEIGHT / 2);
        } else if (this.isInMenu) {
            centerRect(ctx, startButtonPos.x, startButtonPos.y, menuButtonDimensions.w, menuButtonDimensions.h);
            centerRect(ctx, creditsButtonPos.x, creditsButtonPos.y, menuButtonDimensions.w, menuButtonDimensions.h);

            ctx.font = '40px Arial';
            ctx.fillText("Cool Menu", PARAMS.WIDTH / 2, 40);

            ctx.font = menuButtonDimensions.h + 'px Arial';
            ctx.fillText("Start", startButtonPos.x, startButtonPos.y + menuButtonDimensions.h / 2 - 2);
            ctx.fillText("Credits", creditsButtonPos.x, creditsButtonPos.y + menuButtonDimensions.h / 2 - 2);
        } else {

        }
    };
};