/**
 * Settings Page
 * 
 * Provides a dedicated interface for configuring application preferences:
 * - Theme mode (light/dark/system)
 * - Theme randomization options
 * - Visual theme selection from available themes
 * 
 * All settings are persisted to localStorage for user preference retention.
 */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';

const themes = [
  { name: 'dark', label: 'Dark (Default)' },
  { name: 'nord_light', label: 'Nord Light' },
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
];

const SettingsPage = () => {
  const router = useRouter();
  const { theme, setTheme, themeMode, setThemeMode, capitalization, setCapitalization } = useTheme();
  const [randomizeSetting, setRandomizeSetting] = useState<'off' | 'on' | 'favorite' | 'light' | 'dark' | 'custom'>('off');
  const [savedSettings, setSavedSettings] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRandomize = localStorage.getItem('randomizeTheme');
      if (savedRandomize) {
        setRandomizeSetting(savedRandomize as any);
      }
    }
  }, []);

  const handleRandomizeChange = (setting: 'off' | 'on' | 'favorite' | 'light' | 'dark' | 'custom') => {
    setRandomizeSetting(setting);
    localStorage.setItem('randomizeTheme', setting);
    setSavedSettings(true);
    
    // Reset the saved notification after a delay
    setTimeout(() => {
      setSavedSettings(false);
    }, 2000);
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    localStorage.setItem('selectedTheme', themeName);
    setSavedSettings(true);
    
    // Reset the saved notification after a delay
    setTimeout(() => {
      setSavedSettings(false);
    }, 2000);
  };

  const handleThemeModeChange = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
    localStorage.setItem('themeMode', mode);
    setSavedSettings(true);
    
    // Reset the saved notification after a delay
    setTimeout(() => {
      setSavedSettings(false);
    }, 2000);
  };

  const handleCapitalizationToggle = () => {
    setCapitalization({
      ...capitalization,
      enabled: !capitalization.enabled
    });
    setSavedSettings(true);
    setTimeout(() => {
      setSavedSettings(false);
    }, 2000);
  };

  const handleCapitalizationModeToggle = (mode: 'normal' | 'explicit' | 'quotes') => {
    setCapitalization({
      ...capitalization,
      modes: {
        ...capitalization.modes,
        [mode]: !capitalization.modes[mode]
      }
    });
    setSavedSettings(true);
    setTimeout(() => {
      setSavedSettings(false);
    }, 2000);
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme.mainBg}`}>
      <Header currentPage="settings" />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-3xl font-bold ${theme.textColor}`}>Settings</h1>
            <button 
              onClick={() => router.push('/')}
              className={`px-4 py-2 rounded-md ${theme.buttonBg} ${theme.buttonText} hover:opacity-90 transition-opacity flex items-center gap-2`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to typing
            </button>
          </div>

          <div className={`${theme.cardBg} rounded-lg shadow-md p-6 mb-8`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme.textColor}`}>Theme Mode</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleThemeModeChange('light')}
                className={`px-4 py-2 rounded-md transition ${
                  themeMode === 'light' ? 'bg-blue-600 text-white' : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
                }`}
              >
                Light
              </button>
              <button
                onClick={() => handleThemeModeChange('dark')}
                className={`px-4 py-2 rounded-md transition ${
                  themeMode === 'dark' ? 'bg-blue-600 text-white' : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => handleThemeModeChange('system')}
                className={`px-4 py-2 rounded-md transition ${
                  themeMode === 'system' ? 'bg-blue-600 text-white' : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
                }`}
              >
                System
              </button>
            </div>
          </div>

          <div className={`${theme.cardBg} rounded-lg shadow-md p-6 mb-8`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme.textColor}`}>Randomize Theme</h2>
            <p className={`mb-3 text-sm ${theme.textColor} opacity-70`}>After completing a test, the theme will be set to a random one.</p>
            <div className="flex flex-wrap gap-3">
              {(['off', 'on', 'favorite', 'light', 'dark', 'custom'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => handleRandomizeChange(option)}
                  className={`px-4 py-2 rounded-md transition ${
                    randomizeSetting === option 
                      ? 'bg-blue-600 text-white' 
                      : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={`${theme.cardBg} rounded-lg shadow-md p-6 mb-8`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme.textColor}`}>Select Theme</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.name}
                  onClick={() => handleThemeChange(themeOption.name)}
                  className={`px-4 py-2 rounded-md transition text-center ${
                    theme.name === themeOption.name 
                      ? 'bg-blue-600 text-white' 
                      : `${theme.buttonBg} ${theme.buttonText} hover:opacity-80`
                  }`}
                >
                  {themeOption.label}
                </button>
              ))}
            </div>
          </div>

          {/* New card for capitalization settings */}
          <div className={`${theme.cardBg} rounded-lg shadow-md p-6 mb-8`}>
            <div className="flex justify-between items-center mb-3">
              <h2 className={`text-xl font-semibold ${theme.textColor}`}>Capitalization</h2>
              <button
                onClick={handleCapitalizationToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  capitalization.enabled ? 'bg-blue-600' : `${theme.buttonBg} opacity-60`
                }`}
                aria-label={capitalization.enabled ? "Disable capitalization" : "Enable capitalization"}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    capitalization.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <p className={`mb-4 text-sm ${theme.textColor} opacity-70`}>
              {capitalization.enabled ? 'Sentences will be capitalized according to mode settings below.' : 'All text will be lowercase.'}
            </p>
            
            <div className={`mt-3 ${!capitalization.enabled ? 'opacity-50' : ''}`}>
              <h3 className={`text-md font-medium mb-2 ${theme.textColor}`}>Apply to modes:</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="cap-normal"
                    checked={capitalization.modes.normal}
                    onChange={() => handleCapitalizationModeToggle('normal')}
                    disabled={!capitalization.enabled}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="cap-normal" className={theme.textColor}>Normal</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="cap-explicit"
                    checked={capitalization.modes.explicit}
                    onChange={() => handleCapitalizationModeToggle('explicit')}
                    disabled={!capitalization.enabled}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="cap-explicit" className={theme.textColor}>Explicit</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="cap-quotes"
                    checked={capitalization.modes.quotes}
                    onChange={() => handleCapitalizationModeToggle('quotes')}
                    disabled={!capitalization.enabled}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="cap-quotes" className={theme.textColor}>Quotes</label>
                </div>
              </div>
            </div>
          </div>

          {/* Success notification moved to bottom for better UI experience */}
          {savedSettings && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-green-100 border border-green-400 text-green-700 rounded-md shadow-lg z-50 animate-fade-in-up">
              Settings saved successfully!
            </div>
          )}
        </div>
      </main>
      
      <footer className={`py-4 text-center ${theme.textColor} text-sm opacity-70`}>
        Tourette's Typing Challenge - Settings
      </footer>
    </div>
  );
};

export default SettingsPage;
