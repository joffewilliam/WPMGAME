import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  name: string;
  themeMode: ThemeMode;
  mainBg: string;
  cardBg: string;
  textColor: string;
  primaryColor: string;
  successColor: string;
  errorColor: string;
  buttonBg: string;
  buttonText: string;
  caretColor: string;
  headerBg: string;
  headerText: string;
}

const darkTheme: ThemeColors = {
  name: 'dark',
  themeMode: 'dark',
  mainBg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
  cardBg: 'bg-gray-800 bg-opacity-80',
  textColor: 'text-gray-200',
  primaryColor: 'text-blue-400',
  successColor: 'text-green-500',
  errorColor: 'text-red-500',
  buttonBg: 'bg-gray-700',
  buttonText: 'text-white',
  caretColor: 'bg-blue-500',
  headerBg: 'bg-gray-900',
  headerText: 'text-white',
};

const lightTheme: ThemeColors = {
  name: 'nord_light',
  themeMode: 'light',
  mainBg: 'bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100',
  cardBg: 'bg-white',
  textColor: 'text-gray-800',
  primaryColor: 'text-blue-600',
  successColor: 'text-green-600',
  errorColor: 'text-red-600',
  buttonBg: 'bg-gray-200',
  buttonText: 'text-gray-800',
  caretColor: 'bg-blue-600',
  headerBg: 'bg-white',
  headerText: 'text-gray-800',
};

// Enhanced theme collection with better contrast and visibility
const themeCollection: Record<string, ThemeColors> = {
  dark: darkTheme,
  nord_light: lightTheme,
  dino: {
    name: 'dino',
    themeMode: 'dark',
    mainBg: 'bg-gradient-to-br from-green-900 via-green-800 to-green-700',
    cardBg: 'bg-green-800 bg-opacity-60',
    textColor: 'text-green-100',
    primaryColor: 'text-green-300',
    successColor: 'text-green-300',
    errorColor: 'text-red-300',
    buttonBg: 'bg-green-700',
    buttonText: 'text-white',
    caretColor: 'bg-green-300',
    headerBg: 'bg-green-900',
    headerText: 'text-white',
  },
  magic_girl: {
    name: 'magic_girl',
    themeMode: 'light',
    mainBg: 'bg-gradient-to-br from-pink-300 via-purple-300 to-pink-200',
    cardBg: 'bg-white',
    textColor: 'text-purple-900',
    primaryColor: 'text-purple-600',
    successColor: 'text-green-600',
    errorColor: 'text-red-600',
    buttonBg: 'bg-pink-400',
    buttonText: 'text-white',
    caretColor: 'bg-purple-500',
    headerBg: 'bg-purple-400',
    headerText: 'text-white',
  },
  milkshake: {
    name: 'milkshake',
    themeMode: 'light',
    mainBg: 'bg-gradient-to-br from-blue-100 via-pink-100 to-blue-200',
    cardBg: 'bg-white',
    textColor: 'text-gray-700',
    primaryColor: 'text-pink-600',
    successColor: 'text-green-600',
    errorColor: 'text-red-500',
    buttonBg: 'bg-blue-400',
    buttonText: 'text-white',
    caretColor: 'bg-pink-500',
    headerBg: 'bg-blue-300',
    headerText: 'text-gray-800',
  },
  modern_ink: {
    name: 'modern_ink',
    themeMode: 'dark',
    mainBg: 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900',
    cardBg: 'bg-gray-800 bg-opacity-70',
    textColor: 'text-gray-100',
    primaryColor: 'text-indigo-400',
    successColor: 'text-green-400',
    errorColor: 'text-red-400',
    buttonBg: 'bg-indigo-700',
    buttonText: 'text-white',
    caretColor: 'bg-indigo-400',
    headerBg: 'bg-gray-900',
    headerText: 'text-white',
  },
  ms_cupcakes: {
    name: 'ms_cupcakes',
    themeMode: 'light',
    mainBg: 'bg-gradient-to-br from-yellow-100 via-pink-100 to-yellow-200',
    cardBg: 'bg-white',
    textColor: 'text-pink-900',
    primaryColor: 'text-pink-600',
    successColor: 'text-green-600',
    errorColor: 'text-red-500',
    buttonBg: 'bg-pink-400',
    buttonText: 'text-white',
    caretColor: 'bg-pink-500',
    headerBg: 'bg-pink-200',
    headerText: 'text-pink-900',
  },
  sewing_tin_light: {
    name: 'sewing_tin_light',
    themeMode: 'light',
    mainBg: 'bg-gradient-to-br from-blue-50 via-gray-100 to-gray-200',
    cardBg: 'bg-white',
    textColor: 'text-gray-800',
    primaryColor: 'text-blue-600',
    successColor: 'text-green-600',
    errorColor: 'text-red-500',
    buttonBg: 'bg-blue-100',
    buttonText: 'text-gray-800',
    caretColor: 'bg-blue-500',
    headerBg: 'bg-blue-200',
    headerText: 'text-gray-800',
  },
  lilac_mist: {
    name: 'lilac_mist',
    themeMode: 'light',
    mainBg: 'bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100',
    cardBg: 'bg-white',
    textColor: 'text-purple-900',
    primaryColor: 'text-purple-600',
    successColor: 'text-green-600',
    errorColor: 'text-red-500',
    buttonBg: 'bg-purple-300',
    buttonText: 'text-white',
    caretColor: 'bg-purple-500',
    headerBg: 'bg-purple-200',
    headerText: 'text-purple-900',
  },
  rose_pine_dawn: {
    name: 'rose_pine_dawn',
    themeMode: 'light',
    mainBg: 'bg-gradient-to-br from-rose-100 via-gray-100 to-rose-100',
    cardBg: 'bg-white',
    textColor: 'text-gray-800',
    primaryColor: 'text-rose-600',
    successColor: 'text-green-600',
    errorColor: 'text-red-500',
    buttonBg: 'bg-rose-300',
    buttonText: 'text-white',
    caretColor: 'bg-rose-500',
    headerBg: 'bg-rose-200',
    headerText: 'text-gray-800',
  },
  soaring_skies: {
    name: 'soaring_skies',
    themeMode: 'light',
    mainBg: 'bg-gradient-to-br from-blue-200 via-blue-100 to-sky-100',
    cardBg: 'bg-white',
    textColor: 'text-blue-900',
    primaryColor: 'text-blue-600',
    successColor: 'text-green-600',
    errorColor: 'text-red-500',
    buttonBg: 'bg-blue-400',
    buttonText: 'text-white',
    caretColor: 'bg-blue-500',
    headerBg: 'bg-blue-300',
    headerText: 'text-blue-900',
  },
  rainbow_trail: {
    name: 'rainbow_trail',
    themeMode: 'dark',
    mainBg: 'bg-gradient-to-br from-purple-900 via-pink-900 to-red-900',
    cardBg: 'bg-gray-800 bg-opacity-70',
    textColor: 'text-gray-100',
    primaryColor: 'text-pink-400',
    successColor: 'text-green-400',
    errorColor: 'text-red-400',
    buttonBg: 'bg-purple-700',
    buttonText: 'text-white',
    caretColor: 'bg-pink-400',
    headerBg: 'bg-purple-900',
    headerText: 'text-white',
  }
};

