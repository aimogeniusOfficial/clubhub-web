import React from 'react';

import { Text, Modal, ModalProps, Group, Button, Stack } from '@mantine/core';
import useDeleteCultivar from 'hooks/cultivars/useDeleteCultivar';
import { useNavigate } from 'react-router-dom';
import { CultivarDetailsRow, CultivarRow } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface CultivarDeleteModalProps extends Pick<ModalProps, 'opened' | 'onClose'> {
  cultivar: CultivarDetailsRow;
}

const CultivarDeleteModal = ({ opened, onClose, cultivar }: CultivarDeleteModalProps): JSX.Element => {
  const navigate = useNavigate();

  const deleteCultivar = useDeleteCultivar();

  const handleDelete = (payload: CultivarDeleteModalProps['cultivar']): void => {
    deleteCultivar.mutate(String(payload.id), {
      onSuccess: () => {
        showSuccessNotification(
          'Cultivar deleted successfully',
          `${payload.name} deletion is successfully`,
        );
        navigate('/cultivars');
      },
      onError: error => showErrorNotification('Cultivar delete failed', error.message),
      onSettled: () => onClose(),
    });
  };

  return (
    <Modal
      size='md'
      zIndex={9999}
      opened={opened}
      onClose={onClose}
      title={<Text weight={500}>Confirm Delete {`"${cultivar.name}"`}</Text>}
      centered
    >
      <Stack>
        <Text size='sm'>
          Are you sure you want to delete {`"${cultivar.name}"`} ?
          <br />
          This action is destructive and you will have no able to restore your data.
        </Text>
        <Group position='right'>
          <Button variant='outline' color='gray' onClick={onClose}>
            Cancel
          </Button>
          <Button color='red' onClick={() => handleDelete(cultivar)} loading={deleteCultivar.isLoading}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default CultivarDeleteModal;
