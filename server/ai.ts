import OpenAI from "openai";

// Define the CalculatorState interface for the AI module
interface PersonalInfo {
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

interface SocialSecurity {
  paulAmount: number;
  jessicaAmount: number;
  cola: number;
  paulTaxable: boolean;
  jessicaTaxable: boolean;
  paulStartAge: number;
  jessicaStartAge: number;
}

interface OtherIncome {
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

interface Housing {
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

interface Savings {
  initialAmount: number;
  annualReturn: number;
  additionalAnnual: number;
  taxOnGains: boolean;
  gainsTaxRate: number;
  allocationStrategy: 'conservative' | 'balanced' | 'aggressive' | 'custom';
}

interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
  isCustom: boolean;
}

interface Expenses {
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

interface TaxRates {
  socialSecurity: number;
  business: number;
  jessica: number;
}

interface CalculatorState {
  personalInfo: PersonalInfo;
  socialSecurity: SocialSecurity;
  otherIncome: OtherIncome;
  housing: Housing;
  savings: Savings;
  expenses: Expenses;
  taxRates: TaxRates;
}

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface AIAnalysisRequest {
  prompt: string;
  currentState: CalculatorState;
}

export interface AIAnalysisResponse {
  summary: string;
  changes: Array<{
    field: string;
    oldValue: any;
    newValue: any;
    description: string;
  }>;
  insights: string[];
  recommendations: string[];
  updatedState: CalculatorState;
}

export async function analyzeFinancialScenario(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
  const { prompt, currentState } = request;

  const systemPrompt = `You are a financial advisor AI that helps users with retirement planning scenarios. 

Given a user's current retirement calculator state and their natural language request, you should:
1. Understand what changes they want to make
2. Apply those changes to create an updated state
3. Provide clear insights about the impact
4. Make intelligent recommendations

Current state includes:
- Personal info (ages, birth dates, projection years)
- Social Security benefits and timing
- Other income sources (VA disability, business, Jessica's work, Chapter 35, etc.)
- Housing (mortgage, payments, acceleration)
- Savings and investment strategy
- Expenses and budget
- Tax rates

Return your response as JSON with the following structure:
{
  "summary": "Brief explanation of what was changed and the key impact",
  "changes": [
    {
      "field": "Section.fieldName", 
      "oldValue": "previous value",
      "newValue": "new value",
      "description": "Human readable description of change"
    }
  ],
  "insights": ["Key insight 1", "Key insight 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "updatedState": { /* complete updated calculator state */ }
}

Important guidelines:
- Always return a complete updatedState with all fields
- Be conservative with changes - only modify what the user specifically requests
- For Social Security timing, use the predefined age options (62, 63, 64, 65, 66, 67, 68, 69, 70)
- When suggesting investment strategies, use: 'conservative', 'balanced', 'aggressive', or 'custom'
- Keep insights focused on financial impact (net worth, cash flow, taxes, etc.)
- Make practical recommendations that align with the user's apparent goals
- If the request is unclear, make reasonable assumptions and explain them`;

  const userMessage = `Current retirement calculator state:
${JSON.stringify(currentState, null, 2)}

User request: "${prompt}"

Please analyze this request and provide the updated scenario with insights.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 4000
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate the response structure
    if (!result.summary || !result.updatedState || !Array.isArray(result.changes)) {
      throw new Error("Invalid AI response structure");
    }

    return {
      summary: result.summary,
      changes: result.changes || [],
      insights: result.insights || [],
      recommendations: result.recommendations || [],
      updatedState: result.updatedState
    };

  } catch (error) {
    console.error('AI analysis error:', error);
    throw new Error('Failed to analyze financial scenario. Please try rephrasing your request.');
  }
}