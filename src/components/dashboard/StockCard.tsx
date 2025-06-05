
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
}

export const StockCard: React.FC<StockCardProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume
}) => {
  const isPositive = change >= 0;
  const trendColor = isPositive ? 'text-summit-green' : 'text-summit-red';
  const bgColor = isPositive ? 'bg-summit-green/10' : 'bg-summit-red/10';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="glass-effect hover-glow p-6 transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">{symbol}</h3>
          <p className="text-sm text-gray-400">{name}</p>
        </div>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <TrendIcon className={`w-4 h-4 ${trendColor}`} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-white">
          ${price.toFixed(2)}
        </div>
        <div className={`flex items-center space-x-2 ${trendColor}`}>
          <span className="font-medium">
            {isPositive ? '+' : ''}${change.toFixed(2)}
          </span>
          <span className="text-sm">
            ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
          </span>
        </div>
        {volume && (
          <div className="text-xs text-gray-400">
            Vol: {volume}
          </div>
        )}
      </div>
    </Card>
  );
};
