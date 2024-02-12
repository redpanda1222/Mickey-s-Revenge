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
    ],

    waves: [
        {
            time: 0,       // spawn listed enemies after this time (seconds)
            spawnrate: 10, // lower for faster spawnrate (60 = 1 second)
            skeleton: 1    // enemyType and its weight (higher weight means higher chance to spawn)
        },
        // {
        //     time: 20,
        //     spawnrate: 40,
        //     skeleton: 2, // skeleton has 2 / 4 chance to spawn
        //     bird: 1,     // bird has 1 / 4 chance to spawn
        //     huskydog: 1  // huskydog has 1 / 4 chance to spawn
        // },
        // {
        //     time: 40,
        //     spawnrate: 30, // (30 = 0.5 second, 15 = 0.25 second, etc.)
        //     skeleton: 5,   // skeleton has 5 / 11 chance to spawn
        //     bird: 2,       // bird has 2 / 11 chance to spawn
        //     huskydog: 3,
        //     skeletonmage: 1
        // },
        // {
        //     time: 70,
        //     spawnrate: 60,
        //     skeletonmage: 1
        // }
    ],

    // formations: [
    //     {
    //         spawntime: [10, 20], // at what time it spawns (in seconds)
    //         moveVector: { x: 1, y: 0 }, // the direction that each enemy below will take (null = towards mickey)
    //         despawnTime: 10, // all despawns after this time (null = no despawn)

    //         // skeleton wall
    //         skeleton: [
    //             // x and y is relative to the camera
    //             { x: 10, y: 10 },
    //             { x: 10, y: 20 },
    //             { x: 10, y: 30 },
    //             { x: 10, y: 40 },
    //             { x: 10, y: 50 },
    //         ]
    //     },
    //     {
    //         spawntime: [30],
    //         moveVector: { x: -1, y: -1 },
    //         despawnTime: 20,

    //         // dog stampede
    //         huskydog: [
    //             { x: 1000, y: 1000 },
    //             { x: 1000, y: 1010 },
    //             { x: 1000, y: 1020 },
    //             { x: 1010, y: 1000 },
    //             { x: 1020, y: 1000 },
    //             { x: 1010, y: 1010 },
    //             { x: 1020, y: 1020 },
    //             { x: 1010, y: 1020 },
    //             { x: 1020, y: 1010 },
    //         ]
    //     },
    //     {
    //         spawntime: [40],
    //         moveVector: { x: 0, y: 0 },
    //         despawnTime: 10,

    //         // skeletonmage circle
    //         skeletonmage: [
    //             { x: PARAMS.WIDTH / 2, y: 0 },
    //             { x: PARAMS.WIDTH / 2, y: PARAMS.HEIGHT },
    //             { x: 0, y: PARAMS.HEIGHT / 2 },
    //             { x: PARAMS.WIDTH, y: PARAMS.HEIGHT / 2 }
    //         ]
    //     }
    // ]

}

