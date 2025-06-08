import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorState, ssBenefitOptions, calculateAge, getCurrentDate, BudgetCategory, getTotalLivingExpenses, calculateLifeInsuranceDuration, calculateLifeInsuranceTotalCost } from "@/lib/calculator";
import { Trash2, Plus } from "lucide-react";

interface InputSectionProps {
  state: CalculatorState;
  onUpdate: (section: keyof CalculatorState, updates: any) => void;
  extraPayment: number;
  standardPayoffMonths: number;
  payoffDate: string;
}

export function InputSection({ state, onUpdate, extraPayment, standardPayoffMonths, payoffDate }: InputSectionProps) {
  const currentDate = getCurrentDate();
  
  // Calculate effective mortgage balance after lump sum payment
  const effectiveMortgageBalance = state.housing.lumpSumAmount > 0 
    ? Math.max(0, state.housing.mortgageBalance - state.housing.lumpSumAmount)
    : state.housing.mortgageBalance;
  
  // Format currency for display
  const formatCurrency = (value: number): string => {
    return value.toLocaleString();
  };
  
  // Parse formatted currency back to number
  const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };
  
  const handleBirthdayUpdate = (person: 'paul' | 'jessica' | 'luke', month: number, year: number) => {
    const age = calculateAge(month, year, currentDate.month, currentDate.year);
    if (person === 'paul') {
      onUpdate('personalInfo', { 
        paulBirthMonth: month, 
        paulBirthYear: year, 
        paulAge: age 
      });
    } else if (person === 'jessica') {
      onUpdate('personalInfo', { 
        jessicaBirthMonth: month, 
        jessicaBirthYear: year, 
        jessicaAge: age 
      });
    } else {
      onUpdate('personalInfo', { 
        lukeBirthMonth: month, 
        lukeBirthYear: year, 
        lukeAge: age 
      });
    }
  };

  return (
    <>
      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Personal Information Card */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <i className="fas fa-users text-finance-blue mr-3"></i>
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              </div>
              <div className="text-sm text-gray-500">
                Current: {currentDate.month}/{currentDate.year}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <Label className="block text-sm font-medium text-blue-800 mb-1">Projection Years</Label>
                <Input 
                  type="number" 
                  value={state.personalInfo.projectionYears}
                  onChange={(e) => onUpdate('personalInfo', { projectionYears: parseInt(e.target.value) || 0 })}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
                <p className="text-xs text-blue-600 mt-1">Years to project into retirement</p>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Paul's Birthday</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Month</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="12"
                      value={state.personalInfo.paulBirthMonth}
                      onChange={(e) => handleBirthdayUpdate('paul', parseInt(e.target.value) || 1, state.personalInfo.paulBirthYear)}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Year</Label>
                    <Input 
                      type="number" 
                      min="1930"
                      max="2010"
                      value={state.personalInfo.paulBirthYear}
                      onChange={(e) => handleBirthdayUpdate('paul', state.personalInfo.paulBirthMonth, parseInt(e.target.value) || 1961)}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Current age: {state.personalInfo.paulAge}</p>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Jessica's Birthday</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Month</Label>
                    <Input 
                      type="number" 
                      min="1"
                      max="12"
                      value={state.personalInfo.jessicaBirthMonth}
                      onChange={(e) => handleBirthdayUpdate('jessica', parseInt(e.target.value) || 1, state.personalInfo.jessicaBirthYear)}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Year</Label>
                    <Input 
                      type="number" 
                      min="1930"
                      max="2010"
                      value={state.personalInfo.jessicaBirthYear}
                      onChange={(e) => handleBirthdayUpdate('jessica', state.personalInfo.jessicaBirthMonth, parseInt(e.target.value) || 1968)}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Current age: {state.personalInfo.jessicaAge}</p>
              </div>
              
              <div className="border-t pt-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Dependents</Label>
                <div>
                  <Label className="block text-sm font-medium text-gray-600 mb-1">Luke's Birthday</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Month</Label>
                      <Input 
                        type="number" 
                        min="1"
                        max="12"
                        value={state.personalInfo.lukeBirthMonth}
                        onChange={(e) => handleBirthdayUpdate('luke', parseInt(e.target.value) || 1, state.personalInfo.lukeBirthYear)}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Year</Label>
                      <Input 
                        type="number" 
                        min="1990"
                        max="2020"
                        value={state.personalInfo.lukeBirthYear}
                        onChange={(e) => handleBirthdayUpdate('luke', state.personalInfo.lukeBirthMonth, parseInt(e.target.value) || 2009)}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Current age: {state.personalInfo.lukeAge}</p>
                </div>
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
                    type="text" 
                    value={formatCurrency(state.otherIncome.vaDisability)}
                    onChange={(e) => onUpdate('otherIncome', { vaDisability: parseCurrency(e.target.value) })}
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
                    type="text" 
                    value={formatCurrency(state.otherIncome.chapter35)}
                    onChange={(e) => onUpdate('otherIncome', { chapter35: parseCurrency(e.target.value) })}
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
                    <Select 
                      value={state.otherIncome.chapter35StartYear.toString()}
                      onValueChange={(value) => onUpdate('otherIncome', { chapter35StartYear: parseInt(value) })}
                    >
                      <SelectTrigger className="text-xs focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {2024 + i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    type="text" 
                    value={formatCurrency(state.otherIncome.businessIncome)}
                    onChange={(e) => onUpdate('otherIncome', { businessIncome: parseCurrency(e.target.value) })}
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
                    <Select 
                      value={state.otherIncome.businessStartYear.toString()}
                      onValueChange={(value) => onUpdate('otherIncome', { businessStartYear: parseInt(value) })}
                    >
                      <SelectTrigger className="text-xs focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {2024 + i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    type="text" 
                    value={formatCurrency(state.otherIncome.jessicaIncome)}
                    onChange={(e) => onUpdate('otherIncome', { jessicaIncome: parseCurrency(e.target.value) })}
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
                    <Select 
                      value={state.otherIncome.jessicaStartYear.toString()}
                      onValueChange={(value) => onUpdate('otherIncome', { jessicaStartYear: parseInt(value) })}
                    >
                      <SelectTrigger className="text-xs focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 20 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {2024 + i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              
              {/* Additional Income 1 */}
              {state.otherIncome.income1 > 0 && (
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Additional Income 1</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <Input 
                      type="number" 
                      value={state.otherIncome.income1}
                      onChange={(e) => onUpdate('otherIncome', { income1: parseFloat(e.target.value) || 0 })}
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
                        value={state.otherIncome.income1StartMonth}
                        onChange={(e) => onUpdate('otherIncome', { income1StartMonth: parseInt(e.target.value) || 1 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Start Year</Label>
                      <Select 
                        value={state.otherIncome.income1StartYear.toString()}
                        onValueChange={(value) => onUpdate('otherIncome', { income1StartYear: parseInt(value) })}
                      >
                        <SelectTrigger className="text-xs focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {2024 + i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Duration (months)</Label>
                      <Input 
                        type="number" 
                        min="1"
                        value={state.otherIncome.income1Duration}
                        onChange={(e) => onUpdate('otherIncome', { income1Duration: parseInt(e.target.value) || 12 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Non-taxable</p>
                </div>
              )}
              
              {/* Additional Income 2 */}
              {state.otherIncome.income2 > 0 && (
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Additional Income 2</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <Input 
                      type="number" 
                      value={state.otherIncome.income2}
                      onChange={(e) => onUpdate('otherIncome', { income2: parseFloat(e.target.value) || 0 })}
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
                        value={state.otherIncome.income2StartMonth}
                        onChange={(e) => onUpdate('otherIncome', { income2StartMonth: parseInt(e.target.value) || 1 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Start Year</Label>
                      <Select 
                        value={state.otherIncome.income2StartYear.toString()}
                        onValueChange={(value) => onUpdate('otherIncome', { income2StartYear: parseInt(value) })}
                      >
                        <SelectTrigger className="text-xs focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {2024 + i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Duration (months)</Label>
                      <Input 
                        type="number" 
                        min="1"
                        value={state.otherIncome.income2Duration}
                        onChange={(e) => onUpdate('otherIncome', { income2Duration: parseInt(e.target.value) || 12 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Non-taxable</p>
                </div>
              )}
              
              {/* Additional Income 3 */}
              {state.otherIncome.income3 > 0 && (
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Additional Income 3</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <Input 
                      type="number" 
                      value={state.otherIncome.income3}
                      onChange={(e) => onUpdate('otherIncome', { income3: parseFloat(e.target.value) || 0 })}
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
                        value={state.otherIncome.income3StartMonth}
                        onChange={(e) => onUpdate('otherIncome', { income3StartMonth: parseInt(e.target.value) || 1 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Start Year</Label>
                      <Select 
                        value={state.otherIncome.income3StartYear.toString()}
                        onValueChange={(value) => onUpdate('otherIncome', { income3StartYear: parseInt(value) })}
                      >
                        <SelectTrigger className="text-xs focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {2024 + i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Duration (months)</Label>
                      <Input 
                        type="number" 
                        min="1"
                        value={state.otherIncome.income3Duration}
                        onChange={(e) => onUpdate('otherIncome', { income3Duration: parseInt(e.target.value) || 12 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Non-taxable</p>
                </div>
              )}
              
              {/* Add Income Button */}
              {(state.otherIncome.income1 === 0 || state.otherIncome.income2 === 0 || state.otherIncome.income3 === 0) && (
                <div className="border-t pt-4">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Add Additional Income</Label>
                  <div className="flex gap-2">
                    {state.otherIncome.income1 === 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdate('otherIncome', { income1: 1000 })}
                        className="text-xs"
                      >
                        + Income 1
                      </Button>
                    )}
                    {state.otherIncome.income2 === 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdate('otherIncome', { income2: 1000 })}
                        className="text-xs"
                      >
                        + Income 2
                      </Button>
                    )}
                    {state.otherIncome.income3 === 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdate('otherIncome', { income3: 1000 })}
                        className="text-xs"
                      >
                        + Income 3
                      </Button>
                    )}
                  </div>
                </div>
              )}
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
                    type="text" 
                    value={formatCurrency(state.housing.homeValue)}
                    onChange={(e) => onUpdate('housing', { homeValue: parseCurrency(e.target.value) })}
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
                    type="text" 
                    value={formatCurrency(state.housing.mortgageBalance)}
                    onChange={(e) => onUpdate('housing', { mortgageBalance: parseCurrency(e.target.value) })}
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
                    type="text" 
                    value={formatCurrency(state.housing.monthlyPayment)}
                    onChange={(e) => onUpdate('housing', { monthlyPayment: parseCurrency(e.target.value) })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Standard payoff: {Math.round(standardPayoffMonths)} months
                </p>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Annual Home Appreciation</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    step="0.1"
                    value={state.housing.homeAppreciation}
                    onChange={(e) => onUpdate('housing', { homeAppreciation: parseFloat(e.target.value) || 0 })}
                    className="pr-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Expected annual increase in home value</p>
              </div>
              
              {/* Lump Sum Payment */}
              <div className="border-t pt-4">
                <Label className="block text-sm font-medium text-gray-700 mb-3">Lump Sum Payment (Optional)</Label>
                <div className="space-y-3">
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Payment Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <Input 
                        type="text" 
                        value={formatCurrency(state.housing.lumpSumAmount)}
                        onChange={(e) => onUpdate('housing', { lumpSumAmount: parseCurrency(e.target.value) })}
                        className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  {state.housing.lumpSumAmount > 0 && (
                    <div>
                      <Label className="block text-xs text-gray-600 mb-1">Payment Month/Year</Label>
                      <div className="grid grid-cols-2 gap-1">
                        <Select 
                          value={state.housing.lumpSumMonth.toString()}
                          onValueChange={(value) => onUpdate('housing', { lumpSumMonth: parseInt(value) })}
                        >
                          <SelectTrigger className="text-xs focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                            <SelectValue placeholder="Mo" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {new Date(2024, i).toLocaleDateString('en-US', { month: 'short' })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select 
                          value={state.housing.lumpSumYear.toString()}
                          onValueChange={(value) => onUpdate('housing', { lumpSumYear: parseInt(value) })}
                        >
                          <SelectTrigger className="text-xs focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                            <SelectValue placeholder="Yr" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 20 }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {2024 + i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
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
              </div>
                
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Home Value:</span>
                    <span className="font-medium">${state.housing.homeValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Mortgage Balance:</span>
                    <span className="font-medium">${effectiveMortgageBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-blue-200 pt-1">
                    <span className="text-gray-600">Current Equity:</span>
                    <span className="font-semibold text-finance-green">
                      ${(state.housing.homeValue - effectiveMortgageBalance).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs mt-2 pt-2 border-t border-blue-200">
                    <span className="text-gray-600">Regular Payment:</span>
                    <span className="font-medium">${state.housing.monthlyPayment.toLocaleString()}</span>
                  </div>
                  {state.housing.acceleratePayoff && extraPayment > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Extra Payment:</span>
                      <span className="font-medium text-finance-blue">+${Math.round(extraPayment).toLocaleString()}</span>
                    </div>
                  )}
                  {state.housing.lumpSumAmount > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Lump Sum Payment:</span>
                      <span className="font-medium text-orange-600">${state.housing.lumpSumAmount.toLocaleString()}</span>
                    </div>
                  )}
                  {state.housing.lumpSumAmount > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Lump Sum Date:</span>
                      <span className="font-medium text-orange-600">
                        {new Date(2024, state.housing.lumpSumMonth - 1).toLocaleDateString('en-US', { month: 'short' })} {2024 + state.housing.lumpSumYear}
                      </span>
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
                    type="text" 
                    value={formatCurrency(state.savings.initialAmount)}
                    onChange={(e) => onUpdate('savings', { initialAmount: parseCurrency(e.target.value) })}
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
                    type="text" 
                    value={formatCurrency(state.savings.additionalAnnual)}
                    onChange={(e) => onUpdate('savings', { additionalAnnual: parseCurrency(e.target.value) })}
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
            
            <Tabs 
              value={state.expenses.budgetType} 
              onValueChange={(value) => onUpdate('expenses', { budgetType: value as 'fixed' | 'detailed' })}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Budget</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fixed" className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Total Monthly Living Expenses</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <Input 
                      type="text" 
                      value={formatCurrency(state.expenses.basicLiving)}
                      onChange={(e) => onUpdate('expenses', { basicLiving: parseCurrency(e.target.value) })}
                      className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">All living expenses combined</p>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium text-gray-700">Budget Categories</Label>
                    <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                      Total: ${getTotalLivingExpenses(state.expenses).toLocaleString()}
                    </div>
                  </div>
                  
                  {state.expenses.detailedBudget?.map((category, index) => (
                    <div key={category.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <Input 
                          type="text"
                          value={category.name}
                          onChange={(e) => {
                            const updated = [...state.expenses.detailedBudget];
                            updated[index] = { ...category, name: e.target.value };
                            onUpdate('expenses', { detailedBudget: updated });
                          }}
                          className="text-sm font-medium"
                          placeholder="Category name"
                        />
                      </div>
                      <div className="w-24">
                        <div className="relative">
                          <span className="absolute left-2 top-2 text-gray-500 text-xs">$</span>
                          <Input 
                            type="text"
                            value={formatCurrency(category.amount)}
                            onChange={(e) => {
                              const updated = [...state.expenses.detailedBudget];
                              updated[index] = { ...category, amount: parseCurrency(e.target.value) };
                              onUpdate('expenses', { detailedBudget: updated });
                            }}
                            className="pl-6 text-sm"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      {category.isCustom && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = state.expenses.detailedBudget.filter((_, i) => i !== index);
                            onUpdate('expenses', { detailedBudget: updated });
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newCategory: BudgetCategory = {
                        id: `custom-${Date.now()}`,
                        name: 'New Category',
                        amount: 100,
                        isCustom: true
                      };
                      const updated = [...(state.expenses.detailedBudget || []), newCategory];
                      onUpdate('expenses', { detailedBudget: updated });
                    }}
                    className="w-full border-dashed"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Category
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="border-t pt-4 mt-6 space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Life Insurance (Monthly)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <Input 
                    type="text" 
                    value={formatCurrency(state.expenses.lifeInsurance)}
                    onChange={(e) => onUpdate('expenses', { lifeInsurance: parseCurrency(e.target.value) })}
                    className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Start Month/Year</Label>
                    <div className="grid grid-cols-2 gap-1">
                      <Input 
                        type="number" 
                        min="1"
                        max="12"
                        value={state.expenses.lifeInsuranceStartMonth}
                        onChange={(e) => onUpdate('expenses', { lifeInsuranceStartMonth: parseInt(e.target.value) || 1 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                        placeholder="Mo"
                      />
                      <Input 
                        type="number" 
                        min="1"
                        max="20"
                        value={state.expenses.lifeInsuranceStartYear}
                        onChange={(e) => onUpdate('expenses', { lifeInsuranceStartYear: parseInt(e.target.value) || 1 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                        placeholder="Yr"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">End Month/Year</Label>
                    <div className="grid grid-cols-2 gap-1">
                      <Input 
                        type="number" 
                        min="1"
                        max="12"
                        value={state.expenses.lifeInsuranceEndMonth}
                        onChange={(e) => onUpdate('expenses', { lifeInsuranceEndMonth: parseInt(e.target.value) || 12 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                        placeholder="Mo"
                      />
                      <Input 
                        type="number" 
                        min="1"
                        max="20"
                        value={state.expenses.lifeInsuranceEndYear}
                        onChange={(e) => onUpdate('expenses', { lifeInsuranceEndYear: parseInt(e.target.value) || 1 })}
                        className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                        placeholder="Yr"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Months:</span>
                    <span className="font-medium">{calculateLifeInsuranceDuration(state.expenses)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Cost:</span>
                    <span className="font-medium">${calculateLifeInsuranceTotalCost(state.expenses).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Inflation Rate</Label>
                <div className="relative">
                  <Input 
                    type="number" 
                    step="0.1"
                    value={state.expenses.inflationRate}
                    onChange={(e) => onUpdate('expenses', { inflationRate: parseFloat(e.target.value) || 0 })}
                    className="pr-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{state.expenses.inflationRate}% annual increase</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
