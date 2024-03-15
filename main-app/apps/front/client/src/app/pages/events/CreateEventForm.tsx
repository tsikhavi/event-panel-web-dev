import React, { FC } from 'react';
import CategoriesGroup from '@eventpanel/front/services/components/categories/CategoriesGroup';
import CreateEvent from '@eventpanel/front/services/components/events/CreateEvent';
import FieldContainer from '@eventpanel/front/services/components/form/FieldContainer';
import PropertiesGroup from '@eventpanel/front/services/components/properties/PropertiesGroup';
import { useSelectInput } from '@eventpanel/front/services/hooks/useSelectInput';
import { menuItems } from '@eventpanel/front/ui/components/atoms/ContextMenu/__test-data__';
import ContextMenu from '@eventpanel/front/ui/components/atoms/ContextMenu/ContextMenu';
import Entity from '@eventpanel/front/ui/components/atoms/Entity/Entity';
import Grid from '@eventpanel/front/ui/components/atoms/Grid/Grid';
import FileInput from '@eventpanel/front/ui/components/atoms/Inputs/FileInput/FileInput';
import SearchField from '@eventpanel/front/ui/components/atoms/Inputs/SearchField/SearchField';
import SelectField from '@eventpanel/front/ui/components/atoms/Inputs/SelectField/SelectField';
import TextField from '@eventpanel/front/ui/components/atoms/Inputs/TextField/TextField';
import Alert from '@eventpanel/front/ui/components/atoms/Messages/Alert/Alert';
import Property from '@eventpanel/front/ui/components/atoms/Property/Property';
import { Source } from '@eventpanel/shared/dto/events/source.dto';

type CreateEventFormProps = {
  workspaceId: string;
  sources: Source[];
  onSuccess: () => void;
};

const CreateEventForm: FC<CreateEventFormProps> = (props) => {
  const sourcesSelect = useSelectInput(props.sources);
  return (
    <CreateEvent
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
                <TextField {...other} autoFocus label="Name" placeholder={'Name'} value={value as string} />
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
            <FileInput label={'Screenshot'} />
          </Grid>

          <Grid item>
            <SelectField {...sourcesSelect} label={'Sources'} placeholder={'Sources'} multiple />
          </Grid>

          <PropertiesGroup workspaceId={props.workspaceId}>
            {({ selectedProperties, ...props }) => (
              <Grid container direction={'column'} gap={2}>
                <Grid item>
                  <SearchField {...props} label={'Properties'} placeholder={'Add property'} />
                </Grid>

                {selectedProperties.map((property) => (
                  <Grid item>
                    <Property
                      key={property.id}
                      name={property.name}
                      type={'String'}
                      ContextMenu={<ContextMenu items={menuItems} />}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </PropertiesGroup>

          <CategoriesGroup workspaceId={props.workspaceId}>
            {({ selectedCategories, ...props }) => (
              <Grid container direction={'column'} gap={2}>
                <SearchField {...props} label={'Categories'} placeholder={'Add category'} />
                {selectedCategories.map((category) => (
                  <Entity key={category.id} name={category.name} ContextMenu={<ContextMenu items={menuItems} />} />
                ))}
              </Grid>
            )}
          </CategoriesGroup>
        </Grid>
      )}
    />
  );
};

export default CreateEventForm;
