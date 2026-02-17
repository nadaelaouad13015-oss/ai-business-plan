import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPlanEmail(email: string, planHtml: string) {
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  await resend.emails.send({
    from: "AI Business Plan <onboarding@resend.dev>",
    to: email,
    subject: `Votre Business Plan IA — ${date}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:'Segoe UI',system-ui,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1a1a2e;">
  <div style="text-align:center;padding:30px;background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:12px;margin-bottom:30px;">
    <h1 style="color:white;margin:0;font-size:1.5em;">Votre Business Plan est prêt</h1>
    <p style="color:#94a3b8;margin:8px 0 0;">Généré le ${date}</p>
  </div>

  <p>Bonjour,</p>
  <p>Merci pour votre achat. Votre business plan personnalisé est disponible via le lien ci-dessous.</p>
  <p>Vous pouvez aussi retrouver le plan complet en pièce jointe de cet email au format HTML — ouvrez-le dans votre navigateur pour un rendu optimal.</p>

  <div style="text-align:center;margin:30px 0;">
    <p style="color:#6b7280;font-size:0.9em;">Le plan complet est en pièce jointe au format HTML.</p>
  </div>

  <p style="color:#6b7280;font-size:0.85em;border-top:1px solid #e5e7eb;padding-top:20px;margin-top:30px;">
    Ce rapport a été généré par AI Business Plan. Les projections financières sont des estimations.
  </p>
</body>
</html>`,
    attachments: [
      {
        filename: `business-plan-${new Date().toISOString().slice(0, 10)}.html`,
        content: Buffer.from(planHtml).toString("base64"),
        contentType: "text/html",
      },
    ],
  });
}
