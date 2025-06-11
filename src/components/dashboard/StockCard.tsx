
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  source?: string;
}

export const StockCard: React.FC<StockCardProps> = ({ 
  symbol, 
  name, 
  price, 
  change, 
  changePercent,
  volume,
  source = 'Finnhub'
}) => {
  const priceFormatted = price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const changeFormatted = change.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero'
  });
  
  const changePercentFormatted = changePercent.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'exceptZero'
  });

  const isPositive = change >= 0;

  return (
    <Card className="glass-effect border-summit-light-gray/20 hover:border-summit-blue/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-summit-blue to-summit-purple rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-bold text-white">{symbol.slice(0, 2)}</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">{symbol}</div>
                <div className="text-xs text-muted-foreground">{name}</div>
              </div>
            </div>
            {source && source !== 'Finnhub' && (
              <div className="text-xs text-muted-foreground mt-1">Source: {source}</div>
            )}
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-foreground">${priceFormatted}</div>
            <div className={`flex items-center justify-end mt-1 ${isPositive ? 'text-summit-green' : 'text-summit-red'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              <span>{changeFormatted} ({changePercentFormatted}%)</span>
            </div>
            {volume && (
              <div className="text-xs text-muted-foreground">
                Vol: {volume}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
