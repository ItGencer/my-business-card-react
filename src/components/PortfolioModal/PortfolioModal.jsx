import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PortfolioModal({ project, onClose }) {
  const { t } = useTranslation();
  const screens = Array.isArray(project.screens) ? project.screens : [];
  const totalSlides = Math.max(screens.length, 1);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeScreen = screens[activeSlide] || null;

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
          &times;
        </button>

        <div className="portfolio-modal__slider">
          <div className={`portfolio-modal__screen ${activeScreen?.src ? 'has-image' : ''}`}>
            {activeScreen?.src ? <img src={activeScreen.src} alt={activeScreen.alt} /> : null}
            <span className="portfolio-modal__counter">
              {t('portfolio.slide')} {activeSlide + 1} / {totalSlides}
            </span>
            {activeScreen?.label ? <strong>{activeScreen.label}</strong> : null}
          </div>

          <div className="portfolio-modal__controls">
            <button type="button" onClick={goToPreviousSlide} aria-label={t('portfolio.previous')}>
              &lsaquo;
            </button>
            <button type="button" onClick={goToNextSlide} aria-label={t('portfolio.next')}>
              &rsaquo;
            </button>
          </div>

          <div className="portfolio-modal__dots" aria-hidden="true">
            {screens.map((screen, index) => (
              <span className={index === activeSlide ? 'is-active' : ''} key={screen.src || screen.label || index} />
            ))}
          </div>
        </div>

        <div className="portfolio-modal__content">
          <p>{project.category}</p>
          <h3 id="portfolio-modal-title">{project.title}</h3>
          <span>{project.description}</span>

          <div className="portfolio-modal__tags">
            {(Array.isArray(project.tags) ? project.tags : []).map((tag) => (
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
