import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enlang from '../utils/locales/en/en.json'
import arlang from '../utils/locales/ar/ar.json'

const resources = {
    en: {
        translation: enlang
    },
    ar: {
        translation: arlang
    }
}


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: true,
        lng: 'en',
        interpolation: {
            escapeValue: false // React already escapes
        }
    })



export default i18n
