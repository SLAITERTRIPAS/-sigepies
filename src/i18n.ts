import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "SISTEMA CARREGANDO": "SYSTEM LOADING",
          "Aguarde um momento...": "Please wait a moment...",
          "Plano de Actividade": "Activity Plan",
          "Plano de Actividade de {{name}}": "Activity Plan of {{name}}"
        }
      },
      pt: {
        translation: {
          "SISTEMA CARREGANDO": "SISTEMA CARREGANDO",
          "Aguarde um momento...": "Aguarde um momento...",
          "Plano de Actividade": "Plano de Actividade",
          "Plano de Actividade de {{name}}": "Plano de Actividade de {{name}}"
        }
      }
    },
    fallbackLng: 'pt',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
