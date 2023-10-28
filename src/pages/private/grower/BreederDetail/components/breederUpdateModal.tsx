import React, { useEffect } from 'react';

import { Modal, ModalProps, Group, Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import useUpdateBreeder from 'hooks/breeders/useUpdateBreeder';
import { BreederRow, BreederInsert } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface IBreederDeleteModalProps extends ModalProps {
  breeder: BreederRow;
}
const BreederDeleteModal = ({
  opened,
  onClose,
  breeder,
}: IBreederDeleteModalProps): JSX.Element => {
  const updateBreeder = useUpdateBreeder();

  const initialValues = {
    id: breeder.id,
    name: breeder.name,
    country: breeder.country,
    state: breeder.state,
    website: breeder.website,
  };

  const form = useForm({
    initialValues,
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [breeder]);

  const handleSubmit = (breederData: BreederInsert): void => {
    updateBreeder.mutate(breederData, {
      onSuccess: () => showSuccessNotification('Breeder name updated successfully'),
      onError: error => showErrorNotification('Failed to edit name', error.message),
      onSettled: () => onClose(),
    });
  };
  return (
    <Modal size='md' zIndex={9999} opened={opened} onClose={onClose} title='Edit breeder name'>
      <Stack>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='Name'
            placeholder={breeder?.name || ''}
            required
            {...form.getInputProps('name')}
          />
          <Group mt='md' position='right'>
            <Button variant='subtle' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>Update name</Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
};

export default BreederDeleteModal;
