import { AnalysisParams, Market, AIModel, Portfolio } from '@/types/dashboard';

interface AnalysisFormProps {
  analysisParams: AnalysisParams;
  selectedMarkets: Market[];
  updateStartDate: (date: string) => void;
  updateEndDate: (date: string) => void;
  updatePortfolioValue: (value: number) => void;
  updateModelName: (model: AIModel) => void;
  onAnalyze: () => void;
}

const AnalysisForm = ({
  analysisParams,
  selectedMarkets,
  updateStartDate,
  updateEndDate,
  updatePortfolioValue,
  updateModelName,
  onAnalyze,
}: AnalysisFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <div className="bg-primary rounded-lg p-4 md:p-6 mb-6">
      <h2 className="text-lg font-semibold text-white mb-4">Configure Analysis</h2>
      
      <form id="analysis-form" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={handleSubmit}>
        {/* Date Range Section */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
            <input 
              type="date" 
              id="start-date" 
              className="w-full py-2 px-3 bg-secondary text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
              value={analysisParams.start_date}
              onChange={(e) => updateStartDate(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
            <input 
              type="date" 
              id="end-date" 
              className="w-full py-2 px-3 bg-secondary text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
              value={analysisParams.end_date}
              onChange={(e) => updateEndDate(e.target.value)}
            />
          </div>
        </div>
        
        {/* Portfolio Value */}
        <div>
          <label htmlFor="portfolio-value" className="block text-sm font-medium text-gray-400 mb-1">Portfolio Value ($)</label>
          <div className="relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">$</span>
            </div>
            <input 
              type="number" 
              id="portfolio-value" 
              className="w-full py-2 pl-8 pr-3 bg-secondary text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" 
              value={typeof analysisParams.portfolio_value === 'number' ? analysisParams.portfolio_value : 0}
              onChange={(e) => updatePortfolioValue(Number(e.target.value))}
            />
          </div>
        </div>
        
        {/* AI Model Selection */}
        <div>
          <label htmlFor="model-name" className="block text-sm font-medium text-gray-400 mb-1">AI Model</label>
          <select 
            id="model-name" 
            className="w-full py-2 px-3 bg-secondary text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            value={analysisParams.model_name}
            onChange={(e) => updateModelName(e.target.value as AIModel)}
          >
            <optgroup label="AI Models">
              <option value="FinBERT">FinBERT</option>
              <option value="GPT-4">GPT-4</option>
              <option value="AlphaFinance">AlphaFinance</option>
              <option value="MarketSage">MarketSage</option>
            </optgroup>
            <optgroup label="Investor Styles">
              <option value="Warren Buffett">Warren Buffett</option>
              <option value="Charlie Munger">Charlie Munger</option>
              <option value="Ben Graham">Ben Graham</option>
              <option value="Peter Lynch">Peter Lynch</option>
              <option value="Phil Fisher">Phil Fisher</option>
              <option value="Cathie Wood">Cathie Wood</option>
              <option value="Bill Ackman">Bill Ackman</option>
              <option value="Stanley Druckenmiller">Stanley Druckenmiller</option>
            </optgroup>
            <optgroup label="Analysis Types">
              <option value="Technical Analyst">Technical Analyst</option>
              <option value="Fundamentals Analyst">Fundamentals Analyst</option>
              <option value="Sentiment Analyst">Sentiment Analyst</option>
            </optgroup>
          </select>
        </div>
        
        {/* Selected Markets Summary */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-400 mb-1">Selected Markets</label>
          <div className="flex flex-wrap gap-2">
            {selectedMarkets.length > 0 ? (
              selectedMarkets.map((market) => (
                <span key={market.id} className="px-2 py-1 text-xs font-medium rounded bg-accent text-white">
                  {market.name}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">No markets selected</span>
            )}
          </div>
        </div>
        
        {/* Analyze Button */}
        <div className="flex items-end">
          <button 
            type="submit" 
            id="analyze-btn" 
            className="w-full py-2 px-4 rounded-md bg-accent hover:bg-accent-hover text-white font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 shadow-sm"
            disabled={selectedMarkets.length === 0}
          >
            <span className="flex items-center justify-center">
              <i className="fas fa-chart-line mr-2"></i>
              Analyze
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnalysisForm;
