/**
 * Calculation Utilities
 * 
 * Contains functions for calculating typing performance metrics:
 * - Words Per Minute (WPM) calculation
 * - Accuracy calculation
 * - Other typing test related calculations
 */

export function calculateWPM(charactersTyped: number, timeInSeconds: number) {
  // WPM = (characters / 5) / (time in minutes)
  return Math.round((charactersTyped / 5 / (timeInSeconds / 60)) || 0);
}

/**
 * Calculate typing accuracy using the standard formula
 * @param correctChars Number of correctly typed characters
 * @param errors Number of typing errors/mistakes
 * @returns Accuracy percentage (0-100)
 */
export function calculateAccuracy(correctChars: number, errors: number): number {
  const totalAttempted = correctChars + errors;
  if (totalAttempted === 0) return 100; // No attempts yet = 100% accuracy
  return Math.round((correctChars / totalAttempted) * 100);
}
