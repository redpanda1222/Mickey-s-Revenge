// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.lastTimestamp = 0;
    };

    tick() {
        const current = Date.now();
        const delta = (current - this.lastTimestamp) / 1000;
        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };
};

class Clock {
    constructor(game, timesUp) {
        this.game = game;
        this.elapsed = 0;
        this.timesUp = timesUp;
    }

    update() {
        this.elapsed += this.game.clockTick;
    }

    isDone() {
        return this.elapsed >= this.timesUp;
    }

    doneTicking() { // combines update and is done and reset
        if (this.isDone()) {
            this.reset();
            return true;
        } else {
            this.update();
            return false;
        }
    }

    reset() {
        this.elapsed = 0;
    }
}
