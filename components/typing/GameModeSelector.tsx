/**
 * GameModeSelector Component
 * 
 * Provides UI for selecting between different typing game modes:
 * - Normal Mode: Standard typing challenge with common words (25, 50, 75, 100 words)
 * - Gamer Mode: Competitive chat-style challenge (25, 50, 75, 100 words)
 * - Quotes: Typing quotes from famous authors (3, 6, 9, 12 quotes)
 * - Text Style: Toggle between random words and coherent sentences
 * 
 * Props:
 * - gameMode: Current selected game mode
 * - wordCount: Current word count for normal/gamer modes
 * - quoteCount: Current quote count for quotes mode
 * - handleModeChange: Function to handle mode change
 * - handleWordCountChange: Function to handle word count change
 * - handleQuoteCountChange: Function to handle quote count change
 * - isDisabled: Whether mode switching is disabled (during active test)
 * - theme: Current theme colors
 */
import React from 'react';
import { GameMode } from '../TypingTest';
import { ThemeColors } from '../../contexts/ThemeContext';
import { GamerGame, SentenceStyle } from '../../data/sentences';

interface GameModeSelectorProps {
  gameMode: GameMode;
  wordCount: number;
  quoteCount: number;
  sentenceStyle: SentenceStyle;
  selectedGame: GamerGame;
  gameOptions: { key: GamerGame; label: string }[];
  handleModeChange: (mode: GameMode) => void;
  handleSentenceStyleChange: (style: SentenceStyle) => void;
  handleGameChange: (game: GamerGame) => void;
  handleWordCountChange: (count: number) => void;
  handleQuoteCountChange: (count: number) => void;
  isDisabled: boolean;
  theme: ThemeColors;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ 
  gameMode, 
  wordCount,
  quoteCount,
  sentenceStyle,
  selectedGame,
  gameOptions,
  handleModeChange, 
  handleSentenceStyleChange,
  handleGameChange,
  handleWordCountChange,
  handleQuoteCountChange,
  isDisabled,
  theme
}) => {
  const wordOptions = [25, 50, 75, 100];
  const quoteOptions = [3, 6, 9, 12];

  return (
    <div className={`${theme.cardBg} rounded-lg shadow-md p-4 mb-12 w-full`}>
      {/* Game Mode Selection */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
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
          onClick={() => handleModeChange("gamer")}
          className={`px-4 py-2 rounded-md transition ${
            gameMode === "gamer"
              ? "bg-blue-600 text-white"
              : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isDisabled}
        >
          Gamer Mode
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

      {gameMode !== "quotes" && (
        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          <span className={`${theme.textColor} text-sm mr-1 flex items-center`}>Text:</span>
          <button
            onClick={() => handleSentenceStyleChange("words")}
            className={`px-3 py-1 rounded-md text-sm transition ${
              sentenceStyle === "words"
                ? "bg-indigo-600 text-white"
                : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
            } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isDisabled}
          >
            Words
          </button>
          <button
            onClick={() => handleSentenceStyleChange("sentences")}
            className={`px-3 py-1 rounded-md text-sm transition ${
              sentenceStyle === "sentences"
                ? "bg-indigo-600 text-white"
                : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
            } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isDisabled}
          >
            Sentences
          </button>
        </div>
      )}

      {gameMode === "gamer" && (
        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          <span className={`${theme.textColor} text-sm mr-1 flex items-center`}>Game:</span>
          {gameOptions.map((game) => (
            <button
              key={game.key}
              onClick={() => handleGameChange(game.key)}
              className={`px-3 py-1 rounded-md text-sm transition ${
                selectedGame === game.key
                  ? "bg-emerald-600 text-white"
                  : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
              } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isDisabled}
            >
              {game.label}
            </button>
          ))}
        </div>
      )}

      {/* Word/Quote Count Selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {gameMode === "quotes" ? (
          <>
            <span className={`${theme.textColor} text-sm mr-2 flex items-center`}>Quotes:</span>
            {quoteOptions.map((count) => (
              <button
                key={count}
                onClick={() => handleQuoteCountChange(count)}
                className={`px-3 py-1 rounded-md text-sm transition ${
                  quoteCount === count
                    ? "bg-green-600 text-white"
                    : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isDisabled}
              >
                {count}
              </button>
            ))}
          </>
        ) : (
          <>
            <span className={`${theme.textColor} text-sm mr-2 flex items-center`}>Words:</span>
            {wordOptions.map((count) => (
              <button
                key={count}
                onClick={() => handleWordCountChange(count)}
                className={`px-3 py-1 rounded-md text-sm transition ${
                  wordCount === count
                    ? "bg-green-600 text-white"
                    : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isDisabled}
              >
                {count}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GameModeSelector;
