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
            // load background
            this.game.background.updateTileGrid(level.tileGrid, 64, 2, true);
            let i;
            let obj;

            this.game.addEntity(new Mickey(this.game));

            // barbedwires
            for (i = 0; i < level.barbedwires.length; i++) {
                obj = level.barbedwires[i];
                this.game.addEntity(new BackgroundObject(obj.x, obj.y, 83, 56, 1, "./assets/background/barbedwire1.png"));
            }
            // deadtrees
            for (i = 0; i < level.deadtrees.length; i++) {
                obj = level.deadtrees[i];
                this.game.addEntity(new BackgroundObject(obj.x, obj.y, 1920, 1920, 0.05, "./assets/background/deadtree.png"));
            }
            // deserttowers
            for (i = 0; i < level.deserttowers.length; i++) {
                obj = level.deserttowers[i];
                this.game.addEntity(new BackgroundObject(obj.x, obj.y, 311, 324, 0.5, "./assets/background/deserttower.png"));
            }
            // destroyeddeserttowers
            for (i = 0; i < level.destroyeddeserttowers.length; i++) {
                obj = level.destroyeddeserttowers[i];
                this.game.addEntity(new BackgroundObject(obj.x, obj.y, 393, 399, 0.5, "./assets/background/destroyedDesertTower.png"));
            }

            // walmartstonehenge
            for (i = 0; i < level.walmartstonehenge.length; i++) {
                obj = level.walmartstonehenge[i];
                this.game.addEntity(new BackgroundObject(obj.x, obj.y, 446, 370, 0.5, "./assets/background/walmartStoneHenge.png"));
            }
            // here for testing, later we may want to spawn them randomly or something
            this.game.addEntity(new Bird(this.game));
            this.game.addEntity(new Huskydog(this.game));
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
