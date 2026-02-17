"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FullPlan from "@/components/FullPlan";

function PlanContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retries, setRetries] = useState(0);

  const fetchPlan = useCallback(async () => {
    if (!sessionId) {
      setError("Session invalide");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/plan?session=${sessionId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      if (data.paid && data.fullPlan) {
        setPlan(data.fullPlan);
        setLoading(false);
      } else if (data.paid && !data.fullPlan) {
        if (retries < 10) {
          setTimeout(() => setRetries((r) => r + 1), 3000);
        } else {
          setError("Le plan prend plus de temps que prévu. Rafraîchissez la page.");
          setLoading(false);
        }
      } else {
        setError("Paiement non confirmé. Contactez le support si le problème persiste.");
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setLoading(false);
    }
  }, [sessionId, retries]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dots flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Animated loader */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-white/5" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-white text-xl font-semibold">Génération en cours...</p>
            <p className="text-gray-500 text-sm mt-2">L&apos;IA rédige votre business plan personnalisé</p>
          </div>
          <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-shimmer" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dots flex items-center justify-center">
        <div className="text-center space-y-5 max-w-md gradient-border rounded-2xl p-10">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-white text-lg font-medium">{error}</p>
          <button
            onClick={() => { setLoading(true); setError(null); setRetries(0); }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-dots text-white">
      <nav className="border-b border-white/5 backdrop-blur-md bg-white/[0.02] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
              AI
            </div>
            <span className="text-lg font-semibold tracking-tight">Business Plan</span>
          </a>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-green-400 font-medium">Plan débloqué</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 flex justify-center">
        {plan && <FullPlan content={plan} />}
      </div>
    </main>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dots flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
        </div>
      </div>
    }>
      <PlanContent />
    </Suspense>
  );
}
