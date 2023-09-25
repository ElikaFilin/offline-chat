import { ReactElement } from 'react';

export interface Props {
  children: ReactElement;
  handleNext: () => void;
  isLoading: boolean;
  disabledButton: boolean;
  buttonClassName: string;
}
