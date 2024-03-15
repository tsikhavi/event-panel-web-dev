import { FC, useEffect } from 'react';
import { useCreateCategory } from '@eventpanel/front/api';
import { CategoryDto } from '@eventpanel/shared/dto/categories/category.dto';
import { CreateCategoryDto } from '@eventpanel/shared/dto/categories/create-category.dto';

import FormContainer, { FormContainerRenderProps } from '../form/FormContainer';

type RenderPros = {
  field: FormContainerRenderProps<CreateCategoryDto>;
  isLoading: boolean;
  error: string | null;
};

export type CreateCategoryProps = {
  workspaceId: string;
  onSuccess: (data: CategoryDto) => void;
  render: (props: RenderPros) => JSX.Element;
};

const CreateCategory: FC<CreateCategoryProps> = ({ workspaceId, onSuccess, render }) => {
  const { category, createCategory, isLoading, error, status } = useCreateCategory();

  useEffect(() => {
    if (status === 'success' && category) {
      onSuccess(category);
    }
  }, [category, onSuccess, status]);

  return (
    <FormContainer
      initForm={{ workspaceId, name: '' }}
      onSubmit={createCategory}
      Resolver={CreateCategoryDto}
      render={(field) => render({ field, isLoading, error })}
    />
  );
};

export default CreateCategory;
