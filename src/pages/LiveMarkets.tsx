
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const LiveMarkets: React.FC = () => {
  const marketData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.25, change: 2.15, changePercent: 1.22, volume: '52.3M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.63, change: -15.42, changePercent: -0.54, volume: '1.2M' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.89, change: 8.76, changePercent: 2.15, volume: '24.7M' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 251.34, change: -12.45, changePercent: -4.72, volume: '89.2M' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 144.78, change: 3.21, changePercent: 2.27, volume: '31.5M' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 498.32, change: 18.56, changePercent: 3.87, volume: '45.8M' },
  ];

  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43785.21, change: 1250.45, changePercent: 2.94, volume: '$28.5B' },
    { symbol: 'ETH', name: 'Ethereum', price: 2634.87, change: -78.34, changePercent: -2.89, volume: '$15.2B' },
    { symbol: 'BNB', name: 'Binance Coin', price: 312.45, change: 12.67, changePercent: 4.23, volume: '$2.1B' },
    { symbol: 'SOL', name: 'Solana', price: 98.76, change: 5.43, changePercent: 5.82, volume: '$1.8B' },
    { symbol: 'ADA', name: 'Cardano', price: 0.4521, change: -0.0234, changePercent: -4.92, volume: '$654M' },
    { symbol: 'DOT', name: 'Polkadot', price: 6.78, change: 0.34, changePercent: 5.28, volume: '$432M' },
  ];

  const MarketTable = ({ data, title, pricePrefix = '$' }: { data: any[], title: string, pricePrefix?: string }) => (
    <Card className="glass-effect border-summit-light-gray/30">
      <CardHeader>
        <CardTitle className="text-summit-blue flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.symbol} className="flex items-center justify-between p-3 rounded-lg hover:bg-summit-blue/5 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-summit-blue to-summit-purple rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{item.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{item.symbol}</div>
                  <div className="text-xs text-gray-400">{item.name}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-white">{pricePrefix}{item.price.toLocaleString()}</div>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 ${item.change >= 0 ? 'text-summit-green' : 'text-summit-red'}`}>
                    {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span className="text-xs">{item.changePercent >= 0 ? '+' : ''}{item.changePercent}%</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Vol: {item.volume}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Live Markets</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-summit-green rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Live Updates</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketTable data={marketData} title="Stock Markets" />
          <MarketTable data={cryptoData} title="Cryptocurrency" pricePrefix="$" />
        </div>

        <Card className="glass-effect border-summit-light-gray/30">
          <CardHeader>
            <CardTitle className="text-summit-blue">Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-summit-green/10 border border-summit-green/20">
                <div className="text-2xl font-bold text-summit-green">+2.3%</div>
                <div className="text-sm text-gray-300">S&P 500</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-summit-blue/10 border border-summit-blue/20">
                <div className="text-2xl font-bold text-summit-blue">+1.8%</div>
                <div className="text-sm text-gray-300">NASDAQ</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-summit-red/10 border border-summit-red/20">
                <div className="text-2xl font-bold text-summit-red">-0.5%</div>
                <div className="text-sm text-gray-300">DOW JONES</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LiveMarkets;
