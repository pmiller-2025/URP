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
  paulEndOfLifeAge: number;
  jessicaEndOfLifeAge: number;
}

export interface SocialSecurity {
  paulAmount: number;
  jessicaAmount: number;
  jessicaSpousalAmount: number; // 50% of Paul's benefit
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
  { age: 63, amount: 2406, description: "73% of full benefit + 1 year COLA (3%)" },
  { age: 64, amount: 2686, description: "79% of full benefit + 2 years COLA (3%)" },
  { age: 65, amount: 3005, description: "86% of full benefit + 3 years COLA (3%)" },
  { age: 66, amount: 3341, description: "93% of full benefit + 4 years COLA (3%)" },
  { age: 67, amount: 3697, description: "100% of full benefit + 5 years COLA (3%) - Full Retirement Age" },
  { age: 68, amount: 4199, description: "104% of full benefit + 6 years COLA (3%) - Delayed 1 year" },
  { age: 69, amount: 4537, description: "113% of full benefit + 7 years COLA (3%)" },
  { age: 70, amount: 5034, description: "125% of full benefit + 8 years COLA (3%) - Maximum Delayed" }
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
  allocationStrategy: 'conservative' | 'balanced' | 'aggressive' | 'custom';
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
  expense1: number;
  expense1Name: string;
  expense1Duration: number;
  expense1StartMonth: number;
  expense1StartYear: number;
  expense2: number;
  expense2Name: string;
  expense2Duration: number;
  expense2StartMonth: number;
  expense2StartYear: number;
  expense3: number;
  expense3Name: string;
  expense3Duration: number;
  expense3StartMonth: number;
  expense3StartYear: number;
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
  expense1: number;
  expense2: number;
  expense3: number;
  mortgage: number;
  mortgageBalance: number;
  netCashFlow: number;
  returnOnInvestments: number;
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
  expense1: number;
  expense2: number;
  expense3: number;
  mortgage: number;
  netCashFlow: number;
  returnOnInvestments: number;
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
  totalInterestPaid: number;
  standardInterestTotal: number;
  interestSaved: number;
  mortgagePayoffDate: string;
  standardPayoffDate: string;
}

export function calculateAge(birthMonth: number, birthYear: number, currentMonth: number = 9, currentYear: number = 2025): number {
  let age = currentYear - birthYear;
  if (currentMonth < birthMonth) {
    age--;
  }
  return age;
}

export function isPersonAlive(currentAge: number, endOfLifeAge: number): boolean {
  return currentAge < endOfLifeAge;
}

export function getCurrentDate(): { month: number; year: number } {
  return {
    month: 9, // September 2025 start
    year: 2025
  };
}

export interface InvestmentAllocation {
  strategy: 'conservative' | 'balanced' | 'aggressive' | 'custom';
  description: string;
  expectedReturn: number;
  volatility: string;
  allocation: {
    stocks: number;
    bonds: number;
    cash: number;
    international: number;
  };
  riskLevel: string;
  timeHorizon: string;
  suitableFor: string[];
}

export const investmentStrategies: InvestmentAllocation[] = [
  {
    strategy: 'conservative',
    description: 'Low-risk strategy focused on capital preservation with steady, modest growth',
    expectedReturn: 4.5,
    volatility: 'Low (5-8%)',
    allocation: { stocks: 20, bonds: 60, cash: 15, international: 5 },
    riskLevel: 'Low',
    timeHorizon: '1-5 years to retirement',
    suitableFor: ['Risk-averse investors', 'Near retirement', 'Need steady income']
  },
  {
    strategy: 'balanced',
    description: 'Moderate-risk strategy balancing growth potential with stability',
    expectedReturn: 6.5,
    volatility: 'Moderate (8-12%)',
    allocation: { stocks: 50, bonds: 35, cash: 5, international: 10 },
    riskLevel: 'Moderate',
    timeHorizon: '5-15 years to retirement',
    suitableFor: ['Balanced risk tolerance', 'Medium-term goals', 'Diversified approach']
  },
  {
    strategy: 'aggressive',
    description: 'High-growth strategy with higher volatility for long-term wealth building',
    expectedReturn: 8.5,
    volatility: 'High (12-18%)',
    allocation: { stocks: 70, bonds: 15, cash: 0, international: 15 },
    riskLevel: 'High',
    timeHorizon: '15+ years to retirement',
    suitableFor: ['High risk tolerance', 'Young investors', 'Long-term growth focus']
  }
];

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
      paulBirthMonth: 6,
      paulBirthYear: 1962,
      jessicaBirthMonth: 12,
      jessicaBirthYear: 1968,
      lukeAge: 20,
      lukeBirthMonth: 11,
      lukeBirthYear: 2004,
      projectionYears: 20,
      paulEndOfLifeAge: 100, // Default to age 100
      jessicaEndOfLifeAge: 100 // Default to age 100
    },
    socialSecurity: {
      paulAmount: 3968, // Paul's SS benefit at age 70
      jessicaAmount: 872, // Jessica's Tier 1 SS benefit
      jessicaSpousalAmount: 263, // Jessica's Tier 2 spousal benefit
      cola: 3.0,
      paulTaxable: true,
      jessicaTaxable: true,
      paulStartAge: 70,
      jessicaStartAge: 67
    },
    otherIncome: {
      vaDisability: 4050,
      businessIncome: 4000,
      jessicaIncome: 2000,
      chapter35: 1000,
      businessDuration: 60,
      businessStartMonth: 6,
      businessStartYear: 1,
      jessicaDuration: 12,
      jessicaStartMonth: 6,
      jessicaStartYear: 1,
      chapter35Duration: 24,
      chapter35StartMonth: 6,
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
      mortgageBalance: 37400,
      monthlyPayment: 1816.92,
      interestRate: 5.5,
      targetPayoffMonths: 10,
      homeAppreciation: 2.5,
      acceleratePayoff: true,
      lumpSumAmount: 0,
      lumpSumMonth: 1,
      lumpSumYear: 1
    },
    savings: {
      initialAmount: 30000,
      annualReturn: 5.0,
      additionalAnnual: 0,
      taxOnGains: true,
      gainsTaxRate: 15,
      allocationStrategy: 'balanced'
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
      expense1: 0,
      expense1Name: "Additional Expense 1",
      expense1Duration: 12,
      expense1StartMonth: 1,
      expense1StartYear: 1,
      expense2: 0,
      expense2Name: "Additional Expense 2",
      expense2Duration: 12,
      expense2StartMonth: 1,
      expense2StartYear: 1,
      expense3: 0,
      expense3Name: "Additional Expense 3",
      expense3Duration: 12,
      expense3StartMonth: 1,
      expense3StartYear: 1,
      inflationRate: 3.0
    },
    taxRates: {
      socialSecurity: 12,
      business: 22,
      jessica: 12
    }
  };
}

// Mortgage amortization schedule data from provided document
interface MortgagePayment {
  paymentNumber: number;
  paymentDate: string;
  startingBalance: number;
  principalPayment: number;
  interestPayment: number;
  endingBalance: number;
}

