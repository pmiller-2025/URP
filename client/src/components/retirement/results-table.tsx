import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnnualData, MonthlyData } from "@/lib/calculator";

interface ResultsTableProps {
  viewMode: 'annual' | 'monthly';
  annualData: AnnualData[];
  monthlyData: MonthlyData[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  projectionYears: number;
}

export function ResultsTable({ 
  viewMode, 
  annualData, 
  monthlyData, 
  selectedYear, 
  onYearChange,
  projectionYears 
}: ResultsTableProps) {
  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0;
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
    
    return isNegative ? `-${formattedAmount}` : formattedAmount;
  };

  const getCashFlowColor = (amount: number) => {
    return amount >= 0 ? 'text-finance-green' : 'text-finance-red';
  };

  const yearOptions = Array.from({ length: projectionYears }, (_, i) => i + 1);

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardContent className="p-0">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              <i className="fas fa-table text-finance-blue mr-2"></i>
              {viewMode === 'annual' ? 'Annual Cash Flow Projection' : 'Monthly Cash Flow Breakdown'}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Scroll horizontally →</span>
              {viewMode === 'monthly' && (
                <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        Year {year} ({2023 + year})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
        
        {viewMode === 'annual' ? (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 border-r border-gray-200 min-w-[80px]">Year</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">Paul Age</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[90px]">Jessica Age</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Paul SS</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Jessica SS</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[110px]">VA Disability</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Business</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[110px]">Jessica Work</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Chapter 35</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Total Income</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[110px]">Total Taxes</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[110px]">After-Tax</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Living Exp</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Insurance</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Mortgage</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[130px]">Net Cash Flow</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">Investment Return</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">Savings Balance</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Home Value</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">Mortgage Balance</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Net Worth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {annualData.map((year, index) => (
                  <tr key={year.year} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-white border-r border-gray-200">{year.year}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{year.paulAge}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{year.jessicaAge}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.paulSS)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.jessicaSS)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.vaDisability)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.business)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.jessicaWork)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.chapter35)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(year.totalIncome)}</td>
                    <td className="px-4 py-3 text-sm text-finance-red">{formatCurrency(year.totalTaxes)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.afterTaxIncome)}</td>
                    <td className="px-4 py-3 text-sm text-finance-red">{formatCurrency(-year.livingExp)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{year.insurance > 0 ? formatCurrency(-year.insurance) : '$0'}</td>
                    <td className="px-4 py-3 text-sm text-finance-red">{year.mortgage > 0 ? formatCurrency(-year.mortgage) : '$0'}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${getCashFlowColor(year.netCashFlow)}`}>{formatCurrency(year.netCashFlow)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.investmentReturn)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.savingsBalance)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.homeValue)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(year.mortgageBalance)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-finance-green">{formatCurrency(year.netWorth)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 border-r border-gray-200 min-w-[100px]">Month</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Paul SS</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Jessica SS</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[110px]">VA Disability</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Business</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[110px]">Jessica Work</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Chapter 35</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Gross Income</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Taxes</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[110px]">Net Income</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Living Exp</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Insurance</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Mortgage</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[130px]">Net Cash Flow</th>
                  <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">Savings Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlyData.map((month, index) => (
                  <tr key={`${month.month}-${index}`} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-white border-r border-gray-200">{month.month}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(month.paulSS)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(month.jessicaSS)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(month.vaDisability)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(month.business)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(month.jessicaWork)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(month.chapter35)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(month.grossIncome)}</td>
                    <td className="px-4 py-3 text-sm text-finance-red">{formatCurrency(-month.taxes)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(month.netIncome)}</td>
                    <td className="px-4 py-3 text-sm text-finance-red">{formatCurrency(-month.livingExp)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{month.insurance > 0 ? formatCurrency(-month.insurance) : '$0'}</td>
                    <td className="px-4 py-3 text-sm text-finance-red">{month.mortgage > 0 ? formatCurrency(-month.mortgage) : '$0'}</td>
                    <td className={`px-4 py-3 text-sm font-medium ${getCashFlowColor(month.netCashFlow)}`}>{formatCurrency(month.netCashFlow)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(month.savingsBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
