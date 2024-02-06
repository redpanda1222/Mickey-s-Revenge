class SkeletonMage {
    constructor(game, mickey, x, y) {
        this.game = game;
        this.mickey = mickey;
    
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.speed = 25;

        this.elapsedTime = 0;
        this.frameCount = 2;
        this.frameDuration = 0.3;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/skeletonmage.png");
        this.totalTime = this.frameCount * this.frameDuration;

        this.xStart = 1;
        this.yStart = 48;
        this.width = 32;
        this.height = 46;

        this.currentHP = 100;

        this.fireballDelay = 3; // Delay in seconds before firing another FireBall
        this.timeSinceLastFireball = 0; // Track time since the last FireBall was fired

        //Rectangle bounding box
        this.offsetBB = { x: -3, y: 0, w: -20, h: 0 };
        this.BB = new BoundingBox(this.game, this.x + this.offsetBB.x, this.y, this.w + this.offsetBB.y, this.h);

    };

    update() {
        if (this.mickey.x < this.x) {
            this.x -= this.speed * this.game.clockTick;
            this.xStart = 1;
            this.yStart = 48;
        }
        if (this.mickey.x > this.x) {
            this.x += this.speed * this.game.clockTick;
            this.xStart = 1;
            this.yStart = 96;
        }
        if (this.mickey.x == this.x) {
            this.x += this.speed * this.game.clockTick;
        }
        if (this.mickey.y < this.y) {
            this.y -= this.speed * this.game.clockTick;
        }
        if (this.mickey.y > this.y) {
            this.y += this.speed * this.game.clockTick;
        }

        const dx = this.x - this.mickey.x;
        const dy = this.y - this.mickey.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const shootingRange = 400;

        // Check if enough time has passed to fire another FireBall
        if (this.timeSinceLastFireball >= this.fireballDelay && distance <= shootingRange) {
            this.game.addEntity(new FireBall(this.game, this, this.mickey));
            this.timeSinceLastFireball = 0; // Reset the timer
        } else {
            this.timeSinceLastFireball += this.game.clockTick; // Increment the timer
        }

        // update bounding box
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);

        if (this.BB.collideBB(this.mickey.BB)) {
            this.mickey.takeDamage(5);
        }

        if (this.currentHP <= 0) {
            this.removeFromWorld = true;
        }
    };

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
            // draws bounding box
            this.BB.draw(ctx);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};

class FireBall {
    constructor(game, skeletonMage, mickey) {
        Object.assign(this, { game, skeletonMage, mickey });

        this.x = this.skeletonMage.x;
        this.y = this.skeletonMage.y;
        this.w = 50;
        this.h = 50;

        this.targetX = this.mickey.x + this.mickey.width / 4;
        this.targetY = this.mickey.y + this.mickey.height / 4;

        this.dx = this.targetX - this.x;
        this.dy = this.targetY - this.y;

        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        this.dx /= this.distance;
        this.dy /= this.distance;

        this.speed = 3;

        this.elapsedTime = 0;
        this.frameDuration = 0.3;
        this.frameCount = 5;
        this.totalTime = this.frameCount * this.frameDuration;

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/attack/Fireball.png");
        this.xStart = 0;
        this.yStart = 145;
        this.width = 133;
        this.height = 105;

        this.timer = 0;
        this.totalAllowedTime = 5;

        // Rectangle bounding box
        this.offsetBB = { x: 10, y: 15, w: -20, h: -20 };
        this.BB = new BoundingBox(this.game, this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.w + this.offsetBB.w, this. h + this.offsetBB.h);
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
            this.BB.draw(ctx);
        }
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }
}

