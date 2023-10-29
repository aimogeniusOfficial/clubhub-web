import { useForm } from '@mantine/form';
import { Stack, TextInput, Radio, Group, Button } from '@mantine/core';
import React, { ReactElement } from 'react';
import { modals } from '@mantine/modals';
import useCreateGrowerCultivar from 'hooks/grower-cultivars/useCreateGrowerCultivar';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface FormValues {
  name: string;
  description: string;
  seedType: string;
  growthType: string;
}

const CreateGrowerCultivarModal = (): ReactElement => {
  const createGrowerCultivarMutation = useCreateGrowerCultivar();
  const closeModal = (): void => modals.closeAll();

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      description: '',
      seedType: '',
      growthType: '',
    },
  });

  const handleSubmit = (formData: FormValues): void => {
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
        <TextInput label='Add name' placeholder='Name' required {...form.getInputProps('name')} />
        <TextInput
          label='Add description'
          placeholder='Description'
          required
          {...form.getInputProps('description')}
        />
        <Radio.Group label='Select Seed Type' required {...form.getInputProps('seedType')}>
          <Stack mt='xs'>
            <Radio value='REGULAR' label='Regular' />
            <Radio value='FEMINIZED' label='Feminized' />
          </Stack>
        </Radio.Group>

        <Radio.Group label='Select Growth Type' required {...form.getInputProps('growthType')}>
          <Stack mt='xs'>
            <Radio value='PHOTOPERIOD' label='Photoperiod' />
            <Radio value='AUTOFLOWER' label='Autoflower' />
          </Stack>
        </Radio.Group>
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
export default CreateGrowerCultivarModal;
