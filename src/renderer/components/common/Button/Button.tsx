import { Props } from './interfaces';
import styles from './button.module.scss';
import getCustomClassNames from '../../../utils';

export default function Button({
  onClick,
  text,
  buttonClassNames,
  textClassNames,
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
    >
      <span
        className={getCustomClassNames(defaultTextClassNames, styles).join(' ')}
      >
        {text}
      </span>
    </button>
  );
}