const mortgageAmortizationSchedule: MortgagePayment[] = [
  { paymentNumber: 1, paymentDate: "06/01/2025", startingBalance: 129960.76, principalPayment: 1221.27, interestPayment: 595.65, endingBalance: 128739.49 },
  { paymentNumber: 2, paymentDate: "07/01/2025", startingBalance: 128739.49, principalPayment: 1226.86, interestPayment: 590.06, endingBalance: 127512.63 },
  { paymentNumber: 3, paymentDate: "08/01/2025", startingBalance: 127512.63, principalPayment: 1232.49, interestPayment: 584.43, endingBalance: 126280.14 },
  { paymentNumber: 4, paymentDate: "09/01/2025", startingBalance: 126280.14, principalPayment: 1238.14, interestPayment: 578.78, endingBalance: 125042.01 },
  { paymentNumber: 5, paymentDate: "10/01/2025", startingBalance: 125042.01, principalPayment: 1243.81, interestPayment: 573.11, endingBalance: 123798.20 },
  { paymentNumber: 6, paymentDate: "11/01/2025", startingBalance: 123798.20, principalPayment: 1249.51, interestPayment: 567.41, endingBalance: 122548.68 },
  { paymentNumber: 7, paymentDate: "12/01/2025", startingBalance: 122548.68, principalPayment: 1255.24, interestPayment: 561.68, endingBalance: 121293.45 },
  { paymentNumber: 8, paymentDate: "01/01/2026", startingBalance: 121293.45, principalPayment: 1260.99, interestPayment: 555.93, endingBalance: 120032.45 },
  { paymentNumber: 9, paymentDate: "02/01/2026", startingBalance: 120032.45, principalPayment: 1266.77, interestPayment: 550.15, endingBalance: 118765.68 },
  { paymentNumber: 10, paymentDate: "03/01/2026", startingBalance: 118765.68, principalPayment: 1272.58, interestPayment: 544.34, endingBalance: 117493.11 },
  { paymentNumber: 11, paymentDate: "04/01/2026", startingBalance: 117493.11, principalPayment: 1278.41, interestPayment: 538.51, endingBalance: 116214.70 },
  { paymentNumber: 12, paymentDate: "05/01/2026", startingBalance: 116214.70, principalPayment: 1284.27, interestPayment: 532.65, endingBalance: 114930.43 },
  { paymentNumber: 13, paymentDate: "06/01/2026", startingBalance: 114930.43, principalPayment: 1290.16, interestPayment: 526.76, endingBalance: 113640.27 },
  { paymentNumber: 14, paymentDate: "07/01/2026", startingBalance: 113640.27, principalPayment: 1296.07, interestPayment: 520.85, endingBalance: 112344.20 },
  { paymentNumber: 15, paymentDate: "08/01/2026", startingBalance: 112344.20, principalPayment: 1302.01, interestPayment: 514.91, endingBalance: 111042.19 },
  { paymentNumber: 16, paymentDate: "09/01/2026", startingBalance: 111042.19, principalPayment: 1307.98, interestPayment: 508.94, endingBalance: 109734.22 },
  { paymentNumber: 17, paymentDate: "10/01/2026", startingBalance: 109734.22, principalPayment: 1313.97, interestPayment: 502.95, endingBalance: 108420.24 },
  { paymentNumber: 18, paymentDate: "11/01/2026", startingBalance: 108420.24, principalPayment: 1319.99, interestPayment: 496.93, endingBalance: 107100.25 },
  { paymentNumber: 19, paymentDate: "12/01/2026", startingBalance: 107100.25, principalPayment: 1326.04, interestPayment: 490.88, endingBalance: 105774.21 },
  { paymentNumber: 20, paymentDate: "01/01/2027", startingBalance: 105774.21, principalPayment: 1332.12, interestPayment: 484.80, endingBalance: 104442.09 },
  { paymentNumber: 21, paymentDate: "02/01/2027", startingBalance: 104442.09, principalPayment: 1338.23, interestPayment: 478.69, endingBalance: 103103.86 },
  { paymentNumber: 22, paymentDate: "03/01/2027", startingBalance: 103103.86, principalPayment: 1344.36, interestPayment: 472.56, endingBalance: 101759.50 },
  { paymentNumber: 23, paymentDate: "04/01/2027", startingBalance: 101759.50, principalPayment: 1350.52, interestPayment: 466.40, endingBalance: 100408.98 },
  { paymentNumber: 24, paymentDate: "05/01/2027", startingBalance: 100408.98, principalPayment: 1356.71, interestPayment: 460.21, endingBalance: 99052.26 },
  { paymentNumber: 25, paymentDate: "06/01/2027", startingBalance: 99052.26, principalPayment: 1362.93, interestPayment: 453.99, endingBalance: 97689.33 },
  { paymentNumber: 26, paymentDate: "08/01/2027", startingBalance: 97689.33, principalPayment: 1369.18, interestPayment: 447.74, endingBalance: 96320.16 },
  { paymentNumber: 27, paymentDate: "09/01/2027", startingBalance: 96320.16, principalPayment: 1375.45, interestPayment: 441.47, endingBalance: 94944.70 },
  { paymentNumber: 28, paymentDate: "10/01/2027", startingBalance: 94944.70, principalPayment: 1381.76, interestPayment: 435.16, endingBalance: 93562.95 },
  { paymentNumber: 29, paymentDate: "11/01/2027", startingBalance: 93562.95, principalPayment: 1388.09, interestPayment: 428.83, endingBalance: 92174.86 },
  { paymentNumber: 30, paymentDate: "12/01/2027", startingBalance: 92174.86, principalPayment: 1394.45, interestPayment: 422.47, endingBalance: 90780.40 },
  { paymentNumber: 31, paymentDate: "01/01/2028", startingBalance: 90780.40, principalPayment: 1400.84, interestPayment: 416.08, endingBalance: 89379.56 },
  { paymentNumber: 32, paymentDate: "02/01/2028", startingBalance: 89379.56, principalPayment: 1407.26, interestPayment: 409.66, endingBalance: 87972.30 },
  { paymentNumber: 33, paymentDate: "03/01/2028", startingBalance: 87972.30, principalPayment: 1413.71, interestPayment: 403.21, endingBalance: 86558.58 },
  { paymentNumber: 34, paymentDate: "04/01/2028", startingBalance: 86558.58, principalPayment: 1420.19, interestPayment: 396.73, endingBalance: 85138.39 },
  { paymentNumber: 35, paymentDate: "05/01/2028", startingBalance: 85138.39, principalPayment: 1426.70, interestPayment: 390.22, endingBalance: 83711.69 },
  { paymentNumber: 36, paymentDate: "06/01/2028", startingBalance: 83711.69, principalPayment: 1433.24, interestPayment: 383.68, endingBalance: 82278.45 },
  { paymentNumber: 37, paymentDate: "07/01/2028", startingBalance: 82278.45, principalPayment: 1439.81, interestPayment: 377.11, endingBalance: 80838.64 },
  { paymentNumber: 38, paymentDate: "08/01/2028", startingBalance: 80838.64, principalPayment: 1446.41, interestPayment: 370.51, endingBalance: 79392.23 },
  { paymentNumber: 39, paymentDate: "09/01/2028", startingBalance: 79392.23, principalPayment: 1453.04, interestPayment: 363.88, endingBalance: 77939.19 },
  { paymentNumber: 40, paymentDate: "10/01/2028", startingBalance: 77939.19, principalPayment: 1459.70, interestPayment: 357.22, endingBalance: 76479.49 },
  { paymentNumber: 41, paymentDate: "11/01/2028", startingBalance: 76479.49, principalPayment: 1466.39, interestPayment: 350.53, endingBalance: 75013.10 },
  { paymentNumber: 42, paymentDate: "12/01/2028", startingBalance: 75013.10, principalPayment: 1473.11, interestPayment: 343.81, endingBalance: 73539.99 },
  { paymentNumber: 43, paymentDate: "01/01/2029", startingBalance: 73539.99, principalPayment: 1479.86, interestPayment: 337.06, endingBalance: 72060.13 },
  { paymentNumber: 44, paymentDate: "02/01/2029", startingBalance: 72060.13, principalPayment: 1486.64, interestPayment: 330.28, endingBalance: 70573.48 },
  { paymentNumber: 45, paymentDate: "03/01/2029", startingBalance: 70573.48, principalPayment: 1493.46, interestPayment: 323.46, endingBalance: 69080.03 },
  { paymentNumber: 46, paymentDate: "04/01/2029", startingBalance: 69080.03, principalPayment: 1500.30, interestPayment: 316.62, endingBalance: 67579.72 },
  { paymentNumber: 47, paymentDate: "05/01/2029", startingBalance: 67579.72, principalPayment: 1507.18, interestPayment: 309.74, endingBalance: 66072.54 },
  { paymentNumber: 48, paymentDate: "06/01/2029", startingBalance: 66072.54, principalPayment: 1514.09, interestPayment: 302.83, endingBalance: 64558.46 },
  { paymentNumber: 49, paymentDate: "07/01/2029", startingBalance: 64558.46, principalPayment: 1521.03, interestPayment: 295.89, endingBalance: 63037.43 },
  { paymentNumber: 50, paymentDate: "08/01/2029", startingBalance: 63037.43, principalPayment: 1528.00, interestPayment: 288.92, endingBalance: 61509.43 },
  { paymentNumber: 51, paymentDate: "09/01/2029", startingBalance: 61509.43, principalPayment: 1535.00, interestPayment: 281.92, endingBalance: 59974.43 },
  { paymentNumber: 52, paymentDate: "10/01/2029", startingBalance: 59974.43, principalPayment: 1542.04, interestPayment: 274.88, endingBalance: 58432.39 },
  { paymentNumber: 53, paymentDate: "11/01/2029", startingBalance: 58432.39, principalPayment: 1549.10, interestPayment: 267.82, endingBalance: 56883.29 },
  { paymentNumber: 54, paymentDate: "12/01/2029", startingBalance: 56883.29, principalPayment: 1556.20, interestPayment: 260.72, endingBalance: 55327.08 },
  { paymentNumber: 55, paymentDate: "01/01/2030", startingBalance: 55327.08, principalPayment: 1563.34, interestPayment: 253.58, endingBalance: 53763.74 },
  { paymentNumber: 56, paymentDate: "02/01/2030", startingBalance: 53763.74, principalPayment: 1570.50, interestPayment: 246.42, endingBalance: 52193.24 },
  { paymentNumber: 57, paymentDate: "03/01/2030", startingBalance: 52193.24, principalPayment: 1577.70, interestPayment: 239.22, endingBalance: 50615.54 },
  { paymentNumber: 58, paymentDate: "04/01/2030", startingBalance: 50615.54, principalPayment: 1584.93, interestPayment: 231.99, endingBalance: 49030.61 },
  { paymentNumber: 59, paymentDate: "05/01/2030", startingBalance: 49030.61, principalPayment: 1592.20, interestPayment: 224.72, endingBalance: 47438.41 },
  { paymentNumber: 60, paymentDate: "06/01/2030", startingBalance: 47438.41, principalPayment: 1599.49, interestPayment: 217.43, endingBalance: 45838.92 },
  { paymentNumber: 61, paymentDate: "07/01/2030", startingBalance: 45838.92, principalPayment: 1606.83, interestPayment: 210.10, endingBalance: 44232.09 },
  { paymentNumber: 62, paymentDate: "08/01/2030", startingBalance: 44232.09, principalPayment: 1614.19, interestPayment: 202.73, endingBalance: 42617.90 },
  { paymentNumber: 63, paymentDate: "09/01/2030", startingBalance: 42617.90, principalPayment: 1621.59, interestPayment: 195.33, endingBalance: 40996.31 },
  { paymentNumber: 64, paymentDate: "10/01/2030", startingBalance: 40996.31, principalPayment: 1629.02, interestPayment: 187.90, endingBalance: 39367.29 },
  { paymentNumber: 65, paymentDate: "11/01/2030", startingBalance: 39367.29, principalPayment: 1636.49, interestPayment: 180.43, endingBalance: 37730.81 },
  { paymentNumber: 66, paymentDate: "12/01/2030", startingBalance: 37730.81, principalPayment: 1643.99, interestPayment: 172.93, endingBalance: 36086.82 },
  { paymentNumber: 67, paymentDate: "01/01/2031", startingBalance: 36086.82, principalPayment: 1651.52, interestPayment: 165.40, endingBalance: 34435.30 },
  { paymentNumber: 68, paymentDate: "02/01/2031", startingBalance: 34435.30, principalPayment: 1659.09, interestPayment: 157.83, endingBalance: 32776.21 },
  { paymentNumber: 69, paymentDate: "03/01/2031", startingBalance: 32776.21, principalPayment: 1666.70, interestPayment: 150.22, endingBalance: 31109.51 },
  { paymentNumber: 70, paymentDate: "04/01/2031", startingBalance: 31109.51, principalPayment: 1674.33, interestPayment: 142.59, endingBalance: 29435.18 },
  { paymentNumber: 71, paymentDate: "05/01/2031", startingBalance: 29435.18, principalPayment: 1682.01, interestPayment: 134.91, endingBalance: 27753.17 },
  { paymentNumber: 72, paymentDate: "06/01/2031", startingBalance: 27753.17, principalPayment: 1689.72, interestPayment: 127.20, endingBalance: 26063.45 },
  { paymentNumber: 73, paymentDate: "07/01/2031", startingBalance: 26063.45, principalPayment: 1697.46, interestPayment: 119.46, endingBalance: 24365.99 },
  { paymentNumber: 74, paymentDate: "08/01/2031", startingBalance: 24365.99, principalPayment: 1705.24, interestPayment: 111.68, endingBalance: 22660.74 },
  { paymentNumber: 75, paymentDate: "09/01/2031", startingBalance: 22660.74, principalPayment: 1713.06, interestPayment: 103.86, endingBalance: 20947.69 },
  { paymentNumber: 76, paymentDate: "10/01/2031", startingBalance: 20947.69, principalPayment: 1720.91, interestPayment: 96.01, endingBalance: 19226.78 },
  { paymentNumber: 77, paymentDate: "11/01/2031", startingBalance: 19226.78, principalPayment: 1728.80, interestPayment: 88.12, endingBalance: 17497.98 },
  { paymentNumber: 78, paymentDate: "12/01/2031", startingBalance: 17497.98, principalPayment: 1736.72, interestPayment: 80.20, endingBalance: 15761.26 },
  { paymentNumber: 79, paymentDate: "01/01/2032", startingBalance: 15761.26, principalPayment: 1744.68, interestPayment: 72.24, endingBalance: 14016.58 },
  { paymentNumber: 80, paymentDate: "02/01/2032", startingBalance: 14016.58, principalPayment: 1752.68, interestPayment: 64.24, endingBalance: 12263.90 },
  { paymentNumber: 81, paymentDate: "03/01/2032", startingBalance: 12263.90, principalPayment: 1760.71, interestPayment: 56.21, endingBalance: 10503.19 },
  { paymentNumber: 82, paymentDate: "04/01/2032", startingBalance: 10503.19, principalPayment: 1768.78, interestPayment: 48.14, endingBalance: 8734.41 },
  { paymentNumber: 83, paymentDate: "05/01/2032", startingBalance: 8734.41, principalPayment: 1776.89, interestPayment: 40.03, endingBalance: 6957.52 },
  { paymentNumber: 84, paymentDate: "06/01/2032", startingBalance: 6957.52, principalPayment: 1785.03, interestPayment: 31.89, endingBalance: 5172.49 },
  { paymentNumber: 85, paymentDate: "07/01/2032", startingBalance: 5172.49, principalPayment: 1793.21, interestPayment: 23.71, endingBalance: 3379.28 },
  { paymentNumber: 86, paymentDate: "08/01/2032", startingBalance: 3379.28, principalPayment: 1801.43, interestPayment: 15.49, endingBalance: 1577.85 },
  { paymentNumber: 87, paymentDate: "09/01/2032", startingBalance: 1577.85, principalPayment: 1577.85, interestPayment: 7.23, endingBalance: 0.00 }
];

