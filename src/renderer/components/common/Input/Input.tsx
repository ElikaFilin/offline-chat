import styles from './input.module.scss';
import getCustomClassNames from '../../../utils';
import { Props } from './interfaces';

export default function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  customClassNames,
  countryCode,
}: Props) {
  const isPhone = type === 'tel';
  const classNames = ['custom-input'];
  if (customClassNames) classNames.push(...customClassNames.split(' '));
  if (isPhone) classNames.push('is-phone-input');

  return (
    <div className={styles.wrapper}>
      {isPhone && (
        <button type="button" className={styles['phone-button']}>
          {countryCode}
        </button>
      )}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        className={getCustomClassNames(classNames, styles).join(' ')}
      />
    </div>
  );
}
