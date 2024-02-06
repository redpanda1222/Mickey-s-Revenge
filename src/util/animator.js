class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, loopback, reverse) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, loopback, reverse});

        this.elapsedTime = 0;
        if (loopback){
            this.totalTime = (frameCount * 2 - 1) * frameDuration;
        }else {
            this.totalTime = frameCount * frameDuration;
        };
    };

    drawFrame(tick, ctx, x, y, w, h) {
        this.elapsedTime += tick;
        const frame = this.currentFrame();
        const WIDTHPAD = this.width + this.framePadding;

        if (this.isDone()) this.elapsedTime -= this.totalTime;
        
        if (this.loopback){
            var xPos = this.xStart;
            if (this.reverse && frame > (this.frameCount/2) + 1) {
                var newframe = frame - Math.floor(this.frameCount/2) - 1;
                xPos = (this.xStart - WIDTHPAD*this.frameCount) + WIDTHPAD*newframe;
            }else if (frame > (this.frameCount/2) + 1){
                var newframe = frame - Math.floor(this.frameCount/2) - 1;
                xPos = (this.xStart + WIDTHPAD*this.frameCount) - WIDTHPAD*newframe;
                
            }else if (this.reverse) {
                xPos = this.xStart - WIDTHPAD*frame;
            }else{
                xPos = this.xStart + WIDTHPAD*frame;
            };
            ctx.drawImage(this.spritesheet,
                xPos, this.yStart,
                this.width, this.height,
                x, y,
                w, h);
        }else{
            if (this.reverse) {
                ctx.drawImage(this.spritesheet,
                    this.xStart - WIDTHPAD*frame, this.yStart,
                    this.width, this.height,
                    x, y,
                    w, h);
            }else{
                ctx.drawImage(this.spritesheet,
                    this.xStart + WIDTHPAD*frame, this.yStart,
                    this.width, this.height,
                    x, y,
                    w, h);
            }
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };

    reset() {
        this.elapsedTime = 0;
    }
};