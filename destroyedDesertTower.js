class destroyedDesertTower {
    constructor(x, y, width, height, scale ){
        Object.assign(this,{x, y, width, height,scale});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/background/destroyedDesertTower.png");
        this.BB = new BoundingBox(x,y, width*scale, height*scale);
    };

    update(){


    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
    }

};