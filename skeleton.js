class Skeleton {
    constructor(game, mickey, x, y) {
        this.game = game;
        this.mickey = mickey;

        this.x = x;
        this.y = y;
        this.w = 60;
        this.h = 60;
        this.speed = 30;

        this.elapsedTime = 0;
        this.frameCount = 8;
        this.frameDuration = 0.1;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/skeleton.png");
        this.xStart = 0;
        this.yStart = 204
        this.width = 64;
        this.height = 68;
        
        this.flip = 0;

        //Rectangle bounding box
        this.offsetBB = {x: 15, y: 2, w: -30, h: -15};
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.w + this.offsetBB.w, this.h + this.offsetBB.h);
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

    update() {
        if (this.mickey.x + this.mickey.width / 4 < this.x) {
            this.x -= this.speed * this.game.clockTick;
            this.flip = 1; // Flip the sprite if moving left
            this.xStart = 515;
            this.yStart = 73;
        } 
        if (this.mickey.x + this.mickey.width / 4 > this.x) {
            this.x += this.speed * this.game.clockTick;
            this.flip = 0; // Do not flip the sprite if moving right
            this.xStart = 0;
            this.yStart = 204;
        } 
        if (this.mickey.x + this.mickey.width / 4 == this.x) {
            this.x += this.speed * this.game.clockTick;
            this.flip = 1;
        }
        if (this.mickey.y + this.mickey.height / 4 < this.y) {
            this.y -= this.speed * this.game.clockTick;
        } 
        if (this.mickey.y + this.mickey.height / 4 > this.y) {
            this.y += this.speed * this.game.clockTick;
        }

        // update bounding box
        this.BB.x = this.x + this.offsetBB.x;
        this.BB.y = this.y + this.offsetBB.y;

        // collision detection & resolution with background objects
        this.game.backgroundEntities.forEach(backEntity => {
            if (this.BB.collideBB(backEntity.BB)) {
                this.handleCollision(backEntity); 
            }
        });

        // collision detection & resolution with other enemmies
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB) && entity !== this && entity !== this.mickey) {
                this.handleCollision(entity); 
            }
        });
    };

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        if (this.flip == 0) {
            ctx.drawImage(this.spritesheet,
                this.xStart + this.width*frame, this.yStart,
                this.width, this.height,
                this.x, this.y,
                this.w, this.h);
        }
        else if (this.flip == 1) {
            ctx.drawImage(this.spritesheet,
                this.xStart - this.width*frame, this.yStart,
                this.width, this.height,
                this.x, this.y,
                this.w, this.h);
        }
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