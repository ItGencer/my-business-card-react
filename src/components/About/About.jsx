import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';

export default function About() {
  const { t } = useTranslation();
  const cards = t('about.cards', { returnObjects: true });
  const steps = t('about.process', { returnObjects: true });
  const { targetRef, displayedText } = useTypewriter(t('about.title'));

  return (
    <motion.section
      id="about"
      className="about section"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container">
        <p className="section__eyebrow">{t('about.eyebrow')}</p>
        <h2 ref={targetRef} className="section__title">
          {displayedText}
        </h2>
        <p className="section__lead">{t('about.lead')}</p>

        <div className="about__grid">
          {cards.map((card) => (
            <article className="about-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <div className="about-process glass-panel">
          <div>
            <h3>{t('about.processTitle')}</h3>
            <p>{t('about.priceNote')}</p>
          </div>
          <ol>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </motion.section>
  );
}
