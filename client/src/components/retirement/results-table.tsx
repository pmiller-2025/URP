import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings } from "lucide-react";
import { AnnualData, MonthlyData } from "@/lib/calculator";
import { useState } from "react";

interface ResultsTableProps {
  viewMode: 'annual' | 'monthly';
  annualData: AnnualData[];
  monthlyData: MonthlyData[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  projectionYears: number;
}

const getAnnualColumns = (data: AnnualData[]) => {
  const hasExpense1 = data.some(row => row.expense1 > 0);
  const hasExpense2 = data.some(row => row.expense2 > 0);
  const hasExpense3 = data.some(row => row.expense3 > 0);
  
  const columns = [
    { key: 'year', label: 'Year', visible: true, fixed: true },
    { key: 'ages', label: 'Ages (P/J)', visible: true },
    { key: 'paulSS', label: 'Paul SS', visible: true },
    { key: 'jessicaSS', label: 'Jessica SS', visible: true },
    { key: 'vaDisability', label: 'VA Disability', visible: true },
    { key: 'business', label: 'Business', visible: true },
    { key: 'jessicaWork', label: 'Jessica Work', visible: true },
    { key: 'chapter35', label: 'Chapter 35', visible: true },
    { key: 'totalIncome', label: 'Total Income', visible: true },
    { key: 'totalTaxes', label: 'Total Taxes', visible: true },
    { key: 'afterTaxIncome', label: 'After-Tax', visible: true },
    { key: 'livingExp', label: 'Living Exp', visible: true },
    { key: 'insurance', label: 'Insurance', visible: true }
  ];
  
  if (hasExpense1) {
    columns.push({ key: 'expense1', label: 'Expense 1', visible: true });
  }
  if (hasExpense2) {
    columns.push({ key: 'expense2', label: 'Expense 2', visible: true });
  }
  if (hasExpense3) {
    columns.push({ key: 'expense3', label: 'Expense 3', visible: true });
  }
  
  columns.push(
    { key: 'mortgage', label: 'Mortgage Payments', visible: true },
    { key: 'mortgageBalance', label: 'Mortgage Balance', visible: true },
    { key: 'netCashFlow', label: 'Net Cash Flow', visible: true },
    { key: 'returnOnInvestments', label: 'Return on Investments', visible: true },
    { key: 'investmentReturn', label: 'Investment Return', visible: true },
    { key: 'savingsBalance', label: 'Savings Balance', visible: true },
    { key: 'homeValue', label: 'Home Value', visible: true },
    { key: 'netWorth', label: 'Net Worth', visible: true }
  );
  
  return columns;
};

const getMonthlyColumns = (data: MonthlyData[]) => {
  const hasExpense1 = data.some(row => row.expense1 > 0);
  const hasExpense2 = data.some(row => row.expense2 > 0);
  const hasExpense3 = data.some(row => row.expense3 > 0);
  
  const columns = [
    { key: 'month', label: 'Month', visible: true, fixed: true },
    { key: 'paulSS', label: 'Paul SS', visible: true },
    { key: 'jessicaSS', label: 'Jessica SS', visible: true },
    { key: 'vaDisability', label: 'VA Disability', visible: true },
    { key: 'business', label: 'Business', visible: true },
    { key: 'jessicaWork', label: 'Jessica Work', visible: true },
    { key: 'chapter35', label: 'Chapter 35', visible: true },
    { key: 'grossIncome', label: 'Gross Income', visible: true },
    { key: 'taxes', label: 'Taxes', visible: true },
    { key: 'netIncome', label: 'Net Income', visible: true },
    { key: 'livingExp', label: 'Living Exp', visible: true },
    { key: 'insurance', label: 'Insurance', visible: true }
  ];
  
  if (hasExpense1) {
    columns.push({ key: 'expense1', label: 'Expense 1', visible: true });
  }
  if (hasExpense2) {
    columns.push({ key: 'expense2', label: 'Expense 2', visible: true });
  }
  if (hasExpense3) {
    columns.push({ key: 'expense3', label: 'Expense 3', visible: true });
  }
  
  columns.push(
    { key: 'mortgage', label: 'Mortgage Payment', visible: true },
    { key: 'mortgageBalance', label: 'Mortgage Balance', visible: true },
    { key: 'netCashFlow', label: 'Net Cash Flow', visible: true },
    { key: 'returnOnInvestments', label: 'Return on Investments', visible: true },
    { key: 'savingsBalance', label: 'Savings Balance', visible: true }
  );
  
  return columns;
};

export function ResultsTable({ 
  viewMode, 
  annualData, 
  monthlyData, 
  selectedYear, 
  onYearChange,
  projectionYears 
}: ResultsTableProps) {
  const annualColumns = getAnnualColumns(annualData);
  const monthlyColumns = getMonthlyColumns(monthlyData);
  
  const [visibleAnnualColumns, setVisibleAnnualColumns] = useState<Record<string, boolean>>(
    annualColumns.reduce((acc: Record<string, boolean>, col: any) => ({ ...acc, [col.key]: col.visible }), {} as Record<string, boolean>)
  );
  
  const [visibleMonthlyColumns, setVisibleMonthlyColumns] = useState<Record<string, boolean>>(
    monthlyColumns.reduce((acc: Record<string, boolean>, col: any) => ({ ...acc, [col.key]: col.visible }), {} as Record<string, boolean>)
  );

  const formatCurrency = (amount: number) => {
    const isNegative = amount < 0;
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(Math.round(amount)));
    
    return isNegative ? `-${formattedAmount}` : formattedAmount;
  };

