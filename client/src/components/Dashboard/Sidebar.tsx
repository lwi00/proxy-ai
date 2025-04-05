import { Market } from '@/types/dashboard';

interface SidebarProps {
  markets: Market[];
  toggleMarket: (id: string) => void;
  selectAllMarkets: () => void;
}

const Sidebar = ({ markets, toggleMarket, selectAllMarkets }: SidebarProps) => {
  return (
    <>
      <div className="p-4 border-b border-secondary">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Finance<span className="text-accent">AI</span></h1>
          <span className="px-2 py-1 text-xs bg-accent text-white rounded-md">BETA</span>
        </div>
      </div>
      
      {/* Markets Section */}
      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Markets</h2>
          <button 
            className="text-xs text-accent hover:text-accent-hover"
            onClick={selectAllMarkets}
          >
            Select All
          </button>
        </div>
        
        {/* Market Indices */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-400 mb-2">Indices</h3>
          <div className="space-y-1">
            {markets.filter(market => ['nasdaq', 'dowjones', 'sp500', 'ftse100', 'nikkei225'].includes(market.id)).map((market) => (
              <div key={market.id} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-primary-light">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-200">{market.name}</span>
                  <span 
                    className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                      market.changeValue > 0 
                        ? 'bg-success text-white' 
                        : market.changeValue < 0 
                          ? 'bg-danger text-white' 
                          : 'bg-warning text-white'
                    }`}
                  >
                    {market.change}
                  </span>
                </div>
                
                {/* Toggle Switch */}
                <div className="relative inline-block w-10 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id={`toggle-${market.id}`}
                    checked={market.selected}
                    onChange={() => toggleMarket(market.id)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  />
                  <label 
                    htmlFor={`toggle-${market.id}`} 
                    className={`toggle-label block overflow-hidden h-5 rounded-full ${
                      market.selected ? 'bg-accent' : 'bg-gray-600'
                    } cursor-pointer`}
                  ></label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tech Stocks */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-400 mb-2">Tech Stocks</h3>
          <div className="space-y-1">
            {markets.filter(market => ['aapl', 'msft', 'amzn', 'googl', 'meta', 'nvda'].includes(market.id)).map((market) => (
              <div key={market.id} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-primary-light">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-200">{market.name}</span>
                  <span 
                    className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                      market.changeValue > 0 
                        ? 'bg-success text-white' 
                        : market.changeValue < 0 
                          ? 'bg-danger text-white' 
                          : 'bg-warning text-white'
                    }`}
                  >
                    {market.change}
                  </span>
                </div>
                
                <div className="relative inline-block w-10 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id={`toggle-${market.id}`}
                    checked={market.selected}
                    onChange={() => toggleMarket(market.id)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  />
                  <label 
                    htmlFor={`toggle-${market.id}`} 
                    className={`toggle-label block overflow-hidden h-5 rounded-full ${
                      market.selected ? 'bg-accent' : 'bg-gray-600'
                    } cursor-pointer`}
                  ></label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Financial Stocks */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-400 mb-2">Financial Stocks</h3>
          <div className="space-y-1">
            {markets.filter(market => ['jpm', 'bac', 'gs'].includes(market.id)).map((market) => (
              <div key={market.id} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-primary-light">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-200">{market.name}</span>
                  <span 
                    className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                      market.changeValue > 0 
                        ? 'bg-success text-white' 
                        : market.changeValue < 0 
                          ? 'bg-danger text-white' 
                          : 'bg-warning text-white'
                    }`}
                  >
                    {market.change}
                  </span>
                </div>
                
                <div className="relative inline-block w-10 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id={`toggle-${market.id}`}
                    checked={market.selected}
                    onChange={() => toggleMarket(market.id)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  />
                  <label 
                    htmlFor={`toggle-${market.id}`} 
                    className={`toggle-label block overflow-hidden h-5 rounded-full ${
                      market.selected ? 'bg-accent' : 'bg-gray-600'
                    } cursor-pointer`}
                  ></label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Energy Stocks */}
        <div className="mb-4">
          <h3 className="text-xs font-medium text-gray-400 mb-2">Energy Stocks</h3>
          <div className="space-y-1">
            {markets.filter(market => ['xom', 'cvx'].includes(market.id)).map((market) => (
              <div key={market.id} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-primary-light">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-200">{market.name}</span>
                  <span 
                    className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                      market.changeValue > 0 
                        ? 'bg-success text-white' 
                        : market.changeValue < 0 
                          ? 'bg-danger text-white' 
                          : 'bg-warning text-white'
                    }`}
                  >
                    {market.change}
                  </span>
                </div>
                
                <div className="relative inline-block w-10 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id={`toggle-${market.id}`}
                    checked={market.selected}
                    onChange={() => toggleMarket(market.id)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  />
                  <label 
                    htmlFor={`toggle-${market.id}`} 
                    className={`toggle-label block overflow-hidden h-5 rounded-full ${
                      market.selected ? 'bg-accent' : 'bg-gray-600'
                    } cursor-pointer`}
                  ></label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Economic Indicators */}
        <div className="mb-2">
          <h3 className="text-xs font-medium text-gray-400 mb-2">Economic Indicators</h3>
          <div className="space-y-1">
            {markets.filter(market => ['unemployment', 'inflation', 'gdp', 'interestRate', 'consumerconfidence'].includes(market.id)).map((market) => (
              <div key={market.id} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-primary-light">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-200">{market.name}</span>
                  <span 
                    className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                      market.changeValue > 0 
                        ? 'bg-success text-white' 
                        : market.changeValue < 0 
                          ? 'bg-danger text-white' 
                          : 'bg-warning text-white'
                    }`}
                  >
                    {market.change}
                  </span>
                </div>
                
                <div className="relative inline-block w-10 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id={`toggle-${market.id}`}
                    checked={market.selected}
                    onChange={() => toggleMarket(market.id)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
                  />
                  <label 
                    htmlFor={`toggle-${market.id}`} 
                    className={`toggle-label block overflow-hidden h-5 rounded-full ${
                      market.selected ? 'bg-accent' : 'bg-gray-600'
                    } cursor-pointer`}
                  ></label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Reports Section */}
      <div className="p-4 border-t border-secondary">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Reports</h2>
        
        <div className="space-y-2">
          <div className="p-2 rounded hover:bg-primary-light cursor-pointer">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
              <span className="text-sm font-medium text-gray-200">NASDAQ Analysis</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-400">Apr 4, 2025</span>
              <span className="text-xs bg-secondary px-1.5 rounded">FinBERT</span>
            </div>
          </div>
          
          <div className="p-2 rounded hover:bg-primary-light cursor-pointer">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
              <span className="text-sm font-medium text-gray-200">DOW JONES Report</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-400">Apr 3, 2025</span>
              <span className="text-xs bg-secondary px-1.5 rounded">GPT-4</span>
            </div>
          </div>
          
          <div className="p-2 rounded hover:bg-primary-light cursor-pointer">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
              <span className="text-sm font-medium text-gray-200">Multi-Market Analysis</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-400">Apr 2, 2025</span>
              <span className="text-xs bg-secondary px-1.5 rounded">FinBERT</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* User Section */}
      <div className="p-4 border-t border-secondary mt-auto">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-xs font-medium text-white">JP</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-200">John Pearson</p>
            <p className="text-xs text-gray-400">Premium Plan</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-white">
            <i className="fas fa-cog text-sm"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
