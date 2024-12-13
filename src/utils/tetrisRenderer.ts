import { TetrisState, TetrominoType, TETROMINO_SHAPES } from '../types/tetris';

const CELL_SIZE = 30;
const COLORS: Record<TetrominoType, string> = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000',
};

const drawBlock = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) => {
  const gradient = ctx.createLinearGradient(
    x * CELL_SIZE,
    y * CELL_SIZE,
    (x + 1) * CELL_SIZE,
    (y + 1) * CELL_SIZE
  );
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, adjustBrightness(color, -30));

  ctx.fillStyle = gradient;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

  // Highlight
  ctx.beginPath();
  ctx.strokeStyle = adjustBrightness(color, 50);
  ctx.lineWidth = 2;
  ctx.moveTo(x * CELL_SIZE + 2, y * CELL_SIZE + CELL_SIZE - 2);
  ctx.lineTo(x * CELL_SIZE + 2, y * CELL_SIZE + 2);
  ctx.lineTo(x * CELL_SIZE + CELL_SIZE - 2, y * CELL_SIZE + 2);
  ctx.stroke();

  // Shadow
  ctx.beginPath();
  ctx.strokeStyle = adjustBrightness(color, -50);
  ctx.moveTo(x * CELL_SIZE + CELL_SIZE - 2, y * CELL_SIZE + 2);
  ctx.lineTo(x * CELL_SIZE + CELL_SIZE - 2, y * CELL_SIZE + CELL_SIZE - 2);
  ctx.lineTo(x * CELL_SIZE + 2, y * CELL_SIZE + CELL_SIZE - 2);
  ctx.stroke();
};

const adjustBrightness = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
};

const drawGrid = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;

  for (let i = 0; i <= 20; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(300, i * CELL_SIZE);
    ctx.stroke();
  }

  for (let i = 0; i <= 10; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, 600);
    ctx.stroke();
  }
};

export const drawGame = (ctx: CanvasRenderingContext2D, state: TetrisState) => {
  // Clear canvas with gradient background
  const gradient = ctx.createLinearGradient(0, 0, 300, 600);
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 600);

  // Draw grid
  drawGrid(ctx);

  // Draw board
  state.board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        drawBlock(ctx, x, y, COLORS[cell]);
      }
    });
  });

  // Draw current piece
  const shape = TETROMINO_SHAPES[state.currentPiece.type][state.currentPiece.rotation % TETROMINO_SHAPES[state.currentPiece.type].length];
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const pieceX = state.currentPiece.position.x + x;
        const pieceY = state.currentPiece.position.y + y;
        if (pieceY >= 0) {
          drawBlock(ctx, pieceX, pieceY, COLORS[state.currentPiece.type]);
        }
      }
    });
  });

  // Draw ghost piece
  let ghostY = state.currentPiece.position.y;
  while (!checkCollision(state.board, state.currentPiece.type, state.currentPiece.position.x, ghostY + 1, state.currentPiece.rotation)) {
    ghostY++;
  }

  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const pieceX = state.currentPiece.position.x + x;
        const pieceY = ghostY + y;
        if (pieceY >= 0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.fillRect(pieceX * CELL_SIZE, pieceY * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    });
  });

  // Add vignette effect
  const vignette = ctx.createRadialGradient(150, 300, 0, 150, 300, 400);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.3)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 300, 600);
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
          newX >= 10 ||
          newY >= 20 ||
          (newY >= 0 && board[newY][newX] !== null)
        ) {
          return true;
        }
      }
    }
  }
  
  return false;
};