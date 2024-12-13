import React from 'react';

const stats = [
  { number: '99%', label: 'Accuracy Rate' },
  { number: '50M+', label: 'Predictions Made' },
  { number: '200+', label: 'Enterprise Clients' },
  { number: '24/7', label: 'Support Available' },
];

const Stats = () => {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-indigo-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;