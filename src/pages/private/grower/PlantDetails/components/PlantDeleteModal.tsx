import React from 'react';

import { Text, Modal, ModalProps, Group, Button, Stack } from '@mantine/core';
import useDeletePlant from 'hooks/plants/useDeletePlant';
import { useNavigate } from 'react-router-dom';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface PlantDeleteModalProps extends Pick<ModalProps, 'opened' | 'onClose'> {
  plant: any;
}

const PlantDeleteModal = ({ opened, onClose, plant }: PlantDeleteModalProps): JSX.Element => {
  const navigate = useNavigate();

  const deletePlant = useDeletePlant();

  const handleDelete = (payload: PlantDeleteModalProps['plant']): void => {
    deletePlant.mutate(String(payload.id), {
      onSuccess: () => {
        showSuccessNotification(
          'Plant deleted successfully',
          `${payload.name} deletion is successfully`,
        );
        navigate('/plant-management');
      },
      onError: error => showErrorNotification('Plant delete failed', error.message),
      onSettled: () => onClose(),
    });
  };

  return (
    <Modal
      size='md'
      zIndex={9999}
      opened={opened}
      onClose={onClose}
      title={<Text weight={500}>Confirm Delete {`"${plant.name}"`}</Text>}
      centered
    >
      <Stack>
        <Text size='sm'>
          Are you sure you want to delete {`"${plant.name}"`} ?
          <br />
          This action is destructive and you will have no able to restore your data.
        </Text>
        <Group position='right'>
          <Button variant='outline' color='gray' onClick={onClose}>
            Cancel
          </Button>
          <Button color='red' onClick={() => handleDelete(plant)} loading={deletePlant.isLoading}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default PlantDeleteModal;
