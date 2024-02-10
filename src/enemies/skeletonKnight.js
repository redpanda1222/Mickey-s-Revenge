class SkeletonKnight {
    constructor(game, mickey, x, y) {
        Object.assign(this, { game, mickey });

        this.pos = new Vector2(x, y);
        this.vel = new Vector2(0, 0);
        this.acc = new Vector2(0, 0);
        this.w = 150;
        this.h = 150;
        this.speed = 1;
        this.drag = -1 / (this.speed); // dont question

        this.elapsedTime = 0;
        this.frameCount = 2;
        this.frameDuration = 0.3;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/skeletonknight.png");
        this.xStart = 0;
        this.yStart = 92;
        this.width = 32;
        this.height = 43;

        this.MaxHP = 500;
        this.currentHP = 500;

        // Laser ball properties
        this.laserCooldown = 0; // Cooldown for firing laser balls
        this.laserFire = 0;
        this.laserInterval = 2; // Interval between volleys of laser balls in seconds

        // Skeleton spawning properties
        this.spawnCooldown = 0; // Cooldown for spawning skeletons
        this.spawnInterval = 10; // Interval between skeleton spawns in seconds

        //Rectangle bounding box
        this.offsetBB = { x: 23, y: 13, w: -50, h: -10 };
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, this.w + this.offsetBB.w, this.h + this.offsetBB.h);
    };

    handleCollision(entity, scalarForce) {
        // basically treats other entity like a repelling force field
        let toEntityCenter = this.BB.center().sub(entity.BB.center()).norm().mul(scalarForce);
        this.applyForce(toEntityCenter);
    }

    move() {
        this.vel = this.vel.add(this.acc);
        this.pos = this.pos.add(this.vel);
        // update bounding box
        this.BB.updateBB(this.pos.x + this.offsetBB.x, this.pos.y + this.offsetBB.y);
        // reset net accel
        this.acc = this.acc.mul(0);
    }

    applyForce(force) {
        // assume mass is 1, F = A
        this.acc = this.acc.add(force);
    }

    fireLaser() {
        // Create and add laser ball entities to the game world
        this.game.addEntity(new LaserBall(this.game, this, this.mickey));
    }

    spawnSkeletons() {
        // Define the radius for spawning skeletons around the SkeletonKnight
        const spawnRadius = 100;

        // Define the angle increment for positioning the skeletons around the SkeletonKnight
        const angleIncrement = (Math.PI * 2) / 5; // 5 skeletons to be spawned

        // Calculate the angle at which the first skeleton will be spawned
        let angle = Math.random() * Math.PI * 2;

        // Spawn five skeletons around the SkeletonKnight
        for (let i = 0; i < 5; i++) {
            // Calculate the position of the skeleton
            const skeletonX = this.pos.x + Math.cos(angle) * spawnRadius;
            const skeletonY = this.pos.y + Math.sin(angle) * spawnRadius;

            // Create and add the skeleton entity to the game world
            this.game.addEntity(new Skeleton(this.game, this.mickey, skeletonX, skeletonY));

            // Increment the angle for the next skeleton
            angle += angleIncrement;
        }
    }

    update() {
        // applies force to move towards center of mickey
        let toMickey = this.mickey.BB.center().sub(this.BB.center()).norm();
        this.applyForce(toMickey);

        // drag force to limit velocity
        let v = this.vel.mag();
        if (v !== 0) {
            this.applyForce(this.vel.norm().mul(this.drag * v));
        }

        // collision detection & resolution with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity, this.speed + 1);
            }
        });
        // collision detection & resolution with other enemmies
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB) && entity !== this && entity !== this.mickey && !(entity instanceof Gem) && !(entity instanceof LaserBall)) {
                this.handleCollision(entity, 0.75);
            }
            // colliding with mickey and attacking mickey
            if (entity == this.mickey && this.BB.collideBB(entity.BB)) {
                this.mickey.takeDamage(5);
            }
        }); 

        if (this.pos.x - this.mickey.x + 20> 0) {
            this.xStart = 0;
            this.yStart = 43;
        } else {
            this.xStart = 0;
            this.yStart = 92;
        }

        if (this.currentHP <= 0) {
            this.removeFromWorld = true;
        }

        // Update laser cooldown
        if (this.laserCooldown > 0) {
            this.laserCooldown -= this.game.clockTick;
        }

        // Check if it's time to fire laser balls
        if (this.laserCooldown <= 0) {
            this.fireLaser();
            this.laserCooldown = this.laserInterval; // Reset cooldown after firing all laser balls in a volley
        }

        // Update spawn cooldown
        if (this.spawnCooldown > 0) {
            this.spawnCooldown -= this.game.clockTick;
        }

        // Check if it's time to spawn skeletons
        if (this.spawnCooldown <= 0) {
            this.spawnSkeletons();
            this.spawnCooldown = this.spawnInterval; // Reset cooldown after spawning skeletons
        }

        // this should be last thing to update
        this.move();
    };

    drawHealthBar(ctx) {
        const camX = this.pos.x + 15 - this.game.cameraX;
        const camY = this.pos.y - 8  - this.game.cameraY;
        // Drawing health box
        ctx.fillStyle = 'black';
        ctx.fillRect(camX, camY, 120, 10);

        // Calculating current HP and changing color with appropriate indicators for health percentage.
        let healthRatio = this.currentHP / this.MaxHP;
        let healthBarSize = 120 * healthRatio;

        if (healthRatio > 0.75) ctx.fillStyle = 'green';
        else if (healthRatio > 0.50) ctx.fillStyle = 'orange';
        else if (healthRatio > 0.25) ctx.fillStyle = 'red';
        else ctx.fillStyle = 'maroon';

        if (healthRatio > 0) {
            ctx.fillRect(camX, camY, healthBarSize, 10);
        } else {
            ctx.fillRect(camX, camY, 0, 10);
        }
    }

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            this.pos.x - this.game.cameraX, this.pos.y - this.game.cameraY,
            this.w, this.h);

        this.drawHealthBar(ctx);

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

};

