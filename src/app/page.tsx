"use client";

import { useState } from "react";
import PlanForm from "@/components/PlanForm";
import SummaryCard from "@/components/SummaryCard";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Business Model complet",
    desc: "Sources de revenus, modèle économique, avantages concurrentiels",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Projections financières",
    desc: "Revenus mois par mois, 2 scénarios (prudent & optimiste)",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Roadmap 6 mois",
    desc: "6 étapes détaillées avec critères de passage et actions concrètes",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Scripts d'acquisition",
    desc: "Messages prêts à envoyer pour LinkedIn, email froid et réseaux",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: "Analyse des risques",
    desc: "Identification des risques avec plans de mitigation concrets",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Automatisation",
    desc: "3 phases d'automatisation pour scaler sans effort",
  },
];

const faqs = [
  {
    q: "Comment fonctionne la génération du plan ?",
    a: "Vous remplissez un formulaire avec votre profil (compétences, budget, objectifs). Notre IA analyse ces données et génère un business plan complet et personnalisé en quelques minutes.",
  },
  {
    q: "L'aperçu est-il vraiment gratuit ?",
    a: "Oui, l'aperçu avec le résumé stratégique, le modèle recommandé et le niveau de confiance est 100% gratuit. Aucune carte bancaire n'est demandée pour l'aperçu.",
  },
  {
    q: "Que contient le plan complet à 30€ ?",
    a: "Business model, roadmap 6 mois, projections financières (2 scénarios), scripts d'acquisition clients, analyse des risques, plan d'automatisation, KPIs à suivre et un verdict final avec checklist.",
  },
  {
    q: "Puis-je recevoir le plan par email ?",
    a: "Oui, après l'achat, le plan complet est automatiquement envoyé à l'email que vous avez renseigné, en pièce jointe HTML pour un rendu optimal.",
  },
  {
    q: "Les projections sont-elles fiables ?",
    a: "Les projections sont des estimations basées sur votre profil et les tendances du marché. Elles servent de cadre réaliste, pas de garantie. Chaque scénario (prudent et optimiste) vous donne une fourchette.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Oui. Vos données sont stockées de manière sécurisée et automatiquement supprimées après 30 jours. Nous ne vendons ni ne partageons vos informations. Le paiement est géré par Stripe, leader mondial du paiement en ligne.",
  },
  {
    q: "Puis-je obtenir un remboursement ?",
    a: "Le plan étant un contenu numérique généré instantanément, le droit de rétractation ne s'applique pas conformément à l'article L221-28 du Code de la consommation. Contactez-nous en cas de problème technique.",
  },
];

