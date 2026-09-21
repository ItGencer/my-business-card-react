import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" aria-label="Artem Hrishyn">
          AH
        </a>
        <p>{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