export type CapitalizationSettings = {
  enabled: boolean;
  modes: {
    normal: boolean;
    explicit: boolean;
    quotes: boolean;
  };
};

export const ThemeContext = createContext<{
  theme: ThemeColors;
  setTheme: (name: string) => void;
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
  capitalization: CapitalizationSettings;
  setCapitalization: (settings: CapitalizationSettings) => void;
}>({
  theme: darkTheme, // Use darkTheme instead of themes.dark
  setTheme: () => {},
  themeMode: 'system',
  setThemeMode: () => {},
  capitalization: {
    enabled: true,
    modes: {
      normal: true,
      explicit: true,
      quotes: true
    }
  },
  setCapitalization: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [theme, setThemeState] = useState<ThemeColors>(darkTheme);
  const [capitalization, setCapitalization] = useState<CapitalizationSettings>({
    enabled: true,
    modes: {
      normal: true,
      explicit: true,
      quotes: true
    }
  });
  
  // Effect to handle system preference and load saved preferences
  useEffect(() => {
    // Load saved theme settings from localStorage if available
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('selectedTheme');
      const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
      
      if (savedMode) {
        setThemeMode(savedMode);
      }
      
      if (savedTheme && themeCollection[savedTheme]) {
        setThemeState(themeCollection[savedTheme]);
        return; // Don't apply system preference if a theme is explicitly saved
      }
    }
    
    // Apply system preference if no saved theme or in system mode
    if (themeMode === 'system') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(isDarkMode ? darkTheme : lightTheme);
    } else {
      // First try to find a theme that matches current mode
      const themesForMode = Object.values(themeCollection).filter(t => t.themeMode === themeMode);
      if (themesForMode.length > 0) {
        setThemeState(themesForMode[0]);
      } else {
        // Default fallback
        setThemeState(themeMode === 'dark' ? darkTheme : lightTheme);
      }
    }
  }, [themeMode]);

  // Effect to listen for system changes
  useEffect(() => {
    if (themeMode !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeState(e.matches ? darkTheme : lightTheme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Function to set theme by name
  const setTheme = (themeName: string) => {
    if (themeCollection[themeName]) {
      setThemeState(themeCollection[themeName]);
    } else {
      // Default to dark if theme not found
      setThemeState(darkTheme);
    }
  };

  // Load capitalization settings from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCapitalization = localStorage.getItem('capitalization');
      if (savedCapitalization) {
        try {
          setCapitalization(JSON.parse(savedCapitalization));
        } catch (e) {
          console.error('Failed to parse capitalization settings');
        }
      }
    }
  }, []);
  
  return (
    <ThemeContext.Provider value={{ 
      theme: theme, // or just `theme` in shorthand
      setTheme, 
      themeMode, 
      setThemeMode,
      capitalization,
      setCapitalization: (settings) => {
        setCapitalization(settings);
        localStorage.setItem('capitalization', JSON.stringify(settings));
      }
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
