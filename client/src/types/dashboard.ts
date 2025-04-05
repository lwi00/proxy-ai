export interface Market {
  id: string;
  name: string;
  change: string;
  changeValue: number;
  selected: boolean;
}

export interface RecentReport {
  id: string;
  title: string;
  date: string;
  model: string;
}

export interface Position {
  cash: number;
  shares: number;
  ticker: string;
}

export interface Portfolio {
  positions: Record<string, Position>;
  total_cash: number;
}

export interface AnalysisParams {
  ticker: string[];
  start_date: string;
  end_date: string;
  portfolio_value: number | Portfolio;
  model_name: string;
}

export interface MetricsData {
  price: number;
  priceChange: string;
  priceChangeValue: number;
  volume: number;
  volumeChange: string;
  volumeChangeValue: number;
  volatility: number;
  volatilityStatus: string;
}

export interface PortfolioImpact {
  projectedValue: number;
  potentialReturn: string;
  potentialReturnValue: number;
}

export interface MarketReport {
  market: string;
  timestamp: string;
  summary: string;
  metrics: MetricsData;
  ai_insights: string;
  model_name: string;
  portfolioImpact: PortfolioImpact;
  change: string;
  changeValue: number;
}

export interface AnalysisResponse {
  reports: MarketReport[];
  timestamp: string;
}

export type AIModel = 
  | 'FinBERT' 
  | 'GPT-4' 
  | 'AlphaFinance' 
  | 'MarketSage'
  | 'Ben Graham'
  | 'Bill Ackman'
  | 'Cathie Wood'
  | 'Charlie Munger'
  | 'Peter Lynch'
  | 'Phil Fisher'
  | 'Stanley Druckenmiller'
  | 'Warren Buffett'
  | 'Technical Analyst'
  | 'Fundamentals Analyst'
  | 'Sentiment Analyst';
