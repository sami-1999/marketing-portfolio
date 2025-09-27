"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ColorTheme {
  name: string;
  displayName: string;
  emoji: string;
  colors: {
    // Background colors
    primary: string;
    secondary: string;
    tertiary: string;
    
    // Card backgrounds
    cardPrimary: string;
    cardSecondary: string;
    
    // Text colors
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    
    // Accent colors
    accent: string;
    accentSecondary: string;
    
    // Gradient colors
    gradientFrom: string;
    gradientTo: string;
    gradientVia?: string;
    
    // Border colors
    border: string;
    borderHover: string;
    
    // Button colors
    buttonPrimary: string;
    buttonSecondary: string;
    buttonHover: string;
    
    // Special effects
    glow: string;
    shadow: string;
  };
}

export const themes: ColorTheme[] = [
  {
    name: 'professional-white',
    displayName: 'Professional White',
    emoji: '💼',
    colors: {
      primary: 'rgb(255, 255, 255)', // Pure white
      secondary: 'rgb(255, 255, 255)', // Pure white
      tertiary: 'rgb(255, 255, 255)', // Pure white
      cardPrimary: 'rgba(255, 255, 255, 0.95)',
      cardSecondary: 'rgba(248, 250, 252, 0.8)', // Very light slate
      textPrimary: 'rgb(15, 23, 42)', // Dark slate for readability
      textSecondary: 'rgb(71, 85, 105)', // Medium slate
      textAccent: 'rgb(59, 130, 246)', // Professional blue
      accent: 'rgb(59, 130, 246)', // Professional blue
      accentSecondary: 'rgb(99, 102, 241)', // Professional indigo
      gradientFrom: 'rgb(59, 130, 246)', // Professional blue
      gradientTo: 'rgb(99, 102, 241)', // Professional indigo
      border: 'rgba(226, 232, 240, 0.8)', // Light slate border
      borderHover: 'rgba(59, 130, 246, 0.3)', // Blue hover
      buttonPrimary: 'linear-gradient(to right, rgb(59, 130, 246), rgb(99, 102, 241))',
      buttonSecondary: 'rgba(248, 250, 252, 0.9)',
      buttonHover: 'rgba(59, 130, 246, 0.1)',
      glow: 'rgba(59, 130, 246, 0.15)',
      shadow: 'rgba(59, 130, 246, 0.1)'
    }
  },
  {
    name: 'lavender-light',
    displayName: 'Lavender Light',
    emoji: '💜',
    colors: {
      primary: 'rgb(250, 245, 255)', // purple-50
      secondary: 'rgb(243, 232, 255)', // purple-100
      tertiary: 'rgb(233, 213, 255)', // purple-200
      cardPrimary: 'rgba(255, 255, 255, 0.95)',
      cardSecondary: 'rgba(243, 232, 255, 0.8)',
      textPrimary: 'rgb(24, 24, 27)', // zinc-900
      textSecondary: 'rgb(63, 63, 70)', // zinc-700
      textAccent: 'rgb(109, 40, 217)', // violet-700
      accent: 'rgb(139, 92, 246)', // violet-500
      accentSecondary: 'rgb(168, 85, 247)', // purple-500
      gradientFrom: 'rgb(139, 92, 246)', // violet-500
      gradientTo: 'rgb(168, 85, 247)', // purple-500
      border: 'rgba(212, 212, 216, 0.6)', // zinc-300/60
      borderHover: 'rgba(139, 92, 246, 0.4)', // violet-500/40
      buttonPrimary: 'linear-gradient(to right, rgb(139, 92, 246), rgb(168, 85, 247))',
      buttonSecondary: 'rgba(255, 255, 255, 0.9)',
      buttonHover: 'rgba(139, 92, 246, 0.1)',
      glow: 'rgba(139, 92, 246, 0.15)',
      shadow: 'rgba(139, 92, 246, 0.2)'
    }
  },
  {
    name: 'peach-light',
    displayName: 'Peach Light',
    emoji: '🍑',
    colors: {
      primary: 'rgb(255, 247, 237)', // orange-50
      secondary: 'rgb(255, 237, 213)', // orange-100
      tertiary: 'rgb(254, 215, 170)', // orange-200
      cardPrimary: 'rgba(255, 255, 255, 0.95)',
      cardSecondary: 'rgba(255, 237, 213, 0.8)',
      textPrimary: 'rgb(23, 23, 23)', // neutral-900
      textSecondary: 'rgb(64, 64, 64)', // neutral-700
      textAccent: 'rgb(194, 65, 12)', // orange-700
      accent: 'rgb(251, 146, 60)', // orange-400
      accentSecondary: 'rgb(244, 63, 94)', // rose-500
      gradientFrom: 'rgb(251, 146, 60)', // orange-400
      gradientTo: 'rgb(244, 63, 94)', // rose-500
      border: 'rgba(212, 212, 212, 0.6)', // neutral-300/60
      borderHover: 'rgba(251, 146, 60, 0.4)', // orange-400/40
      buttonPrimary: 'linear-gradient(to right, rgb(251, 146, 60), rgb(244, 63, 94))',
      buttonSecondary: 'rgba(255, 255, 255, 0.9)',
      buttonHover: 'rgba(251, 146, 60, 0.1)',
      glow: 'rgba(251, 146, 60, 0.15)',
      shadow: 'rgba(251, 146, 60, 0.2)'
    }
  },
  {
    name: 'midnight-rose',
    displayName: 'Midnight Rose',
    emoji: '🌹',
    colors: {
      primary: 'rgb(15, 23, 42)', // slate-900
      secondary: 'rgb(30, 41, 59)', // slate-800
      tertiary: 'rgb(51, 65, 85)', // slate-700
      cardPrimary: 'rgba(30, 41, 59, 0.8)',
      cardSecondary: 'rgba(51, 65, 85, 0.5)',
      textPrimary: 'rgb(248, 250, 252)', // slate-50
      textSecondary: 'rgb(203, 213, 225)', // slate-300
      textAccent: 'rgb(236, 72, 153)', // pink-500
      accent: 'rgb(236, 72, 153)', // pink-500
      accentSecondary: 'rgb(168, 85, 247)', // purple-500
      gradientFrom: 'rgb(236, 72, 153)', // pink-500
      gradientTo: 'rgb(168, 85, 247)', // purple-500
      border: 'rgba(100, 116, 139, 0.5)', // slate-500/50
      borderHover: 'rgba(236, 72, 153, 0.3)', // pink-500/30
      buttonPrimary: 'linear-gradient(to right, rgb(236, 72, 153), rgb(168, 85, 247))',
      buttonSecondary: 'rgba(51, 65, 85, 0.8)',
      buttonHover: 'rgba(236, 72, 153, 0.1)',
      glow: 'rgba(236, 72, 153, 0.2)',
      shadow: 'rgba(236, 72, 153, 0.25)'
    }
  },
  {
    name: 'lavender-dreams',
    displayName: 'Lavender Dreams',
    emoji: '💜',
    colors: {
      primary: 'rgb(24, 24, 27)', // zinc-900
      secondary: 'rgb(39, 39, 42)', // zinc-800
      tertiary: 'rgb(63, 63, 70)', // zinc-700
      cardPrimary: 'rgba(39, 39, 42, 0.8)',
      cardSecondary: 'rgba(63, 63, 70, 0.5)',
      textPrimary: 'rgb(250, 250, 250)', // zinc-50
      textSecondary: 'rgb(212, 212, 216)', // zinc-300
      textAccent: 'rgb(196, 181, 253)', // violet-300
      accent: 'rgb(139, 92, 246)', // violet-500
      accentSecondary: 'rgb(168, 85, 247)', // purple-500
      gradientFrom: 'rgb(139, 92, 246)', // violet-500
      gradientTo: 'rgb(168, 85, 247)', // purple-500
      gradientVia: 'rgb(196, 181, 253)', // violet-300
      border: 'rgba(113, 113, 122, 0.5)', // zinc-500/50
      borderHover: 'rgba(139, 92, 246, 0.3)', // violet-500/30
      buttonPrimary: 'linear-gradient(to right, rgb(139, 92, 246), rgb(168, 85, 247))',
      buttonSecondary: 'rgba(63, 63, 70, 0.8)',
      buttonHover: 'rgba(139, 92, 246, 0.1)',
      glow: 'rgba(139, 92, 246, 0.2)',
      shadow: 'rgba(139, 92, 246, 0.25)'
    }
  },
  {
    name: 'coral-sunset',
    displayName: 'Coral Sunset',
    emoji: '🌅',
    colors: {
      primary: 'rgb(23, 23, 23)', // neutral-900
      secondary: 'rgb(38, 38, 38)', // neutral-800
      tertiary: 'rgb(64, 64, 64)', // neutral-700
      cardPrimary: 'rgba(38, 38, 38, 0.8)',
      cardSecondary: 'rgba(64, 64, 64, 0.5)',
      textPrimary: 'rgb(250, 250, 250)', // neutral-50
      textSecondary: 'rgb(212, 212, 212)', // neutral-300
      textAccent: 'rgb(251, 146, 60)', // orange-400
      accent: 'rgb(251, 146, 60)', // orange-400
      accentSecondary: 'rgb(244, 63, 94)', // rose-500
      gradientFrom: 'rgb(251, 146, 60)', // orange-400
      gradientTo: 'rgb(244, 63, 94)', // rose-500
      gradientVia: 'rgb(251, 113, 133)', // rose-400
      border: 'rgba(115, 115, 115, 0.5)', // neutral-500/50
      borderHover: 'rgba(251, 146, 60, 0.3)', // orange-400/30
      buttonPrimary: 'linear-gradient(to right, rgb(251, 146, 60), rgb(244, 63, 94))',
      buttonSecondary: 'rgba(64, 64, 64, 0.8)',
      buttonHover: 'rgba(251, 146, 60, 0.1)',
      glow: 'rgba(251, 146, 60, 0.2)',
      shadow: 'rgba(251, 146, 60, 0.25)'
    }
  },
  {
    name: 'cherry-blossom',
    displayName: 'Cherry Blossom',
    emoji: '🌸',
    colors: {
      primary: 'rgb(20, 14, 27)', // Custom dark purple
      secondary: 'rgb(35, 25, 44)', // Custom purple-800
      tertiary: 'rgb(55, 39, 68)', // Custom purple-700
      cardPrimary: 'rgba(35, 25, 44, 0.8)',
      cardSecondary: 'rgba(55, 39, 68, 0.5)',
      textPrimary: 'rgb(253, 244, 255)', // purple-50
      textSecondary: 'rgb(233, 213, 255)', // purple-200
      textAccent: 'rgb(251, 207, 232)', // pink-200
      accent: 'rgb(244, 114, 182)', // pink-400
      accentSecondary: 'rgb(192, 132, 252)', // purple-400
      gradientFrom: 'rgb(244, 114, 182)', // pink-400
      gradientTo: 'rgb(192, 132, 252)', // purple-400
      gradientVia: 'rgb(251, 207, 232)', // pink-200
      border: 'rgba(147, 51, 234, 0.3)', // purple-600/30
      borderHover: 'rgba(244, 114, 182, 0.4)', // pink-400/40
      buttonPrimary: 'linear-gradient(to right, rgb(244, 114, 182), rgb(192, 132, 252))',
      buttonSecondary: 'rgba(55, 39, 68, 0.8)',
      buttonHover: 'rgba(244, 114, 182, 0.1)',
      glow: 'rgba(244, 114, 182, 0.3)',
      shadow: 'rgba(244, 114, 182, 0.3)'
    }
  },
  {
    name: 'ocean-breeze',
    displayName: 'Ocean Breeze',
    emoji: '🌊',
    colors: {
      primary: 'rgb(12, 74, 110)', // Custom teal-900
      secondary: 'rgb(21, 94, 117)', // Custom teal-800
      tertiary: 'rgb(34, 116, 129)', // Custom teal-700
      cardPrimary: 'rgba(21, 94, 117, 0.8)',
      cardSecondary: 'rgba(34, 116, 129, 0.5)',
      textPrimary: 'rgb(240, 253, 255)', // cyan-50
      textSecondary: 'rgb(165, 243, 252)', // cyan-200
      textAccent: 'rgb(103, 232, 249)', // cyan-300
      accent: 'rgb(6, 182, 212)', // cyan-500
      accentSecondary: 'rgb(14, 165, 233)', // sky-500
      gradientFrom: 'rgb(6, 182, 212)', // cyan-500
      gradientTo: 'rgb(14, 165, 233)', // sky-500
      gradientVia: 'rgb(103, 232, 249)', // cyan-300
      border: 'rgba(6, 182, 212, 0.3)', // cyan-500/30
      borderHover: 'rgba(103, 232, 249, 0.4)', // cyan-300/40
      buttonPrimary: 'linear-gradient(to right, rgb(6, 182, 212), rgb(14, 165, 233))',
      buttonSecondary: 'rgba(34, 116, 129, 0.8)',
      buttonHover: 'rgba(6, 182, 212, 0.1)',
      glow: 'rgba(6, 182, 212, 0.2)',
      shadow: 'rgba(6, 182, 212, 0.25)'
    }
  },
  {
    name: 'golden-hour',
    displayName: 'Golden Hour',
    emoji: '✨',
    colors: {
      primary: 'rgb(41, 37, 36)', // stone-800
      secondary: 'rgb(57, 54, 52)', // stone-700
      tertiary: 'rgb(87, 83, 78)', // stone-600
      cardPrimary: 'rgba(57, 54, 52, 0.8)',
      cardSecondary: 'rgba(87, 83, 78, 0.5)',
      textPrimary: 'rgb(255, 251, 235)', // amber-50
      textSecondary: 'rgb(253, 230, 138)', // amber-200
      textAccent: 'rgb(251, 191, 36)', // amber-400
      accent: 'rgb(245, 158, 11)', // amber-500
      accentSecondary: 'rgb(249, 115, 22)', // orange-500
      gradientFrom: 'rgb(245, 158, 11)', // amber-500
      gradientTo: 'rgb(249, 115, 22)', // orange-500
      gradientVia: 'rgb(251, 191, 36)', // amber-400
      border: 'rgba(120, 113, 108, 0.5)', // stone-500/50
      borderHover: 'rgba(245, 158, 11, 0.3)', // amber-500/30
      buttonPrimary: 'linear-gradient(to right, rgb(245, 158, 11), rgb(249, 115, 22))',
      buttonSecondary: 'rgba(87, 83, 78, 0.8)',
      buttonHover: 'rgba(245, 158, 11, 0.1)',
      glow: 'rgba(245, 158, 11, 0.2)',
      shadow: 'rgba(245, 158, 11, 0.25)'
    }
  }
];

