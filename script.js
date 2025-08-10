const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreText = document.getElementById('score');

let playerX = 180;
let starSpeed = 3;
let score = 0;
let stars = [];
let gameOver = false;

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.floor(Math.random() * 380) + 'px';
  star.style.top = '0px';
  gameArea.appendChild(star);
  stars.push(star);
}

function moveStars() {
  stars.forEach((star, index) => {
    let y = parseInt(star.style.top);
    y += starSpeed;
    star.style.top = y + 'px';
    
    // Colisão
    const starRect = star.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    if (!(starRect.right < playerRect.left ||
          starRect.left > playerRect.right ||
          starRect.bottom < playerRect.top ||
          starRect.top > playerRect.bottom)) {
      gameOver = true;
    }
    
    // Remove estrelas que saíram da tela
    if (y > 400) {
      star.remove();
      stars.splice(index, 1);
    }
  });
}

function updateScore() {
  if (!gameOver) {
    score++;
    scoreText.textContent = Math.floor(score / 60);
  }
}

document.addEventListener('keydown', e => {
  if (gameOver) return;
  if (e.key === 'ArrowLeft' && playerX > 0) {
    playerX -= 20;
    player.style.left = playerX + 'px';
  }
  if (e.key === 'ArrowRight' && playerX < 360) {
    playerX += 20;
    player.style.left = playerX + 'px';
  }
});

function gameLoop() {
  if (gameOver) {
    alert('Game Over! Você sobreviveu ' + Math.floor(score / 60) + ' segundos.');
    window.location.reload();
    return;
  }
  
  if (Math.random() < 0.03) createStar();
  moveStars();
  updateScore();
  requestAnimationFrame(gameLoop);
}

player.style.left = playerX + 'px';
gameLoop();
