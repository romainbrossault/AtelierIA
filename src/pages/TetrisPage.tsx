import React from 'react';
import { TetrisProvider } from '../components/tetris/TetrisContext';
import TetrisBoard from '../components/tetris/TetrisBoard';
import TetrisControls from '../components/tetris/TetrisControls';
import TetrisStats from '../components/tetris/TetrisStats';
import NextPiece from '../components/tetris/NextPiece';

const TetrisPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Tetris AI</h1>
          <p className="text-purple-200 text-lg">Experience the classic game enhanced with modern visuals</p>
        </div>
        <TetrisProvider>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <TetrisBoard />
              <TetrisControls />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <NextPiece />
              <TetrisStats />
            </div>
          </div>
        </TetrisProvider>
      </div>
    </div>
  );
}

export default TetrisPage;