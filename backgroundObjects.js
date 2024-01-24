class BackgroundObject {
    constructor(x, y, width, height, scale, game) {
        Object.assign(this, { x, y, width, height, scale, game });
    }

    handleCollision(entity) {
        let overlap = this.BB.overlapBB(entity.BB);
        let sig = { x: Math.sign(this.BB.x - entity.BB.x), y: Math.sign(this.BB.y - entity.BB.y) };
        // console.log("[X: sig " + sig.x + ", dif " + overlap.x + "], [Y: sig " + sig.y + ", dif " + overlap.y + "]");

        if (overlap.x < overlap.y) {
            entity.x -= (overlap.x + 1) * sig.x;
        } else {
            entity.y -= (overlap.y + 1) * sig.y;
        }
    }

    updateBB(offsetBB) {
        this.BB = new BoundingBox(this.x + offsetBB.x, this.y + offsetBB.y, this.width * this.scale + offsetBB.w, this.height * this.scale + offsetBB.h);
    }

    updateSpritesheet(path) {
        this.spritesheet = ASSET_MANAGER.getAsset(path);
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        // draws bounding box
        this.BB.draw(ctx);
    }
}

class DestroyedDesertTower extends BackgroundObject {
    constructor(x, y, width, height, scale, game) {
        super(x, y, width, height, scale, game);
        this.updateSpritesheet("./assets/background/destroyedDesertTower.png");
        // change BB
        this.offsetBB = { x: 44, y: 10, w: -80, h: -20 };
        this.updateBB(this.offsetBB);
    }

    update() {
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity);
            }
        });
    }
}

class BarbedWire extends BackgroundObject {
    constructor(x, y, width, height, scale, game) {
        super(x, y, width, height, scale, game);
        this.updateSpritesheet("./assets/background/barbedwire1.png");
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.updateBB(this.offsetBB);
    }

    update() {
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity);
            }
        });
    }
}

class DesertTower extends BackgroundObject {
    constructor(x, y, width, height, scale, game) {
        super(x, y, width, height, scale, game);
        this.updateSpritesheet("./assets/background/deserttower.png");
        this.offsetBB = { x: 34, y: 0, w: -61, h: 0 };
        this.updateBB(this.offsetBB);
    }

    update() {
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity);
            }
        });
    }
}

class DeadTree extends BackgroundObject {
    constructor(x, y, width, height, scale, game) {
        super(x, y, width, height, scale, game);
        this.updateSpritesheet("./assets/background/deadtree.png");
        this.offsetBB = { x: 32, y: 8, w: -64, h: -10 };
        this.updateBB(this.offsetBB);
    }

    update() {
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity);
            }
        });
    }
}

class DeadBody extends BackgroundObject {
    constructor(x, y, width, height, scale, game) {
        super(x, y, width, height, scale, game);
        this.updateSpritesheet("./assets/background/deadbodies1.png");
        this.offsetBB = { x: 0, y: 4, w: 0, h: -6 };
        this.updateBB(this.offsetBB);
    }

    update() {
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity);
            }
        });
    }
}

class EmptyBarrel extends BackgroundObject {
    constructor(x, y, width, height, scale, game) {
        super(x, y, width, height, scale, game);
        this.updateSpritesheet("./assets/background/emptybarrel1.png");
        this.offsetBB = { x: 22, y: 24, w: -46, h: -28 };
        this.updateBB(this.offsetBB);
    }

    update() {
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity);
            }
        });
    }
}

class WallmartStoneHenge extends BackgroundObject {
    constructor(x, y, width, height, scale, game) {
        super(x, y, width, height, scale, game);
        this.updateSpritesheet("./assets/background/walmartStoneHenge.png");
        this.offsetBB = { x: 37, y: 9, w: -68, h: -30 };
        this.updateBB(this.offsetBB);
    }

    update() {
        this.game.entities.forEach(entity => {
            if (this.BB.collideBB(entity.BB)) {
                this.handleCollision(entity);
            }
        });
    }
}