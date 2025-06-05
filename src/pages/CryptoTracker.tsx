
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Bitcoin, DollarSign, Activity, BarChart3 } from 'lucide-react';

// Mock cryptocurrency data
const cryptoData = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43250.67,
    change24h: 2.34,
    volume24h: 15678000000,
    marketCap: 847000000000,
    icon: Bitcoin,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2567.89,
    change24h: -1.23,
    volume24h: 8945000000,
    marketCap: 308000000000,
    icon: DollarSign,
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.4567,
    change24h: 4.56,
    volume24h: 567000000,
    marketCap: 16200000000,
    icon: Activity,
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.34,
    change24h: -2.78,
    volume24h: 1234000000,
    marketCap: 42300000000,
    icon: BarChart3,
  },
];

// Mock price chart data
const priceChartData = [
  { time: '00:00', btc: 42800, eth: 2580, ada: 0.445, sol: 101.2 },
  { time: '04:00', btc: 43100, eth: 2590, ada: 0.448, sol: 100.8 },
  { time: '08:00', btc: 42950, eth: 2575, ada: 0.452, sol: 99.5 },
  { time: '12:00', btc: 43200, eth: 2568, ada: 0.456, sol: 98.9 },
  { time: '16:00', btc: 43050, eth: 2572, ada: 0.454, sol: 98.1 },
  { time: '20:00', btc: 43250, eth: 2567, ada: 0.457, sol: 98.3 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatLargeNumber = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

const CryptoTracker = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Crypto Tracker</h1>
            <p className="text-gray-400 mt-2">Monitor cryptocurrency markets and trends</p>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$1.73T</div>
              <div className="flex items-center text-sm text-summit-green">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.4% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">24h Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$89.4B</div>
              <div className="flex items-center text-sm text-summit-red">
                <TrendingDown className="w-4 h-4 mr-1" />
                -1.2% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">BTC Dominance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">48.9%</div>
              <div className="flex items-center text-sm text-summit-green">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.3% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Cryptos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2.3M+</div>
              <div className="text-sm text-gray-400">Tracked globally</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-summit-dark/50 border border-summit-light-gray/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-summit-blue">
              Overview
            </TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-summit-blue">
              Price Charts
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-summit-blue">
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top Cryptocurrencies */}
            <Card className="glass-effect border-summit-light-gray/30">
              <CardHeader>
                <CardTitle className="text-white">Top Cryptocurrencies</CardTitle>
                <CardDescription>Most popular cryptocurrencies by market cap</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cryptoData.map((crypto) => (
                    <div key={crypto.id} className="flex items-center justify-between p-4 rounded-lg bg-summit-dark/30 hover:bg-summit-dark/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-summit-blue to-summit-purple rounded-full flex items-center justify-center">
                          <crypto.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{crypto.name}</div>
                          <div className="text-sm text-gray-400">{crypto.symbol}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-white">{formatCurrency(crypto.price)}</div>
                        <div className="text-sm text-gray-400">Vol: {formatLargeNumber(crypto.volume24h)}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Market Cap</div>
                        <div className="font-medium text-white">{formatLargeNumber(crypto.marketCap)}</div>
                      </div>
                      
                      <Badge
                        variant={crypto.change24h > 0 ? "default" : "destructive"}
                        className={crypto.change24h > 0 ? "bg-summit-green/20 text-summit-green" : "bg-summit-red/20 text-summit-red"}
                      >
                        {crypto.change24h > 0 ? "+" : ""}{crypto.change24h.toFixed(2)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <Card className="glass-effect border-summit-light-gray/30">
              <CardHeader>
                <CardTitle className="text-white">Price Charts (24h)</CardTitle>
                <CardDescription>Real-time price movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="btc" 
                        stroke="#F59E0B" 
                        strokeWidth={2}
                        name="Bitcoin"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="eth" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        name="Ethereum"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ada" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        name="Cardano"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sol" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        name="Solana"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-effect border-summit-light-gray/30">
                <CardHeader>
                  <CardTitle className="text-white">Top Gainers (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cryptoData.filter(crypto => crypto.change24h > 0).map((crypto) => (
                      <div key={crypto.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <crypto.icon className="w-5 h-5 text-summit-blue" />
                          <span className="text-white font-medium">{crypto.symbol}</span>
                        </div>
                        <Badge className="bg-summit-green/20 text-summit-green">
                          +{crypto.change24h.toFixed(2)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-summit-light-gray/30">
                <CardHeader>
                  <CardTitle className="text-white">Top Losers (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cryptoData.filter(crypto => crypto.change24h < 0).map((crypto) => (
                      <div key={crypto.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <crypto.icon className="w-5 h-5 text-summit-blue" />
                          <span className="text-white font-medium">{crypto.symbol}</span>
                        </div>
                        <Badge className="bg-summit-red/20 text-summit-red">
                          {crypto.change24h.toFixed(2)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CryptoTracker;
