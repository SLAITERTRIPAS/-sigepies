import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    console.log("Alternando idioma para:", newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-[10px] font-black text-slate-700 rounded-lg transition-all border border-slate-200 shadow-sm uppercase tracking-wider"
    >
      {i18n.language === 'pt' ? 'EN' : 'PT'}
    </button>
  );
};
