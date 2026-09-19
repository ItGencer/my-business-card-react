import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme.js';

const navItems = [
  { href: '#about', key: 'about' },
  { href: '#skills', key: 'skills' },
  { href: '#services', key: 'services' },
  { href: '#portfolio', key: 'portfolio' },
  { href: '#contacts', key: 'contacts' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const switchLanguage = () => {
    const nextLanguage = i18n.language === 'en' ? 'ua' : 'en';
    localStorage.setItem('language', nextLanguage);
    i18n.changeLanguage(nextLanguage);
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#top" aria-label="Artem Hrishyn">
          <span>AH</span>
          <strong>Artem Hrishyn</strong>
        </a>

        <nav className={`site-header__nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} onClick={() => setIsMenuOpen(false)}>
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <button className="icon-button" type="button" onClick={switchLanguage} aria-label={t('actions.switchLanguage')}>
            {i18n.language === 'en' ? 'UA' : 'EN'}
          </button>
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={t('actions.switchTheme')}>
            {theme === 'dark' ? '☼' : '◐'}
          </button>
          <button
            className={`burger-button ${isMenuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={isMenuOpen ? t('actions.close') : t('actions.menu')}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
