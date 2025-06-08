import { Card, CardContent } from "@/components/ui/card";
import { SummaryMetrics } from "@/lib/calculator";

interface SummaryCardsProps {
  metrics: SummaryMetrics;
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
  // Enhanced mortgage summary with comprehensive interest calculations
  const formatCurrency = (amount: number) => {
    if (!isFinite(amount) || isNaN(amount)) {
      return '$0';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(0)}%`;
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Primary Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-finance-green mb-2">
              {formatCurrency(metrics.finalNetWorth)}
            </div>
            <div className="text-sm text-gray-600">Final Net Worth</div>
            <div className="text-xs text-gray-500 mt-1">After 20 years</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-finance-red mb-2">
              {formatCurrency(metrics.totalTaxesPaid)}
            </div>
            <div className="text-sm text-gray-600">Total Taxes Paid</div>
            <div className="text-xs text-gray-500 mt-1">20-year total</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-finance-blue mb-2">
              {formatCurrency(metrics.avgMonthlyCashFlow)}
            </div>
            <div className="text-sm text-gray-600">Avg Monthly Cash Flow</div>
            <div className="text-xs text-gray-500 mt-1">After expenses & taxes</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Mortgage Analysis */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-blue-200 transition-all duration-500" data-mortgage-summary>
        <CardContent className="p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-home text-blue-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Mortgage Analysis</h3>
              <p className="text-gray-600">Interest savings and payoff optimization</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Standard Schedule */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <i className="fas fa-calendar-check text-gray-500 mr-2"></i>
                <h4 className="font-semibold text-gray-700">Standard Schedule</h4>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {formatCurrency(metrics.standardInterestTotal)}
                  </div>
                  <div className="text-sm text-gray-600">Total Interest</div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payoff Date:</span>
                    <span className="font-medium">{metrics.standardPayoffDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Schedule */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <i className="fas fa-rocket text-blue-500 mr-2"></i>
                <h4 className="font-semibold text-gray-700">Accelerated Schedule</h4>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {formatCurrency(metrics.totalInterestPaid)}
                  </div>
                  <div className="text-sm text-gray-600">Total Interest</div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payoff Date:</span>
                    <span className="font-medium">{metrics.mortgagePayoffDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="bg-green-50 rounded-lg p-6 shadow-sm border-2 border-green-200">
              <div className="flex items-center mb-4">
                <i className="fas fa-piggy-bank text-green-600 mr-2"></i>
                <h4 className="font-semibold text-green-700">Interest Savings</h4>
              </div>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {formatCurrency(metrics.interestSaved)}
                  </div>
                  <div className="text-sm text-green-700">Money Saved</div>
                </div>
                {metrics.interestSaved > 0 && metrics.standardInterestTotal > 0 && (
                  <div className="pt-3 border-t border-green-300">
                    <div className="text-center">
                      <div className="text-sm text-green-700 font-medium">
                        {Math.round((metrics.interestSaved / metrics.standardInterestTotal) * 100)}% reduction
                      </div>
                      <div className="text-xs text-green-600">in total interest</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-8 pt-6 border-t border-blue-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {metrics.standardInterestTotal > 0 && metrics.totalInterestPaid >= 0 ? 
                    Math.round((metrics.standardInterestTotal - metrics.totalInterestPaid) / 1000) : 0}K
                </div>
                <div className="text-xs text-gray-600">Interest Avoided</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {metrics.interestSaved > 0 && metrics.standardInterestTotal > 0 ? 
                    Math.round((metrics.interestSaved / metrics.standardInterestTotal) * 100) : 0}%
                </div>
                <div className="text-xs text-gray-600">Efficiency Gain</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {(() => {
                    try {
                      if (!metrics.standardPayoffDate || !metrics.mortgagePayoffDate) return 0;
                      const standardDate = new Date(metrics.standardPayoffDate);
                      const acceleratedDate = new Date(metrics.mortgagePayoffDate);
                      if (isNaN(standardDate.getTime()) || isNaN(acceleratedDate.getTime())) return 0;
                      const diffMs = standardDate.getTime() - acceleratedDate.getTime();
                      const monthsDiff = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30.44));
                      return Math.max(0, monthsDiff);
                    } catch {
                      return 0;
                    }
                  })()}
                </div>
                <div className="text-xs text-gray-600">Months Saved</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {metrics.interestSaved > 0 ? formatCurrency(metrics.interestSaved / 12) : '$0'}
                </div>
                <div className="text-xs text-gray-600">Monthly Equivalent</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
