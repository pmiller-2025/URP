export interface PersonalInfo {
  paulAge: number;
  jessicaAge: number;
  paulBirthMonth: number;
  paulBirthYear: number;
  jessicaBirthMonth: number;
  jessicaBirthYear: number;
  lukeAge: number;
  lukeBirthMonth: number;
  lukeBirthYear: number;
  projectionYears: number;
}

export interface SocialSecurity {
  paulAmount: number;
  jessicaAmount: number;
  cola: number;
  paulTaxable: boolean;
  jessicaTaxable: boolean;
  paulStartAge: number;
  jessicaStartAge: number;
}

export interface SSBenefitOption {
  age: number;
  amount: number;
  description: string;
}

export const ssBenefitOptions: SSBenefitOption[] = [
  { age: 62, amount: 2211, description: "69% of full benefit - Early Retirement" },
  { age: 63, amount: 2336, description: "73% of full benefit" },
  { age: 64, amount: 2528, description: "79% of full benefit" },
  { age: 65, amount: 2748, description: "86% of full benefit" },
  { age: 66, amount: 2968, description: "93% of full benefit" },
  { age: 67, amount: 3188, description: "100% of full benefit - Full Retirement Age" },
  { age: 68, amount: 3324, description: "104% of full benefit - Delayed 1 year" },
  { age: 69, amount: 3589, description: "113% of full benefit" },
  { age: 70, amount: 3984, description: "125% of full benefit - Maximum Delayed" }
];

export interface OtherIncome {
  vaDisability: number;
  businessIncome: number;
  jessicaIncome: number;
  chapter35: number;
  businessDuration: number;
  businessStartMonth: number;
  businessStartYear: number;
  jessicaDuration: number;
  jessicaStartMonth: number;
  jessicaStartYear: number;
  chapter35Duration: number;
  chapter35StartMonth: number;
  chapter35StartYear: number;
  income1: number;
  income1Duration: number;
  income1StartMonth: number;
  income1StartYear: number;
  income2: number;
  income2Duration: number;
  income2StartMonth: number;
  income2StartYear: number;
  income3: number;
  income3Duration: number;
  income3StartMonth: number;
  income3StartYear: number;
}

export interface Housing {
  homeValue: number;
  mortgageBalance: number;
  monthlyPayment: number;
  interestRate: number;
  targetPayoffMonths: number;
  homeAppreciation: number;
  acceleratePayoff: boolean;
  lumpSumAmount: number;
  lumpSumMonth: number;
  lumpSumYear: number;
}

export interface Savings {
  initialAmount: number;
  annualReturn: number;
  additionalAnnual: number;
  taxOnGains: boolean;
  gainsTaxRate: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  isCustom: boolean;
}

export interface Expenses {
  budgetType: 'fixed' | 'detailed';
  basicLiving: number;
  detailedBudget: BudgetCategory[];
  lifeInsurance: number;
  lifeInsuranceStartMonth: number;
  lifeInsuranceStartYear: number;
  lifeInsuranceEndMonth: number;
  lifeInsuranceEndYear: number;
  inflationRate: number;
}

export interface TaxRates {
  socialSecurity: number;
  business: number;
  jessica: number;
}

export interface CalculatorState {
  personalInfo: PersonalInfo;
  socialSecurity: SocialSecurity;
  otherIncome: OtherIncome;
  housing: Housing;
  savings: Savings;
  expenses: Expenses;
  taxRates: TaxRates;
}

export interface MonthlyData {
  month: string;
  paulSS: number;
  jessicaSS: number;
  vaDisability: number;
  business: number;
  jessicaWork: number;
  chapter35: number;
  grossIncome: number;
  taxes: number;
  netIncome: number;
  livingExp: number;
  insurance: number;
  mortgage: number;
  netCashFlow: number;
  savingsBalance: number;
}

export interface AnnualData {
  year: number;
  paulAge: number;
  jessicaAge: number;
  paulSS: number;
  jessicaSS: number;
  vaDisability: number;
  business: number;
  jessicaWork: number;
  chapter35: number;
  totalIncome: number;
  totalTaxes: number;
  afterTaxIncome: number;
  livingExp: number;
  insurance: number;
  mortgage: number;
  netCashFlow: number;
  investmentReturn: number;
  savingsBalance: number;
  homeValue: number;
  mortgageBalance: number;
  netWorth: number;
}

