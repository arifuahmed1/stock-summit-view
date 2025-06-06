
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, TrendingUp, TrendingDown, Target, Zap, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const predictionData = [
  { date: '2024-01', actual: 150, predicted: 148 },
  { date: '2024-02', actual: 165, predicted: 162 },
  { date: '2024-03', actual: 142, predicted: 145 },
  { date: '2024-04', actual: 178, predicted: 175 },
  { date: '2024-05', actual: 185, predicted: 188 },
  { date: '2024-06', actual: null, predicted: 192 },
  { date: '2024-07', actual: null, predicted: 198 },
];

const stockPredictions = [
  {
    symbol: 'AAPL',
    company: 'Apple Inc.',
    currentPrice: 185.42,
    predictedPrice: 205.30,
    confidence: 87,
    direction: 'up',
    timeframe: '30 days',
    aiScore: 9.2,
  },
  {
    symbol: 'TSLA',
    company: 'Tesla Inc.',
    currentPrice: 248.50,
    predictedPrice: 275.80,
    confidence: 82,
    direction: 'up',
    timeframe: '30 days',
    aiScore: 8.8,
  },
  {
    symbol: 'GOOGL',
    company: 'Alphabet Inc.',
    currentPrice: 140.25,
    predictedPrice: 128.90,
    confidence: 75,
    direction: 'down',
    timeframe: '30 days',
    aiScore: 7.5,
  },
  {
    symbol: 'MSFT',
    company: 'Microsoft Corp.',
    currentPrice: 415.30,
    predictedPrice: 445.60,
    confidence: 91,
    direction: 'up',
    timeframe: '30 days',
    aiScore: 9.5,
  },
];

const marketSentiment = [
  { category: 'Technology', bullish: 75, bearish: 25 },
  { category: 'Healthcare', bullish: 60, bearish: 40 },
  { category: 'Finance', bullish: 45, bearish: 55 },
  { category: 'Energy', bullish: 35, bearish: 65 },
  { category: 'Consumer', bullish: 55, bearish: 45 },
];

