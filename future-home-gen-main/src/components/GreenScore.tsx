import { Leaf } from "lucide-react";

const GreenScore = ({ score }: { score: number }) => {
  const color = score >= 80 ? "text-primary" : score >= 60 ? "text-eco-teal" : "text-eco-blue";
  const bg = score >= 80 ? "bg-primary/10" : score >= 60 ? "bg-eco-teal/10" : "bg-eco-blue/10";

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${color} ${bg}`}>
      <Leaf className="h-3.5 w-3.5" />
      {score}/100
    </div>
  );
};

export default GreenScore;