  const getCashFlowColor = (amount: number) => {
    return amount >= 0 ? 'text-finance-green' : 'text-finance-red';
  };

  const yearOptions = Array.from({ length: projectionYears }, (_, i) => i + 1);

  const toggleColumnVisibility = (columnKey: string, isAnnual: boolean) => {
    if (isAnnual) {
      setVisibleAnnualColumns(prev => ({ ...prev, [columnKey]: !prev[columnKey] }));
    } else {
      setVisibleMonthlyColumns(prev => ({ ...prev, [columnKey]: !prev[columnKey] }));
    }
  };

  const currentColumns = viewMode === 'annual' ? annualColumns : monthlyColumns;
  const visibleColumns = viewMode === 'annual' ? visibleAnnualColumns : visibleMonthlyColumns;
  const filteredColumns = currentColumns.filter((col: any) => visibleColumns[col.key]);

  const renderCellValue = (columnKey: string, data: any) => {
    switch (columnKey) {
      case 'year':
      case 'month':
        return data[columnKey];
      case 'ages':
        return `${data.paulAge}/${data.jessicaAge}`;
      case 'paulAge':
      case 'jessicaAge':
        return data[columnKey];
      case 'paulSS':
      case 'jessicaSS':
      case 'vaDisability':
      case 'business':
      case 'jessicaWork':
      case 'chapter35':
      case 'totalIncome':
      case 'afterTaxIncome':
      case 'grossIncome':
      case 'netIncome':
      case 'investmentReturn':
      case 'savingsBalance':
      case 'homeValue':
      case 'mortgageBalance':
        return formatCurrency(data[columnKey]);
      case 'totalTaxes':
      case 'taxes':
      case 'livingExp':
        return formatCurrency(data[columnKey]);
      case 'insurance':
        return data[columnKey] > 0 ? formatCurrency(data[columnKey]) : '$0';
      case 'expense1':
      case 'expense2':
      case 'expense3':
        return data[columnKey] > 0 ? formatCurrency(data[columnKey]) : '$0';
      case 'mortgage':
        return data[columnKey] > 0 ? formatCurrency(data[columnKey]) : '$0';
      case 'netCashFlow':
        return formatCurrency(data[columnKey]);
      case 'returnOnInvestments':
        return formatCurrency(data[columnKey]);
      case 'netWorth':
        return formatCurrency(data[columnKey]);
      default:
        return data[columnKey];
    }
  };

  const getCellStyle = (columnKey: string, data: any) => {
    const baseClass = "px-4 py-3 text-sm";
    
    if (columnKey === 'year' || columnKey === 'month') {
      return `${baseClass} font-medium text-gray-900 sticky left-0 bg-white border-r border-gray-200`;
    }
    
    if (['totalTaxes', 'taxes', 'livingExp', 'insurance', 'expense1', 'expense2', 'expense3', 'mortgage'].includes(columnKey)) {
      return `${baseClass} text-finance-red`;
    }
    
    if (columnKey === 'netCashFlow') {
      return `${baseClass} font-medium ${getCashFlowColor(data[columnKey])}`;
    }
    
    if (columnKey === 'netWorth') {
      return `${baseClass} font-medium text-finance-green`;
    }
    
    if (columnKey === 'returnOnInvestments') {
      return `${baseClass} text-finance-green`;
    }
    
    if (['totalIncome', 'grossIncome'].includes(columnKey)) {
      return `${baseClass} font-medium text-gray-900`;
    }
    
    return `${baseClass} text-gray-900`;
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardContent className="p-0">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              <i className="fas fa-table text-finance-blue mr-2"></i>
              {viewMode === 'annual' ? 'Annual Cash Flow Projection' : 'Monthly Cash Flow Breakdown'}
            </h2>
            <div className="flex items-center space-x-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Columns
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h4 className="font-medium">Show/Hide Columns</h4>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                      {currentColumns.map((column: any) => (
                        <div key={column.key} className="flex items-center space-x-2">
                          <Checkbox
                            id={column.key}
                            checked={visibleColumns[column.key]}
                            onCheckedChange={() => toggleColumnVisibility(column.key, viewMode === 'annual')}
                            disabled={column.fixed}
                          />
                          <label
                            htmlFor={column.key}
                            className={`text-sm ${column.fixed ? 'text-gray-500' : 'text-gray-900 cursor-pointer'}`}
                          >
                            {column.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <span className="text-sm text-gray-600">Scroll horizontally →</span>
              {viewMode === 'monthly' && (
                <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        Year {year} ({2025 + year - 1})
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
                  {filteredColumns.map((column: any, index: number) => (
                    <th 
                      key={column.key}
                      className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] ${
                        column.key === 'year' ? 'sticky left-0 bg-gray-50 border-r border-gray-200 min-w-[80px]' : ''
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {annualData.map((year, index) => (
                  <tr key={year.year} className="hover:bg-gray-50 transition-colors">
                    {filteredColumns.map((column: any) => (
                      <td 
                        key={column.key}
                        className={getCellStyle(column.key, year)}
                      >
                        {renderCellValue(column.key, year)}
                      </td>
                    ))}
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
                  {filteredColumns.map((column: any, index: number) => (
                    <th 
                      key={column.key}
                      className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] ${
                        column.key === 'month' ? 'sticky left-0 bg-gray-50 border-r border-gray-200' : ''
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlyData.map((month, index) => (
                  <tr key={`${month.month}-${index}`} className="hover:bg-gray-50 transition-colors">
                    {filteredColumns.map((column: any) => (
                      <td 
                        key={column.key}
                        className={getCellStyle(column.key, month)}
                      >
                        {renderCellValue(column.key, month)}
                      </td>
                    ))}
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
