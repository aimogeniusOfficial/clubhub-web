import React, { useEffect } from 'react';

import {
  Button,
  Drawer,
  DrawerProps,
  Group,
  SegmentedControl,
  Stack,
  TextInput,
  Text,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { User } from '@supabase/supabase-js';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';
import useCreateGrowSpace from 'hooks/grow-space/useCreateGrowSpace';
import { GrowSpaceEnvironmentEnum, GrowSpaceTypeEnum } from 'types/generated';
import { showErrorNotification, showSuccessNotification } from 'utils/notifications';
import { GrowSpaceEnvironment } from '../+models/grow-space-environment.enum';
import { GrowSpaceType } from '../+models/grow-space-type.enum';

interface FormValues {
  name: string;
  location: string;
  userId: string;
  environment: GrowSpaceEnvironmentEnum | null;
  spaceType: GrowSpaceTypeEnum | null;
  otherSpaceType: string | null;
}
interface GrowSpaceCreateDrawerProps extends DrawerProps {
  user: User;
}
const GrowSpaceCreateFormDrawer = ({
  opened,
  onClose,
  user,
}: GrowSpaceCreateDrawerProps): JSX.Element => {
  const environmentSelectOptions: Array<any> = [
    {
      value: GrowSpaceEnvironment.INDOOR,
      label: 'Indoor',
    },
    {
      value: GrowSpaceEnvironment.OUTDOOR,
      label: 'Outdoor',
    },
  ];
  const spaceTypeSelectOptions: Array<any> = [
    {
      value: GrowSpaceType.TENT,
      label: 'Tent',
    },
    {
      value: GrowSpaceType.GROW_ROOM,
      label: 'Grow Room',
    },
    {
      value: GrowSpaceType.OTHER,
      label: 'Other',
    },
  ];

  const createGrowSpaceMutation = useCreateGrowSpace();

  const form = useForm({
    initialValues: {
      name: '',
      location: '',
      userId: '',
      environment: null,
      spaceType: null,
      otherSpaceType: '',
    },
  });

  const addGrowSpace = (growSpaceData: FormValues): void => {
    createGrowSpaceMutation.mutate(
      { ...growSpaceData, id: uuid(), userId: user.id },
      {
        onSuccess: () => {
          showSuccessNotification(
            'Grow space created successfully',
            `${growSpaceData.name} creation is successfully`,
          );

          onClose();
        },
        onError: error => {
          showErrorNotification('Failed to create grow space', error.message);
        },
      },
    );
  };

  const { setFieldValue } = form;

  useEffect(() => {
    if (form.values.environment === GrowSpaceEnvironment.OUTDOOR) {
      setFieldValue('spaceType', null);
    }
  }, [form.values.environment, setFieldValue]);


  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      zIndex={999}
      size={500}
      padding='md'
      title='Create a new Grow Space'
      position='right'
    >
      <form onSubmit={form.onSubmit(addGrowSpace)}>
        <Stack spacing='xs'>
          <TextInput
            required
            label='Name'
            placeholder='Grow Space name'
            {...form.getInputProps('name')}
          />
          <TextInput
            required
            label='Location'
            placeholder='Garden A'
            {...form.getInputProps('location')}
          />
          <Stack>
            <Text>Details</Text>
            <SegmentedControl
              data={environmentSelectOptions.map(option => ({
                label: option.label,
                value: option.value,
              }))}
              {...form.getInputProps('environment')}
            />

            {form.values.environment === GrowSpaceEnvironment.INDOOR && (
              <SegmentedControl
                data={spaceTypeSelectOptions.map(option => ({
                  label: option.label,
                  value: option.value,
                }))}
                {...form.getInputProps('spaceType')}
              />
            )}

            {form.values.spaceType === GrowSpaceType.OTHER && (
              <TextInput
                required
                label='Specify Space Type'
                placeholder='Garden A'
                {...form.getInputProps('otherSpaceType')}
              />
            )}
          </Stack>
        </Stack>
        <Group position='right'>
          <Button type='submit' mt='xl' size='md'>
            Create
          </Button>
        </Group>
      </form>
    </Drawer>
  );
};

export default GrowSpaceCreateFormDrawer;
