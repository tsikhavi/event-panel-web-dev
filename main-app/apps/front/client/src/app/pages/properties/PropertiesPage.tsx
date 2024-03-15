import React from 'react';
import PropertiesList from '@eventpanel/front/services/components/properties/PropertiesList';
import { useWorkspace } from '@eventpanel/front/services/components/workspaces/WorkspaceProvider/WorkspaceProvider';
import Button from '@eventpanel/front/ui/components/atoms/Buttons/Button/Button';
import { menuItems } from '@eventpanel/front/ui/components/atoms/ContextMenu/__test-data__';
import ContextMenu from '@eventpanel/front/ui/components/atoms/ContextMenu/ContextMenu';
import RoundedSearchField from '@eventpanel/front/ui/components/atoms/Inputs/SearchParts/RoundedSearchField/RoundedSearchField';
import ModalFooter from '@eventpanel/front/ui/components/atoms/Modals/ModalFooter/ModalFooter';
import ModalHeader from '@eventpanel/front/ui/components/atoms/Modals/ModalHeader/ModalHeader';
import { useModal } from '@eventpanel/front/ui/components/atoms/Modals/ModalProvider/ModalProvider';
import PageHeader from '@eventpanel/front/ui/components/organisms/layouts/PageHeader/PageHeader';
import PageLayout from '@eventpanel/front/ui/components/organisms/layouts/PageLayout/PageLayout';
import PropertiesTable from '@eventpanel/front/ui/components/organisms/tables/PropertiesTable/PropertiesTable';

import CreatePropertyForm from './CreatePropertyForm';

const PropertiesPage = () => {
  const { workspace } = useWorkspace();
  const { openSideModal, close: closeModal } = useModal();

  if (!workspace) return null;

  const handleSuccess = (callback: () => void) => {
    closeModal();
    callback();
  };

  return (
    <PropertiesList workspaceId={workspace.id}>
      {({ search, properties: { list, getList } }) => (
        <PageLayout
          Header={
            <PageHeader
              header="Properties"
              Actions={
                <Button
                  label="New Property"
                  onClick={() =>
                    openSideModal(
                      <CreatePropertyForm workspaceId={workspace?.id} onSuccess={() => handleSuccess(getList)} />,
                      <ModalHeader label={'Property'} ContextMenu={<ContextMenu items={menuItems} />} />,
                      <ModalFooter
                        submitLabel={'Create'}
                        CancelButton={<Button variant={'ghost'} label={'Cancel'} onClick={closeModal} />}
                      />
                    )
                  }
                />
              }
              Search={<RoundedSearchField value={search.value} onChange={search.onSearch} placeholder="Search" />}
            />
          }
          Content={<PropertiesTable properties={list} />}
        />
      )}
    </PropertiesList>
  );
};

export default PropertiesPage;
