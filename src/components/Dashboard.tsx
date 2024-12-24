import React from 'react';
import { Users, DollarSign, TrendingUp, Clock } from 'lucide-react';

const stats = [
  {
    title: 'Total Customers',
    value: '1,234',
    change: '+12%',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Active Deals',
    value: '$567K',
    change: '+23%',
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    title: 'Win Rate',
    value: '68%',
    change: '+5%',
    icon: TrendingUp,
    color: 'bg-purple-500',
  },
  {
    title: 'Tasks Due',
    value: '28',
    change: '-8%',
    icon: Clock,
    color: 'bg-orange-500',
  },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Deals</h2>
          {/* Add deal list component here */}
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Upcoming Activities</h2>
          {/* Add activities list component here */}
        </div>
      </div>
    </div>
  );
}