/**
 * Settings Component
 * 
 * Modal component that allows users to configure:
 * - Light/dark/system theme mode
 * - Theme randomization options
 * - Visual theme selection from available options
 * 
 * Props:
 * - onClose: Function to handle closing the settings modal
 */
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

type SettingsProps = {
  onClose: () => void;
};

const themes = [
  { name: 'dino', label: 'Dino' },
  { name: 'magic_girl', label: 'Magic Girl' },
  { name: 'milkshake', label: 'Milkshake' },
  { name: 'modern_ink', label: 'Modern Ink' },
  { name: 'ms_cupcakes', label: 'Ms Cupcakes' },
  { name: 'sewing_tin_light', label: 'Sewing Tin Light' },
  { name: 'lilac_mist', label: 'Lilac Mist' },
  { name: 'rose_pine_dawn', label: 'Rose Pine Dawn' },
  { name: 'soaring_skies', label: 'Soaring Skies' },
  { name: 'rainbow_trail', label: 'Rainbow Trail' },
  { name: 'dark', label: 'Dark (Default)' },
  { name: 'nord_light', label: 'Nord Light' }
];

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { theme, setTheme, themeMode, setThemeMode } = useTheme();
  const [randomizeSetting, setRandomizeSetting] = useState<'off' | 'on' | 'favorite' | 'light' | 'dark' | 'custom'>('off');

  const handleRandomizeChange = (setting: 'off' | 'on' | 'favorite' | 'light' | 'dark' | 'custom') => {
    setRandomizeSetting(setting);
    // In a real app, this would save to localStorage or similar
  };

  return (
    <div className={`${theme.cardBg} ${theme.textColor} rounded-lg shadow-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close settings"
          title="Close settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Theme</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setThemeMode('light')}
            className={`px-4 py-2 rounded-md transition ${
              themeMode === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setThemeMode('dark')}
            className={`px-4 py-2 rounded-md transition ${
              themeMode === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setThemeMode('system')}
            className={`px-4 py-2 rounded-md transition ${
              themeMode === 'system' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            System
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Randomize Theme</h3>
        <p className="mb-3 text-sm opacity-70">After completing a test, the theme will be set to a random one.</p>
        <div className="flex flex-wrap gap-3">
          {(['off', 'on', 'favorite', 'light', 'dark', 'custom'] as const).map((option) => (
            <button
              key={option}
              onClick={() => handleRandomizeChange(option)}
              className={`px-4 py-2 rounded-md transition ${
                randomizeSetting === option 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-lg font-semibold mb-3">Select Theme</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map((themeOption) => (
            <button
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name)}
              className={`px-4 py-2 rounded-md transition text-center ${
                theme.name === themeOption.name 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {themeOption.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
