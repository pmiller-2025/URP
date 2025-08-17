import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculatorState, calculateMonthlyProjections } from '@/lib/calculator';

interface IncomeTimelineChartProps {
  state: CalculatorState;
  viewMode: 'annual' | 'monthly';
  selectedYear?: number;
}

interface IncomeSource {
  name: string;
  color: string;
  values: number[];
}

export function IncomeTimelineChart({ state, viewMode, selectedYear = 1 }: IncomeTimelineChartProps) {
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
    const padding = { top: 40, right: 80, bottom: 60, left: 80 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Prepare data based on view mode
    let data: number[][];
    let labels: string[];
    let periods: number;

    if (viewMode === 'annual') {
      // Annual view - 30 years
      periods = 30;
      labels = Array.from({ length: periods }, (_, i) => `Year ${i + 1}`);
      data = [];
      
      // Calculate annual totals for each income source
      for (let year = 0; year < periods; year++) {
        const monthlyData = calculateMonthlyProjections(state, year + 1);
        const annualTotals = new Array(7).fill(0); // 7 income sources
        
        monthlyData.forEach(month => {
          annualTotals[0] += month.business || 0;
          annualTotals[1] += month.jessicaWork || 0;
          annualTotals[2] += month.chapter35 || 0;
          annualTotals[3] += month.vaDisability || 0;
          annualTotals[4] += month.paulSS || 0;
          annualTotals[5] += month.jessicaSS || 0;
          annualTotals[6] += 0; // Other income sources handled separately
        });
        
        data.push(annualTotals);
      }
    } else {
      // Monthly view for selected year
      const monthlyData = calculateMonthlyProjections(state, selectedYear);
      periods = monthlyData.length;
      labels = monthlyData.map((month, index) => {
        const date = new Date(2025 + selectedYear - 1, index);
        return date.toLocaleDateString('en-US', { month: 'short' });
      });
      
      data = monthlyData.map(month => [
        month.business || 0,
        month.jessicaWork || 0,
        month.chapter35 || 0,
        month.vaDisability || 0,
        month.paulSS || 0,
        month.jessicaSS || 0,
        0 // Other income sources handled separately
      ]);
    }

    // Define income sources with colors
    const incomeSources: IncomeSource[] = [
      { name: 'Business Income', color: '#3B82F6', values: data.map(d => d[0]) },
      { name: 'Jessica Work', color: '#10B981', values: data.map(d => d[1]) },
      { name: 'Chapter 35', color: '#F59E0B', values: data.map(d => d[2]) },
      { name: 'VA Disability', color: '#8B5CF6', values: data.map(d => d[3]) },
      { name: 'Paul SS', color: '#EF4444', values: data.map(d => d[4]) },
      { name: 'Jessica SS', color: '#EC4899', values: data.map(d => d[5]) },
      { name: 'Other Income', color: '#6B7280', values: data.map(d => d[6]) }
    ];

    // Filter out income sources with no values
    const activeIncomeSources = incomeSources.filter(source => 
      source.values.some(value => value > 0)
    );

    // Calculate stacked totals for scaling
    const stackedTotals = data.map(period => 
      period.reduce((sum, value) => sum + value, 0)
    );
    const maxTotal = Math.max(...stackedTotals);
    const maxY = Math.ceil(maxTotal / 1000) * 1000; // Round up to nearest 1000

    // Draw grid lines and Y-axis labels
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#6B7280';

    // Horizontal grid lines
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
      const y = padding.top + (chartHeight * i) / ySteps;
      const value = maxY - (maxY * i) / ySteps;
      
      // Grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
      
      // Y-axis label
      ctx.textAlign = 'right';
      ctx.fillText(`$${(value / 1000).toFixed(0)}k`, padding.left - 10, y + 4);
    }

    // Draw stacked area chart
    const barWidth = chartWidth / periods;
    
    for (let i = 0; i < periods; i++) {
      const x = padding.left + (i * barWidth);
      let currentY = padding.top + chartHeight;
      
      // Draw each income source as a stacked bar
      for (const source of activeIncomeSources) {
        const value = source.values[i];
        if (value > 0) {
          const barHeight = (value / maxY) * chartHeight;
          
          ctx.fillStyle = source.color;
          ctx.fillRect(x + 2, currentY - barHeight, barWidth - 4, barHeight);
          
          currentY -= barHeight;
        }
      }
    }

    // Draw X-axis labels
    ctx.fillStyle = '#6B7280';
    ctx.textAlign = 'center';
    ctx.font = '11px system-ui';
    
    for (let i = 0; i < Math.min(periods, 12); i++) {
      const step = Math.max(1, Math.floor(periods / 12));
      if (i % step === 0) {
        const x = padding.left + (i * barWidth) + (barWidth / 2);
        ctx.fillText(labels[i], x, height - 20);
      }
    }

    // Draw legend
    let legendY = padding.top - 20;
    let legendX = padding.left;
    
    ctx.font = '12px system-ui';
    for (const source of activeIncomeSources) {
      // Color box
      ctx.fillStyle = source.color;
      ctx.fillRect(legendX, legendY, 12, 12);
      
      // Label
      ctx.fillStyle = '#374151';
      ctx.textAlign = 'left';
      ctx.fillText(source.name, legendX + 16, legendY + 9);
      
      const textWidth = ctx.measureText(source.name).width;
      legendX += textWidth + 40;
      
      // Break to next line if too long
      if (legendX > width - 100) {
        legendX = padding.left;
        legendY -= 20;
      }
    }

    // Chart title
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'center';
    const title = viewMode === 'annual' 
      ? 'Income Sources Over 30 Years' 
      : `Monthly Income Sources - Year ${selectedYear}`;
    ctx.fillText(title, width / 2, 25);

  }, [state, viewMode, selectedYear]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Income Timeline Breakdown
        </CardTitle>
        <p className="text-sm text-gray-600">
          {viewMode === 'annual' 
            ? 'Annual income composition showing transition from work to retirement benefits'
            : `Monthly breakdown for Year ${selectedYear} showing seasonal variations`
          }
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-96 border rounded-lg bg-white"
            style={{ width: '100%', height: '384px' }}
          />
        </div>
        
        {/* Summary stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="font-medium text-blue-900">Active Sources</div>
            <div className="text-blue-700">
              {(() => {
                let count = 0;
                if (state.otherIncome.businessIncome > 0) count++;
                if (state.otherIncome.jessicaIncome > 0) count++;
                if (state.otherIncome.chapter35 > 0) count++;
                if (state.otherIncome.vaDisability > 0) count++;
                if (state.socialSecurity.paulAmount > 0) count++;
                if (state.socialSecurity.jessicaAmount > 0) count++;
                return count;
              })()} income streams
            </div>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="font-medium text-green-900">Peak Income</div>
            <div className="text-green-700">
              ${Math.max(
                state.otherIncome.businessIncome + state.otherIncome.jessicaIncome + 
                state.otherIncome.vaDisability + state.socialSecurity.paulAmount + 
                state.socialSecurity.jessicaAmount + state.socialSecurity.jessicaSpousalAmount
              ).toLocaleString()}/month
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="font-medium text-purple-900">Guaranteed Income</div>
            <div className="text-purple-700">
              ${(state.otherIncome.vaDisability + state.socialSecurity.paulAmount + 
                state.socialSecurity.jessicaAmount + state.socialSecurity.jessicaSpousalAmount
              ).toLocaleString()}/month
            </div>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="font-medium text-orange-900">Work Income</div>
            <div className="text-orange-700">
              ${(state.otherIncome.businessIncome + state.otherIncome.jessicaIncome
              ).toLocaleString()}/month
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}