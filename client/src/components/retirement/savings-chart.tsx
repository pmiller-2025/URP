import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AnnualData } from "@/lib/calculator";

interface SavingsChartProps {
  annualData: AnnualData[];
}

export function SavingsChart({ annualData }: SavingsChartProps) {
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

    // Extract data
    const years = annualData.map(d => d.year);
    const savingsData = annualData.map(d => d.savingsBalance);
    const netWorthData = annualData.map(d => d.netWorth);

    // Find min/max values
    const maxSavings = Math.max(...savingsData);
    const maxNetWorth = Math.max(...netWorthData);
    const maxValue = Math.max(maxSavings, maxNetWorth);
    const minValue = Math.min(0, Math.min(...savingsData), Math.min(...netWorthData));

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let i = 0; i <= 4; i++) {
      const x = padding + (i * chartWidth) / 4;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
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
      const x = padding + (index * chartWidth) / (annualData.length - 1);
      const y = height - padding - ((value - minValue) * chartHeight) / (maxValue - minValue);
      return { x, y };
    };

    // Draw savings balance line
    ctx.strokeStyle = '#3b82f6'; // finance-blue
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    savingsData.forEach((value, index) => {
      const point = getPoint(index, value);
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw net worth line
    ctx.strokeStyle = '#10b981'; // finance-green
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    netWorthData.forEach((value, index) => {
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
    for (let i = 0; i < annualData.length; i += 5) {
      const x = padding + (i * chartWidth) / (annualData.length - 1);
      ctx.fillText(years[i].toString(), x, height - padding + 20);
    }

    // Y-axis labels (values)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (i * (maxValue - minValue)) / 5;
      const y = height - padding - (i * chartHeight) / 5;
      const label = value >= 1000000 ? 
        `$${(value / 1000000).toFixed(1)}M` : 
        value >= 1000 ? `$${(value / 1000).toFixed(0)}K` : `$${value.toFixed(0)}`;
      ctx.fillText(label, padding - 10, y + 4);
    }

    // Add data points
    ctx.fillStyle = '#3b82f6';
    savingsData.forEach((value, index) => {
      const point = getPoint(index, value);
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.fillStyle = '#10b981';
    netWorthData.forEach((value, index) => {
      const point = getPoint(index, value);
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

  }, [annualData]);

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            <i className="fas fa-chart-area text-finance-blue mr-2"></i>
            Savings Balance Over Time
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-finance-blue rounded mr-2"></div>
              <span className="text-gray-600">Savings Balance</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-finance-green rounded mr-2"></div>
              <span className="text-gray-600">Net Worth</span>
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
      </CardContent>
    </Card>
  );
}
