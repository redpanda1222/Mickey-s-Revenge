class Mickey {
    constructor(game, x, y, sceneManager) {
        this.game = game;

        // this.game.mickey = this;
        this.sceneManager = sceneManager;
        this.facing = 0;
        this.status = 0;
        this.attacking = false;
        this.elapsedTime = 0;
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.sizeScale = 2
        this.width = 26 * this.sizeScale;
        this.height = 40 * this.sizeScale;
        this.animations = [];
        this.loadAnimations();

        // dmg immune
        this.immunityFrames = 20;
        this.immunityCurrent = 0;
        this.immune = false;

        //CHARACTER STATS
        this.MaxHP = 100;
        this.currentHP = this.MaxHP;
        this.movementSpeed = 4;
        this.pickupRadius = 70;
        this.Level = 1;
        this.experiencePoints = 0;


        //Player Attack Stats
        this.fireSlashLevel = 0;
        this.fireSlashCD = new Clock(game, 8); // 8 sec cd
        this.fireBreathLevel = 0;
        this.fireBreathCD = new Clock(game, 5); // 5 sec cd
        this.fireBladeLevel = 0;
        this.fireBladeCD = new Clock(game, 6);
        this.rasenganLevel = 1;
        this.rasenganCD = new Clock(game, 2);

        // Killed enemies counter
        this.enemiesCounter = 0;

        //Rectangle bounding box
        this.offsetBB = { x: 18, y: 50, w: -36, h: -53 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.width + this.offsetBB.w, this.height + this.offsetBB.h);
    };

    handleCollision(entity) {
        let overlap = this.BB.overlapBB(entity.BB);
        let sig = { x: Math.sign(this.BB.x - entity.BB.x), y: Math.sign(this.BB.y - entity.BB.y) };

        if (overlap.x < overlap.y) {
            this.x += (overlap.x + 1) * sig.x;
        } else {
            this.y += (overlap.y + 1) * sig.y;
        }
    }

    loadAnimations() {
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 0, 0, 26, 40, 4, 0.09, 1, true, false));
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 0, 41, 26, 40, 6, 0.09, 1, false, false));
        //reversed images
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 27 * 6, 41 * 2, 26, 40, 4, 0.09, 1, true, true));
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 27 * 6, 41 * 3, 26, 40, 6, 0.09, 1, false, true));
    };

    takeDamage(damage) {
        if (this.immune) return;
        if (this.currentHP <= 0) {
            this.currentHP = 0;
            return;
        }
        this.immune = true
        this.currentHP -= damage;
        // ASSET_MANAGER.playAsset("./audio/hurt.mp3");
    }

    reset() {
        this.x = this.initialX;
        this.y = this.initialY;

        //CHARACTER STATS
        this.MaxHP = 100;
        this.currentHP = this.MaxHP;
        this.Level = 1;
        this.experiencePoints = 0;

        //Player Attack Stats
        this.fireSlashLevel = 0;
        this.fireBreathLevel = 0;
        this.fireBladeLevel = 0;
        this.rasenganLevel = 1;

        this.fireSlashCD.reset()
        this.fireBreathCD.reset()
        this.fireBladeCD.reset()
        this.rasenganCD.reset()

        this.immunityCurrent = 0;
        this.immune = false;

        this.enemiesCounter = 0;
    }

    movement() {
        this.status = 0;
        if (this.game.left) {
            this.x -= this.movementSpeed;
            this.facing = 1;
            this.status = 1;
        };
        if (this.game.right) {
            this.x += this.movementSpeed
            this.facing = 0;
            this.status = 1;
        };
        if (this.game.up) {
            this.y -= this.movementSpeed;
            this.status = 1;
        };
        if (this.game.down) {
            this.y += this.movementSpeed;
            this.status = 1;
        };
    }

    update() {
        this.elapsedTime += this.game.clockTick;

        //console.log(this.experiencePoints);
        //console.log(this.Level);
        //update his level
        if (this.experiencePoints >= this.Level * 10) {
            this.Level += 1; //add level if experience points met
            //should we reset player's exp points?
            this.experiencePoints = 0;
            this.sceneManager.upgradeScreen.visible = true;
        }

        // Define boundaries
        const minX = -1000;
        const maxX = 1600;      // Maximum x-coordinate allowed
        const minY = -1000;
        const maxY = 1500;      // Maximum y-coordinate allowed

        // Store Mickey's previous position
        const prevX = this.x;
        const prevY = this.y;

        // the left boundary
        if (this.game.left && this.x > minX) {
            this.x = Math.max(this.x - this.movementSpeed, minX);
            this.facing = 1;
            this.status = 1;
        }
        // right boundary
        else if (this.game.right && this.x < maxX) {
            this.x = Math.min(this.x + this.movementSpeed, maxX);
            this.facing = 0;
            this.status = 1;
        }
        // the top boundary
        else if (this.game.up && this.y > minY) {
            this.y = Math.max(this.y - this.movementSpeed, minY); 
            this.status = 1;
        }
        // the bottom boundary
        else if (this.game.down && this.y < maxY) {
            this.y = Math.min(this.y + this.movementSpeed, maxY); 
            this.status = 1;
        }


    // Update the camera position relative to Mickey's position
        this.game.cameraX += this.x - prevX;
        this.game.cameraY += this.y - prevY;

        // this.game.cameraX = this.x - PARAMS.WIDTH / 2 + this.width / 2;
        // this.game.cameraY = this.y - PARAMS.HEIGHT / 2 + this.height / 2;

        // this.movement();
        // update bounding box
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);


        //add attacks
        if (this.fireSlashLevel > 0) {
            if (this.fireSlashCD.doneTicking()) {
                this.game.addAttackEntity(new FireSlash(this.game, this, 1 + (Math.floor(this.Level / 50)), this.fireSlashLevel));
            }
        }

        if (this.fireBreathLevel > 0) {
            if (this.fireBreathCD.doneTicking()) {
                this.game.addAttackEntity(new FireBreath(this.game, this, 1 + (Math.floor(this.Level / 50)), this.fireBreathLevel));
            }
        }

        if (this.fireBladeLevel > 0 && this.fireBladeCD.doneTicking()) {
            for (let i = 0; i < this.fireBladeLevel; i++) {
                this.game.addAttackEntity(new Fireblade(
                    this.game, this, true, this.BB.center().x, this.BB.center().y,
                    50 * this.fireBladeLevel, this.fireBladeLevel + 2, 4,         // attributes (dmg, spd, duration)
                    this, true, 100, degreeToRad(360 / this.fireBladeLevel * i)));
            }
        }

        if (this.rasenganLevel > 0 && this.rasenganCD.doneTicking()) {
            for (let i = 0; i < this.rasenganLevel && i < this.game.entityDistances.length; i++) {
                const nearest = this.game.entityDistances[i].e;
                this.game.addAttackEntity(new Rasengan(
                    this.game, this, true, this.BB.center().x - 40, this.BB.center().y - 50,
                    50 * this.rasenganLevel, 8, 3, 2, // attributes (dmg, spd, duration, pierce)
                    nearest.BB.center(), 0
                ));
            }
        }

        // mickey only collide with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity);
            }
        });

        // immunity frames
        if (this.immune) {
            if (this.immunityCurrent++ >= this.immunityFrames) {
                this.immunityCurrent = 0;
                this.immune = false;
            }
        }
    };

    draw(ctx) {
        if (this.status == 0 && this.facing == 0) {
            this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width, this.height);
        } else if (this.status == 0 && this.facing == 1) {
            this.animations[2].drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width, this.height);
        } else if (this.status == 1 && this.facing == 0) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width, this.height);
        } else if (this.status == 1 && this.facing == 1) {
            this.animations[3].drawFrame(this.game.clockTick, ctx, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width, this.height);
        };

        this.drawHealthBar(ctx);

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
        }
        // draw line to nearest target
        // if (this.game.entityDistances.length > 0) {
        //     const nearest = this.game.entityDistances[0].e;
        //     ctx.strokeStyle = "red";
        //     ctx.lineWidth = 2;
        //     line(ctx, this.BB.center().x - this.game.cameraX, this.BB.center().y - this.game.cameraY, nearest.BB.center().x - this.game.cameraX, nearest.BB.center().y - this.game.cameraY);
        // }
    };

    drawHealthBar(ctx) {
        const camX = this.x + 15 - this.game.cameraX;
        const camY = this.y - 8 - this.game.cameraY;
        //drawing health box
        //--BACKGROUND FOR MAX HP
        ctx.fillStyle = 'black';
        ctx.fillRect(camX, camY, 80, 10);

        //--Calculating Current HP and changing color with appropriate indicators for health percentage.
        let healthRatio = this.currentHP / this.MaxHP;
        let healthBarSize = 80 * healthRatio;
        if (healthRatio > 0.75) ctx.fillStyle = 'green';
        if (healthRatio <= 0.75) ctx.fillStyle = 'orange';
        if (healthRatio <= 0.50) ctx.fillStyle = 'red';
        if (healthRatio <= 0.25) ctx.fillStyle = 'maroon';
        if (healthRatio >= 0) { ctx.fillRect(camX, camY, healthBarSize, 10) }
        else { ctx.fillRect(camX, camY, 0, 10) }
    }

}
