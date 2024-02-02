class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;

        this.level = null;
        this.mickey = new Mickey(this.game);
        this.spawnmanager = new SpawnManager(this.game, this.mickey);
        this.gameover = false;

        // preload
        this.game.background = new Background(this, 0, 0, [], 0, 0, false);
        this.menu = new MenuScreen(game, this);
        this.loadScene(levelOne, false);
    };

    clearAllEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
        this.game.backgroundEntities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadScene(level, isTransition) {
        if (isTransition) {
            this.game.addEntity(new TransitionScreen(this.game, level));
        } else if (this.menu.isInMenu == false) {
            //load music
            if (level.music && !this.title) {
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset(level.music);
                // this.updateAudio();
            }
            // load background
            this.game.background.updateTileGrid(level.tileGrid, level.tileSize, level.tileScale, true);
            let i;
            let obj;

            // barbedwires
            for (i = 0; i < level.barbedwires.length; i++) {
                obj = level.barbedwires[i];
                this.game.addBackgroundEntity(new BarbedWire(obj.x, obj.y));
            }
            // deadtrees
            for (i = 0; i < level.deadtrees.length; i++) {
                obj = level.deadtrees[i];
                this.game.addBackgroundEntity(new DeadTree(obj.x, obj.y));
            }
            // deserttowers
            for (i = 0; i < level.deserttowers.length; i++) {
                obj = level.deserttowers[i];
                this.game.addBackgroundEntity(new DesertTower(obj.x, obj.y));
            }
            // destroyeddeserttowers
            for (i = 0; i < level.destroyeddeserttowers.length; i++) {
                obj = level.destroyeddeserttowers[i];
                this.game.addBackgroundEntity(new DestroyedDesertTower(obj.x, obj.y));
            }
            // walmartstonehenges
            for (i = 0; i < level.walmartstonehenges.length; i++) {
                obj = level.walmartstonehenges[i];
                this.game.addBackgroundEntity(new WallmartStoneHenge(obj.x, obj.y));
            }
            // deadbodies
            for (i = 0; i < level.deadbodies.length; i++) {
                obj = level.deadbodies[i];
                this.game.addBackgroundEntity(new DeadBody(obj.x, obj.y));
            }
            // emptybarrels
            for (i = 0; i < level.emptybarrels.length; i++) {
                obj = level.emptybarrels[i];
                this.game.addBackgroundEntity(new EmptyBarrel(obj.x, obj.y));
            }
            // border
            const mapWidth = level.tileGrid[0].length * level.tileSize * level.tileScale;
            const mapHeight = level.tileGrid.length * level.tileSize * level.tileScale;
            // console.log(level.tileGrid.length * level.tileSize);
            this.game.addBackgroundEntity(new Border(-PARAMS.WIDTH / 2, 0, PARAMS.WIDTH / 2, mapHeight));
            this.game.addBackgroundEntity(new Border(mapWidth, 0, PARAMS.WIDTH / 2, mapHeight));
            this.game.addBackgroundEntity(new Border(-PARAMS.WIDTH / 2, -PARAMS.HEIGHT / 2, mapWidth + PARAMS.WIDTH / 2, PARAMS.HEIGHT / 2));
            this.game.addBackgroundEntity(new Border(-PARAMS.WIDTH / 2, mapHeight, mapWidth + PARAMS.WIDTH / 2, PARAMS.HEIGHT / 2));

            // here for testing, later we may want to spawn them randomly or something
            // this.game.addEntity(new Bird(this.game, this.mickey, 1000, 50));
            

            this.game.addEntity(this.mickey);
            this.game.pausable = true;
        };
    };
    updateAudio() {
        var muteCheckbox = document.getElementById("mute").checked;
        // console.log("Mute state: " + muteCheckbox);

        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(muteCheckbox);
        ASSET_MANAGER.adjustVolume(volume);
        ASSET_MANAGER.autoRepeat("./audio/escape.mp3");
    };

    update() {
        this.updateAudio();
        if (this.menu.isInMenu) {
            this.menu.update();
        }
        else if (this.gameover === false) { 
            this.spawnmanager.update();
            // reset when lose
            if (this.mickey.currentHP <= 0) {
                this.gameover = true;
                this.clearAllEntities();
                this.game.addEntity(new TransitionScreen(this.game));
                ASSET_MANAGER.pauseBackgroundMusic();
                this.game.pausable = false;

                this.game.background = new Background(this, 0, 0, [], 0, 0, false);;
                this.mickey = new Mickey(this.game);
                this.spawnmanager = new SpawnManager(this.game, this.mickey);
            }
        }
        this.updateAudio();
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) {
        if (this.menu.isInMenu) {
            this.menu.draw(ctx);
        }
    };
};