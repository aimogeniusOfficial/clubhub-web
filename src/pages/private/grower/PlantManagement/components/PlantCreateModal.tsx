import React, { useRef } from 'react';

import { Group, Modal, ModalProps, Title, Select, Stack, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from 'contexts/AuthContext';
import useCultivars from 'hooks/cultivars/useCultivars';
import useCreatePlant from 'hooks/plants/useCreatePlant';
import { BreederInsert } from 'types/generated';
import { getFormattedSelectData } from 'utils/functions';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface IPlantsImagesUploadModalProps extends ModalProps {
  plantTypes: any[];
  breeders: BreederInsert[];
}
const PlantCreateModal = ({
  opened,
  onClose,
  plantTypes,
  breeders,
}: IPlantsImagesUploadModalProps): JSX.Element => {
  const { user } = useAuth();

  const createPlantMutation = useCreatePlant();

  const form = useForm({
    initialValues: {
      plant_type_id: Array.isArray(plantTypes)
        ? plantTypes.find(obj => obj.name === 'Cannabis')?.id.toString()
        : '',
      cultivar_id: '',
      breeder_id: '',
      user_id: '',
    },
  });

  const { data: cultivarData, isLoading: isCultivarLoading } = useCultivars(
    form.values.breeder_id || null,
  );

  const handleSubmit = (): void => {
    const getFormattedName = (): string => {
      return `${
        Array.isArray(cultivarData?.data) &&
        cultivarData?.data.find(obj => obj.id === Number(form.values.cultivar_id))?.name
      } by ${breeders.find(obj => obj.id === Number(form.values.breeder_id))?.name} Plant`;
    };

    const plantFormatted = {
      ...form.values,
      name: getFormattedName(),
      user_id: user.id,
      plant_type_id: Number(form.values.plant_type_id),
      cultivar_id: Number(form.values.cultivar_id),
      breeder_id: Number(form.values.breeder_id),
    };

    createPlantMutation.mutate(plantFormatted, {
      onSuccess: () => {
        showSuccessNotification('Plant uploaded successfully');
        form.reset();
      },
      onError: error => {
        showErrorNotification('Failed to insert plant', error.message);
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
          Add a plant
        </Title>
      }
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Select
            label='Choose plant type'
            placeholder='Pick one'
            data={getFormattedSelectData(plantTypes)}
            required
            {...form.getInputProps('plant_type_id')}
          />
          <Select
            label='Choose breeder'
            placeholder='Choose one'
            data={getFormattedSelectData(breeders)}
            searchable
            required
            {...form.getInputProps('breeder_id')}
          />
          <Select
            label='Choose cultivar'
            placeholder='Choose one'
            data={getFormattedSelectData(cultivarData?.data)}
            searchable
            disabled={!form.values.breeder_id}
            required
            {...form.getInputProps('cultivar_id')}
          />
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

export default PlantCreateModal;
