import React, { useEffect, useRef } from 'react';
import { useSnake } from './SnakeContext';
import { drawGame } from '../../utils/snakeRenderer';

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = useSnake();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawGame(ctx, state);
  }, [state]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="bg-gray-900 rounded-lg mx-auto"
      />
    </div>
  );
};

export default GameBoard;