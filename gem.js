class Gem {
    constructor(game, mickey, x, y, gemType) {
        Object.assign(this, {game, mickey, x, y, gemType});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/miscellaneous/gems.png");

        // information from sprite sheet
        this.coordinates = [
            { x: 0, y: 0 },
            { x: 86, y: 0 },
            { x: 170, y: 85 },
        ];
        this.width = 82;
        this.height = 85;

        // size to appear on canvas
        this.w = 20;
        this.h = 20;

        // bounding box
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.BB = new BoundingBox(game, this.x + this.offsetBB.x, this.y, this.w + this.offsetBB.y, this.h);
    }

    update() {
        if (this.BB.collideBB(this.mickey.BB)) {
            // update exp point or do something

            
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet,
            this.coordinates[this.gemType].x, this.coordinates[this.gemType].y,
            this.width, this.height,
            this.x - this.game.cameraX, this.y - this.game.cameraY,
            this.w, this.h);

        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    }

}