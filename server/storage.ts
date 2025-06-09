import {
  users,
  retirementScenarios,
  invitations,
  type User,
  type UpsertUser,
  type RetirementScenario,
  type InsertScenario,
  type Invitation,
  type InsertInvitation,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, or } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Invitation management
  createInvitation(invitation: InsertInvitation, createdBy: string): Promise<Invitation>;
  getInvitationByCode(code: string): Promise<Invitation | undefined>;
  getInvitationByEmail(email: string): Promise<Invitation | undefined>;
  markInvitationUsed(id: number, usedBy: string): Promise<boolean>;
  getUserInvitations(userId: string): Promise<Invitation[]>;
  isUserAuthorized(email: string, inviteCode?: string): Promise<boolean>;
  
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

  // Invitation operations
  async createInvitation(invitation: InsertInvitation, createdBy: string): Promise<Invitation> {
    const [newInvitation] = await db
      .insert(invitations)
      .values({
        ...invitation,
        createdBy,
      })
      .returning();
    return newInvitation;
  }

  async getInvitationByCode(code: string): Promise<Invitation | undefined> {
    const [invitation] = await db
      .select()
      .from(invitations)
      .where(eq(invitations.inviteCode, code));
    return invitation;
  }

  async getInvitationByEmail(email: string): Promise<Invitation | undefined> {
    const [invitation] = await db
      .select()
      .from(invitations)
      .where(and(
        eq(invitations.email, email),
        eq(invitations.isUsed, false)
      ));
    return invitation;
  }

  async markInvitationUsed(id: number, usedBy: string): Promise<boolean> {
    const result = await db
      .update(invitations)
      .set({
        isUsed: true,
        usedBy,
      })
      .where(eq(invitations.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getUserInvitations(userId: string): Promise<Invitation[]> {
    return await db
      .select()
      .from(invitations)
      .where(eq(invitations.createdBy, userId))
      .orderBy(desc(invitations.createdAt));
  }

  async isUserAuthorized(email: string, inviteCode?: string): Promise<boolean> {
    // Check if user already exists (existing users are always authorized)
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    
    if (existingUser.length > 0) {
      return true;
    }

    // Check for valid invitation
    if (inviteCode) {
      const invitation = await db
        .select()
        .from(invitations)
        .where(and(
          eq(invitations.inviteCode, inviteCode),
          eq(invitations.isUsed, false),
          or(
            eq(invitations.email, email),
            eq(invitations.email, null) // Generic invite codes
          )
        ));
      
      if (invitation.length > 0) {
        const inv = invitation[0];
        // Check if invitation is expired
        if (inv.expiresAt && new Date() > inv.expiresAt) {
          return false;
        }
        return true;
      }
    }

    // Check for email-specific invitation
    const emailInvitation = await this.getInvitationByEmail(email);
    if (emailInvitation) {
      // Check if invitation is expired
      if (emailInvitation.expiresAt && new Date() > emailInvitation.expiresAt) {
        return false;
      }
      return true;
    }

    return false;
  }
}

export const storage = new DatabaseStorage();