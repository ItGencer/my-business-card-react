import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import profilePhoto from '../../assets/my-foto.jpeg';

export default function Hero() {
  const { t } = useTranslation();
  const { targetRef, displayedText } = useTypewriter(t('hero.title'), 18);
  const [hovered, setHovered] = useState(false);

  return (
    <section className="hero section" id="top">
      <div className="container hero__grid">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="section__eyebrow">{t('hero.eyebrow')}</p>
          <h1 ref={targetRef} className="hero__title">
            {displayedText}
            <span aria-hidden="true" className="hero__cursor" />
          </h1>
          <p className="hero__lead">{t('hero.lead')}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#portfolio">
              {t('hero.primary')}
            </a>
            <a className="button button--ghost" href="#contacts">
              {t('hero.secondary')}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 24, rotateX: 0 }}
          animate={{ opacity: 1, y: 0, rotateX: hovered ? -12 : 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: 'easeOut' }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          aria-label={t('hero.profileName')}
        >
          <div className="portrait-frame" aria-hidden="true">
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />
            <motion.img
              src={profilePhoto}
              alt={t('hero.profileName')}
              className="portrait-photo"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={hovered ? { opacity: 1, rotateX: 0 } : { opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
            <div className="portrait-monogram" style={{ opacity: hovered ? 0 : 1 }}>
              <span>A</span>
              <span>H</span>
            </div>
            <div className="code-chip chip-one">React + TS</div>
            <div className="code-chip chip-two">Mobile First</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
