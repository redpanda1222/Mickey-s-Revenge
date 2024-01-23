class BarbedWire {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height , scale, mickey});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/barbedwire1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);

        this.left = this.BB.x;
        this.top = this.BB.y;
        this.right = this.left + this.BB.width;
        this.bottom = this.top + this.BB.height;
    }

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    }

    update() {
        if (this.collide(this.mickey)) {
            console.log("Barbed Wire!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class DesertTower {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height , scale, mickey});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deserttower.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);

        this.left = this.BB.x;
        this.top = this.BB.y;
        this.right = this.left + this.BB.width;
        this.bottom = this.top + this.BB.height;
    }

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    }

    update() {
        if (this.collide(this.mickey)) {
            console.log("Desert Tower!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class DeadTree {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height , scale, mickey});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deadtree.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);

        this.left = this.BB.x;
        this.top = this.BB.y;
        this.right = this.left + this.BB.width;
        this.bottom = this.top + this.BB.height;
    }

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    }

    update() {
        if (this.collide(this.mickey)) {
            console.log("Dead Tree!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class DeadBody {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height , scale, mickey});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/deadbodies1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);

        this.left = this.BB.x;
        this.top = this.BB.y;
        this.right = this.left + this.BB.width;
        this.bottom = this.top + this.BB.height;
    }

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    }

    update() {
        if (this.collide(this.mickey)) {
            console.log("Dead body!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class EmptyBarrel {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height , scale, mickey});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/emptybarrel1.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);

        this.left = this.BB.x;
        this.top = this.BB.y;
        this.right = this.left + this.BB.width;
        this.bottom = this.top + this.BB.height;
    }

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    }

    update() {
        if (this.collide(this.mickey)) {
            console.log("Barrel!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class DestroyedDesertTower {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height , scale, mickey});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/destroyedDesertTower.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);

        this.left = this.BB.x;
        this.top = this.BB.y;
        this.right = this.left + this.BB.width;
        this.bottom = this.top + this.BB.height;
    }

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    }

    update() {
        if (this.collide(this.mickey)) {
            console.log("Destroyed Tower!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class WallmartStoneHenge {
    constructor(x, y, width, height, scale, mickey) {
        Object.assign(this, { x, y, width, height , scale, mickey});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/walmartStoneHenge.png");
        this.BB = new BoundingBox(x, y, width * scale, height * scale);

        this.left = this.BB.x;
        this.top = this.BB.y;
        this.right = this.left + this.BB.width;
        this.bottom = this.top + this.BB.height;
    }

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) return true;
        return false;
    }

    update() {
        if (this.collide(this.mickey)) {
            console.log("Stone Henge!!!");
        }
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}