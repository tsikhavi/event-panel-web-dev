import { FC, useEffect } from 'react';
import { useCreateProperty } from '@eventpanel/front/api';
import { CreatePropertyDto } from '@eventpanel/shared/dto/properties/create-property.dto';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';

import FormContainer, { FormContainerRenderProps } from '../form/FormContainer';

type RenderPros = {
  field: FormContainerRenderProps<CreatePropertyDto>;
  isLoading: boolean;
  error: string | null;
};

export type CreatePropertyProps = {
  workspaceId: string;
  onSuccess: (data: PropertyDto) => void;
  render: (props: RenderPros) => JSX.Element;
};

const CreateProperty: FC<CreatePropertyProps> = ({ workspaceId, onSuccess, render }) => {
  const { property, createProperty, isLoading, error, status } = useCreateProperty();

  useEffect(() => {
    if (status === 'success' && property) {
      onSuccess(property);
    }
  }, [property, onSuccess, status]);

  return (
    <FormContainer
      initForm={{ workspaceId, name: '' }}
      onSubmit={createProperty}
      Resolver={CreatePropertyDto}
      render={(field) => render({ field, isLoading, error })}
    />
  );
};

export default CreateProperty;
