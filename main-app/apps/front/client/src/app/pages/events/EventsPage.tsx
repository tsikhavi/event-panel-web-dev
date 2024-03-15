import React from 'react';
import EventsList from '@eventpanel/front/services/components/events/EventsList';
import { useWorkspace } from '@eventpanel/front/services/components/workspaces/WorkspaceProvider/WorkspaceProvider';
import Button from '@eventpanel/front/ui/components/atoms/Buttons/Button/Button';
import ButtonGroup from '@eventpanel/front/ui/components/atoms/Buttons/ButtonGroup/ButtonGroup';
import { menuItems } from '@eventpanel/front/ui/components/atoms/ContextMenu/__test-data__';
import ContextMenu from '@eventpanel/front/ui/components/atoms/ContextMenu/ContextMenu';
import Grid from '@eventpanel/front/ui/components/atoms/Grid/Grid';
import Filter from '@eventpanel/front/ui/components/atoms/Inputs/SearchParts/Filter/Filter';
import RoundedSearchField from '@eventpanel/front/ui/components/atoms/Inputs/SearchParts/RoundedSearchField/RoundedSearchField';
import ModalFooter from '@eventpanel/front/ui/components/atoms/Modals/ModalFooter/ModalFooter';
import ModalHeader from '@eventpanel/front/ui/components/atoms/Modals/ModalHeader/ModalHeader';
import { useModal } from '@eventpanel/front/ui/components/atoms/Modals/ModalProvider/ModalProvider';
import PageHeader from '@eventpanel/front/ui/components/organisms/layouts/PageHeader/PageHeader';
import PageLayout from '@eventpanel/front/ui/components/organisms/layouts/PageLayout/PageLayout';
import EventsTable from '@eventpanel/front/ui/components/organisms/tables/EventsTable/EventsTable';

import CreateCategoryForm from '../categories/CreateCategoryForm';

import CreateEventForm from './CreateEventForm';

const EventsPage = () => {
  const { workspace } = useWorkspace();
  const { openSideModal, close: closeModal } = useModal();

  if (!workspace) return null;

  const handleSuccess = (callback: () => void) => {
    closeModal();
    callback();
  };

  return (
    <EventsList workspaceId={workspace.id}>
      {({ search, categoriesFilter, sourcesFilter, tagsFilter, events: { list, getList }, sources }) => (
        <PageLayout
          Header={
            <PageHeader
              header="Events"
              Actions={
                <ButtonGroup>
                  <Button
                    variant="contained"
                    label="Add Event"
                    onClick={() =>
                      openSideModal(
                        <CreateEventForm
                          workspaceId={workspace?.id}
                          sources={sources}
                          onSuccess={() => handleSuccess(getList)}
                        />,
                        <ModalHeader label={'Event'} ContextMenu={<ContextMenu items={menuItems} />} />,
                        <ModalFooter
                          submitLabel={'Create'}
                          CancelButton={<Button variant={'ghost'} label={'Cancel'} onClick={closeModal} />}
                        />
                      )
                    }
                  />
                  <Button
                    variant="outlined"
                    label="Add category"
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
                </ButtonGroup>
              }
              Search={
                <RoundedSearchField value={search.value} onChange={search.onSearch} placeholder="Search" withFocus />
              }
              Filters={
                <Grid container gap={3}>
                  <Filter
                    {...categoriesFilter}
                    withSearch
                    label="Categories"
                    placeholder={'Search categories...'}
                    withFocus
                  />
                  <Filter {...sourcesFilter} label="Sources" />
                  <Filter {...tagsFilter} label="Tags" />
                </Grid>
              }
            />
          }
          Content={<EventsTable events={list} />}
        />
      )}
    </EventsList>
  );
};

export default EventsPage;
