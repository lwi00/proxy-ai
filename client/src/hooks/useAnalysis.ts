import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { AnalysisParams, AnalysisResponse, Market, AIModel } from '@/types/dashboard';

export function useAnalysis() {
  const [markets, setMarkets] = useState<Market[]>([
    // Market Indices
    { id: 'nasdaq', name: 'NASDAQ', change: '+1.2%', changeValue: 1.2, selected: true },
    { id: 'dowjones', name: 'DOW JONES', change: '-0.8%', changeValue: -0.8, selected: true },
    { id: 'sp500', name: 'S&P 500', change: '+0.5%', changeValue: 0.5, selected: false },
    { id: 'ftse100', name: 'FTSE 100', change: '0.0%', changeValue: 0, selected: false },
    { id: 'nikkei225', name: 'NIKKEI 225', change: '+1.7%', changeValue: 1.7, selected: false },
    
    // Tech Stocks
    { id: 'aapl', name: 'AAPL', change: '+0.7%', changeValue: 0.7, selected: false },
    { id: 'msft', name: 'MSFT', change: '+1.5%', changeValue: 1.5, selected: false },
    { id: 'amzn', name: 'AMZN', change: '-0.3%', changeValue: -0.3, selected: false },
    { id: 'googl', name: 'GOOGL', change: '+0.9%', changeValue: 0.9, selected: false },
    { id: 'meta', name: 'META', change: '+2.1%', changeValue: 2.1, selected: false },
    { id: 'nvda', name: 'NVDA', change: '+3.2%', changeValue: 3.2, selected: true },
    
    // Financial Stocks
    { id: 'jpm', name: 'JPM', change: '-0.5%', changeValue: -0.5, selected: false },
    { id: 'bac', name: 'BAC', change: '-0.2%', changeValue: -0.2, selected: false },
    { id: 'gs', name: 'GS', change: '+0.3%', changeValue: 0.3, selected: false },
    
    // Energy Stocks
    { id: 'xom', name: 'XOM', change: '+0.6%', changeValue: 0.6, selected: false },
    { id: 'cvx', name: 'CVX', change: '-0.4%', changeValue: -0.4, selected: false },
    
    // Economic Indicators
    { id: 'unemployment', name: 'Unemployment Rate', change: '-0.1%', changeValue: -0.1, selected: false },
    { id: 'inflation', name: 'Inflation Rate', change: '+0.2%', changeValue: 0.2, selected: false },
    { id: 'gdp', name: 'GDP Growth', change: '+0.4%', changeValue: 0.4, selected: false },
    { id: 'interestRate', name: 'Interest Rate', change: '0.0%', changeValue: 0, selected: false },
    { id: 'consumerconfidence', name: 'Consumer Confidence', change: '+1.3%', changeValue: 1.3, selected: false },
  ]);

  const [analysisParams, setAnalysisParams] = useState<AnalysisParams>({
    ticker: ['NASDAQ', 'DOW JONES', 'NVDA'],
    start_date: '2025-04-01',
    end_date: '2025-04-05',
    portfolio_value: 1000000,
    model_name: 'FinBERT',
  });

  const [isAnalysisRequested, setIsAnalysisRequested] = useState(false);

  const toggleMarket = (id: string) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === id) {
        return { ...market, selected: !market.selected };
      }
      return market;
    });
    
    setMarkets(updatedMarkets);
    
    // Update analysis params with selected tickers
    const selectedTickers = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    setAnalysisParams(prev => ({
      ...prev,
      ticker: selectedTickers,
    }));
  };

  const selectAllMarkets = () => {
    const updatedMarkets = markets.map(market => ({
      ...market,
      selected: true,
    }));
    
    setMarkets(updatedMarkets);
    
    // Update analysis params with all tickers
    const allTickers = updatedMarkets.map(market => market.name);
    
    setAnalysisParams(prev => ({
      ...prev,
      ticker: allTickers,
    }));
  };

  const updateStartDate = (date: string) => {
    setAnalysisParams(prev => ({
      ...prev,
      start_date: date,
    }));
  };

  const updateEndDate = (date: string) => {
    setAnalysisParams(prev => ({
      ...prev,
      end_date: date,
    }));
  };

  const updatePortfolioValue = (value: number) => {
    setAnalysisParams(prev => ({
      ...prev,
      portfolio_value: value,
    }));
  };

  const updateModelName = (model: AIModel) => {
    setAnalysisParams(prev => ({
      ...prev,
      model_name: model,
    }));
  };

  // Mutation for analysis
  const analysisMutation = useMutation({
    mutationFn: async (params: AnalysisParams) => {
      const res = await apiRequest('POST', '/api/analyze', params);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['/api/analysis']});
    },
  });

  const runAnalysis = () => {
    if (analysisParams.ticker.length === 0) {
      throw new Error("Please select at least one market to analyze");
    }
    
    setIsAnalysisRequested(true);
    analysisMutation.mutate(analysisParams);
  };

  const refreshAnalysis = () => {
    if (isAnalysisRequested) {
      analysisMutation.mutate(analysisParams);
    }
  };

  // Query for fetching analysis results
  const analysisQuery = useQuery<AnalysisResponse>({
    queryKey: ['/api/analysis'],
    enabled: isAnalysisRequested && !analysisMutation.isPending,
  });

  return {
    markets,
    toggleMarket,
    selectAllMarkets,
    analysisParams,
    updateStartDate,
    updateEndDate,
    updatePortfolioValue,
    updateModelName,
    runAnalysis,
    refreshAnalysis,
    analysisResults: analysisQuery.data,
    isLoading: analysisMutation.isPending,
    isError: analysisMutation.isError || analysisQuery.isError,
    error: analysisMutation.error || analysisQuery.error,
    isAnalysisRequested,
  };
}
