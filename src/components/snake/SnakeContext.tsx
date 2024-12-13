import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { Direction, GameState, SnakeState } from '../../types/snake';
import { initialState, snakeReducer } from '../../utils/snakeReducer';

const SnakeContext = createContext<{
  state: SnakeState;
  dispatch: React.Dispatch<any>;
  setDirection: (direction: Direction) => void;
  startGame: () => void;
  resetGame: () => void;
} | null>(null);

export const SnakeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(snakeReducer, initialState);
  const gameLoopRef = useRef<number>();
  const currentDirection = useRef<Direction>(state.direction);

  const moveSnake = useCallback(() => {
    dispatch({ type: 'MOVE_SNAKE', payload: currentDirection.current });
  }, []);

  const setDirection = useCallback((newDirection: Direction) => {
    const oppositeDirections = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    // Prevent moving in opposite direction
    if (oppositeDirections[newDirection] !== currentDirection.current) {
      currentDirection.current = newDirection;
    }
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
    currentDirection.current = 'RIGHT';
  }, []);

  useEffect(() => {
    const gameLoop = () => {
      if (state.gameState === 'PLAYING') {
        moveSnake();
        const speed = Math.max(150 - state.level * 10, 50); // Speed increases with level
        gameLoopRef.current = window.setTimeout(gameLoop, speed);
      }
    };

    if (state.gameState === 'PLAYING') {
      gameLoop();
    }

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [state.gameState, state.level, moveSnake]);

  return (
    <SnakeContext.Provider value={{ state, dispatch, setDirection, startGame, resetGame }}>
      {children}
    </SnakeContext.Provider>
  );
};

export const useSnake = () => {
  const context = useContext(SnakeContext);
  if (!context) {
    throw new Error('useSnake must be used within a SnakeProvider');
  }
  return context;
};