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
      max_tokens: 12000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
