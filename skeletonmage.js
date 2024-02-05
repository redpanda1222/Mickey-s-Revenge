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

        //Rectangle bounding box
        this.offsetBB = { x: -3, y: 0, w: -20, h: 0 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y, this.w + this.offsetBB.y, this.h);

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

        // update bounding box
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);

        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Skeleton mage!!!");
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

        this.targetX = this.mickey.x;
        this.targetY = this.mickey.y;

        this.dx = this.targetX - this.x;
        this.dy = this.targetY - this.y;

        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        this.dx /= this.distance;
        this.dy /= this.distance;

        this.speed = 150;

        this.elapsedTime = 0;
        this.frameDuration = 0.03;
        this.frameCount = 6;
        this.totalTime = this.frameCount * this.frameDuration;

        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/attack/Fireball.png");
        this.width = 133;
        this.height = 134;

        // Rectangle bounding box
        this.offsetBB = { x: 0, y: 0, w: this.width, h: this.height };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.offsetBB.w, this.offsetBB.h);
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        this.elapsedTime += this.game.clockTick;
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);

        if (this.elapsedTime > this.totalTime) {
            this.removeFromWorld = true; 
        }
    }

    draw(ctx) {
        // console.log("Fire ball : ", this.spriteSheet)
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        ctx.drawImage(
            this.spriteSheet,
            (frame * this.width + 20), // src x
            20,                  // src y
            this.width - 40,
            this.height - 40,
            this.x - this.game.cameraX,              // dest x
            this.y - this.game.cameray,
            this.width,
            this.height
        );

        if (PARAMS.DEBUG) {
            this.BB.draw(ctx);
        }
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return this.elapsedTime >= this.totalTime;
    }
}

