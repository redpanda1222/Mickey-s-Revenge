class Mickey {
    constructor(game, x, y) {
        this.game = game;

        this.facing = 0;
        this.status = 0;
        this.attacking = false;
        this.elapsedTime = 0;
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.sizeScale = 2;
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
        this.movementSpeed = 4;
        this.pickupRadius = 80;
        this.Level = 1;
        this.experiencePoints = 0;


        //Player Attack Stats
        this.fireSlashLevel = 0;
        this.fireSlashCD = new Clock(game, 6); //sec cd
        this.fireBreathLevel = 0;
        this.fireBreathCD = new Clock(game, 4); //sec cd
        this.fireBladeLevel = 0;
        this.fireBladeCD = new Clock(game, 4);
        this.rasenganLevel = 1;
        this.rasenganCD = new Clock(game, 1);
        this.laserLevel = 0;
        this.laserCD = new Clock(game, 2);

        this.fireSlashRange = 150;
        this.rasenganRange = 300;

        // Dash properties
        this.dashSpeed = 6; // Adjust dash speed as needed
        this.dashDuration = 0.3; // Duration of dash in seconds
        this.dashCooldown = 6; // Cooldown time for dash in seconds
        this.dashTimer = 0; // Timer to track dash duration
        this.dashCooldownTimer = 0; // Timer to track dash cooldown

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

    loadAnimations() 
    { 
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 0, 0, 26, 40, 4, 0.2, 1, true, false));
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 0, 41, 26, 40, 6, 0.09, 1, false, false));
        //reversed images
        this.animations.push(new Animator(ASSET_MANAGER.getAsset("./assets/character/mickeymouse.png"), 27 * 6, 41 * 2, 26, 40, 4, 0.2, 1, true, true));
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
        //ASSET_MANAGER.playAsset("./audio/hurt.mp3");
    }

    performDash() {
        // Start dash
        this.dashTimer = this.dashDuration;
        this.dashCooldownTimer = this.dashCooldown;
    }

    resetDash() {
        // Reset dash properties
        this.dashTimer = 0;
    }

    dashMovement() {
        // Move Mickey during dash
        if (this.game.up) {
            this.y -= this.dashSpeed;
        }
        if (this.game.down) {
            this.y += this.dashSpeed;
        }
        if (this.game.left) {
            this.x -= this.dashSpeed;
        }
        if (this.game.right) {
            this.x += this.dashSpeed;
        }
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
        this.laserLevel = 0;

        this.fireSlashCD.reset();
        this.fireBreathCD.reset();
        this.fireBladeCD.reset();
        this.rasenganCD.reset();
        this.laserCD.reset();

        this.immunityCurrent = 0;
        this.immune = false;

        this.enemiesCounter = 0;
    }
    
    movement() {
        this.status = 0;
        // the left boundary
        if (this.game.left && this.x > this.minX) {
            this.x = Math.max(this.x - this.movementSpeed, this.minX);  //TODO: multiply by game.clockTick if we figure out how to implement the same movement for the enemies
            this.facing = 1;
            this.status = 1;
        }
        // right boundary
        if (this.game.right && this.x < this.maxX) {
            this.x = Math.min(this.x + this.movementSpeed, this.maxX);
            this.facing = 0;
            this.status = 1;
        }
        // the top boundary
        if (this.game.up && this.y > this.minY) {
            this.y = Math.max(this.y - this.movementSpeed, this.minY); 
            this.status = 1;
        }
        // the bottom boundary
        if (this.game.down && this.y < this.maxY) {
            this.y = Math.min(this.y + this.movementSpeed, this.maxY); 
            this.status = 1;
        }
        // update bounding box
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        //console.log(this.enemiesCounter);
        //console.log(this.experiencePoints);
        //console.log(this.Level);
        //update his level
        if (this.experiencePoints >= this.Level * 35) {
            this.Level += 1; //add level if experience points met
            //should we reset player's exp points?
            this.experiencePoints = 0;
            this.game.camera.upgradeScreen.visible = true;
        }

        // // Store Mickey's previous position
        // const prevX = this.x;
        // const prevY = this.y;

        // Update dash cooldown timer
        if (this.dashCooldownTimer > 0) {
            this.dashCooldownTimer -= this.game.clockTick;
        }

        // Dash logic
        if (this.game.dash && this.dashCooldownTimer <= 0) {
            // Perform dash
            this.performDash();
            this.game.dash = false;
        } else {
            this.game.dash = false;
        }

        // Update dash timer
        if (this.dashTimer > 0) {
            this.dashTimer -= this.game.clockTick;
            if (this.dashTimer <= 0) {
                // Dash duration is over, reset dash properties
                this.resetDash();
            } else {
                // Update Mickey's position during dash
                this.dashMovement();
            }
        }

        this.movement();
        //console.log(this.game.dash);
        
        //add attacks
        if (this.fireSlashLevel > 0 && this.fireSlashCD.doneTicking()) {
            const nearest = this.game.entityDistances[0];
            if (nearest && nearest.dist < this.fireSlashRange) {
                this.game.addAttackEntity(new FireSlash(this.game, this, 1.4, this.fireSlashLevel));
            } else {
                this.fireSlashCD.forceDone();
            }
        }

        if (this.fireBreathLevel > 0 && this.fireBreathCD.doneTicking()) {
            this.game.addAttackEntity(new FireBreath(this.game, this, 1, this.fireBreathLevel));
            ASSET_MANAGER.playAsset("./audio/constantfire.mp3");
        }


        if (this.fireBladeLevel > 0 && this.fireBladeCD.doneTicking()) {
            for (let i = 0; i < this.fireBladeLevel; i++) {
                this.game.addAttackEntity(new Fireblade(
                    this.game, this, true, this.BB.center().x, this.BB.center().y,
                    this.fireBladeLevel,
                    this, true, 100, degreeToRad(360 / this.fireBladeLevel * i)));
            }
        }

        if (this.rasenganLevel > 0 && this.rasenganCD.doneTicking()) {
            let nearest = this.game.entityDistances[0];
            if (nearest && nearest.dist < this.rasenganRange) {
                for (let i = 0; i < this.rasenganLevel && i < this.game.entityDistances.length; i++) {
                    nearest = this.game.entityDistances[i];
                    if (nearest.dist > this.rasenganRange) break;
    
                    this.game.addAttackEntity(new Rasengan(
                        this.game, this, this.BB.center().x - 40, this.BB.center().y - 50, this.rasenganLevel, nearest.e.BB.center(), 0
                    ));
                    ASSET_MANAGER.playAsset("./audio/energypulse.mp3");
                }
            } else {
                this.rasenganCD.forceDone();
            }
        }

        if (this.laserLevel > 0 && this.laserCD.doneTicking()) {
            this.game.addAttackEntity(new Laser(this.game, this, this.laserLevel));
            ASSET_MANAGER.playAsset("./audio/energy-gloves.mp3");
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

        // Draw dash cooldown indicator
        if (this.dashCooldownTimer > 0) {
            const camX = this.x - this.game.cameraX - 12;
            const camY = this.y - this.game.cameraY + this.height + 10;

            // Draw cooldown indicator background
            ctx.fillStyle = 'black';
            ctx.fillRect(camX, camY, 80, 5);

            // Calculate cooldown progress
            const cooldownProgress = 1 - (this.dashCooldownTimer / this.dashCooldown);

            // Draw cooldown progress bar
            ctx.fillStyle = 'gray';
            ctx.fillRect(camX, camY, 80 * cooldownProgress, 5);
        }

        // draw line to nearest target
        // if (this.game.entityDistances.length > 0) {
        //     const nearest = this.game.entityDistances[0].e;
        //     ctx.strokeStyle = "red";
        //     ctx.lineWidth = 2;
        //     line(ctx, this.BB.center().x - this.game.cameraX, this.BB.center().y - this.game.cameraY, nearest.BB.center().x - this.game.cameraX, nearest.BB.center().y - this.game.cameraY);
        // }
    };

    drawHealthBar(ctx){
        const camX = this.x - 12 - this.game.cameraX;
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
