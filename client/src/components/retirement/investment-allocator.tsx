import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { investmentStrategies, InvestmentAllocation } from "@/lib/calculator";
import { TrendingUp, Shield, Target, Zap } from "lucide-react";

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
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">AI-Generated Investment Strategies</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {investmentStrategies.map((allocation) => (
          <Card 
            key={allocation.strategy}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedStrategy === allocation.strategy 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onStrategySelect(allocation.strategy, allocation.expectedReturn)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStrategyIcon(allocation.strategy)}
                  <CardTitle className="text-sm capitalize">{allocation.strategy}</CardTitle>
                </div>
                <Badge className={getStrategyColor(allocation.strategy)}>
                  {allocation.expectedReturn}% Return
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-xs text-gray-600">{allocation.description}</p>
              
              <div className="space-y-2">
                <div className="text-xs">
                  <span className="font-medium">Allocation:</span>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <div className="flex justify-between">
                      <span>Stocks:</span>
                      <span>{allocation.allocation.stocks}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bonds:</span>
                      <span>{allocation.allocation.bonds}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash:</span>
                      <span>{allocation.allocation.cash}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>International:</span>
                      <span>{allocation.allocation.international}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">Risk Level:</span>
                    <span>{allocation.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Volatility:</span>
                    <span>{allocation.volatility}</span>
                  </div>
                </div>
                
                <div className="text-xs">
                  <span className="font-medium">Best For:</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {allocation.suitableFor.slice(0, 2).map((item, index) => (
                      <li key={index} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-2">
          <TrendingUp className="h-4 w-4 text-amber-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-800">Current Selection</p>
            <p className="text-amber-700">
              {selectedStrategy === 'custom' 
                ? `Custom strategy with ${currentReturn}% expected return`
                : `${selectedStrategy.charAt(0).toUpperCase() + selectedStrategy.slice(1)} strategy with ${currentReturn}% expected return`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}