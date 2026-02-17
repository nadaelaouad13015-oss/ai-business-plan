import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan, updatePlan } from "@/lib/store";
import { generateWithClaude } from "@/lib/claude";
import { buildFullPlanPrompt } from "@/lib/prompt";
import { UserProfile } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!) as any;

// POST /api/webhook — Webhook Stripe pour confirmer le paiement
// Déclenche la génération du plan complet uniquement après paiement réussi
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Erreur vérification webhook:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  // Traiter uniquement les paiements réussis
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const planSessionId = session.metadata?.planSessionId;

    if (planSessionId) {
      const plan = await getPlan(planSessionId);
      if (plan) {
        try {
          // Générer le plan complet via Claude
          const fullPlan = await generateWithClaude(
            buildFullPlanPrompt(plan.profile as unknown as UserProfile)
          );
          await updatePlan(planSessionId, { fullPlan, paid: true });
          console.log(`Plan complet généré pour session: ${planSessionId}`);
        } catch (error) {
          console.error("Erreur génération plan complet:", error);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