class LaserBall {
    constructor(game, skeletonKnight, mickey) {
        Object.assign(this, { game, skeletonKnight, mickey });

        this.x = this.skeletonKnight.pos.x + this.skeletonKnight.width / 2;
        this.y = this.skeletonKnight.pos.y + this.skeletonKnight.height / 2;
        this.w = 150;
        this.h = 150;

        this.targetX = this.mickey.x + this.mickey.width / 4;
        this.targetY = this.mickey.y + this.mickey.height / 4;

        this.dx = this.targetX - this.x;
        this.dy = this.targetY - this.y;

        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        this.dx /= this.distance;
        this.dy /= this.distance;

        this.speed = 10;

        this.elapsedTime = 0;
        this.frameDuration = 0.1;
        this.frameCount = 3;
        this.totalTime = this.frameCount * this.frameDuration;

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/attack/lasers.png");
        this.xStart = 1269;
        this.yStart = 1730;
        this.width = 160;
        this.height = 150;

        this.timer = 0;
        this.totalAllowedTime = 5;

        // Rectangle bounding box
        this.offsetBB = { x: 20, y: 14, w: -30, h: -26 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.w + this.offsetBB.w, this. h + this.offsetBB.h);
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        this.elapsedTime += this.game.clockTick;
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);

        this.timer += this.game.clockTick;
        if (this.timer >= this.totalAllowedTime) {
            this.removeFromWorld = true; 
        }

        if (this.BB.collideBB(this.mickey.BB)) {
            this.mickey.currentHP -= 10;
            this.removeFromWorld = true; 
        }
    }

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width * frame, this.yStart,
            this.width, this.height,
            this.x - this.game.cameraX, this.y - this.game.cameraY,
            this.w, this.h);

        if (PARAMS.DEBUG) {
            this.BB.draw(ctx, this.game);
        }
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }
}