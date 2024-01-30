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
            // load level stuff
            if (level.tileGrid) {
                this.game.background.updateTileGrid(level.tileGrid, 64, 1, true);
            };
            // load background
            this.game.background.updateTileGrid(level.tileGrid, 64, 2, true);
            let i;
            let obj;

            // barbedwires
            for (i = 0; i < level.barbedwires.length; i++) {
                obj = level.barbedwires[i];
                this.game.addBackgroundEntity(new BarbedWire(obj.x, obj.y, 83, 56, 1));
            }
            // deadtrees
            for (i = 0; i < level.deadtrees.length; i++) {
                obj = level.deadtrees[i];
                this.game.addBackgroundEntity(new DeadTree(obj.x, obj.y, 1920, 1920, 0.05));
            }
            // deserttowers
            for (i = 0; i < level.deserttowers.length; i++) {
                obj = level.deserttowers[i];
                this.game.addBackgroundEntity(new DesertTower(obj.x, obj.y, 311, 324, 0.5));
            }
            // destroyeddeserttowers
            for (i = 0; i < level.destroyeddeserttowers.length; i++) {
                obj = level.destroyeddeserttowers[i];
                this.game.addBackgroundEntity(new DestroyedDesertTower(obj.x, obj.y, 393, 399, 0.5));
            }
            // walmartstonehenges
            for (i = 0; i < level.walmartstonehenges.length; i++) {
                obj = level.walmartstonehenges[i];
                this.game.addBackgroundEntity(new WallmartStoneHenge(obj.x, obj.y, 446, 370, 0.5));
            }
            // deadbodies
            for (i = 0; i < level.deadbodies.length; i++) {
                obj = level.deadbodies[i];
                this.game.addBackgroundEntity(new DeadBody(obj.x, obj.y, 64, 34, 1));
            }
            // emptybarrels
            for (i = 0; i < level.emptybarrels.length; i++) {
                obj = level.emptybarrels[i];
                this.game.addBackgroundEntity(new EmptyBarrel(obj.x, obj.y, 72, 64, 1));
            }
            // entities here for testing
            // this.game.addEntity(new Bird(this.game, this.mickey, 1000, 50));

            // // triple shot straight at mickey
            this.game.addProjectileEntity(new FireBall(this.game, this.mickey, false, 50, 50, 
                                                       0, 2, 10, 1,            // attributes (dmg, spd, duration, pierce)
                                                       this.mickey.BB.center() // destination vector (x, y)
                                                       ));
            this.game.addProjectileEntity(new FireBall(this.game, this.mickey, false, 50, 50, 
                                                       0, 2, 10, 1, 
                                                       this.mickey.BB.center().rotate(degreeToRad(10))
                                                       ));
            this.game.addProjectileEntity(new FireBall(this.game, this.mickey, false, 50, 50, 
                                                       0, 2, 10, 1, 
                                                       this.mickey.BB.center().rotate(degreeToRad(-10))
                                                       ));

            // fire ball homing towards mickey
            this.game.addProjectileEntity(new FireBall(this.game, this.mickey, false, 700, 50, 
                                                       0, 2, 5, 1,       // attributes (dmg, spd, duration, pierce)
                                                       null,             // no destination vector
                                                       true, this.mickey // homing to mickey
                                                       )); 

            // revolve around mickey
            this.game.addProjectileEntity(new FireBall(this.game, this.mickey, true, this.mickey.BB.center().x, this.mickey.BB.center().y, 
                                                       0, 5, 20, 1,         // attributes (dmg, spd, duration, pierce)
                                                       null,               // no destination vector
                                                       false, this.mickey, // no homing, target entity is to revolve around
                                                       true, true, 200));  // revolving clockwise at 100 radius

            this.game.addEntity(this.mickey);
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
            // this.spawnmanager.update();
            if (this.mickey.currentHP <= 0) {
                this.gameover = true;
                this.clearAllEntities();
                this.game.addEntity(new TransitionScreen(this.game));
                ASSET_MANAGER.pauseBackgroundMusic();

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