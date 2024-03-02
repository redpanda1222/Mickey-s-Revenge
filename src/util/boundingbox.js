class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, {x, y, width, height });
    };

    overlapBB(otherBB) {
        let right = this.x + this.width;
        let bottom = this.y + this.height;
        let o_right = otherBB.x + otherBB.width;
        let o_bottom = otherBB.y + otherBB.height;

        let a_half = {x: this.width / 2, y: this.height / 2};
        let b_half = {x: otherBB.width / 2, y: otherBB.height / 2};

        let a_center = {x: right - a_half.x, y: bottom - a_half.y};
        let b_center = {x: o_right - b_half.x, y: o_bottom - b_half.y};

        let ox = a_half.x + b_half.x - Math.abs(a_center.x - b_center.x);
        let oy = a_half.y + b_half.y - Math.abs(a_center.y - b_center.y);

        return {x: ox, y: oy};
    };

    center() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
    }

    collideBB (otherBB) {
        return this.x + this.width  > otherBB.x && this.x < otherBB.x + otherBB.width &&
               this.y + this.height > otherBB.y && this.y < otherBB.y + otherBB.height;
    }

    updateBB(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, game) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - game.cameraX, this.y - game.cameraY, this.width, this.height);
        // const s = this.getSides();
        // line(ctx, s[0].x1, s[0].y1, s[0].x2, s[0].y2);
        // line(ctx, s[1].x1, s[1].y1, s[1].x2, s[1].y2);
    }

    getSides() {
        return [new Line2(this.x, this.y, this.x, this.y + this.height), // left
                new Line2(this.x, this.y, this.x + this.width, this.y),  // top
                new Line2(this.x + this.width, this.y, this.x + this.width, this.y + this.height), // right
                new Line2(this.x, this.y + this.height, this.x + this.width, this.y + this.height)]; // bot
    }
};