const AIPredictions = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">AI Predictions</h1>
            <p className="text-gray-400 mt-2">Advanced AI-powered market predictions and analysis</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="border-summit-green text-summit-green">
              <Brain className="w-4 h-4 mr-1" />
              AI Engine Active
            </Badge>
            <Button className="bg-gradient-to-r from-summit-blue to-summit-purple">
              <Zap className="w-4 h-4 mr-2" />
              Generate Predictions
            </Button>
          </div>
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-summit-card border-summit-light-gray/20">
            <TabsTrigger value="predictions" className="data-[state=active]:bg-summit-blue/20">
              Stock Predictions
            </TabsTrigger>
            <TabsTrigger value="accuracy" className="data-[state=active]:bg-summit-blue/20">
              Model Accuracy
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-summit-blue/20">
              Market Sentiment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stockPredictions.map((stock) => (
                <Card key={stock.symbol} className="glass-effect border-summit-light-gray/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-lg">{stock.symbol}</CardTitle>
                        <CardDescription className="text-gray-400 text-sm">
                          {stock.company}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        {stock.direction === 'up' ? (
                          <TrendingUp className="w-5 h-5 text-summit-green" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-400" />
                        )}
                        <Badge 
                          variant="outline" 
                          className={stock.direction === 'up' ? 'border-summit-green text-summit-green' : 'border-red-400 text-red-400'}
                        >
                          {stock.confidence}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Current</span>
                        <span className="text-white font-semibold">${stock.currentPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Predicted</span>
                        <span className={`font-semibold ${stock.direction === 'up' ? 'text-summit-green' : 'text-red-400'}`}>
                          ${stock.predictedPrice}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Change</span>
                        <span className={`font-semibold ${stock.direction === 'up' ? 'text-summit-green' : 'text-red-400'}`}>
                          {stock.direction === 'up' ? '+' : ''}
                          {((stock.predictedPrice - stock.currentPrice) / stock.currentPrice * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-summit-light-gray/20">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-summit-blue" />
                        <span className="text-xs text-gray-400">{stock.timeframe}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">AI Score</p>
                        <p className="text-sm font-bold text-summit-blue">{stock.aiScore}/10</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-effect border-summit-light-gray/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                  Risk Assessment
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI-powered risk analysis for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-summit-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-summit-green">Low</span>
                    </div>
                    <p className="text-white font-semibold">Portfolio Risk</p>
                    <p className="text-gray-400 text-sm">Well diversified holdings</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-yellow-400">Medium</span>
                    </div>
                    <p className="text-white font-semibold">Market Volatility</p>
                    <p className="text-gray-400 text-sm">Moderate fluctuations expected</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-summit-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-summit-blue">High</span>
                    </div>
                    <p className="text-white font-semibold">AI Confidence</p>
                    <p className="text-gray-400 text-sm">Strong prediction accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accuracy" className="space-y-6">
            <Card className="glass-effect border-summit-light-gray/30">
              <CardHeader>
                <CardTitle className="text-white">Prediction Accuracy Over Time</CardTitle>
                <CardDescription className="text-gray-400">
                  Historical accuracy of our AI prediction models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={predictionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Actual Price"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Predicted Price"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-effect border-summit-light-gray/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-summit-green">87.5%</CardTitle>
                  <CardDescription className="text-gray-400">Overall Accuracy</CardDescription>
                </CardHeader>
              </Card>
              <Card className="glass-effect border-summit-light-gray/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-summit-blue">1,247</CardTitle>
                  <CardDescription className="text-gray-400">Predictions Made</CardDescription>
                </CardHeader>
              </Card>
              <Card className="glass-effect border-summit-light-gray/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-summit-purple">92.3%</CardTitle>
                  <CardDescription className="text-gray-400">Trend Accuracy</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            <Card className="glass-effect border-summit-light-gray/30">
              <CardHeader>
                <CardTitle className="text-white">Market Sentiment by Sector</CardTitle>
                <CardDescription className="text-gray-400">
                  AI analysis of market sentiment across different sectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={marketSentiment} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis dataKey="category" type="category" stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="bullish" fill="#10B981" name="Bullish %" />
                    <Bar dataKey="bearish" fill="#EF4444" name="Bearish %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-effect border-summit-light-gray/30">
                <CardHeader>
                  <CardTitle className="text-white">Sentiment Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Fear & Greed Index</span>
                    <Badge className="bg-summit-green/20 text-summit-green">Neutral (52)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Social Media Sentiment</span>
                    <Badge className="bg-summit-blue/20 text-summit-blue">Positive</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">News Sentiment</span>
                    <Badge className="bg-yellow-400/20 text-yellow-400">Mixed</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Institutional Activity</span>
                    <Badge className="bg-summit-green/20 text-summit-green">Buying</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-summit-light-gray/30">
                <CardHeader>
                  <CardTitle className="text-white">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-summit-green/10 border border-summit-green/30 rounded-lg">
                    <p className="text-summit-green font-semibold text-sm">Strong Buy: AAPL</p>
                    <p className="text-gray-400 text-xs">High confidence prediction with 87% accuracy</p>
                  </div>
                  <div className="p-3 bg-summit-blue/10 border border-summit-blue/30 rounded-lg">
                    <p className="text-summit-blue font-semibold text-sm">Buy: MSFT</p>
                    <p className="text-gray-400 text-xs">Positive momentum with strong fundamentals</p>
                  </div>
                  <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                    <p className="text-yellow-400 font-semibold text-sm">Hold: TSLA</p>
                    <p className="text-gray-400 text-xs">Mixed signals, wait for clearer trend</p>
                  </div>
                  <div className="p-3 bg-red-400/10 border border-red-400/30 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm">Sell: GOOGL</p>
                    <p className="text-gray-400 text-xs">Bearish indicators suggest downward trend</p>
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

export default AIPredictions;