interface ThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (themeName: string) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(themes[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      const theme = themes.find(t => t.name === savedTheme);
      if (theme) {
        setCurrentTheme(theme);
      }
    }
  }, []);

  // Apply CSS custom properties when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const theme = currentTheme;
    
    // Set CSS custom properties
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-tertiary', theme.colors.tertiary);
    root.style.setProperty('--theme-card-primary', theme.colors.cardPrimary);
    root.style.setProperty('--theme-card-secondary', theme.colors.cardSecondary);
    root.style.setProperty('--theme-text-primary', theme.colors.textPrimary);
    root.style.setProperty('--theme-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--theme-text-accent', theme.colors.textAccent);
    root.style.setProperty('--theme-accent', theme.colors.accent);
    root.style.setProperty('--theme-accent-secondary', theme.colors.accentSecondary);
    root.style.setProperty('--theme-gradient-from', theme.colors.gradientFrom);
    root.style.setProperty('--theme-gradient-to', theme.colors.gradientTo);
    root.style.setProperty('--theme-gradient-via', theme.colors.gradientVia || theme.colors.gradientFrom);
    root.style.setProperty('--theme-border', theme.colors.border);
    root.style.setProperty('--theme-border-hover', theme.colors.borderHover);
    root.style.setProperty('--theme-button-primary', theme.colors.buttonPrimary);
    root.style.setProperty('--theme-button-secondary', theme.colors.buttonSecondary);
    root.style.setProperty('--theme-button-hover', theme.colors.buttonHover);
    root.style.setProperty('--theme-glow', theme.colors.glow);
    root.style.setProperty('--theme-shadow', theme.colors.shadow);
  }, [currentTheme]);

  const setTheme = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (theme && theme.name !== currentTheme.name) {
      setIsTransitioning(true);
      
      // Save to localStorage
      localStorage.setItem('portfolio-theme', themeName);
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        setCurrentTheme(theme);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 150);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
