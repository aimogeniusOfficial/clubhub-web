import React, { useEffect } from 'react';

import { Modal, ModalProps, Group, Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import useUpdateCultivar from 'hooks/cultivars/useUpdateCultivar';
import { CultivarDetailsRow, CultivarInsert } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface CultivarDeleteModalProps extends ModalProps {
  cultivar: CultivarDetailsRow;
}
const CultivarDeleteModal = ({
  opened,
  onClose,
  cultivar,
}: CultivarDeleteModalProps): JSX.Element => {
  const updateCultivar = useUpdateCultivar();

  const initialValues = {
    id: cultivar.id,
    name: cultivar.name,
    breederId: cultivar.breederId,
    description: cultivar.description,
  };

  const form = useForm({
    initialValues,
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [cultivar]);

  const handleSubmit = (cultivarData: CultivarInsert): void => {
    updateCultivar.mutate(cultivarData, {
      onSuccess: () => showSuccessNotification('Cultivar name updated successfully'),
      onError: error => showErrorNotification('Failed to edit name', error.message),
      onSettled: () => onClose(),
    });
  };
  return (
    <Modal size='md' zIndex={9999} opened={opened} onClose={onClose} title='Edit cultivar name'>
      <Stack>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='Name'
            placeholder={cultivar?.name || ''}
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

export default CultivarDeleteModal;
