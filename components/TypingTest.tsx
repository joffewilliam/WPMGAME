/**
 * TypingTest Component
 * 
 * Core component that manages the typing test functionality:
 * - Handles multiple game modes (normal, explicit, paragraphs)
 * - Tracks typing metrics (WPM, accuracy, errors)
 * - Manages test timing and state
 * - Collects performance data for results display
 */
import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { calculateWPM, calculateAccuracy } from "../utils/calculations";
import TextDisplay from "./typing/TextDisplay";
import ResultsPanel from "./typing/ResultsPanel";
import StatsDisplay from "./typing/StatsDisplay";
import GameModeSelector from "./typing/GameModeSelector";
import {
  getRandomNormalSentence,
  getRandomExplicitSentence,
  getRandomParagraph
} from "../data/sentences";
import type { ParagraphQuote } from "../data/quotes";

export type GameMode = "explicit" | "normal" | "quotes";
export type DataPoint = { second: number; wpm: number; accuracy: number; errors: number; };

type TypingTestProps = {
  gameMode?: GameMode;
  onGameModeChange?: (mode: GameMode) => void;
  onTestStatusChange?: (isRunning: boolean) => void;
};

const TypingTest: React.FC<TypingTestProps> = ({ 
  gameMode: externalGameMode, 
  onGameModeChange,
  onTestStatusChange 
}) => {
  const { theme } = useTheme();
  const [gameMode, setGameMode] = useState<GameMode>(externalGameMode || "normal");
  const [wordCount, setWordCount] = useState<number>(25);
  const [quoteCount, setQuoteCount] = useState<number>(3);
  const [userInput, setUserInput] = useState("");
  const [sentence, setSentence] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  // Timing and stats
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [typingData, setTypingData] = useState<DataPoint[]>([]);

  // Start timer on first input
  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
  }, [userInput, startTime]);

  // Track typing data every second (for graph)
  useEffect(() => {
    if (!startTime || isFinished) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      const correctChars = userInput.split('').filter((c, i) => c === sentence[i]).length;
      const errors = userInput.length - correctChars;
      setTypingData((prev) => ({
        ...prev,
        [
          Math.floor(elapsed)
        ]: {
          second: Math.floor(elapsed),
          wpm: calculateWPM(userInput.length, elapsed),
          accuracy: calculateAccuracy(correctChars, errors),
          errors: errors,
        }
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime, userInput, isFinished, sentence]);

  // Detect completion
  useEffect(() => {
    if (userInput.length > 0 && userInput.length >= sentence.length) {
      setIsFinished(true);
      setEndTime(Date.now());
    } else {
      setIsFinished(false);
      setEndTime(null);
    }
  }, [userInput, sentence]);

  // Calculate stats for results
  const elapsedTime = startTime && endTime ? (endTime - startTime) / 1000 : 0;
  const correctChars = userInput.split('').filter((c, i) => c === sentence[i]).length;
  const errors = userInput.length - correctChars;
  const wpm = calculateWPM(userInput.length, elapsedTime);
  const accuracy = calculateAccuracy(correctChars, errors);
  const totalCharsTyped = userInput.length;

  // Restart handler
  const handleRestart = () => {
    setUserInput("");
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
    setTypingData([]);
    // Regenerate sentence
    if (gameMode === "normal") {
      setSentence(getRandomNormalSentence(wordCount));
    } else if (gameMode === "explicit") {
      setSentence(getRandomExplicitSentence(wordCount));
    } else {
      setSentence(getRandomParagraph() as unknown as string);
    }
  };

  // Listen for keydown events globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length === 1) {
        setUserInput((prev) => prev + e.key);
      } else if (e.key === "Backspace") {
        setUserInput((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Generate sentence on mount or when mode/wordCount/quoteCount changes
  useEffect(() => {
    if (gameMode === "normal") {
      setSentence(getRandomNormalSentence(wordCount));
    } else if (gameMode === "explicit") {
      setSentence(getRandomExplicitSentence(wordCount));
    } else {
      setSentence(getRandomParagraph() as unknown as string);
    }
    setUserInput("");
  }, [gameMode, wordCount, quoteCount]);

  // Add a final data point when finished
  useEffect(() => {
    if (isFinished && startTime && endTime) {
      const elapsed = (endTime - startTime) / 1000;
      const correctChars = userInput.split('').filter((c, i) => c === sentence[i]).length;
      const errors = userInput.length - correctChars;
      setTypingData((prev) => ({
        ...prev,
        [
          Math.ceil(elapsed)
        ]: {
          second: Math.ceil(elapsed),
          wpm: calculateWPM(userInput.length, elapsed),
          accuracy: calculateAccuracy(correctChars, errors),
          errors: errors,
        }
      }));
    }
  }, [isFinished, startTime, endTime, userInput, sentence]);

  // Add a data point on every keystroke
  useEffect(() => {
    if (!startTime || isFinished) return;
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    const correctChars = userInput.split('').filter((c, i) => c === sentence[i]).length;
    const errors = userInput.length - correctChars;
    setTypingData((prev) => ({
      ...prev,
      [
        Math.ceil(elapsed)
      ]: {
        second: Math.ceil(elapsed),
        wpm: calculateWPM(userInput.length, elapsed),
        accuracy: calculateAccuracy(correctChars, errors),
        errors: errors,
      }
    }));
    // eslint-disable-next-line
  }, [userInput]);

  return (
    <div className="typing-test">
      <GameModeSelector
        gameMode={gameMode}
        wordCount={wordCount}
        quoteCount={quoteCount}
        handleModeChange={(mode) => {
          setGameMode(mode);
          onGameModeChange && onGameModeChange(mode);
        }}
        handleWordCountChange={setWordCount}
        handleQuoteCountChange={setQuoteCount}
        isDisabled={false}
        theme={theme}
      />
      {isFinished ? (
        <ResultsPanel
          wpm={wpm}
          accuracy={accuracy}
          errors={errors}
          onRestart={handleRestart}
          typingData={typingData}
          elapsedTime={elapsedTime}
          totalCharsTyped={totalCharsTyped}
          theme={theme}
        />
      ) : (
        <TextDisplay
          sentence={sentence}
          userInput={userInput}
          gameMode={gameMode}
          normalText={sentence}
          normalTextOffset={0}
          paragraphText={""}
          currentParagraphIdx={0}
          paragraphAuthors={[]}
          isFinished={isFinished}
          onTextClick={() => {}}
          isActivelyTyping={true}
          theme={theme}
        />
      )}
      {/* No input box rendered */}
    </div>
  );
};

export default TypingTest;
