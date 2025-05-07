/**
 * ResultsPanel Component
 * 
 * Displays the final results of a typing test:
 * - Shows WPM and accuracy statistics
 * - Renders performance graph visualization
 * - Provides option to restart the test
 */
import React from 'react';
import { ThemeColors } from '../../contexts/ThemeContext';
import ResultsGraph from '../ResultsGraph';
import { DataPoint } from '../TypingTest';

interface ResultsPanelProps {
  wpm: number;
  typingData: DataPoint[];
  handleRestart: () => void;
  theme: ThemeColors;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  wpm, 
  typingData,
  handleRestart,
  theme
}) => {
  // Calculate accuracy from the last data point
  const accuracy = typingData.length > 0 
    ? typingData[typingData.length - 1].accuracy 
    : 0;

  return (
    <div className={`text-center p-6 ${theme.cardBg} rounded-md border ${theme.themeMode === 'dark' ? 'border-gray-700' : 'border-gray-200'} max-w-2xl w-full mx-auto`}>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4">
        <div>
          <p className={`text-xl sm:text-2xl font-semibold ${theme.textColor}`}>
            Game Over! Your WPM:
            <span className={`text-3xl sm:text-4xl font-bold ${theme.primaryColor} ml-2`}>{wpm}</span>
          </p>
        </div>
        <div>
          <p className={`text-xl sm:text-2xl font-semibold ${theme.textColor}`}>
            Accuracy:
            <span className={`text-3xl sm:text-4xl font-bold ${theme.successColor || theme.primaryColor} ml-2`}>{accuracy}%</span>
          </p>
        </div>
      </div>
      
      {/* Graph section with full width */}
      <div className="mt-6 mb-6">
        <h3 className={`${theme.textColor} font-semibold mb-2`}></h3>
        
        <div className="mx-auto w-full overflow-x-auto">
          {typingData.length > 1 ? (
            <ResultsGraph 
              data={typingData} 
              width={600} 
              height={300}
              theme={theme.themeMode === 'light' ? 'light' : 'dark'} 
            />
          ) : (
            <div className={`h-[300px] flex items-center justify-center ${theme.textColor} opacity-70`}>
              <p>Not enough typing data collected. Try typing more next time!</p>
            </div>
          )}
        </div>
      </div>
      
      {/* <button
        onClick={handleRestart}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
      >
        Play Again?
      </button> */}
    </div>
  );
};

export default ResultsPanel;
