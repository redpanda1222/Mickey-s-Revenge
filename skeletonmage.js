class SkeletonMage { // 
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
        this.offsetBB = {x: -3, y: 0, w: -20, h: 0};
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y, this.w + this.offsetBB.y, this.h);
    };

    update() {
        if (this.mickey.x < this.x) {
            this.x -= this.speed * this.game.clockTick;
            //this.flip = 1; // Flip the sprite if moving left
            this.xStart = 1;
            this.yStart = 48;
        } 
        if (this.mickey.x > this.x) {
            this.x += this.speed * this.game.clockTick;
            //this.flip = 0; // Do not flip the sprite if moving right
            this.xStart = 1;
            this.yStart = 96;
        } 
        if (this.mickey.x == this.x) {
            this.x += this.speed * this.game.clockTick;
            //this.flip = 1;
        }
        if (this.mickey.y < this.y) {
            this.y -= this.speed * this.game.clockTick;
        } 
        if (this.mickey.y > this.y) {
            this.y += this.speed * this.game.clockTick;
        }

        // update bounding box
        this.BB.x = this.x + this.offsetBB.x;
        this.BB.y = this.y + this.offsetBB.y;

        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Skeleton mage!!!");
        }
    };

    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;

        ctx.drawImage(this.spritesheet,
            this.xStart + this.width*frame, this.yStart,
            this.width, this.height,
            this.x, this.y,
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