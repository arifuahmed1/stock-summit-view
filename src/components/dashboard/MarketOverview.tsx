
import React from 'react';
import { Activity, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MarketStat {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

export const MarketOverview: React.FC = () => {
  const marketStats: MarketStat[] = [
    {
      title: 'S&P 500',
      value: '4,127.83',
      change: '+1.2%',
      icon: <Activity className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Total Portfolio',
      value: '$124,567',
      change: '+$3,421',
      icon: <DollarSign className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Day\'s Best',
      value: 'AAPL',
      change: '+5.7%',
      icon: <TrendingUp className="w-6 h-6" />,
      trend: 'up'
    },
    {
      title: 'Active Traders',
      value: '2.4M',
      change: '+12%',
      icon: <Users className="w-6 h-6" />,
      trend: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {marketStats.map((stat, index) => (
        <Card key={index} className="glass-effect hover-glow p-6 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-summit-blue/20 rounded-lg">
              {React.cloneElement(stat.icon as React.ReactElement, {
                className: "w-6 h-6 text-summit-blue"
              })}
            </div>
            <div className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-summit-green' : 'text-summit-red'
            }`}>
              {stat.change}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-400">{stat.title}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
