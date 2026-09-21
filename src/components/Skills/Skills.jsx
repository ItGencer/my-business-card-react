import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';

export default function Skills() {
  const { t } = useTranslation();
  const translatedSkills = t('skills.items', { returnObjects: true });
  const skills = Array.isArray(translatedSkills) ? translatedSkills : [];
  const { targetRef, displayedText } = useTypewriter(t('skills.title'));

  return (
    <motion.section
      id="skills"
      className="skills section"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container skills__inner">
        <div>
          <p className="section__eyebrow">{t('skills.eyebrow')}</p>
          <h2 ref={targetRef} className="section__title">
            {displayedText}
          </h2>
          <p className="section__lead">{t('skills.lead')}</p>
        </div>

        <div className="skills__cloud" aria-label={t('skills.title')}>
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
