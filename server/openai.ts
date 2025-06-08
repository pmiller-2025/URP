import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ScenarioComparison {
  summary: string;
  keyDifferences: string[];
  financialImpact: {
    netWorthDifference: string;
    cashFlowImpact: string;
    riskAssessment: string;
  };
  recommendations: string[];
  tradeOffs: string[];
}

export async function compareScenarios(
  scenario1: any,
  scenario2: any,
  scenario1Data: any,
  scenario2Data: any
): Promise<ScenarioComparison> {
  const prompt = `
You are a financial advisor analyzing two retirement scenarios. Please provide a comprehensive comparison.

SCENARIO 1: "${scenario1.name}"
Description: ${scenario1.description || "No description provided"}
Data: ${JSON.stringify(scenario1Data, null, 2)}

SCENARIO 2: "${scenario2.name}"  
Description: ${scenario2.description || "No description provided"}
Data: ${JSON.stringify(scenario2Data, null, 2)}

Please analyze these scenarios and provide a detailed comparison in JSON format with the following structure:
{
  "summary": "Brief 2-3 sentence overview of the main differences",
  "keyDifferences": ["Bullet point of major differences between scenarios"],
  "financialImpact": {
    "netWorthDifference": "Explanation of net worth impact over 20 years",
    "cashFlowImpact": "Analysis of monthly cash flow differences",
    "riskAssessment": "Risk comparison between the two approaches"
  },
  "recommendations": ["Specific recommendations based on the analysis"],
  "tradeOffs": ["Key trade-offs to consider between these scenarios"]
}

Focus on:
- Social Security claiming strategies and their long-term impact
- Mortgage acceleration effects on cash flow and wealth building
- Income timing and tax implications
- Overall financial security and flexibility
- Risk vs. reward analysis

Use plain English and avoid financial jargon. Be specific about dollar amounts and timeframes where relevant.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert financial advisor specializing in retirement planning. Provide clear, actionable insights that help people make informed decisions about their financial future."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as ScenarioComparison;
  } catch (error) {
    console.error("Error comparing scenarios:", error);
    throw new Error("Failed to analyze scenarios");
  }
}