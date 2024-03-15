import React from 'react';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';

import { fireEvent, render, renderHook } from '../../../../jest.setup';
import { customRender } from '../../../test-utils';

import WorkspaceProvider, { useWorkspace } from './WorkspaceProvider';

const setWorkspaceButton = 'Set Workspace';
const clearWorkspaceButton = 'Clear Workspace';
const mockWorkspace: WorkspaceDto = {
  id: 'workspaceId',
  name: 'Workspace Name',
  maxNumberOfMembers: 99,
  expiredDate: null,
};

const TestComponent = () => {
  const { workspace, setWorkspace, clearWorkspace } = useWorkspace();
  return (
    <>
      <p>{workspace?.name}</p>
      <button type="button" onClick={() => setWorkspace(mockWorkspace)}>
        {setWorkspaceButton}
      </button>
      <button type="button" onClick={() => clearWorkspace()}>
        {clearWorkspaceButton}
      </button>
    </>
  );
};

describe('WorkspaceProvider', () => {
  it('should render children', () => {
    const children = 'children';

    const { getByText } = render(
      <WorkspaceProvider>
        <div>{children}</div>
      </WorkspaceProvider>
    );

    expect(getByText(children)).toBeInTheDocument();
  });

  describe('useWorkspace', () => {
    it('should throw an error if used outside of the WorkspaceProvider', () => {
      jest.spyOn(React, 'useContext').mockReturnValue(undefined);

      const { result } = renderHook(() => useWorkspace());

      expect(result.error).toEqual(new Error('useWorkspace must be used within an WorkspaceProvider'));
    });

    it('should call setWorkspace', () => {
      const { getByRole, getByText, queryByText } = customRender(<TestComponent />);

      expect(queryByText(mockWorkspace.name)).not.toBeInTheDocument();

      fireEvent.click(getByRole('button', { name: setWorkspaceButton }));
      expect(getByText(mockWorkspace.name)).toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('WORKSPACE') || '')).toEqual(mockWorkspace);
    });

    it('should call clearWorkspace', () => {
      const { getByRole, getByText, queryByText } = customRender(<TestComponent />);

      fireEvent.click(getByRole('button', { name: setWorkspaceButton }));
      expect(getByText(mockWorkspace.name)).toBeInTheDocument();

      fireEvent.click(getByRole('button', { name: clearWorkspaceButton }));
      expect(queryByText(mockWorkspace.name)).not.toBeInTheDocument();
      expect(localStorage.getItem('WORKSPACE')).toBeNull();
    });
  });
});
