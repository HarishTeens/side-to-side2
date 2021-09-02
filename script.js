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
function gameSetup() {
	if (!localStorage.getItem("highScore")) {
		localStorage.setItem("highScore", 0);
	}
	highScore = parseInt(localStorage.getItem("highScore"));
	elements.highScore.innerText = highScore;
}
gameSetup();

// MOVEMENT
document.addEventListener("keydown", event => {
	if (event.key === "ArrowLeft") { moveLeft(); }
	if (event.key === "ArrowRight") { moveRight(); }
});

// Touch action for mobile instead of arrow keys
document.getElementById("right").addEventListener("touchstart", moveRight);
document.getElementById("left").addEventListener("touchstart", moveLeft);

elements.blocks[0].addEventListener('animationiteration', () => {
	deployObstacles();
	updateScore();
	updateLevel();
});

// Core game logic to check hit
setInterval(checkHit, 1);

// GAME FUNCTIONS
function moveLeft() {
	let left = parseInt(window.getComputedStyle(elements.character).getPropertyValue("left"));
	left -= 300;
	if (left >= 0) {
		elements.character.style.left = left + "px";
	}
}
function moveRight() {
	let left = parseInt(window.getComputedStyle(elements.character).getPropertyValue("left"));
	left += 300;
	if (left < 900) {
		elements.character.style.left = left + "px";
	}
}
function gameOver() {
	alert("Game over. Score: " + score);
	elements.blocks[0].style.animation = "none";
	elements.blocks[1].style.animation = "none";
	if (score > parseInt(localStorage.getItem("highScore")))
		localStorage.setItem("highScore", score)
	elements.highScore.innerText = localStorage.getItem("highScore")
}

function checkHit() {
	const characterLeft = parseInt(window.getComputedStyle(elements.character).getPropertyValue("left"));
	const blockLeft1 = parseInt(window.getComputedStyle(elements.blocks[0]).getPropertyValue("left"));
	const blockLeft2 = parseInt(window.getComputedStyle(elements.blocks[1]).getPropertyValue("left"))+BLOCK_WIDTH;
	const blockTop1 = parseInt(window.getComputedStyle(elements.blocks[0]).getPropertyValue("top"));
	const blockTop2 = parseInt(window.getComputedStyle(elements.blocks[1]).getPropertyValue("top"));	
	if ((characterLeft == blockLeft1 && blockTop1 < 500 && blockTop1 > 300) || (characterLeft == blockLeft2 && blockTop2 < 500 && blockTop2 > 300)) {
		console.log(blockLeft1,blockLeft2,characterLeft);
		gameOver();
	}
}

function deployObstacles() {
	const randomOffset= Math.floor(Math.random() * 3) ;
	const offsets=[[0,0],[BLOCK_WIDTH,BLOCK_WIDTH],[0,BLOCK_WIDTH]];
	const leftOffset1=offsets[randomOffset][0];
	const leftOffset2=offsets[randomOffset][1];
	elements.blocks[0].style.left = leftOffset1 + "px";
	elements.blocks[1].style.left = leftOffset2 + "px";
}
function updateScore() {
	score = score + 1;
	elements.score.innerText = score;
}
function updateLevel() {
	const level = Math.floor(score / 10);
	const levelFactor = (level / 10 + 1).toFixed(1);
	//Increase game speed according to score
	elements.blocks[0].getAnimations()[0].playbackRate = levelFactor
	elements.blocks[1].getAnimations()[0].playbackRate = levelFactor
	elements.level.innerText = level;
}