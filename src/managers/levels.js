
var levelOne = {
    music: "./audio/escape.mp3",

    // Define boundaries
    minBoundaryX: -PARAMS.WIDTH, 
    maxBoundaryX: PARAMS.WIDTH * 2, // Maximum x-coordinate allowed
    minBoundaryY: -PARAMS.HEIGHT * 2,
    maxBoundaryY: PARAMS.HEIGHT * 2, // Maximum y-coordinate allowed

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

    verticalbarbedwires: [
        { x: 200, y: 300 },
        { x: -76, y: -612 },
        { x: -663, y: 762 },
    ],

    deadbodies: [
        { x: 600, y: 102 },
        { x: -856, y: -936 },
        { x: -925, y: -184 },
        { x: -241, y: 1168 },
        { x: -673, y: 1500 },
        { x: 1443, y: 532 },
        { x: 1550, y: -600 },
        { x: 384, y: -928 },
        { x: -100, y: 548 },
        { x: 536, y: 672 },
        { x: -240, y: -64 },
        { x: -887, y: 462 },
        { x: 1500, y: -1114 },
    ],

    deadtrees: [
        { x: 410, y: 222 },
        { x: -1000, y: -1080 },
        { x: 936, y: 1016 },
        { x: -292, y: 1359 },
        { x: -736, y: 932 },
        { x: -524, y: 184 },
        { x: 477, y: 1170 },
        { x: -59, y: 846 },
        { x: 984, y: -68 },
        { x: 718, y: -495 },
        { x: 1118, y: 6 },
        { x: 326, y: -607 },
    ],

    emptybarrels: [
        { x: 283, y: 602 },
        { x: -308, y: 1115 },
        { x: -144, y: 1119 },
        { x: 1096, y: -828 },
        { x: 1580, y: -56 },
        { x: 1130, y: 758 },
    ],

    deserttowers: [
        { x: 100, y: 100 },
        { x: -780, y: -744 },
        { x: -460, y: 1280 },
        { x: 638, y: 1166 },
    ],

    destroyeddeserttowers: [
        { x: 500, y: 400 },
        { x: -624, y: 184 },
        { x: 689, y: -502 },
    ],

    walmartstonehenges: [
        { x: 220, y: 313 },
        { x: 1307, y: -292 },
        { x: 1373, y: 1142 },
    ],

    waterTexture: [
        { x: 1950, y: -1680 },
        { x: 2380, y: -1680 },
    ],

    waves: [
        {
            time: 0,       // spawn listed enemies after this time (seconds)
            spawnrate: 60, // lower for faster spawnrate (60 = 1 second, 30 = 0.5 second, 15 = 0.25 second, etc.)
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
            spawnrate: 30, 
            skeleton: 5,
            bird: 2,
            huskydog: 3,
            skeletonmage: 1
        },
        {
            time: 80,
            spawnrate: 70,
            skeletonmage: 1,
            spider: 3
        },
        {
            time: 100,
            spawnrate: 70,
            spider: 5,
            bird: 2,
            huskydog: 3,
            bat: 2
        },
        {
            time: 120,
            spawnrate: 80,
            rat: 5,
            bird: 2,
            huskydog: 3,
            bat: 2
        },
        {
            time: 140,
            spawnrate: 90,
            spider: 2,
            bird: 2,
            rat: 4,
            bat: 5,
            goblin: 1
        },
        {
            time: 160,
            spawnrate: 90,
            skeletonmage: 2,
            rat: 3,
            bat: 5,
            goblin: 4,
            spider: 1,
            bird: 2,
            huskydog: 1,
        },
        {
            time: 170,
            spawnrate: 90,
            skeletonmage: 2,
            rat: 3,
            bat: 1,
            goblin: 5,
            spider: 5,
            bird: 2,
            huskydog: 1,
        },
        {
            time: 180,
            spawnrate: 90,
            skeletonmage: 4,
            rat: 3,
            bat: 5,
            goblin: 4,
            spider: 2,
            bird: 5,
            huskydog: 1,
        },
        {
            time: 190,
            spawnrate: 100,
            spider: 5,
            bird: 2,
            huskydog: 3,
            bat: 2
        },
        {
            time: 200,
            spawnrate: 110,
            spider: 2,
            bird: 2,
            rat: 4,
            bat: 5,
            goblin: 5
        },
        {
            time: 210,
            spawnrate: 110,
            spider: 2,
            bird: 2,
            rat: 4,
            bat: 5,
            goblin: 5
        },
        {
            time: 220,
            spawnrate: 90,
            skeletonmage: 4,
            rat: 3,
            bat: 5,
            goblin: 4,
            spider: 2,
            bird: 3,
            huskydog: 2,
        },
        {
            time: 230,
            spawnrate: 90,
            skeletonmage: 4,
            rat: 3,
            bat: 5,
            goblin: 4,
            spider: 2,
            bird: 3,
            huskydog: 2,
        },
        {
            time: 240,
            spawnrate: 90,
            skeletonmage: 5,
            rat: 3,
            bat: 5,
            goblin: 4,
            spider: 2,
            bird: 3,
            huskydog: 2,
        },
        {
            time: 260,
            spawnrate: 100,
            skeletonmage: 5,
            rat: 3,
            bat: 5,
            goblin: 4,
            spider: 2,
            bird: 3,
            huskydog: 2,
        },
        {
            time: 260,
            spawnrate: 100,
            skeletonmage: 5,
            rat: 1,
            bat: 1,
            goblin: 1,
            spider: 1,
            bird: 3,
            huskydog: 1,
        },
        {
            time: 280,
            spawnrate: 100,
            huskydog: 1
        },
        {
            time: 280,
            spawnrate: 100,
            huskydog: 1,
            skeletonmage: 5,
            bird: 3,
        },
        {
            time: 290,
            spawnrate: 100,
            skeletonmage: 5,
            rat: 1,
            bat: 1,
            goblin: 1,
            spider: 1,
            bird: 3,
            huskydog: 1,
        },
        {
            time: 300,
            spawnrate: 100,
            skeleton: 1
        },
    ],

    formations: [
        {
            spawntime: [20, 60, 90, 120, 180, 360, 390, 410, 440], // when to spawn
            moveVector: { x: 1, y: 0 }, // how formation moves (null = to mickey)
            despawnTime: 10, // when to despawn (null = no despawn)

            // skeleton wall moving right
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
            spawntime: [60, 90, 360, 400],
            moveVector: { x: -1, y: 0 },
            despawnTime: 10,

            // skeleton wall moving left
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
            spawntime: [60, 100, 180, 200, 240, 300, 410],
            moveVector: { x: 0, y: -1 },
            despawnTime: 10,

            // skeleton wall moving up
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
            spawntime: [110, 150, 190, 210, 230, 250, 270, 310, 410, 510],
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
        },
        {
            spawntime: [40, 140, 240, 340, 440, 540],
            moveVector: { x: -1, y: -1 },
            despawnTime: 10,

            // dog pack moving up-left 
            huskydog: [
                { x: PARAMS.WIDTH + 5    , y: PARAMS.HEIGHT + 5 },
                { x: PARAMS.WIDTH + 5 * 2, y: PARAMS.HEIGHT + 5 },
                { x: PARAMS.WIDTH + 5 * 3, y: PARAMS.HEIGHT + 5 },
                { x: PARAMS.WIDTH + 5 * 4, y: PARAMS.HEIGHT + 5 },
                { x: PARAMS.WIDTH + 5    , y: PARAMS.HEIGHT + 5 * 2 },
                { x: PARAMS.WIDTH + 5 * 2, y: PARAMS.HEIGHT + 5 * 2 },
                { x: PARAMS.WIDTH + 5 * 3, y: PARAMS.HEIGHT + 5 * 2 },
                { x: PARAMS.WIDTH + 5 * 4, y: PARAMS.HEIGHT + 5 * 2 },
                { x: PARAMS.WIDTH + 5    , y: PARAMS.HEIGHT + 5 * 3 },
                { x: PARAMS.WIDTH + 5 * 2, y: PARAMS.HEIGHT + 5 * 3 },
                { x: PARAMS.WIDTH + 5 * 3, y: PARAMS.HEIGHT + 5 * 3 },
                { x: PARAMS.WIDTH + 5 * 4, y: PARAMS.HEIGHT + 5 * 3 },
                { x: PARAMS.WIDTH + 5    , y: PARAMS.HEIGHT + 5 * 4 },
                { x: PARAMS.WIDTH + 5 * 2, y: PARAMS.HEIGHT + 5 * 4 },
                { x: PARAMS.WIDTH + 5 * 3, y: PARAMS.HEIGHT + 5 * 4 },
                { x: PARAMS.WIDTH + 5 * 4, y: PARAMS.HEIGHT + 5 * 4 }
            ]
        },
        {
            spawntime: [50, 150, 350, 550],
            moveVector: { x: 1, y: 1 },
            despawnTime: 10,

            // dog pack moving up-left 
            huskydog: [
                { x: -5    , y: -5 },
                { x: -5 * 2, y: -5 },
                { x: -5 * 3, y: -5 },
                { x: -5 * 4, y: -5 },
                { x: -5    , y: -5 * 2 },
                { x: -5 * 2, y: -5 * 2 },
                { x: -5 * 3, y: -5 * 2 },
                { x: -5 * 4, y: -5 * 2 },
                { x: -5    , y: -5 * 3 },
                { x: -5 * 2, y: -5 * 3 },
                { x: -5 * 3, y: -5 * 3 },
                { x: -5 * 4, y: -5 * 3 },
                { x: -5    , y: -5 * 4 },
                { x: -5 * 2, y: -5 * 4 },
                { x: -5 * 3, y: -5 * 4 },
                { x: -5 * 4, y: -5 * 4 }
            ]
        },
        {
            spawntime: [150, 170, 200, 250, 350, 550],
            moveVector: { x: -1.5, y: -2 },
            despawnTime: 10,

            // dog pack moving up-left 
            huskydog: [
                { x: PARAMS.WIDTH + 5    , y: PARAMS.HEIGHT + 5 },
                { x: PARAMS.WIDTH + 5 * 2, y: PARAMS.HEIGHT + 5 },
                { x: PARAMS.WIDTH + 5 * 3, y: PARAMS.HEIGHT + 5 },
                { x: PARAMS.WIDTH + 5 * 4, y: PARAMS.HEIGHT + 5 },
                { x: PARAMS.WIDTH + 5    , y: PARAMS.HEIGHT + 5 * 2 },
                { x: PARAMS.WIDTH + 5 * 2, y: PARAMS.HEIGHT + 5 * 2 },
                { x: PARAMS.WIDTH + 5 * 3, y: PARAMS.HEIGHT + 5 * 2 },
                { x: PARAMS.WIDTH + 5 * 4, y: PARAMS.HEIGHT + 5 * 2 },
                { x: PARAMS.WIDTH + 5    , y: PARAMS.HEIGHT + 5 * 3 },
                { x: PARAMS.WIDTH + 5 * 2, y: PARAMS.HEIGHT + 5 * 3 },
                { x: PARAMS.WIDTH + 5 * 3, y: PARAMS.HEIGHT + 5 * 3 },
                { x: PARAMS.WIDTH + 5 * 4, y: PARAMS.HEIGHT + 5 * 3 },
                { x: PARAMS.WIDTH + 5    , y: PARAMS.HEIGHT + 5 * 4 },
                { x: PARAMS.WIDTH + 5 * 2, y: PARAMS.HEIGHT + 5 * 4 },
                { x: PARAMS.WIDTH + 5 * 3, y: PARAMS.HEIGHT + 5 * 4 },
                { x: PARAMS.WIDTH + 5 * 4, y: PARAMS.HEIGHT + 5 * 4 }
            ]
        },
        {
            spawntime: [150, 200, 240, 270, 300, 390, 590],
            moveVector: { x: 1.5, y: 2 },
            despawnTime: 10,

            // dog pack moving up-left 
            huskydog: [
                { x: -5    , y: -5 },
                { x: -5 * 2, y: -5 },
                { x: -5 * 3, y: -5 },
                { x: -5 * 4, y: -5 },
                { x: -5    , y: -5 * 2 },
                { x: -5 * 2, y: -5 * 2 },
                { x: -5 * 3, y: -5 * 2 },
                { x: -5 * 4, y: -5 * 2 },
                { x: -5    , y: -5 * 3 },
                { x: -5 * 2, y: -5 * 3 },
                { x: -5 * 3, y: -5 * 3 },
                { x: -5 * 4, y: -5 * 3 },
                { x: -5    , y: -5 * 4 },
                { x: -5 * 2, y: -5 * 4 },
                { x: -5 * 3, y: -5 * 4 },
                { x: -5 * 4, y: -5 * 4 }
            ]
        }
    ]

};

// horizontal barbed wires
for (let i = 0; i < 36; i++) {
    levelOne.barbedwires.push({x: -1000 + 83 * i, y: -PARAMS.HEIGHT * 2});
    levelOne.barbedwires.push({x: -1000 + 83 * i, y: 1560});
}

for (let i = 0; i < 38; i++) {
    levelOne.verticalbarbedwires.push({x: -1000, y: -PARAMS.HEIGHT * 2 + 20 + 83 * i});
    //levelOne.verticalbarbedwires.push({x: 1025, y: -970 + 83 * i});
}

// water boundary
for (let i = 0; i <= 6; i++) {
    levelOne.waterTexture.push({x: 1950, y: -1230 + (450 * i)});
    levelOne.waterTexture.push({x: 2380, y: -1230 + (450 * i)});
}
