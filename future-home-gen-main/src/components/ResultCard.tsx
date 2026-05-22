import { AlertCircle, CheckCircle2, AlertTriangle, ArrowRight, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { StructuredResult, formatCurrency } from "@/lib/responseFormatter";
import { toast } from "sonner";

interface ResultCardProps {
  result: StructuredResult;
  onSave?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}

export const ResultCard = ({
  result,
  onSave,
  onShare,
  onDownload,
}: ResultCardProps) => {
  const downloadAsPDF = () => {
    toast.success("PDF download feature coming soon!");
  };

  const shareResult = () => {
    if (onShare) {
      onShare();
    } else {
      const text = `${result.title}\n\n${result.summary}`;
      navigator.clipboard.writeText(text);
      toast.success("Result copied to clipboard!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-display font-bold text-foreground">
          {result.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{result.summary}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {onSave && (
          <Button onClick={onSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Save Result
          </Button>
        )}
        <Button variant="outline" onClick={shareResult}>
          <Share2 className="h-4 w-4 mr-2" /> Share
        </Button>
        <Button variant="outline" onClick={downloadAsPDF}>
          <Download className="h-4 w-4 mr-2" /> Download PDF
        </Button>
      </div>

      {/* Disclaimers */}
      {result.disclaimers && result.disclaimers.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              {result.disclaimers.map((disclaimer, i) => (
                <p key={i} className="text-sm text-amber-900 dark:text-amber-200">
                  {disclaimer}
                </p>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Assumptions & Limitations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.assumptions && result.assumptions.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              📋 Assumptions
            </h3>
            <ul className="space-y-2">
              {result.assumptions.map((assumption, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {result.limitations && result.limitations.length > 0 && (
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              ⚠️ Limitations
            </h3>
            <ul className="space-y-2">
              {result.limitations.map((limitation, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      {/* Layout */}
      {result.layout && (
        <Card className="p-6 bg-secondary/30">
          <h3 className="font-semibold text-lg text-foreground mb-4">🎯 Recommended Layout</h3>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="bg-card p-4 rounded-lg overflow-x-auto text-xs whitespace-pre-wrap">
              {result.layout}
            </pre>
          </div>
        </Card>
      )}

      {/* Cost & Breakdown */}
      {result.totalEstimate && (
        <Card className="p-6 border-primary/20 bg-primary/5">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Total Cost</p>
                <p className="text-3xl font-display font-bold text-primary">
                  {formatCurrency(result.totalEstimate.amount)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {result.totalEstimate.confidence === "high"
                    ? "🟢 High"
                    : result.totalEstimate.confidence === "medium"
                    ? "🟡 Medium"
                    : "🔴 Low"}{" "}
                  Confidence
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{result.totalEstimate.confidenceNote}</p>
          </div>
        </Card>
      )}

      {/* Material Breakdown */}
      {result.breakdown && result.breakdown.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg text-foreground mb-4">💰 Material Breakdown</h3>
          <div className="space-y-6">
            {result.breakdown.map((section, i) => (
              <div key={i} className="space-y-3">
                <h4 className="font-medium text-foreground">{section.category}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-2 px-2">Item</th>
                        <th className="text-right py-2 px-2">Qty</th>
                        <th className="text-right py-2 px-2">Unit</th>
                        <th className="text-right py-2 px-2">Rate</th>
                        <th className="text-right py-2 px-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, j) => (
                        <tr
                          key={j}
                          className="border-b border-border/30 hover:bg-secondary/30 transition"
                        >
                          <td className="py-2 px-2">{item.name}</td>
                          <td className="text-right py-2 px-2">{item.quantity || "-"}</td>
                          <td className="text-right py-2 px-2">{item.unit || "-"}</td>
                          <td className="text-right py-2 px-2">
                            {item.rate ? formatCurrency(item.rate) : "-"}
                          </td>
                          <td className="text-right py-2 px-2 font-medium">
                            {item.amount ? formatCurrency(item.amount) : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {section.subtotal && (
                  <div className="text-right pt-2 border-t border-border/50 font-medium">
                    Subtotal: {formatCurrency(section.subtotal)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Risk Flags */}
      {result.riskFlags && result.riskFlags.length > 0 && (
        <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
          <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            🚩 Risk Flags & Considerations
          </h3>
          <div className="space-y-4">
            {result.riskFlags.map((flag, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1">
                  {flag.severity === "high" ? (
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  ) : flag.severity === "medium" ? (
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{flag.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{flag.description}</p>
                  <p className="text-sm text-primary font-medium mt-2 flex items-center gap-1">
                    💡 {flag.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            ✨ Design Recommendations
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Next Steps */}
      {result.nextSteps && result.nextSteps.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            ✅ Recommended Next Steps
          </h3>
          <ol className="space-y-3">
            {result.nextSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-medium text-sm shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {/* Footer Note */}
      {result.sourceNote && (
        <p className="text-xs text-muted-foreground text-center italic border-t border-border/50 pt-4">
          {result.sourceNote}
        </p>
      )}
    </motion.div>
  );
};

export default ResultCard;