export function getMortgagePaymentByMonth(monthIndex: number, state?: CalculatorState): MortgagePayment | null {
  // monthIndex is 0-based starting from June 2025 (month 0 = June 2025, 1 = July 2025)
  // The amortization schedule starts July 2025, so we offset by 1
  const scheduleIndex = monthIndex - 1;
  
  // Check if mortgage is paid off early due to acceleration
  if (state && state.housing.acceleratePayoff && scheduleIndex >= state.housing.targetPayoffMonths) {
    return null; // Mortgage paid off early
  }
  
  if (scheduleIndex < 0 || scheduleIndex >= mortgageAmortizationSchedule.length) {
    return null;
  }
  return mortgageAmortizationSchedule[scheduleIndex];
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
  if (!isTaxable || !income || isNaN(income) || isNaN(rate)) return 0;
  const result = income * (rate / 100);
  return isNaN(result) ? 0 : result;
}

export function calculateInflationAdjusted(baseAmount: number, rate: number, years: number): number {
  if (isNaN(baseAmount) || isNaN(rate) || isNaN(years)) return baseAmount || 0;
  const result = baseAmount * Math.pow(1 + (rate / 100), years);
  return isNaN(result) ? baseAmount || 0 : result;
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

export function calculateTotalInterestFromSchedule(targetMonths?: number): number {
  let totalInterest = 0;
  const monthsToCalculate = targetMonths || mortgageAmortizationSchedule.length;
  
  for (let i = 0; i < Math.min(monthsToCalculate, mortgageAmortizationSchedule.length); i++) {
    totalInterest += mortgageAmortizationSchedule[i].interestPayment;
  }
  return totalInterest;
}

export function calculateInterestSaved(targetPayoffMonths: number): number {
  const standardPayoffMonths = 87; // Full amortization schedule length
  if (targetPayoffMonths >= standardPayoffMonths) {
    return 0; // No savings if not paying off early
  }
  
  const standardInterest = calculateTotalInterestFromSchedule(standardPayoffMonths);
  const earlyPayoffInterest = calculateTotalInterestFromSchedule(targetPayoffMonths);
  
  return Math.max(0, standardInterest - earlyPayoffInterest);
}

export function calculateLumpSumInterestSavings(lumpSumAmount: number, lumpSumMonth: number, lumpSumYear: number): number {
  if (!lumpSumAmount || lumpSumAmount <= 0 || !isFinite(lumpSumAmount)) return 0;
  if (!lumpSumMonth || !lumpSumYear || !isFinite(lumpSumMonth) || !isFinite(lumpSumYear)) return 0;
  
  // Calculate when the lump sum payment occurs (months from start)
  const lumpSumMonthOffset = (lumpSumYear - 1) * 12 + (lumpSumMonth - 1);
  
  // Find the payment that corresponds to this month
  const paymentIndex = lumpSumMonthOffset;
  
  if (paymentIndex < 0 || paymentIndex >= mortgageAmortizationSchedule.length) {
    return 0; // Lump sum outside valid range
  }
  
  try {
    // Get the balance at the time of lump sum payment
    const currentPayment = mortgageAmortizationSchedule[paymentIndex];
    if (!currentPayment || !isFinite(currentPayment.startingBalance)) return 0;
    
    const remainingBalance = currentPayment.startingBalance;
    
    // Calculate remaining interest without lump sum
    let totalInterestWithoutLumpSum = 0;
    for (let i = paymentIndex; i < mortgageAmortizationSchedule.length; i++) {
      const payment = mortgageAmortizationSchedule[i];
      if (payment && isFinite(payment.interestPayment)) {
        totalInterestWithoutLumpSum += payment.interestPayment;
      }
    }
    
    // Calculate new balance after lump sum
    const newBalance = Math.max(0, remainingBalance - lumpSumAmount);
    
    if (newBalance <= 0) {
      // Lump sum pays off entire mortgage
      return isFinite(totalInterestWithoutLumpSum) ? totalInterestWithoutLumpSum : 0;
    }
    
    // Simplified calculation: approximate interest savings
    // Using the percentage reduction in principal
    const principalReduction = lumpSumAmount / remainingBalance;
    const estimatedSavings = totalInterestWithoutLumpSum * principalReduction * 0.7; // Conservative estimate
    
    return isFinite(estimatedSavings) ? Math.max(0, estimatedSavings) : 0;
  } catch (error) {
    console.warn('Error calculating lump sum interest savings:', error);
    return 0;
  }
}

export function getMortgagePayoffDate(targetMonths?: number): string {
  const monthsToUse = targetMonths || mortgageAmortizationSchedule.length;
  if (monthsToUse < mortgageAmortizationSchedule.length) {
    // Calculate early payoff date starting from June 2025
    const startDate = new Date(2025, 5, 1); // June 2025 (month is 0-indexed)
    const payoffDate = new Date(startDate.getTime() + (monthsToUse - 1) * 30.44 * 24 * 60 * 60 * 1000);
    return payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  const lastPayment = mortgageAmortizationSchedule[mortgageAmortizationSchedule.length - 1];
  return lastPayment ? lastPayment.paymentDate.split('/').slice(0, 2).join('/').replace('/', ' ').replace('0', '') + lastPayment.paymentDate.split('/')[2] : "Sep 2032";
}

export function calculateMonthlyProjections(state: CalculatorState, year: number): MonthlyData[] {
  const monthlyData: MonthlyData[] = [];
  const yearIndex = year - 1;
  
  // SS eligibility will be calculated month by month in the loop below
  
  // VA Disability calculation will be done month by month based on Paul's status
  
  // Income calculations will be done month by month inside the loop
  
  // Calculate living expenses with inflation
  const baseLivingExpenses = getTotalLivingExpenses(state.expenses);
  const livingExpMonthly = calculateInflationAdjusted(baseLivingExpenses, state.expenses.inflationRate, yearIndex);
  
  // Expense calculations will be done month by month inside the loop
  
  // Initialize mortgage balance tracking
  let yearStartMortgageBalance = state.housing.mortgageBalance;
  
  // Get lump sum payment offset (September 2025 start = month 9 = offset 0)
  const lumpSumMonthOffset = (state.housing.lumpSumYear - 1) * 12 + (state.housing.lumpSumMonth - 1);
  const yearStartMonthOffset = yearIndex * 12;
  
  // If lump sum was applied in previous years, account for it
  if (state.housing.lumpSumAmount > 0 && lumpSumMonthOffset < yearStartMonthOffset) {
    yearStartMortgageBalance = Math.max(0, yearStartMortgageBalance - state.housing.lumpSumAmount);
    
    // Also account for mortgage payments made in previous years
    const mortgageStartMonth = 5; // June 2025 is month 5 (0-indexed from Jan 2025)
    for (let prevMonthOffset = mortgageStartMonth; prevMonthOffset < yearStartMonthOffset; prevMonthOffset++) {
      if (yearStartMortgageBalance > 0) {
        const monthsSinceMortgageStart = prevMonthOffset - mortgageStartMonth;
        const remainingMonths = Math.max(0, state.housing.targetPayoffMonths - monthsSinceMortgageStart);
        if (remainingMonths > 0) {
          const monthlyRate = state.housing.interestRate / 100 / 12;
          const monthlyInterest = yearStartMortgageBalance * monthlyRate;
          let monthlyPrincipal;
          
          if (state.housing.acceleratePayoff && monthsSinceMortgageStart < state.housing.targetPayoffMonths) {
            // Calculate accelerated payment using the same conservative logic
            const remainingTargetMonths = Math.max(1, state.housing.targetPayoffMonths - monthsSinceMortgageStart);
            const requiredPayment = calculateMortgagePayment(yearStartMortgageBalance, state.housing.interestRate, remainingTargetMonths);
            const regularPayment = state.housing.monthlyPayment;
            const maxExtraPayment = Math.min(requiredPayment - regularPayment, yearStartMortgageBalance * 0.1);
            const targetPayment = regularPayment + Math.max(0, maxExtraPayment);
            monthlyPrincipal = Math.min(targetPayment - monthlyInterest, yearStartMortgageBalance);
          } else {
            monthlyPrincipal = Math.min(state.housing.monthlyPayment - monthlyInterest, yearStartMortgageBalance);
          }
          
          yearStartMortgageBalance = Math.max(0, yearStartMortgageBalance - monthlyPrincipal);
        } else {
          yearStartMortgageBalance = 0;
          break;
        }
      }
    }
  }
  
  let runningBalance = state.savings.initialAmount;
  // Note: We can't use annualData here as it would cause infinite recursion
  // Instead, we'll calculate savings progression month by month
  
  let currentMortgageBalance = yearStartMortgageBalance;
  
  for (let month = 0; month < 12; month++) {
    const currentMonthOffset = yearIndex * 12 + month;
    // Start from September 2025 (month 8 in 0-indexed system)
    const actualMonth = (month + 8) % 12; // Start from September (month 8)
    const actualYear = 2025 + yearIndex + Math.floor((month + 8) / 12);
    const monthName = new Date(actualYear, actualMonth).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // All months from September 2025 onwards are active (no zero-value months)
    const isBeforeJune2025 = false; // No longer applicable - all months are active
    
    // Calculate income sources for this specific month
    const businessStartMonthOffset = (state.otherIncome.businessStartYear - 1) * 12 + (state.otherIncome.businessStartMonth - 1);
    const businessMonthsElapsed = currentMonthOffset - businessStartMonthOffset;
    const businessMonthly = (businessMonthsElapsed >= 0 && businessMonthsElapsed < state.otherIncome.businessDuration) 
      ? state.otherIncome.businessIncome 
      : 0;
    
    const jessicaStartMonthOffset = (state.otherIncome.jessicaStartYear - 1) * 12 + (state.otherIncome.jessicaStartMonth - 1);
    const jessicaMonthsElapsed = currentMonthOffset - jessicaStartMonthOffset;
    const jessicaWorkMonthly = (jessicaMonthsElapsed >= 0 && jessicaMonthsElapsed < state.otherIncome.jessicaDuration) 
      ? state.otherIncome.jessicaIncome 
      : 0;
    
    const chapter35StartMonthOffset = (state.otherIncome.chapter35StartYear - 1) * 12 + (state.otherIncome.chapter35StartMonth - 1);
    const chapter35MonthsElapsed = currentMonthOffset - chapter35StartMonthOffset;
    const chapter35Monthly = (chapter35MonthsElapsed >= 0 && chapter35MonthsElapsed < state.otherIncome.chapter35Duration) 
      ? state.otherIncome.chapter35 
      : 0;

    const income1StartMonthOffset = (state.otherIncome.income1StartYear - 1) * 12 + (state.otherIncome.income1StartMonth - 1);
    const income1MonthsElapsed = currentMonthOffset - income1StartMonthOffset;
    const income1Monthly = (state.otherIncome.income1 > 0 && income1MonthsElapsed >= 0 && income1MonthsElapsed < state.otherIncome.income1Duration) 
      ? state.otherIncome.income1 
      : 0;

    const income2StartMonthOffset = (state.otherIncome.income2StartYear - 1) * 12 + (state.otherIncome.income2StartMonth - 1);
    const income2MonthsElapsed = currentMonthOffset - income2StartMonthOffset;
    const income2Monthly = (state.otherIncome.income2 > 0 && income2MonthsElapsed >= 0 && income2MonthsElapsed < state.otherIncome.income2Duration) 
      ? state.otherIncome.income2 
      : 0;

    const income3StartMonthOffset = (state.otherIncome.income3StartYear - 1) * 12 + (state.otherIncome.income3StartMonth - 1);
    const income3MonthsElapsed = currentMonthOffset - income3StartMonthOffset;
    const income3Monthly = (state.otherIncome.income3 > 0 && income3MonthsElapsed >= 0 && income3MonthsElapsed < state.otherIncome.income3Duration) 
      ? state.otherIncome.income3 
      : 0;
    
    // Calculate expense sources for this specific month
    const lifeInsuranceStartMonthOffset = (state.expenses.lifeInsuranceStartYear - 1) * 12 + (state.expenses.lifeInsuranceStartMonth - 1);
    const lifeInsuranceEndMonthOffset = (state.expenses.lifeInsuranceEndYear - 1) * 12 + (state.expenses.lifeInsuranceEndMonth - 1);
    const insuranceMonthly = (currentMonthOffset >= lifeInsuranceStartMonthOffset && currentMonthOffset <= lifeInsuranceEndMonthOffset) 
      ? state.expenses.lifeInsurance 
      : 0;

    const expense1StartMonthOffset = (state.expenses.expense1StartYear - 1) * 12 + (state.expenses.expense1StartMonth - 1);
    const expense1MonthsElapsed = currentMonthOffset - expense1StartMonthOffset;
    const expense1Monthly = (state.expenses.expense1 > 0 && expense1MonthsElapsed >= 0 && expense1MonthsElapsed < state.expenses.expense1Duration) 
      ? state.expenses.expense1 
      : 0;

    const expense2StartMonthOffset = (state.expenses.expense2StartYear - 1) * 12 + (state.expenses.expense2StartMonth - 1);
    const expense2MonthsElapsed = currentMonthOffset - expense2StartMonthOffset;
    const expense2Monthly = (state.expenses.expense2 > 0 && expense2MonthsElapsed >= 0 && expense2MonthsElapsed < state.expenses.expense2Duration) 
      ? state.expenses.expense2 
      : 0;

    const expense3StartMonthOffset = (state.expenses.expense3StartYear - 1) * 12 + (state.expenses.expense3StartMonth - 1);
    const expense3MonthsElapsed = currentMonthOffset - expense3StartMonthOffset;
    const expense3Monthly = (state.expenses.expense3 > 0 && expense3MonthsElapsed >= 0 && expense3MonthsElapsed < state.expenses.expense3Duration) 
      ? state.expenses.expense3 
      : 0;
    
    // Calculate precise age for this specific month
    const paulAgeThisMonth = calculateAge(state.personalInfo.paulBirthMonth, state.personalInfo.paulBirthYear, actualMonth + 1, actualYear);
    const jessicaAgeThisMonth = calculateAge(state.personalInfo.jessicaBirthMonth, state.personalInfo.jessicaBirthYear, actualMonth + 1, actualYear);
    
    // Check if each person is alive and eligible for SS
    const paulAlive = isPersonAlive(paulAgeThisMonth, state.personalInfo.paulEndOfLifeAge);
    const jessicaAlive = isPersonAlive(jessicaAgeThisMonth, state.personalInfo.jessicaEndOfLifeAge);
    
    // Calculate SS amounts with survivor benefit rules
    let paulSSMonthly = 0;
    let jessicaSSMonthly = 0;
    
    if (!isBeforeJune2025) {
      if (paulAlive && jessicaAlive) {
        // Paul's benefit calculation
        const paulEligible = paulAgeThisMonth >= state.socialSecurity.paulStartAge && 
          (paulAgeThisMonth > state.socialSecurity.paulStartAge || actualMonth + 1 >= state.personalInfo.paulBirthMonth);
        paulSSMonthly = paulEligible ? 
          calculateInflationAdjusted(state.socialSecurity.paulAmount, state.socialSecurity.cola, yearIndex) : 0;
        
        // Jessica's two-tier benefit calculation
        const jessicaEligible = jessicaAgeThisMonth >= state.socialSecurity.jessicaStartAge && 
          (jessicaAgeThisMonth > state.socialSecurity.jessicaStartAge || actualMonth + 1 >= state.personalInfo.jessicaBirthMonth);
        
        if (jessicaEligible && !paulEligible) {
          // Tier 1 only: Jessica's own benefit (before Paul starts)
          jessicaSSMonthly = calculateInflationAdjusted(state.socialSecurity.jessicaAmount, state.socialSecurity.cola, yearIndex);
        } else if (jessicaEligible && paulEligible) {
          // Tier 1 + Tier 2: Jessica's own benefit + spousal benefit (after Paul starts)
          const tier1 = calculateInflationAdjusted(state.socialSecurity.jessicaAmount, state.socialSecurity.cola, yearIndex);
          const tier2 = calculateInflationAdjusted(state.socialSecurity.jessicaSpousalAmount, state.socialSecurity.cola, yearIndex);
          jessicaSSMonthly = tier1 + tier2;
        } else {
          jessicaSSMonthly = 0;
        }
      } else if (!paulAlive && jessicaAlive) {
        // Paul died, Jessica alive: Jessica gets 100% of Paul's benefit as survivor benefit
        paulSSMonthly = 0;
        const jessicaEligible = jessicaAgeThisMonth >= state.socialSecurity.jessicaStartAge && 
          (jessicaAgeThisMonth > state.socialSecurity.jessicaStartAge || actualMonth + 1 >= state.personalInfo.jessicaBirthMonth);
        jessicaSSMonthly = jessicaEligible ? 
          calculateInflationAdjusted(state.socialSecurity.paulAmount, state.socialSecurity.cola, yearIndex) : 0;
      } else if (paulAlive && !jessicaAlive) {
        // Jessica died, Paul alive: Paul keeps his benefit, Jessica's stops
        const paulEligible = paulAgeThisMonth >= state.socialSecurity.paulStartAge && 
          (paulAgeThisMonth > state.socialSecurity.paulStartAge || actualMonth + 1 >= state.personalInfo.paulBirthMonth);
        paulSSMonthly = paulEligible ? 
          calculateInflationAdjusted(state.socialSecurity.paulAmount, state.socialSecurity.cola, yearIndex) : 0;
        jessicaSSMonthly = 0;
      } else {
        // Both died: no benefits
        paulSSMonthly = 0;
        jessicaSSMonthly = 0;
      }
    }
    
    // Calculate VA Disability with inflation and survivor benefits
    let vaDisabilityMonthly = 0;
    if (!isBeforeJune2025) {
      if (paulAlive) {
        // Paul alive: gets full VA Disability
        vaDisabilityMonthly = calculateInflationAdjusted(state.otherIncome.vaDisability, state.expenses.inflationRate, yearIndex);
      } else if (!paulAlive && jessicaAlive) {
        // Paul died, Jessica alive: check if Paul died in March 2035 or later
        
        // Find the year Paul died (first year he's not alive)
        let paulDeathYear = null;
        for (let checkYear = 1; checkYear <= state.personalInfo.projectionYears; checkYear++) {
          const checkYearIndex = checkYear - 1;
          const paulAgeInCheckYear = state.personalInfo.paulAge + checkYearIndex;
          if (!isPersonAlive(paulAgeInCheckYear, state.personalInfo.paulEndOfLifeAge)) {
            paulDeathYear = 2025 + checkYearIndex;
            break;
          }
        }
        
        // Jessica only gets VA survivor benefit if Paul died in March 2035 or later
        if (paulDeathYear && paulDeathYear >= 2035) {
          // Jessica gets 50% of Paul's VA Disability
          vaDisabilityMonthly = calculateInflationAdjusted(state.otherIncome.vaDisability * 0.5, state.expenses.inflationRate, yearIndex);
        }
        // If Paul died before March 2035, Jessica gets zero VA benefits for all subsequent years
      }
    }
    
    // Apply lump sum payment if it occurs this month
    let lumpSumPayment = 0;
    if (state.housing.lumpSumAmount > 0 && currentMonthOffset === lumpSumMonthOffset) {
      lumpSumPayment = state.housing.lumpSumAmount;
      currentMortgageBalance = Math.max(0, currentMortgageBalance - lumpSumPayment);

    }
    

    
    // Store beginning of month mortgage balance for display
    const beginningMortgageBalance = currentMortgageBalance;
    
    // Calculate monthly mortgage payment based on current balance and remaining months
    let currentMortgageMonthly = 0;
    if (currentMortgageBalance > 0) {
      // Calculate remaining months from the start of mortgage payments (June 2025)
      const mortgageStartMonth = 5; // June 2025 is month 5 (0-indexed from Jan 2025)
      const monthsSinceMortgageStart = Math.max(0, currentMonthOffset - mortgageStartMonth);
      const remainingMonths = Math.max(0, state.housing.targetPayoffMonths - monthsSinceMortgageStart);
      
      if (currentMonthOffset < mortgageStartMonth) {
        // Before mortgage payments start, no payment and balance stays the same
        currentMortgageMonthly = 0;
      } else if (remainingMonths > 0 && state.housing.acceleratePayoff) {
        // Calculate regular payment + accelerated extra payment
        const monthlyRate = state.housing.interestRate / 100 / 12;
        const regularPayment = state.housing.monthlyPayment;
        
        if (remainingMonths === 1) {
          // Last month - pay off remaining balance plus interest
          const monthlyInterest = currentMortgageBalance * monthlyRate;
          currentMortgageMonthly = currentMortgageBalance + monthlyInterest;
          currentMortgageBalance = 0;
        } else {
          // Calculate what total payment is needed to pay off in remaining months
          const requiredTotalPayment = calculateMortgagePayment(currentMortgageBalance, state.housing.interestRate, remainingMonths);
          
          // Use conservative approach - cap extra payment at 10% of remaining balance
          const extraPayment = Math.min(requiredTotalPayment - regularPayment, currentMortgageBalance * 0.1);
          currentMortgageMonthly = regularPayment + Math.max(0, extraPayment);
          
          // Apply the payment to reduce balance
          const monthlyInterest = currentMortgageBalance * monthlyRate;
          const monthlyPrincipal = Math.min(currentMortgageMonthly - monthlyInterest, currentMortgageBalance);
          currentMortgageBalance = Math.max(0, currentMortgageBalance - monthlyPrincipal);
          

        }
      } else if (remainingMonths > 0) {
        // Use regular payment schedule
        const monthlyRate = state.housing.interestRate / 100 / 12;
        const monthlyInterest = currentMortgageBalance * monthlyRate;
        const monthlyPrincipal = Math.min(state.housing.monthlyPayment - monthlyInterest, currentMortgageBalance);
        currentMortgageMonthly = monthlyInterest + monthlyPrincipal;
        currentMortgageBalance = Math.max(0, currentMortgageBalance - monthlyPrincipal);
      } else if (currentMonthOffset >= mortgageStartMonth) {
        // Target payoff period has passed, but there's still a balance - make minimum payments
        const monthlyRate = state.housing.interestRate / 100 / 12;
        const monthlyInterest = currentMortgageBalance * monthlyRate;
        const monthlyPrincipal = Math.min(state.housing.monthlyPayment - monthlyInterest, currentMortgageBalance);
        currentMortgageMonthly = monthlyInterest + monthlyPrincipal;
        currentMortgageBalance = Math.max(0, currentMortgageBalance - monthlyPrincipal);
      }
    }
    
    // Apply zero values for months before June 2025, or use calculated values
    const actualBusinessMonthly = isBeforeJune2025 ? 0 : businessMonthly;
    const actualJessicaWorkMonthly = isBeforeJune2025 ? 0 : jessicaWorkMonthly;
    const actualChapter35Monthly = isBeforeJune2025 ? 0 : chapter35Monthly;
    const actualIncome1Monthly = isBeforeJune2025 ? 0 : income1Monthly;
    const actualIncome2Monthly = isBeforeJune2025 ? 0 : income2Monthly;
    const actualIncome3Monthly = isBeforeJune2025 ? 0 : income3Monthly;
    const actualLivingExpMonthly = isBeforeJune2025 ? 0 : livingExpMonthly;
    const actualInsuranceMonthly = isBeforeJune2025 ? 0 : insuranceMonthly;
    const actualExpense1Monthly = isBeforeJune2025 ? 0 : expense1Monthly;
    const actualExpense2Monthly = isBeforeJune2025 ? 0 : expense2Monthly;
    const actualExpense3Monthly = isBeforeJune2025 ? 0 : expense3Monthly;
    const actualMortgageMonthly = isBeforeJune2025 ? 0 : currentMortgageMonthly;
    
    const grossIncome = paulSSMonthly + jessicaSSMonthly + vaDisabilityMonthly + actualBusinessMonthly + actualJessicaWorkMonthly + actualChapter35Monthly + actualIncome1Monthly + actualIncome2Monthly + actualIncome3Monthly;
    
    const taxes = 
      calculateTaxes(paulSSMonthly, state.taxRates.socialSecurity, state.socialSecurity.paulTaxable) +
      calculateTaxes(jessicaSSMonthly, state.taxRates.socialSecurity, state.socialSecurity.jessicaTaxable) +
      calculateTaxes(actualBusinessMonthly, state.taxRates.business, true) +
      calculateTaxes(actualJessicaWorkMonthly, state.taxRates.jessica, true);
    
    const netIncome = grossIncome - taxes;
    const netCashFlow = netIncome - actualLivingExpMonthly - actualInsuranceMonthly - actualExpense1Monthly - actualExpense2Monthly - actualExpense3Monthly - actualMortgageMonthly;
    
    // All positive cash flow goes to savings, negative cash flow comes from savings
    runningBalance += netCashFlow;
    
    // Calculate monthly investment return from total savings balance (only on positive balance)
    const investableMonthlyBalance = Math.max(0, runningBalance || 0);
    const annualReturn = isNaN(state.savings.annualReturn) ? 0 : state.savings.annualReturn;
    const gainsTaxRate = isNaN(state.savings.gainsTaxRate) ? 0 : state.savings.gainsTaxRate;
    const monthlyInvestmentReturn = investableMonthlyBalance > 0 ? investableMonthlyBalance * (annualReturn / 100 / 12) : 0;
    
    // Calculate investment taxes
    const monthlyTaxOnGains = (state.savings.taxOnGains && monthlyInvestmentReturn > 0) ? monthlyInvestmentReturn * (gainsTaxRate / 100) : 0;
    
    // Apply investment returns (net after taxes) 
    const netMonthlyInvestmentReturn = monthlyInvestmentReturn - monthlyTaxOnGains;
    runningBalance += netMonthlyInvestmentReturn;
    
    // Ensure no NaN values in running balance
    runningBalance = isNaN(runningBalance) ? 0 : runningBalance;
    
    // Deduct lump sum payment from savings when applied
    if (lumpSumPayment > 0) {
      runningBalance -= lumpSumPayment;
    }
    
    // Include investment taxes in total taxes (with NaN safety)
    const safeTaxes = isNaN(taxes) ? 0 : taxes;
    const safeMonthlyTaxOnGains = isNaN(monthlyTaxOnGains) ? 0 : monthlyTaxOnGains;
    const totalTaxes = safeTaxes + safeMonthlyTaxOnGains;
    const finalNetIncome = grossIncome - totalTaxes;

    monthlyData.push({
      month: monthName,
      paulSS: isNaN(paulSSMonthly) ? 0 : paulSSMonthly,
      jessicaSS: isNaN(jessicaSSMonthly) ? 0 : jessicaSSMonthly,
      vaDisability: isNaN(vaDisabilityMonthly) ? 0 : vaDisabilityMonthly,
      business: isNaN(actualBusinessMonthly) ? 0 : actualBusinessMonthly,
      jessicaWork: isNaN(actualJessicaWorkMonthly) ? 0 : actualJessicaWorkMonthly,
      chapter35: isNaN(actualChapter35Monthly) ? 0 : actualChapter35Monthly,
      grossIncome: isNaN(grossIncome) ? 0 : grossIncome,
      taxes: isNaN(totalTaxes) ? 0 : totalTaxes, // Now includes investment taxes
      netIncome: isNaN(finalNetIncome) ? 0 : finalNetIncome,
      livingExp: isNaN(actualLivingExpMonthly) ? 0 : actualLivingExpMonthly,
      insurance: isNaN(actualInsuranceMonthly) ? 0 : actualInsuranceMonthly,
      expense1: isNaN(actualExpense1Monthly) ? 0 : actualExpense1Monthly,
      expense2: isNaN(actualExpense2Monthly) ? 0 : actualExpense2Monthly,
      expense3: isNaN(actualExpense3Monthly) ? 0 : actualExpense3Monthly,
      mortgage: isNaN(actualMortgageMonthly) ? 0 : actualMortgageMonthly,
      mortgageBalance: isNaN(beginningMortgageBalance) ? 0 : beginningMortgageBalance,
      netCashFlow: isNaN(netCashFlow) ? 0 : netCashFlow,
      returnOnInvestments: isNaN(monthlyInvestmentReturn) ? 0 : monthlyInvestmentReturn, // Gross return before taxes
      savingsBalance: isNaN(runningBalance) ? 0 : runningBalance
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
    
    // Check if each person is alive and eligible for SS
    const paulAlive = isPersonAlive(paulAge, state.personalInfo.paulEndOfLifeAge);
    const jessicaAlive = isPersonAlive(jessicaAge, state.personalInfo.jessicaEndOfLifeAge);
    
    // Calculate SS amounts with survivor benefit rules
    let paulSSAnnual = 0;
    let jessicaSSAnnual = 0;
    
    if (paulAlive && jessicaAlive) {
      // Paul's benefit calculation
      paulSSAnnual = (paulAge >= state.socialSecurity.paulStartAge) ? 
        calculateInflationAdjusted(state.socialSecurity.paulAmount * 12, state.socialSecurity.cola, yearIndex) : 0;
      
      // Jessica's two-tier benefit calculation
      const jessicaEligible = jessicaAge >= state.socialSecurity.jessicaStartAge;
      const paulEligible = paulAge >= state.socialSecurity.paulStartAge;
      
      if (jessicaEligible && !paulEligible) {
        // Tier 1 only: Jessica's own benefit (before Paul starts)
        jessicaSSAnnual = calculateInflationAdjusted(state.socialSecurity.jessicaAmount * 12, state.socialSecurity.cola, yearIndex);
      } else if (jessicaEligible && paulEligible) {
        // Tier 1 + Tier 2: Jessica's own benefit + spousal benefit (after Paul starts)
        const tier1Annual = calculateInflationAdjusted(state.socialSecurity.jessicaAmount * 12, state.socialSecurity.cola, yearIndex);
        const tier2Annual = calculateInflationAdjusted(state.socialSecurity.jessicaSpousalAmount * 12, state.socialSecurity.cola, yearIndex);
        jessicaSSAnnual = tier1Annual + tier2Annual;
      } else {
        jessicaSSAnnual = 0;
      }
    } else if (!paulAlive && jessicaAlive) {
      // Paul died, Jessica alive: Jessica gets 100% of Paul's benefit, loses her own
      paulSSAnnual = 0;
      jessicaSSAnnual = (jessicaAge >= state.socialSecurity.jessicaStartAge) ? 
        calculateInflationAdjusted(state.socialSecurity.paulAmount * 12, state.socialSecurity.cola, yearIndex) : 0;
    } else if (paulAlive && !jessicaAlive) {
      // Jessica died, Paul alive: Paul keeps his benefit, Jessica's stops
      paulSSAnnual = (paulAge >= state.socialSecurity.paulStartAge) ? 
        calculateInflationAdjusted(state.socialSecurity.paulAmount * 12, state.socialSecurity.cola, yearIndex) : 0;
      jessicaSSAnnual = 0;
    } else {
      // Both died: no benefits
      paulSSAnnual = 0;
      jessicaSSAnnual = 0;
    }
    
    // Calculate VA Disability with inflation and survivor benefits
    let vaDisabilityAnnual = 0;
    if (paulAlive) {
      // Paul alive: gets full VA Disability
      vaDisabilityAnnual = calculateInflationAdjusted(state.otherIncome.vaDisability * 12, state.expenses.inflationRate, yearIndex);
    } else if (!paulAlive && jessicaAlive) {
      // Paul died, Jessica alive: check if Paul died in March 2035 or later
      const currentYear = 2025 + yearIndex;
      
      // Find the year Paul died (first year he's not alive)
      let paulDeathYear = null;
      for (let checkYear = 1; checkYear <= state.personalInfo.projectionYears; checkYear++) {
        const checkYearIndex = checkYear - 1;
        const paulAgeInCheckYear = state.personalInfo.paulAge + checkYearIndex;
        if (!isPersonAlive(paulAgeInCheckYear, state.personalInfo.paulEndOfLifeAge)) {
          paulDeathYear = 2025 + checkYearIndex;
          break;
        }
      }
      
      // Jessica only gets VA survivor benefit if Paul died in March 2035 or later
      if (paulDeathYear && paulDeathYear >= 2035) {
        // Jessica gets 50% of Paul's VA Disability
        vaDisabilityAnnual = calculateInflationAdjusted(state.otherIncome.vaDisability * 12 * 0.5, state.expenses.inflationRate, yearIndex);
      }
      // If Paul died before March 2035, Jessica gets zero VA benefits for all subsequent years
    }
    
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
    
    // Calculate taxes (without investment taxes initially)
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
    
    // Calculate additional expenses (with start month/year and duration)
    let expense1Annual = 0;
    if (state.expenses.expense1 > 0) {
      const expense1StartMonthOffset = (state.expenses.expense1StartYear - 1) * 12 + (state.expenses.expense1StartMonth - 1);
      const expense1MonthsElapsed = monthsElapsed - expense1StartMonthOffset;
      let expense1MonthsThisYear = 0;
      if (expense1MonthsElapsed >= 0 && expense1MonthsElapsed < state.expenses.expense1Duration) {
        const expense1MonthsRemaining = state.expenses.expense1Duration - expense1MonthsElapsed;
        expense1MonthsThisYear = Math.min(12, expense1MonthsRemaining);
      } else if (expense1MonthsElapsed < 0) {
        const monthsUntilStart = -expense1MonthsElapsed;
        if (monthsUntilStart < 12) {
          expense1MonthsThisYear = Math.min(12 - monthsUntilStart, state.expenses.expense1Duration);
        }
      }
      expense1Annual = state.expenses.expense1 * expense1MonthsThisYear;
    }

    let expense2Annual = 0;
    if (state.expenses.expense2 > 0) {
      const expense2StartMonthOffset = (state.expenses.expense2StartYear - 1) * 12 + (state.expenses.expense2StartMonth - 1);
      const expense2MonthsElapsed = monthsElapsed - expense2StartMonthOffset;
      let expense2MonthsThisYear = 0;
      if (expense2MonthsElapsed >= 0 && expense2MonthsElapsed < state.expenses.expense2Duration) {
        const expense2MonthsRemaining = state.expenses.expense2Duration - expense2MonthsElapsed;
        expense2MonthsThisYear = Math.min(12, expense2MonthsRemaining);
      } else if (expense2MonthsElapsed < 0) {
        const monthsUntilStart = -expense2MonthsElapsed;
        if (monthsUntilStart < 12) {
          expense2MonthsThisYear = Math.min(12 - monthsUntilStart, state.expenses.expense2Duration);
        }
      }
      expense2Annual = state.expenses.expense2 * expense2MonthsThisYear;
    }

    let expense3Annual = 0;
    if (state.expenses.expense3 > 0) {
      const expense3StartMonthOffset = (state.expenses.expense3StartYear - 1) * 12 + (state.expenses.expense3StartMonth - 1);
      const expense3MonthsElapsed = monthsElapsed - expense3StartMonthOffset;
      let expense3MonthsThisYear = 0;
      if (expense3MonthsElapsed >= 0 && expense3MonthsElapsed < state.expenses.expense3Duration) {
        const expense3MonthsRemaining = state.expenses.expense3Duration - expense3MonthsElapsed;
        expense3MonthsThisYear = Math.min(12, expense3MonthsRemaining);
      } else if (expense3MonthsElapsed < 0) {
        const monthsUntilStart = -expense3MonthsElapsed;
        if (monthsUntilStart < 12) {
          expense3MonthsThisYear = Math.min(12 - monthsUntilStart, state.expenses.expense3Duration);
        }
      }
      expense3Annual = state.expenses.expense3 * expense3MonthsThisYear;
    }
    
    // Calculate annual mortgage payments and balance with lump sum consideration
    let mortgageAnnual = 0;
    let lumpSumAnnual = 0;
    let workingMortgageBalance = currentMortgageBalance;
    let lumpSumApplied = false;
    
    // Check if lump sum payment occurs this year
    const lumpSumMonthOffset = (state.housing.lumpSumYear - 1) * 12 + (state.housing.lumpSumMonth - 1);
    const yearStartMonth = monthsElapsed;
    const yearEndMonth = monthsElapsed + 11;
    
    if (state.housing.lumpSumAmount > 0 && lumpSumMonthOffset >= yearStartMonth && lumpSumMonthOffset <= yearEndMonth) {
      // Apply lump sum at the beginning of the year for simplicity
      const lumpSumPayment = Math.min(state.housing.lumpSumAmount, workingMortgageBalance);
      lumpSumAnnual += lumpSumPayment;
      workingMortgageBalance = Math.max(0, workingMortgageBalance - lumpSumPayment);
      lumpSumApplied = true;
    }
    
    for (let month = 0; month < 12; month++) {
      const monthOffset = monthsElapsed + month;
      
      // Continue making payments as long as there's a balance, regardless of schedule
      if (workingMortgageBalance > 0) {
        // Calculate monthly payment on the adjusted balance using actual interest rate
        const monthlyInterest = workingMortgageBalance * (state.housing.interestRate / 100 / 12);
        let monthlyPrincipal;
        
        if (state.housing.acceleratePayoff && monthOffset < state.housing.targetPayoffMonths) {
          // For accelerated payoff, calculate payment to meet target
          const remainingMonths = Math.max(1, state.housing.targetPayoffMonths - monthOffset);
          const requiredPayment = calculateMortgagePayment(workingMortgageBalance, state.housing.interestRate, remainingMonths);
          // For accelerated payoff, be conservative to spread payments over target period
          const regularPayment = state.housing.monthlyPayment;
          const maxExtraPayment = Math.min(requiredPayment - regularPayment, workingMortgageBalance * 0.1); // Cap extra at 10% of balance
          const targetPayment = regularPayment + Math.max(0, maxExtraPayment);
          monthlyPrincipal = Math.min(targetPayment - monthlyInterest, workingMortgageBalance);
        } else {
          // Use regular monthly payment (either no acceleration or past target period)
          monthlyPrincipal = Math.min(state.housing.monthlyPayment - monthlyInterest, workingMortgageBalance);
        }
        
        monthlyPrincipal = Math.max(0, monthlyPrincipal); // Ensure non-negative
        mortgageAnnual += monthlyInterest + monthlyPrincipal;
        workingMortgageBalance = Math.max(0, workingMortgageBalance - monthlyPrincipal);
      }
    }
    
    // Update the current mortgage balance to reflect lump sum payments
    currentMortgageBalance = workingMortgageBalance;
    
    const netCashFlow = afterTaxIncome - livingExpAnnual - insuranceAnnual - mortgageAnnual - lumpSumAnnual - expense1Annual - expense2Annual - expense3Annual;
    
    // All positive cash flow automatically increases savings, negative cash flow comes from savings
    currentSavingsBalance += netCashFlow + state.savings.additionalAnnual;
    
    // Calculate investment returns from updated savings balance (only on positive balance)
    const investableBalance = Math.max(0, currentSavingsBalance || 0);
    const annualReturn = isNaN(state.savings.annualReturn) ? 0 : state.savings.annualReturn;
    const gainsTaxRate = isNaN(state.savings.gainsTaxRate) ? 0 : state.savings.gainsTaxRate;
    const investmentReturn = investableBalance > 0 ? investableBalance * (annualReturn / 100) : 0;
    const taxOnGains = (state.savings.taxOnGains && investmentReturn > 0) ? investmentReturn * (gainsTaxRate / 100) : 0;
    const netInvestmentReturn = investmentReturn - taxOnGains;
    
    // Apply net investment returns to savings
    currentSavingsBalance += netInvestmentReturn;
    
    // Ensure no NaN values in final calculations
    currentSavingsBalance = isNaN(currentSavingsBalance) ? 0 : currentSavingsBalance;
    
    // Update total taxes to include investment taxes
    const finalTotalTaxes = (isNaN(totalTaxes) ? 0 : totalTaxes) + (isNaN(taxOnGains) ? 0 : taxOnGains);
    
    // Calculate home value with appreciation
    const homeValue = calculateInflationAdjusted(state.housing.homeValue, state.housing.homeAppreciation, yearIndex);
    
    // Calculate net worth
    const netWorth = homeValue + currentSavingsBalance - currentMortgageBalance;
    
    annualData.push({
      year: 2025 + yearIndex,
      paulAge: isNaN(paulAge) ? 0 : paulAge,
      jessicaAge: isNaN(jessicaAge) ? 0 : jessicaAge,
      paulSS: isNaN(paulSSAnnual) ? 0 : paulSSAnnual,
      jessicaSS: isNaN(jessicaSSAnnual) ? 0 : jessicaSSAnnual,
      vaDisability: isNaN(vaDisabilityAnnual) ? 0 : vaDisabilityAnnual,
      business: isNaN(businessAnnual) ? 0 : businessAnnual,
      jessicaWork: isNaN(jessicaAnnual) ? 0 : jessicaAnnual,
      chapter35: isNaN(chapter35Annual) ? 0 : chapter35Annual,
      totalIncome: isNaN(totalIncome) ? 0 : totalIncome,
      totalTaxes: isNaN(finalTotalTaxes) ? 0 : finalTotalTaxes, // Include investment taxes
      afterTaxIncome: isNaN(afterTaxIncome) ? 0 : afterTaxIncome,
      livingExp: isNaN(livingExpAnnual) ? 0 : livingExpAnnual,
      insurance: isNaN(insuranceAnnual) ? 0 : insuranceAnnual,
      expense1: isNaN(expense1Annual) ? 0 : expense1Annual,
      expense2: isNaN(expense2Annual) ? 0 : expense2Annual,
      expense3: isNaN(expense3Annual) ? 0 : expense3Annual,
      mortgage: isNaN(mortgageAnnual + lumpSumAnnual) ? 0 : mortgageAnnual + lumpSumAnnual,
      netCashFlow: isNaN(netCashFlow) ? 0 : netCashFlow,
      returnOnInvestments: isNaN(investmentReturn) ? 0 : investmentReturn, // Gross return before taxes
      investmentReturn: isNaN(netInvestmentReturn) ? 0 : netInvestmentReturn,
      savingsBalance: isNaN(currentSavingsBalance) ? 0 : currentSavingsBalance,
      homeValue: isNaN(homeValue) ? 0 : homeValue,
      mortgageBalance: isNaN(currentMortgageBalance) ? 0 : currentMortgageBalance,
      netWorth: isNaN(netWorth) ? 0 : netWorth
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
  
  // Calculate mortgage interest metrics
  const actualPayoffMonths = state.housing.acceleratePayoff ? state.housing.targetPayoffMonths : 87;
  const totalInterestPaid = calculateTotalInterestFromSchedule(actualPayoffMonths);
  const standardInterestTotal = calculateTotalInterestFromSchedule(87); // Always calculate standard 87-month total
  
  // Calculate interest savings from acceleration
  const accelerationSavings = state.housing.acceleratePayoff ? 
    calculateInterestSaved(state.housing.targetPayoffMonths) : 0;
  
  // Calculate interest savings from lump sum payment
  const lumpSumSavings = state.housing.lumpSumAmount > 0 ? 
    calculateLumpSumInterestSavings(state.housing.lumpSumAmount, state.housing.lumpSumMonth, state.housing.lumpSumYear) : 0;
  
  // Total interest saved combines both acceleration and lump sum savings
  const interestSaved = accelerationSavings + lumpSumSavings;
  
  const mortgagePayoffDate = state.housing.acceleratePayoff ? 
    getMortgagePayoffDate(state.housing.targetPayoffMonths) : getMortgagePayoffDate();
  const standardPayoffDate = getMortgagePayoffDate(); // Standard 87-month payoff date

  return {
    finalNetWorth: finalYear.netWorth,
    totalTaxesPaid,
    avgMonthlyCashFlow,
    savingsGrowthPercent,
    totalInterestPaid,
    standardInterestTotal,
    interestSaved,
    mortgagePayoffDate,
    standardPayoffDate
  };
}
