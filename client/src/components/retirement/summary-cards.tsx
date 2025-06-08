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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
      
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-amber-600 mb-2">
            {formatPercent(metrics.savingsGrowthPercent)}
          </div>
          <div className="text-sm text-gray-600">Savings Growth</div>
          <div className="text-xs text-gray-500 mt-1">Including home equity</div>
        </CardContent>
      </Card>
    </div>
  );
}
