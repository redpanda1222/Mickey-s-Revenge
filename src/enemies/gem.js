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
        if (this.BB.collideBB(this.mickey.BB)) {
            //red = 0 gives base exp, blue = 1 gives exp 2X , green = 2 gives exp
            if (this.gemType == 0){ 
                this.mickey.experiencePoints += 1;
            }
            else if (this.gemType == 1){
                 this.mickey.experiencePoints +=  5;
                }
            else if (this.gemType == 2){
                //check for overflow
                if (this.mickey.currentHP + (this.mickey.MaxHP*0.3)>this.mickey.MaxHP) {
                    //add difference in health instead and fill currentHP to MaxHP
                    //this.mickey.currentHP = this.mickey.MaxHP - this.mickey.currentHP;
                    this.mickey.currentHP = this.mickey.MaxHP;
                }else {
                    this.mickey.currentHP += this.mickey.MaxHP*0.3;
                }
            }
            
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
            this.BB.draw(ctx, this.game);
        }
    }

}