class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.level = null;

        // preload
        this.game.background = new Background(this, 0, 0, [], 0, 0, false);
        this.menu = new MenuScreen(game, this);
        this.loadScene(levelOne, 0, 0, false);
    };

    loadScene(level, x, y, isTransition) {
        if (isTransition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y));
        } else if (this.menu.isInMenu == false) {
            // load level stuff
            if (level.tileGrid) {
                console.log("loaded");
                this.game.background.updateTileGrid(level.tileGrid, 64, 1, true);
            }
        }
    }

    update() {
        if (this.menu.isInMenu) {
            this.menu.update();
        }
    };

    draw(ctx) {
        if (this.menu.isInMenu) {
            this.menu.draw(ctx);
        }
    };
};