export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-dots">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors mb-8 inline-flex items-center gap-2">
          &larr; Retour
        </a>
        <h1 className="text-3xl font-bold mb-10">Mentions légales</h1>
        <div className="space-y-8 text-sm text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Éditeur du site</h2>
            <p>
              Le site AI Business Plan est édité par :<br />
              Nada El Aouad<br />
              Statut : Entrepreneur individuel<br />
              Email : contact.aibusinessplan@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Hébergement</h2>
            <p>
              Le site est hébergé par :<br />
              Vercel Inc.<br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              Site : vercel.com
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du site (textes, graphismes, logiciels, images, etc.) est la propriété exclusive
              de l&apos;éditeur ou de ses partenaires. Toute reproduction, représentation, modification ou exploitation
              non autorisée est interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Contenu généré par IA</h2>
            <p>
              Les business plans générés par notre service sont produits par intelligence artificielle à titre informatif.
              Ils ne constituent en aucun cas un conseil juridique, financier ou fiscal. L&apos;utilisateur reste seul
              responsable de l&apos;utilisation qu&apos;il fait des informations fournies. Les projections financières sont
              des estimations et ne garantissent aucun résultat.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Responsabilité</h2>
            <p>
              L&apos;éditeur s&apos;efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra
              être tenu responsable des omissions, inexactitudes ou erreurs contenues dans les informations diffusées,
              ni des dommages résultant de l&apos;utilisation du service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français
              seront seuls compétents.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
