import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, AlertCircle, AlertTriangle, CheckCircle2,
  ChevronDown, ChevronUp, Sparkles, ClipboardPaste, Info, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import { analyzeContract } from '@/lib/contractService';
import { SAMPLE_CONTRACT_TEXT, ContractAnalysisResult } from '@/data/contractSamples';

type Step = 'input' | 'loading' | 'result';

const SeverityBadge = ({ s }: { s: 'low' | 'medium' | 'high' }) => {
  const map = { high: 'bg-red-500/20 text-red-400 border-red-500/30', medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30', low: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${map[s]}`}>{s.toUpperCase()}</span>;
};

const SeverityIcon = ({ s }: { s: 'low' | 'medium' | 'high' }) => {
  if (s === 'high') return <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />;
  if (s === 'medium') return <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />;
  return <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />;
};

const ContractReview = () => {
  const [step, setStep] = useState<Step>('input');
  const [text, setText] = useState('');
  const [result, setResult] = useState<ContractAnalysisResult | null>(null);
  const [expandedClause, setExpandedClause] = useState<number | null>(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  const handleAnalyze = async () => {
    if (text.trim().length < 50) { toast.error('Please paste a contract (min 50 characters)'); return; }
    setStep('loading');
    try {
      const res = await analyzeContract(text, apiKey);
      setResult(res);
      setStep('result');
    } catch {
      toast.error('Analysis failed. Using demo result.');
      const res = await analyzeContract('', '');
      setResult(res);
      setStep('result');
    }
  };

  const loadSample = () => { setText(SAMPLE_CONTRACT_TEXT); toast.success('Sample contract loaded!'); };

  const highRisks = result?.riskFlags.filter(f => f.severity === 'high').length ?? 0;
  const medRisks = result?.riskFlags.filter(f => f.severity === 'medium').length ?? 0;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4 border border-amber-500/20">
            <FileText className="h-3.5 w-3.5" /> Contract & Tender Review
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Review Your Construction Contract</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Paste your construction agreement to get a plain-English summary, risk flag analysis, and recommended next steps.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="p-6 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium flex items-center gap-2"><ClipboardPaste className="h-4 w-4 text-amber-400" /> Paste Contract Text</label>
                  <Button variant="ghost" size="sm" onClick={loadSample} className="text-xs text-amber-400 hover:text-amber-300">⚡ Load Sample Contract</Button>
                </div>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Paste your construction agreement, tender document, or work order here..."
                  className="w-full h-64 bg-secondary/50 rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground border border-border/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-muted-foreground">{text.length} characters</p>
                  <p className="text-xs text-muted-foreground">Works best with full contract text</p>
                </div>
              </Card>
              <Card className="p-4 mb-6 border-amber-500/20 bg-amber-500/5">
                <p className="text-xs text-amber-300/80 flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" /> Analysis is for informational purposes only. Always consult a qualified construction lawyer before signing.</p>
              </Card>
              <Button onClick={handleAnalyze} disabled={text.length < 50} className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white text-base">
                <Sparkles className="h-4 w-4 mr-2" /> Analyze Contract
              </Button>
            </motion.div>
          )}

          {step === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-24 gap-4">
              <Sparkles className="h-12 w-12 text-amber-400 animate-spin" />
              <h2 className="font-display text-2xl font-bold">Analyzing contract...</h2>
              <p className="text-muted-foreground text-center max-w-sm">Reviewing clauses, identifying risk flags, and preparing plain-English summary.</p>
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {result.isDemo && (
                <Card className="p-4 border-blue-500/30 bg-blue-500/10">
                  <p className="text-sm text-blue-300 flex gap-2"><Info className="h-4 w-4 shrink-0 mt-0.5" /> Demo mode — showing analysis of a sample residential construction agreement. Add your GEMINI API key to analyze real contracts.</p>
                </Card>
              )}

              {/* Summary */}
              <Card className="p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{result.contractType}</span>
                  {highRisks > 0 && <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm font-medium">🚩 {highRisks} High Risk</span>}
                  {medRisks > 0 && <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium">⚠️ {medRisks} Medium Risk</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {result.parties.map(p => <div key={p.role} className="bg-secondary/40 rounded-lg p-3"><p className="text-xs text-muted-foreground">{p.role}</p><p className="font-medium text-sm">{p.name}</p></div>)}
                  <div className="bg-secondary/40 rounded-lg p-3"><p className="text-xs text-muted-foreground">Contract Value</p><p className="font-medium text-sm">{result.totalValue}</p></div>
                  <div className="bg-secondary/40 rounded-lg p-3"><p className="text-xs text-muted-foreground">Timeline</p><p className="font-medium text-sm">{result.timeline}</p></div>
                </div>
                <p className="text-sm text-muted-foreground">{result.projectSummary}</p>
              </Card>

              {/* Risk Flags */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">🚩 Risk Flags & Concerns</h3>
                <div className="space-y-4">
                  {result.riskFlags.map((flag, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-lg bg-secondary/30">
                      <SeverityIcon s={flag.severity} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap"><p className="font-medium">{flag.title}</p><SeverityBadge s={flag.severity} /></div>
                        <p className="text-sm text-muted-foreground mb-2">{flag.description}</p>
                        <p className="text-sm text-green-400 flex items-start gap-1"><CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />{flag.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Clauses */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">📋 Clause-by-Clause Summary</h3>
                <div className="space-y-3">
                  {result.clauses.map((clause, i) => (
                    <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
                      <button className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition" onClick={() => setExpandedClause(expandedClause === i ? null : i)}>
                        <div className="flex items-center gap-3"><SeverityBadge s={clause.riskLevel} /><span className="font-medium">{clause.title}</span></div>
                        {expandedClause === i ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </button>
                      <AnimatePresence>
                        {expandedClause === i && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="px-4 pb-4 space-y-2 border-t border-border/30 pt-3">
                              <p className="text-sm text-muted-foreground">{clause.simpleSummary}</p>
                              {clause.concern && <p className="text-sm text-amber-400/90 flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />{clause.concern}</p>}
                              {clause.recommendation && <p className="text-sm text-green-400 flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />{clause.recommendation}</p>}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Next Steps */}
              <Card className="p-6 bg-green-950/30 border-green-800/30">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">✅ Recommended Next Steps</h3>
                <ol className="space-y-3">
                  {result.nextSteps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500/20 text-green-400 font-medium text-sm shrink-0">{i + 1}</div>
                      <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              <Card className="p-4 border-amber-500/20 bg-amber-500/5">
                <p className="text-xs text-amber-300/80 flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />{result.disclaimer}</p>
              </Card>

              <Button onClick={() => { setStep('input'); setResult(null); setExpandedClause(null); }} variant="outline" className="w-full">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> Analyze Another Contract
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default ContractReview;
