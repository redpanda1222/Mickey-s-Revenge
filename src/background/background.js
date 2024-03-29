const scales = {

}
class Background {
    constructor(game, show, tileGrid, tileSize, scale) {
        Object.assign(this, { game, show, tileGrid, tileSize, scale });
        this.game = game;
        this.tiles = [ASSET_MANAGER.getAsset("./assets/background/sand.png"), ASSET_MANAGER.getAsset("./sandtile.png")];
       
    };

    updateTileGrid(show, tileGrid, tileSize, scale) {
        this.show = show;
        this.tileGrid = tileGrid;
        this.tileSize = tileSize;
        this.scale = scale;
    };
  
    
    draw(ctx) {

        if (!this.show) {
            return;
        }
        const size = this.tileSize * this.scale;
        for (let i = 0; i < this.tileGrid.length; i++) {
            for (let j = 0; j < this.tileGrid.length; j++) {
                switch(this.tileGrid[i][j]) {
                    case 0:
                        ctx.drawImage(this.tiles[0], 0, 0, this.tileSize, this.tileSize, (j-1) * size - this.game.cameraX % size, (i-1) * size - this.game.cameraY % size, size, size);                    
                        break;
                    case 1:
                        ctx.drawImage(this.tiles[1], 0, 0, this.tileSize, this.tileSize, j * size, i * size, size, size);
                        break;
                    default:
                }
            }
        }
    };
}