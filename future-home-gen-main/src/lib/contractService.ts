import { DEMO_ANALYSIS_RESULT, ContractAnalysisResult } from '@/data/contractSamples';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `You are an expert Indian construction law and contract analyst.
Analyze the provided construction contract and return a JSON object with this exact structure:
{
  "contractType": "string",
  "parties": [{"role": "string", "name": "string"}],
  "projectSummary": "string (1-2 sentences)",
  "totalValue": "string",
  "timeline": "string",
  "clauses": [
    {
      "title": "string",
      "text": "Clause reference",
      "riskLevel": "low|medium|high",
      "simpleSummary": "string (plain English, 1-2 sentences)",
      "concern": "string or null",
      "recommendation": "string or null"
    }
  ],
  "riskFlags": [
    {
      "severity": "low|medium|high",
      "title": "string",
      "description": "string",
      "recommendation": "string"
    }
  ],
  "paymentTermsSummary": "string",
  "nextSteps": ["string"],
  "disclaimer": "This analysis is for informational purposes only and does NOT constitute legal advice.",
  "isDemo": false
}
Focus on: payment terms, advance payment risks, penalty clauses, material quality, subcontracting, warranties, termination clauses.
Return ONLY valid JSON. No markdown, no explanation.`;

export const analyzeContract = async (
  text: string,
  apiKey?: string
): Promise<ContractAnalysisResult> => {
  if (!apiKey || text.trim().length < 100) {
    return { ...DEMO_ANALYSIS_RESULT, isDemo: true };
  }
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${SYSTEM_PROMPT}\n\nCONTRACT TEXT:\n${text.substring(0, 8000)}`,
    });
    const raw = response.text?.replace(/```json|```/g, '').trim() || '';
    const parsed = JSON.parse(raw) as ContractAnalysisResult;
    return { ...parsed, isDemo: false };
  } catch {
    return { ...DEMO_ANALYSIS_RESULT, isDemo: true };
  }
};
