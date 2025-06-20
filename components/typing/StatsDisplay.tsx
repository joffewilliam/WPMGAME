/**
 * StatsDisplay Component
 * 
 * Displays real-time statistics during the typing test:
 * - WPM (Words Per Minute)
 * - Accuracy percentage
 * - Error count
 * - Elapsed time in the current test
 * - Progress (words/quotes completed)
 * - Game mode
 * 
 * Props:
 * - wpm: Words per minute (can be null if test not finished)
 * - accuracy: Typing accuracy percentage
 * - errors: Number of typing errors
 * - elapsedTime: Seconds elapsed in the test
 * - isFinished: Whether the test is complete
 * - typingData: Array of data points for visualization
 * - gameMode: The current game mode
 * - progress: Current progress (words/quotes completed)
 * - target: Target words/quotes to complete
 */
import React from 'react';
import { DataPoint, GameMode } from '../TypingTest';

interface StatsDisplayProps {
  wpm: number | null;
  accuracy: number;
  errors: number;
  elapsedTime: number;
  isFinished: boolean;
  typingData: DataPoint[];
  gameMode: GameMode;
  progress: number;
  target: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ 
  wpm, 
  accuracy, 
  errors, 
  elapsedTime,
  isFinished,
  typingData,
  gameMode,
  progress,
  target
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  const progressLabel = gameMode === "quotes" ? "Quotes" : "Words";

  return (
    <div className="stats-display">
      <div className="stat-group">
        <div className="stat">
          <span className="stat-label">WPM:</span>
          <span className="stat-value">{wpm || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Accuracy:</span>
          <span className="stat-value">{accuracy}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Errors:</span>
          <span className="stat-value">{errors}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{formatTime(elapsedTime)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{progressLabel}:</span>
          <span className="stat-value">{progress}/{target}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
