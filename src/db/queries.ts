import { eq, isNull, count, sql } from 'drizzle-orm';
import { db } from './index';
import { adminCredentials, uiFlags, rsvp, type InsertRsvp } from './schema';

export async function createRSVP(data: InsertRsvp) {
  const [row] = await db.insert(rsvp).values(data).returning();
  return row;
}

export async function getUiFlag(name: string) {
  const [row] = await db
    .select({ enabled: uiFlags.enabled, updatedAt: uiFlags.updatedAt })
    .from(uiFlags)
    .where(eq(uiFlags.name, name));
  return row ?? null;
}

export async function deleteRSVP(id: number) {
  await db.update(rsvp).set({ deletedAt: new Date() }).where(eq(rsvp.id, id));
}

export async function updateUiFlag(name: string, enabled: boolean) {
  const [row] = await db
    .update(uiFlags)
    .set({ enabled, updatedAt: new Date() })
    .where(eq(uiFlags.name, name))
    .returning();
  return row;
}

export async function getRSVPList() {
  return db.select().from(rsvp).where(isNull(rsvp.deletedAt));
}

export async function getRSVPSummary() {
  const [row] = await db
    .select({
      total: count(),
      mealYes: sql<number>`count(*) filter (where ${rsvp.meal} = 'yes')`,
      mealUndecided: sql<number>`count(*) filter (where ${rsvp.meal} = 'undecided')`,
      sideGroom: sql<number>`count(*) filter (where ${rsvp.side} = 'groom')`,
      sideBride: sql<number>`count(*) filter (where ${rsvp.side} = 'bride')`,
      lastUpdatedAt: sql<string>`max(${rsvp.createdAt})`,
    })
    .from(rsvp)
    .where(isNull(rsvp.deletedAt));
  return row;
}

export async function getAdminByUsername(username: string) {
  const [row] = await db
    .select()
    .from(adminCredentials)
    .where(
      sql`${adminCredentials.username} = ${username} and ${adminCredentials.deletedAt} is null`
    );
  return row ?? null;
}
