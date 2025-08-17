import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BenefitsSection } from './benefits-section';
import type { CalculatorState } from '@/lib/calculator';

interface CollapsibleBenefitsSectionProps {
  state: CalculatorState;
  onUpdate: (section: string, data: any) => void;
}

export function CollapsibleBenefitsSection({ state, onUpdate }: CollapsibleBenefitsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-shield-alt text-finance-blue mr-3"></i>
            <h2 className="text-xl font-semibold text-gray-900">Benefits & Social Security</h2>
          </div>
          <button
            onClick={toggleExpanded}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4">
            <BenefitsSection 
              state={state} 
              onUpdate={onUpdate}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}