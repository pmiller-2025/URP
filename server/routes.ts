import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScenarioSchema } from "@shared/schema";
import { compareScenarios } from "./openai";
import { analyzeFinancialScenario, AIAnalysisRequest } from "./ai";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Scenario management routes
  
  // Get all scenarios
  app.get("/api/scenarios", async (req, res) => {
    try {
      const scenarios = await storage.getAllScenarios();
      res.json(scenarios);
    } catch (error) {
      console.error("Error fetching scenarios:", error);
      res.status(500).json({ error: "Failed to fetch scenarios" });
    }
  });

  // Get a specific scenario
  app.get("/api/scenarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid scenario ID" });
      }
      
      const scenario = await storage.getScenario(id);
      if (!scenario) {
        return res.status(404).json({ error: "Scenario not found" });
      }
      
      res.json(scenario);
    } catch (error) {
      console.error("Error fetching scenario:", error);
      res.status(500).json({ error: "Failed to fetch scenario" });
    }
  });

  // Create a new scenario
  app.post("/api/scenarios", async (req, res) => {
    try {
      const validatedData = insertScenarioSchema.parse(req.body);
      const scenario = await storage.createScenario(validatedData);
      res.status(201).json(scenario);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating scenario:", error);
      res.status(500).json({ error: "Failed to create scenario" });
    }
  });

  // Update a scenario
  app.put("/api/scenarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid scenario ID" });
      }

      const validatedData = insertScenarioSchema.partial().parse(req.body);
      const scenario = await storage.updateScenario(id, validatedData);
      
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

  // Delete a scenario
  app.delete("/api/scenarios/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid scenario ID" });
      }

      const deleted = await storage.deleteScenario(id);
      if (!deleted) {
        return res.status(404).json({ error: "Scenario not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting scenario:", error);
      res.status(500).json({ error: "Failed to delete scenario" });
    }
  });

  // Compare scenarios with AI
  app.post("/api/scenarios/compare", async (req, res) => {
    try {
      const { scenario1Id, scenario2Id } = req.body;
      
      if (!scenario1Id || !scenario2Id) {
        return res.status(400).json({ error: "Both scenario IDs are required" });
      }

      const scenario1 = await storage.getScenario(parseInt(scenario1Id));
      const scenario2 = await storage.getScenario(parseInt(scenario2Id));

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

  const httpServer = createServer(app);
  return httpServer;
}
