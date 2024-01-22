class BackgroundObject{
    constructor(x, y, width, height, scale, filepath) {
        Object.assign(this, { x, y, width, height , scale});
        this.spritesheet = ASSET_MANAGER.getAsset(filepath);
        // this.BB = new BoundingBox(x, y, width, height);
    };

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
    }
}