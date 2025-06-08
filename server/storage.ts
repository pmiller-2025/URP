import { users, retirementScenarios, type User, type InsertUser, type RetirementScenario, type InsertScenario } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Scenario management
  getAllScenarios(): Promise<RetirementScenario[]>;
  getScenario(id: number): Promise<RetirementScenario | undefined>;
  createScenario(scenario: InsertScenario): Promise<RetirementScenario>;
  updateScenario(id: number, updates: Partial<InsertScenario>): Promise<RetirementScenario | undefined>;
  deleteScenario(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { getDb } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { getDb } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { getDb } = await import("./db");
    const db = getDb();
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllScenarios(): Promise<RetirementScenario[]> {
    const { getDb } = await import("./db");
    const { desc } = await import("drizzle-orm");
    const db = getDb();
    return await db.select().from(retirementScenarios).orderBy(desc(retirementScenarios.updatedAt));
  }

  async getScenario(id: number): Promise<RetirementScenario | undefined> {
    const { getDb } = await import("./db");
    const db = getDb();
    const { eq } = await import("drizzle-orm");
    const [scenario] = await db.select().from(retirementScenarios).where(eq(retirementScenarios.id, id));
    return scenario || undefined;
  }

  async createScenario(scenario: InsertScenario): Promise<RetirementScenario> {
    const { getDb } = await import("./db");
    const db = getDb();
    const [created] = await db
      .insert(retirementScenarios)
      .values(scenario)
      .returning();
    return created;
  }

  async updateScenario(id: number, updates: Partial<InsertScenario>): Promise<RetirementScenario | undefined> {
    const { getDb } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const db = getDb();
    const [updated] = await db
      .update(retirementScenarios)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(retirementScenarios.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteScenario(id: number): Promise<boolean> {
    const { getDb } = await import("./db");
    const { eq } = await import("drizzle-orm");
    const db = getDb();
    const result = await db
      .delete(retirementScenarios)
      .where(eq(retirementScenarios.id, id));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new DatabaseStorage();
