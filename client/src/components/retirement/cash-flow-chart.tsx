import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MonthlyData } from "@/lib/calculator";

interface CashFlowChartProps {
  monthlyData: MonthlyData[];
}

export function CashFlowChart({ monthlyData }: CashFlowChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Sample data for first 5 years (60 months) for readability
    const sampleData = monthlyData.slice(0, 60);
    
    // Extract data
    const totalIncomeData = sampleData.map(d => d.netIncome);
    const totalExpensesData = sampleData.map(d => d.livingExp + d.insurance + d.expense1 + d.expense2 + d.expense3 + d.mortgage);
    const netCashFlowData = sampleData.map(d => d.netCashFlow);

    // Find min/max values
    const maxIncome = Math.max(...totalIncomeData);
    const maxExpenses = Math.max(...totalExpensesData);
    const maxCashFlow = Math.max(...netCashFlowData);
    const minCashFlow = Math.min(...netCashFlowData);
    
    const maxValue = Math.max(maxIncome, maxExpenses, maxCashFlow);
    const minValue = Math.min(0, minCashFlow);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Vertical grid lines (every 12 months)
    for (let i = 0; i <= 5; i++) {
      const x = padding + (i * chartWidth) / 5;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 6; i++) {
      const y = padding + (i * chartHeight) / 6;
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
      const x = padding + (index * chartWidth) / (sampleData.length - 1);
      const y = height - padding - ((value - minValue) * chartHeight) / (maxValue - minValue);
      return { x, y };
    };

    // Draw income area (filled)
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

    // Draw income line
    ctx.strokeStyle = '#22c55e'; // green
    ctx.lineWidth = 2;
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
    ctx.lineWidth = 2;
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
    ctx.lineWidth = 3;
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
    ctx.textAlign = 'center';

    // X-axis labels (years)
    for (let i = 0; i <= 5; i++) {
      const x = padding + (i * chartWidth) / 5;
      const year = 2025 + i;
      ctx.fillText(year.toString(), x, height - padding + 20);
    }

    // Y-axis labels (values)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 6; i++) {
      const value = minValue + (i * (maxValue - minValue)) / 6;
      const y = height - padding - (i * chartHeight) / 6;
      const label = Math.abs(value) >= 1000 ? 
        `$${(value / 1000).toFixed(0)}K` : 
        `$${value.toFixed(0)}`;
      ctx.fillText(label, padding - 10, y + 4);
    }

    // Add data points for net cash flow
    ctx.fillStyle = '#3b82f6';
    netCashFlowData.forEach((value, index) => {
      // Only show points every 6 months to avoid clutter
      if (index % 6 === 0) {
        const point = getPoint(index, value);
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

  }, [monthlyData]);

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            <i className="fas fa-chart-line text-finance-blue mr-2"></i>
            Cash Flow Analysis (First 5 Years)
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-600">Net Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="text-gray-600">Total Expenses</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-finance-blue rounded mr-2"></div>
              <span className="text-gray-600">Net Cash Flow</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="w-full h-96 border border-gray-200 rounded-lg"
            style={{ width: '100%', height: '24rem' }}
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>This chart shows your monthly cash flow patterns over the first 5 years. Green areas represent income, red areas represent expenses, and the blue line shows your net cash flow (surplus or deficit).</p>
        </div>
      </CardContent>
    </Card>
  );
}