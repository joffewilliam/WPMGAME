import React from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  currentPage?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  currentPage = 'home'
}) => {
  const { theme } = useTheme();
  
  return (
    <header className={`w-full py-3 px-4 ${theme.headerBg} transition-all duration-300 shadow-md`}>
      <div className="container mx-auto flex flex-col">
        <div className="flex justify-between items-center">
          <Link href="/" className={`flex items-center ${theme.headerText} hover:opacity-80 transition-opacity`}>
            <span className="text-xl font-bold">What do I name this thing - typing test</span>
          </Link>
          
          <nav>
            <Link 
              href="/settings" 
              className={`p-2 rounded-md ${theme.headerText} hover:opacity-80 transition-opacity flex items-center gap-1`}
              aria-label="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="ml-1">Settings</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
