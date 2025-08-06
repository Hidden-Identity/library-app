/**
 * @author Luka Baturić
 * @date 03/08/2025
 */

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './translations.en.json'
import hr from './translations.hr.json'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {translation: en},
      hr: {translation: hr}
    }
  })

export const languages = {
  en: {nativeName: 'English', foreignName: 'Engleski'},
  hr: {nativeName: 'Hrvatski', foreignName: 'Croatian'}
};