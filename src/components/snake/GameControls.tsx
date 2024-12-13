import React, { useEffect } from 'react';
import { Play, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useSnake } from './SnakeContext';
import { Direction } from '../../types/snake';

const GameControls = () => {
  const { state, startGame, resetGame, setDirection } = useSnake();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setDirection]);

  const handleDirectionClick = (direction: Direction) => {
    setDirection(direction);
    if (state.gameState === 'IDLE') {
      startGame();
    }
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col items-center gap-4">
        {state.gameState === 'IDLE' && (
          <button
            onClick={startGame}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
          >
            <Play className="w-6 h-6 mr-2" />
            Start Game
          </button>
        )}
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div></div>
          <button
            onClick={() => handleDirectionClick('UP')}
            className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
          <div></div>
          
          <button
            onClick={() => handleDirectionClick('LEFT')}
            className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={resetGame}
            className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleDirectionClick('RIGHT')}
            className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div></div>
          <button
            onClick={() => handleDirectionClick('DOWN')}
            className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;