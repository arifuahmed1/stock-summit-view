
interface CoindeSkPrice {
  iso: string;
  timestamp: number;
  value: number;
}

interface CoindeskPriceResponse {
  bpi: {
    [currency: string]: CoindeSkPrice;
  };
  disclaimer: string;
}

interface CoindeskNewsItem {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  createdAt: string;
  tags: string[];
}

interface CoindeskNewsResponse {
  data: CoindeskNewsItem[];
  meta: {
    count: number;
    offset: number;
    limit: number;
  };
}

export class CoindeskService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = "01ed993092796b9696cf7e391856ec415bf4a9cb2669c9f48ef3b65392318354";
    this.baseUrl = "https://api.coindesk.com/v1";
  }

  private async fetchFromCoindesk(endpoint: string): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, { headers });
      if (!response.ok) {
        console.error(`Coindesk API error: ${response.status}`);
        return null;
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching from Coindesk:", error);
      return null;
    }
  }

  async getBitcoinPrice(currency: string = 'USD'): Promise<number | null> {
    try {
      const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Bitcoin price: ${response.statusText}`);
      }
      
      const data: CoindeskPriceResponse = await response.json();
      return data.bpi[currency]?.value || null;
    } catch (error) {
      console.error("Error getting Bitcoin price:", error);
      return null;
    }
  }

  async getCryptoNews(limit: number = 10): Promise<CoindeskNewsItem[]> {
    try {
      const response = await fetch(`https://api.coindesk.com/v2/articles/feed?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch crypto news: ${response.statusText}`);
      }
      
      const data: CoindeskNewsResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error getting crypto news:", error);
      // Return mock data as fallback
      return this.getMockCryptoNews(limit);
    }
  }

  private getMockCryptoNews(limit: number = 10): CoindeskNewsItem[] {
    const mockNews: CoindeskNewsItem[] = [
      {
        id: "1",
        type: "article",
        title: "Bitcoin Hits New All-Time High",
        description: "Bitcoin has surged to a new all-time high amid growing institutional adoption.",
        url: "https://www.coindesk.com/markets/2023/03/14/bitcoin-hits-new-all-time-high/",
        thumbnail: "https://www.coindesk.com/resizer/Bitcoin_Article.jpg",
        createdAt: new Date().toISOString(),
        tags: ["bitcoin", "markets"]
      },
      {
        id: "2",
        type: "article",
        title: "Ethereum Merge Successfully Completed",
        description: "The Ethereum blockchain has successfully transitioned to proof-of-stake.",
        url: "https://www.coindesk.com/tech/2023/03/13/ethereum-merge-successfully-completed/",
        thumbnail: "https://www.coindesk.com/resizer/Ethereum_Article.jpg",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        tags: ["ethereum", "tech"]
      },
      {
        id: "3",
        type: "article",
        title: "Crypto Regulation Advances in EU",
        description: "European Union lawmakers have approved new regulations for the crypto industry.",
        url: "https://www.coindesk.com/policy/2023/03/12/crypto-regulation-advances-in-eu/",
        thumbnail: "https://www.coindesk.com/resizer/EU_Regulation.jpg",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        tags: ["policy", "europe"]
      },
      {
        id: "4",
        type: "article",
        title: "Major Bank Launches Crypto Custody Service",
        description: "A major U.S. bank has announced a new cryptocurrency custody service for institutional clients.",
        url: "https://www.coindesk.com/business/2023/03/11/major-bank-launches-crypto-custody-service/",
        thumbnail: "https://www.coindesk.com/resizer/Bank_Crypto.jpg",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        tags: ["business", "custody"]
      },
      {
        id: "5",
        type: "article",
        title: "DeFi Protocol Suffers Security Breach",
        description: "A decentralized finance protocol has reported a security breach resulting in lost funds.",
        url: "https://www.coindesk.com/tech/2023/03/10/defi-protocol-suffers-security-breach/",
        thumbnail: "https://www.coindesk.com/resizer/DeFi_Hack.jpg",
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        tags: ["defi", "security"]
      }
    ];

    // Generate additional mock news if needed
    while (mockNews.length < limit) {
      const index = mockNews.length + 1;
      mockNews.push({
        id: `${index + 5}`,
        type: "article",
        title: `Crypto Market Update ${index}`,
        description: `Latest developments in the cryptocurrency markets - update ${index}.`,
        url: `https://www.coindesk.com/markets/2023/03/${10 - index}/crypto-market-update/`,
        thumbnail: `https://www.coindesk.com/resizer/Market_Update_${index}.jpg`,
        createdAt: new Date(Date.now() - (432000000 + index * 86400000)).toISOString(),
        tags: ["markets", "analysis"]
      });
    }

    return mockNews.slice(0, limit);
  }

  // Convert Coindesk format to a format compatible with our existing components
  convertNewsToAppFormat(news: CoindeskNewsItem[]): any[] {
    return news.map((item, index) => ({
      id: item.id,
      headline: item.title,
      summary: item.description,
      url: item.url,
      image: item.thumbnail,
      source: "Coindesk",
      datetime: Math.floor(new Date(item.createdAt).getTime() / 1000),
      category: item.tags[0] || "general"
    }));
  }
}

export const coindeskService = new CoindeskService();
