import { SnakeState } from '../types/snake';

const CELL_SIZE = 20;
const GRID_SIZE = 20;

const drawSnakeSegment = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  isHead: boolean,
  nextSegment?: { x: number; y: number }
) => {
  const radius = CELL_SIZE / 2;
  const centerX = x * CELL_SIZE + radius;
  const centerY = y * CELL_SIZE + radius;

  ctx.beginPath();
  if (isHead) {
    // Draw head with gradient
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, '#60a5fa');
    gradient.addColorStop(1, '#3b82f6');
    ctx.fillStyle = gradient;
    ctx.arc(centerX, centerY, radius - 1, 0, Math.PI * 2);
    
    // Draw eyes
    ctx.fill();
    ctx.fillStyle = '#1e3a8a';
    ctx.beginPath();
    ctx.arc(centerX - 3, centerY - 3, 2, 0, Math.PI * 2);
    ctx.arc(centerX + 3, centerY - 3, 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Draw body segment with gradient
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, '#818cf8');
    gradient.addColorStop(1, '#6366f1');
    ctx.fillStyle = gradient;
    ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
  }
  ctx.fill();

  // Add shine effect
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.arc(centerX - radius/3, centerY - radius/3, radius/4, 0, Math.PI * 2);
  ctx.fill();
};

const drawFood = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const centerX = x * CELL_SIZE + CELL_SIZE / 2;
  const centerY = y * CELL_SIZE + CELL_SIZE / 2;
  const radius = CELL_SIZE / 2 - 2;

  // Draw main circle with gradient
  const gradient = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, radius
  );
  gradient.addColorStop(0, '#f87171');
  gradient.addColorStop(1, '#ef4444');
  
  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Add shine effect
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.arc(centerX - radius/3, centerY - radius/3, radius/3, 0, Math.PI * 2);
  ctx.fill();

  // Add pulsing animation
  const pulseRadius = radius + Math.sin(Date.now() / 200) * 2;
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
  ctx.lineWidth = 2;
  ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
  ctx.stroke();
};

export const drawGame = (ctx: CanvasRenderingContext2D, state: SnakeState) => {
  // Clear canvas with gradient background
  const gradient = ctx.createLinearGradient(0, 0, CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE);
  gradient.addColorStop(0, '#1e1b4b');
  gradient.addColorStop(1, '#312e81');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE);

  // Draw subtle grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
    ctx.stroke();
  }

  // Draw snake
  state.snake.forEach((segment, index) => {
    drawSnakeSegment(
      ctx,
      segment.x,
      segment.y,
      index === 0,
      state.snake[index + 1]
    );
  });

  // Draw food
  drawFood(ctx, state.food.x, state.food.y);

  // Add vignette effect
  const vignette = ctx.createRadialGradient(
    CELL_SIZE * GRID_SIZE / 2,
    CELL_SIZE * GRID_SIZE / 2,
    0,
    CELL_SIZE * GRID_SIZE / 2,
    CELL_SIZE * GRID_SIZE / 2,
    CELL_SIZE * GRID_SIZE
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.3)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE);
};