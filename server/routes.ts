import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScenarioSchema, users } from "@shared/schema";
import { compareScenarios } from "./openai";
import { analyzeFinancialScenario, AIAnalysisRequest } from "./ai";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Set password for user (development only)
  app.post('/api/admin/set-password', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      // Hash the password
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      
      // Update user with password hash
      const result = await db
        .update(users)
        .set({ passwordHash })
        .where(eq(users.email, email))
        .returning();
      
      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ success: true, message: "Password set successfully" });
    } catch (error) {
      console.error("Error setting password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Simple password login (development only)
  app.post('/api/dev/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }
      
      // Find user
      const userList = await db.select().from(users).where(eq(users.email, email));
      if (userList.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const user = userList[0];
      
      // Check password
      if (!user.passwordHash) {
        return res.status(401).json({ error: "No password set for this user" });
      }
      
      const passwordValid = await bcrypt.compare(password, user.passwordHash);
      if (!passwordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Create a simple session (for development)
      (req.session as any).userId = user.id;
      (req.session as any).user = user;
      
      res.json({ success: true, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Development auth check
  app.get('/api/dev/user', (req, res) => {
    const user = (req.session as any)?.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json(user);
  });

  // Manual user creation route (for development/admin)
  app.post('/api/admin/create-user', async (req, res) => {
    try {
      const { email, firstName, lastName, inviteCode } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      
      // Check if user already exists
      const existingUsers = await db.select().from(users).where(eq(users.email, email));
      if (existingUsers.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      // Generate a unique user ID
      const userId = Date.now().toString();
      
      // Check authorization
      const isAdmin = await storage.isAdminUser(email);
      if (!isAdmin && inviteCode) {
        const isAuthorized = await storage.isUserAuthorized(email, inviteCode);
        if (!isAuthorized) {
          return res.status(403).json({ error: "Valid invitation required" });
        }
        
        // Mark invitation as used
        const invitation = await storage.getInvitationByCode(inviteCode);
        if (invitation && !invitation.isUsed) {
          await storage.markInvitationUsed(invitation.id, userId);
        }
      }
      
      // Create user
      const user = await storage.upsertUser({
        id: userId,
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        profileImageUrl: null,
      });
      
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Invitation validation route
  app.get('/api/validate-invite/:code', async (req, res) => {
    try {
      const inviteCode = req.params.code;
      const invitation = await storage.getInvitationByCode(inviteCode);
      
      if (!invitation) {
        return res.status(404).json({ valid: false, message: "Invitation not found" });
      }
      
      if (invitation.isUsed) {
        return res.status(400).json({ valid: false, message: "Invitation already used" });
      }
      
      if (invitation.expiresAt && new Date() > invitation.expiresAt) {
        return res.status(400).json({ valid: false, message: "Invitation expired" });
      }
      
      res.json({ valid: true, invitation });
    } catch (error) {
      console.error("Error validating invitation:", error);
      res.status(500).json({ valid: false, message: "Internal server error" });
    }
  });

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

  // Invitation management routes
  app.post("/api/invitations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { email, expiresInDays } = req.body;

      // Generate unique invite code
      const inviteCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Set expiration date if provided
      let expiresAt = null;
      if (expiresInDays && expiresInDays > 0) {
        expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);
      }

      const invitation = await storage.createInvitation({
        email: email || null,
        inviteCode,
        expiresAt,
      }, userId);

      res.status(201).json(invitation);
    } catch (error) {
      console.error("Error creating invitation:", error);
      res.status(500).json({ error: "Failed to create invitation" });
    }
  });

  app.get("/api/invitations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const invitations = await storage.getUserInvitations(userId);
      res.json(invitations);
    } catch (error) {
      console.error("Error fetching invitations:", error);
      res.status(500).json({ error: "Failed to fetch invitations" });
    }
  });

  // Public route to check invitation validity
  app.get("/api/invitations/check/:code", async (req, res) => {
    try {
      const { code } = req.params;
      const invitation = await storage.getInvitationByCode(code);
      
      if (!invitation) {
        return res.status(404).json({ error: "Invitation not found" });
      }

      if (invitation.isUsed) {
        return res.status(410).json({ error: "Invitation already used" });
      }

      if (invitation.expiresAt && new Date() > invitation.expiresAt) {
        return res.status(410).json({ error: "Invitation expired" });
      }

      res.json({ 
        valid: true, 
        email: invitation.email,
        expiresAt: invitation.expiresAt 
      });
    } catch (error) {
      console.error("Error checking invitation:", error);
      res.status(500).json({ error: "Failed to check invitation" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}