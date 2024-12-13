import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import CallToAction from './components/CallToAction';
import SnakePage from './pages/SnakePage';
import TetrisPage from './pages/TetrisPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Stats />
              <CallToAction />
            </>
          } />
          <Route path="/snake" element={<SnakePage />} />
          <Route path="/tetris" element={<TetrisPage />} />
        </Routes>
      </div>
    </Router>
  );
}