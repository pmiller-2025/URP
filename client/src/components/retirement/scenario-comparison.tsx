import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { RetirementScenario } from "@shared/schema";

interface ScenarioComparison {
  summary: string;
  keyDifferences: string[];
  financialImpact: {
    netWorthDifference: string;
    cashFlowImpact: string;
    riskAssessment: string;
  };
  recommendations: string[];
  tradeOffs: string[];
}

export function ScenarioComparison() {
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [scenario1Id, setScenario1Id] = useState<string>("");
  const [scenario2Id, setScenario2Id] = useState<string>("");
  const [comparisonResult, setComparisonResult] = useState<ScenarioComparison | null>(null);
  const { toast } = useToast();

  // Fetch all scenarios
  const { data: scenarios = [], isLoading } = useQuery({
    queryKey: ["/api/scenarios"],
    queryFn: async (): Promise<RetirementScenario[]> => {
      const response = await fetch("/api/scenarios");
      if (!response.ok) throw new Error("Failed to fetch scenarios");
      return response.json();
    }
  });

  // Compare scenarios mutation
  const compareMutation = useMutation({
    mutationFn: async ({ scenario1Id, scenario2Id }: { scenario1Id: string; scenario2Id: string }) => {
      console.log("Comparing scenarios:", scenario1Id, scenario2Id);
      const response = await fetch("/api/scenarios/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scenario1Id, scenario2Id })
      });
      
      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      if (!response.ok) {
        throw new Error(`Failed to compare scenarios: ${responseText}`);
      }
      
      return JSON.parse(responseText);
    },
    onSuccess: (result) => {
      console.log("Comparison result:", result);
      setComparisonResult(result);
      toast({
        title: "Comparison Complete",
        description: "AI analysis of your scenarios is ready."
      });
    },
    onError: (error) => {
      console.error("Comparison error:", error);
      toast({
        title: "Comparison Failed",
        description: `Failed to analyze scenarios: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const handleCompare = () => {
    if (!scenario1Id || !scenario2Id) {
      toast({
        title: "Selection Required",
        description: "Please select two different scenarios to compare.",
        variant: "destructive"
      });
      return;
    }

    if (scenario1Id === scenario2Id) {
      toast({
        title: "Different Scenarios Required",
        description: "Please select two different scenarios to compare.",
        variant: "destructive"
      });
      return;
    }

    compareMutation.mutate({ scenario1Id, scenario2Id });
  };

  const scenario1 = scenarios.find(s => s.id.toString() === scenario1Id);
  const scenario2 = scenarios.find(s => s.id.toString() === scenario2Id);

  return (
    <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-purple-500 text-purple-600 hover:bg-purple-50"
          disabled={scenarios.length < 2}
        >
          <i className="fas fa-brain mr-2"></i>
          AI Compare
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <i className="fas fa-brain text-purple-600 mr-2"></i>
            AI Scenario Comparison
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Scenario Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Scenario</label>
              <Select value={scenario1Id} onValueChange={setScenario1Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first scenario" />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map((scenario) => (
                    <SelectItem key={scenario.id} value={scenario.id.toString()}>
                      <div className="flex flex-col">
                        <span className="font-medium">{scenario.name}</span>
                        {scenario.description && (
                          <span className="text-xs text-gray-500">{scenario.description}</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Second Scenario</label>
              <Select value={scenario2Id} onValueChange={setScenario2Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second scenario" />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map((scenario) => (
                    <SelectItem key={scenario.id} value={scenario.id.toString()}>
                      <div className="flex flex-col">
                        <span className="font-medium">{scenario.name}</span>
                        {scenario.description && (
                          <span className="text-xs text-gray-500">{scenario.description}</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Compare Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleCompare}
              disabled={!scenario1Id || !scenario2Id || scenario1Id === scenario2Id || compareMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700 px-8"
            >
              {compareMutation.isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Analyzing...
                </>
              ) : (
                <>
                  <i className="fas fa-magic mr-2"></i>
                  Compare with AI
                </>
              )}
            </Button>
          </div>

          {/* Comparison Results */}
          {comparisonResult && (
            <div className="space-y-6 border-t pt-6">
              {/* Selected Scenarios Header */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-700">{scenario1?.name}</CardTitle>
                    {scenario1?.description && (
                      <p className="text-sm text-gray-600">{scenario1.description}</p>
                    )}
                  </CardHeader>
                </Card>
                <Card className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-700">{scenario2?.name}</CardTitle>
                    {scenario2?.description && (
                      <p className="text-sm text-gray-600">{scenario2.description}</p>
                    )}
                  </CardHeader>
                </Card>
              </div>

              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-eye text-purple-600 mr-2"></i>
                    Executive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{comparisonResult.summary}</p>
                </CardContent>
              </Card>

              {/* Key Differences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-list text-blue-600 mr-2"></i>
                    Key Differences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {comparisonResult.keyDifferences.map((diff, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-arrow-right text-blue-500 mr-2 mt-1 text-sm"></i>
                        <span className="text-gray-700">{diff}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Financial Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-chart-line text-green-600 mr-2"></i>
                    Financial Impact Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2">Net Worth Impact</Badge>
                    <p className="text-gray-700">{comparisonResult.financialImpact.netWorthDifference}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Cash Flow Impact</Badge>
                    <p className="text-gray-700">{comparisonResult.financialImpact.cashFlowImpact}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Risk Assessment</Badge>
                    <p className="text-gray-700">{comparisonResult.financialImpact.riskAssessment}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-lightbulb text-yellow-600 mr-2"></i>
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {comparisonResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mr-2 mt-1 text-sm"></i>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Trade-offs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-balance-scale text-orange-600 mr-2"></i>
                    Key Trade-offs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {comparisonResult.tradeOffs.map((tradeOff, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-exchange-alt text-orange-500 mr-2 mt-1 text-sm"></i>
                        <span className="text-gray-700">{tradeOff}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}