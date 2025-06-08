import { useState, useEffect } from "react";
import { InputSection } from "@/components/retirement/input-section";
import { SummaryCards } from "@/components/retirement/summary-cards";
import { ResultsTable } from "@/components/retirement/results-table";
import { SavingsChart } from "@/components/retirement/savings-chart";
import { Button } from "@/components/ui/button";
import { 
  CalculatorState, 
  getDefaultState, 
  calculateAnnualProjections, 
  calculateMonthlyProjections,
  calculateSummaryMetrics,
  calculateExtraPayment
} from "@/lib/calculator";

type ViewMode = 'annual' | 'monthly';

export default function RetirementCalculator() {
  const [state, setState] = useState<CalculatorState>(getDefaultState());
  const [viewMode, setViewMode] = useState<ViewMode>('annual');
  const [selectedYear, setSelectedYear] = useState(1);
  
  // Calculate projections whenever state changes
  const annualData = calculateAnnualProjections(state);
  const monthlyData = calculateMonthlyProjections(state, selectedYear);
  const summaryMetrics = calculateSummaryMetrics(annualData, state);
  
  // Calculate extra payment for display
  const extraPayment = calculateExtraPayment(
    state.housing.mortgageBalance,
    state.housing.interestRate,
    state.housing.monthlyPayment,
    state.housing.targetPayoffMonths
  );

  // Update Jessica's SS amount automatically (50% of Paul's)
  useEffect(() => {
    setState(prev => ({
      ...prev,
      socialSecurity: {
        ...prev.socialSecurity,
        jessicaAmount: prev.socialSecurity.paulAmount * 0.5
      }
    }));
  }, [state.socialSecurity.paulAmount]);

  const handleStateUpdate = (section: keyof CalculatorState, updates: any) => {
    setState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-calculator text-2xl text-finance-blue"></i>
              <h1 className="text-2xl font-bold text-gray-900">Retirement Cash Flow Calculator</h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">20-Year Projection</span>
              <div className="w-2 h-2 bg-finance-green rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <InputSection 
          state={state} 
          onUpdate={handleStateUpdate}
          extraPayment={extraPayment}
        />

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 inline-flex">
            <Button
              variant={viewMode === 'annual' ? 'default' : 'ghost'}
              onClick={() => setViewMode('annual')}
              className={viewMode === 'annual' ? 'bg-finance-blue text-white' : 'text-gray-600 hover:text-gray-900'}
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Annual View
            </Button>
            <Button
              variant={viewMode === 'monthly' ? 'default' : 'ghost'}
              onClick={() => setViewMode('monthly')}
              className={viewMode === 'monthly' ? 'bg-finance-blue text-white' : 'text-gray-600 hover:text-gray-900'}
            >
              <i className="fas fa-calendar mr-2"></i>
              Monthly View
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards metrics={summaryMetrics} />

        {/* Chart */}
        <SavingsChart annualData={annualData} />

        {/* Results Table */}
        <ResultsTable 
          viewMode={viewMode}
          annualData={annualData}
          monthlyData={monthlyData}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          projectionYears={state.personalInfo.projectionYears}
        />
      </div>
    </div>
  );
}