export default function Home() {
  const [result, setResult] = useState<{ summary: string; sessionId: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-dots">
      {/* Header */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-white/[0.02] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
              AI
            </div>
            <span className="text-lg font-semibold tracking-tight">Business Plan</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">
              Fonctionnalités
            </a>
            <a href="#how" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">
              Comment ça marche
            </a>
            <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">
              FAQ
            </a>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              IA en ligne
            </div>
          </div>
        </div>
      </nav>

      {!result ? (
        <>
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center pt-20 pb-12">
              {/* Badge */}
              <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Rapport stratégique personnalisé par IA
              </div>

              {/* Hero */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05] text-center max-w-4xl">
                Votre business plan
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  généré par IA
                </span>
                <br />
                <span className="text-4xl md:text-5xl text-gray-300">en quelques minutes</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl text-center max-w-2xl mb-12 leading-relaxed">
                Décrivez votre profil. Notre IA génère un plan d&apos;action
                réaliste, chiffré et prêt à exécuter. <span className="text-white font-medium">Aperçu gratuit</span>, plan complet à 30€.
              </p>

              {/* Form */}
              <PlanForm onGenerated={(summary, sessionId) => setResult({ summary, sessionId })} />

              {/* Trust bar */}
              <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Aperçu gratuit
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Paiement Stripe sécurisé
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Plan envoyé par email
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Téléchargeable en PDF
                </div>
              </div>
            </div>
          </section>

          {/* What you get — pricing section */}
          <section className="max-w-6xl mx-auto px-6 py-16 mt-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Free */}
              <div className="gradient-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wide">
                    Gratuit
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Aperçu stratégique</h3>
                <ul className="space-y-3">
                  {[
                    "Modèle de business recommandé",
                    "Justification personnalisée",
                    "Timeline de lancement estimée",
                    "Indice de confiance du projet",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <span className="text-3xl font-bold">0€</span>
                  <span className="text-gray-500 ml-2 text-sm">aucune carte requise</span>
                </div>
              </div>

              {/* Paid */}
              <div className="relative rounded-2xl p-8 border border-blue-500/30 bg-blue-500/[0.03]">
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-semibold">
                  Plan complet
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wide">
                    Premium
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Business Plan détaillé</h3>
                <ul className="space-y-3">
                  {[
                    "Tout l'aperçu gratuit +",
                    "Business model & modèle économique",
                    "Roadmap 6 mois avec étapes détaillées",
                    "Projections financières (2 scénarios)",
                    "Scripts d'acquisition clients",
                    "Analyse des risques & mitigation",
                    "Plan d'automatisation en 3 phases",
                    "KPIs à suivre + verdict final",
                    "Export PDF, HTML + envoi par email",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <span className="text-3xl font-bold">30€</span>
                  <span className="text-gray-500 ml-2 text-sm">paiement unique</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Un plan complet pour{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  lancer votre activité
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Pas de blabla générique. Un business plan personnalisé et actionnable, adapté à votre profil.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="gradient-border rounded-2xl p-6 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Before/After Section */}
          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-red-300">Rédiger seul un business plan</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Des semaines de rédaction et de recherche",
                    "Pas de projections financières fiables",
                    "Aucune stratégie d'acquisition client",
                    "Consultant à 500€+ pour un plan basique",
                    "Résultat souvent générique et non actionnable",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.03] p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-300">Avec AI Business Plan</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Business plan complet en quelques minutes",
                    "Projections financières sur 6 mois",
                    "Scripts d'acquisition prêts à l'emploi",
                    "Seulement 30€ pour un plan détaillé",
                    "100% personnalisé selon votre profil unique",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section id="how" className="border-y border-white/5 bg-white/[0.01] py-20">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
                Comment ça marche
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Décrivez votre profil",
                    desc: "Remplissez le formulaire avec vos compétences, budget, objectifs et disponibilité. Ça prend 1 minute.",
                    color: "from-blue-500 to-blue-600",
                  },
                  {
                    step: "02",
                    title: "L'IA génère votre plan",
                    desc: "Notre IA analyse votre profil et crée un business plan complet, structuré et personnalisé.",
                    color: "from-purple-500 to-purple-600",
                  },
                  {
                    step: "03",
                    title: "Passez à l'action",
                    desc: "Consultez votre plan en ligne, téléchargez-le en PDF et recevez-le par email. Prêt à exécuter.",
                    color: "from-pink-500 to-pink-600",
                  },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl font-bold mb-6`}>
                      {s.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Guarantee / Trust section */}
          <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="gradient-border rounded-2xl p-10 md:p-14">
              <div className="grid md:grid-cols-3 gap-10">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Paiement sécurisé</h3>
                  <p className="text-sm text-gray-400">Vos paiements sont traités par Stripe, leader mondial. Nous ne stockons jamais vos données bancaires.</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Données protégées</h3>
                  <p className="text-sm text-gray-400">Vos informations sont chiffrées et automatiquement supprimées après 30 jours. Conforme RGPD.</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Support réactif</h3>
                  <p className="text-sm text-gray-400">Une question ou un problème ? Contactez-nous à contact.aibusinessplan@gmail.com, réponse sous 48h.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
              Questions fréquentes
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="gradient-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="gradient-border rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à structurer votre projet ?
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-8">
                  Générez votre aperçu gratuitement en quelques minutes.
                  Aucune carte bancaire requise pour commencer.
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold transition-all animate-pulse-glow"
                >
                  Générer mon aperçu gratuit
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center pt-10 pb-20">
            <button
              onClick={() => setResult(null)}
              className="self-start mb-8 text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Modifier mon profil
            </button>
            <SummaryCard summary={result.summary} sessionId={result.sessionId} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-bold">
                AI
              </div>
              <span className="text-sm text-gray-500">AI Business Plan</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
              <a href="/mentions-legales" className="hover:text-gray-300 transition-colors">Mentions légales</a>
              <a href="/cgv" className="hover:text-gray-300 transition-colors">CGV</a>
              <a href="/confidentialite" className="hover:text-gray-300 transition-colors">Politique de confidentialité</a>
              <a href="#faq" className="hover:text-gray-300 transition-colors">FAQ</a>
              <a href="mailto:contact.aibusinessplan@gmail.com" className="hover:text-gray-300 transition-colors">contact.aibusinessplan@gmail.com</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
            <p>Paiement sécurisé par Stripe. Plan généré par intelligence artificielle.</p>
            <p>&copy; {new Date().getFullYear()} AI Business Plan — Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
