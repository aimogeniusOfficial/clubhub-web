import { useForm } from '@mantine/form';
import { Stack, TextInput, Group, Button } from '@mantine/core';
import React, { ReactElement } from 'react';
import { modals } from '@mantine/modals';
import useCreateGrowerCultivar from 'hooks/grower-cultivars/useCreateGrowerCultivar';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface CreateOtherPlantGrowerCultivarFormValues {
  name: string;
  description: string;
  plantType: string;
}

const CreateOtherPlantGrowerCultivarModal = (): ReactElement => {
  const createGrowerCultivarMutation = useCreateGrowerCultivar();
  const closeModal = (): void => modals.closeAll();

  const form = useForm<CreateOtherPlantGrowerCultivarFormValues>({
    initialValues: {
      name: '',
      description: '',
      plantType: '',
    },
  });

  const handleSubmit = (formData: CreateOtherPlantGrowerCultivarFormValues): void => {
    createGrowerCultivarMutation.mutate(formData, {
      onSuccess: () => {
        showSuccessNotification('Cultivar successfully created.');
        form.reset();
        modals.closeAll();
      },
      onError: error => {
        showErrorNotification('Failed to create cultivar', error.message);
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label='Plant Type'
          placeholder='Plant'
          required
          {...form.getInputProps('plantType')}
        />
        <TextInput
          label='Cultivar Name'
          placeholder='Name'
          required
          {...form.getInputProps('name')}
        />
        <TextInput
          label='Description'
          placeholder='Description'
          {...form.getInputProps('description')}
        />

        <Group position='right'>
          <Button onClick={closeModal} type='button' size='md' variant='secondary'>
            Cancel
          </Button>
          <Button type='submit' size='md'>
            Create
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
export default CreateOtherPlantGrowerCultivarModal;
