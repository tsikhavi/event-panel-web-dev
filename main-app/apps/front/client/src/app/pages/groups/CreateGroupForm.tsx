import React, { FC } from 'react';
import FieldContainer from '@eventpanel/front/services/components/form/FieldContainer';
import CreateGroup from '@eventpanel/front/services/components/groups/CreateGroup';
import Button from '@eventpanel/front/ui/components/atoms/Buttons/Button/Button';
import Grid from '@eventpanel/front/ui/components/atoms/Grid/Grid';
import TextField from '@eventpanel/front/ui/components/atoms/Inputs/TextField/TextField';
import Alert from '@eventpanel/front/ui/components/atoms/Messages/Alert/Alert';

type CreateGroupFormProps = {
  workspaceId: string;
  onSuccess: () => void;
};

const CreateGroupForm: FC<CreateGroupFormProps> = (props) => {
  return (
    <CreateGroup
      {...props}
      render={({ field, error }) => (
        <Grid container direction="column" gap={8}>
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
                <TextField {...other} autoFocus label="Group Name" value={value as string} />
              )}
            />
          </Grid>

          <Grid item>
            <Button fullWidth type="submit" label="Add Group" />
          </Grid>
        </Grid>
      )}
    />
  );
};

export default CreateGroupForm;