export interface SummaryMetrics {
  finalNetWorth: number;
  totalTaxesPaid: number;
  avgMonthlyCashFlow: number;
  savingsGrowthPercent: number;
}

export function calculateAge(birthMonth: number, birthYear: number, currentMonth: number = 6, currentYear: number = 2025): number {
  let age = currentYear - birthYear;
  if (currentMonth < birthMonth) {
    age--;
  }
  return age;
}

export function getCurrentDate(): { month: number; year: number } {
  const now = new Date();
  return {
    month: now.getMonth() + 1, // JavaScript months are 0-indexed
    year: now.getFullYear()
  };
}

export const defaultBudgetCategories: BudgetCategory[] = [
  { id: 'housing', name: 'Housing & Utilities', amount: 1500, isCustom: false },
  { id: 'food', name: 'Food & Dining', amount: 800, isCustom: false },
  { id: 'transportation', name: 'Transportation', amount: 600, isCustom: false },
  { id: 'healthcare', name: 'Healthcare', amount: 400, isCustom: false },
  { id: 'entertainment', name: 'Entertainment & Recreation', amount: 300, isCustom: false },
  { id: 'personal', name: 'Personal Care', amount: 200, isCustom: false },
  { id: 'clothing', name: 'Clothing', amount: 150, isCustom: false },
  { id: 'gifts', name: 'Gifts & Donations', amount: 250, isCustom: false },
  { id: 'miscellaneous', name: 'Miscellaneous', amount: 300, isCustom: false }
];

export function getDefaultState(): CalculatorState {
  return {
    personalInfo: {
      paulAge: 62,
      jessicaAge: 56,
      paulBirthMonth: 7,
      paulBirthYear: 1962,
      jessicaBirthMonth: 12,
      jessicaBirthYear: 1968,
      lukeAge: 15,
      lukeBirthMonth: 9,
      lukeBirthYear: 2009,
      projectionYears: 20
    },
    socialSecurity: {
      paulAmount: 3324,
      jessicaAmount: 1662,
      cola: 3.0,
      paulTaxable: true,
      jessicaTaxable: true,
      paulStartAge: 68,
      jessicaStartAge: 68
    },
    otherIncome: {
      vaDisability: 4000,
      businessIncome: 4000,
      jessicaIncome: 1250,
      chapter35: 1000,
      businessDuration: 60,
      businessStartMonth: 1,
      businessStartYear: 1,
      jessicaDuration: 24,
      jessicaStartMonth: 1,
      jessicaStartYear: 1,
      chapter35Duration: 24,
      chapter35StartMonth: 1,
      chapter35StartYear: 1,
      income1: 0,
      income1Duration: 12,
      income1StartMonth: 1,
      income1StartYear: 1,
      income2: 0,
      income2Duration: 12,
      income2StartMonth: 1,
      income2StartYear: 1,
      income3: 0,
      income3Duration: 12,
      income3StartMonth: 1,
      income3StartYear: 1
    },
    housing: {
      homeValue: 1000000,
      mortgageBalance: 130000,
      monthlyPayment: 2000,
      interestRate: 5.5,
      targetPayoffMonths: 24,
      homeAppreciation: 2.5,
      acceleratePayoff: true,
      lumpSumAmount: 0,
      lumpSumMonth: 1,
      lumpSumYear: 1
    },
    savings: {
      initialAmount: 100000,
      annualReturn: 5.0,
      additionalAnnual: 0,
      taxOnGains: true,
      gainsTaxRate: 15
    },
    expenses: {
      budgetType: 'fixed',
      basicLiving: 5000,
      detailedBudget: [...defaultBudgetCategories],
      lifeInsurance: 500,
      lifeInsuranceStartMonth: 10,
      lifeInsuranceStartYear: 3,
      lifeInsuranceEndMonth: 4,
      lifeInsuranceEndYear: 11,
      inflationRate: 3.0
    },
    taxRates: {
      socialSecurity: 12,
      business: 22,
      jessica: 12
    }
  };
}

export function calculateMortgagePayment(balance: number, rate: number, months: number): number {
  if (balance <= 0 || months <= 0) return 0;
  const monthlyRate = rate / 100 / 12;
  if (monthlyRate === 0) return balance / months;
  
  const payment = balance * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  return payment;
}

export function calculateExtraPayment(balance: number, rate: number, regularPayment: number, targetMonths: number): number {
  if (balance <= 0) return 0;
  const requiredPayment = calculateMortgagePayment(balance, rate, targetMonths);
  return Math.max(0, requiredPayment - regularPayment);
}

