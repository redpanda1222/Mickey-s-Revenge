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
        if (this.game.click) {
            if (this.isInCredits) {
                if (mouseOver(this.game.click, creditsBackButtonPos.x - menuButtonDimensions.w / 2, 
                                               creditsBackButtonPos.y - menuButtonDimensions.h / 2, 
                                               menuButtonDimensions.w, menuButtonDimensions.h)) {
                    this.isInCredits = false;
                }
            } else if (this.isInMenu) {
                if (this.menuSelect.start || 
                        mouseOver(this.game.click, startButtonPos.x - menuButtonDimensions.w / 2, 
                                                   startButtonPos.y - menuButtonDimensions.h / 2, 
                                                   menuButtonDimensions.w, menuButtonDimensions.h)) {
                    console.log("Clicked on start");
                    this.isInMenu = false;
                    this.sceneManager.loadScene(levelOne, 0, 0, true);
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
        }
    };
}