import React from 'react';
import { Brain, Sparkles, Bot } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <Brain className="h-16 w-16 mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            The Future of AI is Here
          </h1>
          <p className="text-xl sm:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Discover the power of artificial intelligence and how it's transforming the world around us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;