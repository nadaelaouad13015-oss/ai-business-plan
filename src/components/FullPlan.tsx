"use client";

import { useRef, useState } from "react";

interface Props {
  content: string;
}

export default function FullPlan({ content }: Props) {
  const planRef = useRef<HTMLDivElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!planRef.current) return;
    setPdfLoading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `business-plan-${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };
      await html2pdf().set(opt).from(planRef.current).save();
    } catch (err) {
      console.error("Erreur génération PDF:", err);
      alert("Erreur lors de la génération du PDF. Essayez 'Imprimer PDF' comme alternative.");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleDownload = () => {
    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Business Plan IA — Rapport Stratégique</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', system-ui, sans-serif; max-width: 900px; margin: 0 auto; padding: 50px 40px; color: #1a1a2e; line-height: 1.85; background: #fff; }

  /* Cover */
  .cover { text-align: center; padding: 60px 40px; margin-bottom: 50px; background: linear-gradient(135deg, #0f172a, #1e293b); color: white; border-radius: 16px; }
  .cover h1 { font-size: 2.4em; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.02em; }
  .cover .subtitle { font-size: 1.1em; color: #94a3b8; }
  .cover .date { font-size: 0.85em; color: #64748b; margin-top: 20px; padding-top: 20px; border-top: 1px solid #334155; }
  .cover .badge { display: inline-block; padding: 6px 16px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 20px; font-size: 0.8em; font-weight: 600; margin-bottom: 20px; }

  /* Sections */
  h1 { color: #0f172a; font-size: 1.6em; font-weight: 700; margin: 2.5em 0 0.8em; padding-bottom: 12px; border-bottom: 3px solid #3b82f6; letter-spacing: -0.01em; page-break-after: avoid; }
  h2 { color: #1e3a5f; font-size: 1.25em; font-weight: 600; margin: 2em 0 0.6em; padding: 8px 0 8px 14px; border-left: 4px solid #8b5cf6; background: linear-gradient(90deg, #f8faff, transparent); }
  h3 { color: #374151; font-size: 1.1em; font-weight: 600; margin: 1.5em 0 0.4em; }
  p { margin: 0.5em 0; color: #374151; }

  /* Tables */
  table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 1.5em 0; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 8px rgba(0,0,0,0.06); }
  thead { background: linear-gradient(135deg, #1e293b, #334155); }
  th { color: #f1f5f9; font-weight: 600; font-size: 0.85em; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 18px; text-align: left; }
  td { padding: 12px 18px; font-size: 0.92em; border-bottom: 1px solid #f1f5f9; color: #334155; }
  tr:nth-child(even) { background: #f8fafc; }
  tr:hover { background: #eff6ff; }

  /* Financial tables */
  .financial-table-wrapper { margin: 1.5em 0; padding: 1.5em; background: linear-gradient(135deg, #f8fafc, #f1f5f9); border-radius: 16px; border: 1px solid #e2e8f0; }
  .financial-table { box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-radius: 12px; overflow: hidden; }
  .financial-table thead { background: linear-gradient(135deg, #0f172a, #1e293b); }
  .financial-table th { padding: 16px 20px; font-size: 0.82em; border-bottom: 2px solid #3b82f6; }
  .financial-table td { padding: 14px 20px; vertical-align: middle; }
  .financial-table tbody tr { background: white; transition: all 0.15s; }
  .financial-table tbody tr:nth-child(even) { background: #fafbff; }
  .financial-table tbody tr:hover { background: #eff6ff; }
  .financial-table tbody tr:last-child { border-bottom: 3px solid #3b82f6; font-weight: 600; }

  /* Lists */
  ul { margin: 0.8em 0; padding-left: 0; list-style: none; }
  li { margin: 0.4em 0; padding-left: 1.5em; position: relative; color: #374151; }
  li::before { content: ''; position: absolute; left: 0; top: 10px; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #8b5cf6); }

  /* Code / Scripts */
  pre { background: #0f172a; color: #e2e8f0; padding: 20px 24px; border-radius: 12px; overflow-x: auto; margin: 1.2em 0; font-size: 0.88em; line-height: 1.7; border: 1px solid #1e293b; }
  code { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
  p code, li code { background: #eff6ff; color: #3b82f6; padding: 2px 8px; border-radius: 6px; font-size: 0.88em; }
  pre code { background: none; color: inherit; padding: 0; }

  /* Misc */
  strong { color: #0f172a; font-weight: 600; }
  blockquote { border-left: 4px solid #8b5cf6; margin: 1.2em 0; padding: 1em 1.5em; background: #faf5ff; border-radius: 0 12px 12px 0; color: #6b21a8; font-style: italic; }
  hr { border: none; border-top: 2px solid #e5e7eb; margin: 2em 0; }

  /* Checklist */
  li:has(input[type="checkbox"]) { list-style: none; padding-left: 0; }
  li:has(input[type="checkbox"])::before { display: none; }

  /* Footer */
  .doc-footer { text-align: center; margin-top: 60px; padding-top: 30px; border-top: 2px solid #e5e7eb; color: #9ca3af; font-size: 0.82em; line-height: 1.6; }

  /* Print */
  @media print {
    body { padding: 20px; }
    .cover { page-break-after: always; }
    h1, h2 { page-break-after: avoid; }
    table, pre { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="cover">
  <div class="badge">RAPPORT STRATÉGIQUE</div>
  <h1 style="border:none;color:white;margin:0;">Business Plan IA</h1>
  <p class="subtitle">Plan d'affaires personnalisé et actionnable</p>
  <p class="date">Généré le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} — Document confidentiel</p>
</div>
${markdownToHtml(content)}
<div class="doc-footer">
  <p>Ce rapport a été généré par AI Business Plan.</p>
  <p>Les projections financières sont des estimations et ne constituent pas des garanties de résultats.</p>
  <p>© ${new Date().getFullYear()} AI Business Plan — Tous droits réservés</p>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `business-plan-${new Date().toISOString().slice(0, 10)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Action bar */}
      <div className="gradient-border rounded-2xl p-5 mb-8 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Votre Business Plan</h1>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleDownloadPdf}
            disabled={pdfLoading}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all flex items-center gap-2 text-sm hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {pdfLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Génération PDF...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Télécharger PDF
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all flex items-center gap-2 text-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Télécharger HTML
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all flex items-center gap-2 text-sm"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimer
          </button>
        </div>
      </div>

      {/* Plan document */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-b from-blue-600/10 via-purple-600/10 to-transparent rounded-3xl blur-xl" />
        <div
          ref={planRef}
          className="plan-document relative bg-white text-gray-900 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden print:shadow-none print:rounded-none"
        >
          {/* Document cover */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-10 md:px-16 py-14 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 text-xs font-semibold text-blue-300 uppercase tracking-widest mb-6">
              Rapport stratégique
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Business Plan
            </h1>
            <p className="text-slate-400 text-lg">Plan d&apos;affaires personnalisé et actionnable</p>
            <div className="mt-8 pt-6 border-t border-white/10 text-slate-500 text-sm">
              Généré le {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} — Document confidentiel
            </div>
          </div>

          {/* Document body */}
          <div
            className="px-8 md:px-16 py-12 plan-content"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />

          {/* Document footer */}
          <div className="px-10 md:px-16 py-8 border-t border-gray-100 bg-gray-50/50 text-center text-xs text-gray-400 space-y-1">
            <p>Ce rapport a été généré par AI Business Plan.</p>
            <p>Les projections financières sont des estimations et ne constituent pas des garanties de résultats.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .plan-content :global(h1) {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 3px solid #3b82f6;
          letter-spacing: -0.01em;
        }
        .plan-content :global(h2) {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e3a5f;
          margin: 2rem 0 0.6rem;
          padding: 0.5rem 0 0.5rem 0.875rem;
          border-left: 4px solid #8b5cf6;
          background: linear-gradient(90deg, #f8faff, transparent);
          border-radius: 0 8px 8px 0;
        }
        .plan-content :global(h3) {
          font-size: 1.05rem;
          font-weight: 600;
          color: #374151;
          margin: 1.5rem 0 0.4rem;
        }
        .plan-content :global(p) {
          color: #374151;
          line-height: 1.8;
          margin: 0.5rem 0;
        }
        .plan-content :global(strong) {
          color: #0f172a;
          font-weight: 600;
        }
        .plan-content :global(table) {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 1.5rem 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 8px rgba(0,0,0,0.06);
          font-size: 0.9rem;
        }
        .plan-content :global(thead) {
          background: linear-gradient(135deg, #1e293b, #334155);
        }
        .plan-content :global(th) {
          color: #f1f5f9;
          font-weight: 600;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 14px 18px;
          text-align: left;
        }
        .plan-content :global(td) {
          padding: 12px 18px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
        }
        .plan-content :global(tr:nth-child(even)) {
          background: #f8fafc;
        }
        .plan-content :global(ul) {
          margin: 0.8rem 0;
          padding-left: 0;
          list-style: none;
        }
        .plan-content :global(li) {
          margin: 0.4rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: #374151;
          line-height: 1.7;
        }
        .plan-content :global(li::before) {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        }
        .plan-content :global(pre) {
          background: #0f172a;
          color: #e2e8f0;
          padding: 20px 24px;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.2rem 0;
          font-size: 0.88rem;
          line-height: 1.7;
          border: 1px solid #1e293b;
        }
        .plan-content :global(code) {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
        }
        .plan-content :global(p code),
        .plan-content :global(li code) {
          background: #eff6ff;
          color: #3b82f6;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 0.88em;
        }
        .plan-content :global(pre code) {
          background: none;
          color: inherit;
          padding: 0;
        }
        .plan-content :global(hr) {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2rem 0;
        }
        .plan-content :global(blockquote) {
          border-left: 4px solid #8b5cf6;
          margin: 1.2rem 0;
          padding: 1rem 1.5rem;
          background: #faf5ff;
          border-radius: 0 12px 12px 0;
          color: #6b21a8;
          font-style: italic;
        }

        /* Financial tables */
        .plan-content :global(.financial-table-wrapper) {
          margin: 1.5rem 0;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }
        .plan-content :global(.financial-table) {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border-radius: 12px;
          overflow: hidden;
        }
        .plan-content :global(.financial-table thead) {
          background: linear-gradient(135deg, #0f172a, #1e293b);
        }
        .plan-content :global(.financial-table th) {
          padding: 16px 20px;
          font-size: 0.82rem;
          letter-spacing: 0.04em;
          border-bottom: 2px solid #3b82f6;
        }
        .plan-content :global(.financial-table td) {
          padding: 14px 20px;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: middle;
        }
        .plan-content :global(.financial-table tbody tr) {
          background: white;
          transition: all 0.15s;
        }
        .plan-content :global(.financial-table tbody tr:nth-child(even)) {
          background: #fafbff;
        }
        .plan-content :global(.financial-table tbody tr:hover) {
          background: #eff6ff;
          transform: scale(1.005);
        }
        .plan-content :global(.financial-table tbody tr:last-child) {
          border-bottom: 3px solid #3b82f6;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

// Détecter si un tableau est financier (contient des €, revenus, bénéfice, etc.)
function isFinancialTable(headerRow: string): boolean {
  const keywords = /revenu|bénéfice|coût|marge|client|mois|chiffre|montant|profit|perte|budget|€|eur/i;
  return keywords.test(headerRow);
}

// Formater une cellule financière avec couleurs et barres
function formatFinancialCell(text: string, colIndex: number, _totalCols: number, maxVal: number): string {
  const cleaned = text.replace(/<\/?[^>]+>/g, "").trim();

  // Détecter les montants (€, euros, nombres)
  const moneyMatch = cleaned.match(/([\d\s,.]+)\s*€/);
  if (moneyMatch) {
    const amount = parseFloat(moneyMatch[1].replace(/\s/g, "").replace(",", "."));
    const isNegative = cleaned.includes("-") || cleaned.toLowerCase().includes("perte");
    const barWidth = maxVal > 0 ? Math.min((amount / maxVal) * 100, 100) : 0;

    const color = isNegative ? "#ef4444" : "#22c55e";
    const bgColor = isNegative ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.08)";
    const barColor = isNegative
      ? "linear-gradient(90deg, #ef4444, #f87171)"
      : "linear-gradient(90deg, #22c55e, #4ade80)";

    return `<td style="background:${bgColor}">
      <div style="font-weight:600;color:${color};font-size:1.05em;margin-bottom:4px">${cleaned}</div>
      <div style="width:100%;height:6px;background:rgba(0,0,0,0.06);border-radius:99px;overflow:hidden">
        <div style="width:${barWidth}%;height:100%;background:${barColor};border-radius:99px;transition:width 0.5s"></div>
      </div>
    </td>`;
  }

  // Détecter les nombres seuls (clients, quantités)
  const numMatch = cleaned.match(/^(\d+)$/);
  if (numMatch && colIndex > 0) {
    return `<td style="text-align:center">
      <span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#eff6ff,#e0e7ff);color:#3b82f6;font-weight:700;font-size:1.05em">${cleaned}</span>
    </td>`;
  }

  // Première colonne (labels comme "Mois 1", "Mois 2")
  if (colIndex === 0) {
    const monthMatch = cleaned.match(/mois\s*(\d+)/i);
    if (monthMatch) {
      return `<td>
        <div style="display:flex;align-items:center;gap:10px">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#1e293b,#334155);color:#e2e8f0;font-weight:700;font-size:0.8em">M${monthMatch[1]}</span>
          <span style="font-weight:500;color:#1e293b">${cleaned}</span>
        </div>
      </td>`;
    }
  }

  return `<td>${text}</td>`;
}

// Trouver la valeur max dans un tableau pour dimensionner les barres
function findMaxValue(rows: string[]): number {
  let max = 0;
  for (const row of rows) {
    const cells = row.match(/<td>([\s\S]*?)<\/td>/g) || [];
    for (const cell of cells) {
      const text = cell.replace(/<\/?td>/g, "");
      const match = text.match(/([\d\s,.]+)\s*€/);
      if (match) {
        const val = parseFloat(match[1].replace(/\s/g, "").replace(",", "."));
        if (val > max) max = val;
      }
    }
  }
  return max;
}

function buildTable(match: string): string {
  const rows = match.split("\n").filter(Boolean);
  if (rows.length < 2) return `<table>${match}</table>`;

  const headerRow = rows[0];
  const header = headerRow.replace(/<td>/g, "<th>").replace(/<\/td>/g, "</th>");
  const isSeparator = (row: string) => /^<tr>(<td>[-:\s]+<\/td>)+<\/tr>$/.test(row);
  const bodyRows = rows.slice(1).filter((r) => !isSeparator(r));

  const financial = isFinancialTable(headerRow);

  if (!financial) {
    return `<table><thead>${header}</thead><tbody>${bodyRows.join("\n")}</tbody></table>`;
  }

  // Tableau financier : on parse et reformatte chaque cellule
  const maxVal = findMaxValue(bodyRows);
  const headerCells = (header.match(/<th>([\s\S]*?)<\/th>/g) || []);
  const totalCols = headerCells.length;

  // Header amélioré pour tableaux financiers
  const enhancedHeader = `<tr>${headerCells.map((th, i) => {
    const text = th.replace(/<\/?th>/g, "").trim();
    let icon = "";
    if (/revenu|chiffre/i.test(text)) icon = '<span style="margin-right:6px">📈</span>';
    else if (/coût|dépense/i.test(text)) icon = '<span style="margin-right:6px">📉</span>';
    else if (/bénéfice|profit|net/i.test(text)) icon = '<span style="margin-right:6px">💰</span>';
    else if (/client/i.test(text)) icon = '<span style="margin-right:6px">👥</span>';
    else if (/mois|période/i.test(text)) icon = '<span style="margin-right:6px">📅</span>';
    else if (/marge/i.test(text)) icon = '<span style="margin-right:6px">📊</span>';

    const align = i === 0 ? "left" : "left";
    return `<th style="text-align:${align}">${icon}${text}</th>`;
  }).join("")}</tr>`;

  // Body avec cellules améliorées
  const enhancedBody = bodyRows.map((row) => {
    const cells = row.match(/<td>([\s\S]*?)<\/td>/g) || [];
    const formattedCells = cells.map((cell, i) => {
      const text = cell.replace(/<\/?td>/g, "");
      return formatFinancialCell(text, i, totalCols, maxVal);
    });
    return `<tr>${formattedCells.join("")}</tr>`;
  });

  return `<div class="financial-table-wrapper"><table class="financial-table"><thead>${enhancedHeader}</thead><tbody>${enhancedBody.join("\n")}</tbody></table></div>`;
}

function markdownToHtml(md: string): string {
  return (
    md
      // Horizontal rules
      .replace(/^---+$/gm, "<hr>")
      // Headers
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      // Bold + italic
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Checkboxes
      .replace(/^- \[x\] (.*$)/gm, '<li style="padding-left:0;list-style:none"><span style="color:#22c55e;margin-right:8px">&#9745;</span>$1</li>')
      .replace(/^- \[ \] (.*$)/gm, '<li style="padding-left:0;list-style:none"><span style="color:#94a3b8;margin-right:8px">&#9744;</span>$1</li>')
      // Tables (raw rows)
      .replace(/^\|(.+)\|$/gm, (match) => {
        const cells = match
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim());
        return "<tr>" + cells.map((c) => `<td>${c}</td>`).join("") + "</tr>";
      })
      // Tables (group rows into tables with financial detection)
      .replace(/(<tr>[\s\S]*?<\/tr>\n?)+/g, buildTable)
      // Blockquotes
      .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
      // Lists
      .replace(/^- (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, "<ul>$&</ul>")
      // Code blocks
      .replace(/```[\s\S]*?```/g, (match) => {
        const code = match.replace(/```\w*\n?/g, "").replace(/```/g, "");
        return `<pre><code>${code}</code></pre>`;
      })
      // Inline code
      .replace(/`(.*?)`/g, "<code>$1</code>")
      // Paragraphs
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>")
      .replace(/^(?!<[huptlob\d])/gm, "")
  );
}
