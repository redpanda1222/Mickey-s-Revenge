var levelOne = {
    music: "./audio/escape.mp3",

    // background tiles (entities walk on)
    tileGrid:
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],

    // overlay on top of background (these are collidable)
    barbedwires: [
        { x: 100, y: 392 }
    ],

    deadbodies: [
        { x: 600, y: 102 }
    ],

    deadtrees: [
        { x: 410, y: 222 }
    ],

    emptybarrels: [
        { x: 283, y: 602 }
    ],

    deserttowers: [
        { x: 100, y: 100 }
    ],

    destroyeddeserttowers: [
        { x: 500, y: 400 }
    ],

    walmartstonehenges: [
        { x: 220, y: 313 }
    ]
}

