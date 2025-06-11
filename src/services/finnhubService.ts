
const FINNHUB_API_KEY = 'd14e3qpr01qq13oqlmvgd14e3qpr01qq13oqln00';
const BASE_URL = 'https://finnhub.io/api/v1';

interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

interface CryptoCandle {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string; // Status
  t: number[]; // Timestamps
  v: number[]; // Volume
}

interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

export class FinnhubService {
  private async fetchFromFinnhub(endpoint: string): Promise<any> {
    const response = await fetch(`${BASE_URL}${endpoint}&token=${FINNHUB_API_KEY}`);
    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.statusText}`);
    }
    return response.json();
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    return this.fetchFromFinnhub(`/quote?symbol=${symbol}`);
  }

  async getCompanyProfile(symbol: string): Promise<CompanyProfile> {
    return this.fetchFromFinnhub(`/stock/profile2?symbol=${symbol}`);
  }

  async getCryptoCandles(symbol: string, resolution: string = 'D', from?: number, to?: number): Promise<CryptoCandle> {
    const fromTime = from || Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60); // 30 days ago
    const toTime = to || Math.floor(Date.now() / 1000);
    return this.fetchFromFinnhub(`/crypto/candle?symbol=${symbol}&resolution=${resolution}&from=${fromTime}&to=${toTime}`);
  }

  async getMarketNews(category: string = 'general'): Promise<any[]> {
    return this.fetchFromFinnhub(`/news?category=${category}`);
  }

  async getStockCandles(symbol: string, resolution: string = 'D', from?: number, to?: number): Promise<CryptoCandle> {
    const fromTime = from || Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60); // 30 days ago
    const toTime = to || Math.floor(Date.now() / 1000);
    return this.fetchFromFinnhub(`/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${fromTime}&to=${toTime}`);
  }
}

export const finnhubService = new FinnhubService();
