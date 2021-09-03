// Game Vars
let score = 0;
let highScore;
const GAME_WIDTH = 900, BLOCK_WIDTH = 300, GAME_HEIGHT = 500;

// DOM elements
const elements = {
	character: document.getElementById("character"),
	blocks: Array.from(document.getElementsByClassName("blocks")),
	score: document.getElementById("score"),
	level: document.getElementById("level"),
	highScore: document.getElementById("highscore")
}

// Game Setup
gameHelpers.setup();

// MOVEMENT
document.addEventListener("keydown", event => {
	if (event.key === "ArrowLeft") { gameHelpers.moveLeft(); }
	if (event.key === "ArrowRight") { gameHelpers.moveRight(); }
});
// Touch action for mobile instead of arrow keys
document.getElementById("right").addEventListener("touchstart", moveRight);
document.getElementById("left").addEventListener("touchstart", moveLeft);

// EVERY ROUND 
elements.blocks[0].addEventListener('animationiteration',gameHelpers.everyRound);

// CORE GAME LOGIC
setInterval(gameHelpers.checkHit, 1);
