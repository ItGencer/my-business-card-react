import { Children, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import PortfolioModal from '../PortfolioModal/PortfolioModal.jsx';

const imageModules = import.meta.glob('../../assets/**/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  import: 'default',
});

/**
 * @typedef {{ src?: string, url?: string, image?: string, label?: string, title?: string, alt?: string }} PortfolioScreenInput
 * @typedef {{ title: string, category: string, description: string, url?: string, tags?: string[], screens?: (string | PortfolioScreenInput)[] }} PortfolioProject
 * @typedef {{ src?: string, label?: string, alt: string }} PortfolioScreen
 */

/** @param {unknown} path */
function resolveAssetPath(path) {
  if (path == null) {
    return null;
  }

  const normalizedPath = String(path).trim().replace(/\\/g, '/').replace(/^\.?\//, '');

  if (!normalizedPath) {
    return null;
  }

  if (/^(https?:)?\/\//i.test(normalizedPath) || normalizedPath.startsWith('data:') || normalizedPath.startsWith('/')) {
    return normalizedPath;
  }

  const sourcePath = normalizedPath.startsWith('src/assets/') ? normalizedPath.replace(/^src\//, '') : normalizedPath;
  const assetPath = sourcePath.startsWith('assets/') ? sourcePath : `assets/${sourcePath}`;
  const moduleKey = `../../${assetPath}`;

  return imageModules[moduleKey] || null;
}

/** @param {PortfolioProject} project */
function normalizeScreens(project) {
  const screens = Array.isArray(project.screens) ? project.screens : [];

  return screens.map((/** @type {string | PortfolioScreenInput} */ screen, index) => {
    const screenData = typeof screen === 'object' && screen !== null ? screen : { src: screen };
    const src = resolveAssetPath(screenData.src || screenData.url || screenData.image);
    const alt = screenData.alt || `${project.title} screenshot ${index + 1}`;

    if (src) {
      return {
        src,
        alt,
      };
    }

    return {
      label: screenData.label || screenData.title || String(screenData.src || screen),
      alt,
    };
  });
}

/** @param {unknown} value */
function isPortfolioProject(value) {
  return typeof value === 'object' && value !== null && 'title' in value;
}

export default function Portfolio() {
  const { t } = useTranslation();
  const translatedProjects = t('portfolio.items', { returnObjects: true });
  const projects = Array.isArray(translatedProjects)
    ? translatedProjects.filter(isPortfolioProject).map((project) => {
        const screens = normalizeScreens(project);
        const cover = screens.find((screen) => screen.src);

        return { ...project, screens, cover };
      })
    : [];
  const { targetRef, displayedText } = useTypewriter(t('portfolio.title'));
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section
      id="portfolio"
      className="portfolio section"
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
                <span className={`portfolio-card__preview ${project.cover ? 'has-image' : ''}`} aria-hidden="true">
                  {project.cover ? <img src={project.cover.src} alt="" loading="lazy" /> : null}
                  <span className="portfolio-card__category">{project.category}</span>
                </span>

                <span className="portfolio-card__body">
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                </span>

                <span className="portfolio-card__tags">
                  {Children.toArray(Array.isArray(project.tags) ? project.tags : []).map((tag) => (
                    <em key={String(tag)}>{tag}</em>
                  ))}
                </span>

                <span className="portfolio-card__action">{t('portfolio.openProject')}</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeProject ? <PortfolioModal project={activeProject} onClose={() => setActiveProject(null)} /> : null}
    </section>
  );
}
