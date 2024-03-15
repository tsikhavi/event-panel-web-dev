import React, { FC } from 'react';
import FieldContainer from '@eventpanel/front/services/components/form/FieldContainer';
import CreateProperty from '@eventpanel/front/services/components/properties/CreateProperty';
import { useSelectInput } from '@eventpanel/front/services/hooks/useSelectInput';
import Grid from '@eventpanel/front/ui/components/atoms/Grid/Grid';
import SelectField from '@eventpanel/front/ui/components/atoms/Inputs/SelectField/SelectField';
import TextField from '@eventpanel/front/ui/components/atoms/Inputs/TextField/TextField';
import Alert from '@eventpanel/front/ui/components/atoms/Messages/Alert/Alert';
import { optionalityOptions, typeOptions } from '@eventpanel/front/ui/components/atoms/Modals/SideModal/__test-data__';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';

type CreatePropertyFormProps = {
  workspaceId: string;
  onSuccess: (data: PropertyDto) => void;
};

const CreatePropertyForm: FC<CreatePropertyFormProps> = (props) => {
  const typeSelect = useSelectInput(typeOptions);
  const optionalitySelect = useSelectInput(optionalityOptions);
  return (
    <CreateProperty
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
              render={({ value, ...props }) => (
                <TextField {...props} autoFocus label="Name" placeholder="Name" value={value as string} />
              )}
            />
          </Grid>

          <Grid item>
            <FieldContainer
              {...field}
              name="description"
              render={({ value, ...props }) => (
                <TextField {...props} label="Description" placeholder="Description" value={value as string} textArea />
              )}
            />
          </Grid>

          <Grid item>
            <SelectField {...typeSelect} label={'Type'} placeholder={'Type'} />
          </Grid>

          <Grid item>
            <SelectField {...optionalitySelect} label={'Optionality'} placeholder={'Optionality'} />
          </Grid>
        </Grid>
      )}
    />
  );
};

export default CreatePropertyForm;
