import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { investmentStrategies, InvestmentAllocation } from "@/lib/calculator";
import { TrendingUp, Shield, Target, Zap, Info } from "lucide-react";

interface InvestmentAllocatorProps {
  selectedStrategy: string;
  currentReturn: number;
  onStrategySelect: (strategy: string, expectedReturn: number) => void;
}

export function InvestmentAllocator({ selectedStrategy, currentReturn, onStrategySelect }: InvestmentAllocatorProps) {
  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case 'conservative': return <Shield className="h-5 w-5" />;
      case 'balanced': return <Target className="h-5 w-5" />;
      case 'aggressive': return <Zap className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'conservative': return 'text-green-600 bg-green-50 border-green-200';
      case 'balanced': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'aggressive': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-blue-600" />
        <h3 className="text-sm font-semibold">Investment Strategy</h3>
      </div>
      
      <div className="space-y-2">
        {investmentStrategies.map((allocation) => (
          <div key={allocation.strategy} className="flex gap-2">
            <Button
              variant={selectedStrategy === allocation.strategy ? "default" : "outline"}
              onClick={() => onStrategySelect(allocation.strategy, allocation.expectedReturn)}
              className={`flex-1 h-auto p-3 flex items-center justify-between ${
                selectedStrategy === allocation.strategy 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                {getStrategyIcon(allocation.strategy)}
                <div className="text-left">
                  <div className="text-sm font-medium capitalize">{allocation.strategy}</div>
                  <div className="text-xs opacity-80">{allocation.riskLevel} Risk</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{allocation.expectedReturn}%</div>
                <div className="text-xs opacity-80">Expected Return</div>
              </div>
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="px-3">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {getStrategyIcon(allocation.strategy)}
                    {allocation.strategy.charAt(0).toUpperCase() + allocation.strategy.slice(1)} Strategy
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{allocation.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Asset Allocation</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Stocks:</span>
                          <span className="font-medium">{allocation.allocation.stocks}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bonds:</span>
                          <span className="font-medium">{allocation.allocation.bonds}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cash:</span>
                          <span className="font-medium">{allocation.allocation.cash}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>International:</span>
                          <span className="font-medium">{allocation.allocation.international}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Risk Profile</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Expected Return:</span>
                          <span className="font-medium">{allocation.expectedReturn}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Level:</span>
                          <span className="font-medium">{allocation.riskLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Volatility:</span>
                          <span className="font-medium">{allocation.volatility}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Horizon:</span>
                          <span className="font-medium">{allocation.timeHorizon}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Best Suited For</h4>
                    <ul className="text-xs space-y-1">
                      {allocation.suitableFor.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
        {(() => {
          const selected = investmentStrategies.find(s => s.strategy === selectedStrategy);
          if (!selected) {
            return (
              <div className="text-sm text-gray-600">
                Custom strategy with {currentReturn}% expected return
              </div>
            );
          }
          
          return (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {getStrategyIcon(selected.strategy)}
                <h4 className="text-sm font-semibold capitalize">
                  {selected.strategy} Strategy Details
                </h4>
              </div>
              
              <p className="text-xs text-gray-600">{selected.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-xs font-medium text-gray-800 mb-1">Asset Allocation</h5>
                  <div className="space-y-0.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Stocks:</span>
                      <span className="font-medium">{selected.allocation.stocks}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bonds:</span>
                      <span className="font-medium">{selected.allocation.bonds}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash:</span>
                      <span className="font-medium">{selected.allocation.cash}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>International:</span>
                      <span className="font-medium">{selected.allocation.international}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-800 mb-1">Risk Profile</h5>
                  <div className="space-y-0.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Expected Return:</span>
                      <span className="font-medium">{selected.expectedReturn}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <span className="font-medium">{selected.riskLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volatility:</span>
                      <span className="font-medium">{selected.volatility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Horizon:</span>
                      <span className="font-medium">{selected.timeHorizon}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-xs font-medium text-gray-800 mb-1">Best Suited For</h5>
                <div className="flex flex-wrap gap-1">
                  {selected.suitableFor.map((item, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}