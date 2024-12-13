import React from 'react';
import GameBoard from '../components/snake/GameBoard';
import GameControls from '../components/snake/GameControls';
import GameStats from '../components/snake/GameStats';
import { SnakeProvider } from '../components/snake/SnakeContext';

const SnakePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Snake.io</h1>
          <p className="text-indigo-200 text-lg">Challenge yourself in this AI-powered version of the classic game</p>
        </div>
        <SnakeProvider>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <GameBoard />
              <GameControls />
            </div>
            <div>
              <GameStats />
            </div>
          </div>
        </SnakeProvider>
      </div>
    </div>
  );
};

export default SnakePage;