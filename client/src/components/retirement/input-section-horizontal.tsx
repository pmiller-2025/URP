import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BenefitsSection } from './benefits-section';
import type { CalculatorState } from '@/lib/calculator';

interface InputSectionProps {
  state: CalculatorState;
  onUpdate: (section: string, data: any) => void;
}

export function InputSectionHorizontal({ state, onUpdate }: InputSectionProps) {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    income: true,
    benefits: true,
    expenses: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString();
  };

  const parseCurrency = (value: string): number => {
    return parseFloat(value.replace(/,/g, '')) || 0;
  };

  const currentDate = {
    month: 9,
    year: 2025
  };

  const calculateAge = (birthMonth: number, birthYear: number): number => {
    const currentMonth = 9;
    const currentYear = 2025;
    let age = currentYear - birthYear;
    if (currentMonth < birthMonth) {
      age -= 1;
    }
    return age;
  };

  const handleBirthdayUpdate = (person: 'paul' | 'jessica' | 'luke', month: number, year: number) => {
    const age = calculateAge(month, year);
    
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
      {/* Horizontal Stacked Layout - Better Balance */}
      <div className="space-y-6 mb-8">
        
        {/* Row 1: Personal Information - Full Width */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <i className="fas fa-users text-finance-blue mr-3"></i>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <div className="text-sm text-gray-500 ml-4">
                  Current: {currentDate.month}/{currentDate.year}
                </div>
              </div>
              <button
                onClick={() => toggleSection('personal')}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                {expandedSections.personal ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {expandedSections.personal && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Projection Years */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Label className="block text-sm font-medium text-blue-800 mb-2">Projection Years</Label>
                <Input 
                  type="number" 
                  value={state.personalInfo.projectionYears}
                  onChange={(e) => onUpdate('personalInfo', { projectionYears: parseInt(e.target.value) || 0 })}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
                <p className="text-xs text-blue-600 mt-1">Years to project into retirement</p>
              </div>

              {/* Paul's Information */}
              <div className="space-y-3">
                <Label className="block text-sm font-medium text-gray-700">Paul's Birthday</Label>
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
                <p className="text-xs text-gray-500">Current age: {state.personalInfo.paulAge}</p>
              </div>

              {/* Jessica's Information */}
              <div className="space-y-3">
                <Label className="block text-sm font-medium text-gray-700">Jessica's Birthday</Label>
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
                <p className="text-xs text-gray-500">Current age: {state.personalInfo.jessicaAge}</p>
              </div>

              {/* End of Life Planning */}
              <div className="space-y-3">
                <Label className="block text-sm font-medium text-gray-700">End of Life Planning</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Paul's Age</Label>
                    <Input 
                      type="number" 
                      min="70"
                      max="120"
                      value={state.personalInfo.paulEndOfLifeAge}
                      onChange={(e) => onUpdate('personalInfo', { paulEndOfLifeAge: parseInt(e.target.value) || 100 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label className="block text-xs text-gray-600 mb-1">Jessica's Age</Label>
                    <Input 
                      type="number" 
                      min="70"
                      max="120"
                      value={state.personalInfo.jessicaEndOfLifeAge}
                      onChange={(e) => onUpdate('personalInfo', { jessicaEndOfLifeAge: parseInt(e.target.value) || 100 })}
                      className="text-sm focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Planning scenarios when income stops</p>
              </div>

              {/* Luke's Information */}
              <div className="space-y-3">
                <Label className="block text-sm font-medium text-gray-700">Luke's Birthday</Label>
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
                <p className="text-xs text-gray-500">Current age: {state.personalInfo.lukeAge}</p>
              </div>
            </div>
            )}
          </CardContent>
        </Card>

        {/* Row 2: Income - Full Width */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <i className="fas fa-money-bill-wave text-finance-blue mr-3"></i>
                <h2 className="text-xl font-semibold text-gray-900">Income</h2>
              </div>
              <button
                onClick={() => toggleSection('income')}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                {expandedSections.income ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {expandedSections.income && (
              <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Income */}
              <div className="space-y-4">
                <div>
                  <Label className="block text-lg font-medium text-gray-700 mb-3">Business Income</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <Input 
                      type="text" 
                      value={formatCurrency(state.otherIncome.businessIncome)}
                      onChange={(e) => onUpdate('otherIncome', { businessIncome: parseCurrency(e.target.value) })}
                      className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent text-lg"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div>
                      <Label className="block text-sm text-gray-600 mb-1">Start Month</Label>
                      <Select 
                        value={state.otherIncome.businessStartMonth.toString()}
                        onValueChange={(value) => onUpdate('otherIncome', { businessStartMonth: parseInt(value) })}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {String(i + 1).padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block text-sm text-gray-600 mb-1">Start Year</Label>
                      <Select 
                        value={state.otherIncome.businessStartYear.toString()}
                        onValueChange={(value) => onUpdate('otherIncome', { businessStartYear: parseInt(value) })}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-finance-blue focus:border-transparent">
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
                      <Label className="block text-sm text-gray-600 mb-1">Duration (months)</Label>
                      <Input 
                        type="number" 
                        min="1"
                        value={state.otherIncome.businessDuration}
                        onChange={(e) => onUpdate('otherIncome', { businessDuration: parseInt(e.target.value) || 60 })}
                        className="focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <Checkbox 
                      id="business-tax" 
                      checked={true}
                      disabled
                      className="rounded border-gray-300 text-finance-blue focus:ring-finance-blue"
                    />
                    <Label htmlFor="business-tax" className="ml-2 text-sm text-gray-600">Taxable at {state.taxRates.business}%</Label>
                  </div>
                </div>
              </div>

              {/* Jessica's Income */}
              <div className="space-y-4">
                <div>
                  <Label className="block text-lg font-medium text-gray-700 mb-3">Jessica's Income</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <Input 
                      type="text" 
                      value={formatCurrency(state.otherIncome.jessicaIncome)}
                      onChange={(e) => onUpdate('otherIncome', { jessicaIncome: parseCurrency(e.target.value) })}
                      className="pl-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent text-lg"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div>
                      <Label className="block text-sm text-gray-600 mb-1">Start Month</Label>
                      <Select 
                        value={state.otherIncome.jessicaStartMonth.toString()}
                        onValueChange={(value) => onUpdate('otherIncome', { jessicaStartMonth: parseInt(value) })}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-finance-blue focus:border-transparent">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {String(i + 1).padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block text-sm text-gray-600 mb-1">Start Year</Label>
                      <Select 
                        value={state.otherIncome.jessicaStartYear.toString()}
                        onValueChange={(value) => onUpdate('otherIncome', { jessicaStartYear: parseInt(value) })}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-finance-blue focus:border-transparent">
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
                      <Label className="block text-sm text-gray-600 mb-1">Duration (months)</Label>
                      <Input 
                        type="number" 
                        min="1"
                        value={state.otherIncome.jessicaDuration}
                        onChange={(e) => onUpdate('otherIncome', { jessicaDuration: parseInt(e.target.value) || 12 })}
                        className="focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <Checkbox 
                      id="jessica-tax" 
                      checked={state.otherIncome.jessicaTaxable}
                      onCheckedChange={(checked) => onUpdate('otherIncome', { jessicaTaxable: checked })}
                      className="rounded border-gray-300 text-finance-blue focus:ring-finance-blue"
                    />
                    <Label htmlFor="jessica-tax" className="ml-2 text-sm text-gray-600">Taxable at {state.taxRates.jessica}%</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Income Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Additional Income Sources</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onUpdate('otherIncome', { income1: state.otherIncome.income1 > 0 ? 0 : 1000 })}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    + Income 1
                  </button>
                  <button
                    onClick={() => onUpdate('otherIncome', { income2: state.otherIncome.income2 > 0 ? 0 : 1000 })}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    + Income 2
                  </button>
                  <button
                    onClick={() => onUpdate('otherIncome', { income3: state.otherIncome.income3 > 0 ? 0 : 1000 })}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    + Income 3
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Additional Income Sources (if activated) */}
                {state.otherIncome.income1 > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Additional Income 1</Label>
                    <div className="space-y-2">
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <Input 
                          type="number" 
                          value={state.otherIncome.income1}
                          onChange={(e) => onUpdate('otherIncome', { income1: parseFloat(e.target.value) || 0 })}
                          className="pl-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {state.otherIncome.income2 > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Additional Income 2</Label>
                    <div className="space-y-2">
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <Input 
                          type="number" 
                          value={state.otherIncome.income2}
                          onChange={(e) => onUpdate('otherIncome', { income2: parseFloat(e.target.value) || 0 })}
                          className="pl-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {state.otherIncome.income3 > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="block text-sm font-medium text-gray-700 mb-2">Additional Income 3</Label>
                    <div className="space-y-2">
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <Input 
                          type="number" 
                          value={state.otherIncome.income3}
                          onChange={(e) => onUpdate('otherIncome', { income3: parseFloat(e.target.value) || 0 })}
                          className="pl-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </>
            )}
          </CardContent>
        </Card>

        {/* Row 3: Benefits Section - Full Width */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <i className="fas fa-shield-alt text-finance-blue mr-3"></i>
                <h2 className="text-xl font-semibold text-gray-900">Benefits & Social Security</h2>
              </div>
              <button
                onClick={() => toggleSection('benefits')}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                {expandedSections.benefits ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {expandedSections.benefits && (
              <div className="mt-4">
                <BenefitsSection 
                  state={state} 
                  onUpdate={onUpdate}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Row 4: Living Expenses - Full Width */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <i className="fas fa-shopping-cart text-finance-blue mr-3"></i>
                <h2 className="text-xl font-semibold text-gray-900">Living Expenses</h2>
              </div>
              <button
                onClick={() => toggleSection('expenses')}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                {expandedSections.expenses ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {expandedSections.expenses && (
              <div className="space-y-6">
                {/* Monthly Living Expenses */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <Label className="block text-sm font-medium text-red-800 mb-2">Monthly Living Expenses</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <Input 
                        type="text" 
                        value={formatCurrency(state.livingExpenses.monthlyExpenses)}
                        onChange={(e) => onUpdate('livingExpenses', { monthlyExpenses: parseCurrency(e.target.value) })}
                        className="pl-8 focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-lg"
                      />
                    </div>
                    <p className="text-xs text-red-600 mt-1">Current monthly spending for living costs</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Annual Inflation Rate</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          step="0.1"
                          min="0"
                          max="10"
                          value={state.livingExpenses.inflationRate}
                          onChange={(e) => onUpdate('livingExpenses', { inflationRate: parseFloat(e.target.value) || 2.5 })}
                          className="pr-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Expected annual increase in living costs</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">Retirement Spending Adjustment</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          step="5"
                          min="50"
                          max="120"
                          value={state.livingExpenses.retirementMultiplier}
                          onChange={(e) => onUpdate('livingExpenses', { retirementMultiplier: parseFloat(e.target.value) || 80 })}
                          className="pr-8 focus:ring-2 focus:ring-finance-blue focus:border-transparent"
                        />
                        <span className="absolute right-3 top-2 text-gray-500">%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Percentage of current expenses needed in retirement</p>
                    </div>
                  </div>
                </div>

                {/* Expense Categories Breakdown */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Expense Categories (Optional Detail)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Housing</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">$</span>
                        <Input 
                          type="number" 
                          value={state.livingExpenses.housing || 0}
                          onChange={(e) => onUpdate('livingExpenses', { housing: parseFloat(e.target.value) || 0 })}
                          className="pl-6 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Rent, utilities, maintenance</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Food & Dining</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">$</span>
                        <Input 
                          type="number" 
                          value={state.livingExpenses.food || 0}
                          onChange={(e) => onUpdate('livingExpenses', { food: parseFloat(e.target.value) || 0 })}
                          className="pl-6 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Groceries, restaurants</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Transportation</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">$</span>
                        <Input 
                          type="number" 
                          value={state.livingExpenses.transportation || 0}
                          onChange={(e) => onUpdate('livingExpenses', { transportation: parseFloat(e.target.value) || 0 })}
                          className="pl-6 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Car, gas, insurance</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Healthcare</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">$</span>
                        <Input 
                          type="number" 
                          value={state.livingExpenses.healthcare || 0}
                          onChange={(e) => onUpdate('livingExpenses', { healthcare: parseFloat(e.target.value) || 0 })}
                          className="pl-6 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Insurance, medical costs</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Entertainment</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">$</span>
                        <Input 
                          type="number" 
                          value={state.livingExpenses.entertainment || 0}
                          onChange={(e) => onUpdate('livingExpenses', { entertainment: parseFloat(e.target.value) || 0 })}
                          className="pl-6 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Travel, hobbies, leisure</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Personal Care</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">$</span>
                        <Input 
                          type="number" 
                          value={state.livingExpenses.personalCare || 0}
                          onChange={(e) => onUpdate('livingExpenses', { personalCare: parseFloat(e.target.value) || 0 })}
                          className="pl-6 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Clothing, grooming</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Debt Payments</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">$</span>
                        <Input 
                          type="number" 
                          value={state.livingExpenses.debtPayments || 0}
                          onChange={(e) => onUpdate('livingExpenses', { debtPayments: parseFloat(e.target.value) || 0 })}
                          className="pl-6 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Credit cards, loans</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Other</Label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">$</span>
                        <Input 
                          type="number" 
                          value={state.livingExpenses.other || 0}
                          onChange={(e) => onUpdate('livingExpenses', { other: parseFloat(e.target.value) || 0 })}
                          className="pl-6 text-sm"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Miscellaneous expenses</p>
                    </div>
                  </div>

                  {/* Category Total Display */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800">Total Category Breakdown:</span>
                      <span className="text-lg font-semibold text-blue-900">
                        ${formatCurrency(
                          (state.livingExpenses.housing || 0) +
                          (state.livingExpenses.food || 0) +
                          (state.livingExpenses.transportation || 0) +
                          (state.livingExpenses.healthcare || 0) +
                          (state.livingExpenses.entertainment || 0) +
                          (state.livingExpenses.personalCare || 0) +
                          (state.livingExpenses.debtPayments || 0) +
                          (state.livingExpenses.other || 0)
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      {((state.livingExpenses.housing || 0) + (state.livingExpenses.food || 0) + (state.livingExpenses.transportation || 0) + (state.livingExpenses.healthcare || 0) + (state.livingExpenses.entertainment || 0) + (state.livingExpenses.personalCare || 0) + (state.livingExpenses.debtPayments || 0) + (state.livingExpenses.other || 0)) !== state.livingExpenses.monthlyExpenses ? 
                        `Difference from monthly total: $${formatCurrency(Math.abs(state.livingExpenses.monthlyExpenses - ((state.livingExpenses.housing || 0) + (state.livingExpenses.food || 0) + (state.livingExpenses.transportation || 0) + (state.livingExpenses.healthcare || 0) + (state.livingExpenses.entertainment || 0) + (state.livingExpenses.personalCare || 0) + (state.livingExpenses.debtPayments || 0) + (state.livingExpenses.other || 0))))}` :
                        'Categories match monthly total'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}