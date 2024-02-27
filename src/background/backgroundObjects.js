class BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        Object.assign(this, {game, x, y, width, height, scale });
     
    }

    updateBB(offsetBB) {
        this.BB = new BoundingBox(this.x + offsetBB.x, this.y + offsetBB.y, this.width * this.scale + offsetBB.w, this.height * this.scale + offsetBB.h);
    }

    updateSpritesheet(path) {
        this.spritesheet = ASSET_MANAGER.getAsset(path);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width * this.scale, this.height * this.scale);
        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx, this.game);
        }
    }
}

class DestroyedDesertTower extends BackgroundObject {
    constructor(game, x, y) {
        super(game, x, y, 393, 399, 0.5);
        this.updateSpritesheet("./assets/background/destroyedDesertTower.png");
        // change BB
        this.offsetBB = { x: 44, y: 90, w: -80, h: -110 };
        this.updateBB(this.offsetBB);
    }
}

class BarbedWire extends BackgroundObject {
    constructor(game, x, y) {
        super(game, x, y, 83, 56, 1);
        this.updateSpritesheet("./assets/background/barbedwire1.png");
        this.offsetBB = { x: 0, y: 20, w: 0, h: -20 };
        this.updateBB(this.offsetBB);
    }
}

class VerticalBarbedWire extends BackgroundObject {
    constructor(game, x, y) {
        super(game, x, y, 56, 83, 1);
        this.updateSpritesheet("./assets/background/barbedwire2.png");
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.updateBB(this.offsetBB);
    }
}

class DesertTower extends BackgroundObject {
    constructor(game, x, y) {
        super(game, x, y, 311, 324, 0.5);
        this.updateSpritesheet("./assets/background/deserttower.png");
        this.offsetBB = { x: 34, y: 100, w: -61, h: -100 };
        this.updateBB(this.offsetBB);
    }
}

class DeadTree extends BackgroundObject {
    constructor(game, x, y) {
        super(game, x, y, 1920, 1920, 0.05);
        this.updateSpritesheet("./assets/background/deadtree.png");
        this.offsetBB = { x: 32, y: 80, w: -64, h: -80 };
        this.updateBB(this.offsetBB);
    }
}

class DeadBody extends BackgroundObject {
    constructor(game, x, y) {
        super(game, x, y, 64, 34, 1);
        this.updateSpritesheet("./assets/background/deadbodies1.png");
        this.offsetBB = { x: 0, y: 4, w: 0, h: -6 };
        this.updateBB(this.offsetBB);
    }
}

class EmptyBarrel extends BackgroundObject {
    constructor(game, x, y) {
        super(game, x, y, 72, 64, 1);
        this.updateSpritesheet("./assets/background/emptybarrel1.png");
        this.offsetBB = { x: 22, y: 54, w: -46, h: -58 };
        this.updateBB(this.offsetBB);
    }
}

class WallmartStoneHenge extends BackgroundObject {
    constructor(game, x, y) {
        super(game, x, y, 446, 370, 0.5);
        this.updateSpritesheet("./assets/background/walmartStoneHenge.png");
        this.offsetBB = { x: 37, y: 40, w: -68, h: -60 };
        this.updateBB(this.offsetBB);
    }
}
