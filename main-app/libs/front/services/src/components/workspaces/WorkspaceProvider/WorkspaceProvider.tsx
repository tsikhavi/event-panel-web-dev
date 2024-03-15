import React, { createContext, FC, useContext } from 'react';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';

import useLocalStorage from '../../../hooks/useLocalStorage';

type WorkspaceContextProps = {
  workspace: WorkspaceDto | null;
  setWorkspace: (data: WorkspaceDto) => void;
  clearWorkspace: () => void;
};

export type WorkspaceProviderProps = {
  children: React.ReactNode;
};

const WorkspaceContext = createContext<WorkspaceContextProps | null>(null);

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) throw new Error('useWorkspace must be used within an WorkspaceProvider');

  return context;
}

const WorkspaceProvider: FC<WorkspaceProviderProps> = ({ children }) => {
  const [workspace, setWorkspace] = useLocalStorage<WorkspaceDto | null>('WORKSPACE', null);

  return (
    <WorkspaceContext.Provider value={{ workspace, setWorkspace, clearWorkspace: () => setWorkspace(null) }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceProvider;
