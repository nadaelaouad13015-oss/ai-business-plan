"use client";

import { useState } from "react";

interface Props {
  onGenerated: (summary: string, sessionId: string) => void;
}

const inputClass =
  "w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:border-white/20";

const labelClass = "block text-sm font-medium text-gray-400 mb-2";

export default function PlanForm({ onGenerated }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    age: "",
    country: "",
    skills: "",
    timePerWeek: "",
    budget: "",
    targetIncome: "",
    riskLevel: "moyen",
    email: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onGenerated(data.summary, data.sessionId);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl gradient-border rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="space-y-5">
        {/* Row: Âge + Pays */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Âge</label>
            <input
              type="text"
              placeholder="28"
              required
              value={form.age}
              onChange={(e) => update("age", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Pays</label>
            <input
              type="text"
              placeholder="France"
              required
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Compétences */}
        <div>
          <label className={labelClass}>Compétences</label>
          <textarea
            placeholder="Marketing digital, Python, design graphique..."
            required
            value={form.skills}
            onChange={(e) => update("skills", e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Temps par semaine */}
        <div>
          <label className={labelClass}>Heures disponibles par semaine</label>
          <input
            type="text"
            placeholder="15"
            required
            value={form.timePerWeek}
            onChange={(e) => update("timePerWeek", e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Row: Budget + Revenu */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Budget de départ (€)</label>
            <input
              type="text"
              placeholder="200"
              required
              value={form.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Revenu cible (€/mois)</label>
            <input
              type="text"
              placeholder="3 000"
              required
              value={form.targetIncome}
              onChange={(e) => update("targetIncome", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Tolérance au risque */}
        <div>
          <label className={labelClass}>Tolérance au risque</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "faible", label: "Faible", icon: "🛡️" },
              { value: "moyen", label: "Moyen", icon: "⚖️" },
              { value: "élevé", label: "Élevé", icon: "🚀" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update("riskLevel", opt.value)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  form.riskLevel === opt.value
                    ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                    : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20"
                }`}
              >
                <span className="block text-lg mb-1">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email (pour recevoir votre plan)</label>
          <input
            type="email"
            placeholder="vous@exemple.com"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
          <p className="text-xs text-gray-500 mt-1.5">Le plan complet vous sera envoyé par email après achat</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 px-6 font-semibold rounded-xl transition-all text-white ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 animate-pulse-glow"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              L&apos;IA analyse votre profil...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Générer mon aperçu gratuit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
