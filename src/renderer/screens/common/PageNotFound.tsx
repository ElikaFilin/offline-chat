// todo - implement NotFound page
import useTranslate from '../../hooks/useTranslate';

export default function PageNotFound() {
  const t = useTranslate();
  return <h3>{t('Page Not Found')}</h3>;
}
