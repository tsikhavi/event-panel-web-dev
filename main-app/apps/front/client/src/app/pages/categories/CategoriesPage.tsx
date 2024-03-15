import React from 'react';
import CategoriesList from '@eventpanel/front/services/components/categories/CategoriesList';
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
import CategoriesTable from '@eventpanel/front/ui/components/organisms/tables/CategoriesTable/CategoriesTable';

import CreateCategoryForm from './CreateCategoryForm';

const CategoriesPage = () => {
  const { workspace } = useWorkspace();
  const { openSideModal, close: closeModal } = useModal();

  if (!workspace) return null;

  const handleSuccess = (callback: () => void) => {
    closeModal();
    callback();
  };

  return (
    <CategoriesList workspaceId={workspace.id}>
      {({ search, categories: { list, getList } }) => (
        <PageLayout
          Header={
            <PageHeader
              header="Categories"
              Search={<RoundedSearchField value={search.value} onChange={search.onSearch} placeholder="Search" />}
              Actions={
                <Button
                  label="New Category"
                  onClick={() =>
                    openSideModal(
                      <CreateCategoryForm workspaceId={workspace?.id} onSuccess={() => handleSuccess(getList)} />,
                      <ModalHeader label={'Category'} ContextMenu={<ContextMenu items={menuItems} />} />,
                      <ModalFooter
                        submitLabel={'Create'}
                        CancelButton={<Button variant={'ghost'} label={'Cancel'} onClick={closeModal} />}
                      />
                    )
                  }
                />
              }
            />
          }
          Content={<CategoriesTable categories={list} />}
        />
      )}
    </CategoriesList>
  );
};

export default CategoriesPage;
