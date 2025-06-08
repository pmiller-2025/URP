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
      
      <div className="grid grid-cols-3 gap-2">
        {investmentStrategies.map((allocation) => (
          <div key={allocation.strategy} className="flex flex-col gap-1">
            <Button
              variant={selectedStrategy === allocation.strategy ? "default" : "outline"}
              size="sm"
              onClick={() => onStrategySelect(allocation.strategy, allocation.expectedReturn)}
              className={`h-auto p-3 flex flex-col items-center gap-1 ${
                selectedStrategy === allocation.strategy 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {getStrategyIcon(allocation.strategy)}
              <span className="text-xs font-medium capitalize">{allocation.strategy}</span>
              <span className="text-xs opacity-80">{allocation.expectedReturn}%</span>
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 p-1 text-xs text-gray-500 hover:text-gray-700">
                  <Info className="h-3 w-3 mr-1" />
                  Details
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
      
      <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
        Current: {selectedStrategy.charAt(0).toUpperCase() + selectedStrategy.slice(1)} 
        strategy ({currentReturn}% expected return)
      </div>
    </div>
  );
}