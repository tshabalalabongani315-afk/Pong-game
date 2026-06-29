# 🎮 Pong Game

A classic Pong game built with HTML5, CSS3, and JavaScript. Play against an intelligent computer opponent in this retro arcade experience with modern neon aesthetics.

## 🚀 Features

- **Player vs Computer**: Control your paddle against an AI-powered opponent
- **Dual Control Methods**: Use your mouse or arrow keys to control the left paddle
- **Bouncing Ball Physics**: Realistic ball movement with collision detection
- **Paddle Spin System**: Hit the ball at different paddle positions to add spin
- **Live Scoreboard**: Real-time score tracking for both players
- **Wall Collision Detection**: Ball bounces realistically off top and bottom walls
- **Neon Visual Theme**: Beautiful glowing effects and smooth animations
- **Start/Pause**: Click the canvas anytime to start or pause the game

## 🎯 How to Play

1. Open `index.html` in your web browser
2. Click on the game canvas to start
3. Move your paddle using:
   - **Mouse**: Position your mouse to move the paddle vertically
   - **Arrow Keys**: Press Up/Down arrows to control the paddle
4. Bounce the ball past the computer opponent to score
5. First to reach the target score wins!

## 🕹️ Controls

| Action | Control |
|--------|---------|
| Move Paddle Up | Mouse Up / Arrow Up |
| Move Paddle Down | Mouse Down / Arrow Down |
| Start/Pause Game | Click Canvas |

## 🎨 Game Elements

- **Green Paddle (Left)**: Your paddle - controlled by mouse or arrow keys
- **Cyan Paddle (Right)**: Computer's paddle - AI-controlled
- **Yellow Ball**: The game ball that bounces around the field
- **Dashed Center Line**: Visual center divider
- **Blue Background**: Dynamic gradient background

## 📊 Scoring

- Score 1 point when the ball passes your opponent
- The computer scores when the ball passes you
- Score is displayed in real-time above the game canvas

## 💻 Technical Details

### Technologies Used
- **HTML5**: Canvas API for rendering
- **CSS3**: Gradients, animations, and visual effects
- **JavaScript (Vanilla)**: Game logic and physics

### Game Mechanics
- **Ball Speed**: Increases slightly with each paddle hit
- **Paddle Speed**: Responsive to user input with smooth movement
- **AI Difficulty**: Computer difficulty can be adjusted by modifying the `difficulty` variable
- **Collision Detection**: Precise rectangular and circular collision detection
- **Frame Rate**: Optimized for 60 FPS gameplay

### File Structure
```
├── index.html       # Main HTML file with canvas
├── style.css        # Styling and animations
├── script.js        # Game logic and physics
└── README.md        # This file
```

## 🔧 Customization

### Adjust Difficulty
Open `script.js` and modify the `difficulty` variable in the `computerAI()` function:
```javascript
const difficulty = 3; // Change this value (higher = harder)
```

### Change Game Speed
Modify the ball's `speed` property:
```javascript
speed: 5, // Increase for faster gameplay
```

### Change Canvas Size
Edit the canvas dimensions in `index.html`:
```html
<canvas id="gameCanvas" width="800" height="400"></canvas>
```

Then adjust the game center calculations in `script.js` if needed.

## 🎮 Game Tips

- **Strategy**: Aim for the edges of the paddle to add spin to the ball
- **Positioning**: Try to hit the ball when your paddle is near its center for better control
- **Timing**: Watch the ball's trajectory and position your paddle accordingly
- **Speed Control**: The ball gains speed as rallies continue, so stay alert!

## 📝 License

This project is open source and available for personal and educational use.

## 🙋 Support

If you encounter any issues:
1. Make sure you're using a modern web browser (Chrome, Firefox, Safari, Edge)
2. Check the browser console (F12) for any error messages
3. Ensure all three files (HTML, CSS, JS) are in the same directory

## 🚀 Future Enhancements

Possible improvements for the game:
- [ ] Sound effects
- [ ] Difficulty levels selector
- [ ] Two-player local multiplayer mode
- [ ] High score tracking with localStorage
- [ ] Ball trail visual effects
- [ ] Multiple ball modes
- [ ] Power-ups system
- [ ] Mobile touch controls

---

**Enjoy the game! 🎉**
