export const GEMINI_MODELS = {
  grounding: 'gemini-2.5-flash',
  groundingFallback: 'gemini-2.5-flash',
  analysis: 'gemini-2.5-pro',
  chat: 'gemini-2.5-flash',
  contentGen: 'gemini-2.5-pro',
} as const;

// Report attribution — change here rather than hunting through prompts
export const REPORTER_EMAIL = import.meta.env.VITE_REPORTER_EMAIL || 'your-email@example.com';
export const REPORTER_ORG   = import.meta.env.VITE_REPORTER_ORG   || 'GEO Strategic Hub';

