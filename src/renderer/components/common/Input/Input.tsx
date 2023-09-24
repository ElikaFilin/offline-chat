import styles from './input.module.scss';
import getCustomClassNames from '../../../utils';
import { Props } from './interfaces';

export default function Input({
  placeholder,
  value,
  onChange,
  name,
  type,
  customClassNames,
}: Props) {
  const isPhone = type === 'tel';
  const classNames = ['custom-input'];
  if (customClassNames) classNames.push(...customClassNames.split(' '));

  return (
    <div className={styles.wrapper}>
      {isPhone && (
        <button type="button" className={styles['phone-button']}>
          +1
        </button>
      )}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        className={getCustomClassNames(classNames, styles).join(' ')}
      />
    </div>
  );
}
