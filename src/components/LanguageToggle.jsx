import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="lang-toggle">
      <button
        className={language === 'en' ? 'active' : ''}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        className={language === 'no' ? 'active' : ''}
        onClick={() => setLanguage('no')}
      >
        NO
      </button>
    </div>
  )
}
