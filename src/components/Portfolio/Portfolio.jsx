import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import PortfolioModal from '../PortfolioModal/PortfolioModal.jsx';

export default function Portfolio() {
  const { t } = useTranslation();
  const projects = t('portfolio.items', { returnObjects: true });
  const { targetRef, displayedText } = useTypewriter(t('portfolio.title'));
  const [activeProject, setActiveProject] = useState(null);

  return (
    <motion.section
      id="portfolio"
      className="portfolio section"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container">
        <p className="section__eyebrow">{t('portfolio.eyebrow')}</p>
        <h2 ref={targetRef} className="section__title">
          {displayedText}
        </h2>
        <p className="section__lead">{t('portfolio.lead')}</p>

        <div className="portfolio__grid">
          {projects.map((project, index) => (
            <article className="portfolio-card glass-panel" key={project.title}>
              <button type="button" onClick={() => setActiveProject({ ...project, index })}>
                <span className={`portfolio-card__preview portfolio-card__preview--${index + 1}`} aria-hidden="true">
                  <span>{project.category}</span>
                </span>
                <span className="portfolio-card__body">
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                </span>
                <span className="portfolio-card__tags">
                  {project.tags.map((tag) => (
                    <em key={tag}>{tag}</em>
                  ))}
                </span>
                <span className="portfolio-card__action">{t('portfolio.openProject')}</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeProject ? <PortfolioModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}
    </motion.section>
  );
}
