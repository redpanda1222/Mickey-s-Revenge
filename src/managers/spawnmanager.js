class SpawnManager {
    constructor(game, mickey) {
        this.game = game;
        this.mickey = mickey;
        this.waves = null;
        this.formations = [];
        this.allWeights = [];
        this.allSpawns = [];
    }

    loadWaves(waves, formations) {
        this.reset();
        this.waves = waves;
        let i;

        if (waves) {
            waves.forEach(wave => {
                let weights = [];
                let spawns = [];

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
        }

        if (formations) {
            formations.forEach(f => {
                if (f.skeleton) {
                    f.spawntime.forEach(t => {
                        this.formations.push(new BatchSpawns(t, 0, f.skeleton, f.moveVector, f.despawnTime));
                    });
                }
                else if (f.bird) {
                    f.spawntime.forEach(t => {
                        this.formations.push(new BatchSpawns(t, 1, f.bird, f.moveVector, f.despawnTime));
                    });
                }
                else if (f.huskydog) {
                    f.spawntime.forEach(t => {
                        this.formations.push(new BatchSpawns(t, 2, f.huskydog, f.moveVector, f.despawnTime));
                    });
                }
                else if (f.skeletonmage) {
                    f.spawntime.forEach(t => {
                        this.formations.push(new BatchSpawns(t, 3, f.skeletonmage, f.moveVector, f.despawnTime));
                    });
                }
            });
            this.formations.sort((a, b) => {
                return a.time - b.time;
            });
        }

        // console.log(this.formations);
    }

    reset() {
        this.tickCounter = 0;
        this.elapsed = 0;

        this.formationsIndex = 0;
        this.wavesIndex = 0;

        this.allSpawns.length = 0;
        this.allWeights.length = 0;
        this.formations.length = 0;
    }

    spawnEnemy(id, x, y, move, lifespan) {

        // Define the rectangle dimensions
        const minX = -1000 - this.game.cameraX; // Minimum x-coordinate
        const maxX = 1025 - this.game.cameraX; // Maximum x-coordinate
        const minY = -1000 - this.game.cameraY; // Minimum y-coordinate
        const maxY = 1078 - this.game.cameraY; // Maximum y-coordinate

        // Generate a random value within the defined rectangle
        let randomX = randomInt(PARAMS.WIDTH);
        let randomY = randomInt(PARAMS.HEIGHT);

        if (randomX <= minX) {
            randomX = minX + 30; // Ensure randomX is within the rectangle
        }
        if (randomY <= minY) {
            randomY = minY + 30; // Ensure randomY is within the rectangle
        }
        if (randomX >= maxX) {
            randomX = maxX - 30; // Ensure randomX is within the rectangle
        }
        if (randomY >= maxY) {
            randomY = maxY - 30; // Ensure randomY is within the rectangle
        }

        // Calculate the final position
        const posX = this.game.cameraX + (x !== undefined ? x : randomX);
        const posY = this.game.cameraY + (y !== undefined ? y : randomY);

        switch (id) {
            case 0:
                this.game.addEntity(new Skeleton(this.game, this.mickey, posX, posY, move, lifespan));
                break;
            case 1:
                this.game.addEntity(new Bird(this.game, this.mickey, posX, posY, move, lifespan));
                break;
            case 2:
                this.game.addEntity(new Huskydog(this.game, this.mickey, posX, posY, move, lifespan));
                break;
            case 3:
                this.game.addEntity(new SkeletonMage(this.game, this.mickey, posX, posY, move, lifespan));
                break;
            default:
        }
    }

    update() {
        if (!this.waves) return;

        if (this.wavesIndex < this.waves.length - 1 && this.elapsed > this.waves[this.wavesIndex + 1].time) {
            this.wavesIndex++;
            this.tickCounter = 0;
            console.log("Wave: " + this.wavesIndex);
        }

        if (this.tickCounter === 0) { // spawn
            const maxWeight = this.allWeights[this.wavesIndex].length;
            const randSpawn = this.allWeights[this.wavesIndex][randomInt(maxWeight)];
            this.spawnEnemy(this.allSpawns[this.wavesIndex][randSpawn]);
        }

        if (this.formationsIndex < this.formations.length && this.elapsed > this.formations[this.formationsIndex].time) {
            const f = this.formations[this.formationsIndex];
            f.spawns.forEach(e => {
                this.spawnEnemy(f.id, e.x, e.y, f.moveVector, f.lifespan);
            });

            this.formationsIndex++;
        }

        this.tickCounter = (this.tickCounter + 1) % this.waves[this.wavesIndex].spawnrate;
        this.elapsed += this.game.clockTick;
    }
}

class BatchSpawns {
    constructor(time, id, spawns, moveVector, lifespan) {
        this.time = time;
        this.id = id;
        this.spawns = spawns;
        this.moveVector = moveVector;
        this.lifespan = lifespan;
    }
}