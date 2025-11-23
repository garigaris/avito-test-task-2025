import React, { createContext, useContext, useState } from 'react';

interface AppContextProps {
  totalItems: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  filteredIds: number[];
  setFilteredIds: React.Dispatch<React.SetStateAction<number[]>>;
  currentId: number | null;
  setCurrentId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AppContext = createContext<AppContextProps | null>(null);

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [filteredIds, setFilteredIds] = useState<number[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);

  return (
    <AppContext.Provider
      value={{ totalItems, setTotalItems, filteredIds, setFilteredIds, currentId, setCurrentId }}
    >
      {children}
    </AppContext.Provider>
  );
};