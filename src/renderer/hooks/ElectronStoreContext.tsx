import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ElectronStoreContextType = {
  forceRerender: () => void;
};

const ElectronStoreContext = createContext<ElectronStoreContextType | null>(
  null
);

export const useElectronStore = () => {
  const context = useContext(ElectronStoreContext);
  if (!context) {
    throw new Error(
      'useElectronStore must be used within an ElectronStoreProvider'
    );
  }
  return context;
};

export function ElectronStoreProvider({ children }: { children: ReactNode }) {
  const [, setValue] = useState(0);

  const forceRerender = useCallback(() => {
    setValue((prevState) => prevState + 1); // force update the component
  }, []);

  const forceRenderProviderValue = useMemo(
    () => ({ forceRerender }),
    [forceRerender]
  );

  return (
    <ElectronStoreContext.Provider value={forceRenderProviderValue}>
      {children}
    </ElectronStoreContext.Provider>
  );
}
