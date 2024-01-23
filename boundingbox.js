class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
    };

    // overlap(oth) {
    //     let a_half = {x: this.width / 2, y: this.height / 2};
    //     let b_half = {x: oth.width / 2, y: oth.height / 2};

    //     let a_center = {x: this.right - a_half.x, y: this.bottom - a_half.y};
    //     let b_center = {x: oth.right - b_half.x, y: oth.bottom - b_half.y};

    //     let ox = a_half.x + b_half.x - Math.abs(a_center.x - b_center.x);
    //     let oy = a_half.y + b_half.y - Math.abs(a_center.y - b_center.y);

    //     return {x: ox, y: oy};
    // };

    collideBB (otherBB) {
        return this.x + this.width  > otherBB.x && this.x < otherBB.x + otherBB.width &&
               this.y + this.height > otherBB.y && this.y < otherBB.y + otherBB.height;
    }

    draw(ctx) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
};