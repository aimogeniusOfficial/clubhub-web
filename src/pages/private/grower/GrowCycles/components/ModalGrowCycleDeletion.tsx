import React from 'react';

import { Alert, Button, Group, LoadingOverlay, Modal, Text, Title } from '@mantine/core';
import useDeleteGrowCycle from 'hooks/grow-cycle/useDeleteGrowCycle';
import useGrowCycle from 'pages/private/grower/GrowCycles/hooks/useGrowCycle';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';
import { useNavigate } from 'react-router-dom';

interface IModalGrowCycleDeletionProps {
  growCycleData: any;
  opened: boolean;
  onClose: () => void;
}
const ModalGrowCycleDeletion = ({
  growCycleData,
  opened,
  onClose,
}: IModalGrowCycleDeletionProps): JSX.Element => {
  const deleteMutation = useDeleteGrowCycle();
  const navigate = useNavigate();

  const handleDelete = (): void => {
    deleteMutation.mutate(growCycleData.id, {
      onSuccess: () => {
        showSuccessNotification(
          'Grow Cycle delete is success.',
          `${growCycleData.name} deletion is success.`,
        );
        onClose();
        navigate('/grow-cycle');
      },
      onError: () => showErrorNotification('Grow Cycle delete is failed.'),
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title={`Delete ${growCycleData.name}`} centered>
      <Text>
        {`Are you sure that you want to delete this "${growCycleData.name}" grow cycle? Related journals, 
        spaces and plants will be saved.`}
      </Text>
      <Group position='right' mt='xl'>
        <Button variant='subtle' color='dark' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='filled' color='red' size='sm' onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalGrowCycleDeletion;
