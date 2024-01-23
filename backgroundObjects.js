class BarbedWire {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height, scale, mickey });
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/barbedwire1.png");

        this.offsetBB = {x: 0, y: 0, w: 0, h: 0};
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, width * scale + this.offsetBB.w, height * scale + this.offsetBB.h);
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
        
        this.offsetBB = {x: 34, y: 0, w: -61, h: 0};
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, width * scale + this.offsetBB.w, height * scale + this.offsetBB.h);
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
        
        this.offsetBB = {x: 32, y: 8, w: -64, h: -10};
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, width * scale + this.offsetBB.w, height * scale + this.offsetBB.h);
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
        
        this.offsetBB = {x: 0, y: 4, w: 0, h: -6};
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, width * scale + this.offsetBB.w, height * scale + this.offsetBB.h);
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
        
        this.offsetBB = {x: 22, y: 24, w: -46, h: -28};
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, width * scale + this.offsetBB.w, height * scale + this.offsetBB.h);
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
        
        this.offsetBB = {x: 44, y: 10, w: -80, h: -20};
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, width * scale + this.offsetBB.w, height * scale + this.offsetBB.h);
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
        
        this.offsetBB = {x: 37, y: 9, w: -68, h: -30};
        this.BB = new BoundingBox(x + this.offsetBB.x, y + this.offsetBB.y, width * scale + this.offsetBB.w, height * scale + this.offsetBB.h);
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