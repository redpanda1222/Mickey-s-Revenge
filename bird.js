class Bird {
    constructor(game, mickey, x, y) {
        this.game = game;
        this.mickey = mickey;

        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.speed = 2;

        this.elapsedTime = 0;
        this.frameCount = 7;
        this.frameDuration = 0.1;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/bird.png");
        this.spritesheet1 = ASSET_MANAGER.getAsset("./assets/enemy/bird1.png");
        this.xStart = 0;
        this.yStart = 160;
        this.width = 159;
        this.height = 160;
        
        this.flip = 0;

        //Rectangle bounding box
        this.offsetBB = {x: 0, y: 0, w: 0, h: 0};
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.w + this.offsetBB.w, this.h + this.offsetBB.h);
    };

    handleCollision(entity) {
        let overlap = this.BB.overlapBB(entity.BB);
        let sig = { x: Math.sign(this.BB.x - entity.BB.x), y: Math.sign(this.BB.y - entity.BB.y) };

        if (overlap.x < overlap.y) {
            this.x += overlap.x * sig.x;
        } else {
            this.y += overlap.y * sig.y;
        }
    }

    update() {
        // moves straight to center of mickey
        let posDiff = {x: this.mickey.BB.center().x - this.BB.center().x, y: this.mickey.BB.center().y - this.BB.center().y};
        let toMickey = Math.atan2(posDiff.y, posDiff.x);
        this.x += Math.cos(toMickey) * this.speed;
        this.y += Math.sin(toMickey) * this.speed;

        if (Math.cos(toMickey) < 0) {
            this.flip = 1; // Flip the sprite if moving left
            this.xStart = 1120;
        } else {
            this.flip = 0; // Do not flip the sprite if moving right
            this.xStart = 0;
        }

        // update bounding box
        this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);

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
            ctx.drawImage(this.spritesheet1,
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