import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, CheckCircle2, AlertCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Footer from '@/components/Footer';
import {
  answerComplianceQuestion, getStateRules, getRegulationsByCategory,
  getComplianceChecklist, getAllStates, ComplianceAnswer,
} from '@/lib/complianceService';
import { RegulationRule } from '@/data/regulations';

const INDIA_STATES = ['Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
const CATEGORIES = [
  { value: 'setback', label: '📏 Setbacks' },
  { value: 'height', label: '🏗️ Height Limits' },
  { value: 'fsi', label: '📐 FSI / FAR' },
  { value: 'parking', label: '🚗 Parking' },
  { value: 'fire', label: '🔥 Fire Safety' },
  { value: 'water', label: '💧 Water & Drainage' },
];
const SAMPLE_QUESTIONS = [
  'What is the front setback required for a residential building in Bangalore?',
  'What is the maximum FSI allowed for residential construction?',
  'How many emergency exits are required for a G+1 house?',
  'What are the parking requirements for a 3000 sq ft commercial building?',
];
const RiskBadge = ({ level }: { level: string }) => {
  const map: Record<string, string> = { high: 'bg-red-500/20 text-red-400', medium: 'bg-amber-500/20 text-amber-400', low: 'bg-blue-500/20 text-blue-400' };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[level] ?? map.low}`}>{level.toUpperCase()} RISK</span>;
};

const ComplianceGuide = () => {
  const [state, setState] = useState('Karnataka');
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('setback');
  const [answer, setAnswer] = useState<ComplianceAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ask' | 'browse' | 'checklist'>('ask');
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  const stateRules = getStateRules(state);
  const categoryRules = getRegulationsByCategory(category) as RegulationRule[];
  const checklist = getComplianceChecklist();

  const handleAsk = async () => {
    if (!question.trim()) { toast.error('Please enter a question'); return; }
    setLoading(true);
    setAnswer(null);
    try {
      const res = await answerComplianceQuestion(question, state, apiKey);
      setAnswer(res);
    } catch {
      toast.error('Failed to get answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabClass = (t: string) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4 border border-purple-500/20">
            <Shield className="h-3.5 w-3.5" /> Building Compliance Guide
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Building Regulations & Compliance</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Get answers grounded in NBC 2016 and state-specific building bye-laws. Select your state for localised guidance.</p>
        </motion.div>

        {/* State selector */}
        <Card className="p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium shrink-0">📍 Your State:</div>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="w-full sm:w-56 bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>{INDIA_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          {stateRules && (
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-secondary rounded">Setback: {stateRules.setback.split(',')[0]}</span>
              <span className="px-2 py-1 bg-secondary rounded">FSI: {stateRules.fsi}</span>
              <span className="px-2 py-1 bg-secondary rounded">Height: {stateRules.height}</span>
            </div>
          )}
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button className={tabClass('ask')} onClick={() => setActiveTab('ask')}>Ask a Question</button>
          <button className={tabClass('browse')} onClick={() => setActiveTab('browse')}>Browse Rules</button>
          <button className={tabClass('checklist')} onClick={() => setActiveTab('checklist')}>Compliance Checklist</button>
        </div>

        <AnimatePresence mode="wait">
          {/* ASK TAB */}
          {activeTab === 'ask' && (
            <motion.div key="ask" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card className="p-6">
                <label className="text-sm font-medium mb-3 block flex items-center gap-2"><Search className="h-4 w-4 text-purple-400" /> Your Question</label>
                <div className="flex gap-2">
                  <Input value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAsk()} placeholder="e.g. What is the front setback for a G+1 house in Bangalore?" className="bg-secondary/50" />
                  <Button onClick={handleAsk} disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white shrink-0">{loading ? '...' : 'Ask'}</Button>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Sample questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_QUESTIONS.map(q => (
                      <button key={q} onClick={() => setQuestion(q)} className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition text-left">{q.length > 50 ? q.slice(0, 50) + '…' : q}</button>
                    ))}
                  </div>
                </div>
              </Card>

              {loading && (
                <Card className="p-8 flex flex-col items-center gap-3">
                  <Shield className="h-10 w-10 text-purple-400 animate-pulse" />
                  <p className="text-muted-foreground">Looking up regulations for {state}...</p>
                </Card>
              )}

              {answer && !loading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        {answer.confidence === 'grounded' ? '✅ Grounded Answer' : answer.confidence === 'general' ? '📋 General Guidance' : '⚠️ Uncertain'}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed mb-4">{answer.answer}</div>
                    {answer.sources.length > 0 && (
                      <div className="border-t border-border/50 pt-3 mt-3">
                        <p className="text-xs text-muted-foreground font-medium mb-1">Sources:</p>
                        {answer.sources.map(s => <p key={s} className="text-xs text-primary">• {s}</p>)}
                      </div>
                    )}
                  </Card>
                  <Card className="p-4 border-amber-500/20 bg-amber-500/5">
                    <p className="text-xs text-amber-300/80 flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />{answer.officialNote}</p>
                  </Card>
                  {answer.relatedRules.length > 0 && (
                    <Card className="p-5">
                      <p className="text-sm font-medium mb-3">📚 Related Rules from NBC 2016</p>
                      <div className="space-y-2">
                        {answer.relatedRules.slice(0, 3).map(r => (
                          <div key={r.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                            <RiskBadge level={r.riskLevel} />
                            <div><p className="text-sm font-medium">{r.title}</p><p className="text-xs text-muted-foreground mt-1">{r.description}</p></div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* BROWSE TAB */}
          {activeTab === 'browse' && (
            <motion.div key="browse" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {stateRules && (
                <Card className="p-5 border-purple-500/20 bg-purple-500/5">
                  <h3 className="font-semibold mb-3">📍 {state} — State Specific Rules</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[['Setbacks', stateRules.setback],['Max Height', stateRules.height],['FSI Limit', stateRules.fsi],['Notes', stateRules.notes]].map(([k, v]) => (
                      <div key={k} className="bg-secondary/40 rounded-lg p-3"><p className="text-xs text-muted-foreground mb-1">{k}</p><p className="font-medium text-sm">{v}</p></div>
                    ))}
                  </div>
                </Card>
              )}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <button key={c.value} onClick={() => setCategory(c.value)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === c.value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{c.label}</button>
                ))}
              </div>
              <div className="space-y-3">
                {categoryRules.map(rule => (
                  <Card key={rule.id} className="overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition" onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}>
                      <div className="flex items-center gap-3"><RiskBadge level={rule.riskLevel} /><span className="font-medium text-sm">{rule.title}</span></div>
                      {expandedRule === rule.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {expandedRule === rule.id && (
                      <div className="px-4 pb-4 border-t border-border/30 pt-3 space-y-2">
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                        {rule.minValue && <p className="text-sm"><span className="text-green-400 font-medium">Min:</span> {rule.minValue} {rule.unit}</p>}
                        {rule.maxValue && <p className="text-sm"><span className="text-amber-400 font-medium">Max:</span> {rule.maxValue} {rule.unit}</p>}
                        <p className="text-xs text-primary">Source: {rule.source}</p>
                        {rule.exceptions && rule.exceptions.length > 0 && <p className="text-xs text-muted-foreground">Exceptions: {rule.exceptions.join(', ')}</p>}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* CHECKLIST TAB */}
          {activeTab === 'checklist' && (
            <motion.div key="checklist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">{checklist.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">Complete these steps before breaking ground. <span className="text-red-400">Red items are legally critical.</span></p>
                <div className="space-y-3">
                  {checklist.items.map(item => (
                    <div key={item.id} className={`flex items-start gap-3 p-3 rounded-lg ${item.critical ? 'bg-red-500/10 border border-red-500/20' : 'bg-secondary/30'}`}>
                      {item.critical ? <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" /> : <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />}
                      <div>
                        <p className="text-sm font-medium">{item.text}</p>
                        {item.critical && <p className="text-xs text-red-400 mt-0.5">⚠️ Legally required — do not skip</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4 mt-4 border-amber-500/20 bg-amber-500/5">
                <p className="text-xs text-amber-300/80 flex gap-2"><Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />This checklist is based on general Indian building regulations. Requirements vary by state and municipality. Always confirm with your local authority.</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default ComplianceGuide;
