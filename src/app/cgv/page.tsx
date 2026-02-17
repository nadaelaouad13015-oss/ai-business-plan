export default function CGV() {
  return (
    <main className="min-h-screen bg-dots">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors mb-8 inline-flex items-center gap-2">
          &larr; Retour
        </a>
        <h1 className="text-3xl font-bold mb-10">Conditions Générales de Vente</h1>
        <div className="space-y-8 text-sm text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent la vente du service de génération de business
              plans par intelligence artificielle proposé sur le site AI Business Plan. Toute commande implique
              l&apos;acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Service proposé</h2>
            <p>
              Le service consiste en la génération automatisée d&apos;un business plan personnalisé basé sur les
              informations fournies par l&apos;utilisateur (profil, compétences, budget, objectifs).
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong className="text-gray-300">Aperçu gratuit :</strong> un résumé stratégique est fourni gratuitement après soumission du formulaire.</li>
              <li><strong className="text-gray-300">Plan complet :</strong> le business plan détaillé est accessible après paiement de 30€ TTC.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Prix et paiement</h2>
            <p>
              Le prix du plan complet est de 30€ TTC. Le paiement est effectué en ligne par carte bancaire via la
              plateforme sécurisée Stripe. Le paiement est exigible immédiatement à la commande.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Livraison</h2>
            <p>
              Le plan complet est délivré immédiatement après confirmation du paiement, sous forme de document
              consultable en ligne et téléchargeable aux formats PDF et HTML. Un exemplaire est également envoyé
              par email à l&apos;adresse renseignée lors de la commande.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Droit de rétractation</h2>
            <p>
              Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne s&apos;applique
              pas aux contrats de fourniture de contenu numérique non fourni sur un support matériel dont l&apos;exécution
              a commencé avec l&apos;accord du consommateur. En validant votre achat, vous reconnaissez que la génération
              du plan commence immédiatement et renoncez expressément à votre droit de rétractation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Limitation de responsabilité</h2>
            <p>
              Le business plan généré est un document à visée informative produit par intelligence artificielle.
              Il ne constitue pas un conseil professionnel (juridique, comptable ou financier). Les projections
              financières sont des estimations qui ne garantissent aucun résultat. L&apos;éditeur décline toute
              responsabilité quant aux décisions prises sur la base du contenu généré.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Propriété intellectuelle</h2>
            <p>
              Le contenu du plan généré est la propriété de l&apos;utilisateur qui l&apos;a commandé. L&apos;utilisateur
              est libre de l&apos;utiliser, le modifier et le diffuser comme il le souhaite. La technologie et le
              code source du service restent la propriété exclusive de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Service client</h2>
            <p>
              Pour toute question relative à votre commande, vous pouvez nous contacter à l&apos;adresse :
              contact.aibusinessplan@gmail.com. Nous nous engageons à répondre sous 48h ouvrées.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Droit applicable et litiges</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera
              recherchée avant toute action judiciaire. À défaut, les tribunaux français seront compétents.
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
