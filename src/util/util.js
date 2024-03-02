/** Global Parameters Object */
const PARAMS = {
    WIDTH: 1024,
    HEIGHT: 768
}

/**
 * @param {Number} n
 * @returns Random Integer Between 0 and n-1
 */
const randomInt = n => Math.floor(Math.random() * n);

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @returns String that can be used as a rgb web color
 */
const rgb = (r, g, b) => `rgba(${r}, ${g}, ${b})`;

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @param {Number} a Alpha Value
 * @returns String that can be used as a rgba web color
 */
const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

/**
 * @param {Number} h Hue
 * @param {Number} s Saturation
 * @param {Number} l Lightness
 * @returns String that can be used as a hsl web color
 */
const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

/** Creates an alias for requestAnimationFrame for backwards compatibility */
window.requestAnimFrame = (() => {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        /**
         * Compatibility for requesting animation frames in older browsers
         * @param {Function} callback Function
         * @param {DOM} element DOM ELEMENT
         */
        ((callback, element) => {
            window.setTimeout(callback, 1000 / 60);
        });
})();

/**
 * Returns distance from two points
 * @param {Number} p1, p2 Two objects with x and y coordinates
 * @returns Distance between the two points
 */
const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * Returns whether mouse is within a region
 * @param {*} mouse game.mouse or click
 * @param {Number} x position
 * @param {Number} y position
 * @param {Number} w width of region
 * @param {Number} h height of region
 * @returns 
 */
const mouseOver = (mouse, x, y, w, h) => {
    return mouse.x > x && mouse.x < x + w && mouse.y > y && mouse.y < y + h;
}

const centerRect = (ctx, x, y, w, h, fill, border) => {
    if (border) {
        ctx.fillStyle = fill;
        ctx.fillRect(x - w / 2, y - h / 2, w, h);
        ctx.fillStyle = border;
        ctx.strokeRect(x - w / 2, y - h / 2, w, h);
    } else {
        if (fill) ctx.fillRect(x - w / 2, y - h / 2, w, h);
        else ctx.strokeRect(x - w / 2, y - h / 2, w, h);
    }
}

function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

const degreeToRad = (degree) => {
    return degree * (Math.PI / 180);
}

/**
 * Vector Math.
 */
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(otherVector) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    }

    sub(otherVector) {
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
    }

    mul(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    div(scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    norm() {
        return this.div(this.mag());
    }
}

class Line2 {
    constructor(x1, y1, x2, y2) {
        Object.assign(this, { x1, y1, x2, y2 });
    }
}

/**
 * @param {Line2} line1 
 * @param {Line2} line2 
 * @returns Whether there is intersection between 2 lines of Line2 class
 */
const linearIntersection = (line1, line2) => {
    // calculate the direction of the lines
    const uA = ((line2.x2 - line2.x1) * (line1.y1 - line2.y1) - (line2.y2 - line2.y1) * (line1.x1 - line2.x1)) / 
               ((line2.y2 - line2.y1) * (line1.x2 - line1.x1) - (line2.x2 - line2.x1) * (line1.y2 - line1.y1));

    if (!(uA >= 0 && uA <= 1)) return false;
               
    const uB = ((line1.x2 - line1.x1) * (line1.y1 - line2.y1) - (line1.y2 - line1.y1) * (line1.x1 - line2.x1)) / 
               ((line2.y2 - line2.y1) * (line1.x2 - line1.x1) - (line2.x2 - line2.x1) * (line1.y2 - line1.y1));

    return uB >= 0 && uB <= 1;
    // if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    //     const intersectionX = line1.x1 + (uA * (line1.x2 - line1.x1));
    //     const intersectionY = line1.y1 + (uA * (line1.y2 - line1.y1));
    //     return { x: intersectionX, y: intersectionY };
    // }
    // return null;
}