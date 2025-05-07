/**
 * Sentence Generation Utilities
 * 
 * Contains functions for generating typing content:
 * - Random normal sentences with common words
 * - Random explicit sentences with profanity (for explicit mode)
 * - Random paragraph selection from famous quotes
 */
import { normalWords } from "./normalWords";
import { explicitWords } from "./explicitWords";
import { quotes, ParagraphQuote } from "./quotes";

// Generate a sentence of random normal words
export function getRandomNormalSentence(wordCount: number = 15): string {
  let sentence = '';
  for (let i = 0; i < wordCount; i++) {
    const randomWord = normalWords[Math.floor(Math.random() * normalWords.length)];
    sentence += randomWord + (i < wordCount - 1 ? ' ' : '');
  }
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

// Generate a sentence of random explicit words mixed with common words
export function getRandomExplicitSentence(wordCount: number = 15, explicitRatio: number = 0.4): string {
  let sentence = '';
  for (let i = 0; i < wordCount; i++) {
    const useExplicit = Math.random() < explicitRatio;
    const wordPool = useExplicit ? explicitWords : normalWords;
    const randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    sentence += randomWord + (i < wordCount - 1 ? ' ' : '');
  }
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

// Get a random paragraph from the list
export function getRandomParagraph(): ParagraphQuote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
