import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScenarioSchema } from "@shared/schema";
import { compareScenarios } from "./openai";
import { analyzeFinancialScenario, AIAnalysisRequest } from "./ai";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Protected scenario management routes
  
  // Get user's scenarios
  app.get("/api/scenarios", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const scenarios = await storage.getUserScenarios(userId);
      res.json(scenarios);
    } catch (error) {
      console.error("Error fetching scenarios:", error);
      res.status(500).json({ error: "Failed to fetch scenarios" });
    }
  });

  // Get a specific user scenario
  app.get("/api/scenarios/:id", isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid scenario ID" });
      }
      
      const scenario = await storage.getScenario(id, userId);
      if (!scenario) {
        return res.status(404).json({ error: "Scenario not found" });
      }
      
      res.json(scenario);
    } catch (error) {
      console.error("Error fetching scenario:", error);
      res.status(500).json({ error: "Failed to fetch scenario" });
    }
  });

  // Create a new scenario for user
  app.post("/api/scenarios", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertScenarioSchema.parse(req.body);
      const scenario = await storage.createScenario(validatedData, userId);
      res.status(201).json(scenario);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating scenario:", error);
      res.status(500).json({ error: "Failed to create scenario" });
    }
  });

  // Update user's scenario
  app.put("/api/scenarios/:id", isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid scenario ID" });
      }

      const validatedData = insertScenarioSchema.partial().parse(req.body);
      const scenario = await storage.updateScenario(id, validatedData, userId);
      
      if (!scenario) {
        return res.status(404).json({ error: "Scenario not found" });
      }
      
      res.json(scenario);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating scenario:", error);
      res.status(500).json({ error: "Failed to update scenario" });
    }
  });

  // Delete user's scenario
  app.delete("/api/scenarios/:id", isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid scenario ID" });
      }

      const deleted = await storage.deleteScenario(id, userId);
      if (!deleted) {
        return res.status(404).json({ error: "Scenario not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting scenario:", error);
      res.status(500).json({ error: "Failed to delete scenario" });
    }
  });

  // Compare user's scenarios with AI
  app.post("/api/scenarios/compare", isAuthenticated, async (req: any, res) => {
    try {
      const { scenario1Id, scenario2Id } = req.body;
      const userId = req.user.claims.sub;
      
      if (!scenario1Id || !scenario2Id) {
        return res.status(400).json({ error: "Both scenario IDs are required" });
      }

      const scenario1 = await storage.getScenario(parseInt(scenario1Id), userId);
      const scenario2 = await storage.getScenario(parseInt(scenario2Id), userId);

      if (!scenario1 || !scenario2) {
        return res.status(404).json({ error: "One or both scenarios not found" });
      }

      const comparison = await compareScenarios(
        scenario1,
        scenario2,
        scenario1.scenarioData,
        scenario2.scenarioData
      );

      res.json(comparison);
    } catch (error) {
      console.error("Error comparing scenarios:", error);
      res.status(500).json({ error: "Failed to compare scenarios" });
    }
  });

  // AI Analysis endpoint
  app.post("/api/ai/analyze", isAuthenticated, async (req, res) => {
    try {
      const { prompt, currentState } = req.body;
      
      if (!prompt || !currentState) {
        return res.status(400).json({ error: "Prompt and current state are required" });
      }

      const analysisRequest: AIAnalysisRequest = {
        prompt,
        currentState
      };

      const result = await analyzeFinancialScenario(analysisRequest);
      res.json(result);
    } catch (error) {
      console.error("Error analyzing financial scenario:", error);
      res.status(500).json({ error: "Failed to analyze scenario. Please try rephrasing your request." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}