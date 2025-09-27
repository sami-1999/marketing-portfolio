"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themes } from '../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faTimes } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle: React.FC = () => {
  const { currentTheme, setTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleOpen}
        className="fixed top-6 right-6 z-50 p-4 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.accent}, ${currentTheme.colors.accentSecondary})`,
          borderColor: currentTheme.colors.borderHover,
          boxShadow: `0 10px 30px ${currentTheme.colors.shadow}`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <FontAwesomeIcon 
          icon={isOpen ? faTimes : faPalette} 
          className="text-white text-xl"
        />
        
        {/* Floating tooltip */}
        <motion.div
          className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none"
          style={{
            background: currentTheme.colors.cardPrimary,
            color: currentTheme.colors.textPrimary,
            border: `1px solid ${currentTheme.colors.border}`,
          }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Choose Theme
        </motion.div>
      </motion.button>

      {/* Theme Selection Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Theme Panel */}
            <motion.div
              className="fixed top-24 right-6 z-50 p-6 rounded-3xl shadow-2xl backdrop-blur-md border max-w-sm w-80"
              style={{
                background: currentTheme.colors.cardPrimary,
                borderColor: currentTheme.colors.border,
                boxShadow: `0 20px 60px ${currentTheme.colors.shadow}`,
              }}
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="mb-6">
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: currentTheme.colors.textPrimary }}
                >
                  Choose Your Vibe ✨
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  Pick a color theme that matches your mood
                </p>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme, index) => (
                  <motion.button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme.name)}
                    className="relative p-4 rounded-2xl border-2 transition-all duration-300 group overflow-hidden"
                    style={{
                      background: theme.colors.cardPrimary,
                      borderColor: currentTheme.name === theme.name 
                        ? currentTheme.colors.accent 
                        : 'transparent',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Theme Preview Gradient */}
                    <div 
                      className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.gradientFrom}, ${theme.colors.gradientTo})`,
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="text-2xl mb-2">{theme.emoji}</div>
                      <div 
                        className="font-semibold text-sm mb-1"
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {theme.displayName}
                      </div>
                      
                      {/* Color Preview Dots */}
                      <div className="flex justify-center space-x-1">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: theme.colors.gradientFrom }}
                        />
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: theme.colors.gradientTo }}
                        />
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {currentTheme.name === theme.name && (
                      <motion.div
                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: currentTheme.colors.accent }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow: `inset 0 0 20px ${theme.colors.glow}`,
                      }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t" style={{ borderColor: currentTheme.colors.border }}>
                <p 
                  className="text-xs text-center"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  Theme preferences are saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center p-8 rounded-3xl shadow-2xl backdrop-blur-md border"
              style={{
                background: currentTheme.colors.cardPrimary,
                borderColor: currentTheme.colors.border,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-4xl mb-4">{currentTheme.emoji}</div>
              <div 
                className="text-xl font-bold mb-2"
                style={{ color: currentTheme.colors.textPrimary }}
              >
                Switching to {currentTheme.displayName}
              </div>
              <div 
                className="text-sm"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Applying your new theme...
              </div>
              
              {/* Loading Animation */}
              <div className="mt-4 flex justify-center space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentTheme.colors.accent }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeToggle;
