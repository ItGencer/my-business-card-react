import { useState } from "react";
import "./header.scss";
import languageImg from "../../../assets/language.png";

function Header() {
  const navigation = [
    "Про мене",
    "Навички",
    "Послуги",
    "Портфоліо",
    "Контакти",
  ];
  const themeIcons = ["🌞", "🌜"];
  const languageLabels = ["EN", "UA"];

  const [isTheme, setIsTheme] = useState(false);
  const [isLanguage, setIsLanguage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => setIsTheme((prev) => !prev);
  const toggleLanguage = () => setIsLanguage((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__badge">AH</div>
        <div className="header__title">
          <h1>Artem Hrishyn</h1>
        </div>
      </div>

      <ul className={`header__nav ${isMenuOpen ? "is-open" : ""}`}>
        {navigation.map((item) => (
          <li key={item} onClick={closeMenu}>
            <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="header__toggle">
        <div className="header__toggle__language" onClick={toggleLanguage}>
          <img src={languageImg} alt="language" />
          <span>{languageLabels[isLanguage ? 1 : 0]}</span>
        </div>
        <button
          className="header__toggle__theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {themeIcons[isTheme ? 1 : 0]}
        </button>

        <div
          role="button"
          aria-expanded={isMenuOpen}
          className={`header__burger ${isMenuOpen ? "is-open" : ""}`}
          onClick={toggleMenu}
        >
          <svg
            className="burger-icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              className="line line1"
              x="3"
              y="5"
              width="18"
              height="2"
              rx="1"
            />
            <rect
              className="line line2"
              x="3"
              y="11"
              width="18"
              height="2"
              rx="1"
            />
            <rect
              className="line line3"
              x="3"
              y="17"
              width="18"
              height="2"
              rx="1"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;
