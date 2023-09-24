import { SyntheticEvent, useState } from 'react';

type Handler = (e?: SyntheticEvent) => any;

export default function useClickOnce() {
  const [isClicked, setIsClicked] = useState(false);

  return {
    startClick(wrappedOnClick: Handler) {
      return function inner(e?: SyntheticEvent) {
        if (isClicked) return;
        setIsClicked(true);
        // eslint-disable-next-line consistent-return
        return wrappedOnClick(e);
      };
    },
    resetClick() {
      setIsClicked(false);
    },
  };
}
