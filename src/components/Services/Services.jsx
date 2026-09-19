import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';

export default function Services() {
  const { t } = useTranslation();
  const services = t('services.items', { returnObjects: true });
  const { targetRef, displayedText } = useTypewriter(t('services.title'));

  return (
    <motion.section
      id="services"
      className="services section"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
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
    </motion.section>
  );
}
