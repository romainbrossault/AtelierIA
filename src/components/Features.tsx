import React from 'react';
import { Brain, Cpu, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced Machine Learning',
    description: 'Cutting-edge algorithms that learn and adapt to your needs',
  },
  {
    icon: Cpu,
    title: 'Neural Networks',
    description: 'Deep learning systems inspired by the human brain',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with data privacy by design',
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Lightning-fast analysis and decision making',
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Powered by Advanced Technology
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover the cutting-edge features that make our AI platform unique
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;