import { TetrisState, TetrominoType, TETROMINO_SHAPES } from '../types/tetris';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export const initialState: TetrisState = {
  board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
  currentPiece: {
    type: 'T',
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    rotation: 0,
  },
  nextPiece: 'I',
  score: 0,
  level: 1,
  lines: 0,
  gameState: 'IDLE',
};

const getRandomTetromino = (): TetrominoType => {
  const pieces: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return pieces[Math.floor(Math.random() * pieces.length)];
};

const checkCollision = (board: (TetrominoType | null)[][], piece: TetrominoType, x: number, y: number, rotation: number): boolean => {
  const shape = TETROMINO_SHAPES[piece][rotation % TETROMINO_SHAPES[piece].length];
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newX = x + col;
        const newY = y + row;
        
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX] !== null)
        ) {
          return true;
        }
      }
    }
  }
  
  return false;
};

const mergePieceToBoard = (state: TetrisState): TetrisState => {
  const newBoard = state.board.map(row => [...row]);
  const shape = TETROMINO_SHAPES[state.currentPiece.type][state.currentPiece.rotation % TETROMINO_SHAPES[state.currentPiece.type].length];
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const newY = state.currentPiece.position.y + row;
        const newX = state.currentPiece.position.x + col;
        if (newY >= 0) {
          newBoard[newY][newX] = state.currentPiece.type;
        }
      }
    }
  }

  return {
    ...state,
    board: newBoard,
    currentPiece: {
      type: state.nextPiece,
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
      rotation: 0,
    },
    nextPiece: getRandomTetromino(),
  };
};

const clearLines = (state: TetrisState): TetrisState => {
  const newBoard = state.board.filter(row => row.some(cell => cell === null));
  const clearedLines = BOARD_HEIGHT - newBoard.length;
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }

  if (clearedLines === 0) return state;

  const points = [0, 100, 300, 500, 800][clearedLines];
  return {
    ...state,
    board: newBoard,
    score: state.score + points * state.level,
    lines: state.lines + clearedLines,
    level: Math.floor(state.lines / 10) + 1,
  };
};

export const tetrisReducer = (state: TetrisState, action: any): TetrisState => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        gameState: 'PLAYING',
        nextPiece: getRandomTetromino(),
      };

    case 'PAUSE_GAME':
      return {
        ...state,
        gameState: state.gameState === 'PLAYING' ? 'PAUSED' : 'PLAYING',
      };

    case 'RESET_GAME':
      return initialState;

    case 'MOVE_LEFT': {
      if (state.gameState !== 'PLAYING') return state;
      const newX = state.currentPiece.position.x - 1;
      if (!checkCollision(state.board, state.currentPiece.type, newX, state.currentPiece.position.y, state.currentPiece.rotation)) {
        return {
          ...state,
          currentPiece: {
            ...state.currentPiece,
            position: { ...state.currentPiece.position, x: newX },
          },
        };
      }
      return state;
    }

    case 'MOVE_RIGHT': {
      if (state.gameState !== 'PLAYING') return state;
      const newX = state.currentPiece.position.x + 1;
      if (!checkCollision(state.board, state.currentPiece.type, newX, state.currentPiece.position.y, state.currentPiece.rotation)) {
        return {
          ...state,
          currentPiece: {
            ...state.currentPiece,
            position: { ...state.currentPiece.position, x: newX },
          },
        };
      }
      return state;
    }

    case 'ROTATE': {
      if (state.gameState !== 'PLAYING') return state;
      const newRotation = (state.currentPiece.rotation + 1) % TETROMINO_SHAPES[state.currentPiece.type].length;
      if (!checkCollision(state.board, state.currentPiece.type, state.currentPiece.position.x, state.currentPiece.position.y, newRotation)) {
        return {
          ...state,
          currentPiece: {
            ...state.currentPiece,
            rotation: newRotation,
          },
        };
      }
      return state;
    }

    case 'SOFT_DROP': {
      if (state.gameState !== 'PLAYING') return state;
      const newY = state.currentPiece.position.y + 1;
      if (!checkCollision(state.board, state.currentPiece.type, state.currentPiece.position.x, newY, state.currentPiece.rotation)) {
        return {
          ...state,
          currentPiece: {
            ...state.currentPiece,
            position: { ...state.currentPiece.position, y: newY },
          },
          score: state.score + 1,
        };
      }
      const newState = mergePieceToBoard(state);
      return clearLines(newState);
    }

    case 'HARD_DROP': {
      if (state.gameState !== 'PLAYING') return state;
      let newY = state.currentPiece.position.y;
      let dropDistance = 0;
      while (!checkCollision(state.board, state.currentPiece.type, state.currentPiece.position.x, newY + 1, state.currentPiece.rotation)) {
        newY++;
        dropDistance++;
      }
      const newState = {
        ...state,
        currentPiece: {
          ...state.currentPiece,
          position: { ...state.currentPiece.position, y: newY },
        },
        score: state.score + dropDistance * 2,
      };
      return clearLines(mergePieceToBoard(newState));
    }

    case 'TICK': {
      if (state.gameState !== 'PLAYING') return state;
      const newY = state.currentPiece.position.y + 1;
      if (!checkCollision(state.board, state.currentPiece.type, state.currentPiece.position.x, newY, state.currentPiece.rotation)) {
        return {
          ...state,
          currentPiece: {
            ...state.currentPiece,
            position: { ...state.currentPiece.position, y: newY },
          },
        };
      }
      const newState = mergePieceToBoard(state);
      if (newState.currentPiece.position.y === 0) {
        return {
          ...newState,
          gameState: 'GAME_OVER',
        };
      }
      return clearLines(newState);
    }

    default:
      return state;
  }
};