
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Clock, ExternalLink } from 'lucide-react';

const TrendingNews = () => {
  const newsData = [
    {
      id: 1,
      title: "Federal Reserve Hints at Interest Rate Changes",
      summary: "Recent statements suggest potential monetary policy shifts that could impact market dynamics.",
      source: "Financial Times",
      time: "2 hours ago",
      category: "Economics",
      trend: "up",
      impact: "High"
    },
    {
      id: 2,
      title: "Tech Giants Report Strong Q4 Earnings",
      summary: "Major technology companies exceed expectations with robust quarterly performance.",
      source: "Reuters",
      time: "4 hours ago",
      category: "Technology",
      trend: "up",
      impact: "Medium"
    },
    {
      id: 3,
      title: "Oil Prices Decline Amid Supply Concerns",
      summary: "Energy sector faces volatility as global supply chain issues persist.",
      source: "Bloomberg",
      time: "6 hours ago",
      category: "Energy",
      trend: "down",
      impact: "High"
    },
    {
      id: 4,
      title: "Cryptocurrency Market Shows Mixed Signals",
      summary: "Digital assets experience varied performance across different market segments.",
      source: "CoinDesk",
      time: "8 hours ago",
      category: "Crypto",
      trend: "up",
      impact: "Medium"
    },
    {
      id: 5,
      title: "Healthcare Stocks Gain on Drug Approval News",
      summary: "Pharmaceutical companies see positive movement following regulatory approvals.",
      source: "Wall Street Journal",
      time: "10 hours ago",
      category: "Healthcare",
      trend: "up",
      impact: "Low"
    },
    {
      id: 6,
      title: "Manufacturing Index Shows Economic Resilience",
      summary: "Industrial production data indicates continued strength in manufacturing sector.",
      source: "MarketWatch",
      time: "12 hours ago",
      category: "Manufacturing",
      trend: "up",
      impact: "Medium"
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-summit-green" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500/20 text-red-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'Low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Trending News</h1>
            <p className="text-gray-400 mt-2">Stay updated with the latest market-moving news</p>
          </div>
          <Button className="bg-summit-blue hover:bg-summit-blue/80">
            <ExternalLink className="w-4 h-4 mr-2" />
            View All Sources
          </Button>
        </div>

        {/* News Categories */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Economics', 'Technology', 'Energy', 'Crypto', 'Healthcare', 'Manufacturing'].map((category) => (
            <Badge 
              key={category} 
              variant={category === 'All' ? 'default' : 'secondary'}
              className={category === 'All' ? 'bg-summit-blue hover:bg-summit-blue/80' : 'hover:bg-summit-blue/20'}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid gap-6">
          {newsData.map((news) => (
            <Card key={news.id} className="glass-effect border-summit-light-gray/20 hover:border-summit-blue/30 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTrendIcon(news.trend)}
                      <Badge variant="outline" className="text-summit-blue border-summit-blue/30">
                        {news.category}
                      </Badge>
                      <Badge className={getImpactColor(news.impact)}>
                        {news.impact} Impact
                      </Badge>
                    </div>
                    <CardTitle className="text-white hover:text-summit-blue transition-colors cursor-pointer">
                      {news.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 mt-2">
                      {news.summary}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{news.source}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{news.time}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-summit-blue hover:text-summit-blue/80">
                    Read More
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline" className="border-summit-blue/30 text-summit-blue hover:bg-summit-blue/10">
            Load More News
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrendingNews;
