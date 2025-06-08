import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorState, ssBenefitOptions } from "@/lib/calculator";

interface InputSectionProps {
  state: CalculatorState;
  onUpdate: (section: keyof CalculatorState, updates: any) => void;
  extraPayment: number;
  standardPayoffMonths: number;
  payoffDate: string;
}

export function InputSection({ state, onUpdate, extraPayment, standardPayoffMonths, payoffDate }: InputSectionProps) {
  return (
    <>
      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Personal Information Card */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <i className="fas fa-users text-finance-blue mr-3"></i>
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Paul's Age</Label>
                <Input 
                  type="number" 
                  value={state.personalInfo.paulAge}
                  onChange={(e) => onUpdate('personalInfo', { paulAge: parseInt(e.target.value) || 0 })}
                  className="focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Jessica's Age</Label>
                <Input 
                  type="number" 
                  value={state.personalInfo.jessicaAge}
                  onChange={(e) => onUpdate('personalInfo', { jessicaAge: parseInt(e.target.value) || 0 })}
                  className="focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Projection Years</Label>
                <Input 
                  type="number" 
                  value={state.personalInfo.projectionYears}
                  onChange={(e) => onUpdate('personalInfo', { projectionYears: parseInt(e.target.value) || 0 })}
                  className="focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Card */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <i className="fas fa-shield-alt text-finance-blue mr-3"></i>
              <h2 className="text-lg font-semibold text-gray-900">Benefits</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">VA Disability (Monthly)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.otherIncome.vaDisability}
                    onChange={(e) => onUpdate('otherIncome', { vaDisability: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Non-taxable, 3% annual increase</p>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Paul's SS Claiming Age</Label>
                <Select 
                  value={state.socialSecurity.paulStartAge.toString()} 
                  onValueChange={(value) => {
                    const age = parseInt(value);
                    const benefit = ssBenefitOptions.find(opt => opt.age === age);
                    if (benefit) {
                      onUpdate('socialSecurity', { 
                        paulStartAge: age,
                        paulAmount: benefit.amount 
                      });
                    }
                  }}
                >
                  <SelectTrigger className="focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ssBenefitOptions.map(option => (
                      <SelectItem key={option.age} value={option.age.toString()}>
                        Age {option.age}: ${option.amount.toLocaleString()}/mo ({option.description.split(' - ')[0]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-finance-blue">
                    {ssBenefitOptions.find(opt => opt.age === state.socialSecurity.paulStartAge)?.description}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <Checkbox 
                    id="paul-ss-tax" 
                    checked={state.socialSecurity.paulTaxable}
                    onCheckedChange={(checked) => onUpdate('socialSecurity', { paulTaxable: checked })}
                    className="rounded border-gray-300 text-finance-blue focus:ring-finance-blue"
                  />
                  <Label htmlFor="paul-ss-tax" className="ml-2 text-sm text-gray-600">Taxable at {state.taxRates.socialSecurity}%</Label>
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Jessica's SS Claiming Age</Label>
                <Select 
                  value={state.socialSecurity.jessicaStartAge.toString()} 
                  onValueChange={(value) => {
                    const age = parseInt(value);
                    const benefit = ssBenefitOptions.find(opt => opt.age === age);
                    if (benefit) {
                      onUpdate('socialSecurity', { 
                        jessicaStartAge: age,
                        jessicaAmount: benefit.amount * 0.5 
                      });
                    }
                  }}
                >
                  <SelectTrigger className="focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ssBenefitOptions.map(option => (
                      <SelectItem key={option.age} value={option.age.toString()}>
                        Age {option.age}: ${Math.round(option.amount * 0.5).toLocaleString()}/mo (50% of Paul's)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2 p-2 bg-green-50 rounded-lg">
                  <p className="text-xs text-finance-green">
                    Spousal benefit: 50% of Paul's amount at selected age
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <Checkbox 
                    id="jessica-ss-tax" 
                    checked={state.socialSecurity.jessicaTaxable}
                    onCheckedChange={(checked) => onUpdate('socialSecurity', { jessicaTaxable: checked })}
                    className="rounded border-gray-300 text-finance-blue focus:ring-finance-blue"
                  />
                  <Label htmlFor="jessica-ss-tax" className="ml-2 text-sm text-gray-600">Taxable at {state.taxRates.socialSecurity}%</Label>
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Annual COLA</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    step="0.1"
                    value={state.socialSecurity.cola}
                    onChange={(e) => onUpdate('socialSecurity', { cola: parseFloat(e.target.value) || 0 })}
                    className="pr-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Chapter 35 Income</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.otherIncome.chapter35}
                    onChange={(e) => onUpdate('otherIncome', { chapter35: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Start Month</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="12"
                      value={state.otherIncome.chapter35StartMonth}
                      onChange={(e) => onUpdate('otherIncome', { chapter35StartMonth: parseInt(e.target.value) || 1 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Start Year</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="20"
                      value={state.otherIncome.chapter35StartYear}
                      onChange={(e) => onUpdate('otherIncome', { chapter35StartYear: parseInt(e.target.value) || 1 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Duration (months)</Label>
                    <Input 
                      type="number" 
                      min="1"
                      value={state.otherIncome.chapter35Duration}
                      onChange={(e) => onUpdate('otherIncome', { chapter35Duration: parseInt(e.target.value) || 24 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Non-taxable education benefit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Income Card */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <i className="fas fa-money-bill-wave text-finance-blue mr-3"></i>
              <h2 className="text-lg font-semibold text-gray-900">Other Income</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Business Income</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.otherIncome.businessIncome}
                    onChange={(e) => onUpdate('otherIncome', { businessIncome: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Start Month</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="12"
                      value={state.otherIncome.businessStartMonth}
                      onChange={(e) => onUpdate('otherIncome', { businessStartMonth: parseInt(e.target.value) || 1 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Start Year</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="20"
                      value={state.otherIncome.businessStartYear}
                      onChange={(e) => onUpdate('otherIncome', { businessStartYear: parseInt(e.target.value) || 1 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Duration (months)</Label>
                    <Input 
                      type="number" 
                      min="1"
                      value={state.otherIncome.businessDuration}
                      onChange={(e) => onUpdate('otherIncome', { businessDuration: parseInt(e.target.value) || 60 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Checkbox 
                    id="business-tax" 
                    checked={true}
                    disabled
                    className="rounded border-gray-300 text-finance-blue focus:ring-finance-blue"
                  />
                  <Label htmlFor="business-tax" className="ml-2 text-sm text-gray-600">Taxable at {state.taxRates.business}%</Label>
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Jessica's Income</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.otherIncome.jessicaIncome}
                    onChange={(e) => onUpdate('otherIncome', { jessicaIncome: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Start Month</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="12"
                      value={state.otherIncome.jessicaStartMonth}
                      onChange={(e) => onUpdate('otherIncome', { jessicaStartMonth: parseInt(e.target.value) || 1 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Start Year</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="20"
                      value={state.otherIncome.jessicaStartYear}
                      onChange={(e) => onUpdate('otherIncome', { jessicaStartYear: parseInt(e.target.value) || 1 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Duration (months)</Label>
                    <Input 
                      type="number" 
                      min="1"
                      value={state.otherIncome.jessicaDuration}
                      onChange={(e) => onUpdate('otherIncome', { jessicaDuration: parseInt(e.target.value) || 24 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Checkbox 
                    id="jessica-tax" 
                    checked={true}
                    disabled
                    className="rounded border-gray-300 text-finance-blue focus:ring-finance-blue"
                  />
                  <Label htmlFor="jessica-tax" className="ml-2 text-sm text-gray-600">Taxable at {state.taxRates.jessica}%</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Housing & Mortgage Card */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <i className="fas fa-home text-finance-blue mr-3"></i>
              <h2 className="text-lg font-semibold text-gray-900">Housing & Mortgage</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Home Value</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.housing.homeValue}
                    onChange={(e) => onUpdate('housing', { homeValue: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{state.housing.homeAppreciation}% annual appreciation</p>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Mortgage Balance</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.housing.mortgageBalance}
                    onChange={(e) => onUpdate('housing', { mortgageBalance: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{state.housing.interestRate}% interest rate</p>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Monthly Payment</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.housing.monthlyPayment}
                    onChange={(e) => onUpdate('housing', { monthlyPayment: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Standard payoff: {Math.round(standardPayoffMonths)} months
                </p>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Checkbox 
                    id="accelerate-payoff" 
                    checked={state.housing.acceleratePayoff}
                    onCheckedChange={(checked) => onUpdate('housing', { acceleratePayoff: checked })}
                    className="rounded border-gray-300 text-finance-blue focus:ring-finance-blue"
                  />
                  <Label htmlFor="accelerate-payoff" className="text-sm font-medium text-gray-700">
                    Accelerate Payoff
                  </Label>
                </div>
                
                {state.housing.acceleratePayoff && (
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Target Payoff (Months)</Label>
                    <Input 
                      type="number" 
                      value={state.housing.targetPayoffMonths}
                      onChange={(e) => onUpdate('housing', { targetPayoffMonths: parseInt(e.target.value) || 0 })}
                      className="focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                )}
                
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Regular Payment:</span>
                      <span className="font-medium">${state.housing.monthlyPayment.toLocaleString()}</span>
                    </div>
                    {state.housing.acceleratePayoff && extraPayment > 0 && (
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Extra Payment:</span>
                        <span className="font-medium text-finance-blue">+${Math.round(extraPayment).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs border-t border-blue-200 pt-1">
                      <span className="text-gray-600">Total Payment:</span>
                      <span className="font-semibold text-finance-blue">
                        ${(state.housing.monthlyPayment + extraPayment).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Payoff Date:</span>
                      <span className="font-medium text-finance-green">{payoffDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Savings & Investments Card */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <i className="fas fa-chart-line text-finance-blue mr-3"></i>
              <h2 className="text-lg font-semibold text-gray-900">Savings & Investments</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Initial Savings</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.savings.initialAmount}
                    onChange={(e) => onUpdate('savings', { initialAmount: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Annual Return</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    step="0.1"
                    value={state.savings.annualReturn}
                    onChange={(e) => onUpdate('savings', { annualReturn: parseFloat(e.target.value) || 0 })}
                    className="pr-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
                <div className="flex items-center mt-2">
                  <Checkbox 
                    id="investment-tax" 
                    checked={state.savings.taxOnGains}
                    onCheckedChange={(checked) => onUpdate('savings', { taxOnGains: checked })}
                    className="rounded border-gray-300 text-finance-blue focus:ring-finance-blue"
                  />
                  <Label htmlFor="investment-tax" className="ml-2 text-sm text-gray-600">{state.savings.gainsTaxRate}% tax on gains</Label>
                </div>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Additional Annual Savings</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.savings.additionalAnnual}
                    onChange={(e) => onUpdate('savings', { additionalAnnual: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <i className="fas fa-receipt text-finance-blue mr-3"></i>
              <h2 className="text-lg font-semibold text-gray-900">Expenses</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Basic Living (Monthly)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.expenses.basicLiving}
                    onChange={(e) => onUpdate('expenses', { basicLiving: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{state.expenses.inflationRate}% annual increase</p>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Life Insurance (Monthly)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="number" 
                    value={state.expenses.lifeInsurance}
                    onChange={(e) => onUpdate('expenses', { lifeInsurance: parseFloat(e.target.value) || 0 })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Years {state.expenses.lifeInsuranceStartYear}-{state.expenses.lifeInsuranceEndYear} only</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
