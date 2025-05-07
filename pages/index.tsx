import React from "react";
import {
  getRandomExplicitSentence,
  getRandomNormalSentence,
  getRandomParagraph
} from "../data/sentences";
import Header from "../components/Header";
import TypingTest, { GameMode } from "../components/TypingTest";
import { useTheme } from "../contexts/ThemeContext";

export default function TypingChallenge() {
  const { theme } = useTheme();
  const [gameMode, setGameMode] = React.useState<GameMode>("normal");
  const [isTestRunning, setIsTestRunning] = React.useState(false);

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
  };

  // This will be called from TypingTest component to update test status
  const handleTestStatusChange = (isRunning: boolean) => {
    setIsTestRunning(isRunning);
  };

  return (
    <div className={`${theme.mainBg} flex flex-col min-h-screen transition-all duration-500 ease-in-out`}>
      <Header 
        currentPage="home" 
        gameMode={gameMode}
        onModeChange={handleModeChange}
        isModeDisabled={isTestRunning}
      />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-4xl py-8">
          <TypingTest 
            gameMode={gameMode}
            onGameModeChange={handleModeChange}
            onTestStatusChange={handleTestStatusChange}
          />
        </div>
        <footer className={`mt-auto pt-12 ${theme.textColor} text-center text-sm opacity-80 max-w-2xl mx-auto px-4`}>
          <p>
            Warning: This typing test contains strong language, particularly in Explicit mode.
          </p>
          <p>
            This project is made by William Joffe and is meant for educational purposes only.
          </p>
        </footer>
      </main>
    </div>
  );
}
