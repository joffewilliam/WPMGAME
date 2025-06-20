/**
 * ResultsGraph Component - Using Chart.js with react-chartjs-2
 */
import React from 'react';
import { DataPoint } from './TypingTest';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ResultsGraphProps {
  data: DataPoint[];
  elapsedTime?: number;
  width: number;
  height: number;
}

const ResultsGraph: React.FC<ResultsGraphProps> = ({ data, width, height, elapsedTime }) => {
  const chartData = {
    labels: data.map((point, index) => `${index + 1}`),
    datasets: [
      {
        label: 'WPM',
        data: data.map(point => point.wpm),
        borderColor: 'rgb(59, 130, 246)', // blue-600
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Words Per Minute'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time Segments'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Typing Speed Progress'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `WPM: ${context.parsed.y}`;
          }
        }
      }
    }
  };

  return (
    <div className="results-graph-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ResultsGraph;
