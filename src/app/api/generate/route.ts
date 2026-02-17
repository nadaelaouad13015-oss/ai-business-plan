import { NextRequest, NextResponse } from "next/server";
import { generateWithClaude } from "@/lib/claude";
import { buildSummaryPrompt } from "@/lib/prompt";
import { savePlan } from "@/lib/store";
import { UserProfile } from "@/lib/types";
import crypto from "crypto";

// POST /api/generate — Génère le résumé gratuit du business plan
export async function POST(req: NextRequest) {
  try {
    const profile: UserProfile = await req.json();

    // Validation basique
    const required = ["age", "country", "skills", "timePerWeek", "budget", "targetIncome", "riskLevel", "email"];
    for (const field of required) {
      if (!profile[field as keyof UserProfile]) {
        return NextResponse.json({ error: `Champ manquant: ${field}` }, { status: 400 });
      }
    }

    // Générer le résumé via Claude
    const summary = await generateWithClaude(buildSummaryPrompt(profile));

    // Créer un ID de session unique
    const sessionId = crypto.randomUUID();

    // Sauvegarder le profil et le résumé
    await savePlan(sessionId, {
      profile: profile as unknown as Record<string, unknown>,
      email: profile.email,
      summary,
      paid: false,
      emailSent: false,
    });

    return NextResponse.json({ summary, sessionId });
  } catch (error) {
    console.error("Erreur génération:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du plan" },
      { status: 500 }
    );
  }
}
