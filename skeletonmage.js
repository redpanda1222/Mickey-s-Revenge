class skeletonmage {
    constructor(game, mickey, x, y) {
        this.game = game;
        // this.mickey = mickey;

        // this.x = x;
        // this.y = y;
        this.w = 60;
        this.h = 60;
        this.speed = 21;

        // this.elapsedTime = 0;
        // this.frameCount = 8;
        // this.frameDuration = 0.1;
        this.x = 0;
        this.y = 0

        this.size = 0;
        this.facing = 0;
        this.state = 0;
        this.velocity = 0;
        this.animation = [];
        this.loadAnimations();

        this.totalTime = this.frameCount * this.frameDuration;
     
        // this.xStart = 0;
        // this.yStart = 204;
        this.width = 100;
        this.height = 100;
        
        // this.flip = 0;

        //Rectangle bounding box
        this.offsetBB = {x: 15, y: 2, w: -30, h: -15};
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y + this.offsetBB.y, this.w + this.offsetBB.w, this.h + this.offsetBB.h);
    };

    update() {
        // if (this.mickey.x < this.x) {
        //     this.x -= this.speed * this.game.clockTick;
        //     this.flip = 1; // Flip the sprite if moving left
        //     this.xStart = 515;
        //     this.yStart = 73;
        // } 
        // if (this.mickey.x > this.x) {
        //     this.x += this.speed * this.game.clockTick;
        //     this.flip = 0; // Do not flip the sprite if moving right
        //     this.xStart = 0;
        //     this.yStart = 204;
        // } 
        // if (this.mickey.x == this.x) {
        //     this.x += this.speed * this.game.clockTick;
        //     this.flip = 1;
        // }
        // if (this.mickey.y < this.y) {
        //     this.y -= this.speed * this.game.clockTick;
        // } 
        // if (this.mickey.y > this.y) {
        //     this.y += this.speed * this.game.clockTick;
        // }

        // // update bounding box
        // this.BB.x = this.x + this.offsetBB.x;
        // this.BB.y = this.y + this.offsetBB.y;

        // if (this.BB.collideBB(this.mickey.BB)) {
        //     console.log("Skeleton!!!");
        // }
    };
    loadAnimations() {
        // facing forward
        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/skeletonmage.png"), 1, 1, 47, 32, 3, 0.3));
        // facing left
        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/skeletonmage.png"), 1, 48, 47, 32, 3, 0.3));
        // facing right
        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/skeletonmage.png"), 1, 96, 47, 32, 3, 0.3));
        // the back
        this.animation.push(new Animator(ASSET_MANAGER.getAsset("./assets/enemy/skeletonmage.png"), 1, 145, 47, 32, 3, 0.3));
    };
    draw(ctx) {
        this.elapsedTime += this.game.clockTick;
        const frame = this.currentFrame();
        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        // if (this.flip == 0) {
        //     ctx.drawImage(this.spritesheet,
        //         this.xStart + this.width*frame, this.yStart,
        //         this.width, this.height,
        //         this.x, this.y,
        //         this.w, this.h);
        // }
        // else if (this.flip == 1) {
        //     ctx.drawImage(this.spritesheet,
        //         this.xStart - this.width*frame, this.yStart,
        //         this.width, this.height,
        //         this.x, this.y,
        //         this.w, this.h);
        // }
        if (this.facing == 0) {
            this.animation[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.width, this.height);
        } else if (this.facing == 1) {
            this.animation[2].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.width, this.height);
        } else if (this.facing == 2) {
            this.animation[1].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.width, this.height);
        } else if (this.facing == 3) {
            this.animation[3].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.width, this.height);
        };
        // draws bounding box
        this.BB.draw(ctx);
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};