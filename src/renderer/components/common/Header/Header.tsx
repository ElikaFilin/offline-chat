import styles from './header.module.scss';
import { Props } from './interfaces';
import getCustomClassNames from '../../../utils';

export default function Header({ customClassNames, children }: Props) {
  const classNames = ['title'];
  if (customClassNames) classNames.push(...customClassNames.split(' '));

  return (
    <span className={getCustomClassNames(classNames, styles).join(' ')}>
      {children}
    </span>
  );
}
