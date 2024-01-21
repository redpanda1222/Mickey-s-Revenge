const ASSET_MANAGER = new AssetManager();
const gameEngine = new GameEngine();

const imageQueue = [
	"./assets/background/sand.png",
	"./assets/background/sandtile.png",
	"./assets/background/barbedwire.png",
	"./assets/background/deadbodies.png",
	"./assets/background/deadtree.png",
	"./assets/background/desertsand.png",
	"./assets/background/deserttower.png",
	"./assets/background/destroyedDesertTower.png",
	"./assets/background/emptybarrel.png",
	"./assets/background/jungleRuin.png",
	"./assets/background/walmartStoneHenge.png",
	"./assets/attack/Fireball.png",
	"./assets/attack/fireslash.png",
	"./assets/character/mickeymouse.png",
	"./assets/enemy/bird.png",
	"./assets/enemy/huskydog.png",
	"./assets/enemy/skeleton.png",
	"./assets/enemy/skeletonknight.png",
	"./assets/enemy/skeletonmage.png",
	"./assets/miscellaneous/gems.png"
];

for (let i = 0; i < imageQueue.length; i++) {
	ASSET_MANAGER.queueDownload(imageQueue[i]);
}

ASSET_MANAGER.queueDownload("./bird.png");
ASSET_MANAGER.queueDownload("./huskydog.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
