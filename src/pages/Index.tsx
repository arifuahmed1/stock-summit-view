
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { StockCard } from '@/components/dashboard/StockCard';
import { PriceChart } from '@/components/dashboard/PriceChart';
import { PredictivePanel } from '@/components/dashboard/PredictivePanel';

// Mock data for demonstration
const generateChartData = (basePrice: number, points: number = 24) => {
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * 10;
    price += change;
    data.push({
      time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
      price: Math.max(price, basePrice * 0.8)
    });
  }
  return data;
};

const stockData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 174.32, change: 2.15, changePercent: 1.25, volume: '45.2M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2847.63, change: -15.23, changePercent: -0.53, volume: '28.7M' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 198.78, change: 8.45, changePercent: 4.44, volume: '89.1M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91, change: 4.12, changePercent: 1.10, volume: '32.5M' },
];

const cryptoData = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43567.89, change: 1234.56, changePercent: 2.91, volume: '$45.2B' },
  { symbol: 'ETH', name: 'Ethereum', price: 2634.21, change: -87.34, changePercent: -3.21, volume: '$18.7B' },
  { symbol: 'ADA', name: 'Cardano', price: 0.485, change: 0.023, changePercent: 4.98, volume: '$2.1B' },
  { symbol: 'SOL', name: 'Solana', price: 98.45, change: 3.21, changePercent: 3.37, volume: '$3.8B' },
];

const predictions = [
  {
    symbol: 'AAPL',
    prediction: 'bullish' as const,
    confidence: 87,
    targetPrice: 185.50,
    currentPrice: 174.32,
    timeframe: '7 days',
    factors: ['Strong earnings', 'AI integration', 'Market sentiment']
  },
  {
    symbol: 'BTC',
    prediction: 'bearish' as const,
    confidence: 72,
    targetPrice: 41200.00,
    currentPrice: 43567.89,
    timeframe: '3 days',
    factors: ['Regulatory concerns', 'High volatility', 'Market correction']
  },
  {
    symbol: 'TSLA',
    prediction: 'bullish' as const,
    confidence: 91,
    targetPrice: 215.30,
    currentPrice: 198.78,
    timeframe: '14 days',
    factors: ['Production growth', 'China expansion', 'EV adoption']
  }
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in space-y-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Stock Summit
          </h1>
          <p className="text-gray-400">
            Your AI-powered financial dashboard for smart trading decisions
          </p>
        </div>

        {/* Market Overview */}
        <MarketOverview />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriceChart 
            title="S&P 500 Today" 
            data={generateChartData(4127.83)} 
            color="#00d4ff"
          />
          <PriceChart 
            title="Bitcoin 24H" 
            data={generateChartData(43567.89, 24)} 
            color="#f7931a"
          />
        </div>

        {/* Stocks and Crypto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Top Stocks */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Top Stocks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stockData.map((stock, index) => (
                  <StockCard key={index} {...stock} />
                ))}
              </div>
            </div>

            {/* Crypto Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Cryptocurrency</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cryptoData.map((crypto, index) => (
                  <StockCard key={index} {...crypto} />
                ))}
              </div>
            </div>
          </div>

          {/* Predictive Panel */}
          <div>
            <PredictivePanel predictions={predictions} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