export function calculateStandardPayoffMonths(balance: number, rate: number, payment: number): number {
  if (balance <= 0 || payment <= 0) return 0;
  const monthlyRate = rate / 100 / 12;
  if (monthlyRate === 0) return Math.ceil(balance / payment);
  
  const numerator = Math.log(1 + (balance * monthlyRate) / payment);
  const denominator = Math.log(1 + monthlyRate);
  return Math.ceil(numerator / denominator);
}

export function getPayoffDate(months: number): string {
  const currentDate = new Date(); // Use actual current date
  const payoffDate = new Date(currentDate);
  payoffDate.setMonth(payoffDate.getMonth() + months);
  
  return payoffDate.toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });
}

export function calculateTaxes(income: number, rate: number, isTaxable: boolean): number {
  return isTaxable ? income * (rate / 100) : 0;
}

export function calculateInflationAdjusted(baseAmount: number, rate: number, years: number): number {
  return baseAmount * Math.pow(1 + (rate / 100), years);
}

export function getTotalLivingExpenses(expenses: Expenses): number {
  if (expenses.budgetType === 'fixed' || !expenses.detailedBudget) {
    return expenses.basicLiving;
  } else {
    return expenses.detailedBudget.reduce((total, category) => total + category.amount, 0);
  }
}

export function calculateLifeInsuranceDuration(expenses: Expenses): number {
  if (!expenses.lifeInsuranceStartYear || !expenses.lifeInsuranceEndYear || 
      !expenses.lifeInsuranceStartMonth || !expenses.lifeInsuranceEndMonth) {
    return 0;
  }
  const startMonthOffset = (expenses.lifeInsuranceStartYear - 1) * 12 + (expenses.lifeInsuranceStartMonth - 1);
  const endMonthOffset = (expenses.lifeInsuranceEndYear - 1) * 12 + (expenses.lifeInsuranceEndMonth - 1);
  return Math.max(0, endMonthOffset - startMonthOffset + 1);
}

export function calculateLifeInsuranceTotalCost(expenses: Expenses): number {
  return expenses.lifeInsurance * calculateLifeInsuranceDuration(expenses);
}

