import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import profilePhoto from '../../assets/my-foto.png';

export default function Hero() {
  const { t } = useTranslation();
  const { targetRef, displayedText } = useTypewriter(t('hero.title'), 18);
  const [hovered, setHovered] = useState(false);

  return (
    <section className="hero section" id="top">
      <div className="container hero__grid">
        <div
          className="hero__grid__content"
        >
          <p className="section__eyebrow">{t('hero.eyebrow')}</p>
          <h1 ref={targetRef} className="hero__grid__content__title">
            <span className="hero__grid__content__title__measure" aria-hidden="true">
              {t('hero.title')}
            </span>
            <span className="hero__grid__content__title__typed">
              {displayedText}
              <span aria-hidden="true" className="hero__cursor" />
            </span>
          </h1>
          <p className="hero__grid__content__lead">{t('hero.lead')}</p>
          <div className="hero__grid__content__actions">
            <a className="button button--primary" href="#portfolio">
              {t('hero.primary')}
            </a>
            <a className="button button--ghost" href="#contacts">
              {t('hero.secondary')}
            </a>
          </div>
        </div>

        <div
          className="hero-visual"
          style={{ transform: `perspective(800px) rotateX(${hovered ? -12 : 0}deg)` }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={t('hero.profileName')}
        >
            <img
              className="portrait-photo"
              src={profilePhoto}
              alt={t('hero.profileName')}
              width="640"
              height="640"
              fetchPriority="high"
              decoding="async"
            />
            <div className="code-chip chip-one">React + TS</div>
            <div className="code-chip chip-two">Mobile First</div>
        </div>
      </div>
    </section>
  );
}
