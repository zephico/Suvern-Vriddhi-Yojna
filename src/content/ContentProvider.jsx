import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import en from './site.en.json'
import gu from './site.gu.json'
import legalEn from './legal.en.json'
import legalGu from './legal.gu.json'

const STORAGE_KEY = 'svy_lang'

const ContentContext = createContext(null)

function getInitialLang() {
  const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
  return saved === 'en' ? 'en' : 'gu'
}

export function ContentProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    // Keep <html lang="..."> in sync for accessibility + SEO.
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const base = lang === 'gu' ? gu : en
    const legal = lang === 'gu' ? legalGu : legalEn
    const content = { ...base, legal }
    const setLanguage = (next) => {
      setLang(next)
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // ignore
      }
    }
    const toggleLanguage = () => setLanguage(lang === 'gu' ? 'en' : 'gu')

    return { lang, content, setLanguage, toggleLanguage }
  }, [lang])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}

