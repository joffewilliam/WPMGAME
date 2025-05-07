/**
 * TextDisplay Component
 * 
 * Renders the typing text with visual feedback including:
 * - Character-by-character coloring based on typing accuracy
 * - Animated caret indicating current typing position
 * - Support for word wrapping and space characters
 */
import React from 'react';
import { ThemeColors } from '../../contexts/ThemeContext';

interface TextDisplayProps {
  sentence: string;
  userInput: string;
  theme: ThemeColors;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ sentence, userInput, theme }) => {
  // Break the sentence into words first
  const words = sentence.split(" ");
  let charCount = 0;
  
  // Only show the initial caret if there's no input yet
  if (userInput.length === 0) {
    return (
      <p className="text-2xl sm:text-3xl leading-relaxed tracking-wide text-center mx-auto max-w-3xl">
        <span className={`inline-block h-6 w-0.5 ${theme.caretColor} -ml-1 animate-pulse`}></span>
        {words.map((word, wordIdx) => {
          // Process each character in the word
          const characters = word.split("").map((char, charIdx) => {
            return (
              <span key={`${wordIdx}-${charIdx}`} className={`${theme.textColor} font-mono`}>
                {char}
              </span>
            );
          });
          
          // Add a space after each word except the last one
          return (
            <span key={wordIdx} className="whitespace-normal inline-flex flex-wrap">
              {characters}
              {wordIdx < words.length - 1 && (
                <span className={theme.textColor}>&nbsp;</span>
              )}
            </span>
          );
        })}
      </p>
    );
  }
  
  // Regular rendering with caret at current position
  return (
    <p className="text-2xl sm:text-3xl leading-relaxed tracking-wide text-center mx-auto max-w-3xl">
      {words.map((word, wordIdx) => {
        // Process each character in the word
        const characters = word.split("").map((char, charIdx) => {
          const currentCharIndex = charCount + charIdx;
          
          let colorClass = theme.textColor; // Default color for untyped chars
          if (currentCharIndex < userInput.length) {
            colorClass = userInput[currentCharIndex] === char
              ? theme.successColor // Correctly typed
              : theme.errorColor; // Incorrectly typed
          }
          
          // Add caret for the current character position (only if not at the end of all text)
          const isCurrentChar = currentCharIndex === userInput.length && userInput.length < sentence.length;
          
          return (
            <span key={`${wordIdx}-${charIdx}`} className={`${colorClass} font-mono transition-colors duration-100 relative`}>
              {char}
              {isCurrentChar && (
                <span
                  className={`absolute h-5/6 w-0.5 ${theme.caretColor} animate-pulse caret-pos`}
                ></span>
              )}
            </span>
          );
        });
        
        // Update character count for the next word
        charCount += word.length;
        
        // Add a space after each word except the last one
        return (
          <span key={wordIdx} className="whitespace-normal inline-flex flex-wrap">
            {characters}
            {wordIdx < words.length - 1 && (
              <span 
                className={`${charCount < userInput.length 
                  ? (userInput[charCount] === ' ' ? theme.successColor : theme.errorColor)
                  : theme.textColor} relative`}
              >
                &nbsp;
                {charCount === userInput.length && userInput.length < sentence.length && (
                  <span
                    className={`absolute h-5/6 w-0.5 ${theme.caretColor} animate-pulse caret-pos-space`}
                  ></span>
                )}
              </span>
            )}
            {/* Update character count to include the space */}
            {wordIdx < words.length - 1 && (charCount++, null)}
          </span>
        );
      })}
    </p>
  );
};

export default TextDisplay;
