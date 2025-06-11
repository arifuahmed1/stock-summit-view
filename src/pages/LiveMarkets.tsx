
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useStockQuote, useCryptoCandles } from '@/hooks/useFinnhubData';

const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA'];
const cryptoData = [
  { symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin', displaySymbol: 'BTC' },
  { symbol: 'BINANCE:ETHUSDT', name: 'Ethereum', displaySymbol: 'ETH' },
  { symbol: 'BINANCE:BNBUSDT', name: 'Binance Coin', displaySymbol: 'BNB' },
  { symbol: 'BINANCE:SOLUSDT', name: 'Solana', displaySymbol: 'SOL' },
  { symbol: 'BINANCE:ADAUSDT', name: 'Cardano', displaySymbol: 'ADA' },
  { symbol: 'BINANCE:DOTUSDT', name: 'Polkadot', displaySymbol: 'DOT' },
];

const StockItem: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { data: quote, isLoading } = useStockQuote(symbol);

  if (isLoading || !quote) {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="space-y-1">
            <div className="w-16 h-4 bg-gray-700 rounded"></div>
            <div className="w-24 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="w-20 h-4 bg-gray-700 rounded"></div>
          <div className="w-16 h-3 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-summit-blue/5 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-summit-blue to-summit-purple rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">{symbol.slice(0, 2)}</span>
        </div>
        <div>
          <div className="font-semibold text-foreground">{symbol}</div>
          <div className="text-xs text-muted-foreground">{symbol}</div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-foreground">${quote.c.toFixed(2)}</div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${quote.d >= 0 ? 'text-summit-green' : 'text-summit-red'}`}>
            {quote.d >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs">{quote.dp >= 0 ? '+' : ''}{quote.dp.toFixed(2)}%</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
      </div>
    </div>
  );
};

const CryptoItem: React.FC<{ symbol: string; name: string; displaySymbol: string }> = ({ 
  symbol, 
  name, 
  displaySymbol 
}) => {
  const { data: candles, isLoading } = useCryptoCandles(symbol, '1');

  if (isLoading || !candles || !candles.c || candles.c.length === 0) {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="space-y-1">
            <div className="w-16 h-4 bg-gray-700 rounded"></div>
            <div className="w-24 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="w-20 h-4 bg-gray-700 rounded"></div>
          <div className="w-16 h-3 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const currentPrice = candles.c[candles.c.length - 1];
  const previousPrice = candles.c[candles.c.length - 2] || currentPrice;
  const changePercent = ((currentPrice - previousPrice) / previousPrice) * 100;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-summit-blue/5 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-summit-blue to-summit-purple rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">{displaySymbol.slice(0, 2)}</span>
        </div>
        <div>
          <div className="font-semibold text-foreground">{displaySymbol}</div>
          <div className="text-xs text-muted-foreground">{name}</div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-foreground">${currentPrice.toLocaleString()}</div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${changePercent >= 0 ? 'text-summit-green' : 'text-summit-red'}`}>
            {changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs">{changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
      </div>
    </div>
  );
};

const LiveMarkets: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Live Markets</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-summit-green rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live Updates via Finnhub</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-summit-blue flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Stock Markets</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stockSymbols.map((symbol) => (
                  <StockItem key={symbol} symbol={symbol} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-border">
            <CardHeader>
              <CardTitle className="text-summit-blue flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Cryptocurrency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cryptoData.map((crypto) => (
                  <CryptoItem 
                    key={crypto.symbol} 
                    symbol={crypto.symbol}
                    name={crypto.name}
                    displaySymbol={crypto.displaySymbol}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-effect border-border">
          <CardHeader>
            <CardTitle className="text-summit-blue">Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-summit-green/10 border border-summit-green/20">
                <div className="text-2xl font-bold text-summit-green">Live</div>
                <div className="text-sm text-muted-foreground">Real-time Data</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-summit-blue/10 border border-summit-blue/20">
                <div className="text-2xl font-bold text-summit-blue">Finnhub</div>
                <div className="text-sm text-muted-foreground">Data Provider</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-summit-purple/10 border border-summit-purple/20">
                <div className="text-2xl font-bold text-summit-purple">10s</div>
                <div className="text-sm text-muted-foreground">Update Interval</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LiveMarkets;
