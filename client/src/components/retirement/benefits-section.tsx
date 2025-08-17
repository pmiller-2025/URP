import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalculatorState } from "@/lib/calculator";
import { Calculator, DollarSign, Calendar, TrendingUp, Shield, Users, AlertCircle } from "lucide-react";

interface BenefitsSectionProps {
  state: CalculatorState;
  onUpdate: (section: keyof CalculatorState, updates: any) => void;
}

export function BenefitsSection({ state, onUpdate }: BenefitsSectionProps) {
  // Format currency for display
  const formatCurrency = (value: number): string => {
    return Math.round(value).toLocaleString();
  };
  
  // Parse formatted currency back to number
  const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  // Calculate total monthly benefits
  const totalMonthlyBenefits = state.otherIncome.vaDisability + 
    state.socialSecurity.paulAmount + 
    state.socialSecurity.jessicaAmount + 
    state.socialSecurity.jessicaSpousalAmount;

  // Calculate guaranteed income percentage vs work income
  const workIncome = state.otherIncome.businessIncome + state.otherIncome.jessicaIncome;
  const guaranteedPercentage = workIncome > 0 ? Math.round((totalMonthlyBenefits / workIncome) * 100) : 100;

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <CardTitle className="text-lg font-semibold text-gray-900">
              Benefits & Social Security
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              <DollarSign className="w-3 h-3 mr-1" />
              ${totalMonthlyBenefits.toLocaleString()}/mo
            </Badge>
            <Badge variant="outline" className="border-blue-200 text-blue-700">
              {guaranteedPercentage}% of work income
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Guaranteed benefits providing income security throughout retirement
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* VA Disability - Highlighted as guaranteed income */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-purple-600 mr-2" />
              <Label className="text-base font-semibold text-purple-900">VA Disability Benefits</Label>
            </div>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              Non-taxable
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-purple-800 mb-1">Monthly Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <Input 
                  type="text" 
                  value={formatCurrency(state.otherIncome.vaDisability)}
                  onChange={(e) => onUpdate('otherIncome', { vaDisability: parseCurrency(e.target.value) })}
                  className="pl-9 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                />
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">3% annual increase (COLA protection)</span>
            </div>
          </div>
          
          {/* VA Survivor Benefits Info */}
          <Alert className="mt-3 bg-amber-50 border-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <AlertDescription className="text-amber-800 text-sm">
              <strong>Survivor Benefits:</strong> Jessica receives 50% if Paul passes after March 2035, zero if before.
            </AlertDescription>
          </Alert>
        </div>

        <Separator />

        {/* Social Security Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Social Security Benefits</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                ${(state.socialSecurity.paulAmount + state.socialSecurity.jessicaAmount + state.socialSecurity.jessicaSpousalAmount).toLocaleString()}/mo
              </Badge>
            </div>
          </div>

          {/* Paul's Social Security */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-semibold text-blue-900 flex items-center">
                <Calculator className="w-4 h-4 mr-2" />
                Paul's Social Security
              </h4>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Age {state.socialSecurity.paulStartAge} start
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="block text-sm font-medium text-blue-800 mb-1">Monthly Benefit</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  <Input 
                    type="text" 
                    value={formatCurrency(state.socialSecurity.paulAmount)}
                    onChange={(e) => onUpdate('socialSecurity', { paulAmount: parseCurrency(e.target.value) })}
                    className="pl-9 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-blue-800 mb-1">Start Age</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                  <Input 
                    type="number" 
                    min="62"
                    max="70"
                    value={state.socialSecurity.paulStartAge}
                    onChange={(e) => onUpdate('socialSecurity', { paulStartAge: parseInt(e.target.value) || 67 })}
                    className="pl-9 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
                <p className="text-xs text-blue-600 mt-1">Starts July (birth month)</p>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="paul-ss-tax" 
                  checked={state.socialSecurity.paulTaxable}
                  onCheckedChange={(checked) => onUpdate('socialSecurity', { paulTaxable: checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="paul-ss-tax" className="ml-2 text-sm text-blue-800">
                  Taxable at {state.taxRates.socialSecurity}%
                </Label>
              </div>
            </div>
          </div>

          {/* Jessica's Social Security - Two-Tier System */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-semibold text-emerald-900 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Jessica's Social Security
              </h4>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                Two-Tier System
              </Badge>
            </div>
            
            <Alert className="mb-4 bg-emerald-50 border-emerald-200">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800 text-sm">
                Jessica receives Tier 1 only before Paul starts benefits, then Tier 1 + Tier 2 combined after Paul starts.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {/* Tier 1: Own Benefit */}
              <div className="bg-white p-3 rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-semibold text-emerald-900">Tier 1: Own Benefit</h5>
                  <Badge variant="outline" className="border-emerald-300 text-emerald-700 text-xs">
                    Before Paul starts
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="block text-xs font-medium text-emerald-800 mb-1">Monthly Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2 w-3 h-3 text-gray-500" />
                      <Input 
                        type="text" 
                        value={formatCurrency(state.socialSecurity.jessicaAmount)}
                        onChange={(e) => onUpdate('socialSecurity', { jessicaAmount: parseCurrency(e.target.value) })}
                        className="pl-7 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="block text-xs font-medium text-emerald-800 mb-1">Start Age</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2 top-2 w-3 h-3 text-gray-500" />
                      <Input 
                        type="number" 
                        min="62"
                        max="70"
                        value={state.socialSecurity.jessicaStartAge}
                        onChange={(e) => onUpdate('socialSecurity', { jessicaStartAge: parseInt(e.target.value) || 67 })}
                        className="pl-7 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-emerald-600 mt-1">Starts December (birth month)</p>
                  </div>
                </div>
              </div>

              {/* Tier 2: Spousal Benefit */}
              <div className="bg-white p-3 rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-semibold text-emerald-900">Tier 2: Spousal Benefit</h5>
                  <Badge variant="outline" className="border-emerald-300 text-emerald-700 text-xs">
                    After Paul starts
                  </Badge>
                </div>
                
                <div>
                  <Label className="block text-xs font-medium text-emerald-800 mb-1">Additional Monthly Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2 w-3 h-3 text-gray-500" />
                    <Input 
                      type="text" 
                      value={formatCurrency(state.socialSecurity.jessicaSpousalAmount)}
                      onChange={(e) => onUpdate('socialSecurity', { jessicaSpousalAmount: parseCurrency(e.target.value) })}
                      className="pl-7 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-xs text-emerald-600 mt-1">Added when Paul's benefits begin</p>
                </div>
              </div>

              {/* Jessica's Tax Settings */}
              <div className="flex items-center">
                <Checkbox 
                  id="jessica-ss-tax" 
                  checked={state.socialSecurity.jessicaTaxable}
                  onCheckedChange={(checked) => onUpdate('socialSecurity', { jessicaTaxable: checked })}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <Label htmlFor="jessica-ss-tax" className="ml-2 text-sm text-emerald-800">
                  Taxable at {state.taxRates.socialSecurity}%
                </Label>
              </div>
            </div>
          </div>

          {/* COLA Settings */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-5 h-5 text-gray-600 mr-2" />
              <Label className="text-base font-semibold text-gray-900">Cost of Living Adjustment (COLA)</Label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Annual COLA Rate</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    step="0.1"
                    value={state.socialSecurity.cola}
                    onChange={(e) => onUpdate('socialSecurity', { cola: parseFloat(e.target.value) || 0 })}
                    className="pr-8 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Typical range: 1.5% - 3.0%</p>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="cola-tax" 
                  checked={state.socialSecurity.colaTaxable}
                  onCheckedChange={(checked) => onUpdate('socialSecurity', { colaTaxable: checked })}
                  className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                />
                <Label htmlFor="cola-tax" className="ml-2 text-sm text-gray-700">
                  COLA increases are taxable
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <h4 className="text-sm font-semibold text-green-900 mb-3 flex items-center">
            <Calculator className="w-4 h-4 mr-2" />
            Benefits Summary
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-green-800">${state.otherIncome.vaDisability.toLocaleString()}</div>
              <div className="text-green-600">VA Disability</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-800">${state.socialSecurity.paulAmount.toLocaleString()}</div>
              <div className="text-green-600">Paul SS</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-800">
                ${(state.socialSecurity.jessicaAmount + state.socialSecurity.jessicaSpousalAmount).toLocaleString()}
              </div>
              <div className="text-green-600">Jessica SS Total</div>
            </div>
            <div className="text-center border-l border-green-300 pl-4">
              <div className="font-bold text-lg text-green-800">${totalMonthlyBenefits.toLocaleString()}</div>
              <div className="text-green-600 font-semibold">Total Monthly</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}