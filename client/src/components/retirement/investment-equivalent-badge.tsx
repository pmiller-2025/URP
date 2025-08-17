import { formatInvestmentEquivalent } from "@/lib/calculator";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InvestmentEquivalentBadgeProps {
  monthlyAmount: number;
  label?: string;
  annualRate?: number;
  className?: string;
}

export function InvestmentEquivalentBadge({ 
  monthlyAmount, 
  label = "Investment Equivalent", 
  annualRate = 0.04,
  className = ""
}: InvestmentEquivalentBadgeProps) {
  if (monthlyAmount <= 0) return null;

  const equivalent = formatInvestmentEquivalent(monthlyAmount, annualRate);
  const ratePercent = (annualRate * 100).toFixed(1);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="secondary" 
            className={`ml-2 bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-help ${className}`}
          >
            💰 {equivalent}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">
            <strong>{label}</strong><br/>
            This monthly income of ${monthlyAmount.toLocaleString()} is equivalent to having{" "}
            <strong>{equivalent}</strong> invested at {ratePercent}% annual return.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}