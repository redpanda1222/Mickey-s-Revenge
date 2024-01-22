class Skeleton {
    constructor(game) {
        this.game = game;

        this.x = 0;
        this.y = 150;
        this.w = 60;
        this.h = 60;
        this.speed = 50;

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
    };

    update() {
        if (this.flip == 0) {
            this.x += this.speed * this.game.clockTick;
            if(this.x > 973) {
                this.flip = 1; 
                this.x = 985;
                this.xStart = 515;
                this.yStart = 73;
            }
        }
        else if (this.flip == 1) {
            this.x -= this.speed * this.game.clockTick;
            if (this.x < -10) {
                this.flip = 0; 
                this.x = 0;
                this.xStart = 0;
                this.yStart = 204
            }
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
            ctx.drawImage(this.spritesheet,
                this.xStart - this.width*frame, this.yStart,
                this.width, this.height,
                this.x, this.y,
                this.w, this.h);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};