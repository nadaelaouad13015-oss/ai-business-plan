// Store persistant avec Upstash Redis
// Fonctionne parfaitement en serverless (Vercel)
// Les plans expirent automatiquement après 24h

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const PREFIX = "plan:";
const TTL = 60 * 60 * 24 * 30; // 30 jours

export interface StoredPlan {
  profile: Record<string, unknown>;
  email: string;
  summary: string;
  fullPlan?: string;
  paid: boolean;
  emailSent: boolean;
  createdAt: number;
}

export async function savePlan(
  sessionId: string,
  data: Omit<StoredPlan, "createdAt">
) {
  const plan: StoredPlan = { ...data, createdAt: Date.now() };
  await redis.set(`${PREFIX}${sessionId}`, JSON.stringify(plan), { ex: TTL });
}

export async function getPlan(
  sessionId: string
): Promise<StoredPlan | null> {
  const data = await redis.get<string>(`${PREFIX}${sessionId}`);
  if (!data) return null;
  return typeof data === "string" ? JSON.parse(data) : data as unknown as StoredPlan;
}

export async function updatePlan(
  sessionId: string,
  updates: Partial<StoredPlan>
) {
  const existing = await getPlan(sessionId);
  if (existing) {
    const updated = { ...existing, ...updates };
    // Renouveler le TTL à chaque mise à jour
    await redis.set(`${PREFIX}${sessionId}`, JSON.stringify(updated), { ex: TTL });
  }
}
