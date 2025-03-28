const OPENAI_KEY = 'openAIKey';

export const getOpenAIKey = () => localStorage.getItem(OPENAI_KEY) || '';

export const setOpenAIKey = (key: string) => localStorage.setItem(OPENAI_KEY, key);
