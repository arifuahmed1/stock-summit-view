import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MarketOverview } from '@/components/dashboard/MarketOverview';
import { StockCard } from '@/components/dashboard/StockCard';
import { PriceChart } from '@/components/dashboard/PriceChart';
import { PredictivePanel } from '@/components/dashboard/PredictivePanel';
import { useStockQuote, useStockCandles, useCryptoCandles } from '@/hooks/useFinnhubData';
import { useBitcoinPrice } from '@/hooks/useCoindeskData';
import { Card } from '@/components/ui/card';

const stockSymbols = ['AAPL', 'GOOGL', 'TSLA', 'MSFT'];
const cryptoSymbols = ['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:ADAUSDT', 'BINANCE:SOLUSDT'];

const StockCardWithData: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { data: quote, isLoading } = useStockQuote(symbol);
  
  if (isLoading || !quote) {
    return (
      <Card className="glass-effect p-6 animate-pulse">
        <div className="h-20 bg-gray-700 rounded"></div>
      </Card>
    );
  }

  return (
    <StockCard
      symbol={symbol}
      name={symbol}
      price={quote.c}
      change={quote.d}
      changePercent={quote.dp}
      volume="N/A"
    />
  );
};

const CryptoCardWithData: React.FC<{ symbol: string; displaySymbol: string }> = ({ symbol, displaySymbol }) => {
  const { data: candles, isLoading } = useCryptoCandles(symbol, '1');
  const { data: btcPrice } = useBitcoinPrice();
  
  // Use Bitcoin price from Coindesk API for BTC
  const isBitcoin = displaySymbol === 'BTC';
  
  if (isLoading || (!candles && !btcPrice)) {
    return (
      <Card className="glass-effect p-6 animate-pulse">
        <div className="h-20 bg-gray-700 rounded"></div>
      </Card>
    );
  }

  let currentPrice, previousPrice, change, changePercent;
  
  if (isBitcoin && btcPrice) {
    currentPrice = btcPrice;
    previousPrice = candles && candles.c && candles.c.length > 0 ? candles.c[0] : currentPrice * 0.99; // Fallback to slight change
    change = currentPrice - previousPrice;
    changePercent = (change / previousPrice) * 100;
  } else if (candles && candles.c && candles.c.length > 0) {
    currentPrice = candles.c[candles.c.length - 1];
    previousPrice = candles.c[candles.c.length - 2] || currentPrice;
    change = currentPrice - previousPrice;
    changePercent = (change / previousPrice) * 100;
  } else {
    // Fallback values
    currentPrice = 0;
    previousPrice = 0;
    change = 0;
    changePercent = 0;
  }

  return (
    <StockCard
      symbol={displaySymbol}
      name={displaySymbol}
      price={currentPrice}
      change={change}
      changePercent={changePercent}
      volume="N/A"
      source={isBitcoin ? "Coindesk" : "Finnhub"}
    />
  );
};

const ChartWithData: React.FC<{ symbol: string; title: string; color: string; isCrypto?: boolean }> = ({ 
  symbol, 
  title, 
  color,
  isCrypto = false 
}) => {
  const { data: stockCandles } = useStockCandles(symbol, '5');
  const { data: cryptoCandles } = useCryptoCandles(symbol, '5');
  
  const candles = isCrypto ? cryptoCandles : stockCandles;
  
  if (!candles || !candles.c || candles.c.length === 0) {
    return <PriceChart title={title} data={[]} color={color} />;
  }

  const chartData = candles.c.map((price, index) => ({
    time: new Date(candles.t[index] * 1000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    price
  })).slice(-24); // Show last 24 data points

  return <PriceChart title={title} data={chartData} color={color} />;
};

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
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Stock Summit
          </h1>
          <p className="text-muted-foreground">
            Your AI-powered financial dashboard for smart trading decisions with real-time data from Finnhub
          </p>
        </div>

        {/* Market Overview */}
        <MarketOverview />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWithData 
            symbol="SPY" 
            title="S&P 500 Today" 
            color="#00d4ff"
          />
          <ChartWithData 
            symbol="BINANCE:BTCUSDT" 
            title="Bitcoin 24H" 
            color="#f7931a"
            isCrypto={true}
          />
        </div>

        {/* Stocks and Crypto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Top Stocks */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Top Stocks (Real-time)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stockSymbols.map((symbol) => (
                  <StockCardWithData key={symbol} symbol={symbol} />
                ))}
              </div>
            </div>

            {/* Crypto Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cryptocurrency (Real-time)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CryptoCardWithData symbol="BINANCE:BTCUSDT" displaySymbol="BTC" />
                <CryptoCardWithData symbol="BINANCE:ETHUSDT" displaySymbol="ETH" />
                <CryptoCardWithData symbol="BINANCE:ADAUSDT" displaySymbol="ADA" />
                <CryptoCardWithData symbol="BINANCE:SOLUSDT" displaySymbol="SOL" />
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
