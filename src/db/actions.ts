'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import {
  createRSVP as createRSVPQuery,
  deleteRSVP as deleteRSVPQuery,
  updateUiFlag as updateUiFlagQuery,
  getRSVPList as getRSVPListQuery,
  getRSVPSummary as getRSVPSummaryQuery,
  getUiFlag as getUiFlagQuery,
} from './queries';
import type { InsertRsvp } from './schema';

export async function createRSVP(data: InsertRsvp) {
  if (!data.side || !data.name || !data.meal || !data.count || data.count < 1) {
    throw new Error('Invalid input');
  }
  await createRSVPQuery(data);
  revalidatePath('/');
}

export async function getUiFlag(name: string) {
  return getUiFlagQuery(name);
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Unauthorized');
}

export async function deleteRSVPAction(id: number) {
  await requireAdmin();
  await deleteRSVPQuery(id);
  revalidatePath('/admin');
}

export async function updateUiFlagAction(name: string, enabled: boolean) {
  await requireAdmin();
  await updateUiFlagQuery(name, enabled);
  revalidatePath('/admin');
  revalidatePath('/');
}

export async function getRSVPListAction() {
  await requireAdmin();
  return getRSVPListQuery();
}

export async function getRSVPSummaryAction() {
  await requireAdmin();
  return getRSVPSummaryQuery();
}
