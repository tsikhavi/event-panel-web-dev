import { useWorkspace } from '@eventpanel/front/services/components/workspaces/WorkspaceProvider/WorkspaceProvider';
import WorkspacesList from '@eventpanel/front/services/components/workspaces/WorkspacesList/WorkspacesList';
import { useModal } from '@eventpanel/front/ui/components/atoms/Modals/ModalProvider/ModalProvider';
import { default as WorkspacesListUI } from '@eventpanel/front/ui/components/organisms/workspaces/WorkspacesList/WorkspacesList';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';

import CreateWorkspaceForm from './CreateWorkspaceForm/CreateWorkspaceForm';

const WorkspacesPage = () => {
  const { setWorkspace } = useWorkspace();
  const { openModal, close: closeModal } = useModal();

  const handleSuccess = (callback: () => void) => (data: WorkspaceDto) => {
    setWorkspace(data);
    closeModal();
    callback();
  };

  return (
    <WorkspacesList
      render={({ workspaces, isLoading, loadWorkspacesList }) => (
        <WorkspacesListUI
          isLoading={isLoading}
          onAddWorkspace={() => openModal(<CreateWorkspaceForm onSuccess={handleSuccess(loadWorkspacesList)} />)}
        >
          {workspaces.map((workspace) => (
            <WorkspacesListUI.Item key={workspace.id} onClick={() => setWorkspace(workspace)}>
              {workspace.name}
            </WorkspacesListUI.Item>
          ))}
        </WorkspacesListUI>
      )}
    />
  );
};

export default WorkspacesPage;
