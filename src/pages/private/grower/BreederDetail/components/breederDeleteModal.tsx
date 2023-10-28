import React from 'react';

import { Text, Modal, ModalProps, Group, Button, Stack } from '@mantine/core';
import useDeleteBreeder from 'hooks/breeders/useDeleteBreeder';
import { useNavigate } from 'react-router-dom';
import { BreederRow } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface BreederDeleteModalProps extends Pick<ModalProps, 'opened' | 'onClose'> {
  breeder: BreederRow;
}

const BreederDeleteModal = ({ opened, onClose, breeder }: BreederDeleteModalProps): JSX.Element => {
  const navigate = useNavigate();

  const deleteBreeder = useDeleteBreeder();

  const handleDelete = (payload: BreederDeleteModalProps['breeder']): void => {
    deleteBreeder.mutate(String(payload.id), {
      onSuccess: () => {
        showSuccessNotification(
          'Breeder deleted successfully',
          `${payload.name} deletion is successfully`,
        );
        navigate('/Breeders.tsx');
      },
      onError: error => showErrorNotification('Breeder delete failed', error.message),
      onSettled: () => onClose(),
    });
  };

  return (
    <Modal
      size='md'
      zIndex={9999}
      opened={opened}
      onClose={onClose}
      title={<Text weight={500}>Confirm Delete {`"${breeder.name}"`}</Text>}
      centered
    >
      <Stack>
        <Text size='sm'>
          Are you sure you want to delete {`"${breeder.name}"`} ?
          <br />
          This action is destructive and you will have no able to restore your data.
        </Text>
        <Group position='right'>
          <Button variant='outline' color='gray' onClick={onClose}>
            Cancel
          </Button>
          <Button color='red' onClick={() => handleDelete(breeder)} loading={deleteBreeder.isLoading}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default BreederDeleteModal;
