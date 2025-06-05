
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Percent, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const portfolioData = [
  { date: '2024-01', value: 95000 },
  { date: '2024-02', value: 98000 },
  { date: '2024-03', value: 102000 },
  { date: '2024-04', value: 99000 },
  { date: '2024-05', value: 108000 },
  { date: '2024-06', value: 112000 },
];

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 175.23, value: 8761.50, change: 2.34, changePercent: 1.35 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, price: 142.56, value: 3564.00, change: -1.23, changePercent: -0.85 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 30, price: 248.50, value: 7455.00, change: 12.45, changePercent: 5.27 },
  { symbol: 'BTC', name: 'Bitcoin', shares: 0.5, price: 43250.00, value: 21625.00, change: 850.00, changePercent: 2.01 },
  { symbol: 'ETH', name: 'Ethereum', shares: 5, price: 2340.75, value: 11703.75, change: -45.25, changePercent: -1.90 },
];

const allocationData = [
  { name: 'Stocks', value: 65, color: '#3B82F6' },
  { name: 'Crypto', value: 30, color: '#10B981' },
  { name: 'Cash', value: 5, color: '#6B7280' },
];

const MyPortfolio = () => {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalChange = holdings.reduce((sum, holding) => sum + (holding.value * holding.changePercent / 100), 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">My Portfolio</h1>
          <Badge variant="outline" className="text-summit-blue border-summit-blue">
            Last updated: 2 min ago
          </Badge>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-summit-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
              <div className={`text-xs flex items-center ${totalChangePercent >= 0 ? 'text-summit-green' : 'text-red-400'}`}>
                {totalChangePercent >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Today's Change</CardTitle>
              <TrendingUp className="h-4 w-4 text-summit-blue" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalChange >= 0 ? 'text-summit-green' : 'text-red-400'}`}>
                {totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">
                Daily performance
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-summit-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{holdings.length}</div>
              <div className="text-xs text-gray-400">
                Active positions
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Best Performer</CardTitle>
              <Percent className="h-4 w-4 text-summit-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-summit-green">TSLA</div>
              <div className="text-xs text-gray-400">
                +5.27% today
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Performance Chart */}
          <Card className="lg:col-span-2 glass-effect border-summit-light-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioData}>
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
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Asset Allocation */}
          <Card className="glass-effect border-summit-light-gray/30">
            <CardHeader>
              <CardTitle className="text-white">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <RechartsPieChart data={allocationData} cx="50%" cy="50%" outerRadius={80}>
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-sm text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="glass-effect border-summit-light-gray/30">
          <CardHeader>
            <CardTitle className="text-white">Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-summit-light-gray/30">
                    <th className="text-left py-2 text-gray-300 font-medium">Symbol</th>
                    <th className="text-left py-2 text-gray-300 font-medium">Name</th>
                    <th className="text-right py-2 text-gray-300 font-medium">Shares</th>
                    <th className="text-right py-2 text-gray-300 font-medium">Price</th>
                    <th className="text-right py-2 text-gray-300 font-medium">Value</th>
                    <th className="text-right py-2 text-gray-300 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => (
                    <tr key={holding.symbol} className="border-b border-summit-light-gray/20 hover:bg-summit-light-gray/10">
                      <td className="py-3">
                        <span className="font-semibold text-summit-blue">{holding.symbol}</span>
                      </td>
                      <td className="py-3 text-gray-300">{holding.name}</td>
                      <td className="py-3 text-right text-white">{holding.shares}</td>
                      <td className="py-3 text-right text-white">${holding.price.toFixed(2)}</td>
                      <td className="py-3 text-right text-white">${holding.value.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <div className={`flex items-center justify-end ${holding.changePercent >= 0 ? 'text-summit-green' : 'text-red-400'}`}>
                          {holding.changePercent >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {holding.changePercent >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                        </div>
                        <div className={`text-xs ${holding.change >= 0 ? 'text-summit-green' : 'text-red-400'}`}>
                          {holding.change >= 0 ? '+' : ''}${holding.change.toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MyPortfolio;
