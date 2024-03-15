import { useWorkspace } from './WorkspaceProvider';

type Type = ReturnType<typeof useWorkspace>;
export const mockUseWorkspace = (args: Partial<Type> = {}): Type => ({
  workspace: null,
  setWorkspace: () => {},
  clearWorkspace: () => {},
  ...args,
});
