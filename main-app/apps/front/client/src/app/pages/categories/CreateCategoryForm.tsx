import React, { FC } from 'react';
import CreateCategory from '@eventpanel/front/services/components/categories/CreateCategory';
import EventGroup from '@eventpanel/front/services/components/events/EventGroup';
import FieldContainer from '@eventpanel/front/services/components/form/FieldContainer';
import { menuItems } from '@eventpanel/front/ui/components/atoms/ContextMenu/__test-data__';
import ContextMenu from '@eventpanel/front/ui/components/atoms/ContextMenu/ContextMenu';
import Entity from '@eventpanel/front/ui/components/atoms/Entity/Entity';
import Grid from '@eventpanel/front/ui/components/atoms/Grid/Grid';
import SearchField from '@eventpanel/front/ui/components/atoms/Inputs/SearchField/SearchField';
import TextField from '@eventpanel/front/ui/components/atoms/Inputs/TextField/TextField';
import Alert from '@eventpanel/front/ui/components/atoms/Messages/Alert/Alert';

type CreateCategoryFormProps = {
  workspaceId: string;
  onSuccess: () => void;
};

const CreateCategoryForm: FC<CreateCategoryFormProps> = (props) => {
  return (
    <CreateCategory
      {...props}
      render={({ field, error }) => (
        <Grid container direction="column" gap={3}>
          {error && (
            <Grid item>
              <Alert variant="error" message={error} />
            </Grid>
          )}

          <Grid item>
            <FieldContainer
              {...field}
              name="name"
              render={({ value, ...other }) => (
                <TextField {...other} autoFocus label="Name" placeholder="Name" value={value as string} />
              )}
            />
          </Grid>

          <Grid item>
            <FieldContainer
              {...field}
              name="description"
              render={({ value, ...other }) => (
                <TextField {...other} label="Description" placeholder="Description" value={value as string} textArea />
              )}
            />
          </Grid>

          <Grid item>
            <EventGroup workspaceId={props.workspaceId}>
              {({ selectedEvents, ...props }) => (
                <Grid container direction={'column'} gap={2}>
                  <SearchField {...props} label={'Events'} placeholder={'Add event'} />
                  {selectedEvents.map((event) => (
                    <Entity key={event.id} name={event.name} ContextMenu={<ContextMenu items={menuItems} />} />
                  ))}
                </Grid>
              )}
            </EventGroup>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default CreateCategoryForm;
