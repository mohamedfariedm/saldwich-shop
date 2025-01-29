/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const [lang, setLang] = useState('en');

  // Load language from localStorage on component mount
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') || 'en';
    setLang(storedLang);
    onLanguageChange(storedLang);
  }, [onLanguageChange]);

  // Function to toggle the language
  const toggleLanguage = () => {

    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    onLanguageChange(newLang);
    window.location.reload()

  };

  return (
    <button onClick={toggleLanguage} style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={lang === 'en' ? '/imgs/flage/ar.png' : '/imgs/flage/en.jpg'}
        alt={lang === 'en' ? 'English' : 'Arabic'}
        style={{ width: '20px', marginRight: '8px' , marginLeft: '8px'}}
      />
      {lang === 'ar' ? 'English' : 'العربية'}
    </button>
  );
};

export default LanguageSwitcher;
