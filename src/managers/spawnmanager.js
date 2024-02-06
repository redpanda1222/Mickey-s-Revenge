class SpawnManager {
    constructor(game, mickey) {
        this.game = game;
        this.mickey = mickey;
        this.elapsed = 0;
    }

    update() {
        let oldElapsed = this.elapsed;
        this.elapsed += this.game.clockTick;

        // randomly spawns every second
        if (Math.floor(this.elapsed) != Math.floor(oldElapsed)) {
            switch(randomInt(3)) {
                case 0:
                    this.game.addEntity(new Bird(this.game, this.mickey, randomInt(PARAMS.WIDTH), randomInt(PARAMS.HEIGHT)));
                    break;
                case 1:
                    this.game.addEntity(new Huskydog(this.game, this.mickey, randomInt(PARAMS.WIDTH), randomInt(PARAMS.HEIGHT)));
                    break;
                default:
                    this.game.addEntity(new Skeleton(this.game, this.mickey, randomInt(PARAMS.WIDTH), randomInt(PARAMS.HEIGHT)));
            }
        }
    }
}