class Gem {
    constructor(game, mickey, x, y, gemType) {
        Object.assign(this, {game, mickey, x, y, gemType});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/miscellaneous/gems.png");

        // information from sprite sheet
        this.coordinates = [
            { x: 0, y: 0 },   //RED
            { x: 86, y: 0 },  //BLUE
            { x: 170, y: 85 },// GREEN
        ];
        this.width = 82;
        this.height = 85;

        // size to appear on canvas
        this.w = 20;
        this.h = 20;

        // bounding box
        this.offsetBB = { x: 0, y: 0, w: 0, h: 0 };
        this.BB = new BoundingBox(this.x + this.offsetBB.x, this.y, this.w + this.offsetBB.y, this.h);
    }

    update() {
        let toMickey = this.mickey.BB.center().sub(this.BB.center());

        if (this.BB.collideBB(this.mickey.BB)) {
            //red = 0 gives base exp, blue = 1 gives exp 2X , green = 2 gives exp
            if (this.gemType == 0){ 
                this.mickey.experiencePoints += 3;
            }
            else if (this.gemType == 1){
                 this.mickey.experiencePoints +=  6;
                }
            else if (this.gemType == 2){
                //check for overflow
                if (this.mickey.currentHP + (this.mickey.MaxHP*0.3)>this.mickey.MaxHP) {
                    //add difference in health instead and fill currentHP to MaxHP
                    //this.mickey.currentHP = this.mickey.MaxHP - this.mickey.currentHP;
                    this.mickey.currentHP = this.mickey.MaxHP;
                }else {
                    this.mickey.currentHP += this.mickey.MaxHP*0.2;
                }
            }
            
            this.removeFromWorld = true;
        } 
        // magnet pull towards mickey if within range
        else if (toMickey.mag() < this.mickey.pickupRadius) {
            toMickey = toMickey.norm().mul(4);
            this.x += toMickey.x;
            this.y += toMickey.y;
            this.BB.updateBB(this.x + this.offsetBB.x, this.y + this.offsetBB.y);
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
            this.BB.draw(ctx, this.game);
        }
    }
}

class DamageText {
    constructor(game, entity, damage, xOffset, yOffset) {
        Object.assign(this, {game, entity, damage, xOffset, yOffset});
        this.clock = new Clock(game, 0.4);
        this.textSize = 20;
        this.entityDead = false;
        this.x = this.entity.pos.x;
        this.y = this.entity.pos.y;
    }

    update() {
        this.entityDead = !this.entityDead && !this.entity.removeFromWorld;

        if (this.clock.doneTicking()) {
            this.removeFromWorld = true;
        }
        this.yOffset -= 2;

        if (!this.entityDead) {
            this.x = this.entity.pos.x;
            this.y = this.entity.pos.y;
        }
    }

    draw(ctx) {
        ctx.font = this.textSize + 'px Arial';
        ctx.fillStyle = "red";
        ctx.fillText("-" + this.damage, this.x + this.xOffset - this.game.cameraX, this.y + this.yOffset - this.game.cameraY);
    }
}