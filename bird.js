class Bird {
    constructor(game, mickey, x, y) {
        this.game = game;
        this.mickey = mickey;

        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.speed = 50;

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
        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    };

    update() {
        if (this.mickey.x + this.mickey.width / 4 < this.x) {
            this.x -= this.speed * this.game.clockTick;
            this.flip = 1; // Flip the sprite if moving left
            this.xStart = 1120;
        } 
        if (this.mickey.x + this.mickey.width / 4 > this.x) {
            this.x += this.speed * this.game.clockTick;
            this.flip = 0; // Do not flip the sprite if moving right
            this.xStart = 0;
        } 
        if (this.mickey.x + this.mickey.width / 4 == this.x) {
            this.x += this.speed * this.game.clockTick;
        }
        if (this.mickey.y + this.mickey.height / 4 < this.y) {
            this.y -= this.speed * this.game.clockTick;
        } 
        if (this.mickey.y + this.mickey.height / 4 > this.y) {
            this.y += this.speed * this.game.clockTick;
        }

        // update bounding box
        this.BB.x = this.x;
        this.BB.y = this.y;

        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Bird!!!");
        }
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