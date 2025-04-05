import { Market } from '@/types/dashboard';

interface MarketsSectionProps {
  markets: Market[];
  toggleMarket: (id: string) => void;
  selectAllMarkets: () => void;
}

const MarketsSection = ({ markets, toggleMarket, selectAllMarkets }: MarketsSectionProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Markets</h2>
        <button 
          className="text-xs text-accent hover:text-accent-hover"
          onClick={selectAllMarkets}
        >
          Select All
        </button>
      </div>
      
      <div className="space-y-2">
        {markets.map((market) => (
          <div key={market.id} className="flex items-center justify-between py-2 px-2 rounded hover:bg-primary-light">
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
  );
};

export default MarketsSection;
