class SpawnManager {
    constructor(game, mickey) {
        this.game = game;
        this.mickey = mickey;
        this.waves = null;
        this.formations = [];
    }

    loadWaves(waves, formations) {
        this.tickCounter = 0;
        this.elapsed = 0;

        this.waveNum = 0;
        this.waves = waves;
        this.allWeights = [];
        this.allSpawns = [];

        waves.forEach(wave => {
            let weights = [];
            let spawns = [];
            let i;

            if (wave.skeleton) {
                spawns.push(0);
                for (i = 0; i < wave.skeleton; i++) {
                    weights.push(spawns.length - 1);
                }
            }

            if (wave.bird) {
                spawns.push(1);
                for (i = 0; i < wave.bird; i++) {
                    weights.push(spawns.length - 1);
                }
            }

            if (wave.huskydog) {
                spawns.push(2);
                for (i = 0; i < wave.huskydog; i++) {
                    weights.push(spawns.length - 1);
                }
            }

            if (wave.skeletonmage) {
                spawns.push(3);
                for (i = 0; i < wave.skeletonmage; i++) {
                    weights.push(spawns.length - 1);
                }
            }

            this.allWeights.push(weights);
            this.allSpawns.push(spawns);
        });

        if (!formations) return;

        formations.forEach(f => {
            if (f.skeleton) {
                f.skeleton.forEach(s => {

                });
            }

            if (f.bird) {
                
            }

            if (f.huskydog) {
                
            }

            if (f.skeletonmage) {
                
            }
            this.formations.push(new BatchSpawns())
        });
    }

    spawnEnemy(id) {
        switch(id) {
            case 0:
                this.game.addEntity(new Skeleton(this.game, this.mickey, randomInt(PARAMS.WIDTH), randomInt(PARAMS.HEIGHT)));
                break;
            case 1:
                this.game.addEntity(new Bird(this.game, this.mickey, randomInt(PARAMS.WIDTH), randomInt(PARAMS.HEIGHT)));
                break;
            case 2:
                this.game.addEntity(new Huskydog(this.game, this.mickey, randomInt(PARAMS.WIDTH), randomInt(PARAMS.HEIGHT)));
                break;
            case 3:
                this.game.addEntity(new SkeletonMage(this.game, this.mickey, randomInt(PARAMS.WIDTH), randomInt(PARAMS.HEIGHT)));
                break;
            default:
        }
    }

    update() {
        if (!this.waves) return;

        if (this.waveNum < this.waves.length - 1  && this.elapsed > this.waves[this.waveNum + 1].time) {
            this.waveNum++;
            this.tickCounter = 0;
            console.log("Wave: " + this.waveNum);
        }

        if (this.tickCounter === 0) { // spawn
            const maxWeight = this.allWeights[this.waveNum].length;
            const randSpawn = this.allWeights[this.waveNum][randomInt(maxWeight)];
            this.spawnEnemy(this.allSpawns[this.waveNum][randSpawn]);
        }

        this.tickCounter = (this.tickCounter + 1) % this.waves[this.waveNum].spawnrate; 
        this.elapsed += this.game.clockTick;
    }
}

class BatchSpawns {
    constructor(time, id, positions, moveVector) {
        this.time = time;
        this.id = id;
        this.positions = positions;
        this.moveVector;
    }
}