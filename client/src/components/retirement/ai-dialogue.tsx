import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, Sparkles, TrendingUp } from "lucide-react";
import { CalculatorState } from "@/lib/calculator";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AIResponse {
  summary: string;
  changes: Array<{
    field: string;
    oldValue: any;
    newValue: any;
    description: string;
  }>;
  insights: string[];
  recommendations: string[];
  updatedState: CalculatorState;
}

interface AIDialogueProps {
  currentState: CalculatorState;
  onStateUpdate: (newState: CalculatorState) => void;
}

export function AIDialogue({ currentState, onStateUpdate }: AIDialogueProps) {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'ai';
    content: string;
    changes?: AIResponse['changes'];
    insights?: string[];
    recommendations?: string[];
  }>>([]);

  const aiMutation = useMutation({
    mutationFn: async (userPrompt: string): Promise<AIResponse> => {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userPrompt,
          currentState
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze scenario');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Update the calculator state
      onStateUpdate(data.updatedState);
      
      // Add both user prompt and AI response to conversation
      setConversation(prev => [
        ...prev,
        { type: 'user', content: prompt },
        { 
          type: 'ai', 
          content: data.summary,
          changes: data.changes,
          insights: data.insights,
          recommendations: data.recommendations
        }
      ]);
      
      setPrompt("");
    },
    onError: (error) => {
      console.error('AI analysis failed:', error);
      setConversation(prev => [
        ...prev,
        { type: 'user', content: prompt },
        { type: 'ai', content: 'I apologize, but I encountered an error analyzing your request. Please try rephrasing your question.' }
      ]);
      setPrompt("");
    }
  });

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    aiMutation.mutate(prompt.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const examplePrompts = [
    "What if I delay Social Security until age 70?",
    "Show me the impact of paying off my mortgage in 3 years",
    "How would a $50,000 lump sum payment affect my finances?",
    "What if Jessica's income increased to $4,000/month?",
    "Compare aggressive vs conservative investment strategy"
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Sparkles className="w-5 h-5" />
          AI Financial Assistant
        </CardTitle>
        <p className="text-sm text-purple-600">
          Ask questions about your retirement plan and I'll analyze scenarios for you
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Conversation History */}
        {conversation.length > 0 && (
          <div className="max-h-96 overflow-y-auto space-y-3 mb-4">
            {conversation.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white border border-purple-200'
                }`}>
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && <MessageSquare className="w-4 h-4 mt-1 text-purple-600" />}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Show changes made */}
                      {message.changes && message.changes.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium text-purple-700">Changes Made:</p>
                          {message.changes.map((change, idx) => (
                            <div key={idx} className="bg-purple-50 rounded p-2">
                              <p className="text-xs font-medium">{change.description}</p>
                              <p className="text-xs text-gray-600">
                                {String(change.oldValue)} → {String(change.newValue)}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Show insights */}
                      {message.insights && message.insights.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-blue-700 mb-1">Key Insights:</p>
                          <div className="space-y-1">
                            {message.insights.map((insight, idx) => (
                              <div key={idx} className="flex items-start gap-1">
                                <TrendingUp className="w-3 h-3 mt-0.5 text-blue-600" />
                                <p className="text-xs text-blue-700">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Show recommendations */}
                      {message.recommendations && message.recommendations.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-green-700 mb-1">Recommendations:</p>
                          <div className="space-y-1">
                            {message.recommendations.map((rec, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-green-100 text-green-800">
                                {rec}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Example Prompts */}
        {conversation.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-1 px-2 border-purple-200 hover:bg-purple-50"
                  onClick={() => setPrompt(example)}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="space-y-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your retirement scenario... (Press Enter to send)"
            className="min-h-[60px] border-purple-200 focus:border-purple-400"
            disabled={aiMutation.isPending}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              {conversation.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConversation([])}
                  className="text-xs h-auto p-1"
                >
                  Clear conversation
                </Button>
              )}
            </p>
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || aiMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {aiMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}