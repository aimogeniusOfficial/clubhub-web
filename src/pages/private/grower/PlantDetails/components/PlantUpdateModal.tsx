import React, { useEffect } from 'react';

import { Modal, ModalProps, Group, Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import useUpdatePlant from 'hooks/plants/useUpdatePlant';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface PlantDeleteModalProps extends ModalProps {
  plant: any;
}
const PlantDeleteModal = ({ opened, onClose, plant }: PlantDeleteModalProps): JSX.Element => {
  const updatePlant = useUpdatePlant();

  const initialValues = {
    id: plant.id,
    name: plant.name,
    plant_type_id: plant.plant_type_id,
    breeder_id: plant.breeder_id,
    cultivar_id: plant.cultivar_id,
    user_id: plant.user_id,
  };

  const form = useForm({
    initialValues,
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [plant]);

  const handleSubmit = (plantData: any): void => {
    updatePlant.mutate(plantData, {
      onSuccess: () => showSuccessNotification('Plant name updated successfully'),
      onError: error => showErrorNotification('Failed to edit name', error.message),
      onSettled: () => onClose(),
    });
  };
  return (
    <Modal size='md' zIndex={9999} opened={opened} onClose={onClose} title='Edit plant name'>
      <Stack>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='Name'
            placeholder={plant?.name || ''}
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

export default PlantDeleteModal;
