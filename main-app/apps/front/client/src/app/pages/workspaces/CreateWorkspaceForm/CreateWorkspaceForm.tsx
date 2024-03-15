import React, { FC } from 'react';
import FieldContainer from '@eventpanel/front/services/components/form/FieldContainer';
import CreateWorkspace from '@eventpanel/front/services/components/workspaces/CreateWorkspace/CreateWorkspace';
import Button from '@eventpanel/front/ui/components/atoms/Buttons/Button/Button';
import TextField from '@eventpanel/front/ui/components/atoms/Inputs/TextField/TextField';
import Loader from '@eventpanel/front/ui/components/atoms/Loader/Loader';
import Alert from '@eventpanel/front/ui/components/atoms/Messages/Alert/Alert';
import Paper from '@eventpanel/front/ui/components/atoms/Paper/Paper';
import Typography from '@eventpanel/front/ui/components/atoms/Typography/Typography';
import { WorkspaceDto } from '@eventpanel/shared/dto/workspaces/workspace.dto';

import useStyles from './CreateWorkspaceForm.styles';

type CreateWorkspaceFormProps = {
  onSuccess: (data: WorkspaceDto) => void;
};

const CreateWorkspaceForm: FC<CreateWorkspaceFormProps> = ({ onSuccess }) => {
  const { classes } = useStyles();

  return (
    <CreateWorkspace
      onSuccess={onSuccess}
      render={({ field, error, isLoading }) => (
        <Paper className={classes.root}>
          <Loader isLoading={isLoading} />

          <Typography variant="h2" className={classes.alignCenter}>
            Create Workspace
          </Typography>

          {error && <Alert variant="error" message={error} />}

          <FieldContainer
            {...field}
            name="name"
            render={(props) => <TextField {...props} autoFocus type="text" label="Workspace Name" />}
          />

          <Button fullWidth type="submit" label="Create" />
        </Paper>
      )}
    />
  );
};

export default CreateWorkspaceForm;
