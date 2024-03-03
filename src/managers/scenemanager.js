class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        
        this.level = null;
        this.mickey = new Mickey(this.game, PARAMS.WIDTH / 2, PARAMS.HEIGHT / 2, this); // 800 400 is initial x and y
        this.spawnmanager = new SpawnManager(this.game, this.mickey);
        this.upgradeScreen = new UpgradeScreen(this.game, this);
        this.game.upgrade = this.upgradeScreen;
        this.gameover = false;
        this.gamewin = false;

        // Enemy Bosses
        this.huskyBoss = new GiantHuskydog(this.game, this.mickey, 0, 0);
        this.skeletonBoss = new SkeletonKnight(this.game, this.mickey, 0, 0);
        this.bossSpawned = false;
        this.MaxEnemies = 300;

        // preload
        this.game.background = new Background(this.game, false);
        this.menu = new MenuScreen(game, this);
        this.loadScene(levelOne, false);
    };

    areBossesDead() {
        return this.huskyBoss.currentHP <= 0 && this.skeletonBoss.currentHP <= 0;
    }

    clearAllEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });

        this.game.attackEntities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });

        this.game.backgroundEntities.length = 0;
        this.game.otherEntities.length = 0;
    };

    loadScene(level, isTransition, isGameWin) {
        if (isGameWin) {
            this.game.transition = new TransitionScreen(this.game, level, true);
        } 
        else if (isGameWin === false) {
            this.game.transition = new TransitionScreen(this.game);
        } 
        else if (isTransition) {
            this.game.transition = new TransitionScreen(this.game, level);
        } 
        else if (this.menu.isInMenu == false) {
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
            if (level.barbedwires) {
                for (i = 0; i < level.barbedwires.length; i++) {
                    obj = level.barbedwires[i];
                    this.game.addBackgroundEntity(new BarbedWire(this.game, obj.x, obj.y));
                }
            }

            // vertical barbedwires
            if (level.verticalbarbedwires) {
                for (i = 0; i < level.verticalbarbedwires.length; i++) {
                    obj = level.verticalbarbedwires[i];
                    this.game.addBackgroundEntity(new VerticalBarbedWire(this.game, obj.x, obj.y));
                }
            }
            
            // deadtrees
            if (level.deadtrees) {
                for (i = 0; i < level.deadtrees.length; i++) {
                    obj = level.deadtrees[i];
                    this.game.addBackgroundEntity(new DeadTree(this.game, obj.x, obj.y));
                }
            }
            
            // deserttowers
            if (level.deserttowers) {
                for (i = 0; i < level.deserttowers.length; i++) {
                    obj = level.deserttowers[i];
                    this.game.addBackgroundEntity(new DesertTower(this.game, obj.x, obj.y));
                }
            }
            
            // destroyeddeserttowers
            if (level.destroyeddeserttowers) {
                for (i = 0; i < level.destroyeddeserttowers.length; i++) {
                    obj = level.destroyeddeserttowers[i];
                    this.game.addBackgroundEntity(new DestroyedDesertTower(this.game, obj.x, obj.y));
                }
            }
            
            // walmartstonehenges
            if (level.walmartstonehenges) {
                for (i = 0; i < level.walmartstonehenges.length; i++) {
                    obj = level.walmartstonehenges[i];
                    this.game.addBackgroundEntity(new WallmartStoneHenge(this.game, obj.x, obj.y));
                }
            }
            
            // deadbodies
            if (level.deadbodies) {
                for (i = 0; i < level.deadbodies.length; i++) {
                    obj = level.deadbodies[i];
                    this.game.addBackgroundEntity(new DeadBody(this.game, obj.x, obj.y));
                }
            }
            
            // emptybarrels
            if (level.emptybarrels) {
                for (i = 0; i < level.emptybarrels.length; i++) {
                    obj = level.emptybarrels[i];
                    this.game.addBackgroundEntity(new EmptyBarrel(this.game, obj.x, obj.y));
                }
            }

            // waterTexture
            if (level.waterTexture) {
                for (i = 0; i < level.waterTexture.length; i++) {
                    obj = level.waterTexture[i];
                    this.game.addBackgroundEntity(new WaterTexture(this.game, obj.x, obj.y));
                }
            }

            this.spawnmanager.loadWaves(level.waves, level.formations);

            this.mickey.minX = level.minBoundaryX;
            this.mickey.maxX = level.maxBoundaryX;
            this.mickey.minY = level.minBoundaryY;
            this.mickey.maxY = level.maxBoundaryY;
            this.mickey.removeFromWorld = false;
            this.game.addEntity(this.mickey); // mickey is always the first entity in game.entities

            // put entities here for testing
            // this.game.addEntity(this.huskyBoss);

            // stress test
            // for (let i = 0; i < 10; i++) {
            //     this.game.addEntity(new Skeleton(this.game, this.mickey, i * 2, 0));
            // }
        };
    };

    updateAudio() {
        var muteCheckbox = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(muteCheckbox);
        ASSET_MANAGER.adjustVolume(volume);
        ASSET_MANAGER.autoRepeat("./audio/escape.mp3");
    };

    updateCamera() {
        this.game.cameraX = this.mickey.x - PARAMS.WIDTH / 2 + this.mickey.width / 2;
        this.game.cameraY = this.mickey.y - PARAMS.HEIGHT / 2 + this.mickey.height / 2;

        if (this.game.cameraX > this.mickey.maxX - PARAMS.WIDTH + this.mickey.width * 2)
            this.game.cameraX = this.mickey.maxX - PARAMS.WIDTH + this.mickey.width * 2;
        else if (this.game.cameraX < this.mickey.minX - this.mickey.width)
            this.game.cameraX = this.mickey.minX - this.mickey.width;

        if (this.game.cameraY > this.mickey.maxY - PARAMS.HEIGHT + this.mickey.height / 2)
            this.game.cameraY = this.mickey.maxY - PARAMS.HEIGHT + this.mickey.height / 2;
        else if (this.game.cameraY < this.mickey.minY - this.mickey.height)
            this.game.cameraY = this.mickey.minY - this.mickey.height;
    }

    update() {
        this.updateAudio();
        if (this.menu.isInMenu) {
            this.menu.update();
        }
        else if (this.gamewin) {
            this.reset();
        }
        else if (!this.gameover) {

            // Bosses spawn
            if (this.mickey.enemiesCounter >= this.MaxEnemies) {
                if (!this.bossSpawned) {
                    this.skeletonBoss.setPosition(this.mickey.x + 400, this.mickey.y + 400);
                    this.huskyBoss.setPosition(this.mickey.x - 400, this.mickey.y - 400);
                    this.huskyBoss.removeFromWorld = false;
                    this.skeletonBoss.removeFromWorld = false;
                    this.game.addEntity(this.huskyBoss);
                    this.game.addEntity(this.skeletonBoss);
                    this.bossSpawned = true;
                }
                this.spawnmanager.update(); 
            } else {
               this.spawnmanager.update(); 
            }

            this.upgradeScreen.update();

            // game win
            if (this.areBossesDead()) {
                this.gamewin = true;
                this.loadScene(null, true, true);
                this.reset();
            } 

            // uncomment conditional below to allow game over (mickey dying)
            if (this.mickey.currentHP <= 0) {
                this.gameover = true;
                this.loadScene(null, true, false);
                this.reset();
            }
        }
        
        this.updateAudio();
        this.updateCamera();
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    reset() {
        this.game.pausable = false;
        this.clearAllEntities();
        ASSET_MANAGER.pauseBackgroundMusic();

        this.game.background.updateTileGrid(false);
        this.mickey.reset();
        this.spawnmanager.reset();
        this.huskyBoss.reset();
        this.skeletonBoss.reset();

        this.bossSpawned = false;
    }

    draw(ctx) {
        if (this.menu.isInMenu) {
            this.menu.draw(ctx);
        }
    }
};
