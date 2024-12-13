export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameState = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

export interface Position {
  x: number;
  y: number;
}

export interface SnakeState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameState: GameState;
  score: number;
  level: number;
  time: number;
}