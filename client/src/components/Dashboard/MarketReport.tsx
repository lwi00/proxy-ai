import { MarketReport as MarketReportType } from '@/types/dashboard';

interface MarketReportProps {
  report: MarketReportType;
}

const MarketReport = ({ report }: MarketReportProps) => {
  // Format the timestamp
  const formattedDate = new Date(report.timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // Format numbers for better display
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="bg-primary rounded-lg overflow-hidden mb-6">
      <div className="bg-secondary px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="font-semibold text-white">{report.market}</h3>
          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
            report.changeValue > 0 
              ? 'bg-success text-white' 
              : report.changeValue < 0 
                ? 'bg-danger text-white' 
                : 'bg-warning text-white'
          }`}>
            {report.change}
          </span>
        </div>
        <div className="text-sm text-gray-400">
          {formattedDate}
        </div>
      </div>
      
      <div className="p-4">
        {/* Summary Section */}
        <div className="mb-4 p-3 bg-secondary bg-opacity-50 rounded">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Summary</h4>
          <p className="text-sm text-gray-200">{report.summary}</p>
        </div>
        
        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-3 bg-secondary bg-opacity-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Current Price</span>
              <span className={`text-xs ${
                report.metrics.priceChangeValue > 0 
                  ? 'bg-success' 
                  : report.metrics.priceChangeValue < 0 
                    ? 'bg-danger' 
                    : 'bg-warning'
              } px-1 rounded text-white`}>
                {report.metrics.priceChange}
              </span>
            </div>
            <div className="text-xl font-semibold text-white mt-1">${formatNumber(report.metrics.price)}</div>
          </div>
          
          <div className="p-3 bg-secondary bg-opacity-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Volume</span>
              <span className={`text-xs ${
                report.metrics.volumeChangeValue > 0 
                  ? 'bg-success' 
                  : report.metrics.volumeChangeValue < 0 
                    ? 'bg-danger' 
                    : 'bg-warning'
              } px-1 rounded text-white`}>
                {report.metrics.volumeChange}
              </span>
            </div>
            <div className="text-xl font-semibold text-white mt-1">{formatNumber(report.metrics.volume)}</div>
          </div>
          
          <div className="p-3 bg-secondary bg-opacity-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Volatility</span>
              <span className="text-xs bg-info px-1 rounded text-white">{report.metrics.volatilityStatus}</span>
            </div>
            <div className="text-xl font-semibold text-white mt-1">{report.metrics.volatility}</div>
          </div>
        </div>
        
        {/* AI Insights Section */}
        <div className="mb-2">
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            AI Insights <span className="text-xs bg-secondary px-1.5 rounded ml-1">{report.model_name}</span>
          </h4>
          <div className="p-3 bg-secondary bg-opacity-50 rounded border-l-4 border-accent">
            <p className="text-sm text-gray-200">{report.ai_insights}</p>
          </div>
        </div>
        
        {/* Portfolio Impact */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Portfolio Impact</h4>
          <div className="p-3 bg-secondary bg-opacity-50 rounded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400">Projected Value</span>
                <div className="text-lg font-semibold text-white mt-1">${formatNumber(report.portfolioImpact.projectedValue)}</div>
              </div>
              <div>
                <span className="text-xs text-gray-400">Potential Return</span>
                <div className={`text-lg font-semibold ${
                  report.portfolioImpact.potentialReturnValue > 0 
                    ? 'text-success' 
                    : report.portfolioImpact.potentialReturnValue < 0 
                      ? 'text-danger' 
                      : 'text-warning'
                } mt-1`}>
                  {report.portfolioImpact.potentialReturn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketReport;
