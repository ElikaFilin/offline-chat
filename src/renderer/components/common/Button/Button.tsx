import { Props } from './interfaces';
import styles from './button.module.scss';
import getCustomClassNames from '../../../utils';

export default function Button({
  onClick,
  text,
  buttonClassNames,
  textClassNames,
  disabled = false,
  icon,
}: Props) {
  const defaultButtonClassNames = ['default-button'];
  const defaultTextClassNames = ['default-text-button'];
  if (buttonClassNames)
    defaultButtonClassNames.push(...buttonClassNames.split(' '));
  if (textClassNames) defaultTextClassNames.push(...textClassNames.split(' '));

  return (
    <button
      className={getCustomClassNames(defaultButtonClassNames, styles).join(' ')}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {text && (
        <span
          className={getCustomClassNames(defaultTextClassNames, styles).join(
            ' '
          )}
        >
          {text}
        </span>
      )}
      {icon && <img src={icon} alt="icon" />}
    </button>
  );
}
