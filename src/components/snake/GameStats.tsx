import React from 'react';
import { Trophy, Clock, Zap } from 'lucide-react';
import { useSnake } from './SnakeContext';

const GameStats = () => {
  const { state } = useSnake();

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Game Stats</h2>
      <div className="space-y-6">
        <div className="flex items-center">
          <Trophy className="w-8 h-8 text-yellow-500 mr-4" />
          <div>
            <p className="text-gray-400">Score</p>
            <p className="text-2xl font-bold text-white">{state.score}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Zap className="w-8 h-8 text-blue-500 mr-4" />
          <div>
            <p className="text-gray-400">Speed Level</p>
            <p className="text-2xl font-bold text-white">{state.level}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="w-8 h-8 text-green-500 mr-4" />
          <div>
            <p className="text-gray-400">Time</p>
            <p className="text-2xl font-bold text-white">{state.time}s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;