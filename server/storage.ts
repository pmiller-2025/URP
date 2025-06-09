import {
  users,
  retirementScenarios,
  type User,
  type UpsertUser,
  type RetirementScenario,
  type InsertScenario,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Scenario management
  getUserScenarios(userId: string): Promise<RetirementScenario[]>;
  getScenario(id: number, userId: string): Promise<RetirementScenario | undefined>;
  createScenario(scenario: InsertScenario, userId: string): Promise<RetirementScenario>;
  updateScenario(id: number, updates: Partial<InsertScenario>, userId: string): Promise<RetirementScenario | undefined>;
  deleteScenario(id: number, userId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Scenario operations
  async getUserScenarios(userId: string): Promise<RetirementScenario[]> {
    return await db
      .select()
      .from(retirementScenarios)
      .where(eq(retirementScenarios.userId, userId))
      .orderBy(desc(retirementScenarios.updatedAt));
  }

  async getScenario(id: number, userId: string): Promise<RetirementScenario | undefined> {
    const [scenario] = await db
      .select()
      .from(retirementScenarios)
      .where(and(
        eq(retirementScenarios.id, id),
        eq(retirementScenarios.userId, userId)
      ));
    return scenario;
  }

  async createScenario(scenario: InsertScenario, userId: string): Promise<RetirementScenario> {
    const [newScenario] = await db
      .insert(retirementScenarios)
      .values({
        ...scenario,
        userId,
      })
      .returning();
    return newScenario;
  }

  async updateScenario(id: number, updates: Partial<InsertScenario>, userId: string): Promise<RetirementScenario | undefined> {
    const [updatedScenario] = await db
      .update(retirementScenarios)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(and(
        eq(retirementScenarios.id, id),
        eq(retirementScenarios.userId, userId)
      ))
      .returning();
    return updatedScenario;
  }

  async deleteScenario(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(retirementScenarios)
      .where(and(
        eq(retirementScenarios.id, id),
        eq(retirementScenarios.userId, userId)
      ));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new DatabaseStorage();