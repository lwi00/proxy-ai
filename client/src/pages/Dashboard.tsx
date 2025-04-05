import { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import AnalysisForm from '@/components/Dashboard/AnalysisForm';
import ResultsSection from '@/components/Dashboard/ResultsSection';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  const {
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
    analysisResults,
    isLoading,
    isError,
    error,
    isAnalysisRequested,
  } = useAnalysis();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAnalyze = () => {
    try {
      runAnalysis();
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Analysis Error",
          description: err.message,
          variant: "destructive",
        });
      }
    }
  };

  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100">
      {/* Sidebar for desktop */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block bg-primary w-64 flex-shrink-0 border-r border-secondary overflow-y-auto scrollbar-hide ${isSidebarOpen ? 'absolute z-10 h-screen md:relative' : ''}`}>
        <Sidebar 
          markets={markets} 
          toggleMarket={toggleMarket} 
          selectAllMarkets={selectAllMarkets}
        />
      </div>
      
      {/* Mobile sidebar toggle */}
      <div className="md:hidden absolute top-4 left-4 z-10">
        <button 
          className="p-2 rounded-md bg-primary text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-accent"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-gray-900 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Financial Analysis Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Generate AI-powered financial insights</p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-secondary text-gray-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
              <span>Last updated: {formattedTime}</span>
            </span>
            <button 
              className="p-2 text-sm bg-secondary rounded-md hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-accent"
              onClick={refreshAnalysis}
              disabled={!isAnalysisRequested}
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
        
        {/* Analysis Form */}
        <AnalysisForm 
          analysisParams={analysisParams} 
          selectedMarkets={markets.filter(m => m.selected)} 
          updateStartDate={updateStartDate}
          updateEndDate={updateEndDate}
          updatePortfolioValue={updatePortfolioValue}
          updateModelName={updateModelName}
          onAnalyze={handleAnalyze}
        />
        
        {/* Results Section */}
        <ResultsSection 
          isAnalysisRequested={isAnalysisRequested}
          isLoading={isLoading}
          analysisResults={analysisResults}
          refreshAnalysis={refreshAnalysis}
        />
      </div>
    </div>
  );
};

export default Dashboard;
