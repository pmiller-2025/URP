import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CalculatorState } from "@/lib/calculator";
import type { RetirementScenario } from "@shared/schema";

interface ScenarioManagerProps {
  currentState: CalculatorState;
  onLoadScenario: (state: CalculatorState) => void;
}

export function ScenarioManager({ currentState, onLoadScenario }: ScenarioManagerProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioDescription, setScenarioDescription] = useState("");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all scenarios
  const { data: scenarios = [], isLoading } = useQuery({
    queryKey: ["/api/scenarios"],
    queryFn: async (): Promise<RetirementScenario[]> => {
      const response = await fetch("/api/scenarios");
      if (!response.ok) throw new Error("Failed to fetch scenarios");
      return response.json();
    }
  });

  // Save scenario mutation
  const saveMutation = useMutation({
    mutationFn: async ({ name, description, data }: { name: string; description: string; data: CalculatorState }) => {
      const response = await fetch("/api/scenarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          scenarioData: data
        })
      });
      if (!response.ok) throw new Error("Failed to save scenario");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scenarios"] });
      toast({
        title: "Scenario Saved",
        description: "Your retirement scenario has been saved successfully."
      });
      setSaveDialogOpen(false);
      setScenarioName("");
      setScenarioDescription("");
    },
    onError: (error) => {
      toast({
        title: "Save Failed",
        description: "Failed to save scenario. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Delete scenario mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/scenarios/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete scenario");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scenarios"] });
      toast({
        title: "Scenario Deleted",
        description: "The scenario has been deleted successfully."
      });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete scenario. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSave = () => {
    if (!scenarioName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your scenario.",
        variant: "destructive"
      });
      return;
    }

    saveMutation.mutate({
      name: scenarioName.trim(),
      description: scenarioDescription.trim(),
      data: currentState
    });
  };

  const handleLoad = () => {
    const scenario = scenarios.find(s => s.id.toString() === selectedScenarioId);
    if (scenario) {
      onLoadScenario(scenario.scenarioData as CalculatorState);
      setLoadDialogOpen(false);
      setSelectedScenarioId("");
      toast({
        title: "Scenario Loaded",
        description: `"${scenario.name}" has been loaded successfully.`
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Save Scenario Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-finance-blue text-finance-blue hover:bg-finance-blue hover:text-white">
            <i className="fas fa-save mr-2"></i>
            Save Scenario
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Retirement Scenario</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="scenario-name" className="text-sm font-medium">
                Scenario Name *
              </Label>
              <Input
                id="scenario-name"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                placeholder="e.g., Conservative Plan, Aggressive Growth"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="scenario-description" className="text-sm font-medium">
                Description (Optional)
              </Label>
              <Textarea
                id="scenario-description"
                value={scenarioDescription}
                onChange={(e) => setScenarioDescription(e.target.value)}
                placeholder="Brief description of this scenario..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setSaveDialogOpen(false)}
              disabled={saveMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="bg-finance-blue hover:bg-finance-blue/90"
            >
              {saveMutation.isPending ? "Saving..." : "Save Scenario"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Load Scenario Dialog */}
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-finance-green text-finance-green hover:bg-finance-green hover:text-white">
            <i className="fas fa-folder-open mr-2"></i>
            Load Scenario
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Load Retirement Scenario</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {isLoading ? (
              <div className="text-center py-4">Loading scenarios...</div>
            ) : scenarios.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No saved scenarios found. Save your current scenario first.
              </div>
            ) : (
              <>
                <Label htmlFor="scenario-select" className="text-sm font-medium">
                  Select Scenario
                </Label>
                <Select value={selectedScenarioId} onValueChange={setSelectedScenarioId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a scenario to load" />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((scenario) => (
                      <SelectItem key={scenario.id} value={scenario.id.toString()}>
                        <div className="flex flex-col">
                          <span className="font-medium">{scenario.name}</span>
                          {scenario.description && (
                            <span className="text-xs text-gray-500">{scenario.description}</span>
                          )}
                          <span className="text-xs text-gray-400">
                            Updated: {new Date(scenario.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Scenario Management */}
                {scenarios.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Manage Scenarios</Label>
                    <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                      {scenarios.map((scenario) => (
                        <div key={scenario.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{scenario.name}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(scenario.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-800 hover:bg-red-50"
                              >
                                <i className="fas fa-trash text-xs"></i>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Scenario</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{scenario.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(scenario.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setLoadDialogOpen(false);
                setSelectedScenarioId("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLoad}
              disabled={!selectedScenarioId}
              className="bg-finance-green hover:bg-finance-green/90"
            >
              Load Scenario
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}