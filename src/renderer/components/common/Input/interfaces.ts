import { ChangeEvent } from 'react';

export interface Props {
  placeholder: string;
  value: string;
  onChange: (e?: ChangeEvent) => void;
  name?: string;
  type?: string;
  customClassNames?: string;
  countryCode?: string;
}
