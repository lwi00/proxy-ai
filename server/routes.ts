import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { enhanceAllMarketReports } from "./mistralService";

// Define the analysis request schema
const analysisRequestSchema = z.object({
  ticker: z.array(z.string()).min(1, "At least one ticker must be selected"),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD"),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD"),
  portfolio_value: z.union([
    z.number().positive("Portfolio value must be positive"),
    z.object({
      positions: z.record(z.object({
        cash: z.number(),
        shares: z.number(),
        ticker: z.string()
      })),
      total_cash: z.number()
    })
  ]),
  model_name: z.enum([
    "FinBERT", "GPT-4", "AlphaFinance", "MarketSage", 
    "Ben Graham", "Bill Ackman", "Cathie Wood", "Charlie Munger", 
    "Peter Lynch", "Phil Fisher", "Stanley Druckenmiller", "Warren Buffett",
    "Technical Analyst", "Fundamentals Analyst", "Sentiment Analyst"
  ]),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint to perform financial analysis
  app.post("/api/analyze", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = analysisRequestSchema.parse(req.body);
      
      // Generate reports for each ticker
      const reports = validatedData.ticker.map(market => {
        // Mock data for the example - in a real app this would call an AI service
        const isPositive = Math.random() > 0.5;
        const changeValue = isPositive ? (Math.random() * 2).toFixed(1) : (-Math.random() * 2).toFixed(1);
        const change = isPositive ? `+${changeValue}%` : `${changeValue}%`;
        
        // Calculate portfolio impact based on the change percentage
        const potentialReturnValue = parseFloat(changeValue);
        let projectedValue = 0;
        
        if (typeof validatedData.portfolio_value === 'number') {
          projectedValue = validatedData.portfolio_value * (1 + potentialReturnValue / 100);
        } else {
          // Get total portfolio value from positions and cash
          let totalPortfolioValue = validatedData.portfolio_value.total_cash;
          
          // Add value of all positions
          Object.values(validatedData.portfolio_value.positions).forEach(position => {
            // In a real app, we would use actual stock prices here
            // For now, use a simplified approach
            totalPortfolioValue += position.cash + (position.shares * 100); // Assume $100 per share for simplicity
          });
          
          projectedValue = totalPortfolioValue * (1 + potentialReturnValue / 100);
        }
        
        return {
          market,
          timestamp: new Date().toISOString(),
          summary: `${market} ${isPositive ? "saw modest gains" : "experienced a slight decline"} during the analyzed period. ${isPositive ? "Trading volume remained consistent with 30-day averages, suggesting stable market conditions." : "Trading volume was above average, suggesting increased selling pressure."}`,
          metrics: {
            price: market === "NASDAQ" ? 13500.23 : market === "DOW JONES" ? 38245.12 : 4500.87,
            priceChange: isPositive ? `+${(Math.random() * 3).toFixed(1)}%` : `-${(Math.random() * 3).toFixed(1)}%`,
            priceChangeValue: isPositive ? parseFloat((Math.random() * 3).toFixed(1)) : -parseFloat((Math.random() * 3).toFixed(1)),
            volume: market === "NASDAQ" ? 20000000 : market === "DOW JONES" ? 35420000 : 15000000,
            volumeChange: isPositive ? `-${(Math.random() * 0.5).toFixed(1)}%` : `+${(Math.random() * 12).toFixed(1)}%`,
            volumeChangeValue: isPositive ? -parseFloat((Math.random() * 0.5).toFixed(1)) : parseFloat((Math.random() * 12).toFixed(1)),
            volatility: isPositive ? 1.2 : 1.8,
            volatilityStatus: isPositive ? "Stable" : "Elevated",
          },
          ai_insights: isPositive 
            ? `${market === "NASDAQ" ? "Tech" : market === "DOW JONES" ? "Industrial" : "Broader market"} sector shows resilience despite macro uncertainty. ${market === "NASDAQ" ? "The semiconductor segment outperformed expectations with 3.2% gains, while software companies showed mixed results." : market === "DOW JONES" ? "Consumer staples and healthcare exhibited strength, offsetting weakness in financial stocks." : "Growth stocks outperformed value stocks, with small caps showing particular strength."} Based on current trends, our AI model predicts continued stability with potential upside in ${market === "NASDAQ" ? "cloud infrastructure stocks" : market === "DOW JONES" ? "defensive sectors" : "select growth sectors"}. Portfolio diversification is recommended.`
            : `${market === "NASDAQ" ? "Tech" : market === "DOW JONES" ? "Industrial" : "Market"} stocks have shown weakness amid ${market === "NASDAQ" ? "concerns over valuation multiples and rising interest rates" : market === "DOW JONES" ? "supply chain concerns and rising input costs" : "broader economic uncertainties"}. ${market === "NASDAQ" ? "Financial institutions faced pressure from yield curve adjustments." : market === "DOW JONES" ? "Manufacturing data suggested slowing momentum in the sector." : "Recent economic indicators have introduced volatility."} Our AI model suggests this may be a temporary correction rather than a sustained downtrend. ${market === "NASDAQ" ? "Defensive tech positions with strong cash flows may offer relative safety." : market === "DOW JONES" ? "Dividend-paying blue chips may provide stability in the current environment." : "Selective positioning in quality companies with strong balance sheets is advised."}`,
          model_name: validatedData.model_name,
          portfolioImpact: {
            projectedValue: projectedValue,
            potentialReturn: change,
            potentialReturnValue: potentialReturnValue,
          },
          change,
          changeValue: parseFloat(changeValue),
        };
      });

      // Store the analysis results
      // In a real app, this would be stored in a database for future reference
      
      // Create analysis results object
      const analysisResponse = {
        reports,
        timestamp: new Date().toISOString(),
      };
      
      // Enhance the analysis with Mistral AI
      try {
        const enhancedResponse = await enhanceAllMarketReports(analysisResponse);
        res.json(enhancedResponse);
      } catch (aiError) {
        console.error("Error enhancing analysis with Mistral AI:", aiError);
        // Fall back to original analysis if AI enhancement fails
        res.json(analysisResponse);
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid analysis parameters", 
          errors: error.errors 
        });
      } else {
        console.error("Analysis error:", error);
        res.status(500).json({ message: "Error performing analysis" });
      }
    }
  });

  // Endpoint to get the latest analysis
  app.get("/api/analysis", (req, res) => {
    // In a real app, this would retrieve the stored analysis from a database
    // For now, return a empty response or the latest analysis if available
    res.json({ reports: [] });
  });

  const httpServer = createServer(app);
  return httpServer;
}
