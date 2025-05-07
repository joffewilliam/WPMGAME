/**
 * ResultsGraph Component
 * 
 * Renders a canvas-based performance graph showing:
 * - WPM over time
 * - Accuracy percentage over time
 * - Error indicators
 * - Supports both light and dark themes
 */
import React, { useEffect, useRef } from 'react';

type DataPoint = {
  second: number;
  wpm: number;
  accuracy: number;
  errors: number;
};

type ResultsGraphProps = {
  data: DataPoint[];
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
};

const ResultsGraph: React.FC<ResultsGraphProps> = ({ data, width = 900, height = 300, theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle edge cases with minimal data
  if (!data || data.length <= 1) {
    return (
      <div 
        className="flex items-center justify-center text-gray-500 graph-container"
        data-width={width}
        data-height={height}
      >
        <p>Insufficient data to display graph</p>
      </div>
    );
  }

  // Ensure maxSeconds is set based on actual data
  const maxSeconds = Math.max(...data.map(point => point.second));
  const maxWPM = Math.max(100, Math.max(...data.map(point => point.wpm)));
  const maxErrors = Math.max(...data.map(point => point.errors), 5);

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const canvas = canvasRef.current;
    
    // Adjust canvas for device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale the context to draw everything at the higher resolution
    ctx.scale(dpr, dpr);

    // Add padding to prevent cutting off labels
    const padding = {
      left: 40,  // Left padding for WPM labels
      right: 40, // Right padding for Accuracy labels
      top: 20,   // Top padding 
      bottom: 25 // Bottom padding for time labels
    };

    // Adjusted drawing area
    const drawWidth = width - padding.left - padding.right;
    const drawHeight = height - padding.top - padding.bottom;

    // Set up canvas
    ctx.clearRect(0, 0, width, height);

    // Background color based on theme
    if (theme === 'dark') {
      ctx.fillStyle = '#1e293b'; // Dark background
    } else {
      ctx.fillStyle = '#f8fafc'; // Light background
    }
    ctx.fillRect(0, 0, width, height);

    // Draw chart title
    const titleColor = theme === 'dark' ? '#f8fafc' : '#1e293b';
    ctx.fillStyle = titleColor;
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Performance Over Time', width / 2, padding.top / 2 + 5);

    // Draw legend at the top of the graph, below the title
    const legendY = padding.top / 2 + 20;
    const legendX = width / 2 - 120; // Center the legend
    
    // WPM legend item
    ctx.strokeStyle = theme === 'dark' ? '#4ade80' : '#22c55e';
    ctx.beginPath();
    ctx.moveTo(legendX, legendY);
    ctx.lineTo(legendX + 20, legendY);
    ctx.stroke();
    ctx.fillStyle = theme === 'dark' ? '#f8fafc' : '#1e293b';
    ctx.textAlign = 'left';
    ctx.fillText('WPM', legendX + 25, legendY + 4);
    
    // Accuracy legend item
    ctx.strokeStyle = theme === 'dark' ? '#60a5fa' : '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(legendX + 80, legendY);
    ctx.lineTo(legendX + 100, legendY);
    ctx.stroke();
    ctx.fillText('Accuracy', legendX + 105, legendY + 4);
    
    // Error legend item
    ctx.fillStyle = theme === 'dark' ? '#ef4444' : '#dc2626';
    ctx.beginPath();
    ctx.arc(legendX + 190, legendY, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = theme === 'dark' ? '#f8fafc' : '#1e293b';
    ctx.fillText('Errors', legendX + 200, legendY + 4);

    // Draw grid
    ctx.strokeStyle = theme === 'dark' ? '#334155' : '#cbd5e1'; // Grid lines
    ctx.lineWidth = 1;

    // Draw y-axis labels for WPM (left side)
    const wpmStep = Math.ceil(maxWPM / 4);
    for (let i = 0; i <= 4; i++) {
      const wpmValue = i * wpmStep;
      const y = padding.top + drawHeight - (wpmValue / maxWPM) * drawHeight;
      
      // Draw horizontal grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + drawWidth, y);
      ctx.stroke();
      
      // Draw WPM label
      ctx.fillStyle = theme === 'dark' ? '#94a3b8' : '#475569';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${wpmValue}`, padding.left - 5, y + 4);
    }

    // Draw y-axis labels for Accuracy (right side)
    for (let i = 0; i <= 4; i++) {
      const accuracyValue = i * 25; // 0, 25, 50, 75, 100
      const y = padding.top + drawHeight - (accuracyValue / 100) * drawHeight;
      
      // Accuracy label
      ctx.fillStyle = theme === 'dark' ? '#94a3b8' : '#475569';
      ctx.textAlign = 'left';
      ctx.fillText(`${accuracyValue}%`, padding.left + drawWidth + 5, y + 4);
    }

    // Draw x-axis (time) labels and vertical grid lines
    const timeInterval = maxSeconds <= 15 ? 5 : maxSeconds <= 30 ? 10 : 15;
    for (let i = 0; i <= maxSeconds; i += timeInterval) {
      const x = padding.left + (i / maxSeconds) * drawWidth;
      
      // Draw vertical grid line
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + drawHeight);
      ctx.stroke();
      
      // Draw time label
      ctx.fillStyle = theme === 'dark' ? '#94a3b8' : '#475569';
      ctx.textAlign = 'center';
      ctx.fillText(`${i}s`, x, padding.top + drawHeight + 15);
    }

    // Draw final time marker if not included in intervals
    if (maxSeconds % timeInterval !== 0) {
      const x = padding.left + drawWidth;
      ctx.fillStyle = theme === 'dark' ? '#94a3b8' : '#475569';
      ctx.textAlign = 'center';
      ctx.fillText(`${maxSeconds}s`, x, padding.top + drawHeight + 15);
    }

    // Draw WPM line
    ctx.strokeStyle = theme === 'dark' ? '#4ade80' : '#22c55e'; // Green line for WPM
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding.left + (point.second / maxSeconds) * drawWidth;
      const y = padding.top + drawHeight - (point.wpm / maxWPM) * drawHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw errors as red dots
    ctx.fillStyle = theme === 'dark' ? '#ef4444' : '#dc2626'; // Red for errors
    data.forEach(point => {
      if (point.errors > 0) {
        const x = padding.left + (point.second / maxSeconds) * drawWidth;
        const y = padding.top + drawHeight - (point.wpm / maxWPM) * drawHeight;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Draw accuracy line
    ctx.strokeStyle = theme === 'dark' ? '#60a5fa' : '#3b82f6'; // Blue line for accuracy
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding.left + (point.second / maxSeconds) * drawWidth;
      const y = padding.top + drawHeight - (point.accuracy / 100) * drawHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = theme === 'dark' ? '#f8fafc' : '#1e293b';
    ctx.font = 'bold 12px sans-serif';
    
    // WPM label
    ctx.textAlign = 'center';
    ctx.save();
    ctx.translate(15, padding.top + drawHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('WPM', 0, 0);
    ctx.restore();
    
    // Accuracy label
    ctx.save();
    ctx.translate(width - 15, padding.top + drawHeight / 2);
    ctx.rotate(Math.PI / 2);
    ctx.fillText('Accuracy', 0, 0);
    ctx.restore();
    
    // Time label
    ctx.textAlign = 'center';
    ctx.fillText('Time (seconds)', padding.left + drawWidth / 2, height - 5);

  }, [data, width, height, maxWPM, maxErrors, theme, maxSeconds]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className="rounded-md mx-auto graph-container"
      data-width={width}
      data-height={height}
    />
  );
};

export default ResultsGraph;
