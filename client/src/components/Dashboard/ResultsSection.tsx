import { AnalysisResponse } from '@/types/dashboard';
import MarketReport from './MarketReport';

interface ResultsSectionProps {
  isAnalysisRequested: boolean;
  isLoading: boolean;
  analysisResults: AnalysisResponse | undefined;
  refreshAnalysis: () => void;
}

const ResultsSection = ({
  isAnalysisRequested,
  isLoading,
  analysisResults,
  refreshAnalysis,
}: ResultsSectionProps) => {
  const downloadReport = () => {
    if (!analysisResults) return;
    
    // Create a JSON blob and trigger download
    const blob = new Blob([JSON.stringify(analysisResults, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // No analysis requested yet
  if (!isAnalysisRequested) {
    return (
      <div id="no-results">
        <div className="bg-primary rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <i className="fas fa-chart-bar text-2xl text-accent"></i>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Analysis Results Yet</h3>
          <p className="text-gray-400 text-sm max-w-md">Configure your analysis parameters and click the Analyze button to generate AI-powered financial insights.</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div id="loading-results">
        <div className="bg-primary rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Generating Analysis</h3>
            <div className="animate-pulse flex space-x-1">
              <div className="h-2 w-2 bg-accent rounded-full"></div>
              <div className="h-2 w-2 bg-accent rounded-full"></div>
              <div className="h-2 w-2 bg-accent rounded-full"></div>
            </div>
          </div>
          
          {/* Skeleton Loading */}
          <div className="space-y-4">
            <div className="h-24 bg-secondary rounded animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-20 bg-secondary rounded animate-pulse"></div>
              <div className="h-20 bg-secondary rounded animate-pulse"></div>
              <div className="h-20 bg-secondary rounded animate-pulse"></div>
            </div>
            <div className="h-32 bg-secondary rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Analysis results
  return (
    <div id="analysis-results">
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Analysis Results</h2>
        <div className="flex space-x-2">
          <button 
            className="p-2 text-sm bg-secondary rounded-md hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={refreshAnalysis}
          >
            <i className="fas fa-sync-alt mr-1"></i>
            <span className="hidden md:inline">Refresh</span>
          </button>
          <button 
            className="p-2 text-sm bg-secondary rounded-md hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={downloadReport}
          >
            <i className="fas fa-download mr-1"></i>
            <span className="hidden md:inline">Export</span>
          </button>
        </div>
      </div>
      
      {/* Market Reports */}
      {analysisResults?.reports.map((report, index) => (
        <MarketReport key={`${report.market}-${index}`} report={report} />
      ))}
      
      {/* No results found message */}
      {analysisResults?.reports.length === 0 && (
        <div className="bg-primary rounded-lg p-6 text-center">
          <p className="text-gray-400">No analysis results available. Try adjusting your parameters.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
