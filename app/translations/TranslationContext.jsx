import ar from './ar.json';
import en from './en.json';

const translations = {
  ar,
  en,
};

export const translate = (key, lang = 'en') => {
  return translations[lang][key] || key;
};
