import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan, updatePlan } from "@/lib/store";
import { generateWithClaude } from "@/lib/claude";
import { buildFullPlanPrompt } from "@/lib/prompt";
import { UserProfile } from "@/lib/types";
import { sendPlanEmail } from "@/lib/email";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!) as any;

// GET /api/plan?session=xxx — Récupère le plan après paiement
// Vérifie le paiement directement via Stripe API (pas besoin de webhook)
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session");

  if (!sessionId) {
    return NextResponse.json({ error: "Session manquante" }, { status: 400 });
  }

  const plan = await getPlan(sessionId);
  if (!plan) {
    return NextResponse.json({ error: "Plan introuvable" }, { status: 404 });
  }

  // Si déjà payé et plan déjà généré → retourner directement
  if (plan.paid && plan.fullPlan) {
    return NextResponse.json({
      summary: plan.summary,
      fullPlan: plan.fullPlan,
      paid: true,
    });
  }

  // Vérifier le paiement via l'API Stripe (chercher la session checkout liée)
  if (!plan.paid) {
    try {
      const sessions = await stripe.checkout.sessions.list({
        limit: 10,
      });

      const paidSession = sessions.data.find(
        (s) => s.metadata?.planSessionId === sessionId && s.payment_status === "paid"
      );

      if (paidSession) {
        await updatePlan(sessionId, { paid: true });
        plan.paid = true;
      }
    } catch (err) {
      console.error("Erreur vérification Stripe:", err);
    }
  }

  // Si payé (via webhook ou vérification ci-dessus), générer le plan complet
  if (plan.paid && !plan.fullPlan) {
    try {
      const fullPlan = await generateWithClaude(
        buildFullPlanPrompt(plan.profile as unknown as UserProfile)
      );
      await updatePlan(sessionId, { fullPlan });

      // Envoyer le plan par email si pas encore envoyé
      if (plan.email && !plan.emailSent) {
        try {
          await sendPlanEmail(plan.email, fullPlan);
          await updatePlan(sessionId, { emailSent: true });
        } catch (emailErr) {
          console.error("Erreur envoi email:", emailErr);
        }
      }

      return NextResponse.json({
        summary: plan.summary,
        fullPlan,
        paid: true,
      });
    } catch {
      return NextResponse.json(
        { error: "Erreur lors de la génération" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    summary: plan.summary,
    fullPlan: null,
    paid: plan.paid,
  });
}
