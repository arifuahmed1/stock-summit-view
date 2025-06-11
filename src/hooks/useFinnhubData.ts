
import { useQuery } from '@tanstack/react-query';
import { finnhubService } from '@/services/finnhubService';

export const useStockQuote = (symbol: string) => {
  return useQuery({
    queryKey: ['stockQuote', symbol],
    queryFn: () => finnhubService.getStockQuote(symbol),
    refetchInterval: 10000, // Refetch every 10 seconds
    enabled: !!symbol,
  });
};

export const useCompanyProfile = (symbol: string) => {
  return useQuery({
    queryKey: ['companyProfile', symbol],
    queryFn: () => finnhubService.getCompanyProfile(symbol),
    enabled: !!symbol,
  });
};

export const useCryptoCandles = (symbol: string, resolution: string = 'D') => {
  return useQuery({
    queryKey: ['cryptoCandles', symbol, resolution],
    queryFn: () => finnhubService.getCryptoCandles(symbol, resolution),
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: !!symbol,
  });
};

export const useStockCandles = (symbol: string, resolution: string = 'D') => {
  return useQuery({
    queryKey: ['stockCandles', symbol, resolution],
    queryFn: () => finnhubService.getStockCandles(symbol, resolution),
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: !!symbol,
  });
};

export const useMarketNews = (category: string = 'general') => {
  return useQuery({
    queryKey: ['marketNews', category],
    queryFn: () => finnhubService.getMarketNews(category),
    refetchInterval: 60000, // Refetch every minute
  });
};
