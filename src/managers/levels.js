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
    // barbedwires: [
    //     { x: 100, y: 392 }
    // ],

    // deadbodies: [
    //     { x: 600, y: 102 }
    // ],

    // deadtrees: [
    //     { x: 410, y: 222 }
    // ],

    // emptybarrels: [
    //     { x: 283, y: 602 }
    // ],

    // deserttowers: [
    //     { x: 100, y: 100 }
    // ],

    // destroyeddeserttowers: [
    //     { x: 500, y: 400 }
    // ],

    // walmartstonehenges: [
    //     { x: 220, y: 313 }
    // ],

    waves: [
        {
            time: 0,       // spawn listed enemies after this time (seconds)
            spawnrate: 5, // lower for faster spawnrate (60 = 1 second)
            skeleton: 1    // enemyType and its weight (higher weight means higher chance to spawn)
        },
        {
            time: 20,
            spawnrate: 60,
            huskydog: 1
        },
        {
            time: 40,
            spawnrate: 60,
            skeleton: 3, // skeleton has 3 / 5 chance to spawn
            bird: 1,     // bird has 1 / 5 chance to spawn
            huskydog: 1  // huskydog has 1 / 5 chance to spawn
        },
        {
            time: 60,
            spawnrate: 30, // (30 = 0.5 second, 15 = 0.25 second, etc.)
            skeleton: 5,   // skeleton has 5 / 11 chance to spawn
            bird: 2,       // bird has 2 / 11 chance to spawn
            huskydog: 3,
            skeletonmage: 1
        },
        {
            time: 80,
            spawnrate: 60,
            skeletonmage: 1
        }
    ],

    formations: [
        {
            spawntime: [10, 30], // when to spawn
            moveVector: { x: 1, y: 0 }, // how formation moves (null = to mickey)
            despawnTime: 10, // when to despawn (null = no despawn)

            // skeleton wall left
            skeleton: [
                { x: 0, y: PARAMS.HEIGHT / 10 },
                { x: 0, y: PARAMS.HEIGHT / 10 * 2 },
                { x: 0, y: PARAMS.HEIGHT / 10 * 3 },
                { x: 0, y: PARAMS.HEIGHT / 10 * 4 },
                { x: 0, y: PARAMS.HEIGHT / 10 * 5 },
                { x: 0, y: PARAMS.HEIGHT / 10 * 6 },
                { x: 0, y: PARAMS.HEIGHT / 10 * 7 },
                { x: 0, y: PARAMS.HEIGHT / 10 * 8 },
                { x: 0, y: PARAMS.HEIGHT / 10 * 9 },
                { x: 0, y: PARAMS.HEIGHT }
            ]
        },
        {
            spawntime: [30],
            moveVector: { x: -1, y: 0 },
            despawnTime: 10,

            // skeleton wall right
            skeleton: [
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 10 + 10 },
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 10 * 2 + 10 },
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 10 * 3 + 10 },
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 10 * 4 + 10 },
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 10 * 6 + 10 },
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 10 * 7 + 10 },
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 10 * 8 + 10 },
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 10 * 9 + 10 },
                { x: PARAMS.WIDTH, y: PARAMS.HEIGHT }
            ]
        },
        {
            spawntime: [30],
            moveVector: { x: 0, y: -1 },
            despawnTime: 10,

            // skeleton wall up
            skeleton: [
                { x: PARAMS.WIDTH / 10 * 2, y: PARAMS.HEIGHT + 20 },
                { x: PARAMS.WIDTH / 10 * 3, y: PARAMS.HEIGHT + 20 },
                { x: PARAMS.WIDTH / 10 * 4, y: PARAMS.HEIGHT + 20 },
                { x: PARAMS.WIDTH / 10 * 5, y: PARAMS.HEIGHT + 20 },
                { x: PARAMS.WIDTH / 10 * 6, y: PARAMS.HEIGHT + 20 },
                { x: PARAMS.WIDTH / 10 * 7, y: PARAMS.HEIGHT + 20 },
                { x: PARAMS.WIDTH / 10 * 8, y: PARAMS.HEIGHT + 20 },
                { x: PARAMS.WIDTH / 10 * 9, y: PARAMS.HEIGHT + 20 }
            ]
        },
        {
            spawntime: [60],
            moveVector: { x: 0, y: 0 },
            despawnTime: 10,

            // skeletonmage circle
            skeletonmage: [
                { x: 512, y: 38 },
                { x: 619, y: 55 },
                { x: 715, y: 104 },
                { x: 792, y: 181 },
                { x: 841, y: 277 },
                { x: 858, y: 384 },
                { x: 841, y: 491 },
                { x: 792, y: 587 },
                { x: 715, y: 664 },
                { x: 619, y: 713 },
                { x: 512, y: 730 },
                { x: 405, y: 713 },
                { x: 309, y: 664 },
                { x: 232, y: 587 },
                { x: 183, y: 491 },
                { x: 166, y: 384 },
                { x: 183, y: 277 },
                { x: 232, y: 181 },
                { x: 309, y: 104 },
                { x: 405, y: 55 }
            ]
        }
    ]

}

