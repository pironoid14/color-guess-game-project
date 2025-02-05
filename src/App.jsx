import { useState, useCallback, useEffect } from 'react'
import './App.css'

// List of colors to choose from
const COLORS = [
  'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black'
];
// Maximum attempts allowed
const MAX_ATTEMPTS = 2;

// Main App component
function App() {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [isGameOver, setIsGameOver] = useState(false);

  // Generate a new game
  const generateNewGame = useCallback(() => {
    const SORT = [...COLORS].sort(() =>  Math.random()- 0.5);
    const selected = SORT.slice(0, 9);
    const targetIndex = Math.floor(Math.random() * COLORS.length);
    setTargetColor(selected[targetIndex]);
    setOptions(selected);
    setGameStatus('');
    setAttempts(MAX_ATTEMPTS);
    setIsGameOver(false);
  }, []);
 // Handle the game over state
  const handleGameOver = () => {
    setIsGameOver(true);
    setGameStatus(`Game Over : Your Final Score: ${score}`);
  };

  // Initialize the game when the component mounts
  useEffect(() => {
    generateNewGame();
  }, [generateNewGame]);

  // Handle the user's guess
  const handleGuess = (color) => {
    if (isGameOver) return;
    if (color === targetColor) {
      setGameStatus('Correct!');
      setScore(prevScore => prevScore + 1);
      setTimeout(generateNewGame, 1500);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      
      if (newAttempts === 0) {
        handleGameOver();
      } else {
        setGameStatus(`Wrong! ${newAttempts} ${newAttempts === 1 ? 'try' : 'tries'} left`);
      }
    
    }
  };

  return (
    // Main game container
    <div className="game-container">
      <h1>Color Guessing Game</h1>

      {/* Game instructions */}
      <p data-testid="gameInstructions" className="instructions">
        Try to guess which color matches the box below! Each Guess You have {attempts} {attempts === 1 ? 'try' : 'tries'}.
      </p>
      
      {/* Color box and game status */}
      <div 
        data-testid="colorBox" 
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>
      
      <p data-testid="gameStatus" className={`game-status ${gameStatus.toLowerCase().includes('correct') ? 'correct' : 'wrong'}`}>
        {gameStatus}
      </p>
      {/* Score display */}
      <div className="score-container">
        <span>Score: </span>
        <span data-testid="score">{score}</span>
      </div>
      
      {/* Color options */}
      <div className="color-options">
        {options.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            disabled={isGameOver}
          />
        ))}
      </div>
      {/* New game button */}
      <button 
        data-testid="newGameButton"
        className="new-game-button"
        onClick={generateNewGame}
      >
        {isGameOver ? 'Try Again' : 'New Game'}
      </button>
    </div>
  );
}

export default App