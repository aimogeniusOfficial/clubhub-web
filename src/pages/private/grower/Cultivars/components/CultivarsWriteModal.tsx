import React, { useEffect } from 'react';

import {
  Group,
  Modal,
  ModalProps,
  Title,
  Select,
  Stack,
  Button,
  TextInput,
  Switch,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import CultivarLandraceSelect from 'components/auto-complete/CultivarLandraceSelect';
import usePaginatedBreeders from 'hooks/breeders/usePaginatedBreeders';
import useCreateCultivar from 'hooks/cultivars/useCreateCultivar';
import useCultivar from 'hooks/cultivars/useCultivar';
import usePaginatedCultivars from 'hooks/cultivars/usePaginatedCultivars';
import useUpdateCultivar from 'hooks/cultivars/useUpdateCultivar';
import { LandraceEnum } from 'types/generated';
import { getFormattedSelectData } from 'utils/functions';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';

interface FormValues {
  name: string;
  description: string;
  landrace: LandraceEnum | null;
  isAutoflower: boolean;
  breederId: string | null;
  isUnknown: boolean;
  motherId: BigInt | null;
  fatherId: BigInt | null;
}

interface ICultivarsImagesUploadModalProps extends ModalProps {
  isCreation: boolean;
  cultivarId?: string;
}
const CultivarWriteModal = ({
  opened,
  onClose,
  isCreation,
  cultivarId,
}: ICultivarsImagesUploadModalProps): JSX.Element => {
  const { data: breederData } = usePaginatedBreeders();
  const { data: cultivarData } = usePaginatedCultivars();

  const createCultivarMutation = useCreateCultivar();
  const updateCultivarMutation = useUpdateCultivar();
  const { data, isSuccess } = useCultivar(cultivarId || '');

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      description: '',
      landrace: null,
      isAutoflower: false,
      breederId: null,
      isUnknown: true,
      motherId: null,
      fatherId: null,
    },
  });

  const handleCultivarSubmit = (cultivarFormValues: FormValues): void => {
    const cultivarFormatted = {
      ...cultivarFormValues,
      name: cultivarFormValues.name,
      description: cultivarFormValues.description,
      breederId: Number(cultivarFormValues.breederId),
      motherId: Number(cultivarFormValues.motherId),
      fatherId: Number(cultivarFormValues.fatherId),
    };

    if (!isCreation && cultivarId && cultivarData?.data) {
      const { breederId, motherId, fatherId, ...restOfData } = cultivarFormatted;
      const cultivarUpdateData = {
        ...restOfData,
        id: Number(cultivarId),
      };

      updateCultivarMutation.mutate(cultivarUpdateData, {
        onSuccess: () => {
          showSuccessNotification('Cultivar updated successfully');
          form.reset();
        },
        onError: error => {
          showErrorNotification('Failed to insert cultivar', error.message);
        },
        onSettled: () => {
          onClose();
        },
      });
    } else {
      createCultivarMutation.mutate(cultivarFormatted, {
        onSuccess: () => {
          showSuccessNotification('Cultivar uploaded successfully');
          form.reset();
        },
        onError: error => {
          showErrorNotification('Failed to insert cultivar', error.message);
        },
        onSettled: () => {
          onClose();
        },
      });
    }
  };

  useEffect(() => {
    if (!isCreation && isSuccess && data?.data && data.data) {
      form.setValues({
        name: data.data.name,
        description: data.data.description,
        landrace: data.data.landrace,
        isAutoflower: data.data.isAutoflower,
        breederId: data.data.breederId?.toString() || null,
        isUnknown: data.data.isUnknown,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data?.data, isCreation]);

  return (
    <Modal
      size='lg'
      zIndex={9999}
      opened={opened}
      onClose={onClose}
      title={
        <Title order={3} align='center'>
          {isCreation ? 'Add a cultivar' : 'Update a Cultivar'}
        </Title>
      }
    >
      <form onSubmit={form.onSubmit(handleCultivarSubmit)}>
        <Stack>
          <TextInput label='Add name' placeholder='Name' required {...form.getInputProps('name')} />
          <TextInput
            label='Add description'
            placeholder='Description'
            required
            {...form.getInputProps('description')}
          />
          <CultivarLandraceSelect
            label='Choose landrace'
            placeholder='Choose one'
            {...form.getInputProps('landrace')}
          />
          <Select
            label='Choose breeder'
            placeholder='Choose one'
            data={getFormattedSelectData(breederData?.data)}
            searchable
            required
            {...form.getInputProps('breederId')}
          />
          <Group position='right'>
            <Switch
              labelPosition='left'
              label='Is autoflower?'
              size='md'
              {...form.getInputProps('isAutoflower')}
            />
            <Switch
              labelPosition='left'
              label='Is unknown?'
              size='md'
              defaultChecked
              {...form.getInputProps('isUnknown')}
            />
          </Group>

          {isCreation && !form.values.isUnknown && (
            <>
              <Select
                label='Mother'
                placeholder='Pick one'
                data={getFormattedSelectData(cultivarData?.data)}
                searchable
                {...form.getInputProps('motherId')}
              />
              <Select
                label='Father'
                placeholder='Pick one'
                data={getFormattedSelectData(cultivarData?.data)}
                searchable
                {...form.getInputProps('fatherId')}
              />
            </>
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

export default CultivarWriteModal;
