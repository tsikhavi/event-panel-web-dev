import { FC, useEffect } from 'react';
import { useCreateGroup } from '@eventpanel/front/api';
import { CreateGroupDto } from '@eventpanel/shared/dto/groups/create-group.dto';
import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';

import FormContainer, { FormContainerRenderProps } from '../form/FormContainer';

type RenderPros = {
  field: FormContainerRenderProps<CreateGroupDto>;
  isLoading: boolean;
  error: string | null;
};

export type CreateGroupProps = {
  workspaceId: string;
  onSuccess: (data: GroupDto) => void;
  render: (props: RenderPros) => JSX.Element;
};

const CreateGroup: FC<CreateGroupProps> = ({ workspaceId, onSuccess, render }) => {
  const { group, createGroup, isLoading, error, status } = useCreateGroup();

  useEffect(() => {
    if (status === 'success' && group) {
      onSuccess(group);
    }
  }, [group, onSuccess, status]);

  return (
    <FormContainer
      initForm={{ workspaceId, name: '' }}
      onSubmit={createGroup}
      Resolver={CreateGroupDto}
      render={(field) => render({ field, isLoading, error })}
    />
  );
};

export default CreateGroup;
