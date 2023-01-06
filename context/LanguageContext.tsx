import React, { useState, useEffect, FC } from 'react';
import Cookies from 'js-cookie';
import { spanishDictionary } from '../languages/ES';
import { englishDictionary } from '../languages/EN';
import { languageInterface } from '../languages/languageInterface';

interface contextProps {
  dictionary: languageInterface;
  language: string;
}

export const LanguageContext = React.createContext<contextProps | null>(
  null
);
type languageType = 'english' | 'spanish';
const LanguageProvider: FC = ({ children }) => {
  const [language, setLanguage] = useState<languageType>(
    (Cookies.get('language') || 'english') as languageType
  );

  useEffect(() => {
    const language: languageType = (Cookies.get('language') ||
      'english') as languageType;
    setLanguage(language);
  }, []);

  const currentLanguage =
    language === 'spanish' ? spanishDictionary : englishDictionary;

  return (
    <LanguageContext.Provider
      value={{ dictionary: currentLanguage, language }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
