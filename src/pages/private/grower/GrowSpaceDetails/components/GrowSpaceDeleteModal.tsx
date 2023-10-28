import React from 'react';

import { Text, Modal, ModalProps, Group, Button, Loader, Stack } from '@mantine/core';
import useDeleteGrowSpace from 'hooks/grow-space/useDeleteGrowSpace';
import usePaginatedGrowCycle from 'hooks/grow-cycle/usePaginatedGrowCycle';
import { useNavigate } from 'react-router-dom';
import { GrowSpaceRow } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface GrowSpaceDeleteModalProps extends Pick<ModalProps, 'opened' | 'onClose'> {
  growSpace: GrowSpaceRow;
}

const GrowSpaceDeleteModal = ({
  opened,
  onClose,
  growSpace,
}: GrowSpaceDeleteModalProps): JSX.Element => {
  const navigate = useNavigate();
  const { data: growCycles, isLoading } = usePaginatedGrowCycle({ growSpaceId: growSpace.id });

  const hasOngoingGrowCycles =
    growCycles?.data?.some(cycle => ['draft', 'active'].includes(cycle.status)) || false;

  const deleteGrowSpace = useDeleteGrowSpace();

  const handleDelete = (payload: GrowSpaceDeleteModalProps['growSpace']): void => {
    deleteGrowSpace.mutate(String(payload.id), {
      onSuccess: () => {
        showSuccessNotification(
          'Grow Space deleted successfully',
          `${payload.name} deletion is successfully`,
        );
        navigate('/grow-space');
      },
      onError: error => showErrorNotification('Grow Space delete failed', error.message),
      onSettled: () => onClose(),
    });
  };

  return (
    <Modal
      size='md'
      zIndex={9999}
      opened={opened}
      onClose={onClose}
      title={
        <Text weight={500}>
          Confirm{' '}
          <Text span c='green'>
            &quot;{growSpace.name}&quot;
          </Text>{' '}
          Delete
        </Text>
      }
      centered
    >
      <Stack>
        {isLoading && (
          <Text size='sm'>
            <Loader />
          </Text>
        )}
        {hasOngoingGrowCycles ? (
          <>
            <Text size='sm'>
              You cannot delete this grow space as there are related grow cycles that are not
              completed yet.
            </Text>
            <Group position='right'>
              <Button variant='outline' color='red' onClick={onClose}>
                Close
              </Button>
            </Group>
          </>
        ) : (
          <>
            <Text size='sm'>
              Are you sure you want to delete {`"${growSpace.name}"`} space?
              <br />
              This action is destructive and you will have no ability to restore your grow space.
            </Text>
            <Group position='right'>
              <Button variant='outline' color='gray' onClick={onClose}>
                Cancel
              </Button>
              <Button
                color='red'
                variant='filled'
                onClick={() => handleDelete(growSpace)}
                loading={deleteGrowSpace.isLoading}
                disabled={hasOngoingGrowCycles}
              >
                Delete
              </Button>
            </Group>
          </>
        )}
      </Stack>
    </Modal>
  );
};

export default GrowSpaceDeleteModal;
