const ASSET_MANAGER = new AssetManager();
const gameEngine = new GameEngine();

const imageQueue = [
	"./assets/background/sand.png",
	"./assets/background/sandtile.png",
	"./assets/background/barbedwire1.png",
	"./assets/background/deadbodies1.png",
	"./assets/background/deadtree.png",
	"./assets/background/desertsand.png",
	"./assets/background/deserttower.png",
	"./assets/background/destroyedDesertTower.png",
	"./assets/background/emptybarrel1.png",
	"./assets/background/jungleRuin.png",
	"./assets/background/walmartStoneHenge.png",
	"./assets/attack/Fireball.png",
	"./assets/attack/fireslash.png",
	"./assets/character/mickeymouse.png",
	"./assets/enemy/bird.png",
	"./assets/enemy/huskydog.png",
	"./assets/enemy/bird1.png",
	"./assets/enemy/huskydog1.png",
	"./assets/enemy/skeleton.png",
	"./assets/enemy/skeletonknight.png",
	"./assets/enemy/skeletonmage.png",
	"./assets/miscellaneous/gems.png",
	"./assets/attack/fireslash.png",
	"./assets/attack/fireslash2.png",
	"./assets/attack/redfireslash.png",
	"./assets/attack/redfireslash2.png",
	"./assets/attack/bluefireslash.png",
	"./assets/attack/bluefireslash2.png",
	"./assets/attack/purplefireslash.png",
	"./assets/attack/purplefireslash2.png",
	"./assets/attack/Fireball.png",
	"./assets/attack/firebreath.png",
	"./assets/attack/firebreath2.png",
	"./assets/attack/blast.png",
	"./assets/attack/red.png",
	"./assets/attack/shockwave.png",
	"./assets/attack/lasers.png",
	"./audio/kitchen.mp3",
	"./audio/escape.mp3",
	"./audio/hurt.mp3"
];

for (let i = 0; i < imageQueue.length; i++) {
	ASSET_MANAGER.queueDownload(imageQueue[i]);
}

// https://www.fontspace.com/darkmode-font-f73936
var titleFont = new FontFace('titleFont', 'url(./assets/fonts/cusfont.ttf)');
titleFont.load().then(function(font) {
	document.fonts.add(font);
});

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
