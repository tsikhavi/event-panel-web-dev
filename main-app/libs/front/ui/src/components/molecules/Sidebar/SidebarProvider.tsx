import React, { createContext, FC, useContext, useState } from 'react';

type SidebarContextProps = {
  currentPage: string | null;
  setCurrentPage: (page: string) => void;
};

type SidebarProviderProps = {
  children?: React.ReactNode;
};

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) throw new Error('useSidebar must be used within a SidebarProvider');

  return context;
}

const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  return <SidebarContext.Provider value={{ currentPage, setCurrentPage }}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
