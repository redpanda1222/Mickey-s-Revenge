class Huskydog {
    constructor(game) {
        this.game = game;

        this.x = 0;
        this.y = 720;
        this.w = 50;
        this.h = 50;
        this.speed = 100;

        this.elapsedTime = 0;
        this.frameCount = 5;
        this.frameDuration = 0.1;

        this.totalTime = this.frameCount * this.frameDuration;
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/enemy/huskydog.png");
        this.spritesheet1 = ASSET_MANAGER.getAsset("./assets/enemy/huskydog1.png");
        this.xStart = 0;
        this.yStart = 61;
        this.width = 90;
        this.height = 60;
        
        this.flip = 0;
    };

    update() {
        if (this.flip == 0) {
            this.x += this.speed * this.game.clockTick;
            if(this.x > 953) {
                this.flip = 1; 
                this.x = 980;
                this.xStart = 445;
            }
        }
        else if (this.flip == 1) {
            this.x -= this.speed * this.game.clockTick;
            if (this.x < 0) {
                this.flip = 0; 
                this.x = 0;
                this.xStart = 0;
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
            ctx.drawImage(this.spritesheet1,
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