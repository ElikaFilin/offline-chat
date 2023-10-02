import { useCallback, useEffect, useRef } from 'react';
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
  onSubmit,
}: Props) {
  const isPhone = type === 'tel';
  const classNames = ['custom-input'];
  if (customClassNames) classNames.push(...customClassNames.split(' '));
  if (isPhone) classNames.push('is-phone-input');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitListener = useCallback(
    (event) => {
      if (event.keyCode === 13 && onSubmit) {
        event.preventDefault();
        onSubmit();
      }
    },
    [onSubmit]
  );

  useEffect(() => {
    const inputElement = inputRef.current;

    if (onSubmit) inputElement?.addEventListener('keydown', submitListener);

    return () => {
      if (onSubmit)
        inputElement?.removeEventListener('keydown', submitListener);
    };
  }, [submitListener, onSubmit]);

  return (
    <div className={styles.wrapper}>
      {isPhone && (
        <button type="button" className={styles['phone-button']}>
          {countryCode}
        </button>
      )}
      <input
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        className={getCustomClassNames(classNames, styles).join(' ')}
      />
    </div>
  );
}
