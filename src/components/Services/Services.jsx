import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';

export default function Services() {
  const { t } = useTranslation();
  const translatedServices = t('services.items', { returnObjects: true });
  const services = Array.isArray(translatedServices) ? translatedServices : [];
  const { targetRef, displayedText } = useTypewriter(t('services.title'));

  return (
    <section
      id="services"
      className="services section"
    >
      <div className="container">
        <p className="section__eyebrow">{t('services.eyebrow')}</p>
        <h2 ref={targetRef} className="section__title">
          {displayedText}
        </h2>
        <p className="section__lead">{t('services.lead')}</p>

        <div className="services__grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title} tabIndex={0}>
              <span className="service-card__number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{service.title}</h3>
              <strong>{service.price}</strong>
              <p>{service.text}</p>
            </article>
          ))}
        </div>

        <p className="services__note">{t('services.note')}</p>
      </div>
    </section>
  );
}
