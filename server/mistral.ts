import { Mistral } from "@mistralai/mistralai";

// Initialize Mistral client with API key from environment variables
export const mistralClient = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

/**
 * Use Mistral AI to enhance market analysis with more understandable insights
 */
export async function enhanceMarketAnalysis(marketName: string, rawAnalysis: string, modelStyle: string): Promise<string> {
  try {
    // Create a prompt that will guide the LLM to create a better market analysis
    const prompt = `
You are a financial analyst working for a professional Bloomberg-style financial terminal.
You need to analyze the following raw market report for ${marketName} and provide insights in the style of ${modelStyle}.

Raw report:
${rawAnalysis}

Please rewrite this analysis with the following requirements:
1. Adopt the perspective and style of ${modelStyle}
2. Be concise but insightful (150-250 words)
3. Focus on actionable investment insights
4. Avoid generic statements and provide specific reasoning for the outlook
5. If writing as a specific investor like Warren Buffett or Charlie Munger, mimic their actual investment philosophy
6. Include a specific recommendation or conclusion

Output format: Plain text without any headings or extra formatting.
`;

    // Call Mistral AI API
    const response = await mistralClient.chat.complete({
      model: "mistral-small-latest",  // You can adjust the model as needed
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extract the enhanced analysis from the response
    const enhancedAnalysis = response.choices[0].message.content;
    return enhancedAnalysis;
  } catch (error) {
    console.error("Error calling Mistral AI:", error);
    // Return a fallback message if API call fails
    return `Analysis for ${marketName} is being processed. Check back shortly for detailed insights based on ${modelStyle}'s perspective.`;
  }
}

/**
 * Use Mistral AI to process a complete analysis response and enhance all market reports
 */
export async function enhanceAllMarketReports(analysisResponse: any): Promise<any> {
  // Create a copy of the response to avoid mutating the original
  const enhancedResponse = { ...analysisResponse };
  
  // Process each report sequentially with enhanced AI insights
  if (enhancedResponse.reports && enhancedResponse.reports.length > 0) {
    for (const report of enhancedResponse.reports) {
      // Combine existing insights with market data for a complete picture
      const rawAnalysisText = `
Market: ${report.market}
Current Price: ${report.metrics.price}
Price Change: ${report.metrics.priceChange}
Volume: ${report.metrics.volume}
Volume Change: ${report.metrics.volumeChange}
Volatility: ${report.metrics.volatility} (${report.metrics.volatilityStatus})
Summary: ${report.summary}
Existing AI Insights: ${report.ai_insights}
Portfolio Impact: Projected value ${report.portfolioImpact.projectedValue} with a ${report.portfolioImpact.potentialReturn} return.
`;
      
      // Get enhanced analysis from Mistral AI
      const enhancedInsights = await enhanceMarketAnalysis(
        report.market, 
        rawAnalysisText, 
        report.model_name
      );
      
      // Update the report with enhanced insights
      report.ai_insights = enhancedInsights;
    }
  }
  
  return enhancedResponse;
}