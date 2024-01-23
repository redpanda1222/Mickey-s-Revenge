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

        //rectangle box 
        this.xRect = this.x + 15;
        this.yRect = this.y + 2;
        this.wRect = this.w - 30;
        this.hRect = this.h - 15;
    };

    update() {
        if (this.mickey.x < this.x) {
            this.x -= this.speed * this.game.clockTick;
            this.flip = 1; // Flip the sprite if moving left
            this.xStart = 515;
            this.yStart = 73;
        } 
        if (this.mickey.x > this.x) {
            this.x += this.speed * this.game.clockTick;
            this.flip = 0; // Do not flip the sprite if moving right
            this.xStart = 0;
            this.yStart = 204;
        } 
        if (this.mickey.x == this.x) {
            this.x += this.speed * this.game.clockTick;
            this.flip = 1;
        }
        if (this.mickey.y < this.y) {
            this.y -= this.speed * this.game.clockTick;
        } 
        if (this.mickey.y > this.y) {
            this.y += this.speed * this.game.clockTick;
        }

        this.xRect = this.x + 15;
        this.yRect = this.y + 2;
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

        ctx.beginPath();
        ctx.rect(this.xRect, this.yRect, this.wRect, this.hRect);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};