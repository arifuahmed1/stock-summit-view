
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Clock, ExternalLink, Loader2, Bitcoin, Newspaper } from 'lucide-react';
import { useMarketNews } from '@/hooks/useFinnhubData';
import { useCryptoNews } from '@/hooks/useCoindeskData';
import { coindeskService } from '@/services/coindeskService';

const TrendingNews = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedSource, setSelectedSource] = useState('finnhub');
  
  const { data: finnhubNews, isLoading: isLoadingFinnhub, error: finnhubError } = useMarketNews(selectedCategory);
  const { data: coindeskRawNews, isLoading: isLoadingCoindesk, error: coindeskError } = useCryptoNews(20);
  
  const coindeskNews = coindeskRawNews ? coindeskService.convertNewsToAppFormat(coindeskRawNews) : [];
  
  const categories = ['general', 'forex', 'crypto', 'merger'];

  const getTrendIcon = () => {
    // Since news doesn't include trend data, we'll randomly assign for visual variety
    return Math.random() > 0.5 ? 
      <TrendingUp className="w-4 h-4 text-summit-green" /> : 
      <TrendingDown className="w-4 h-4 text-summit-red" />;
  };

  const getRandomImpact = () => {
    const impacts = ['High', 'Medium', 'Low'];
    return impacts[Math.floor(Math.random() * impacts.length)];
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-500/20 text-red-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'Low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600);
    if (hours < 1) return 'Less than 1 hour ago';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const isLoading = selectedSource === 'finnhub' ? isLoadingFinnhub : isLoadingCoindesk;
  const error = selectedSource === 'finnhub' ? finnhubError : coindeskError;
  const newsData = selectedSource === 'finnhub' ? finnhubNews : coindeskNews;

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Error loading news</h2>
            <p className="text-gray-400">Unable to fetch news data. Please try again later.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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

        {/* News Sources Tabs */}
        <Tabs defaultValue="finnhub" onValueChange={setSelectedSource}>
          <TabsList className="bg-background border border-border">
            <TabsTrigger value="finnhub" className="data-[state=active]:bg-summit-blue data-[state=active]:text-white">
              <Newspaper className="w-4 h-4 mr-2" />
              Finnhub
            </TabsTrigger>
            <TabsTrigger value="coindesk" className="data-[state=active]:bg-summit-blue data-[state=active]:text-white">
              <Bitcoin className="w-4 h-4 mr-2" />
              Coindesk
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* News Categories (only show for Finnhub) */}
        {selectedSource === 'finnhub' && (
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === 'all' ? 'default' : 'secondary'}
              className={selectedCategory === 'all' ? 'bg-summit-blue hover:bg-summit-blue/80 cursor-pointer' : 'hover:bg-summit-blue/20 cursor-pointer'}
              onClick={() => setSelectedCategory('general')}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={selectedCategory === category ? 'default' : 'secondary'}
                className={selectedCategory === category ? 'bg-summit-blue hover:bg-summit-blue/80 cursor-pointer' : 'hover:bg-summit-blue/20 cursor-pointer'}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-summit-blue" />
            <span className="ml-2 text-white">Loading latest news...</span>
          </div>
        )}

        {/* News Grid */}
        {newsData && !isLoading && (
          <div className="grid gap-6">
            {newsData.slice(0, 10).map((article, index) => {
              const impact = getRandomImpact();
              return (
                <Card key={article.id || index} className="glass-effect border-summit-light-gray/20 hover:border-summit-blue/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTrendIcon()}
                          <Badge variant="outline" className="text-summit-blue border-summit-blue/30">
                            {selectedSource === 'finnhub' 
                              ? (selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1))
                              : 'Crypto'
                            }
                          </Badge>
                          <Badge className={getImpactColor(impact)}>
                            {impact} Impact
                          </Badge>
                          <Badge variant="secondary">
                            {article.source}
                          </Badge>
                        </div>
                        <CardTitle className="text-white hover:text-summit-blue transition-colors cursor-pointer">
                          {article.headline}
                        </CardTitle>
                        <CardDescription className="text-gray-300 mt-2">
                          {article.summary || 'Click to read more...'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(article.datetime)}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-summit-blue hover:text-summit-blue/80"
                        onClick={() => window.open(article.url, '_blank')}
                      >
                        Read More
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {newsData && newsData.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">No news available</h2>
              <p className="text-gray-400">Try selecting a different category or source, or check back later.</p>
            </div>
          </div>
        )}

        {/* Load More */}
        {newsData && newsData.length > 10 && (
          <div className="flex justify-center">
            <Button variant="outline" className="border-summit-blue/30 text-summit-blue hover:bg-summit-blue/10">
              Load More News
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrendingNews;
