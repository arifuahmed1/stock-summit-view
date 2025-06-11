
import { useQuery } from '@tanstack/react-query';
import { coindeskService } from '@/services/coindeskService';

export const useBitcoinPrice = (currency: string = 'USD') => {
  return useQuery({
    queryKey: ['bitcoinPrice', currency],
    queryFn: () => coindeskService.getBitcoinPrice(currency),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useCryptoNews = (limit: number = 10) => {
  return useQuery({
    queryKey: ['cryptoNews', limit],
    queryFn: () => coindeskService.getCryptoNews(limit),
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};
