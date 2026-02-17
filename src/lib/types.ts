// Types partagés pour l'application

export interface UserProfile {
  age: string;
  country: string;
  skills: string;
  timePerWeek: string;
  budget: string;
  targetIncome: string;
  riskLevel: string;
  email: string;
}

export interface PlanResponse {
  summary: string;    // Résumé gratuit (affiché avant paiement)
  fullPlan: string;   // Plan complet (après paiement)
  sessionId: string;  // ID de session pour retrouver le plan
}
