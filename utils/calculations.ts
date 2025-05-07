/**
 * Calculation Utilities
 * 
 * Contains functions for calculating typing performance metrics:
 * - Words Per Minute (WPM) calculation
 * - Other typing test related calculations
 */

export function calculateWPM(charactersTyped: number, timeInSeconds: number) {
  // WPM = (characters / 5) / (time in minutes)
  return Math.round((charactersTyped / 5 / (timeInSeconds / 60)) || 0);
}
