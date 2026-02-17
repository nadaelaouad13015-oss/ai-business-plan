// Client IA via OpenRouter (compatible OpenAI API)
// Utilise DeepSeek Chat — rapide, bon marché, excellent pour le texte long

export async function generateWithClaude(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat",
      max_tokens: 16000,
      messages: [
        {
          role: "system",
          content: "Tu es un expert en stratégie business. Tu DOIS toujours terminer ta réponse complètement. N'écris JAMAIS 'suite dans le prochain message', 'à suivre', 'suite...', ou toute indication que la réponse continue ailleurs. Si tu manques de place, condense les dernières sections mais termine TOUJOURS le document en entier jusqu'à la fin.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  let content: string = data.choices[0].message.content;

  // Nettoyer les phrases de coupure que DeepSeek ajoute parfois
  content = content.replace(/\n*\*?\*?\(?\s*suite\s*(dans le prochain message|au prochain message|\.{2,})\s*\)?\*?\*?\s*$/i, "");
  content = content.replace(/\n*\*?\*?\(?\s*à suivre\s*\.{0,3}\s*\)?\*?\*?\s*$/i, "");
  content = content.replace(/\n*---\s*\n*\s*\*?\*?Suite\b.*$/i, "");

  return content;
}
