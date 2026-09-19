import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a href="#top" aria-label="Artem Hrishyn">
          AH
        </a>
        <p>{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
