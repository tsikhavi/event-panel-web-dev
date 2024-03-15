import { useAuth } from '../components/auth/AuthProvider/AuthProvider';
import { useWorkspace } from '../components/workspaces/WorkspaceProvider/WorkspaceProvider';

export function useLogout() {
  const { logout } = useAuth();
  const { clearWorkspace } = useWorkspace();

  return () => {
    clearWorkspace();
    logout();
  };
}
