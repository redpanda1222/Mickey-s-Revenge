const scales = {

}
class Background {
    constructor(game, x, y, tileGrid, tileSize, scale, show) {
        Object.assign(this, { game, x, y, tileGrid, tileSize, scale, show });
        
        this.tiles = [ASSET_MANAGER.getAsset("./assets/background/sand.png"), ASSET_MANAGER.getAsset("./assets/background/desertsand.png")];
    };

    updateTileGrid(tileGrid, tileSize, scale, show) {
        this.tileGrid = tileGrid;
        this.tileSize = tileSize;
        this.scale = scale;
        this.show = show;
    };

    draw(ctx) {
        if (this.show == false) {
            return;
        }
        const size = this.tileSize * this.scale;
        for (let i = 0; i < this.tileGrid.length; i++) {
            for (let j = 0; j < this.tileGrid.length; j++) {
                switch(this.tileGrid[i][j]) {
                    case 0:
                        ctx.drawImage(this.tiles[0], 0, 0, this.tileSize, this.tileSize, j * size, i * size, size, size);
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