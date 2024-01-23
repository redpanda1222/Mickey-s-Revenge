class Huskydog {
    constructor(game, mickey,x , y) {
        this.game = game;
        this.mickey = mickey;

        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.speed = 40;

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
        if (this.mickey.x < this.x) {
            this.x -= this.speed * this.game.clockTick;
            this.flip = 1; // Flip the sprite if moving left
            this.xStart = 445;
        } 
        if (this.mickey.x > this.x) {
            this.x += this.speed * this.game.clockTick;
            this.flip = 0; // Do not flip the sprite if moving right
            this.xStart = 0;
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