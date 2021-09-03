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
function checkHit() {
	const [characterLeft,blockLeft1,blockLeft2,blockTop1,blockTop2]	= getPositionVars();
	if ((characterLeft == blockLeft1 && blockTop1 < 600 && blockTop1 > 400) || (characterLeft == blockLeft2 && blockTop2 < 600 && blockTop2 > 400)) {
		gameOver();
	}
}

function everyRound () {
	// var audio = new Audio('sounds/whoosh.wav');
	// audio.play();
	deployObstacles();
	updateScore();
	updateLevel();
}

function gameSetup() {
	if (!localStorage.getItem("highScore")) {
		localStorage.setItem("highScore", 0);
	}
	highScore = parseInt(localStorage.getItem("highScore"));
	elements.highScore.innerText = highScore;
}

const gameHelpers ={
	moveLeft:moveLeft,
	moveRight:moveRight,
	everyRound:everyRound,
	setup: gameSetup,
	checkHit:checkHit
}
