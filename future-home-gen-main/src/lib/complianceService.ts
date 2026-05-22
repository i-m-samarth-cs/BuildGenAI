import {
  BUILDING_REGULATIONS,
  STATE_SPECIFIC_RULES,
  COMPLIANCE_CHECKLIST,
  RegulationRule,
} from '@/data/regulations';
import { GoogleGenAI } from '@google/genai';

export interface ComplianceAnswer {
  question: string;
  answer: string;
  confidence: 'grounded' | 'general' | 'uncertain';
  officialNote: string;
  relatedRules: RegulationRule[];
  sources: string[];
  isDemo: boolean;
}

const COMPLIANCE_KEYWORDS: Record<string, string[]> = {
  setback: ['setback', 'distance', 'boundary', 'road', 'front', 'side', 'rear'],
  height: ['height', 'floors', 'storey', 'stories', 'tall', 'high'],
  fsi: ['fsi', 'far', 'floor space', 'floor area', 'built-up', 'ratio'],
  parking: ['parking', 'car', 'garage', 'vehicle'],
  fire: ['fire', 'emergency', 'exit', 'escape', 'staircase'],
  water: ['water', 'rainwater', 'harvesting', 'tank', 'storage'],
};

const matchRules = (question: string): RegulationRule[] => {
  const q = question.toLowerCase();
  const matched: RegulationRule[] = [];
  for (const [category, keywords] of Object.entries(COMPLIANCE_KEYWORDS)) {
    if (keywords.some(k => q.includes(k))) {
      matched.push(...BUILDING_REGULATIONS.filter(r => r.category === category));
    }
  }
  return matched.length ? matched : BUILDING_REGULATIONS.slice(0, 3);
};

const buildDemoAnswer = (question: string, state: string): ComplianceAnswer => {
  const relatedRules = matchRules(question);
  const stateRules = STATE_SPECIFIC_RULES[state];
  const stateNote = stateRules
    ? `For ${state}: Setbacks: ${stateRules.setback}. Height limit: ${stateRules.height}. FSI: ${stateRules.fsi}. ${stateRules.notes}`
    : 'State-specific rules not found. Please verify with your local municipal authority.';

  return {
    question,
    answer: `Based on the Indian Model Building Bye-Laws 2016 and National Building Code 2016:\n\n${relatedRules.map(r => `**${r.title}**: ${r.description}. (Min/Max: ${r.minValue ?? '-'}${r.unit ? ' ' + r.unit : ''})`).join('\n\n')}\n\n**${state} Specific Rules:**\n${stateNote}`,
    confidence: 'grounded',
    officialNote: `⚠️ This is general guidance based on model bye-laws. Actual rules for your plot in ${state} may differ. Always verify with your local municipal authority (e.g., BBMP, BMC, GHMC) before starting construction.`,
    relatedRules,
    sources: Array.from(new Set(relatedRules.map(r => r.source))),
    isDemo: true,
  };
};

export const answerComplianceQuestion = async (
  question: string,
  state: string,
  apiKey?: string
): Promise<ComplianceAnswer> => {
  if (!apiKey || !question.trim()) {
    return buildDemoAnswer(question || 'general regulations', state);
  }
  try {
    const stateRules = STATE_SPECIFIC_RULES[state];
    const context = stateRules
      ? `State-specific context for ${state}: Setbacks: ${stateRules.setback}. Height: ${stateRules.height}. FSI: ${stateRules.fsi}. Notes: ${stateRules.notes}`
      : '';
    const relatedRules = matchRules(question);
    const rulesContext = relatedRules.map(r => `${r.title}: ${r.description} (Source: ${r.source})`).join('\n');
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert on Indian building regulations and NBC 2016. Answer this question concisely:\n\nQuestion: ${question}\nState: ${state}\n\nContext from regulations:\n${rulesContext}\n${context}\n\nProvide a clear, structured answer in 150-200 words. Start with the most relevant rule. Always end with a note that official verification is required.`,
    });
    return {
      question,
      answer: response.text || buildDemoAnswer(question, state).answer,
      confidence: 'grounded',
      officialNote: `⚠️ AI-generated guidance based on NBC 2016 and model bye-laws. Verify with ${state} municipal authority before construction.`,
      relatedRules,
      sources: Array.from(new Set(relatedRules.map(r => r.source))),
      isDemo: false,
    };
  } catch {
    return buildDemoAnswer(question, state);
  }
};

export const getStateRules = (state: string) => STATE_SPECIFIC_RULES[state] || null;
export const getRegulationsByCategory = (cat: string) => BUILDING_REGULATIONS.filter(r => r.category === cat);
export const getComplianceChecklist = () => COMPLIANCE_CHECKLIST;
export const getAllStates = () => Object.keys(STATE_SPECIFIC_RULES);
