// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let gameRunning = false;
let playerScore = 0;
let computerScore = 0;

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 80;
const paddleSpeed = 6;

// Player paddle (left)
const playerPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    draw() {
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
        ctx.shadowBlur = 10;
    },
    update() {
        this.y += this.dy;
        
        // Wall collision
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }
};

// Computer paddle (right)
const computerPaddle = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    draw() {
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        ctx.shadowBlur = 10;
    },
    update() {
        this.y += this.dy;
        
        // Wall collision
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }
};

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 6,
    dx: 5,
    dy: 5,
    speed: 5,
    draw() {
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = 'rgba(255, 255, 0, 0.8)';
        ctx.shadowBlur = 15;
    },
    update() {
        this.x += this.dx;
        this.y += this.dy;
        
        // Top and bottom wall collision
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.dy = -this.dy;
            this.y = this.y - this.radius < 0 ? this.radius : canvas.height - this.radius;
        }
        
        // Paddle collision
        if (
            this.x - this.radius < playerPaddle.x + playerPaddle.width &&
            this.y > playerPaddle.y &&
            this.y < playerPaddle.y + playerPaddle.height
        ) {
            this.dx = Math.abs(this.dx);
            this.x = playerPaddle.x + playerPaddle.width + this.radius;
            
            // Add spin based on paddle position
            const deltaY = this.y - (playerPaddle.y + playerPaddle.height / 2);
            this.dy += deltaY * 0.05;
        }
        
        // Computer paddle collision
        if (
            this.x + this.radius > computerPaddle.x &&
            this.y > computerPaddle.y &&
            this.y < computerPaddle.y + computerPaddle.height
        ) {
            this.dx = -Math.abs(this.dx);
            this.x = computerPaddle.x - this.radius;
            
            // Add spin based on paddle position
            const deltaY = this.y - (computerPaddle.y + computerPaddle.height / 2);
            this.dy += deltaY * 0.05;
        }
        
        // Scoring
        if (this.x - this.radius < 0) {
            computerScore++;
            updateScore();
            resetBall();
        }
        
        if (this.x + this.radius > canvas.width) {
            playerScore++;
            updateScore();
            resetBall();
        }
    }
};

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.dy = (Math.random() - 0.5) * 8;
}

// Update score display
function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Computer AI
function computerAI() {
    const computerCenter = computerPaddle.y + computerPaddle.height / 2;
    const difficulty = 3; // Difficulty multiplier
    
    if (computerCenter < ball.y - 35) {
        computerPaddle.dy = paddleSpeed * difficulty;
    } else if (computerCenter > ball.y + 35) {
        computerPaddle.dy = -paddleSpeed * difficulty;
    } else {
        computerPaddle.dy = 0;
    }
}

// Draw center line
function drawCenterLine() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([5, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = 'transparent';
    
    if (gameRunning) {
        // Update
        playerPaddle.update();
        computerPaddle.update();
        ball.update();
        computerAI();
        
        // Draw center line
        drawCenterLine();
        
        // Draw game objects
        playerPaddle.draw();
        computerPaddle.draw();
        ball.draw();
        
        // Update game status
        document.getElementById('gameStatus').textContent = 'Game Running';
    } else {
        ctx.fillStyle = '#ffff00';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
        document.getElementById('gameStatus').textContent = 'Click Canvas to Start';
        
        // Draw center line
        drawCenterLine();
        
        // Draw paddles and ball at start
        playerPaddle.draw();
        computerPaddle.draw();
        ball.draw();
    }
    
    requestAnimationFrame(gameLoop);
}

// Mouse control
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Smoothly move paddle towards mouse position
    const paddleCenter = playerPaddle.y + playerPaddle.height / 2;
    if (mouseY < paddleCenter - 5) {
        playerPaddle.dy = -paddleSpeed;
    } else if (mouseY > paddleCenter + 5) {
        playerPaddle.dy = paddleSpeed;
    } else {
        playerPaddle.dy = 0;
    }
});

// Keyboard control
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Update player paddle with keyboard
function updatePlayerPaddleWithKeyboard() {
    if (keys['ArrowUp']) {
        playerPaddle.dy = -paddleSpeed;
    } else if (keys['ArrowDown']) {
        playerPaddle.dy = paddleSpeed;
    } else {
        playerPaddle.dy = 0;
    }
}

// Start game on click
canvas.addEventListener('click', () => {
    gameRunning = !gameRunning;
    if (gameRunning) {
        resetBall();
    }
});

// Update loop for keyboard input
setInterval(() => {
    updatePlayerPaddleWithKeyboard();
}, 1000 / 60); // 60 FPS

// Start game loop
gameLoop();
