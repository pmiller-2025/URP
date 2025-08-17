import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MonthlyData, AnnualData } from '@/lib/calculator';

interface CashFlowChartProps {
  monthlyData: MonthlyData[];
  annualData: AnnualData[];
}

export function CashFlowChart({ monthlyData, annualData }: CashFlowChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeFrameYears, setTimeFrameYears] = useState(10);
  const [viewMode, setViewMode] = useState<'annual' | 'monthly'>('monthly');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Determine data to display
    let totalIncomeData: number[] = [];
    let totalExpensesData: number[] = [];
    let netCashFlowData: number[] = [];
    let labels: string[] = [];

    if (viewMode === 'monthly') {
      // Monthly view - show months up to timeframe
      const monthsToShow = Math.min(timeFrameYears * 12, monthlyData.length);
      const sampleData = monthlyData.slice(0, monthsToShow);
      
      totalIncomeData = sampleData.map(d => d.totalIncome);
      totalExpensesData = sampleData.map(d => d.totalExpenses);
      netCashFlowData = sampleData.map(d => d.netCashFlow);
      labels = sampleData.map((_, i) => `Month ${i + 1}`);
    } else {
      // Annual view - show years up to timeframe
      const yearsToShow = Math.min(timeFrameYears, annualData.length);
      const sampleData = annualData.slice(0, yearsToShow);
      
      totalIncomeData = sampleData.map(d => d.totalIncome);
      totalExpensesData = sampleData.map(d => d.livingExpenses || 0); // Use livingExpenses for annual
      netCashFlowData = sampleData.map(d => d.netCashFlow);
      labels = sampleData.map((_, i) => `Year ${i + 1}`);
    }

    if (totalIncomeData.length === 0) return;

    // Calculate value ranges
    const maxValue = Math.max(
      Math.max(...totalIncomeData),
      Math.max(...totalExpensesData),
      Math.max(...netCashFlowData.map(Math.abs))
    );
    const minValue = Math.min(0, Math.min(...netCashFlowData));

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw zero line if we have negative values
    if (minValue < 0) {
      const zeroY = height - padding - ((0 - minValue) * chartHeight) / (maxValue - minValue);
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding, zeroY);
      ctx.lineTo(width - padding, zeroY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Function to get point coordinates
    const getPoint = (index: number, value: number) => {
      const x = padding + (index * chartWidth) / (totalIncomeData.length - 1);
      const y = height - padding - ((value - minValue) * chartHeight) / (maxValue - minValue);
      return { x, y };
    };

    // Draw total income area (filled)
    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)'; // green with transparency
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    totalIncomeData.forEach((value, index) => {
      const point = getPoint(index, value);
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw expenses area (filled)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)'; // red with transparency
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    totalExpensesData.forEach((value, index) => {
      const point = getPoint(index, value);
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw total income line
    ctx.strokeStyle = '#10b981'; // finance-green
    ctx.lineWidth = 3;
    ctx.beginPath();
    totalIncomeData.forEach((value, index) => {
      const point = getPoint(index, value);
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw expenses line
    ctx.strokeStyle = '#ef4444'; // red
    ctx.lineWidth = 3;
    ctx.beginPath();
    totalExpensesData.forEach((value, index) => {
      const point = getPoint(index, value);
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw net cash flow line
    ctx.strokeStyle = '#3b82f6'; // blue
    ctx.lineWidth = 2;
    ctx.beginPath();
    netCashFlowData.forEach((value, index) => {
      const point = getPoint(index, value);
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter, sans-serif';
    
    // X-axis labels
    ctx.textAlign = 'center';
    const labelStep = Math.max(1, Math.floor(totalIncomeData.length / 6));
    for (let i = 0; i < totalIncomeData.length; i += labelStep) {
      const x = padding + (i * chartWidth) / (totalIncomeData.length - 1);
      ctx.fillText(labels[i] || '', x, height - padding + 20);
    }

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (i * (maxValue - minValue)) / 5;
      const y = height - padding - (i * chartHeight) / 5;
      const label = value >= 1000000 ? 
        `$${(value / 1000000).toFixed(1)}M` : 
        value >= 1000 ? `$${(value / 1000).toFixed(0)}K` : `$${value.toFixed(0)}`;
      ctx.fillText(label, padding - 10, y + 4);
    }

    // Add data points for key lines
    ctx.fillStyle = '#10b981';
    totalIncomeData.forEach((value, index) => {
      const point = getPoint(index, value);
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.fillStyle = '#ef4444';
    totalExpensesData.forEach((value, index) => {
      const point = getPoint(index, value);
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.fillStyle = '#3b82f6';
    netCashFlowData.forEach((value, index) => {
      const point = getPoint(index, value);
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

  }, [monthlyData, annualData, timeFrameYears, viewMode]);

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            <i className="fas fa-chart-line text-finance-blue mr-2"></i>
            Cash Flow Analysis ({timeFrameYears} Years)
          </h2>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'annual' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('annual')}
              >
                Annual
              </Button>
              <Button
                variant={viewMode === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('monthly')}
              >
                Monthly
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Time Frame:</span>
              <Select value={timeFrameYears.toString()} onValueChange={(value) => setTimeFrameYears(Number(value))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                  <SelectItem value="15">15 Years</SelectItem>
                  <SelectItem value="20">20 Years</SelectItem>
                  <SelectItem value="25">25 Years</SelectItem>
                  <SelectItem value="30">30 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-finance-green rounded mr-2"></div>
            <span className="text-gray-600">Total Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span className="text-gray-600">Total Expenses</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-gray-600">Net Cash Flow</span>
          </div>
        </div>
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="w-full h-96 border border-gray-200 rounded-lg"
            style={{ width: '100%', height: '24rem' }}
          />
        </div>
      </CardContent>
    </Card>
  );
}