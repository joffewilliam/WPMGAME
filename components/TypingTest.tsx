/**
 * TypingTest Component
 * 
 * Core component that manages the typing test functionality:
 * - Handles multiple game modes (normal, explicit, paragraphs)
 * - Tracks typing metrics (WPM, accuracy, errors)
 * - Manages test timing and state
 * - Collects performance data for results display
 */
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { calculateWPM } from "../utils/calculations";
import TextDisplay from "./typing/TextDisplay";
import ResultsPanel from "./typing/ResultsPanel";
import StatsDisplay from "./typing/StatsDisplay";
import {
  getRandomNormalSentence,
  getRandomExplicitSentence,
  getRandomParagraph
} from "../data/sentences";
import type { ParagraphQuote } from "../data/quotes";

export type GameMode = "explicit" | "normal" | "quotes";

export type DataPoint = {
  second: number;
  wpm: number;
  accuracy: number;
  errors: number;
};

type TypingTestProps = {
  gameMode?: GameMode;
  onGameModeChange?: (mode: GameMode) => void;
  onTestStatusChange?: (isRunning: boolean) => void;
};

const NORMAL_WORD_COUNTS = [25, 50, 100];
const TEST_TIMES = [15, 30, 45, 60];

const TypingTest: React.FC<TypingTestProps> = ({ 
  gameMode: externalGameMode, 
  onGameModeChange,
  onTestStatusChange 
}) => {
  const [gameMode, setGameMode] = useState<GameMode>(externalGameMode || "normal");
  const [normalWordCount, setNormalWordCount] = useState<number>(25);
  const [normalText, setNormalText] = useState<string>("");
  const [normalTextOffset, setNormalTextOffset] = useState<number>(0);

  const [paragraphQuotes, setParagraphQuotes] = useState<ParagraphQuote[]>([]);
  const [paragraphText, setParagraphText] = useState<string>("");
  const [paragraphAuthors, setParagraphAuthors] = useState<string[]>([]);
  const [currentParagraphIdx, setCurrentParagraphIdx] = useState<number>(0);

  const [sentence, setSentence] = useState<string>("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [testTime, setTestTime] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState(testTime);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [typingData, setTypingData] = useState<DataPoint[]>([]);
  const [errors, setErrors] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);

  const { theme } = useTheme();

  // Reset all state to initial values (helper)
  const resetAll = React.useCallback(() => {
    setUserInput("");
    setStartTime(null);
    setTimeLeft(testTime);
    setTotalCharsTyped(0);
    setIsFinished(false);
    setErrors(0);
    setCorrectChars(0);

    if (gameMode === "normal") {
      const text = getRandomNormalSentence(normalWordCount);
      setNormalText(text);
      setNormalTextOffset(0);
      setSentence(text);
    } else if (gameMode === "explicit") {
      setSentence(getRandomExplicitSentence());
    } else if (gameMode === "quotes") {
      const quotes: ParagraphQuote[] = [getRandomParagraph(), getRandomParagraph(), getRandomParagraph()];
      setParagraphQuotes(quotes);
      setParagraphAuthors(quotes.map(q => q.author));
      const text = quotes.map(q => q.text).join(" ");
      setParagraphText(text);
      setSentence(text);
      setCurrentParagraphIdx(0);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameMode, normalWordCount, testTime]);

  // Reset when mode, word count, or test time changes
  useEffect(() => {
    resetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameMode, normalWordCount, testTime]);

  useEffect(() => {
    if (!startTime || isFinished) return;

    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, startTime, isFinished]);

  useEffect(() => {
    if (!startTime || isFinished) return;
    
    // Calculate tracking interval based on test time
    // For shorter tests, we need more frequent data points
    const trackingFrequency = testTime <= 15 ? 250 : testTime <= 30 ? 500 : 1000;
    
    const trackInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000 * 1000) / 1000; // More precise timing
      const totalChars = userInput.length;
      const wpm = calculateWPM(totalCharsTyped + totalChars, elapsed);
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
      
      setTypingData(prevData => [
        ...prevData,
        { 
          second: elapsed, 
          wpm, 
          accuracy, 
          errors 
        }
      ]);
    }, trackingFrequency);
    
    return () => clearInterval(trackInterval);
  }, [startTime, isFinished, userInput.length, totalCharsTyped, correctChars, errors, testTime]);

  // Update parent component when test status changes
  useEffect(() => {
    if (onTestStatusChange) {
      onTestStatusChange(startTime !== null && !isFinished);
    }
  }, [startTime, isFinished, onTestStatusChange]);

  // Sync with external game mode if provided
  useEffect(() => {
    if (externalGameMode && externalGameMode !== gameMode) {
      setGameMode(externalGameMode as GameMode);
    }
  }, [externalGameMode, gameMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
      setTypingData([]);
      setErrors(0);
      setCorrectChars(0);
    }

    if (value.length > sentence.length) return;

    if (value.length > userInput.length) {
      const newChar = value[value.length - 1];
      const expectedChar = sentence[value.length - 1];

      if (newChar === expectedChar) {
        setCorrectChars(prev => prev + 1);
      } else {
        setErrors(prev => prev + 1);
      }
    }

    setUserInput(value);

    if (gameMode === "normal" && value.length === sentence.length) {
      setTotalCharsTyped((prev) => prev + sentence.length);
      setUserInput("");
      const newText = getRandomNormalSentence(normalWordCount);
      setNormalText(prev => prev + " " + newText);
      setSentence(prev => prev + " " + newText);
    }

    if (gameMode === "explicit" && value.length === sentence.length) {
      setTotalCharsTyped((prev) => prev + sentence.length);
      setUserInput("");
      const newText = getRandomExplicitSentence();
      setSentence(newText);
    }

    if (gameMode === "quotes") {
      let quoteBoundaries: number[] = [];
      let idx = 0;
      for (const q of paragraphQuotes) {
        quoteBoundaries.push(idx);
        idx += q.text.length + 1;
      }
      
      // When completing the first paragraph and moving to the next
      if (
        value.length > 0 &&
        value.length >= (paragraphQuotes[0].text.length + 1)
      ) {
        // Calculate how many characters of the first paragraph were correct
        let firstParaCorrectChars = 0;
        for (let i = 0; i < paragraphQuotes[0].text.length; i++) {
          if (i < value.length && value[i] === paragraphQuotes[0].text[i]) {
            firstParaCorrectChars++;
          }
        }
        
        // Add the characters from completed paragraph to total count
        const charsCompleted = paragraphQuotes[0].text.length + 1; // +1 for space
        setTotalCharsTyped(prev => prev + charsCompleted);
        
        // Adjust correctChars count - keep existing correct chars but subtract what was in first paragraph
        // and add how many were correct in first paragraph
        setCorrectChars(prev => {
          const remainingCorrectChars = Math.max(0, prev - paragraphQuotes[0].text.length);
          return remainingCorrectChars + firstParaCorrectChars;
        });

        const newQuote = getRandomParagraph();
        const newQuotes = [...paragraphQuotes.slice(1), newQuote];
        setParagraphQuotes(newQuotes);
        setParagraphAuthors(newQuotes.map(q => q.author));
        const newText = newQuotes.map(q => q.text).join(" ");
        setParagraphText(newText);
        setSentence(newText);
        
        // Adjust userInput to remove completed paragraph
        setUserInput(value.slice(paragraphQuotes[0].text.length + 1));
        setCurrentParagraphIdx((prev) => (prev + 1) % 3);
        
        // Ensure we continue tracking metrics during paragraph transitions
        const elapsed = Math.floor((Date.now() - startTime!) / 1000);
        const wpm = calculateWPM(totalCharsTyped + charsCompleted, elapsed);
        const updatedAccuracy = (correctChars + firstParaCorrectChars) / (totalCharsTyped + charsCompleted) * 100;
        
        // Add a data point for this transition to ensure graph data
        setTypingData(prevData => [
          ...prevData,
          { 
            second: elapsed, 
            wpm, 
            accuracy: Math.round(updatedAccuracy), 
            errors 
          }
        ]);
      }
      
      // When completing all quotes
      if (value.length === sentence.length) {
        setTotalCharsTyped((prev) => prev + sentence.length);
        setUserInput("");
        const quotes: ParagraphQuote[] = [getRandomParagraph(), getRandomParagraph(), getRandomParagraph()];
        setParagraphQuotes(quotes);
        setParagraphAuthors(quotes.map(q => q.author));
        const text = quotes.map(q => q.text).join(" ");
        setParagraphText(text);
        setSentence(text);
        setCurrentParagraphIdx(0);
      }
    }
  };

  const wpm = isFinished && startTime
    ? calculateWPM(totalCharsTyped + userInput.length, testTime - timeLeft)
    : null;

  const handleRestart = resetAll;

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    if (onGameModeChange) {
      onGameModeChange(mode);
    }
    // resetAll will be called by useEffect
  };

  const renderWordCountSelector = () => (
    <div className="flex justify-center mb-6 gap-2">
      {NORMAL_WORD_COUNTS.map(count => (
        <button
          key={count}
          onClick={() => setNormalWordCount(count)}
          className={`px-3 py-1 rounded-md border transition ${
            normalWordCount === count
              ? "bg-blue-600 text-white"
              : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
          }`}
          disabled={gameMode !== "normal"}
        >
          {count} words
        </button>
      ))}
    </div>
  );

  const renderTimeSelector = () => (
    <div className="flex justify-center mb-4 gap-2">
      {TEST_TIMES.map(sec => (
        <button
          key={sec}
          onClick={() => setTestTime(sec)}
          className={`px-3 py-1 rounded-md border transition ${
            testTime === sec
              ? "bg-blue-600 text-white"
              : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
          }`}
          disabled={startTime !== null && !isFinished}
        >
          {sec}s
        </button>
      ))}
    </div>
  );

  const renderParagraphAuthor = () => {
    if (gameMode === "quotes" && paragraphQuotes.length > 0) {
      let idx = 0;
      let acc = 0;
      for (let i = 0; i < paragraphQuotes.length; i++) {
        acc += paragraphQuotes[i].text.length + 1;
        if (userInput.length < acc) {
          idx = i;
          break;
        }
      }
      return (
        <div className="mt-4 text-right w-full max-w-3xl mx-auto">
          <span className={`italic text-base font-medium opacity-80 ${theme.textColor}`}>
            {paragraphQuotes[idx]?.author}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={theme.mainBg}>
      <section className="max-w-4xl w-full transition-all duration-300 ease-in-out flex flex-col items-center mx-auto px-4">
        {/* Time selector */}
        {renderTimeSelector()}

        {gameMode === "normal" && renderWordCountSelector()}

        {sentence ? (
          <>
            <div className="w-full mb-12 text-center select-none">
              <TextDisplay 
                sentence={sentence} 
                userInput={userInput} 
                theme={theme} 
              />
            </div>
            
            {renderParagraphAuthor()}
            
            <input
              ref={inputRef}
              type="text"
              className="opacity-0 absolute top-0 left-0 h-1 w-1"
              value={userInput}
              onChange={handleChange}
              disabled={isFinished}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label="Typing test input"
              title="Typing test input"
            />
            
            <StatsDisplay 
              timeLeft={timeLeft}
              totalCharsTyped={totalCharsTyped}
              userInputLength={userInput.length}
              theme={theme}
            />
            
            {isFinished && wpm !== null ? (
              <ResultsPanel 
                wpm={wpm}
                typingData={typingData}
                handleRestart={handleRestart}
                theme={theme}
              />
            ) : (
                {/* Mode switcher / game controls could go here if needed */}
            )}
            {/* Reset button at the bottom */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleRestart}
                className={`flex items-center gap-2 px-4 py-2 rounded-full shadow transition ${theme.buttonBg} ${theme.buttonText} hover:opacity-80`}
                aria-label="Reset typing test"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4V1m0 0L8 5m4-4l4 4M4.93 4.93a10 10 0 1014.14 0M1 12h3m16 0h3" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <p className={`text-center ${theme.textColor} text-lg`}>Loading challenge...</p>
        )}

        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => inputRef.current?.focus()}
          aria-hidden="true"
        ></div>
      </section>
    </div>
  );
};

export default TypingTest;
