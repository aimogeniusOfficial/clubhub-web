import React from 'react';

import {
  Group,
  Modal,
  ModalProps,
  Title,
  Select,
  Stack,
  Button,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import useCreateBreeder from 'hooks/breeders/useCreateBreeder';
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';
import { BreederInsert } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

import { countries, states } from './usdata';

interface BreederUploadModalProps extends ModalProps {
  breeders: BreederInsert[];
}
const BreedersCreateModal = ({ opened, onClose }: BreederUploadModalProps): JSX.Element => {
  const theme = useMantineTheme();
  const createBreeder = useCreateBreeder();

  const form = useForm({
    initialValues: {
      name: '',
      country: '',
      state: '',
    },
  });

  const { data: breederData, isLoading } = usePaginatedBreeders(
    form.values.name || null,
    form.values.country || null,
    form.values.state || null,
  );
  const handleSubmit = (): void => {
    const breederFormatted = {
      ...form.values,
      name: form.values.name,
      country: form.values.country,
      state: form.values.state,
    };

    createBreeder.mutate(breederFormatted, {
      onSuccess: () => {
        showSuccessNotification('Breeder uploaded successfully');
        form.reset();
      },
      onError: error => {
        showErrorNotification('Failed to insert Breeder', error.message);
      },
      onSettled: () => {
        onClose();
      },
    });
  };
  return (
    <Modal
      size='lg'
      zIndex={9999}
      opened={opened}
      onClose={onClose}
      title={
        <Title order={3} align='center'>
          Add a breeder
        </Title>
      }
      radius='lg'
      styles={{
        content: { overflow: 'visible !important' },
        header: {
          borderRadius: `${theme.radius.lg} ${theme.radius.lg} 0 0`,
        },
        body: {
          borderRadius: `0 0 ${theme.radius.lg} ${theme.radius.lg}`,
        },
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label='Enter name'
            placeholder='Type here'
            required
            {...form.getInputProps('name')}
          />
          <Select
            label='Choose country'
            placeholder='Choose one'
            data={countries}
            allowDeselect
            dropdownPosition='bottom'
            nothingFound='No options'
            maxDropdownHeight={280}
            searchable
            required
            {...form.getInputProps('country')}
          />
          {form.values.country === 'United States' && (
            <Select
              label='Enter state'
              placeholder='Type here'
              data={states}
              allowDeselect
              dropdownPosition='bottom'
              nothingFound='No options'
              maxDropdownHeight={280}
              searchable
              required
              {...form.getInputProps('state')}
            />
          )}
          <Group position='right'>
            <Button type='submit' size='md'>
              Create
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default BreedersCreateModal;
