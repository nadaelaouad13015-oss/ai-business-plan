export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-dots">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors mb-8 inline-flex items-center gap-2">
          &larr; Retour
        </a>
        <h1 className="text-3xl font-bold mb-10">Politique de confidentialité</h1>
        <div className="space-y-8 text-sm text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est :<br />
              Nada El Aouad — contact@aibusinessplan.fr
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Données collectées</h2>
            <p>Nous collectons les données suivantes lors de l&apos;utilisation du service :</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong className="text-gray-300">Données du formulaire :</strong> âge, pays, compétences, disponibilité, budget, revenu cible, tolérance au risque.</li>
              <li><strong className="text-gray-300">Email :</strong> adresse email pour l&apos;envoi du plan.</li>
              <li><strong className="text-gray-300">Données de paiement :</strong> traitées directement par Stripe. Nous ne stockons jamais vos informations bancaires.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Générer votre business plan personnalisé</li>
              <li>Traiter votre paiement via Stripe</li>
              <li>Vous envoyer le plan complet par email</li>
            </ul>
            <p className="mt-3">
              Vos données ne sont <strong className="text-gray-300">jamais vendues, louées ou partagées</strong> à des
              tiers à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Base légale</h2>
            <p>
              Le traitement est fondé sur l&apos;exécution du contrat (génération du plan commandé) conformément
              à l&apos;article 6.1.b du RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Durée de conservation</h2>
            <p>
              Les données liées à votre plan sont conservées pendant 30 jours après la génération, puis
              automatiquement supprimées. Les données de facturation sont conservées conformément aux
              obligations légales (10 ans).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Sous-traitants</h2>
            <p>Nous faisons appel aux sous-traitants suivants :</p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong className="text-gray-300">Vercel</strong> (États-Unis) — hébergement du site</li>
              <li><strong className="text-gray-300">Stripe</strong> (États-Unis) — traitement des paiements</li>
              <li><strong className="text-gray-300">Upstash</strong> (États-Unis) — stockage temporaire des données</li>
              <li><strong className="text-gray-300">OpenRouter / DeepSeek</strong> — génération du contenu par IA</li>
              <li><strong className="text-gray-300">Resend</strong> (États-Unis) — envoi d&apos;emails transactionnels</li>
            </ul>
            <p className="mt-3">
              Ces sous-traitants sont soumis à des obligations de confidentialité et de sécurité des données.
              Les transferts hors UE sont encadrés par les clauses contractuelles types de la Commission européenne.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong className="text-gray-300">Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
              <li><strong className="text-gray-300">Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong className="text-gray-300">Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong className="text-gray-300">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong className="text-gray-300">Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à : contact@aibusinessplan.fr.
              Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL (cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement du service
              (session, préférences). Aucun cookie publicitaire ou de tracking tiers n&apos;est utilisé.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Sécurité</h2>
            <p>
              Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger
              vos données : chiffrement HTTPS, stockage sécurisé avec expiration automatique, accès restreint
              aux données.
            </p>
          </section>

          <p className="text-gray-600 pt-4 border-t border-white/5">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </main>
  );
}
