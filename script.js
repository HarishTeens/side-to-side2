// DOM elements
const elements={
	character:document.getElementById("character"),
	block:document.getElementById("block"),
	score: document.getElementById("score")
}

// Game Vars
let score = 0;

// MOVEMENT
document.addEventListener("keydown", event => {
  if(event.key==="ArrowLeft"){moveLeft();}
  if(event.key==="ArrowRight"){moveRight();}
});
// Touch action for mobile instead of arrow keys
document.getElementById("right").addEventListener("touchstart", moveRight);
document.getElementById("left").addEventListener("touchstart", moveLeft);

elements.block.addEventListener('animationiteration', () => {
    let random = Math.floor(Math.random() * 3);
    left = random * 100;
    elements.block.style.left = left + "px";
    updateScore();
});

// Core game logic to check hit
setInterval(function(){
    const characterLeft = parseInt(window.getComputedStyle(elements.character).getPropertyValue("left"));
    const blockLeft = parseInt(window.getComputedStyle(elements.block).getPropertyValue("left"));
    const blockTop = parseInt(window.getComputedStyle(elements.block).getPropertyValue("top"));
    if(characterLeft==blockLeft && blockTop<500 && blockTop>300){
        alert("Game over. Score: " + score);
        elements.block.style.animation = "none";
		// make a reset game function to do all the reset operations there
    }
},1);

// GAME FUNCTIONS
function moveLeft(){
    let left = parseInt(window.getComputedStyle(elements.character).getPropertyValue("left"));
    left -= 100;
    if(left>=0){
        elements.character.style.left = left + "px";
    }
}
function moveRight(){
    let left = parseInt(window.getComputedStyle(elements.character).getPropertyValue("left"));
    left += 100;
    if(left<300){
        elements.character.style.left = left + "px";
    }
}
function updateScore(){
	score=score+1;
	elements.score.innerText=score;
}