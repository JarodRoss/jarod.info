import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { censor } from '@/lib/censor'
import fr from './locales/fr.json'
import en from './locales/en.json'

i18n
  .use({
    type: 'postProcessor',
    name: 'censor',
    process: (value: string) => censor(value.replace(/~([A-Za-z0-9+/=]+)~/g, (_, b) => atob(b))),
  } as any)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: localStorage.getItem('lang') || 'fr',
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    postProcess: ['censor'],
  })

export default i18n
