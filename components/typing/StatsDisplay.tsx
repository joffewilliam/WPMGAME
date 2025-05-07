/**
 * StatsDisplay Component
 * 
 * Displays real-time statistics during the typing test:
 * - Time remaining in the current test
 * - Total characters typed so far
 * - Current user input length
 * 
 * Props:
 * - timeLeft: Seconds remaining in the test
 * - totalCharsTyped: Total characters typed so far (excluding current input)
 * - userInputLength: Length of current user input
 * - theme: Current theme colors
 */
import React from 'react';
import { ThemeColors } from '../../contexts/ThemeContext';

interface StatsDisplayProps {
  timeLeft: number;
  totalCharsTyped: number;
  userInputLength: number;
  theme: ThemeColors;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ 
  timeLeft, 
  totalCharsTyped, 
  userInputLength,
  theme 
}) => {
  return (
    <div className="flex justify-center gap-8 items-center font-medium select-none mb-8">
      <span className={`text-lg ${theme.textColor}`}>
        Time: <span className={`font-bold ${theme.primaryColor}`}>{timeLeft}s</span>
      </span>
      <span className={`text-lg ${theme.textColor}`}>
        Chars: <span className={`font-bold ${theme.primaryColor}`}>{totalCharsTyped + userInputLength}</span>
      </span>
    </div>
  );
};

export default StatsDisplay;
