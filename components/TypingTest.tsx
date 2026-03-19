/**
 * TypingTest Component
 * 
 * Core component that manages the typing test functionality:
 * - Handles multiple game modes (normal, gamer, paragraphs)
 * - Tracks typing metrics (WPM, accuracy, errors)
 * - Manages test timing and state
 * - Collects performance data for results display
 * - Supports words/sentences text style toggles
 */
import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { calculateWPM, calculateAccuracy } from "../utils/calculations";
import TextDisplay from "./typing/TextDisplay";
import ResultsPanel from "./typing/ResultsPanel";
import StatsDisplay from "./typing/StatsDisplay";
import GameModeSelector from "./typing/GameModeSelector";
import {
  GamerGame,
  SentenceStyle,
  getRandomGameWordSentence,
  gamerGameOptions,
  getGamerChatSentence,
  getNormalChatSentence,
  getRandomNormalSentence,
  getRandomParagraph
} from "../data/sentences";

export type GameMode = "gamer" | "normal" | "quotes";
export type DataPoint = { second: number; wpm: number; accuracy: number; errors: number; };

const upsertDataPoint = (prev: DataPoint[], point: DataPoint): DataPoint[] => {
  const next = [...prev];
  const existingIndex = next.findIndex((entry) => entry.second === point.second);

  if (existingIndex >= 0) {
    next[existingIndex] = point;
  } else {
    next.push(point);
  }

  return next.sort((a, b) => a.second - b.second);
};

const generateQuotesText = (quoteCount: number): string => {
  return Array.from({ length: quoteCount }, () => getRandomParagraph().text).join(" ");
};

const applyCapitalization = (text: string, shouldCapitalize: boolean): string => {
  return shouldCapitalize ? text : text.toLowerCase();
};

const MAX_RECENT_SENTENCES = 18;

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
  const { theme, capitalization } = useTheme();
  const [gameMode, setGameMode] = useState<GameMode>(externalGameMode || "normal");
  const [sentenceStyle, setSentenceStyle] = useState<SentenceStyle>("sentences");
  const [selectedGame, setSelectedGame] = useState<GamerGame>("counter_strike");
  const [wordCount, setWordCount] = useState<number>(25);
  const [quoteCount, setQuoteCount] = useState<number>(3);
  const [userInput, setUserInput] = useState("");
  const [sentence, setSentence] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  // Timing and stats
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [typingData, setTypingData] = useState<DataPoint[]>([]);
  const recentSentenceMapRef = useRef<Record<string, string[]>>({});

  const shouldCapitalizeForMode = (mode: GameMode): boolean => {
    if (!capitalization.enabled) {
      return false;
    }

    return capitalization.modes[mode];
  };

  const getHistoryKey = (mode: GameMode): string => {
    if (mode !== "gamer") {
      return `${mode}:${sentenceStyle}`;
    }

    return `${mode}:${selectedGame}:${sentenceStyle}`;
  };

  const withAntiRepeat = (key: string, createCandidate: () => string): string => {
    const recent = recentSentenceMapRef.current[key] || [];
    let candidate = createCandidate();
    let attempts = 0;

    while (recent.includes(candidate) && attempts < 25) {
      candidate = createCandidate();
      attempts += 1;
    }

    const next = [...recent, candidate].slice(-MAX_RECENT_SENTENCES);
    recentSentenceMapRef.current[key] = next;
    return candidate;
  };

  const generateModeText = (mode: GameMode): string => {
    const historyKey = getHistoryKey(mode);
    if (mode === "quotes") {
      return withAntiRepeat(historyKey, () =>
        applyCapitalization(generateQuotesText(quoteCount), shouldCapitalizeForMode("quotes"))
      );
    }

    const shouldCapitalize = shouldCapitalizeForMode(mode);
    if (mode === "normal") {
      return withAntiRepeat(historyKey, () =>
        sentenceStyle === "sentences"
          ? getNormalChatSentence(shouldCapitalize)
          : getRandomNormalSentence(wordCount, shouldCapitalize)
      );
    }

    return withAntiRepeat(historyKey, () =>
      sentenceStyle === "sentences"
        ? getGamerChatSentence(selectedGame, shouldCapitalize)
        : getRandomGameWordSentence(selectedGame, wordCount, 0.7, shouldCapitalize)
    );
  };

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
      const second = Math.floor(elapsed);
      setTypingData((prev) =>
        upsertDataPoint(prev, {
          second,
          wpm: calculateWPM(userInput.length, elapsed),
          accuracy: calculateAccuracy(correctChars, errors),
          errors,
        })
      );
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

  // Notify parent when test starts/stops.
  useEffect(() => {
    onTestStatusChange?.(Boolean(startTime) && !isFinished);
  }, [onTestStatusChange, startTime, isFinished]);

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
    setSentence(generateModeText(gameMode));
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
    setSentence(generateModeText(gameMode));
    setUserInput("");
  }, [gameMode, wordCount, quoteCount, capitalization, sentenceStyle, selectedGame]);

  // Add a final data point when finished
  useEffect(() => {
    if (isFinished && startTime && endTime) {
      const elapsed = (endTime - startTime) / 1000;
      const correctChars = userInput.split('').filter((c, i) => c === sentence[i]).length;
      const errors = userInput.length - correctChars;
      const second = Math.ceil(elapsed);
      setTypingData((prev) =>
        upsertDataPoint(prev, {
          second,
          wpm: calculateWPM(userInput.length, elapsed),
          accuracy: calculateAccuracy(correctChars, errors),
          errors,
        })
      );
    }
  }, [isFinished, startTime, endTime, userInput, sentence]);

  // Add a data point on every keystroke
  useEffect(() => {
    if (!startTime || isFinished) return;
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    const correctChars = userInput.split('').filter((c, i) => c === sentence[i]).length;
    const errors = userInput.length - correctChars;
    const second = Math.ceil(elapsed);
    setTypingData((prev) =>
      upsertDataPoint(prev, {
        second,
        wpm: calculateWPM(userInput.length, elapsed),
        accuracy: calculateAccuracy(correctChars, errors),
        errors,
      })
    );
    // eslint-disable-next-line
  }, [userInput]);

  return (
    <div className="typing-test">
      <GameModeSelector
        gameMode={gameMode}
        wordCount={wordCount}
        quoteCount={quoteCount}
        sentenceStyle={sentenceStyle}
        selectedGame={selectedGame}
        gameOptions={gamerGameOptions}
        handleModeChange={(mode) => {
          setGameMode(mode);
          onGameModeChange && onGameModeChange(mode);
        }}
        handleSentenceStyleChange={setSentenceStyle}
        handleGameChange={setSelectedGame}
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
        <div
          className={`w-full rounded-lg transition-all duration-300 ${
            gameMode === "gamer"
              ? `${theme.cardBg} p-5 md:p-8 min-h-[230px] md:min-h-[300px]`
              : "min-h-[170px]"
          }`}
        >
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
        </div>
      )}
      {/* No input box rendered */}
    </div>
  );
};

export default TypingTest;
