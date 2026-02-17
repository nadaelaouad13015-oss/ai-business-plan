// Client IA via OpenRouter
// Utilise Claude Sonnet 4.5 — meilleur raisonnement stratégique, contenu premium

export async function generateWithClaude(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "anthropic/claude-sonnet-4",
      max_tokens: 16000,
      messages: [
        {
          role: "system",
          content:
            "Tu es un cabinet de conseil en stratégie business de premier plan. Tu produis des rapports stratégiques de qualité premium en français. Tu DOIS toujours terminer ta réponse complètement — ne coupe jamais un document en cours.",
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
  return data.choices[0].message.content;
}
