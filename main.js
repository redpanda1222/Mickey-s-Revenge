const ASSET_MANAGER = new AssetManager();
const gameEngine = new GameEngine();

const imageQueue = [
	"./sand.png",
	"./sandtile.png"
];

for (let i = 0; i < imageQueue.length; i++) {
	ASSET_MANAGER.queueDownload(imageQueue[i]);
}

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});
