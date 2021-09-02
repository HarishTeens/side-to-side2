// Game Vars
let score = 0;
let highScore;

// DOM elements
const elements = {
	character: document.getElementById("character"),
	block: document.getElementById("block"),
	score: document.getElementById("score"),
	level: document.getElementById("level"),
	highScore: document.getElementById("highscore")
}

// Game Setup
function gameSetup(){
	if (!localStorage.getItem("highScore")) {
		localStorage.setItem("highScore", 0);
	}
	highScore=parseInt(localStorage.getItem("highScore"));
	elements.highScore.innerText=highScore;
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

elements.block.addEventListener('animationiteration', () => {
	deployObstacle();
	updateScore();
	updateLevel();
});

// Core game logic to check hit
setInterval(function () {
	const characterLeft = parseInt(window.getComputedStyle(elements.character).getPropertyValue("left"));
	const blockLeft = parseInt(window.getComputedStyle(elements.block).getPropertyValue("left"));
	const blockTop = parseInt(window.getComputedStyle(elements.block).getPropertyValue("top"));
	if (characterLeft == blockLeft && blockTop < 500 && blockTop > 300) {
		gameOver();
	}
}, 1);

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
function gameOver(){
	alert("Game over. Score: " + score);
	elements.block.style.animation = "none";
	if(score>parseInt(localStorage.getItem("highScore")))
		localStorage.setItem("highScore",score)
	elements.highScore.innerText=localStorage.getItem("highScore")
}

function deployObstacle() {
	let random = Math.floor(Math.random() * 3);
	left = random * 300;
	elements.block.style.left = left + "px";
}
function updateScore() {
	score = score + 1;
	elements.score.innerText = score;
}
function updateLevel() {
	const level = Math.floor(score/10);
	const levelFactor = (level/10+1).toFixed(1);	
	//Increase game speed according to score
	elements.block.getAnimations()[0].playbackRate=levelFactor
	elements.level.innerText=level;
}