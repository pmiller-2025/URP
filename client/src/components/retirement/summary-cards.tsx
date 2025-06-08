import { Card, CardContent } from "@/components/ui/card";
import { SummaryMetrics } from "@/lib/calculator";

interface SummaryCardsProps {
  metrics: SummaryMetrics;
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

      {/* Mortgage Interest Summary */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mortgage Interest Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Schedule */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Standard Payment Schedule</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Interest:</span>
                  <span className="font-medium text-orange-600">{formatCurrency(metrics.standardInterestTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payoff Date:</span>
                  <span className="font-medium">{metrics.standardPayoffDate}</span>
                </div>
              </div>
            </div>

            {/* Current Schedule */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Current Payment Schedule</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Interest:</span>
                  <span className="font-medium text-orange-600">{formatCurrency(metrics.totalInterestPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payoff Date:</span>
                  <span className="font-medium">{metrics.mortgagePayoffDate}</span>
                </div>
                {metrics.interestSaved > 0 && (
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-finance-green">Interest Saved:</span>
                    <span className="font-bold text-finance-green">{formatCurrency(metrics.interestSaved)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
