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
            //load music
            if(level.music && !this.title){
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset(level.music);
            }
            // load level stuff
            if (level.tileGrid) {
                this.game.background.updateTileGrid(level.tileGrid, 64, 1, true);
            };
            // load background
            this.game.background.updateTileGrid(level.tileGrid, 64, 2, true);
            let i;
            let obj;

            let mickey = new Mickey(this.game);

            // barbedwires
            for (i = 0; i < level.barbedwires.length; i++) {
                obj = level.barbedwires[i];
                this.game.addEntity(new BarbedWire(obj.x, obj.y, 83, 56, 1, mickey));
            }
            // deadtrees
            for (i = 0; i < level.deadtrees.length; i++) {
                obj = level.deadtrees[i];
                this.game.addEntity(new DeadTree(obj.x, obj.y, 1920, 1920, 0.05, mickey));
            }
            // deserttowers
            for (i = 0; i < level.deserttowers.length; i++) {
                obj = level.deserttowers[i];
                this.game.addEntity(new DesertTower(obj.x, obj.y, 311, 324, 0.5, mickey));
            }
            // destroyeddeserttowers
            for (i = 0; i < level.destroyeddeserttowers.length; i++) {
                obj = level.destroyeddeserttowers[i];
                this.game.addEntity(new DestroyedDesertTower(obj.x, obj.y, 393, 399, 0.5, mickey));
            }
            // walmartstonehenges
            for (i = 0; i < level.walmartstonehenges.length; i++) {
                obj = level.walmartstonehenges[i];
                this.game.addEntity(new WallmartStoneHenge(obj.x, obj.y, 446, 370, 0.5, mickey));
            }
            // deadbodies
            for (i = 0; i < level.deadbodies.length; i++) {
                obj = level.deadbodies[i];
                this.game.addEntity(new DeadBody(obj.x, obj.y, 64, 34, 1, mickey));
            }
            // emptybarrels
            for (i = 0; i < level.emptybarrels.length; i++) {
                obj = level.emptybarrels[i];
                this.game.addEntity(new EmptyBarrel(obj.x, obj.y, 72, 64, 1, mickey));
            }
            // here for testing, later we may want to spawn them randomly or something
            this.game.addEntity(new Bird(this.game, mickey, 1000, 50));
            this.game.addEntity(new Huskydog(this.game, mickey, 0, 720));
            this.game.addEntity(new Skeleton(this.game, mickey, 1000, 720));

            this.game.addEntity(mickey);
        };
    };

    updateAudio(){
        var mute = document.getElementById("mute").ariaChecked;
        var volume = document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };
    
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