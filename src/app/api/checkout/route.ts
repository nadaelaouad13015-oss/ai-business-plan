import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPlan } from "@/lib/store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!) as any;

// POST /api/checkout — Crée une session Stripe Checkout
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    // Vérifier que le plan existe
    const plan = await getPlan(sessionId);
    if (!plan) {
      return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
    }

    // Créer la session Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Business Plan IA Personnalisé",
              description: "Plan d'affaires complet généré par IA, adapté à votre profil",
            },
            unit_amount: 3000, // 30€ en centimes
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/plan?session=${sessionId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?cancelled=true`,
      metadata: {
        planSessionId: sessionId, // Pour retrouver le plan dans le webhook
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Erreur checkout:", errMsg);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement", details: errMsg },
      { status: 500 }
    );
  }
}
