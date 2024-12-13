import { Direction, GameState, Position, SnakeState } from '../types/snake';

export const initialState: SnakeState = {
  snake: [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ],
  food: { x: 15, y: 15 },
  direction: 'RIGHT',
  gameState: 'IDLE',
  score: 0,
  level: 1,
  time: 0,
};

const generateFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

export const snakeReducer = (state: SnakeState, action: any): SnakeState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameState: 'PLAYING',
      };
    
    case 'RESET_GAME':
      return initialState;
    
    case 'MOVE_SNAKE': {
      if (state.gameState !== 'PLAYING') return state;

      const newSnake = [...state.snake];
      const head = { ...newSnake[0] };

      switch (action.payload) {
        case 'UP':
          head.y = (head.y - 1 + 20) % 20;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % 20;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + 20) % 20;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % 20;
          break;
      }

      newSnake.unshift(head);

      const ateFood = head.x === state.food.x && head.y === state.food.y;
      if (!ateFood) {
        newSnake.pop();
      }

      const collision = newSnake.slice(1).some(
        segment => segment.x === head.x && segment.y === head.y
      );

      if (collision) {
        return {
          ...state,
          gameState: 'GAME_OVER',
        };
      }

      return {
        ...state,
        snake: newSnake,
        food: ateFood ? generateFood(newSnake) : state.food,
        score: ateFood ? state.score + 10 : state.score,
        level: Math.floor(state.score / 100) + 1,
        time: state.time + 1,
      };
    }

    default:
      return state;
  }
};