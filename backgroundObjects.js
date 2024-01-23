class BarbedWire {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height, scale, mickey });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/barbedwire1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {
        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Barbed Wire!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        // draws bounding box
        this.BB.draw(ctx);
    }
}

class DesertTower {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height, scale, mickey });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deserttower.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {
        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Desert Tower!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        // draws bounding box
        this.BB.draw(ctx);
    }
}

class DeadTree {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height, scale, mickey });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deadtree.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {
        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Dead Tree!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        // draws bounding box
        this.BB.draw(ctx);
    }
}

class DeadBody {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height, scale, mickey });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deadbodies1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {
        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Dead body!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        // draws bounding box
        this.BB.draw(ctx);
    }
}

class EmptyBarrel {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height, scale, mickey });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/emptybarrel1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {
        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Barrel!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        // draws bounding box
        this.BB.draw(ctx);
    }
}

class DestroyedDesertTower {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height, scale, mickey });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/destroyedDesertTower.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {
        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Destroyed Tower!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        // draws bounding box
        this.BB.draw(ctx);
    }
}

class WallmartStoneHenge {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height, scale, mickey });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/walmartStoneHenge.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {
        if (this.BB.collideBB(this.mickey.BB)) {
            console.log("Stone Henge!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        // draws bounding box
        this.BB.draw(ctx);
    }
}