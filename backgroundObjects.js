class BackgroundObject {
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

class BarbedWire {
    constructor(x, y, width, height, scale) {
        Object.assign(this, { x, y, width, height , scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/barbedwire1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class DesertTower {
    constructor(x, y, width, height, scale) {
        Object.assign(this, { x, y, width, height , scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deserttower.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class DeadTree {
    constructor(x, y, width, height, scale) {
        Object.assign(this, { x, y, width, height , scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deadtree.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class DeadBody {
    constructor(x, y, width, height, scale) {
        Object.assign(this, { x, y, width, height , scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deadbodies1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class EmptyBarrel {
    constructor(x, y, width, height, scale) {
        Object.assign(this, { x, y, width, height , scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/emptybarrel1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class DestroyedDesertTower {
    constructor(x, y, width, height, scale) {
        Object.assign(this, { x, y, width, height , scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/destroyedDesertTower.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class WallmartStoneHenge {
    constructor(x, y, width, height, scale) {
        Object.assign(this, { x, y, width, height , scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/walmartStoneHenge.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}