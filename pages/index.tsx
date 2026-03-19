import React from "react";
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

  // Add a click handler to ensure input stays focused
  const handleContainerClick = (e: React.MouseEvent) => {
    // Don't interfere with button clicks or other interactive elements
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }
    // The TypingTest component will handle focusing its input
  };
  return (
    <div 
      className={`${theme.mainBg} flex flex-col min-h-screen transition-all duration-500 ease-in-out`}
      onClick={handleContainerClick}
    >      <Header 
        currentPage="home" 
      />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-4xl py-8">
          <TypingTest 
            gameMode={gameMode}
            onGameModeChange={handleModeChange}
            onTestStatusChange={handleTestStatusChange}
          />
        </div>
      </main>
    </div>
  );
}
