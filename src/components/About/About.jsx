import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';

export default function About() {
  const { t } = useTranslation();
  const translatedCards = t('about.cards', { returnObjects: true });
  const translatedSteps = t('about.process', { returnObjects: true });
  const cards = Array.isArray(translatedCards) ? translatedCards : [];
  const steps = Array.isArray(translatedSteps) ? translatedSteps : [];
  const { targetRef, displayedText } = useTypewriter(t('about.title'));

  return (
    <section
      id="about"
      className="about section"
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
    </section>
  );
}
