import React from 'react';
import GroupsList from '@eventpanel/front/services/components/groups/GroupsList';
import { useWorkspace } from '@eventpanel/front/services/components/workspaces/WorkspaceProvider/WorkspaceProvider';
import Button from '@eventpanel/front/ui/components/atoms/Buttons/Button/Button';
import RoundedSearchField from '@eventpanel/front/ui/components/atoms/Inputs/SearchParts/RoundedSearchField/RoundedSearchField';
import { useModal } from '@eventpanel/front/ui/components/atoms/Modals/ModalProvider/ModalProvider';
import Typography from '@eventpanel/front/ui/components/atoms/Typography/Typography';
import PageHeader from '@eventpanel/front/ui/components/organisms/layouts/PageHeader/PageHeader';
import PageLayout from '@eventpanel/front/ui/components/organisms/layouts/PageLayout/PageLayout';
import GroupsTable from '@eventpanel/front/ui/components/organisms/tables/GroupsTable/GroupsTable';

import CreateGroupForm from './CreateGroupForm';

const GroupsPage = () => {
  const { workspace } = useWorkspace();
  const { openSideModal } = useModal();

  if (!workspace) return null;

  return (
    <GroupsList workspaceId={workspace.id}>
      {({ search, groups: { list, getList } }) => (
        <PageLayout
          Header={
            <PageHeader
              header="Groups"
              Actions={
                <Button
                  label="New Group"
                  onClick={() =>
                    openSideModal(
                      <CreateGroupForm workspaceId={workspace?.id} onSuccess={getList} />,
                      <Typography variant="h3">Add New Group</Typography>
                    )
                  }
                />
              }
              Search={<RoundedSearchField value={search.value} onChange={search.onSearch} placeholder="Search" />}
            />
          }
          Content={<GroupsTable groups={list} />}
        />
      )}
    </GroupsList>
  );
};

export default GroupsPage;
