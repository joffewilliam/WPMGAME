/**
 * GameModeSelector Component
 * 
 * Provides UI for selecting between different typing game modes:
 * - Normal Mode: Standard typing challenge with common words
 * - Explicit Mode: Contains explicit language for the Tourette's challenge
 * - Quotes: Typing quotes from famous authors
 * 
 * Props:
 * - gameMode: Current selected game mode
 * - handleModeChange: Function to handle mode change
 * - isDisabled: Whether mode switching is disabled (during active test)
 * - theme: Current theme colors
 */
import React from 'react';
import { GameMode } from '../TypingTest';
import { ThemeColors } from '../../contexts/ThemeContext';

interface GameModeSelectorProps {
  gameMode: GameMode;
  handleModeChange: (mode: GameMode) => void;
  isDisabled: boolean;
  theme: ThemeColors;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ 
  gameMode, 
  handleModeChange, 
  isDisabled,
  theme
}) => {
  return (
    <div className={`${theme.cardBg} rounded-lg shadow-md p-3 mb-12 flex flex-wrap justify-center gap-2 w-full`}>
      <button
        onClick={() => handleModeChange("normal")}
        className={`px-4 py-2 rounded-md transition ${
          gameMode === "normal"
            ? "bg-blue-600 text-white"
            : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isDisabled}
      >
        Normal Mode
      </button>
      <button
        onClick={() => handleModeChange("explicit")}
        className={`px-4 py-2 rounded-md transition ${
          gameMode === "explicit"
            ? "bg-blue-600 text-white"
            : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isDisabled}
      >
        Explicit Mode
      </button>
      <button
        onClick={() => handleModeChange("quotes")}
        className={`px-4 py-2 rounded-md transition ${
          gameMode === "quotes"
            ? "bg-blue-600 text-white"
            : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
        } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isDisabled}
      >
        Quotes
      </button>
    </div>
  );
};

export default GameModeSelector;
