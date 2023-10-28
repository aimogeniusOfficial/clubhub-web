import React, { useEffect } from 'react';

import { Modal, ModalProps, Group, Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import useProfile from 'hooks/auth/useProfile';
import useUpdateGrowSpace from 'hooks/grow-space/useUpdateGrowSpace';
import { GrowSpaceInsert } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface GroSpaceDeleteModalProps extends ModalProps {
  growSpace: GrowSpaceInsert;
}
const GrowSpaceDeleteModal = ({
  opened,
  onClose,
  growSpace,
}: GroSpaceDeleteModalProps): JSX.Element => {
  const updateGrowSpaceMutation = useUpdateGrowSpace();
  const { data: userProfile } = useProfile();

  const initialValues = {
    id: growSpace.id,
    name: growSpace.name,
    location: growSpace.location,
    userId: userProfile?.data.id ?? '',
  };

  const form = useForm({
    initialValues,
  });

  useEffect(() => {
    form.setValues(initialValues);
  }, [growSpace]);

  const handleSubmit = (growSpaceData: GrowSpaceInsert): void => {
    updateGrowSpaceMutation.mutate(growSpaceData, {
      onSuccess: () => {
        showSuccessNotification('Grow Space updated successfully');
      },
      onError: error => {
        showErrorNotification('Failed to update Grow Space', error.message);
      },
      onSettled: () => {
        onClose();
      },
    });
  };
  return (
    <Modal size='md' zIndex={9999} opened={opened} onClose={onClose} title='Edit Grow Space'>
      <Stack>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='Name'
            placeholder={growSpace?.name || ''}
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label='Location'
            placeholder={growSpace?.location || ''}
            required
            {...form.getInputProps('location')}
          />
          <Group mt='md' position='right'>
            <Button variant='subtle' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit'>Update Grow Space</Button>
          </Group>
        </form>
      </Stack>
    </Modal>
  );
};

export default GrowSpaceDeleteModal;
