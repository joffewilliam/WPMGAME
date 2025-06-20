/**
 * TextDisplay Component
 * 
 * Renders the typing text with visual feedback including:
 * - Character-by-character coloring based on typing accuracy
 * - Animated caret indicating current typing position
 * - Support for word wrapping and space characters
 * - Different display modes based on game mode
 */
import React from 'react';
import { ThemeColors } from '../../contexts/ThemeContext';
import { GameMode } from '../TypingTest';

// Add props for game mode and related data
interface TextDisplayProps {
  sentence: string;
  userInput: string;
  gameMode: GameMode;
  normalText: string;
  normalTextOffset: number;
  paragraphText: string;
  currentParagraphIdx: number;
  paragraphAuthors: string[];
  isFinished: boolean;
  wordErrorCounts?: Record<number, number>;
  theme?: ThemeColors;
  onTextClick?: () => void; // Add click handler prop
  isActivelyTyping?: boolean; // Add typing state prop
}

const TextDisplay: React.FC<TextDisplayProps> = ({ 
  sentence, 
  userInput, 
  gameMode,
  normalText,
  normalTextOffset,
  paragraphText,
  currentParagraphIdx,
  paragraphAuthors,
  isFinished,
  theme = {
    textColor: 'text-gray-800',
    successColor: 'text-green-600',
    errorColor: 'text-red-600',
    caretColor: 'text-blue-600'
  },
  wordErrorCounts = {},
  onTextClick,
  isActivelyTyping = false
}) => {  // Get word boundaries for highlighting
  const wordBoundaries = sentence.split(' ').reduce<number[]>((acc, word, i) => {
    if (i === 0) return [0];
    const prevEnd = acc[i-1] + sentence.split(' ')[i-1].length + 1;
    return [...acc, prevEnd]; 
  }, [0]);
  // Get current word boundaries
  const getCurrentWordBounds = (position: number) => {
    let currentWordStart = 0;
    let currentWordEnd = sentence.length;
    
    // Find which word the current position belongs to
    for (let i = 0; i < wordBoundaries.length; i++) {
      const wordStart = wordBoundaries[i];
      const wordEnd = wordBoundaries[i + 1] || sentence.length;
      
      // If position is within this word (including at the end but before space)
      if (position >= wordStart && position <= wordEnd) {
        // If we're at a space position, we belong to the previous word
        if (position < sentence.length && sentence[position] === ' ') {
          currentWordStart = wordStart;
          currentWordEnd = position; // End at the space, don't include it
        } else {
          currentWordStart = wordStart;
          currentWordEnd = wordEnd;
        }
        break;
      }
    }
    
    return { start: currentWordStart, end: currentWordEnd };
  };

  const currentWordBounds = getCurrentWordBounds(userInput.length);
    // Split sentence into words, preserving spaces
  const wordRegex = /[^\s]+\s*/g;
  const words = sentence.match(wordRegex) || [];
  let charIndex = 0;
  const elements = [];
  for (let w = 0; w < words.length; w++) {
    const word = words[w];
    const wordSpans = [];
    for (let i = 0; i < word.length; i++, charIndex++) {
      // Always render a caret placeholder to reserve space
      const isActiveCaret = charIndex === userInput.length && !isFinished;
      wordSpans.push(
        <span
          key={`caret-${charIndex}`}
          className={`caret-inline${isActiveCaret ? ` ${theme.caretColor} animate-blink` : ' caret-inline-hidden'}`}
        />
      );
      const char = word[i];
      // Determine which word this character belongs to
      let wordIdx = w;
      const hasError = wordErrorCounts[wordIdx] && wordErrorCounts[wordIdx] > 0;
      if (char === ' ') {
        if (charIndex < userInput.length) {
          const correct = userInput[charIndex] === char;
          wordSpans.push(
            <span
              key={charIndex}
              className={`${correct ? theme.successColor : theme.errorColor} ${hasError ? 'bg-red-900 bg-opacity-20' : ''} inline-block w-[0.3em]`}
            >
              &nbsp;
            </span>
          );
        } else {
          wordSpans.push(
            <span key={charIndex} className="relative inline-block w-[0.3em]">
              <span className={`${theme.textColor} opacity-70`}>&nbsp;</span>
            </span>
          );
        }
      } else {
        if (charIndex < userInput.length) {
          const correct = userInput[charIndex] === char;
          wordSpans.push(
            <span
              key={charIndex}
              className={`${correct ? theme.successColor : theme.errorColor} ${hasError ? 'bg-red-900 bg-opacity-20' : ''} relative inline-block`}
            >
              {char}
            </span>
          );
        } else {
          wordSpans.push(
            <span key={charIndex} className="relative inline-block">
              <span className={`${theme.textColor} opacity-70`}>{char}</span>
            </span>
          );
        }
      }
    }
    // Wrap the word (and trailing space) in a span to prevent breaking
    elements.push(
      <span key={`word-${w}`} className="word-block">
        {wordSpans}
      </span>
    );
  }
  return (
    <div className="text-xl md:text-2xl leading-relaxed text-left font-mono cursor-text select-none text-display-block">
      {elements}
    </div>
  );
};

export default TextDisplay;
