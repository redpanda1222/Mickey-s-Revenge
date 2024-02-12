class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        
        this.level = null;
        this.mickey = new Mickey(this.game, 800, 400); // 800 400 is initial x and y
        this.spawnmanager = new SpawnManager(this.game, this.mickey);

        this.gameover = false;

        // preload
        this.game.background = new Background(this.game, false);
        this.menu = new MenuScreen(game, this);
        this.loadScene(levelOne, false);
    };

    clearAllEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });

        this.game.attackEntities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });

        this.game.backgroundEntities.length = 0;
    };

    loadScene(level, isTransition) {
        
        if (isTransition) {
            this.game.transition = new TransitionScreen(this.game, level);
        } else if (this.menu.isInMenu == false) {
            this.game.pausable = true;
            //load music
            if (level.music && !this.title) {
                ASSET_MANAGER.pauseBackgroundMusic();
                ASSET_MANAGER.playAsset(level.music);

            }
            // load background
            this.game.background.updateTileGrid(true, level.tileGrid, 64, 2);
            let i;
            let obj;

            // barbedwires
            for (i = 0; i < level.barbedwires.length; i++) {
                obj = level.barbedwires[i];
                this.game.addBackgroundEntity(new BarbedWire(this.game, obj.x, obj.y));
            }
            // deadtrees
            for (i = 0; i < level.deadtrees.length; i++) {
                obj = level.deadtrees[i];
                this.game.addBackgroundEntity(new DeadTree(this.game, obj.x, obj.y));
            }
            // deserttowers
            for (i = 0; i < level.deserttowers.length; i++) {
                obj = level.deserttowers[i];
                this.game.addBackgroundEntity(new DesertTower(this.game, obj.x, obj.y));
            }
            // destroyeddeserttowers
            for (i = 0; i < level.destroyeddeserttowers.length; i++) {
                obj = level.destroyeddeserttowers[i];
                this.game.addBackgroundEntity(new DestroyedDesertTower(this.game, obj.x, obj.y));
            }
            // walmartstonehenges
            for (i = 0; i < level.walmartstonehenges.length; i++) {
                obj = level.walmartstonehenges[i];
                this.game.addBackgroundEntity(new WallmartStoneHenge(this.game, obj.x, obj.y));
            }
            // deadbodies
            for (i = 0; i < level.deadbodies.length; i++) {
                obj = level.deadbodies[i];
                this.game.addBackgroundEntity(new DeadBody(this.game, obj.x, obj.y));
            }
            // emptybarrels
            for (i = 0; i < level.emptybarrels.length; i++) {
                obj = level.emptybarrels[i];
                this.game.addBackgroundEntity(new EmptyBarrel(this.game, obj.x, obj.y));
            }
            // here for testing, later we may want to spawn them randomly or something
            // this.game.addEntity(this.skeletonMage);
            // this.game.addEntity(new GiantHuskydog(this.game, this.mickey, 0, 0));
            // this.game.addEntity(new SkeletonMage(this.game, this.mickey, 50, 50));
            this.game.addEntity(new SkeletonKnight(this.game, this.mickey, 0, 0));

            this.mickey.removeFromWorld = false;
            this.game.addEntity(this.mickey);
        };
    };
    updateAudio() {
        var muteCheckbox = document.getElementById("mute").checked;
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
        else if (!this.gameover) {
            //this.spawnmanager.update();

            // uncomment conditional below to allow game over
            // if (this.mickey.currentHP <= 0) {
            //     this.game.pausable = false;
            //     this.gameover = true;
            //     this.clearAllEntities();
            //     this.game.transition = new TransitionScreen(this.game);
            //     ASSET_MANAGER.pauseBackgroundMusic();

            //     this.game.background.updateTileGrid(false);
            //     this.mickey.reset();
            // }
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