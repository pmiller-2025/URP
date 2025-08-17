import { useState, useEffect } from "react";
import { InputSection } from "@/components/retirement/input-section";
import { SummaryCards } from "@/components/retirement/summary-cards";
import { ResultsTable } from "@/components/retirement/results-table";
import { SavingsChart } from "@/components/retirement/savings-chart";
import { CashFlowChart } from "@/components/retirement/cash-flow-chart";
import { ScenarioManager } from "@/components/retirement/scenario-manager";
import { AIDialogue } from "@/components/retirement/ai-dialogue";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CalculatorState, 
  getDefaultState, 
  calculateAnnualProjections, 
  calculateMonthlyProjections,
  calculateSummaryMetrics,
  calculateExtraPayment,
  calculateStandardPayoffMonths,
  getPayoffDate
} from "@/lib/calculator";

type ViewMode = 'annual' | 'monthly';
type ChartType = 'savings' | 'cashflow';

export default function RetirementCalculator() {
  const [state, setState] = useState<CalculatorState>(() => {
    // Load saved defaults from localStorage if they exist, but check if they need updating
    const savedDefaults = localStorage.getItem('urp-default-state');
    if (savedDefaults) {
      const parsed = JSON.parse(savedDefaults);
      let needsUpdate = false;
      
      // Check if the saved defaults have the old end of life values and update them
      if (parsed.personalInfo?.paulEndOfLifeAge === 85) {
        parsed.personalInfo.paulEndOfLifeAge = 100;
        needsUpdate = true;
      }
      if (parsed.personalInfo?.jessicaEndOfLifeAge === 90) {
        parsed.personalInfo.jessicaEndOfLifeAge = 100;
        needsUpdate = true;
      }
      
      // Update Jessica's income to new default if it's still the old value
      if (parsed.otherIncome?.jessicaIncome === 1250) {
        parsed.otherIncome.jessicaIncome = 2000;
        needsUpdate = true;
      }
      
      // Update Social Security defaults to new values
      if (parsed.socialSecurity?.paulAmount !== 3968) {
        parsed.socialSecurity.paulAmount = 3968;
        needsUpdate = true;
      }
      if (parsed.socialSecurity?.jessicaAmount !== 872) {
        parsed.socialSecurity.jessicaAmount = 872;
        needsUpdate = true;
      }
      if (parsed.socialSecurity?.jessicaSpousalAmount !== 263) {
        parsed.socialSecurity.jessicaSpousalAmount = 263;
        needsUpdate = true;
      }
      
      // Update mortgage balance to new default
      if (parsed.housing?.mortgageBalance !== 37400) {
        parsed.housing.mortgageBalance = 37400;
        needsUpdate = true;
      }
      
      // Update lump sum payment to new default
      if (parsed.housing?.lumpSumAmount !== 0) {
        parsed.housing.lumpSumAmount = 0;
        needsUpdate = true;
      }
      
      // Update target payoff months to new default
      if (parsed.housing?.targetPayoffMonths !== 10) {
        parsed.housing.targetPayoffMonths = 10;
        needsUpdate = true;
      }
      
      // Update Jessica's work duration to new default
      if (parsed.otherIncome?.jessicaDuration !== 12) {
        parsed.otherIncome.jessicaDuration = 12;
        needsUpdate = true;
      }
      
      // Update Paul's birth month back to original (June)
      if (parsed.personalInfo?.paulBirthMonth !== 6) {
        parsed.personalInfo.paulBirthMonth = 6;
        needsUpdate = true;
      }
      
      // Update Jessica's birth month back to original (December)
      if (parsed.personalInfo?.jessicaBirthMonth !== 12) {
        parsed.personalInfo.jessicaBirthMonth = 12;
        needsUpdate = true;
      }
      
      // Update initial savings balance to new default
      if (parsed.savings?.initialAmount !== 30000) {
        parsed.savings.initialAmount = 30000;
        needsUpdate = true;
      }
      
      // Save the updated defaults back if any changes were made
      if (needsUpdate) {
        localStorage.setItem('urp-default-state', JSON.stringify(parsed));
      }
      
      return parsed;
    }
    return getDefaultState();
  });
  const [viewMode, setViewMode] = useState<ViewMode>('annual');
  const [selectedYear, setSelectedYear] = useState(1);
  const [chartType, setChartType] = useState<ChartType>('savings');
  
  // Force update end of life ages to new defaults if they're still using old values
  useEffect(() => {
    if (state.personalInfo.paulEndOfLifeAge === 85 || state.personalInfo.jessicaEndOfLifeAge === 90) {
      setState(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          paulEndOfLifeAge: 100,
          jessicaEndOfLifeAge: 100
        }
      }));
    }
  }, [state.personalInfo.paulEndOfLifeAge, state.personalInfo.jessicaEndOfLifeAge]);
  
  // Calculate projections whenever state changes
  const annualData = calculateAnnualProjections(state);
  const monthlyData = calculateMonthlyProjections(state, selectedYear);
  const summaryMetrics = calculateSummaryMetrics(annualData, state);
  
  // Calculate mortgage payment details for display
  const extraPayment = state.housing.acceleratePayoff ? calculateExtraPayment(
    state.housing.mortgageBalance,
    state.housing.interestRate,
    state.housing.monthlyPayment,
    state.housing.targetPayoffMonths
  ) : 0;
  
  const standardPayoffMonths = calculateStandardPayoffMonths(
    state.housing.mortgageBalance,
    state.housing.interestRate,
    state.housing.monthlyPayment
  );
  
  const actualPayoffMonths = state.housing.acceleratePayoff ? state.housing.targetPayoffMonths : standardPayoffMonths;
  const payoffDate = getPayoffDate(actualPayoffMonths);

  // No automatic updates needed - SS amounts are now set by age selection

  const handleStateUpdate = (section: keyof CalculatorState, updates: any) => {
    setState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  const handleSetAsDefault = () => {
    if (window.confirm('Set current values as new defaults? This will save your current settings as the default configuration.')) {
      // Save current state to localStorage as new defaults
      localStorage.setItem('urp-default-state', JSON.stringify(state));
      alert('Current values have been saved as your new defaults!');
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset to your saved defaults? This will restore your personalized default values.')) {
      // Try to load custom defaults from localStorage, fall back to original defaults
      const savedDefaults = localStorage.getItem('urp-default-state');
      if (savedDefaults) {
        setState(JSON.parse(savedDefaults));
      } else {
        setState(getDefaultState());
      }
      setSelectedYear(1);
    }
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
            <div className="flex items-center space-x-4">
              <ScenarioManager 
                currentState={state} 
                onLoadScenario={setState}
              />
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={handleSetAsDefault}
                  className="text-blue-600 hover:text-blue-700 border-blue-300 hover:border-blue-400"
                >
                  <i className="fas fa-save mr-2"></i>
                  Set as Default
                </Button>
                <Button
                  variant="outline"
                  onClick={handleResetToDefault}
                  className="text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400"
                >
                  <i className="fas fa-undo-alt mr-2"></i>
                  Reset to Default
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{state.personalInfo.projectionYears}-Year Projection</span>
                <div className="w-2 h-2 bg-finance-green rounded-full animate-pulse"></div>
              </div>
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
          standardPayoffMonths={standardPayoffMonths}
          payoffDate={payoffDate}
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

        {/* AI Dialogue Section */}
        <AIDialogue 
          currentState={state}
          onStateUpdate={setState}
        />

        {/* Summary Cards */}
        <SummaryCards metrics={summaryMetrics} projectionYears={state.personalInfo.projectionYears} />

        {/* Chart Selection */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            <i className="fas fa-chart-area text-finance-blue mr-2"></i>
            Financial Analysis Charts
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Chart Type:</span>
            <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings & Net Worth</SelectItem>
                <SelectItem value="cashflow">Cash Flow Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Render selected chart */}
        {chartType === 'savings' && <SavingsChart annualData={annualData} />}
        {chartType === 'cashflow' && <CashFlowChart monthlyData={monthlyData} />}

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