export function calculateMonthlyProjections(state: CalculatorState, year: number): MonthlyData[] {
  const monthlyData: MonthlyData[] = [];
  const yearIndex = year - 1;
  
  // Calculate age-based SS eligibility
  const paulCurrentAge = state.personalInfo.paulAge + yearIndex;
  const jessicaCurrentAge = state.personalInfo.jessicaAge + yearIndex;
  
  const paulSSEligible = paulCurrentAge >= state.socialSecurity.paulStartAge;
  const jessicaSSEligible = jessicaCurrentAge >= state.socialSecurity.jessicaStartAge;
  
  // Calculate SS amounts with COLA adjustments
  const paulSSMonthly = paulSSEligible ? 
    calculateInflationAdjusted(state.socialSecurity.paulAmount, state.socialSecurity.cola, yearIndex) : 0;
  const jessicaSSMonthly = jessicaSSEligible ? 
    calculateInflationAdjusted(state.socialSecurity.jessicaAmount, state.socialSecurity.cola, yearIndex) : 0;
  
  // Calculate VA Disability with inflation
  const vaDisabilityMonthly = calculateInflationAdjusted(state.otherIncome.vaDisability, state.expenses.inflationRate, yearIndex);
  
  // Calculate business income with start month/year and duration
  const totalMonthsElapsed = yearIndex * 12;
  const businessStartMonthOffset = (state.otherIncome.businessStartYear - 1) * 12 + (state.otherIncome.businessStartMonth - 1);
  const businessMonthsElapsed = totalMonthsElapsed - businessStartMonthOffset;
  const businessMonthly = (businessMonthsElapsed >= 0 && businessMonthsElapsed < state.otherIncome.businessDuration) 
    ? state.otherIncome.businessIncome 
    : 0;
  
  // Calculate Jessica's income with start month/year and duration
  const jessicaStartMonthOffset = (state.otherIncome.jessicaStartYear - 1) * 12 + (state.otherIncome.jessicaStartMonth - 1);
  const jessicaMonthsElapsed = totalMonthsElapsed - jessicaStartMonthOffset;
  const jessicaWorkMonthly = (jessicaMonthsElapsed >= 0 && jessicaMonthsElapsed < state.otherIncome.jessicaDuration) 
    ? state.otherIncome.jessicaIncome 
    : 0;
  
  // Calculate Chapter 35 with start month/year and duration
  const chapter35StartMonthOffset = (state.otherIncome.chapter35StartYear - 1) * 12 + (state.otherIncome.chapter35StartMonth - 1);
  const chapter35MonthsElapsed = totalMonthsElapsed - chapter35StartMonthOffset;
  const chapter35Monthly = (chapter35MonthsElapsed >= 0 && chapter35MonthsElapsed < state.otherIncome.chapter35Duration) 
    ? state.otherIncome.chapter35 
    : 0;

  // Calculate Additional Income streams (only if amount > 0)
  const income1StartMonthOffset = (state.otherIncome.income1StartYear - 1) * 12 + (state.otherIncome.income1StartMonth - 1);
  const income1MonthsElapsed = totalMonthsElapsed - income1StartMonthOffset;
  const income1Monthly = (state.otherIncome.income1 > 0 && income1MonthsElapsed >= 0 && income1MonthsElapsed < state.otherIncome.income1Duration) 
    ? state.otherIncome.income1 
    : 0;

  const income2StartMonthOffset = (state.otherIncome.income2StartYear - 1) * 12 + (state.otherIncome.income2StartMonth - 1);
  const income2MonthsElapsed = totalMonthsElapsed - income2StartMonthOffset;
  const income2Monthly = (state.otherIncome.income2 > 0 && income2MonthsElapsed >= 0 && income2MonthsElapsed < state.otherIncome.income2Duration) 
    ? state.otherIncome.income2 
    : 0;

  const income3StartMonthOffset = (state.otherIncome.income3StartYear - 1) * 12 + (state.otherIncome.income3StartMonth - 1);
  const income3MonthsElapsed = totalMonthsElapsed - income3StartMonthOffset;
  const income3Monthly = (state.otherIncome.income3 > 0 && income3MonthsElapsed >= 0 && income3MonthsElapsed < state.otherIncome.income3Duration) 
    ? state.otherIncome.income3 
    : 0;
  
  // Calculate living expenses with inflation
  const baseLivingExpenses = getTotalLivingExpenses(state.expenses);
  const livingExpMonthly = calculateInflationAdjusted(baseLivingExpenses, state.expenses.inflationRate, yearIndex);
  
  // Calculate life insurance with start/end month/year
  const lifeInsuranceStartMonthOffset = (state.expenses.lifeInsuranceStartYear - 1) * 12 + (state.expenses.lifeInsuranceStartMonth - 1);
  const lifeInsuranceEndMonthOffset = (state.expenses.lifeInsuranceEndYear - 1) * 12 + (state.expenses.lifeInsuranceEndMonth - 1);
  const insuranceMonthly = (totalMonthsElapsed >= lifeInsuranceStartMonthOffset && totalMonthsElapsed <= lifeInsuranceEndMonthOffset) 
    ? state.expenses.lifeInsurance 
    : 0;
  
  // Get current mortgage balance from annual projections (accounts for lump sum)
  const annualData = calculateAnnualProjections(state);
  let currentMortgageBalance = yearIndex > 0 ? annualData[yearIndex - 1].mortgageBalance : state.housing.mortgageBalance;
  
  // Check if lump sum payment applies this year
  const lumpSumMonthOffset = (state.housing.lumpSumYear - 1) * 12 + (state.housing.lumpSumMonth - 1);
  const yearStartMonthOffset = yearIndex * 12;
  const yearEndMonthOffset = (yearIndex + 1) * 12;
  
  if (state.housing.lumpSumAmount > 0 && lumpSumMonthOffset >= yearStartMonthOffset && lumpSumMonthOffset < yearEndMonthOffset) {
    const lumpSumMonthInYear = lumpSumMonthOffset - yearStartMonthOffset;
    // Apply lump sum at the beginning of the month it occurs
    if (lumpSumMonthInYear === 0) {
      currentMortgageBalance = Math.max(0, currentMortgageBalance - state.housing.lumpSumAmount);
    }
  }
  
  // Calculate mortgage payment based on remaining balance
  const extraPayment = state.housing.acceleratePayoff ? calculateExtraPayment(
    currentMortgageBalance, 
    state.housing.interestRate, 
    state.housing.monthlyPayment, 
    state.housing.targetPayoffMonths
  ) : 0;
  const totalMortgagePayment = state.housing.monthlyPayment + extraPayment;
  
  // Determine if mortgage is still active
  const mortgageActive = currentMortgageBalance > 0;
  const mortgageMonthly = mortgageActive ? totalMortgagePayment : 0;
  
  let runningBalance = state.savings.initialAmount;
  if (yearIndex > 0) {
    runningBalance = annualData[yearIndex - 1].savingsBalance;
  }
  
  for (let month = 0; month < 12; month++) {
    const currentMonthOffset = yearIndex * 12 + month;
    const monthName = new Date(2024 + yearIndex, month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // Apply lump sum payment if it occurs this month
    let lumpSumPayment = 0;
    if (state.housing.lumpSumAmount > 0 && currentMonthOffset === lumpSumMonthOffset) {
      lumpSumPayment = Math.min(state.housing.lumpSumAmount, currentMortgageBalance);
      currentMortgageBalance = Math.max(0, currentMortgageBalance - lumpSumPayment);
    }
    
    // Recalculate mortgage payment for current balance
    const currentExtraPayment = state.housing.acceleratePayoff ? calculateExtraPayment(
      currentMortgageBalance, 
      state.housing.interestRate, 
      state.housing.monthlyPayment, 
      state.housing.targetPayoffMonths
    ) : 0;
    const currentTotalMortgagePayment = state.housing.monthlyPayment + currentExtraPayment;
    const currentMortgageActive = currentMortgageBalance > 0;
    const currentMortgageMonthly = currentMortgageActive ? currentTotalMortgagePayment : 0;
    
    // Update mortgage balance for next month
    if (currentMortgageActive && currentMortgageMonthly > 0) {
      const monthlyInterest = currentMortgageBalance * (state.housing.interestRate / 100 / 12);
      const monthlyPrincipal = Math.min(currentMortgageMonthly - monthlyInterest, currentMortgageBalance);
      currentMortgageBalance = Math.max(0, currentMortgageBalance - monthlyPrincipal);
    }
    
    const grossIncome = paulSSMonthly + jessicaSSMonthly + vaDisabilityMonthly + businessMonthly + jessicaWorkMonthly + chapter35Monthly + income1Monthly + income2Monthly + income3Monthly;
    
    const taxes = 
      calculateTaxes(paulSSMonthly, state.taxRates.socialSecurity, state.socialSecurity.paulTaxable) +
      calculateTaxes(jessicaSSMonthly, state.taxRates.socialSecurity, state.socialSecurity.jessicaTaxable) +
      calculateTaxes(businessMonthly, state.taxRates.business, true) +
      calculateTaxes(jessicaWorkMonthly, state.taxRates.jessica, true);
    
    const netIncome = grossIncome - taxes;
    const netCashFlow = netIncome - livingExpMonthly - insuranceMonthly - currentMortgageMonthly - lumpSumPayment;
    
    // All positive cash flow goes to savings, negative cash flow comes from savings
    runningBalance += netCashFlow;
    
    monthlyData.push({
      month: monthName,
      paulSS: paulSSMonthly,
      jessicaSS: jessicaSSMonthly,
      vaDisability: vaDisabilityMonthly,
      business: businessMonthly,
      jessicaWork: jessicaWorkMonthly,
      chapter35: chapter35Monthly,
      grossIncome,
      taxes,
      netIncome,
      livingExp: livingExpMonthly,
      insurance: insuranceMonthly,
      mortgage: currentMortgageMonthly,
      netCashFlow,
      savingsBalance: runningBalance
    });
  }
  
  return monthlyData;
}

export function calculateAnnualProjections(state: CalculatorState): AnnualData[] {
  const annualData: AnnualData[] = [];
  let currentSavingsBalance = state.savings.initialAmount;
  let currentMortgageBalance = state.housing.mortgageBalance;
  
  for (let year = 1; year <= state.personalInfo.projectionYears; year++) {
    const yearIndex = year - 1;
    const paulAge = state.personalInfo.paulAge + yearIndex;
    const jessicaAge = state.personalInfo.jessicaAge + yearIndex;
    
    // Calculate age-based SS eligibility
    const paulSSEligible = paulAge >= state.socialSecurity.paulStartAge;
    const jessicaSSEligible = jessicaAge >= state.socialSecurity.jessicaStartAge;
    
    // Calculate annual SS amounts with COLA
    const paulSSAnnual = paulSSEligible ? 
      calculateInflationAdjusted(state.socialSecurity.paulAmount * 12, state.socialSecurity.cola, yearIndex) : 0;
    const jessicaSSAnnual = jessicaSSEligible ? 
      calculateInflationAdjusted(state.socialSecurity.jessicaAmount * 12, state.socialSecurity.cola, yearIndex) : 0;
    
    // Calculate VA Disability with inflation
    const vaDisabilityAnnual = calculateInflationAdjusted(state.otherIncome.vaDisability * 12, state.expenses.inflationRate, yearIndex);
    
    // Calculate business income (limited duration with start month/year)
    const monthsElapsed = yearIndex * 12;
    const businessStartMonthOffset = (state.otherIncome.businessStartYear - 1) * 12 + (state.otherIncome.businessStartMonth - 1);
    const businessMonthsElapsed = monthsElapsed - businessStartMonthOffset;
    
    let businessMonthsThisYear = 0;
    if (businessMonthsElapsed >= 0 && businessMonthsElapsed < state.otherIncome.businessDuration) {
      const businessMonthsRemaining = state.otherIncome.businessDuration - businessMonthsElapsed;
      businessMonthsThisYear = Math.min(12, businessMonthsRemaining);
    } else if (businessMonthsElapsed < 0) {
      const monthsUntilStart = -businessMonthsElapsed;
      if (monthsUntilStart < 12) {
        businessMonthsThisYear = Math.min(12 - monthsUntilStart, state.otherIncome.businessDuration);
      }
    }
    const businessAnnual = state.otherIncome.businessIncome * businessMonthsThisYear;
    
    // Calculate Jessica's income (limited duration with start month/year)
    const jessicaStartMonthOffset = (state.otherIncome.jessicaStartYear - 1) * 12 + (state.otherIncome.jessicaStartMonth - 1);
    const jessicaMonthsElapsed = monthsElapsed - jessicaStartMonthOffset;
    
    let jessicaMonthsThisYear = 0;
    if (jessicaMonthsElapsed >= 0 && jessicaMonthsElapsed < state.otherIncome.jessicaDuration) {
      const jessicaMonthsRemaining = state.otherIncome.jessicaDuration - jessicaMonthsElapsed;
      jessicaMonthsThisYear = Math.min(12, jessicaMonthsRemaining);
    } else if (jessicaMonthsElapsed < 0) {
      const monthsUntilStart = -jessicaMonthsElapsed;
      if (monthsUntilStart < 12) {
        jessicaMonthsThisYear = Math.min(12 - monthsUntilStart, state.otherIncome.jessicaDuration);
      }
    }
    const jessicaAnnual = state.otherIncome.jessicaIncome * jessicaMonthsThisYear;
    
    // Calculate Chapter 35 (limited duration with start month/year)
    const chapter35StartMonthOffset = (state.otherIncome.chapter35StartYear - 1) * 12 + (state.otherIncome.chapter35StartMonth - 1);
    const chapter35MonthsElapsed = monthsElapsed - chapter35StartMonthOffset;
    
    let chapter35MonthsThisYear = 0;
    if (chapter35MonthsElapsed >= 0 && chapter35MonthsElapsed < state.otherIncome.chapter35Duration) {
      const chapter35MonthsRemaining = state.otherIncome.chapter35Duration - chapter35MonthsElapsed;
      chapter35MonthsThisYear = Math.min(12, chapter35MonthsRemaining);
    } else if (chapter35MonthsElapsed < 0) {
      // Chapter 35 starts later in the projection period
      const monthsUntilStart = -chapter35MonthsElapsed;
      if (monthsUntilStart < 12) {
        chapter35MonthsThisYear = Math.min(12 - monthsUntilStart, state.otherIncome.chapter35Duration);
      }
    }
    
    const chapter35Annual = state.otherIncome.chapter35 * chapter35MonthsThisYear;
    
    // Calculate Additional Income streams (annual, only if amount > 0)
    let income1Annual = 0;
    if (state.otherIncome.income1 > 0) {
      const income1StartMonthOffset = (state.otherIncome.income1StartYear - 1) * 12 + (state.otherIncome.income1StartMonth - 1);
      const income1MonthsElapsed = monthsElapsed - income1StartMonthOffset;
      let income1MonthsThisYear = 0;
      if (income1MonthsElapsed >= 0 && income1MonthsElapsed < state.otherIncome.income1Duration) {
        const income1MonthsRemaining = state.otherIncome.income1Duration - income1MonthsElapsed;
        income1MonthsThisYear = Math.min(12, income1MonthsRemaining);
      } else if (income1MonthsElapsed < 0) {
        const monthsUntilStart = -income1MonthsElapsed;
        if (monthsUntilStart < 12) {
          income1MonthsThisYear = Math.min(12 - monthsUntilStart, state.otherIncome.income1Duration);
        }
      }
      income1Annual = state.otherIncome.income1 * income1MonthsThisYear;
    }

    let income2Annual = 0;
    if (state.otherIncome.income2 > 0) {
      const income2StartMonthOffset = (state.otherIncome.income2StartYear - 1) * 12 + (state.otherIncome.income2StartMonth - 1);
      const income2MonthsElapsed = monthsElapsed - income2StartMonthOffset;
      let income2MonthsThisYear = 0;
      if (income2MonthsElapsed >= 0 && income2MonthsElapsed < state.otherIncome.income2Duration) {
        const income2MonthsRemaining = state.otherIncome.income2Duration - income2MonthsElapsed;
        income2MonthsThisYear = Math.min(12, income2MonthsRemaining);
      } else if (income2MonthsElapsed < 0) {
        const monthsUntilStart = -income2MonthsElapsed;
        if (monthsUntilStart < 12) {
          income2MonthsThisYear = Math.min(12 - monthsUntilStart, state.otherIncome.income2Duration);
        }
      }
      income2Annual = state.otherIncome.income2 * income2MonthsThisYear;
    }

    let income3Annual = 0;
    if (state.otherIncome.income3 > 0) {
      const income3StartMonthOffset = (state.otherIncome.income3StartYear - 1) * 12 + (state.otherIncome.income3StartMonth - 1);
      const income3MonthsElapsed = monthsElapsed - income3StartMonthOffset;
      let income3MonthsThisYear = 0;
      if (income3MonthsElapsed >= 0 && income3MonthsElapsed < state.otherIncome.income3Duration) {
        const income3MonthsRemaining = state.otherIncome.income3Duration - income3MonthsElapsed;
        income3MonthsThisYear = Math.min(12, income3MonthsRemaining);
      } else if (income3MonthsElapsed < 0) {
        const monthsUntilStart = -income3MonthsElapsed;
        if (monthsUntilStart < 12) {
          income3MonthsThisYear = Math.min(12 - monthsUntilStart, state.otherIncome.income3Duration);
        }
      }
      income3Annual = state.otherIncome.income3 * income3MonthsThisYear;
    }
    
    const totalIncome = paulSSAnnual + jessicaSSAnnual + vaDisabilityAnnual + businessAnnual + jessicaAnnual + chapter35Annual + income1Annual + income2Annual + income3Annual;
    
    // Calculate taxes
    const totalTaxes = 
      calculateTaxes(paulSSAnnual, state.taxRates.socialSecurity, state.socialSecurity.paulTaxable) +
      calculateTaxes(jessicaSSAnnual, state.taxRates.socialSecurity, state.socialSecurity.jessicaTaxable) +
      calculateTaxes(businessAnnual, state.taxRates.business, true) +
      calculateTaxes(jessicaAnnual, state.taxRates.jessica, true);
    
    const afterTaxIncome = totalIncome - totalTaxes;
    
    // Calculate expenses
    const baseLivingExpenses = getTotalLivingExpenses(state.expenses);
    const livingExpAnnual = calculateInflationAdjusted(baseLivingExpenses * 12, state.expenses.inflationRate, yearIndex);
    
    // Calculate life insurance annual (with start/end month/year)
    const lifeInsuranceStartMonthOffset = (state.expenses.lifeInsuranceStartYear - 1) * 12 + (state.expenses.lifeInsuranceStartMonth - 1);
    const lifeInsuranceEndMonthOffset = (state.expenses.lifeInsuranceEndYear - 1) * 12 + (state.expenses.lifeInsuranceEndMonth - 1);
    let lifeInsuranceMonthsThisYear = 0;
    
    for (let month = 0; month < 12; month++) {
      const currentMonthOffset = monthsElapsed + month;
      if (currentMonthOffset >= lifeInsuranceStartMonthOffset && currentMonthOffset <= lifeInsuranceEndMonthOffset) {
        lifeInsuranceMonthsThisYear++;
      }
    }
    
    const insuranceAnnual = state.expenses.lifeInsurance * lifeInsuranceMonthsThisYear;
    
    // Calculate mortgage payments
    const extraPayment = state.housing.acceleratePayoff ? calculateExtraPayment(
      state.housing.mortgageBalance, 
      state.housing.interestRate, 
      state.housing.monthlyPayment, 
      state.housing.targetPayoffMonths
    ) : 0;
    const totalMortgagePayment = (state.housing.monthlyPayment + extraPayment) * 12;
    
    // Determine if mortgage is paid off
    const mortgageMonthsElapsed = monthsElapsed;
    const payoffMonths = state.housing.acceleratePayoff ? 
      state.housing.targetPayoffMonths : 
      calculateStandardPayoffMonths(state.housing.mortgageBalance, state.housing.interestRate, state.housing.monthlyPayment);
    const mortgageActive = mortgageMonthsElapsed < payoffMonths;
    const mortgageAnnual = mortgageActive ? totalMortgagePayment : 0;
    
    const netCashFlow = afterTaxIncome - livingExpAnnual - insuranceAnnual - mortgageAnnual;
    
    // Calculate investment returns
    const beginningBalance = currentSavingsBalance;
    const investmentReturn = beginningBalance * (state.savings.annualReturn / 100);
    const taxOnGains = state.savings.taxOnGains ? investmentReturn * (state.savings.gainsTaxRate / 100) : 0;
    const netInvestmentReturn = investmentReturn - taxOnGains;
    
    // All positive cash flow automatically increases savings, negative cash flow comes from savings
    currentSavingsBalance += netCashFlow + netInvestmentReturn + state.savings.additionalAnnual;
    
    // Calculate mortgage balance
    if (mortgageActive) {
      // Apply lump sum payment if it occurs in this year
      if (state.housing.lumpSumAmount > 0) {
        const lumpSumMonthOffset = (state.housing.lumpSumYear - 1) * 12 + (state.housing.lumpSumMonth - 1);
        const currentYearStart = monthsElapsed;
        const currentYearEnd = monthsElapsed + 12;
        
        if (lumpSumMonthOffset >= currentYearStart && lumpSumMonthOffset < currentYearEnd) {
          currentMortgageBalance = Math.max(0, currentMortgageBalance - state.housing.lumpSumAmount);
        }
      }
      
      // Simple calculation - in reality this would be more complex amortization
      const monthlyPrincipal = (state.housing.monthlyPayment + extraPayment) - (currentMortgageBalance * state.housing.interestRate / 100 / 12);
      currentMortgageBalance = Math.max(0, currentMortgageBalance - (monthlyPrincipal * 12));
    } else {
      currentMortgageBalance = 0;
    }
    
    // Calculate home value with appreciation
    const homeValue = calculateInflationAdjusted(state.housing.homeValue, state.housing.homeAppreciation, yearIndex);
    
    // Calculate net worth
    const netWorth = homeValue + currentSavingsBalance - currentMortgageBalance;
    
    annualData.push({
      year: 2024 + yearIndex,
      paulAge,
      jessicaAge,
      paulSS: paulSSAnnual,
      jessicaSS: jessicaSSAnnual,
      vaDisability: vaDisabilityAnnual,
      business: businessAnnual,
      jessicaWork: jessicaAnnual,
      chapter35: chapter35Annual,
      totalIncome,
      totalTaxes,
      afterTaxIncome,
      livingExp: livingExpAnnual,
      insurance: insuranceAnnual,
      mortgage: mortgageAnnual,
      netCashFlow,
      investmentReturn: netInvestmentReturn,
      savingsBalance: currentSavingsBalance,
      homeValue,
      mortgageBalance: currentMortgageBalance,
      netWorth
    });
  }
  
  return annualData;
}

export function calculateSummaryMetrics(annualData: AnnualData[], state: CalculatorState): SummaryMetrics {
  const finalYear = annualData[annualData.length - 1];
  const totalTaxesPaid = annualData.reduce((sum, year) => sum + year.totalTaxes, 0);
  const totalCashFlow = annualData.reduce((sum, year) => sum + year.netCashFlow, 0);
  const avgMonthlyCashFlow = totalCashFlow / (state.personalInfo.projectionYears * 12);
  
  const initialNetWorth = state.housing.homeValue + state.savings.initialAmount - state.housing.mortgageBalance;
  const savingsGrowthPercent = ((finalYear.netWorth - initialNetWorth) / initialNetWorth) * 100;
  
  return {
    finalNetWorth: finalYear.netWorth,
    totalTaxesPaid,
    avgMonthlyCashFlow,
    savingsGrowthPercent
  };
}
