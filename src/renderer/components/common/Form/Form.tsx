import styles from './form.module.scss';
import SignUpImage from '../../../../../assets/images/sign-up.svg';
import { Props } from './interfaces';
import Button from '../Button/Button';
import useTranslate from '../../../hooks/useTranslate';

export default function Form({
  children,
  handleNext,
  isLoading,
  disabledButton,
  buttonClassName,
}: Props) {
  const t = useTranslate();

  return (
    <div className={styles.wrapper}>
      <form className={styles.onboarding}>
        <img src={SignUpImage} alt="sing up" />
        {children}
        <Button
          onClick={handleNext}
          text={!isLoading ? t('Next') : t('Loading...')}
          disabled={disabledButton}
          buttonClassNames={buttonClassName}
        />
      </form>
    </div>
  );
}
