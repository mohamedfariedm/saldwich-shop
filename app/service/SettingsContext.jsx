import React, { createContext, useState, useEffect, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const storedLang = localStorage.getItem('lang') || 'en';
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting`, {
          method: 'GET',
          headers: {
            'Accept-Language': storedLang,
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
