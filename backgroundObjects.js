class BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        Object.assign(this, {game, x, y, width, height, scale });
     
    }

    updateBB(offsetBB) {
        this.BB = new BoundingBox(this.game, this.x + offsetBB.x, this.y + offsetBB.y, this.width * this.scale + offsetBB.w, this.height * this.scale + offsetBB.h);
    }

    updateSpritesheet(path) {
        this.spritesheet = ASSET_MANAGER.getAsset(path);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x - this.game.cameraX, this.y - this.game.cameraY, this.width * this.scale, this.height * this.scale);
        if (PARAMS.DEBUG) {
            // draws bounding box
            this.BB.draw(ctx);
        }
    }
}

class DestroyedDesertTower extends BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        super(game, x, y, width, height, scale);
        this.updateSpritesheet("./assets/background/destroyedDesertTower.png");
        // change BB
        this.offsetBB = { x: 44, y: 10, w: -80, h: -20 };
        this.updateBB(this.offsetBB);
    }
}

class BarbedWire extends BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        super(game, x, y, width, height, scale);
        this.updateSpritesheet("./assets/background/barbedwire1.png");
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.updateBB(this.offsetBB);
    }
}

class DesertTower extends BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        super(game, x, y, width, height, scale);
        this.updateSpritesheet("./assets/background/deserttower.png");
        this.offsetBB = { x: 34, y: 0, w: -61, h: 0 };
        this.updateBB(this.offsetBB);
    }
}

class DeadTree extends BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        super(game, x, y, width, height, scale);
        this.updateSpritesheet("./assets/background/deadtree.png");
        this.offsetBB = { x: 32, y: 8, w: -64, h: -10 };
        this.updateBB(this.offsetBB);
    }
}

class DeadBody extends BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        super(game, x, y, width, height, scale);
        this.updateSpritesheet("./assets/background/deadbodies1.png");
        this.offsetBB = { x: 0, y: 4, w: 0, h: -6 };
        this.updateBB(this.offsetBB);
    }
}

class EmptyBarrel extends BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        super(game, x, y, width, height, scale);
        this.updateSpritesheet("./assets/background/emptybarrel1.png");
        this.offsetBB = { x: 22, y: 24, w: -46, h: -28 };
        this.updateBB(this.offsetBB);
    }
}

class WallmartStoneHenge extends BackgroundObject {
    constructor(game, x, y, width, height, scale) {
        super(game, x, y, width, height, scale);
        this.updateSpritesheet("./assets/background/walmartStoneHenge.png");
        this.offsetBB = { x: 37, y: 9, w: -68, h: -30 };
        this.updateBB(this.offsetBB);
    }
}
