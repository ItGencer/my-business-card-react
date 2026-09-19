import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PortfolioModal({ project, onClose }) {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = project.screens.length;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowRight') {
        setActiveSlide((currentSlide) => (currentSlide + 1) % totalSlides);
      }

      if (event.key === 'ArrowLeft') {
        setActiveSlide((currentSlide) => (currentSlide - 1 + totalSlides) % totalSlides);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, totalSlides]);

  const goToPreviousSlide = () => {
    setActiveSlide((currentSlide) => (currentSlide - 1 + totalSlides) % totalSlides);
  };

  const goToNextSlide = () => {
    setActiveSlide((currentSlide) => (currentSlide + 1) % totalSlides);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="portfolio-modal" role="presentation" onMouseDown={handleOverlayClick}>
      <section className="portfolio-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title">
        <button className="portfolio-modal__close" type="button" onClick={onClose} aria-label={t('portfolio.close')}>
          ×
        </button>

        <div className="portfolio-modal__slider">
          <div className={`portfolio-modal__screen portfolio-modal__screen--${project.index + 1}`}>
            <span>
              {t('portfolio.slide')} {activeSlide + 1} / {totalSlides}
            </span>
            <strong>{project.screens[activeSlide]}</strong>
          </div>
          <div className="portfolio-modal__controls">
            <button type="button" onClick={goToPreviousSlide} aria-label={t('portfolio.previous')}>
              ‹
            </button>
            <button type="button" onClick={goToNextSlide} aria-label={t('portfolio.next')}>
              ›
            </button>
          </div>
          <div className="portfolio-modal__dots" aria-hidden="true">
            {project.screens.map((screen, index) => (
              <span className={index === activeSlide ? 'is-active' : ''} key={screen} />
            ))}
          </div>
        </div>

        <div className="portfolio-modal__content">
          <p>{project.category}</p>
          <h3 id="portfolio-modal-title">{project.title}</h3>
          <span>{project.description}</span>
          <div className="portfolio-modal__tags">
            {project.tags.map((tag) => (
              <em key={tag}>{tag}</em>
            ))}
          </div>
          <a className="button button--primary" href={project.url} target="_blank" rel="noreferrer">
            {t('portfolio.visitProject')}
          </a>
        </div>
      </section>
    </div>
  );
}
