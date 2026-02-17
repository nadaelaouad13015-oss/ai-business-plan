"use client";

import { useState } from "react";

interface Props {
  summary: string;
  sessionId: string;
}

// Parse le résumé en sections structurées
function parseSummary(text: string) {
  const lines = text.split("\n").filter((l) => l.trim());
  const sections: { type: "heading" | "text" | "metric"; content: string; label?: string }[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Détecter les métriques (lignes avec : ou —)
    const metricMatch = trimmed.match(/^[\-\*]?\s*\*?\*?(.+?)\*?\*?\s*[:：—–-]\s*(.+)$/);
    if (metricMatch && metricMatch[1].length < 50) {
      sections.push({ type: "metric", label: metricMatch[1].replace(/\*/g, "").trim(), content: metricMatch[2].replace(/\*/g, "").trim() });
      continue;
    }

    // Détecter les titres (bold ou #)
    const headingMatch = trimmed.match(/^#{1,3}\s+(.+)$/) || trimmed.match(/^\*\*(.+)\*\*$/);
    if (headingMatch) {
      sections.push({ type: "heading", content: headingMatch[1] });
      continue;
    }

    // Texte normal (nettoyer le markdown basique)
    const clean = trimmed
      .replace(/^\*\s+/, "")
      .replace(/^-\s+/, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1");
    sections.push({ type: "text", content: clean });
  }

  return sections;
}

export default function SummaryCard({ summary, sessionId }: Props) {
  const [loading, setLoading] = useState(false);
  const sections = parseSummary(summary);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur de paiement");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-8">

      {/* ========== APERÇU GRATUIT ========== */}
      <div className="relative">
        {/* Glow derrière la carte */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-3xl blur-xl" />

        <div className="relative gradient-border rounded-2xl backdrop-blur-sm overflow-hidden">
          {/* Header de la carte */}
          <div className="px-8 pt-8 pb-6 border-b border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Analyse de votre profil</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Aperçu gratuit de votre business plan</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                Gratuit
              </span>
            </div>
          </div>

          {/* Contenu structuré */}
          <div className="px-8 py-6 space-y-4">
            {sections.map((section, i) => {
              if (section.type === "heading") {
                return (
                  <h3 key={i} className="text-base font-semibold text-white pt-2 flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                    {section.content}
                  </h3>
                );
              }

              if (section.type === "metric") {
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{section.label}</p>
                      <p className="text-sm text-gray-200 mt-0.5">{section.content}</p>
                    </div>
                  </div>
                );
              }

              return (
                <p key={i} className="text-[15px] text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              );
            })}
          </div>

          {/* Footer de la carte */}
          <div className="px-8 py-4 border-t border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Analyse basée sur vos compétences, votre marché et votre budget
            </div>
          </div>
        </div>
      </div>

      {/* ========== CE QUE CONTIENT LE PLAN COMPLET ========== */}
      <div className="gradient-border rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Contenu du plan complet
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", title: "Business Model détaillé", desc: "Flux opérationnel + sources de revenus", color: "indigo" },
            { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", title: "Feuille de route 6 mois", desc: "Étapes clés avec critères de passage", color: "blue" },
            { icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z", title: "Scripts de vente", desc: "LinkedIn, email, appel prêts à copier", color: "purple" },
            { icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Projections financières", desc: "2 scénarios + break-even", color: "emerald" },
            { icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", title: "Analyse des risques", desc: "5+ risques + mitigations", color: "red" },
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Automatisation & KPIs", desc: "Outils, scaling, indicateurs", color: "cyan" },
          ].map((item) => {
            const colorMap: Record<string, string> = {
              indigo: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/20 text-indigo-400",
              blue: "from-blue-500/15 to-blue-500/5 border-blue-500/20 text-blue-400",
              purple: "from-purple-500/15 to-purple-500/5 border-purple-500/20 text-purple-400",
              emerald: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
              amber: "from-amber-500/15 to-amber-500/5 border-amber-500/20 text-amber-400",
              red: "from-red-500/15 to-red-500/5 border-red-500/20 text-red-400",
              cyan: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/20 text-cyan-400",
            };
            const colors = colorMap[item.color] || colorMap.blue;
            const [gradientColors, , textColor] = [
              colors.split(" ").slice(0, 2).join(" "),
              colors.split(" ")[2],
              colors.split(" ")[3],
            ];

            return (
              <div key={item.title} className={`flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r ${gradientColors} border ${colors.split(" ")[2]}`}>
                <div className={`w-9 h-9 rounded-lg bg-black/20 flex items-center justify-center flex-shrink-0`}>
                  <svg className={`w-4.5 h-4.5 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========== CTA PAIEMENT ========== */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-3xl blur-xl animate-pulse" />

        <div className="relative gradient-border rounded-2xl p-10 backdrop-blur-sm text-center">
          {/* Prix */}
          <div className="mb-6">
            <div className="inline-flex items-baseline gap-1 mb-3">
              <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">30</span>
              <span className="text-2xl font-bold text-gray-400">€</span>
            </div>
            <p className="text-gray-400 text-sm">Paiement unique — accès immédiat au plan complet</p>
          </div>

          {/* Checklist */}
          <div className="flex flex-col items-center gap-2 mb-8 text-sm">
            {[
              "Business model complet avec flux opérationnel",
              "Feuille de route 6 mois avec étapes clés",
              "Scripts LinkedIn, email et appel prêts à copier",
              "Projections financières (2 scénarios) + break-even",
              "Analyse de risques + KPIs + checklist de démarrage",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-gray-300">
                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>

          {/* Bouton */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`w-full max-w-sm mx-auto py-4 px-8 font-bold rounded-xl transition-all text-white text-lg block ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Redirection...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Obtenir mon plan complet
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            )}
          </button>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Stripe sécurisé
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Accès instantané
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Téléchargeable
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
