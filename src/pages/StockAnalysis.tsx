
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Search, TrendingUp, TrendingDown, Target, AlertTriangle, Star } from 'lucide-react';

const StockAnalysis = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [timeframe, setTimeframe] = useState('1Y');

  // Mock data for stock analysis
  const stockData = {
    AAPL: {
      name: 'Apple Inc.',
      price: 175.43,
      change: 2.34,
      changePercent: 1.35,
      marketCap: '2.8T',
      pe: 28.5,
      dividend: 0.96,
      beta: 1.2,
      rating: 'BUY',
      targetPrice: 190.00,
      analystCount: 45,
    },
    TSLA: {
      name: 'Tesla Inc.',
      price: 248.50,
      change: -5.67,
      changePercent: -2.23,
      marketCap: '789B',
      pe: 65.2,
      dividend: 0,
      beta: 2.1,
      rating: 'HOLD',
      targetPrice: 275.00,
      analystCount: 38,
    },
    MSFT: {
      name: 'Microsoft Corp.',
      price: 378.85,
      change: 4.21,
      changePercent: 1.12,
      marketCap: '2.8T',
      pe: 32.1,
      dividend: 2.72,
      beta: 0.9,
      rating: 'BUY',
      targetPrice: 420.00,
      analystCount: 52,
    }
  };

  const priceHistory = [
    { date: 'Jan', price: 165, volume: 45000000 },
    { date: 'Feb', price: 170, volume: 52000000 },
    { date: 'Mar', price: 158, volume: 67000000 },
    { date: 'Apr', price: 175, volume: 48000000 },
    { date: 'May', price: 182, volume: 55000000 },
    { date: 'Jun', price: 175, volume: 61000000 },
  ];

  const technicalIndicators = [
    { name: 'RSI (14)', value: 62.5, signal: 'Neutral' },
    { name: 'MACD', value: 1.23, signal: 'Bullish' },
    { name: 'Moving Avg (50)', value: 168.45, signal: 'Above' },
    { name: 'Moving Avg (200)', value: 162.30, signal: 'Above' },
    { name: 'Bollinger Bands', value: 'Middle', signal: 'Neutral' },
  ];

  const currentStock = stockData[selectedStock as keyof typeof stockData];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Stock Analysis</h1>
            <p className="text-gray-400 mt-2">Comprehensive stock analysis and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search stocks..." 
                className="pl-10 w-64 bg-summit-light-gray/20 border-summit-light-gray/30 text-white"
              />
            </div>
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger className="w-40 bg-summit-light-gray/20 border-summit-light-gray/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AAPL">AAPL</SelectItem>
                <SelectItem value="TSLA">TSLA</SelectItem>
                <SelectItem value="MSFT">MSFT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stock Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 glass-effect border-summit-light-gray/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-2xl">{currentStock.name}</CardTitle>
                  <CardDescription className="text-gray-400">{selectedStock}</CardDescription>
                </div>
                <Badge 
                  variant={currentStock.rating === 'BUY' ? 'default' : 'secondary'}
                  className={`${
                    currentStock.rating === 'BUY' 
                      ? 'bg-summit-green text-white' 
                      : 'bg-summit-purple text-white'
                  }`}
                >
                  <Star className="w-3 h-3 mr-1" />
                  {currentStock.rating}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-white">${currentStock.price}</span>
                <div className="flex items-center">
                  {currentStock.change > 0 ? (
                    <TrendingUp className="w-5 h-5 text-summit-green mr-1" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500 mr-1" />
                  )}
                  <span className={`font-semibold ${
                    currentStock.change > 0 ? 'text-summit-green' : 'text-red-500'
                  }`}>
                    ${Math.abs(currentStock.change)} ({Math.abs(currentStock.changePercent)}%)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Market Cap</p>
                  <p className="text-white font-semibold">{currentStock.marketCap}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">P/E Ratio</p>
                  <p className="text-white font-semibold">{currentStock.pe}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Dividend</p>
                  <p className="text-white font-semibold">${currentStock.dividend}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Beta</p>
                  <p className="text-white font-semibold">{currentStock.beta}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-summit-blue" />
                Price Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Average Target</p>
                  <p className="text-2xl font-bold text-summit-green">${currentStock.targetPrice}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Upside Potential</p>
                  <p className="text-summit-blue font-semibold">
                    {((currentStock.targetPrice - currentStock.price) / currentStock.price * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Analysts Coverage</p>
                  <p className="text-white font-semibold">{currentStock.analystCount} analysts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analysis */}
        <Tabs defaultValue="price" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-summit-light-gray/20">
              <TabsTrigger value="price" className="text-white">Price Chart</TabsTrigger>
              <TabsTrigger value="technical" className="text-white">Technical Analysis</TabsTrigger>
              <TabsTrigger value="volume" className="text-white">Volume Analysis</TabsTrigger>
            </TabsList>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32 bg-summit-light-gray/20 border-summit-light-gray/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1D">1 Day</SelectItem>
                <SelectItem value="1W">1 Week</SelectItem>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="price">
            <Card className="glass-effect border-summit-light-gray/30">
              <CardHeader>
                <CardTitle className="text-white">Price Movement</CardTitle>
                <CardDescription className="text-gray-400">
                  Historical price data for {selectedStock}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
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
                        dataKey="price" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card className="glass-effect border-summit-light-gray/30">
              <CardHeader>
                <CardTitle className="text-white">Technical Indicators</CardTitle>
                <CardDescription className="text-gray-400">
                  Key technical analysis indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technicalIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-summit-light-gray/10">
                      <div>
                        <p className="text-white font-semibold">{indicator.name}</p>
                        <p className="text-gray-400 text-sm">{indicator.value}</p>
                      </div>
                      <Badge 
                        variant={
                          indicator.signal === 'Bullish' ? 'default' : 
                          indicator.signal === 'Neutral' ? 'secondary' : 'destructive'
                        }
                        className={`${
                          indicator.signal === 'Bullish' ? 'bg-summit-green' :
                          indicator.signal === 'Neutral' ? 'bg-summit-purple' :
                          'bg-red-500'
                        } text-white`}
                      >
                        {indicator.signal}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volume">
            <Card className="glass-effect border-summit-light-gray/30">
              <CardHeader>
                <CardTitle className="text-white">Volume Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Trading volume trends for {selectedStock}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="volume" fill="#10B981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StockAnalysis;
